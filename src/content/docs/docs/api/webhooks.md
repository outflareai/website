---
title: Webhooks
description: Get Outflare events (replies, bounces, paused mailboxes, held mission writes) pushed to your own URL, signed and retried.
---

Webhooks tell your own systems what happened as it happens: a lead replied, an email bounced, a mailbox was paused for its bounce rate, a mission is waiting for approval. Register a URL, choose the events, and Outflare POSTs each one as JSON.

## Add an endpoint

In the app, go to **Settings → Webhooks**, add the URL and pick the events: everything, whole categories, or single types. Each endpoint opens its delivery log, where you can see every payload and your receiver's answer, and send any delivery again. Over the API:

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/webhooks \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/hooks/outflare", "events": ["lead.replied", "lead.bounced", "mailbox.auto_paused"]}'
```

To hear about some reply labels only, add `categories` with labels or groups, such as `["hot"]` for interested, meeting booked and question; events about replies with other labels are then not sent to it, and other events are unaffected. The answer includes the endpoint's signing secret (`whsec_...`). Keep it with your receiver; `GET .../webhooks/{id}/secret` shows it again. Then send a test event and see how your receiver answered:

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/webhooks/$HOOK/test -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

`events` takes event types, a category wildcard such as `lead.*`, or `"*"` for everything (the default). `GET /v1/webhook-events` lists every type. A workspace can have up to 20 endpoints. Managing them needs the `webhooks.manage` scope, which owners and admins have; `webhooks.read` shows endpoints and deliveries. The same works from the CLI (`outflare create-webhook --url ... --events lead.replied`) and from agents over MCP (`create_webhook`, `test_webhook`).

## What you receive

Every delivery is a `POST` with a JSON body:

```json
{
  "id": "evt_48213",
  "type": "lead.replied",
  "created_at": "2026-10-25T09:14:03Z",
  "workspace_id": "c50726c9-0127-4da6-8729-19a6d25aa1e0",
  "actor": { "type": "system", "id": null },
  "target": { "type": "lead", "id": "bd11615b-2eab-4c55-945e-a3c1fb3fa9d0" },
  "request_id": null,
  "data": { "inbound_id": "…", "enrollments_stopped": 1 }
}
```

- `id` is unique per event and is also the `webhook-id` header. Deliveries can repeat (a retry after your server timed out, a redelivery by hand), so use it to skip events you already handled.
- `target` is the record that changed; fetch it from the API for its current state.
- `request_id` is the API request that made the change, when one did. It matches the `X-Request-Id` header and the [audit log](/docs/api/#responses).
- `data` depends on the type. New fields may be added; existing ones keep their meaning.

Every event comes from the audit log and is written in the same database transaction as the change. You hear about every change that happened, and never about one that was rolled back.

## Verify the signature

Deliveries are signed the [Standard Webhooks](https://www.standardwebhooks.com) way, with `webhook-id`, `webhook-timestamp` and `webhook-signature` headers, so its libraries verify them in most languages. With the [TypeScript SDK](/docs/sdk/typescript/):

```ts
import { verifyWebhook } from "@outflare/sdk";

