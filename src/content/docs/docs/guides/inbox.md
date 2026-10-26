---
title: Reply inbox
description: One inbox for replies across every connected mailbox and sequencer, labelled by what they mean, with tags, saved views, stop on reply, opt-outs and bounce reports handled for you.
sidebar:
  order: 8
---

<span class="pill shipped">Shipped</span> IMAP sync, one inbox across all mailboxes, stop on reply, opt-out and bounce handling, labelling replies by what they mean in four groups, assigning, snoozing, coloured tags, saved views, label webhooks, replying from the inbox, and replies from EmailBison. <span class="pill">Next</span> Other sequencers, and AI labelling with your own AI key.

## How mail arrives

Every active mailbox is checked over IMAP every two minutes, so replies arrive without forwarding rules. To check one now, use **Check mail** on the Mailboxes page or call `POST /v1/workspaces/{ws}/mailboxes/{id}/sync`. The mailbox shows `last_synced_at`, and `sync_error` if the last check failed.

Only the INBOX folder is read, and only new mail: the first sync of a mailbox reads the last day, so connecting an inbox you have used before does not import its history. Messages are never changed on the server; they are not even marked as read.

### Replies from EmailBison

Connect an EmailBison account under Connectors and the replies its campaigns get come into the same inbox, marked with their source (`source: emailbison`, filter with `?source=emailbison`). They are read with each 5-minute sync of the account, or now with `POST /v1/workspaces/{ws}/platforms/{id}/sync`, which says how many `replies` it brought in. The first read goes back three days. Nothing is changed in EmailBison: replies are not marked as read there.

They are handled like mail read over IMAP: labelled by the same rules, opt-outs and complaints added to the suppression list, and the lead's sequences stopped when Outflare holds the lead. Mail between your own mailboxes, and mail carrying the warm-up tag you set for the account, is left out.

## Matching and what happens next

Each message is matched to the email it answers by its `In-Reply-To` and `References` headers. If it has none, it is matched to a lead by the sender's address. Then it is sorted and acted on:

