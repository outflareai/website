---
title: The policy check
description: How Outflare decides whether an email may be sent. One check, on every send, from every client.
sidebar:
  order: 2
---

<span class="pill shipped">Shipped</span> Every sequence email goes through this check. The recipient part can also be called on its own.

Cold email goes wrong in predictable ways: emailing someone who unsubscribed, emailing a customer from a prospecting sequence, pushing one inbox far past its daily limit, or an automated agent sending far more than anyone intended. Outflare puts a single gate in front of every outbound email to stop these.

## The rule

Every outbound email passes the policy check immediately before it is handed to SMTP. There is no code path that sends around it, whether the email came from a sequence, a manual reply in the inbox, an API call or an agent. This rule is written into the repository's contributor guide, so a change that bypasses it does not get merged.

## What it checks

The check runs inside the send job, just before the SMTP connection is used, in this order:

| Check | Outcome when it fails |
| --- | --- |
| Recipient | The address is invalid, or it or its domain is on the suppression list. That includes unsubscribes, opt-out replies and bounces, which are added automatically. The lead is **blocked** and never emailed. |
| Sending window | Outside the sequence's days and hours in its time zone. The send **waits** for the window. |
| New leads per day | The sequence's `daily_new_limit` is used up. A first email **waits** for tomorrow. |
| Content | A template variable is missing with no fallback. The lead is **blocked**. |
| Domain | The mailbox's domain is paused, or its [daily cap](/docs/guides/sending-domains/#settings) across all its mailboxes is used up. The send **waits** (`domain_paused`, `domain_daily_limit`). |
| Project | The sequence's [project](/docs/guides/projects/) is paused or archived, or the project's daily send limit across all its sequences is used up. The send **waits** (`project_paused`, `project_daily_limit`). |
| Agent budget | The sequence was created by an API token with a daily send budget, and the token's sequences have used it up. The send **waits** (`token_daily_budget`). |
| Mailbox | No mailbox [allocated to the sequence](/docs/guides/mailbox-allocation/) is active, at the [ready stage](/docs/guides/infrastructure/#mailbox-stages) (`mailbox_not_ready` otherwise), on a domain that is not paused, under its daily limit and past its minimum gap. The send **waits** for the soonest one (`no_mailbox_allocated` when there is none). Follow-ups only ever use the mailbox that started the thread. |

A blocked send is not an error that disappears. It is recorded as a message with status `blocked` and the reason, the enrollment shows the same reason, and waiting enrollments show why they are waiting. See [Sequences and sending](/docs/guides/sequences/#how-sending-works) for the reasons.

## Check recipients before you enrol them

The recipient checks are available on their own, so a script or agent can filter a list before adding anyone to a sequence (scope `leads.read`, up to 1000 addresses per call):

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/recipients/check \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"emails": ["ana@acme.example", "bo@competitor.example", "not-an-email"]}'
```

```json
{ "data": [
  { "email": "ana@acme.example", "allowed": true, "reasons": [] },
  { "email": "bo@competitor.example", "allowed": false, "reasons": ["suppressed_domain:do_not_contact"] },
  { "email": "not-an-email", "allowed": false, "reasons": ["invalid_email"] }
] }
```

Reasons are `invalid_email`, `suppressed_email:<reason>` and `suppressed_domain:<reason>`.

## Why one check matters for agents

When agents can create sequences and send replies, the safest design is one that does not depend on every agent behaving well. An agent whose token is allowed to send can ask Outflare to send, but it cannot skip suppression or exceed limits, because those are enforced by the engine, not by the client.
