---
title: Rules
description: Turn what happens to people and companies into business events of your own, such as "stalled after sign-up", that journeys, webhooks and smart lists act on. Dry-run any rule first.
sidebar:
  order: 13.4
---

<span class="pill shipped">Shipped</span> In the web app (**Lifecycle → Rules**), the REST API and the MCP server.

A rule watches what happens to the people and companies of a brand and, when its condition becomes true, emits a business event of its own on the record's timeline, such as `customer.stalled` or `customer.reactivated`. Anything that listens to events acts on it: a [journey](/docs/guides/journeys/) can start on it, a [webhook](/docs/api/webhooks/) can deliver it, a [smart list](/docs/guides/smart-lists/) can count it and Query can read it.

A rule never sends anything itself. What happened (the event) and what you do about it (the journey's email, the webhook) stay separate, so one business event can drive several automations, and each can change on its own.

## In the web app

Each rule is a card you read as a sentence: "**When** someone does **signed_up** **and doesn't** do **product_activated** **within** **7 days**, **if** plan is not enterprise, **emit** customer.stalled." Pick the kind of trigger from the first blank and fill in the rest. The card also has:

- **Dry run**: what it would have done over the last 7, 30 or 90 days.
- **Where its event goes**: the journeys that start or end on its event.
- **Who it fired for**: the last 50 people or companies it fired for, each linking to their page.
- **When this fires, do…**: pick a first step, and a draft journey that starts on the rule's event opens in the journey builder.

A rule is a draft until you activate it. Pause it to change it.

## Triggers

| Kind | Fires when | Example |
| --- | --- | --- |
| `event` | An event happens on a person's timeline | `product_activated` with `plan` = `pro` emits `customer.activated_pro` |
| `change` | A record's fields come to meet the conditions. It fires when they become true, and again only after they stop being true and become true again. | A company's `lifecycle_stage` becomes `customer`, or a deal's `stage` becomes `won` |
| `absence` | An event doesn't happen within a time of a start event. With no start event, it fires after a stretch with none. | `signed_up`, then no `product_activated` within 7 days; or no `api_called` for 14 days |
| `audience` | Someone joins or leaves a smart list | Joined "Paying, no login in 30 days" |

Conditions are the same tests journeys use, on a field of the record (`attribute`) or a property of the event that set the rule off (`property`), with `eq`, `neq`, `gt`, `lt`, `contains`, `exists` and `not_exists`. A change rule can watch a [metric](/docs/guides/metrics/), such as `metrics.spend_30d` going over 100000.

```sh
curl -X POST https://app.outflare.ai/v1/brands/$BRAND/rules \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"name": "Stalled after sign-up",
       "trigger": {"kind": "absence", "start_event": "signed_up", "event": "product_activated", "within_seconds": 604800},
       "conditions": [{"attribute": "billing_plan", "op": "neq", "value": "enterprise"}],
       "emit_event": "customer.stalled"}'
```

## Firing once, and only on new things

Every firing is recorded once per rule, record and episode, so a retry or a duplicate event never fires a rule twice. `fire: once` fires once per record ever, and `cooldown_seconds` keeps a gap between two firings for one record.

A rule never fires for:

- **What happened before it went live.** It acts only on events after it was activated.
- **Late data.** An event that arrives more than a day after it happened updates history but fires nothing, so a backfill or an import never sets automations off.
- **Website snippet events.** Anyone with a site key can send them.
- **Event names not approved** in the catalog.
- **Edits someone made by hand**, unless the rule sets `manual_edits: true`.
- **Merged, archived and deleted records.**

A rule can listen to another rule's event. Chains stop at five deep, and activating a rule that would set itself off again is refused.

## The event it emits

The event goes on the record's timeline with source `rule`. Its properties are the triggering event's, plus `rule_id` and `rule_version`, and, depending on the trigger, `field`, `start_event` and `within_seconds`, or `list_id` and `on`.

## Trying a rule first

`POST .../rules/{id}/simulate` (MCP `simulate_rule`) is the dry run: how many records it would have fired for over the last `days` (30 by default, up to 90), how many times, and up to 20 of them. Nothing is stored or sent.

## From the API and agents

| | |
| --- | --- |
| `GET`, `POST /v1/brands/{brand}/rules`, `GET`, `PATCH .../rules/{id}` | List, create, read and change rules |
| `POST .../rules/{id}/activate`, `pause`, `archive` | Turn a rule on or off, or stop it for good |
| `POST .../rules/{id}/simulate` | The dry run |
| `GET .../rules/{id}/firings` | When it fired and for whom, newest first |

Reading needs permission to read customers, and changing rules permission to manage them. The MCP tools are `list_rules`, `get_rule`, `create_rule`, `update_rule`, `simulate_rule`, `activate_rule`, `pause_rule`, `archive_rule` and `list_rule_firings`.

Each firing is the `rule.fired` webhook event, with `record_id`, the emitted `event` and `event_id`. To send one rule's firings to its own endpoint, pick the rule on the webhook endpoint (`rule_ids`).
