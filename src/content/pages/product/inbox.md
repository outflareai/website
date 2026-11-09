---
title: Unified inbox for cold email replies · Outflare
description: One unified inbox for replies from every mailbox and EmailBison, labelled by what they mean, with stop on reply, opt-outs, bounces, tags and saved views.
h1: One inbox for every reply, sorted by what it means.
label: Inbox
lede: Replies from every connected mailbox and sequencer land in one inbox. Each is labelled, such as interested, not now or opt-out, so you answer the hot ones first, while stop on reply, unsubscribes and bounces are handled for you.
answer: Outflare's unified inbox collects replies from every mailbox you send from, checked over IMAP every two minutes, plus replies to your EmailBison campaigns. Each reply stops that lead's sequence, opt-outs and hard bounces go onto the suppression list, and every reply is labelled in four groups (hot, later, closed and automatic) by built-in rules or by your own AI model. You reply from the same mailbox and thread.
points:
  - Every mailbox checked every two minutes, no forwarding rules
  - Labels in four groups, hot replies first
  - Opt-outs and bounces suppressed automatically
  - Reply rules that snooze, wait or move deals
docs:
  - label: Reply inbox
    href: /docs/guides/inbox/
  - label: Alerts
    href: /docs/guides/alerts/
  - label: Webhooks
    href: /docs/api/webhooks/
  - label: Sequences and sending
    href: /docs/guides/sequences/
faqs:
  - q: What is a unified inbox for cold email?
    a: It is one place that collects replies from all the mailboxes a team sends from, so nobody has to sign in to each one. In Outflare it also stops the lead's sequence, handles opt-outs and bounces, and labels each reply by what it means.
  - q: Does Outflare change anything in my mailboxes?
    a: No. Only the INBOX folder is read, and only new mail. Messages are never changed on the server, not even marked as read, and the first sync reads only the last day, so an inbox's history isn't imported.
  - q: How are replies labelled?
    a: Built-in rules label the clear cases as they arrive. If you connect your own AI model, it reads the replies the rules leave unlabelled, labels them on its own when it is at least 80% sure, and flags the rest for a person to check. Outflare never uses an AI key of its own.
  - q: Can I reply from the inbox?
    a: Yes. The reply goes from the mailbox the message arrived at, in the same thread, so it lands where the lead expects. It still passes the recipient check, so replying to someone who opted out or bounced is refused.
  - q: Does it work with Instantly or Smartlead replies?
    a: Replies from EmailBison campaigns come into the inbox today. Other sequencers are next on the list.
related:
  - /product/cold-email/
  - /product/deliverability/
  - /product/customer-data/
  - /product/outcomes/
  - /product/support/
  - /alternatives/instantly/
updated: 2026-11-09
order: 50
---

## What happens when a reply arrives

Each message is matched to the email it answers by its headers, or to a lead by the sender's address, and then acted on:

| Kind | What it is | What happens |
| --- | --- | --- |
| Reply | A lead wrote back | The lead's active sequences stop, unless a sequence turns stop on reply off |
| Opt-out | "Unsubscribe", "remove me", "stop emailing me", or a complaint | Added to the suppression list, and every sequence for that lead stops |
| Auto-reply | Out of office and other automatic replies | Shown, and the sequence carries on |
| Bounce | A permanent delivery failure | Suppressed as bounced, and the sequences stop |
| Other | Newsletters, mail between your own mailboxes | Kept, out of the way |

Only the new text of a reply is read for an opt-out, never the quoted email below it. Bounce reports act only on addresses your workspace actually emailed, so a forged report can't suppress anyone else. Every action is in the audit log.

## Labels in four groups

| Group | Labels | What to do |
| --- | --- | --- |
| Hot | Interested, meeting booked, question | Answer these first |
| Later | Referral, not now, objection | Worth coming back to |
| Closed | Not interested, wrong person, unsubscribe, complaint | Finished |
| Automatic | Out of office, auto-reply | Sent by a machine |

The inbox opens on what still needs handling. Unsubscribes and automatic replies arrive already marked done. Every reply says who labelled it (rules, AI, a person, an API token or an agent) and how sure they were.

With your own [AI model](/docs/agents/ai-models/) connected, replies the rules can't place are read in the background. The AI also pulls out details such as a return date, a referred person's name and email, or a meeting time. The model is told the reply is data, never instructions, and each call is billed by your provider to your account.

## Work through replies as a team

- **Assign** a reply to a teammate, **snooze** it until a time, or mark it **done**.
- **Tags** with colours, such as `pricing` or `follow up in q1`, with counts for each.
- **Saved views** of any filters, private or shared. Views an agent saves are shared, so everyone sees what it set up.
- **Alerts for hot replies**: interested, meeting booked and question replies raise an alert, emailed to the person assigned and, if you choose, posted to Slack.

## Reply rules

Once a label is certain, a reply rule can act on it, and everything a rule does can be undone:

- **Not now**: snooze the reply until the date it gives (or 90 days), or restart the sequence then.
- **Out of office**: move the lead's next email to the day after their return date.
- **Referral**: offer to add the referred person as a lead, add them, or add and enrol them in a sequence. Someone on the opt-out list is never enrolled.
- **Move deals**: pick a stage for a label, such as *Interested → Qualified*, and the person's open deal in Outflare's own CRM moves forward. A deal never moves backwards, and a stage a person set is never overridden.

A reply's text only ever picks a label, never an action.

## Send labels to other systems

Every new or changed label is an `inbox.classified` event. Send it to a CRM, Slack or Zapier with a [webhook](/docs/api/webhooks/), filtered to the labels or groups you care about, such as only hot replies.

## For agents

Agents read the inbox with `list_inbox` and `get_inbox_message` and label, assign and tag with `triage_inbox_message` in the [MCP server](/product/mcp/). A token with only `inbox.read` can read; only `inbox.manage` can reply, through the same recipient check as everyone else. Email bodies are always treated as data, never as instructions.
