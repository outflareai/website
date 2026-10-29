---
title: Sequences and sending
description: Multi-step sequences that send from the mailboxes allocated to them, with the policy check on every email.
sidebar:
  order: 7
---

<span class="pill shipped">Shipped</span> Sequences, sending, rotation, unsubscribe and bounce handling, and stop on reply through the [inbox](/docs/guides/inbox/).

A sequence is a list of email steps sent to the leads you add to it, from the mailboxes [allocated to it](/docs/guides/mailbox-allocation/). Every email passes [the policy check](/docs/concepts/policy-check/) just before it goes out.

## Create a sequence

In the web app, open **Sequences**, name the sequence and write its steps. Or with the API:

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/sequences \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" -d '{
    "name": "Founders Q4",
    "timezone": "Australia/Sydney",
    "send_days": [1, 2, 3, 4, 5],
    "send_start": "09:00",
    "send_end": "17:00",
    "daily_new_limit": 50,
    "team_id": "'$TEAM'",
    "priority": "high",
    "steps": [
      { "subject": "Quick question for {{company|your team}}",
        "body": "Hi {{first_name}},\n\n...\n\n{{sender_first_name}}" },
      { "delay_days": 3, "subject": "", "body": "Hi {{first_name}}, bumping this up." }
    ]
  }'
```

A new sequence is a `draft` and sends nothing, and has no mailboxes yet. Outflare allocates mailboxes when you start it, enough for `daily_new_limit` new leads a day times its steps, or for `target_daily` sends a day if you set that instead. `team_id`, `priority` and the other allocation settings are explained in [Mailbox allocation](/docs/guides/mailbox-allocation/). Defaults are UTC, Monday to Friday, 09:00 to 17:00 and no cap on new leads per day. To cap everything a sequence sends, follow-ups included, set `daily_send_limit` (1 to 1,000,000, or null for no cap): it counts every step in any 24 hours, on top of each mailbox's and domain's own limits. Replace the steps later with `PUT /v1/workspaces/{ws}/sequences/{id}/steps`.

## Steps and templates

- The **first step** needs a subject.
- A **follow-up** with an empty subject replies in the same thread: the subject becomes `Re: ...`, it carries `In-Reply-To` and `References` headers, and it is sent from the same mailbox as the first email.
- `delay_days` is the wait after the previous step, at least 1 for follow-ups. A sequence has up to 20 steps.
- Bodies are plain text, which is what lands best for cold email.

Variables are written `{{name}}` and are not case sensitive. Add a fallback after a bar: `{{company|your team}}`.

| Variable | Value |
| --- | --- |
| `first_name`, `last_name`, `email`, `company`, `title`, `phone`, `linkedin_url`, `website`, `domain` | Lead fields. |
| Any custom field | Every extra column from your [lead import](/docs/guides/import-leads/), by its normalised name (for example `{{industry}}`). `{{custom.industry}}` also works. |
| `sender_name`, `sender_first_name`, `sender_email` | The mailbox sending this email. |
| `unsubscribe_url` | This lead's unsubscribe link, if you want it in the body as well as the header. |

If a lead is missing a variable that has no fallback, that lead is **not emailed**: the enrollment ends as `blocked` with the reason `missing_variable: first_name`. Check before you start with the preview, which renders every step for one lead and lists what is missing:

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/sequences/$SEQ/preview \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" -d '{"lead_id": "'$LEAD'"}'
```

## Add leads and start

Add a lead list (or up to 10,000 lead ids), then activate:

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/sequences/$SEQ/enrollments \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" -d '{"list_id": "'$LIST'"}'

