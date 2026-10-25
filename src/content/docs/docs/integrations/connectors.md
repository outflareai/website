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

Open **Connectors**, pick a card and click **Connect**. Many services offer two ways in, and you choose:

- **Sign in** (OAuth, recommended): approve access on the provider's own page. There's nothing to copy, and you can revoke it there.
- **API key**: paste a key, or for Google a service account key. This works on any server, including ones without an OAuth app for that provider.

If the server has no OAuth app for a provider, the dialog says so and asks for the key. A key is tested before it is saved, then sealed with your instance key and never shown again. A signed-in connection can switch to a key later with **Use an API key instead**. You can connect several accounts of one service, for example two Instantly workspaces.

| Connector | Sign in (OAuth) | API key |
| --- | --- | --- |
| Google Analytics, Search Console | Google | Service account key (JSON) |
| Google Calendar | Google | |
| Outlook Calendar | Microsoft | |
| HubSpot | HubSpot | Private app token |
| PostHog | PostHog Cloud, no app to register | Personal API key (also self-hosted) |
| Calendly | Calendly | Personal access token |
| Apollo | Apollo | Master API key |
| Ahrefs | Ahrefs Connect | API key |
| Cloudflare Web Analytics | Cloudflare | API token and account id |
| Everything else | Not offered by the vendor | API key or token |

Each catalog entry says how it connects. `auth_methods` lists the ways, recommended first. `auth_options` says which of them work on this server, and what to set when one doesn't. Each connection records its `auth_method` (`oauth2` or `api_key`).

## Connect over the API

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/integrations \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"connector": "zerobounce", "credentials": {"api_key": "..."}}'
```

Any connector whose `auth_methods` include `api_key` connects this way, even if it also offers OAuth. To sign in instead, open `GET /v1/workspaces/$WS/integrations/oauth/{connector}/authorize` in a browser (add `?format=json` to get the link). A wrong key is refused with the provider's reason. `POST /integrations/{id}/test` signs in again, `PATCH` renames it or replaces the key, and `DELETE` disconnects it. These need scope `integrations.manage`.

Signing in needs an app registered with the provider. Self-hosters set `CONNECTOR_<ID>_CLIENT_ID` and `CONNECTOR_<ID>_CLIENT_SECRET`, and use `<PUBLIC_URL>/v1/integrations/oauth/callback` as the redirect URL. Google connectors fall back to `GOOGLE_OAUTH_CLIENT_ID` and Outlook to `MICROSOFT_OAUTH_CLIENT_ID`. PostHog needs no app, only a public https `PUBLIC_URL`. If you registered the app with different scopes, `CONNECTOR_<ID>_SCOPES` (space separated) replaces the defaults. Without an app, any connector that also takes a key still connects with the key.

| Provider | Register the app at | Variables |
| --- | --- | --- |
| HubSpot | developers.hubspot.com, Apps, Create app | `CONNECTOR_HUBSPOT_CLIENT_ID`, `_CLIENT_SECRET` |
| Calendly | developer.calendly.com, scopes `users:read` and `scheduled_events:read` | `CONNECTOR_CALENDLY_CLIENT_ID`, `_CLIENT_SECRET` |
| Apollo | Apollo, Settings, Integrations, API, OAuth registration | `CONNECTOR_APOLLO_CLIENT_ID`, `_CLIENT_SECRET` |
| Ahrefs | Ahrefs, Account settings, Ahrefs Connect (Ahrefs approves production access) | `CONNECTOR_AHREFS_CLIENT_ID`, `_CLIENT_SECRET` |
| Cloudflare | Cloudflare dashboard, Manage account, OAuth clients | `CONNECTOR_CLOUDFLARE_WEB_ANALYTICS_CLIENT_ID`, `_CLIENT_SECRET` |

PostHog and HubSpot used to be two connectors each (`posthog_cloud`, `hubspot_private_app`). Each is now one connector with both ways in. The old ids still work in API calls, and existing connections moved over automatically.

## Let an agent connect things

You tell an agent what you want, and it connects what it needs. It never asks you to paste a key into the chat. Instead:

1. The agent calls `request_connection` (MCP) or `POST /v1/workspaces/{ws}/connect-requests` with the service and one sentence on why it needs it.
2. It gives you a one-time link.
3. You open the link. It names the workspace, the service and the agent's reason. Paste the key there, or sign in with the provider.
4. The key is tested and saved, and the agent sees the request turn `connected` and carries on.

Links work once, expire after 24 hours by default, can be cancelled, and can only connect the one service they name. The audit log records which token asked.
