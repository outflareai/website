---
title: Connectors
description: How Outflare connects to verification services, mailbox suppliers, other sequencers, CRMs, calendars, website analytics, SEO tools and DNS, with an API key or an OAuth sign-in, for people and agents alike.
sidebar:
  order: 0
---

<span class="pill shipped">Shipped</span> The connectors framework, the Connectors page, connect links for agents, eight email verification services, and Instantly and Smartlead importers. Other connectors in the catalog are listed as planned.

Outflare is the brain of your outbound. Connectors are how it reaches everything else. **Nothing has to be connected to run:** add mailboxes directly (IMAP/SMTP, CSV, or Google and Microsoft sign-in), import leads from a CSV, and addresses are checked with free built-in checks. Connectors add to that.

## What can be connected

| Category | Examples |
| --- | --- |
| Email verification | ZeroBounce, NeverBounce, MillionVerifier, Bouncer, Reoon, Emailable, DeBounce, Hunter |
| Mailbox suppliers | [Cheap Inboxes](/docs/integrations/cheap-inboxes/), Mailreef, Infraforge |
| Sequencers | Instantly, Smartlead (import and switch over), EmailBison, Apollo |
| CRMs and calendars | HubSpot, Salesforce, Pipedrive, Attio, Google Calendar, Outlook, Calendly, Cal.com |
| Website analytics | [Google Analytics, Search Console, Bing Webmaster Tools, PostHog, Plausible, Fathom, Matomo, Umami, Mixpanel, Amplitude, Cloudflare, Simple Analytics, Clarity, Vercel](/docs/integrations/analytics/) |
| SEO | [DataForSEO, Ahrefs](/docs/integrations/seo/), paid per call within a monthly budget |
| DNS and registrars | Cloudflare, Namecheap, GoDaddy, Route 53 |
| Custom | Any HTTP API or MCP server you register |

The full catalog, with each connector's status and credential fields, is public at `GET /v1/connectors`. No key is needed, so agents and this site can read it.

## Connect in the app

Open **Connectors**, pick a card, and either paste an API key or click **Connect** to sign in with the provider (OAuth). The key is tested before it is saved, then sealed with your instance key and never shown again. You can connect several accounts of one service, for example two Instantly workspaces.

## Connect over the API

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/integrations \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"connector": "zerobounce", "credentials": {"api_key": "..."}}'
```

A wrong key is refused with the provider's reason. `POST /integrations/{id}/test` signs in again, `PATCH` renames it or replaces the key, and `DELETE` disconnects it. These need scope `integrations.manage`.

OAuth connectors need an app registered with the provider. Self-hosters set `CONNECTOR_<ID>_CLIENT_ID` and `CONNECTOR_<ID>_CLIENT_SECRET` and use `<PUBLIC_URL>/v1/integrations/oauth/callback` as the redirect URL.

## Let an agent connect things

You tell an agent what you want, and it connects what it needs. It never asks you to paste a key into the chat. Instead:

1. The agent calls `request_connection` (MCP) or `POST /v1/workspaces/{ws}/connect-requests` with the service and one sentence on why it needs it.
2. It gives you a one-time link.
3. You open the link. It names the workspace, the service and the agent's reason. Paste the key there, or sign in with the provider.
4. The key is tested and saved, and the agent sees the request turn `connected` and carries on.

Links work once, expire after 24 hours by default, can be cancelled, and can only connect the one service they name. The audit log records which token asked.
