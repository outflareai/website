---
title: Email deliverability, DMARC checks and warm-up · Outflare
description: Check SPF, DKIM, DMARC and blocklists daily for every sending domain, grade every mailbox, switch warm-up in your sequencer, and plan domains and mailboxes.
h1: Email deliverability you can see, domain by domain.
label: Deliverability
lede: Every sending domain is checked every day for SPF, DKIM, DMARC, MX and blocklists, with the exact DNS record to fix each problem. Every mailbox is graded from its bounces, sign-in errors and warm-up score, and paused before a bounce spike hurts the domain.
answer: Outflare checks the deliverability of every domain and mailbox you send cold email from. Each sending domain's SPF, DKIM, DMARC and MX records and its Spamhaus DBL and SURBL standing are checked daily, with the exact record to add when something is wrong. Mailboxes are graded from bounces, sign-in errors and the warm-up score from your connected EmailBison, Instantly or Smartlead, and pausing and daily caps are enforced on every email.
points:
  - Daily SPF, DKIM, DMARC and blocklist checks
  - Automatic pause on a bounce spike or a listed IP
  - Warm-up switched on in your own sequencer
  - Domains and mailboxes planned and followed to retirement
docs:
  - label: Sending domains
    href: /docs/guides/sending-domains/
  - label: Mailbox health
    href: /docs/guides/mailbox-health/
  - label: Warm up mailboxes
    href: /docs/guides/warmup/
  - label: Plan domains and mailboxes
    href: /docs/guides/infrastructure/
  - label: Sending servers
    href: /docs/guides/sending-servers/
faqs:
  - q: How does Outflare check DMARC?
    a: Every sending domain is checked when it is added and every day after for a v=DMARC1 record at _dmarc and its policy. A missing record is a critical issue with the record to add, starting at p=none and moving to p=quarantine once SPF and DKIM pass. Re-check DNS runs the check straight away.
  - q: Does Outflare warm up my mailboxes?
    a: Outflare sends no warm-up mail of its own. It switches warm-up on or off for each mailbox in your connected EmailBison, Instantly or Smartlead account, shows that sequencer's warm-up score, and uses the score to decide when a new mailbox is ready to send.
  - q: What happens when a mailbox's bounce rate spikes?
    a: It is paused before it hurts the domain. The default is 5% of at least 20 sends in 24 hours, and the reason shows on the mailbox and in the audit log. You can change the threshold or turn pausing off.
  - q: Which blocklists does it check?
    a: Sending domains are checked against the Spamhaus DBL and SURBL. Sending servers outside Google and Microsoft have their IPs checked against Spamhaus ZEN, SpamCop and Barracuda every day, and a server with a listed IP pauses until every IP is clear.
  - q: Can Outflare buy domains and mailboxes for me?
    a: An infrastructure plan can buy them in your own accounts, by hand or through a supplier connector, once an owner or admin approves it. Outflare never resells domains or mailboxes; you pay your registrar and mailbox provider directly.
related:
  - /product/cold-email/
  - /glossary/spf-dkim-dmarc/
  - /glossary/email-warmup/
  - /best/email-warmup-tools/
  - /compare/outflare-vs-smartlead/
  - /product/inbox/
updated: 2026-11-09
order: 35
---

## Sending domains

A domain is added the first time you connect a mailbox on it, or by hand, for example to check a domain you just bought before you buy inboxes on it. Each is checked when added and every day:

| Check | Looks for |
| --- | --- |
| MX | Where replies are delivered, and which provider hosts the domain |
| SPF | Exactly one `v=spf1` record, including your provider, ending in `~all` or `-all` |
| DKIM | A key under your provider's selector or a common one |
| DMARC | A `v=DMARC1` record at `_dmarc`, and its policy |
| Blocklists | The domain on the Spamhaus DBL and SURBL |