curl -X PATCH https://outflare.example.com/v1/workspaces/$WS/sequences/$SEQ \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" -d '{"status": "active"}'
```

The enrollment response counts what was added and what was skipped: leads already in the sequence, suppressed leads, and leads active in another sequence (so nobody gets two sequences at once; send `"skip_active_elsewhere": false` to allow it). Activating needs at least one step, and either `daily_new_limit`, `target_daily` or mailboxes you assigned by hand, so Outflare knows how many mailboxes the sequence needs. It allocates them straight away, and the response's `allocation` shows how many sends a day it got. Pausing holds every lead where it is, and activating again carries on. Stop one lead with `POST .../enrollments/{id}/stop`.

## How sending works

A scheduler looks for leads whose next step is due every few seconds and queues a send job for each. The job runs the policy check, picks a mailbox, sends over SMTP and records the result. When a check says "not yet", the lead is rescheduled and its `status_reason` says why:

| Reason | Meaning |
| --- | --- |
| `outside_sending_window` | Waiting for the next allowed day and hour in the sequence's time zone. Sends start at a small random offset after the window opens. |
| `sequence_daily_new_limit` | Today's cap on new leads is used up. Follow-ups are not capped. |
| `mailbox_daily_limit` | Every mailbox allocated to the sequence has sent its daily limit in the last 24 hours. |
| `mailbox_min_gap` | The mailboxes have all sent recently. Each waits at least its `min_gap_seconds` (default 120, plus a random extra) between sends. |
| `no_mailbox_allocated` | No ready mailbox is allocated to the sequence yet. The [Allocation](/docs/guides/mailbox-allocation/) page says why: usually not enough free ready mailboxes. |
| `sender_mailbox_gone` | The mailbox that started this lead's thread was removed. Follow-ups wait until you cancel them or hand them to another mailbox. |
| `token_daily_budget` | The sequence was created by an API token whose daily send budget is used up. |
| `sequence_daily_send_limit` | The sequence's `daily_send_limit` is used up: it has sent that many emails in the last 24 hours, every step counted. |

New leads go to the least-used mailbox allocated to the sequence. Follow-ups always come from the mailbox that started the thread, even after that mailbox is moved to another sequence: it keeps sending the follow-ups it owes there. If the mailbox is deleted, the follow-ups wait for you to cancel them or hand them to another mailbox, which starts a new thread.

**A step is never sent twice.** Before connecting to SMTP the job reserves the message. If the engine stops mid-send and the outcome is unknown, the step is counted as sent and the lead moves on, rather than risking a duplicate.

## Lead statuses

| Status | Meaning |
| --- | --- |
| `active` | Has steps left to send. |
| `completed` | Every step was sent. |
| `stopped` | Stopped by hand. |
| `unsubscribed` | Clicked unsubscribe. |
| `bounced` | The receiving server rejected the address. |
| `blocked` | The policy check refused it: suppressed, invalid, or missing a variable. |
| `failed` | Sending failed five times in a row, or the sequence's time zone is invalid. |
| `replied` | Replied, and the sequence stops on reply. See [Reply inbox](/docs/guides/inbox/). |

The sequence's `stats` count leads by status, plus `sent` emails.

## Unsubscribe and bounces

Every email carries `List-Unsubscribe` and `List-Unsubscribe-Post: List-Unsubscribe=One-Click` headers ([RFC 8058](https://www.rfc-editor.org/rfc/rfc8058)), which Gmail and Yahoo require of bulk senders and show as an unsubscribe button. The link points to `PUBLIC_URL/u/...`, so set [`PUBLIC_URL`](/docs/self-hosting/configuration/) to an address recipients can reach.

- Opening the link shows a page with an **Unsubscribe** button. It does not unsubscribe on its own, because security scanners open links in email.
- Unsubscribing (the button, or a mail provider's one-click POST) adds the address to the [suppression list](/docs/guides/import-leads/) with reason `unsubscribed` and stops every active sequence for it in the workspace.
- Links are signed, so they cannot be guessed or altered.

When the receiving server rejects an address outright (a 5xx answer to `RCPT TO`), the address is suppressed with reason `bounced` and the lead's enrollment ends as `bounced`. Temporary failures are retried with backoff. A mailbox whose sign-in starts failing is set to `error` and leaves the rotation until you fix and re-verify it.

## Message log

Every attempt is recorded: sent, failed (with the SMTP error) and blocked (with the policy reason).

```sh
curl "https://outflare.example.com/v1/workspaces/$WS/messages?sequence_id=$SEQ&status=blocked" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

Filter by `sequence_id`, `lead_id`, `mailbox_id`, `enrollment_id` or `status`, and page with `before`.

## Scopes

`sequences.read` lists sequences, enrollments and messages, and runs previews. `sequences.manage` creates and changes them. See [Workspaces and access](/docs/guides/workspaces-and-access/).
