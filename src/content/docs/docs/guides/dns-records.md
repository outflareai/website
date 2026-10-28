---
title: Adding DNS records
description: How Outflare adds the DNS records it asks for. You approve them once on your DNS host's own screen, with no account connected, or connect Cloudflare.
sidebar:
  order: 12
---

<span class="pill shipped">Shipped</span> Some steps need a record at your DNS host: proving you own a site for [site audits](/docs/guides/site-audits/), pointing a [tracking domain](/docs/guides/tracking-domains/) at Outflare, and the DKIM, SPF and DMARC records for a [sending domain](/docs/integrations/email-providers/) in Lifecycle. Each of these steps has the same **one click** button, and it picks the best way your DNS host allows.

## Approve once at your DNS host

Some DNS hosts support [Domain Connect](https://www.domainconnect.org/), an open standard for adding records with one approval. When yours does and has added Outflare's templates, the button reads **Approve in** followed by your DNS host's name. Here's what happens:

1. Outflare lists the records it needs.
2. You press the button, and your DNS host opens its own screen with those exact records. You sign in there as usual.
3. You approve. The DNS host adds the records and sends you back to Outflare, which checks them straight away.

Outflare gets no account, no token and no access to your DNS. It can't change anything after you approve, and it can't change anything without you. Every link it sends you to is signed, so your DNS host can check it came from Outflare and that nobody changed the records on the way. If you cancel, nothing is added and the button stays.

Outflare's templates, under the provider id `outflare.ai`, cover one kind of change each:

| Template | What it adds |
|---|---|
| `siteverify` | The TXT record that proves a site is yours |
| `trackingdomain` | A CNAME from your subdomain to Outflare |
| `ses`, `resend`, `postmark` | A sending domain's DKIM, return path or MAIL FROM, SPF, and DMARC when you have none, for your own Amazon SES, Resend or Postmark account |
| `googleworkspace`, `microsoft365` | A cold email domain's MX, SPF, DKIM and DMARC on your own Google Workspace or Microsoft 365 |
| `dmarc`, `spf`, `dkim`, `dkimcname`, `servicecname` | One record another service asks for: a DMARC policy, a service added to your SPF record, a DKIM key, or a subdomain pointing at a service |

Each DNS host decides when it adds them. The one-click button uses the first three rows today.

## Connect Cloudflare

When your DNS host can't do the approval yet, the button reads **Connect Cloudflare** if your domain is on Cloudflare. Connect your own Cloudflare account with an API token that can edit DNS, and Outflare adds the missing records itself. It never changes or deletes a record that's already there.

## Everything else

Every step also gives you the records to copy, a prompt for your AI agent, and a message to send to a developer. Outflare checks your domain's own nameservers, so a record shows within a minute or so of being added, whichever way you add it.

## API

The approval link for each kind of record:

- `GET /v1/workspaces/{ws}/seo-sites/{site}/dns/approval`
- `GET /v1/workspaces/{ws}/tracking-domains/{id}/dns/approval`
- `GET /v1/workspaces/{ws}/email-provider-domains/{id}/dns/approval`

Each gives `available` and `url`, or `available: false` with a `reason`: `not_configured`, `no_provider` (your DNS host doesn't support Domain Connect), `not_onboarded` (it does, but hasn't added Outflare's templates yet), `no_template`, `nothing_to_add` or `lookup_failed`. Pass `return` with the page to come back to. Afterwards, `POST .../dns/approved` reports the result, and Outflare checks the records. Agents use `get_seo_site_dns_approval`, `get_tracking_domain_dns_approval` and `get_email_domain_dns_approval`.

`GET /v1/domain-connect` shows the server's public key and its templates. A self-hosted server's key isn't published at `outflare.ai`, so self-hosted installs use the Cloudflare connection and the other ways above.
