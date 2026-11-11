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

## Order mailboxes

1. Choose the domains the mailboxes go on.
2. Add the people who send from them. Each mailbox belongs to one of the brand's [senders](/docs/guides/mailbox-allocation/) and takes their name, photo and signature. You can add new people as you order.
3. Say how many mailboxes each person gets. Outflare spreads them across your domains, up to the brand's limit of mailboxes per domain (5 unless you change it in the brand's settings).
4. Review the addresses, then pay.

An order is paid from your workspace's balance, in full, before anything is set up. If the balance doesn't cover it, the order waits until you add funds or cancel it. You can save an order as a draft and finish it later.

Each order shows its progress: paid, being set up, then ready. Outflare checks that every mailbox is set up correctly before it calls it ready.

## Domain DNS

Mailboxes need mail records on their domain. On the **Domains** tab, choose one of three ways for each domain:

- **Point the nameservers at Outflare** (recommended). Outflare shows two nameservers to set at your domain's registrar, then adds and looks after the mail records itself.
- **Keep DNS in your own Cloudflare.** Connect your Cloudflare account on the [Connectors](/docs/integrations/connectors/) page with a token that can edit DNS. Outflare adds only the records it needs, and never changes the others.
- **Add the records yourself.** Outflare lists each record to copy into your DNS.

Outflare checks the records until each one shows, and tells you if a domain needs you.

## Sign in to a mailbox

Open a mailbox's **Sign-in details** to show its password or get a current 2-step code. Only people signed in to Outflare can see them, never API tokens or agents, and every reveal is recorded. A brand setting chooses who may see them: everyone who can see the brand (the default), or only owners and admins, with or without the mailbox's own person.

To send from a mailbox, connect it to the brand: open the Gmail or Outlook connector, choose **Connect**, and sign in as that mailbox. The sign-in details say when it is connected.

## Warm-up and sending

Each mailbox can turn [warm-up](/docs/guides/warmup/) on or off in your connected sequencer, and its replies arrive in the [inbox](/docs/guides/inbox/). The overview shows how many mailboxes are ready and how many emails a day they can send between them.

## Renewals

A mailbox renews every month on the day it was ordered. Five days before, Outflare sets aside the renewal from your balance. If the balance doesn't cover it by one day before, the mailbox doesn't renew and ends with its paid month. You get an [alert](/docs/guides/alerts/) when a renewal isn't covered yet, and again if it is missed.

- **Cancel** a mailbox to stop it renewing. It keeps working until the end of its paid month.
- **Keep** a cancelling mailbox before its renewal cutoff to change your mind.
- **Reactivate** an ended mailbox within 30 days to get the same address back, as a new month paid from your balance.
- **Release a domain** once every mailbox on it is cancelling. No new mailboxes can be ordered on it while it is released.

## API and agents

Everything here, except sign-in details, is in the Outreach Mailboxes API, described at `https://app.outflare.ai/v1/cloud/outreach/openapi.json`. API tokens need the `mailboxes.read` or `mailboxes.manage` scope. Agents can use it over MCP at `/v1/workspaces/{workspace}/cloud/outreach/brands/{brand}/mcp`, with one tool per operation and the same scopes as the token they use. Orders spend your balance, so send an idempotency key with each one and reuse it to retry.
