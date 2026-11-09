---
title: Open-source cold email software for people and agents · Outflare
description: Cold email sequences that send from your own mailboxes, with one policy check on every email, mailbox rotation, stop on reply, and an API and MCP for your AI agents.
h1: Cold email software your agents can run safely.
label: Cold email
lede: Multi-step sequences sent from your own Google Workspace, Microsoft 365 or SMTP mailboxes. Every email passes one policy check, so neither a person nor an agent can email someone who opted out or send past your limits.
answer: Outflare is open-source cold email software. You import your mailboxes and leads, write a sequence of plain-text steps, and Outflare sends it from the mailboxes allocated to it, in each lead's thread, until they reply. One policy check runs on every email, from the app, the API or an AI agent, so suppression and send limits can't be skipped.
points:
  - Bulk-import hundreds of mailboxes from a reseller CSV
  - Follow-ups reply in the same thread, from the same mailbox
  - Stops on reply, opt-out and bounce, automatically
  - Free to self-host; free hosted during early access
docs:
  - label: Sequences and sending
    href: /docs/guides/sequences/
  - label: The policy check
    href: /docs/concepts/policy-check/
  - label: Import mailboxes
    href: /docs/guides/import-mailboxes/
  - label: Switch from Instantly or Smartlead
    href: /docs/guides/switch-from-instantly-smartlead/
faqs:
  - q: Is Outflare a cold email tool or a whole marketing platform?
    a: Both. Cold email is one module. It shares mailboxes, leads, customer records, the reply inbox and the API with the rest of Outflare, so the same workspace also reads your website analytics, SEO and CRM. You can use only the cold email part.
  - q: Do I need to buy mailboxes from Outflare?
    a: No. Outflare never sells mailboxes or sending. You connect the Google Workspace, Microsoft 365 or SMTP mailboxes you already have, or buy them from any reseller and import their CSV.
  - q: Does Outflare warm up mailboxes?
    a: Outflare sends no warm-up mail of its own. It switches warm-up on and off in a connected EmailBison, Instantly or Smartlead account and shows each mailbox's warm-up score, then uses that score to decide when a new mailbox is ready to send.
  - q: Can an AI agent send cold email through Outflare?
    a: Yes, through the API or the MCP server, with a scoped token. The agent can create sequences and reply, but it can't skip the suppression list or exceed the send limits, because the engine enforces them on every email, and a token can carry its own daily send budget.
  - q: Can I move from Instantly or Smartlead?
    a: Yes. Connect the account and import it. Campaigns become draft sequences, each lead keeps the step it reached and its mailbox, and bounces and unsubscribes go onto the suppression list. Nothing in the other tool is changed.
related:
  - /product/deliverability/
  - /product/leads/
  - /product/inbox/
  - /compare/outflare-vs-instantly/
  - /alternatives/instantly/
  - /best/cold-email-software/
updated: 2026-11-09
order: 30
---

## How it works

1. **Connect your mailboxes.** Import a CSV of Google Workspace, Microsoft 365 or SMTP and IMAP inboxes, up to 5,000 rows per file. Outflare finds the mail servers from each domain's MX records, signs in to every mailbox and checks its DNS.
2. **Add your leads.** Import a CSV or build a list from your own data provider. Duplicates are merged, and anyone on the suppression list is never emailed.
3. **Write the sequence.** Up to 20 plain-text steps, with `{{first_name|there}}`-style variables and fallbacks. Preview any lead to see every step rendered, and what is missing.
4. **Start it.** Outflare allocates enough mailboxes for the volume you set and sends inside each sequence's days and hours, in its time zone.
5. **Handle replies in one inbox.** Replies stop the sequence for that lead, and are labelled by what they mean, such as interested, not now or opt-out.

## One check on every email

Cold email goes wrong in predictable ways: emailing someone who unsubscribed, emailing a customer from a prospecting sequence, pushing one mailbox past its daily limit, or an automated agent sending far more than anyone intended. Outflare puts one gate in front of every outbound email, just before it reaches the mail server:

| Check | What happens when it fails |
| --- | --- |
| Recipient is valid and not suppressed | Blocked, never emailed |
| Inside the sequence's sending window | Waits for the window |
| New-lead and sequence daily limits | Waits for tomorrow |
| Every template variable has a value | Blocked, with the missing field named |
| Sending domain not paused, under its daily cap | Waits |
| The agent token's daily send budget | Waits |
| A ready mailbox with room today | Waits for the soonest one |

There is no way to send around it, from the app, the API, the CLI or an agent. Every blocked or waiting email says why.

## Built for teams that send at volume

- **Rotation across mailboxes.** A sequence sends from a pool of mailboxes, and each follow-up stays on the mailbox that started the thread.
- **Mailbox and domain health.** Every mailbox is graded from its bounces, DNS, blocklists and warm-up score, and paused on a bounce spike.
- **Domains and mailboxes as a plan.** Say "10 domains and 30 mailboxes by the 14th" and approve one plan; Outflare follows each mailbox through warm-up, rest and retirement.
- **Reports by sequence, step, mailbox and domain**, plus meetings and deals from your calendar and CRM, so you see the cost of each meeting.

## For AI agents

Everything above is in the [API](/docs/api/) and the [MCP server](/docs/agents/mcp/), so Claude, ChatGPT or Cursor can build a list, write a sequence, check the recipients and start it. You decide what an agent may do: its token's scopes, its daily send budget and which steps wait for your approval. Every action it takes is in the audit log under its name.

## What Outflare doesn't do

- It doesn't sell mailboxes, sending or data. You use your own mailboxes and data providers, and pay them directly.
- It doesn't send warm-up mail. Warm-up runs in a connected sequencer.
