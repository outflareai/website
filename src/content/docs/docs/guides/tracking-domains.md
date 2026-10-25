---
title: Unsubscribe and tracking domains
description: Optional. Use your own domain for unsubscribe and click links, track link clicks per sequence, and control the unsubscribe header.
sidebar:
  order: 11
---

<span class="pill shipped">Shipped</span> Both features are optional and off by default.

## Unsubscribe links and headers

Every email gets a one-click unsubscribe link at `{{unsubscribe_url}}`. By default it also carries `List-Unsubscribe` and `List-Unsubscribe-Post` headers ([RFC 8058](https://www.rfc-editor.org/rfc/rfc8058)), which Gmail and Yahoo expect from bulk senders and show as an unsubscribe button. Unsubscribing adds the address to the suppression list and stops all its sequences.

You can turn the header off for a sequence (**Add an unsubscribe header** in its settings, or `"unsubscribe_header": false`). The link in the body keeps working either way. We recommend leaving it on.

## Tracking domain

By default, unsubscribe and click links point at your instance's `PUBLIC_URL`. A tracking domain puts them on a domain of your own, such as `links.yourdomain.com`, so links in your emails match your brand and don't share a reputation with anyone else's.

1. On the **Domains** page, under **Tracking domain**, enter a subdomain of your sending domain.
2. At your DNS host, add a `CNAME` record from that subdomain to the target shown (your instance's host).
3. Click **Check now**. Once the record is found the domain shows **In use**, and new emails use it.

DNS changes can take up to an hour to show. If a verified domain later stops pointing at your instance, it's marked **Not pointing here** and emails go back to `PUBLIC_URL` until you fix it.

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/tracking-domains \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" -d '{"domain": "links.acme.com"}'
curl -X POST https://outflare.example.com/v1/workspaces/$WS/tracking-domains/$ID/check -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

These need scope `mailboxes.manage`, and listing needs `mailboxes.read`. Agents use `list_tracking_domains`, `add_tracking_domain` and `check_tracking_domain`.

## Click tracking

Turn on **Track link clicks** in a sequence's settings (`"track_clicks": true`) to swap each link in its emails for a short redirect, so clicks can be counted. The unsubscribe link is never swapped.

- **Off by default.** Redirected links can count against you with spam filters. Leave it off unless you need clicks, and use it with a tracking domain.
- **Scanner clicks are left out.** Mail filters open every link before a person sees the email. A click from a known scanner, one with no browser details, or one within a minute of sending isn't counted.
- **Where clicks show:** the number of leads who clicked appears on the sequence (`stats.clicked`), and `clicks`, `clicked_leads` and `click_rate` appear in [reports](/docs/guides/reports/).

Opens are not tracked. Tracking pixels hurt deliverability, and Apple Mail loads them for every message, so open counts can't be trusted.
