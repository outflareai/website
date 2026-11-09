---
title: What is email warm-up? How mailbox warm-up works · Outflare
description: Email warm-up explained, how warm-up networks build a new mailbox's sending reputation, how long it takes, how to read a warm-up score, and where Outflare fits.
h1: What is email warm-up?
label: Email warm-up
term: Email warm-up
lede: Email warm-up builds a new mailbox's reputation before it sends cold email, by sending and receiving mail that gets opened, replied to and rescued from spam. Here is how it works and how long it takes.
answer: "Email warm-up is the process of building a new mailbox's sending reputation before it sends cold email. A warm-up tool sends a small, slowly growing number of emails between your mailbox and a network of other mailboxes, which open them, reply and move them out of spam, so Gmail and Microsoft see a history of wanted mail. Most sequencers include warm-up; a common plan is about two weeks before a new mailbox sends sequences, with warm-up left on afterwards."
points:
  - Warm-up mail gets opened, replied to and rescued from spam
  - Volume starts low and rises slowly, as Google advises for all senders
  - A warm-up score from 0 to 100 shows readiness
  - Outflare sends no warm-up mail; it switches warm-up in your sequencer
docs:
  - label: Warm up mailboxes
    href: /docs/guides/warmup/
  - label: Mailbox health
    href: /docs/guides/mailbox-health/
  - label: Infrastructure plans
    href: /docs/guides/infrastructure/
faqs:
  - q: How long does email warm-up take?
    a: Outflare's docs plan on two weeks before a new mailbox sends sequences. Smartlead's FAQ suggests at least two weeks for existing accounts and one to two months for new domains. Either way, leave warm-up on afterwards to protect the mailbox's reputation.
  - q: Is email warm-up still needed?
    a: For new mailboxes and domains used for cold email, yes. Google advises every sender to start with a low volume to engaged users and increase it slowly, and a new mailbox has no history to rely on.
  - q: Does Outflare warm up mailboxes?
    a: Outflare sends no warm-up mail of its own. It turns warm-up on or off in a connected EmailBison, Instantly or Smartlead account, shows each mailbox's warm-up score, and uses the score to decide when a mailbox is ready.
  - q: Can warm-up fix a bad sender reputation?
    a: Not on its own. Warm-up helps a new or rested mailbox build history, but if the domain's SPF, DKIM or DMARC is broken, it is on a blocklist, or your cold email gets complaints, fix those first.
  - q: What is a good warm-up score?
    a: Scores are each tool's own, usually 0 to 100. In Outflare's infrastructure plans, a mailbox counts as ready once its warm-up days are done and its sequencer's score is at least 85, and a score under 75 keeps it from taking new leads.
related:
  - /best/email-warmup-tools/
  - /product/deliverability/
  - /glossary/spf-dkim-dmarc/
  - /product/cold-email/
  - /best/cold-email-software/
  - /compare/outflare-vs-smartlead/
checked: 2026-11-09
updated: 2026-11-09
order: 60
---

## How it works

Gmail and Microsoft decide where mail lands partly on the sending mailbox's history: do people open its mail, reply, mark it as not spam? A new mailbox has no history, so cold email from it is more likely to land in spam.

A warm-up tool builds that history:

1. **You connect the mailbox** to a sequencer or warm-up service with a warm-up network.
2. **It sends a few emails a day** between your mailbox and other mailboxes in the network.
3. **The network engages.** Recipients open the emails, reply, and move any that land in spam to the inbox.
4. **Volume rises slowly.** Daily counts grow over days and weeks, with some randomness so the pattern looks natural.
5. **A score tracks progress.** Most tools report a warm-up or deliverability score.

Warm-up emails carry a short code so the network's filters can find them. Keep them out of your reply inbox by filtering on that code.

## Why it matters

Google's [email sender guidelines](https://support.google.com/a/answer/81126) tell every sender to "start with a low sending volume to engaged users, and slowly increase the volume over time", and to watch spam rates in Postmaster Tools. Warm-up does the early part of that for a mailbox that will send cold email, where recipients have not asked to hear from you.

It is one part of deliverability, not all of it. Warm-up won't fix a broken [SPF, DKIM or DMARC](/glossary/spf-dkim-dmarc/) record, a blocklisted domain or a list full of bad addresses.

## How long to warm up

| Situation | Typical plan |
| --- | --- |
| New mailbox on a domain that already sends | About two weeks before sequences |
| New domain | Longer; Smartlead's FAQ suggests one to two months |
| After sending | Leave warm-up on to protect reputation |

## Where to run it

Most cold email sequencers include warm-up: Instantly, Smartlead, lemlist (lemwarm) and EmailBison among them. Standalone tools such as MailReach, Warmy and Warmup Inbox warm mailboxes for senders without it. They are compared on [the best email warm-up tools](/best/email-warmup-tools/).

Run warm-up for each mailbox in one tool only. Warming in two at once doubles the warm-up mail.

## How Outflare handles warm-up

Outflare is not a warm-up tool and sends no warm-up mail. It works with the warm-up in your sequencer:

- **Turn it on from Outflare.** Connect EmailBison, Instantly or Smartlead, then turn warm-up on for one mailbox, a pool or all of them; Outflare switches it in that sequencer. A mailbox in no connected sequencer can't be warmed up until you add it to one.
- **See the score in context.** Each mailbox's warm-up score sits next to its bounces, DNS and blocklists in [mailbox health](/docs/guides/mailbox-health/). A mailbox warming in two sequencers is flagged.
- **Let the score decide.** In an [infrastructure plan](/docs/guides/infrastructure/), a mailbox moves from warming to ready once its warm-up days are done and its score is at least 85, and rests when it falls below the plan's floor (75 by default).
- **Keep warm-up out of the inbox.** Paste your sequencer's warm-up tag and Outflare's reply inbox leaves those emails out, without opening or moving them.

Your sequencer account is your own and billed by them. See [Warm up mailboxes](/docs/guides/warmup/) and [deliverability](/product/deliverability/).