const event = await verifyWebhook(await req.text(), req.headers, process.env.OUTFLARE_WEBHOOK_SECRET!);
if (event.type === "lead.replied") {
  // event.target.id is the lead, event.data.inbound_id the reply
}
```

Pass the raw body, before any JSON parsing. `verifyWebhook` rejects a delivery whose signature does not match or whose timestamp is more than five minutes away, which stops replays. The [Python SDK](/docs/sdk/python/) has the same check as `verify_webhook(body, headers, secret)`. By hand, the signature is `v1,` followed by the base64 HMAC-SHA256 of `{webhook-id}.{webhook-timestamp}.{body}`, keyed with the secret's base64 part after `whsec_`. The header can hold several signatures separated by spaces; accept the delivery if any one matches.

## Retries and failures

Answer with any `2xx` status within 10 seconds. Anything else, a timeout or a refused connection, is retried with backoff (5 seconds, doubling, at most an hour apart) for about three and a half hours. Redirects are not followed.

- `GET .../webhooks/{id}/deliveries` lists what was sent in the last 30 days, with each attempt's status code or error and the payload. Filter with `status=failed` or `event_type=`.
- `POST .../webhooks/{id}/deliveries/{delivery}/redeliver` sends one again now and answers with the result, for example after you fix a bug in the receiver.
- An endpoint that answers `410 Gone`, or fails every delivery for five days, is turned off, with the reason in `disabled_reason`. `PATCH` it with `{"enabled": true}` to turn it back on.

## Rotate the secret

`POST .../webhooks/{id}/rotate-secret` returns a new secret. For the next 24 hours every delivery carries two signatures, one per secret, so you can deploy the new secret without missing anything. If the old secret leaked, send `{"expire_now": true}` to stop using it at once.

## No public URL? Read the events feed

Agents and scripts that can't receive webhooks can read the same events instead. `GET /v1/workspaces/{ws}/events` returns them oldest first, in the same shape as a delivery, and needs `webhooks.read`:

```sh
curl "https://outflare.example.com/v1/workspaces/$WS/events?types=lead.replied,mailbox.*" -H "Authorization: Bearer $OUTFLARE_TOKEN"
# → { "data": [ { "id": "evt_48213", "type": "lead.replied", ... } ], "next_cursor": "...", "has_more": false }
```

Keep `next_cursor` and pass it as `cursor` next time to get only what happened since. Unlike other lists, `next_cursor` is always set here, so polling never loses its place; `has_more` says another page is ready right now. Without a cursor the feed starts from the beginning of the audit log; pass `after=latest` to start from now instead. Agents use the `list_events` MCP tool, and the CLI `outflare list-events --types lead.replied`.

## Test a receiver on your machine

`outflare listen` sends new events to a receiver running on your laptop, with no public URL or tunnel:

```sh
outflare listen --forward-to http://localhost:3000/webhooks --types lead.*
# Forwarding events to http://localhost:3000/webhooks, signed with whsec_…
# 10:42:07  lead.replied              200 OK  evt_48213  12ms
```

Each event is POSTed with the same `webhook-id`, `webhook-timestamp` and `webhook-signature` headers as a real delivery, signed with the secret it prints when it starts, so your signature check is tested too. Pass that secret to `verifyWebhook`, or bring your own with `--secret`. A failed forward is shown, not retried. Without `--forward-to` it prints each event as JSON. It reads the events feed, so it needs `webhooks.read`.

## Self-hosted servers

Webhooks only go to public `https` URLs, and the address is checked again when Outflare connects, so a webhook can't be used to reach your internal network. If your receivers run on the same private network as your server, set `WEBHOOKS_ALLOW_PRIVATE=true` (see [Configuration](/docs/self-hosting/configuration/)).

## Events

Every type is also in the API document, under `webhooks:` and in the `WebhookEvent` schema, so generated clients know them. Types are only ever added, never renamed or removed.

### Replies and opt-outs

| Event | When |
| --- | --- |
| `lead.replied` | A lead replied. data.inbound_id is the reply (GET .../inbox/{id}); data.enrollments_stopped counts sequences stopped by it. |
| `lead.unsubscribed` | A lead opted out (unsubscribe link, header or a reply asking to stop) and was suppressed. |
| `inbox.replied` | Someone in the workspace (or an agent) replied to an inbound message. |
| `inbox.updated` | An inbound message was marked read or its category changed. |
| `inbox.classified` | A reply got a label, or a different one, from the rules, the AI, a person or an agent. data has `category`, `group`, `previous_category`, `category_source`, `confidence`, `needs_review`, `source` and the ids. Endpoints with `categories` hear only those labels. |

### Deliverability

| Event | When |
| --- | --- |
| `lead.bounced` | An email to a lead bounced permanently and the address was suppressed. |
| `mailbox.auto_paused` | A mailbox was paused automatically because its bounce rate crossed the limit. |

### Leads and lists

| Event | When |
| --- | --- |
| `lead.created` | A lead was created. |
| `lead.updated` | A lead's fields were changed. |
| `lead.deleted` | A lead was deleted. |
| `leads.imported` | Leads were imported from a CSV. |
| `suppressions.added` | Addresses or domains were added to the suppression list. |
| `suppression.removed` | An entry was removed from the suppression list. |
| `lead_list.created` | A lead list was created. |
| `lead_list.leads_added` | Leads were added to a lead list. |
| `lead_list.run_started` | A lead list build, refresh or enrichment from a data provider started. |
| `lead_list.build_done` | A lead list build finished. |
| `lead_list.build_failed` | A lead list build failed. data.error says why. |
| `lead_list.refresh_done` | A lead list refresh finished. |
| `lead_list.refresh_failed` | A lead list refresh failed. |
| `lead_list.enrich_done` | A lead list enrichment finished. |
| `lead_list.enrich_failed` | A lead list enrichment failed. |
| `import.done` | An import from a connected sequencer finished. |
| `import.failed` | An import from a connected sequencer failed. |

### Sequences

| Event | When |
| --- | --- |
| `sequence.created` | A sequence was created. |
| `sequence.updated` | A sequence's settings changed. |
| `sequence.activated` | A sequence started sending. |
| `sequence.paused` | A sequence was paused. |
| `sequence.archived` | A sequence was archived. |
| `sequence.deleted` | A sequence was deleted. |
| `sequence.steps_updated` | A sequence's steps were replaced. |
| `sequence.leads_enrolled` | Leads were enrolled in a sequence. |
| `enrollment.stopped` | An enrollment was stopped by hand. |

### Mailboxes and domains

| Event | When |
| --- | --- |
| `mailbox.imported` | Mailboxes were added or imported. |
| `mailbox.updated` | A mailbox's settings changed. |
| `mailbox.paused` | A mailbox was paused by hand or by its sequencer. |
| `mailbox.resumed` | A paused mailbox was resumed. |
| `mailbox.stage_changed` | A mailbox moved between warming, ready, resting and retired. |
| `mailbox.deleted` | A mailbox was removed. |
| `domain.added` | A sending domain was added. |
| `domain.paused` | A sending domain was paused, which pauses its mailboxes. |
| `domain.resumed` | A paused sending domain was resumed. |
| `domain.removed` | A sending domain was removed. |

### Outcomes

| Event | When |
| --- | --- |
| `meeting.created` | A meeting was booked or logged. |
| `meeting.updated` | A meeting changed (held, no-show, cancelled, rescheduled). |
| `meeting.deleted` | A meeting was deleted. |
| `deal.created` | A deal was created. |
| `deal.updated` | A deal changed stage or value. |
| `deal.deleted` | A deal was deleted. |
| `spend.recorded` | Spend was recorded in the ledger. |

### Connectors

| Event | When |
| --- | --- |
| `integration.connected` | A connector was connected. |
| `integration.updated` | A connector's settings changed. |
| `integration.disconnected` | A connector was disconnected. |
| `connect_request.created` | A one-time connect link was created for a person to finish connecting a service. |

### Deploys

| Event | When |
| --- | --- |
| `deploy.detected` | A watched repository or project went live in production. `data` has `target_id`, `site_id` (the site it serves, or null), `kind` (`deployment` or `push`), `commit`, `ref` and `deployed_at`. |
| `deploy.failed` | A production deploy of a watched repository or project failed. |

### Projects

| Event | When |
| --- | --- |
| `project.created` | A project was created. |
| `project.updated` | A project's brief or settings changed. |
| `project.deleted` | A project was deleted. |

### Missions

| Event | When |
| --- | --- |
| `mission.created` | An agent mission was created. |
| `mission.updated` | A mission's goal, limits or settings changed. |
| `mission.submitted` | A mission was submitted for a person's approval. |
| `mission.approved` | A mission was approved and is running. |
| `mission.paused` | A mission was paused. |
| `mission.resumed` | A paused mission was resumed. |
| `mission.stopped` | A mission was stopped. |
| `mission.completed` | A mission was marked complete. |
| `mission.action_held` | A write in a mission is waiting for a person to approve it. |
| `mission.action_approved` | A held mission write was approved and run. |
| `mission.action_rejected` | A held mission write was rejected. |

### Infrastructure

| Event | When |
| --- | --- |
| `infra.plan_created` | An infrastructure plan was drafted. |
| `infra.plan_approved` | An infrastructure plan was approved, which may buy domains and mailboxes. |
| `infra.ordered` | Mailboxes in a plan were ordered from the supplier. |
| `infra.order_failed` | Ordering a plan's mailboxes failed. data.error says why. |
| `infra.domains_bought` | The domains in a plan were bought. |
| `infra.mailbox_joined` | A mailbox a plan ordered arrived and was added to the workspace. |
| `infra.plan_warming` | A plan's mailboxes are all in and warming up. |
| `infra.plan_ready` | A plan's mailboxes finished warming up and are ready to send. |
| `infra.plan_cancelled` | An infrastructure plan was cancelled. |

### Workspace

| Event | When |
| --- | --- |
| `workspace.updated` | The workspace was renamed or its slug (its name in URLs) changed. data has the new and previous values. |
