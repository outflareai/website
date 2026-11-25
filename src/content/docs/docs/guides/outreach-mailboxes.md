---
title: Outreach mailboxes
description: Order Google or Microsoft mailboxes for cold outreach from Outflare, paid from your balance, with domain DNS, renewals and sign-in details in one place.
sidebar:
  order: 2.5
  badge:
    text: Cloud
    variant: note
---

<span class="pill cloud">Outflare Cloud</span> Outreach mailboxes are Google Workspace or Microsoft 365 mailboxes that Outflare sets up for a brand's cold outreach. You order them from the app, pay for them from your workspace's balance, and manage them in the same place as the mailboxes you [import](/docs/guides/import-mailboxes/) from other providers.

It runs only in Outflare Cloud, at [app.outflare.ai](https://app.outflare.ai/). Open **Outreach Mailboxes** from the menu and pick the brand.

## Add domains

Choose **Add domains** and enter the domains you already own, one per line, with the email platform they use. Then pick how each domain gets its mail records:

- **Point the nameservers at Outflare.** Outflare shows two nameservers to set at your domain's registrar, then adds and looks after the mail records itself.
- **Keep DNS in your own Cloudflare.** Connect your Cloudflare account on the [Connectors](/docs/integrations/connectors/) page with a token that can edit DNS. Outflare adds only the records it needs, and never changes the others.
- **Keep DNS where it is.** Outflare lists each record to copy into your DNS.

The **Domains** tab lists every domain with its status, its mail records and how many mailboxes it holds. Open a domain to see its DNS, its settings and the mailboxes on it. Outflare checks the records until each one shows, and tells you if a domain needs you.

## Add mailboxes

1. Choose **Add mailboxes** and pick the domains the mailboxes go on.
2. Add the people who send from them: a whole team at once, or one person at a time from the dropdown. The list comes from your team directory, and you can type a new name. Each mailbox belongs to one of the brand's [senders](/docs/guides/mailbox-allocation/) and takes their name, photo and signature.
3. Say how many mailboxes each person gets. Outflare suggests addresses in a mix of forms (first.last, first initial and so on) and spreads them across your domains, emptiest first, up to the brand's limit of mailboxes per domain (5 unless you change it in the brand's settings).
4. Review the addresses, change any you like, then place the order.

An order is paid from your company's balance, in full, before anything is set up. If the balance doesn't cover it, the order waits until you add funds or cancel it. You can save an order as a draft and finish it later.

The **Orders** tab shows each order's progress: paid, being set up, then ready. Outflare checks that every mailbox is set up correctly before it calls it ready.

## Manage a mailbox

The **Mailboxes** tab lists every mailbox with its person, status, health, warm-up, sequencer and renewal date. Open one for its own page:

- **Overview**: its person, platform, daily limit and whether sending works.
- **Health**: how it is doing (see below).
- **Credentials**: its password or a current 2-step code. Only people signed in to Outflare can see them, never API tokens or agents, and every reveal is recorded. A brand setting chooses who may see them: everyone who can see the brand (the default), or only owners and admins, with or without the mailbox's own person.
- **Settings**: the name, photo and signature it sends with.
- **Forwarding**: where its mail is forwarded, and its recovery email.

To send from a mailbox, connect it to the brand: open the Gmail or Outlook connector, choose **Connect**, and sign in as that mailbox. The Credentials tab says when it is connected.

## Mailbox health

Each mailbox has one label: **Healthy**, **Watch**, **At risk** or **Paused**, with the reason beside it. Its Health tab shows:

- emails sent, replies, reply rate and bounces for the last 7 days;
- one chart of sent, replies and bounces by day for the last 14 days;
- its recent bounces: the date, who the email was for and what came back;
- the checks behind the label, each with what to do about it.

The numbers count real email only, never warm-up. They include what Outflare sends from the mailbox and what a connected Instantly or Smartlead account sends from it. [Mailbox health](/docs/guides/mailbox-health/) explains the checks.

## Sequencers and warm-up

The **Sequencers** tab lists the sequencers connected to the brand and whether each is working. **Connect a sequencer** shows the ones Outflare supports; each runs on your own account with them, which you connect on its [connector](/docs/integrations/connectors/) page. Outflare sends no warm-up mail of its own: each mailbox turns [warm-up](/docs/guides/warmup/) on or off in your connected sequencer, and its replies arrive in the [inbox](/docs/guides/inbox/).

## Renewals

A mailbox renews every month on the day it was ordered. **Billing & renewals** opens with what is due in the next 30 days, the next renewal date, the monthly total and a table of renewals by date, and warns when your balance won't cover them.

Five days before a renewal, Outflare sets it aside from your balance. If the balance doesn't cover it by one day before, the mailbox doesn't renew and ends with its paid month. You get an [alert](/docs/guides/alerts/) when a renewal isn't covered yet, and again if it is missed.

- **Cancel** a mailbox to stop it renewing. It keeps working until the end of its paid month.
- **Keep** a cancelling mailbox before its renewal cutoff to change your mind.
- **Reactivate** an ended mailbox within 30 days to get the same address back, as a new month paid from your balance.
- **Release a domain** once every mailbox on it is cancelling. No new mailboxes can be ordered on it while it is released.

## API and agents

Everything here, except sign-in details, is in the Outreach Mailboxes API, described at `https://app.outflare.ai/v1/cloud/outreach/openapi.json`. API tokens need the `mailboxes.read` or `mailboxes.manage` scope. Agents can use it over MCP at `/v1/workspaces/{workspace}/cloud/outreach/brands/{brand}/mcp`, with one tool per operation and the same scopes as the token they use. Orders spend your balance, so send an idempotency key with each one and reuse it to retry.