Each domain is **Healthy**, **Needs attention** or **At risk**, with its issues listed most severe first. Where the fix is a DNS record, the record is given exactly, ready to copy. A bounce rate over 2% in the last 7 days is a warning and over 5% is critical. When a blocklist refuses a lookup through a public resolver, the result is **couldn't check**, never a false "not listed".

You can pause a domain or give it a daily cap across all its mailboxes. Both are part of the [policy check](/docs/concepts/policy-check/), so no script or agent can send around them. See [Sending domains](/docs/guides/sending-domains/), and [SPF, DKIM and DMARC](/glossary/spf-dkim-dmarc/) for what each record does.

Want a quick look first? The free [SPF, DKIM and DMARC checker](/tools/dmarc-checker/) and [domain blacklist checker](/tools/blacklist-checker/) run the same checks on any domain, no account needed.

## Mailbox health

Every mailbox is graded **ok**, **warning** or **critical** from every signal Outflare has: sign-in and sync errors translated into plain words (a "535 5.7.8" becomes "app password rejected"), send failures and bounce rate, its domain's DNS and blocklists, and new mailboxes sending without warm-up. Each problem comes with what to do. A mailbox whose bounce rate spikes is paused on its own. See [Mailbox health](/docs/guides/mailbox-health/).

## Warm-up, in your sequencer

A new inbox that sends cold email straight away tends to land in spam. Warm-up builds a sending history first. Outflare doesn't send warm-up mail: it switches warm-up on for each mailbox in your connected **EmailBison**, **Instantly** or **Smartlead** account, with one click for a mailbox, a pool or every mailbox, and shows the sequencer's score next to everything else about it.

- Plan on two weeks of warm-up before a new mailbox sends sequences, and leave it on afterwards.
- A score under 75 keeps a mailbox from taking new leads.
- Paste the sequencer's warm-up tag, and warm-up mail stays out of your reply inbox.

See [Warm up mailboxes](/docs/guides/warmup/) and [email warm-up](/glossary/email-warmup/).

## Infrastructure plans

Say "10 domains and 30 mailboxes by the 14th" and Outflare turns it into one plan: suggested domain names from your brand, mailbox names from the people who send, a timeline, the daily capacity you'll get and warnings if the date is too soon. A draft spends nothing. Approving it, which needs an owner, an admin or a token given that scope on purpose, starts the build:

1. **Buy** the domains and mailboxes in your own accounts, by hand or through a supplier.
2. **DNS** is checked every 10 minutes until MX, SPF and DKIM are in place.
3. **Connect** each mailbox as soon as it signs in.
4. **Warm up**, then move each mailbox from warming to ready once its score reaches 85, and rest it if the score falls below the plan's floor.

See [Plan domains and mailboxes](/docs/guides/infrastructure/).

## Sending servers

Mailboxes from cold-email SMTP vendors or your own mail server share a few IPs, so one listing hurts them all. Outflare groups them by SMTP host, checks each IPv4 address against Spamhaus ZEN, SpamCop and Barracuda every day, pauses the server when an IP is listed and resumes it once every IP is clear, and can hold the whole server to one daily limit. See [Sending servers](/docs/guides/sending-servers/).

## Adding DNS records

For a [tracking domain](/docs/guides/tracking-domains/) that puts unsubscribe and click links on your own domain, and for lifecycle sending domains, the one-click button opens your DNS host's own screen with the exact records when the host supports Domain Connect, and you approve them there. Outflare gets no account or token for your DNS. See [Adding DNS records](/docs/guides/dns-records/).

## For agents

Agents read the same issues with stable codes through `list_domains`, `get_domain`, `list_mailboxes` and `get_infrastructure` in the [MCP server](/product/mcp/), and turn warm-up on with `set_warmup`. `get_status` lists domains with critical problems and mailboxes that can't sign in among the workspace's blockers.

## What Outflare doesn't do

- It doesn't send warm-up mail or run a warm-up network.
- It doesn't sell domains, mailboxes or sending. You pay your providers directly.
