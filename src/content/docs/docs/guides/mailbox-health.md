---
title: Mailbox health
description: Every mailbox graded from every signal, with each problem explained and how to fix it, and automatic pausing on bounce spikes.
sidebar:
  order: 9
---

<span class="pill shipped">Shipped</span>

Every mailbox is graded **ok**, **warning** or **critical** (or **paused**) from every signal Outflare has:

- **Sign-in and inbox sync errors**, translated into plain words. For example "535 5.7.8" becomes "app password rejected", and a disabled account says it is suspended.
- **Send failures** and **bounce rate**.
- **The domain's setup**: SPF, DKIM, DMARC and blocklists, from [sending domains](/docs/guides/sending-domains/).
- **New mailboxes sending without warm-up.**

Each problem comes with what to do about it. See it on the Mailboxes page, at `GET /v1/workspaces/{ws}/mailbox-health`, or ask an agent (`get_mailbox_health`).

## Sends, replies and bounces

A mailbox's totals count the real email sent from it: what Outflare sends, plus what a connected Instantly or Smartlead account sends from the same mailbox. Outflare reads those daily counts from your own sequencer account about once an hour. Warm-up mail is never counted.

For one mailbox day by day, use `GET /v1/workspaces/{ws}/mailboxes/{id}/activity` (up to 90 days), or ask an agent (`get_mailbox_activity`).

## Automatic pausing

A mailbox whose bounce rate spikes is paused before it hurts the domain. The default is 5% of at least 20 sends in 24 hours. The reason shows on the mailbox and in the audit log. Change the threshold, or turn pausing off, with `PUT /v1/workspaces/{ws}/mailbox-health/settings` or the MCP tool `update_mailbox_health_settings`.