| Kind | What it is | What happens |
| --- | --- | --- |
| `reply` | A lead wrote back. | The lead's active sequences stop (`replied`), unless a sequence has **stop on reply** turned off. |
| `reply` with `opt_out` | A reply asking not to be contacted, such as "unsubscribe", "remove me from your list" or "stop emailing me", or a complaint (a spam report or a legal threat). | The address is added to the [suppression list](/docs/guides/import-leads/) and all of the lead's sequences stop (`unsubscribed`). Only the new text is read, never the quoted email below it. |
| `auto_reply` | Out-of-office and other automatic replies ([RFC 3834](https://www.rfc-editor.org/rfc/rfc3834) `Auto-Submitted`, and the usual vacation headers and subjects). | Shown, but the sequence carries on. |
| `bounce` | A delivery failure report ([RFC 3464](https://www.rfc-editor.org/rfc/rfc3464)) or a plain-text bounce from a mailer daemon. | Addresses that failed permanently (5.x.x) are suppressed with reason `bounced` and their sequences stop. Only addresses this workspace actually emailed are acted on, so a forged report cannot suppress anyone else. Delays are ignored. |
| `other` | Not about a lead: newsletters, mail between your own mailboxes. | Kept, out of the way. |

Every action is recorded in the audit log (`lead.replied`, `lead.unsubscribed`, `lead.bounced`).

## Read the inbox

The **Inbox** tab lists replies and auto-replies from every mailbox, newest first, with the lead, company and sequence. Open one to see the whole conversation with that lead through that mailbox: what was sent and what came back, in order.

```sh
curl "https://outflare.example.com/v1/workspaces/$WS/inbox?unread=true" -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

Filter with `kind` (`reply`, `auto_reply`, `bounce`, `other` or `all`), `unread`, `mailbox_id`, `lead_id`, `sequence_id`, `project_id`, `brand` and `q` (sender, subject or text), and page with `before`. The response includes `unread_replies`. `GET /inbox/{id}` returns the message and its `thread`; `PATCH /inbox/{id}` with `{"read": true}` marks it read.

## Labels and working through replies

Each reply also gets a label for what it means. Labels come in four groups, so you can work the ones that matter first:

| Group | Labels | What to do |
| --- | --- | --- |
| `hot` | `interested`, `meeting_booked`, `question` | Answer these first. |
| `later` | `referral`, `not_now`, `objection` | Worth coming back to. |
| `closed` | `not_interested`, `wrong_person`, `unsubscribe`, `complaint` | Finished. Opt-outs and complaints are suppressed. |
| `automatic` | `out_of_office`, `auto_reply` | Sent by a machine. |

Built-in rules label the clear cases as they arrive and leave the rest unlabelled, so a person or an agent can read them and decide. Every reply says:

- `category_source`: who labelled it, `rules`, `ai`, `human`, `api_token` or `agent`.
- `category_confidence`: how sure they were, from 0 to 1. Rules and people are 1.
- `needs_review`: a person should check the label. Setting the label settles the review.
- `group`: the label's group.
- `source`: where the reply came from, `mailbox` for Outflare's own mailboxes or a connected sequencer.

The inbox opens on what still needs handling. Unsubscribes and automatic replies need nothing from you, so they arrive already done.

| Field | What it does |
| --- | --- |
| `category` | Label a reply, or correct the rules. |
| `assigned_to` | Give it to a workspace member (a user id), or `null`. |
| `snoozed_until` | Hide it until a time. It comes back on its own. |
| `done` | Mark it handled, or reopen it. |
| `labels` | Your own tags, such as `pricing` or `follow up in q1`. A new one joins the workspace's tags. |
| `needs_review` | Flag it for a person to check, or clear the flag. |

```sh
curl -X PATCH https://outflare.example.com/v1/workspaces/$WS/inbox/$ID \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"category": "interested", "assigned_to": "'$USER_ID'"}'
```

Filter the list with:

- `status`: `open`, `snoozed`, `done` or `all`.
- `category`: one label, several separated by commas, or `none` for unlabelled.
- `group`: `hot`, `later`, `closed` or `automatic`, or several separated by commas.
- `source`: `mailbox` or a sequencer, such as `emailbison`.
- `tag`: one tag, or several for replies with any of them.
- `assigned_to`: `me`, `none` or a user id.
- `needs_review` and `min_confidence`.

Every change is recorded in the audit log. Agents use `triage_inbox_message`, and `list_members` to find who to assign to.

## Tags and saved views

Tags have a colour and are listed with how many replies carry each. Manage them under **Tags** in the inbox, or with `GET`, `POST`, `PATCH` and `DELETE` on `/v1/workspaces/{ws}/inbox-tags`. Renaming a tag renames it on every reply; deleting one takes it off them.

Save a set of filters as a view from the **Views** menu, or with `POST /v1/workspaces/{ws}/inbox-views` and a name and `filters` (the same names as the list's filters). A view is yours alone unless you share it. Views an API token or agent saves are shared, so everyone sees what an agent set up. Agents use `list_inbox_views`, `create_inbox_view` and the tag tools.

## Send labels to other systems

Every new or changed label is an `inbox.classified` event, with the label, its group, who set it, how sure they were and the ids of the reply, lead, sequence and mailbox. Send it to a CRM, Slack or Zapier with a [webhook](/docs/api/webhooks/). To hear only about some labels, give the webhook `categories`, as labels or groups:

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/webhooks \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/hooks/hot-leads", "events": ["inbox.classified"], "categories": ["hot"]}'
```

## Reply from the inbox

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/inbox/$ID/reply \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"body": "Tuesday at 10 works. I will send an invite."}'
```

The reply goes from the mailbox the message arrived at, in the same thread (`Re:` subject, `In-Reply-To` and `References`), so it lands where the lead expects. It passes [the policy check](/docs/concepts/policy-check/)'s recipient step: replying to someone who opted out or bounced returns `409`. The mailbox must be active. A reply you write by hand is not held to a sequence's sending window or the mailbox's pacing, but it does count towards the mailbox's daily limit.

A reply that came from EmailBison is answered through EmailBison, from the sender email it arrived at and in the same thread, after the same recipient check.

## Scopes

`inbox.read` reads the inbox and conversations. `inbox.manage` marks messages read, labels, assigns, snoozes and tags them, manages tags, and sends replies. Saving views needs only `inbox.read`. Checking a mailbox for mail now needs `mailboxes.manage`.

## Agents

Email bodies are stored and returned as data and never acted on as instructions. That matters once agents read replies and draft answers: an agent with `inbox.read` can read, and only a token with `inbox.manage` can reply, through the same recipient check as everyone else.
