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

By default, unsubscribe and click links point at your instance's `PUBLIC_URL`. A tracking domain puts them on a domain of your own, such as `links.yourdomain.example`, so links in your emails match your brand and don't share a reputation with anyone else's.

1. On the **Domains** page, under **Tracking domain**, enter a subdomain of your sending domain.
2. At your DNS host, add a `CNAME` record from that subdomain to the target shown (your instance's host), or use the one-click button to [approve it at your DNS host or add it through Cloudflare](/docs/guides/dns-records/).
3. Click **Check now**, or wait: Outflare checks on its own over the next hour. Once the record is found the domain shows **In use**, and new emails use it.

Each tracking domain shows its steps (add the DNS record, Outflare finds it, the HTTPS certificate on Outflare Cloud, in use), marks the one it is on, and says whether the next move is yours or Outflare's. The page updates on its own while a step is running.

On Outflare Cloud, point the `CNAME` at `domains.outflare.ai` (the target shown). You don't need a Cloudflare account or a certificate of your own: once the record is found, Outflare gets the domain's HTTPS certificate for you. The domain shows **Setting up HTTPS** for a few minutes, and new emails switch to it as soon as the certificate is ready. Until then they keep using Outflare's own address, so no link goes out that a browser would warn about. If the certificate can't be issued (for example, a `CAA` record on your domain doesn't allow it), the domain shows **HTTPS failed** with the reason; fix it and click **Check now**. The tracking domain's `https_status` in the API says the same: `pending`, `active` or `failed`.

A tracking domain serves only those links (click, open and unsubscribe). The rest of Outflare, sign-in included, isn't available on it. If you self-host, give the tracking domain its own HTTPS certificate on your proxy, as you did for `PUBLIC_URL`; `https_status` is then `null`.

DNS changes can take up to an hour to show. If a verified domain later stops pointing at your instance, it's marked **Not pointing here** and emails go back to `PUBLIC_URL` until you fix it.

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/tracking-domains \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" -d '{"domain": "links.acme.example"}'
curl -X POST https://outflare.example.com/v1/workspaces/$WS/tracking-domains/$ID/check -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

These need scope `mailboxes.manage`, and listing needs `mailboxes.read`. Agents use `list_tracking_domains`, `add_tracking_domain` and `check_tracking_domain`.

### If your DNS is on Cloudflare

The one-click Cloudflare button adds the record for you, set up correctly. To add it by hand, open your domain in the Cloudflare dashboard, go to **DNS** > **Records**, click **Add record** and fill in:

| Field | Value |
| --- | --- |
| Type | `CNAME` |
| Name | the subdomain only, such as `links` for `links.yourdomain.example` |
| Target | the target shown on the Domains page (`domains.outflare.ai` on Outflare Cloud) |
| Proxy status | **DNS only** (grey cloud), not Proxied (orange cloud) |
| TTL | Auto |

Click **Save**, wait 5 minutes, then click **Check now**.

### Common mistakes

- **The record is Proxied (orange cloud).** Cloudflare then hides the `CNAME` and answers with its own addresses, so the check says the domain *has no CNAME record* even though you can see it in Cloudflare. Edit the record, switch **Proxy status** to **DNS only** and save. Outflare already puts its own protection in front of tracking links, so you lose nothing.
- **Checking straight after a change.** DNS servers remember the old answer for a few minutes (5 on Cloudflare's Auto TTL, up to an hour elsewhere). If you just fixed the record and the check still fails, wait 5 minutes and click **Check now** again.
- **The full domain typed into Name.** Some DNS hosts add your domain to the name for you, so `links.yourdomain.example` becomes `links.yourdomain.example.yourdomain.example`. Enter only `links` when the form already shows your domain next to the field.
- **The wrong target.** The record must point at exactly the target shown on the Domains page, not at the app's own address or your website. The check says *points to ..., not ...* when it doesn't.
- **Another record with the same name.** A name can't have a `CNAME` and also an `A`, `AAAA` or `TXT` record. Delete the others for that subdomain first.
- **A `CAA` record that blocks the certificate.** If your domain has `CAA` records, they must allow the certificate authority Outflare Cloud uses, or the domain shows **HTTPS failed**. Remove the `CAA` records or add the authority named in the error, then click **Check now**.
- **Using your main domain.** Use a subdomain (`links.yourdomain.example`), never the domain your website runs on. Pointing the main domain here would take your website offline.

## Click tracking

Turn on **Track link clicks** in a sequence's settings (`"track_clicks": true`) to swap each link in its emails for a short redirect, so clicks can be counted. The unsubscribe link is never swapped.

- **Off by default.** Redirected links can count against you with spam filters. Leave it off unless you need clicks, and use it with a tracking domain.
- **Scanner clicks are left out.** Mail filters open every link before a person sees the email. A click from a known scanner, one with no browser details, or one within a minute of sending isn't counted.
- **Where clicks show:** the number of leads who clicked appears on the sequence (`stats.clicked`), and `clicks`, `clicked_leads` and `click_rate` appear in [reports](/docs/guides/reports/).

Opens are not tracked. Tracking pixels hurt deliverability, and Apple Mail loads them for every message, so open counts can't be trusted.
