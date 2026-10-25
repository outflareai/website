---
title: Reply inbox
description: One inbox for replies across every connected mailbox, with stop on reply, opt-outs and bounce reports handled for you.
sidebar:
  order: 8
---

<span class="pill shipped">Shipped</span> IMAP sync, one inbox across all mailboxes, stop on reply, opt-out and bounce handling, sorting replies by what they mean, assigning, snoozing and labels, and replying from the inbox.

## How mail arrives

Every active mailbox is checked over IMAP every two minutes, so replies arrive without forwarding rules. To check one now, use **Check mail** on the Mailboxes page or call `POST /v1/workspaces/{ws}/mailboxes/{id}/sync`. The mailbox shows `last_synced_at`, and `sync_error` if the last check failed.

Only the INBOX folder is read, and only new mail: the first sync of a mailbox reads the last day, so connecting an inbox you have used before does not import its history. Messages are never changed on the server; they are not even marked as read.

## Matching and what happens next

Each message is matched to the email it answers by its `In-Reply-To` and `References` headers. If it has none, it is matched to a lead by the sender's address. Then it is sorted and acted on:

| Kind | What it is | What happens |
| --- | --- | --- |
| `reply` | A lead wrote back. | The lead's active sequences stop (`replied`), unless a sequence has **stop on reply** turned off. |
| `reply` with `opt_out` | A reply asking not to be contacted, such as "unsubscribe", "remove me from your list" or "stop emailing me". | The address is added to the [suppression list](/docs/guides/import-leads/) and all of the lead's sequences stop (`unsubscribed`). Only the new text is read, never the quoted email below it. |
| `auto_reply` | Out-of-office and other automatic replies ([RFC 3834](https://www.rfc-editor.org/rfc/rfc3834) `Auto-Submitted`, and the usual vacation headers and subjects). | Shown, but the sequence carries on. |
| `bounce` | A delivery failure report ([RFC 3464](https://www.rfc-editor.org/rfc/rfc3464)) or a plain-text bounce from a mailer daemon. | Addresses that failed permanently (5.x.x) are suppressed with reason `bounced` and their sequences stop. Only addresses this workspace actually emailed are acted on, so a forged report cannot suppress anyone else. Delays are ignored. |
| `other` | Not about a lead: newsletters, mail between your own mailboxes. | Kept, out of the way. |

Every action is recorded in the audit log (`lead.replied`, `lead.unsubscribed`, `lead.bounced`).

## Read the inbox

The **Inbox** tab lists replies and auto-replies from every mailbox, newest first, with the lead, company and sequence. Open one to see the whole conversation with that lead through that mailbox: what was sent and what came back, in order.

```sh
curl "https://outflare.example.com/v1/workspaces/$WS/inbox?unread=true" -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

Filter with `kind` (`reply`, `auto_reply`, `bounce`, `other` or `all`), `unread`, `mailbox_id`, `lead_id`, `sequence_id` and `q` (sender or subject), and page with `before`. The response includes `unread_replies`. `GET /inbox/{id}` returns the message and its `thread`; `PATCH /inbox/{id}` with `{"read": true}` marks it read.

## Sort and work through replies

Each reply is also sorted by what it means: `interested`, `meeting_booked`, `question`, `referral`, `not_now`, `not_interested`, `wrong_person`, `out_of_office` or `unsubscribe`. Built-in rules sort the clear cases as they arrive and leave the rest unsorted, so a person or an agent can read them and decide. `category_source` says who sorted it: `rules`, `human` or `api_token`.

The inbox opens on what still needs handling. Unsubscribes and out-of-office replies need nothing from you, so they arrive already done.

| Field | What it does |
| --- | --- |
| `category` | Sort a reply, or correct the rules. |
| `assigned_to` | Give it to a workspace member (a user id), or `null`. |
| `snoozed_until` | Hide it until a time. It comes back on its own. |
| `done` | Mark it handled, or reopen it. |
| `labels` | Your own tags, such as `pricing` or `follow up in Q1`. |

```sh
curl -X PATCH https://outflare.example.com/v1/workspaces/$WS/inbox/$ID \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"category": "interested", "assigned_to": "'$USER_ID'"}'
```

Filter the list with `status` (`open`, `snoozed`, `done` or `all`), `category` (or `none` for unsorted), `assigned_to` (`me`, `none` or a user id) and `label`. Every change is recorded in the audit log. Agents use `triage_inbox_message`, and `list_members` to find who to assign to.

## Reply from the inbox

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/inbox/$ID/reply \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"body": "Tuesday at 10 works. I will send an invite."}'
```

The reply goes from the mailbox the message arrived at, in the same thread (`Re:` subject, `In-Reply-To` and `References`), so it lands where the lead expects. It passes [the policy check](/docs/concepts/policy-check/)'s recipient step: replying to someone who opted out or bounced returns `409`. The mailbox must be active. A reply you write by hand is not held to a sequence's sending window or the mailbox's pacing, but it does count towards the mailbox's daily limit.

## Scopes

`inbox.read` reads the inbox and conversations. `inbox.manage` marks messages read, sorts, assigns, snoozes and labels them, and sends replies. Checking a mailbox for mail now needs `mailboxes.manage`.

## Agents

Email bodies are stored and returned as data and never acted on as instructions. That matters once agents read replies and draft answers: an agent with `inbox.read` can read, and only a token with `inbox.manage` can reply, through the same recipient check as everyone else.
