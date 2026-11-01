---
title: Connectors
description: How Outflare connects to verification services, mailbox suppliers, other sequencers, CRMs, calendars, website analytics, SEO tools and DNS, with an API key or an OAuth sign-in, for people and agents alike.
sidebar:
  order: 0
---

<span class="pill shipped">Shipped</span> The connectors framework, the Connectors page, connect links for agents, eight email verification services, and Instantly and Smartlead importers. Other connectors in the catalog are listed as planned.

Outflare is the brain of your outbound. Connectors are how it reaches everything else. **Nothing has to be connected to run:** add mailboxes directly (IMAP/SMTP, CSV, or Google and Microsoft sign-in), import leads from a CSV, and addresses are checked with free built-in checks. Connectors add to that.

**Every connection is your own account.** Outflare never lends its own API keys for connectors or AI models, on Outflare Cloud or anywhere else: you add your own key, or sign in to your own account, for each service a feature uses. A feature that needs a service you haven't connected stays off until you connect it.

Don't see your service? Anyone can add one with a short manifest and a pull request: see [Build a connector](/docs/integrations/build-a-connector/).

## What can be connected

Ready to connect today:

<ul class="connector-logos" aria-label="Connectors you can connect today"><li><img src="https://app.outflare.ai/v1/connectors/ahrefs/logo.svg" alt="" width="20" height="20" loading="lazy" />Ahrefs</li><li><img src="https://app.outflare.ai/v1/connectors/amplitude/logo.svg" alt="" width="20" height="20" loading="lazy" />Amplitude</li><li><img src="https://app.outflare.ai/v1/connectors/apollo/logo.svg" alt="" width="20" height="20" loading="lazy" />Apollo</li><li><img src="https://app.outflare.ai/v1/connectors/bing_webmaster/logo.svg" alt="" width="20" height="20" loading="lazy" />Bing Webmaster Tools</li><li><img src="https://app.outflare.ai/v1/connectors/bouncer/logo.svg" alt="" width="20" height="20" loading="lazy" />Bouncer</li><li><img src="https://app.outflare.ai/v1/connectors/cal_com/logo.svg" alt="" width="20" height="20" loading="lazy" />Cal.com</li><li><img src="https://app.outflare.ai/v1/connectors/calendly/logo.svg" alt="" width="20" height="20" loading="lazy" />Calendly</li><li><img src="https://app.outflare.ai/v1/connectors/cheapinboxes/logo.svg" alt="" width="20" height="20" loading="lazy" />Cheap Inboxes</li><li><img src="https://app.outflare.ai/v1/connectors/claude/logo.svg" alt="" width="20" height="20" loading="lazy" />Claude</li><li><img src="https://app.outflare.ai/v1/connectors/cloudflare_web_analytics/logo.svg" alt="" width="20" height="20" loading="lazy" />Cloudflare Web Analytics</li><li><img src="https://app.outflare.ai/v1/connectors/dataforseo/logo.svg" alt="" width="20" height="20" loading="lazy" />DataForSEO</li><li><img src="https://app.outflare.ai/v1/connectors/deepseek/logo.svg" alt="" width="20" height="20" loading="lazy" />DeepSeek</li><li><img src="https://app.outflare.ai/v1/connectors/debounce/logo.svg" alt="" width="20" height="20" loading="lazy" />DeBounce</li><li><img src="https://app.outflare.ai/v1/connectors/emailable/logo.svg" alt="" width="20" height="20" loading="lazy" />Emailable</li><li><img src="https://app.outflare.ai/v1/connectors/emailbison/logo.svg" alt="" width="20" height="20" loading="lazy" />EmailBison</li><li><img src="https://app.outflare.ai/v1/connectors/fathom/logo.svg" alt="" width="20" height="20" loading="lazy" />Fathom Analytics</li><li><img src="https://app.outflare.ai/v1/connectors/findymail/logo.svg" alt="" width="20" height="20" loading="lazy" />Findymail</li><li><img src="https://app.outflare.ai/v1/connectors/gemini/logo.svg" alt="" width="20" height="20" loading="lazy" />Gemini</li><li><img src="https://app.outflare.ai/v1/connectors/google_analytics/logo.svg" alt="" width="20" height="20" loading="lazy" />Google Analytics</li><li><img src="https://app.outflare.ai/v1/connectors/google_calendar/logo.svg" alt="" width="20" height="20" loading="lazy" />Google Calendar</li><li><img src="https://app.outflare.ai/v1/connectors/google_search_console/logo.svg" alt="" width="20" height="20" loading="lazy" />Google Search Console</li><li><img src="https://app.outflare.ai/v1/connectors/hubspot/logo.svg" alt="" width="20" height="20" loading="lazy" />HubSpot</li><li><img src="https://app.outflare.ai/v1/connectors/hunter/logo.svg" alt="" width="20" height="20" loading="lazy" />Hunter</li><li><img src="https://app.outflare.ai/v1/connectors/instantly/logo.svg" alt="" width="20" height="20" loading="lazy" />Instantly</li><li><img src="https://app.outflare.ai/v1/connectors/leadmagic/logo.svg" alt="" width="20" height="20" loading="lazy" />LeadMagic</li><li><img src="https://app.outflare.ai/v1/connectors/matomo/logo.svg" alt="" width="20" height="20" loading="lazy" />Matomo</li><li><img src="https://app.outflare.ai/v1/connectors/microsoft_clarity/logo.svg" alt="" width="20" height="20" loading="lazy" />Microsoft Clarity</li><li><img src="https://app.outflare.ai/v1/connectors/millionverifier/logo.svg" alt="" width="20" height="20" loading="lazy" />MillionVerifier</li><li><img src="https://app.outflare.ai/v1/connectors/mistral/logo.svg" alt="" width="20" height="20" loading="lazy" />Mistral</li><li><img src="https://app.outflare.ai/v1/connectors/mixpanel/logo.svg" alt="" width="20" height="20" loading="lazy" />Mixpanel</li><li><img src="https://app.outflare.ai/v1/connectors/moltsets/logo.svg" alt="" width="20" height="20" loading="lazy" />MoltSets</li><li><img src="https://app.outflare.ai/v1/connectors/neverbounce/logo.svg" alt="" width="20" height="20" loading="lazy" />NeverBounce</li><li><img src="https://app.outflare.ai/v1/connectors/openai/logo.svg" alt="" width="20" height="20" loading="lazy" />OpenAI</li><li><img src="https://app.outflare.ai/v1/connectors/openrouter/logo.svg" alt="" width="20" height="20" loading="lazy" />OpenRouter</li><li><img src="https://app.outflare.ai/v1/connectors/outlook_calendar/logo.svg" alt="" width="20" height="20" loading="lazy" />Outlook Calendar</li><li><img src="https://app.outflare.ai/v1/connectors/peopledatalabs/logo.svg" alt="" width="20" height="20" loading="lazy" />People Data Labs</li><li><img src="https://app.outflare.ai/v1/connectors/plausible/logo.svg" alt="" width="20" height="20" loading="lazy" />Plausible</li><li><img src="https://app.outflare.ai/v1/connectors/posthog/logo.svg" alt="" width="20" height="20" loading="lazy" />PostHog</li><li><img src="https://app.outflare.ai/v1/connectors/prospeo/logo.svg" alt="" width="20" height="20" loading="lazy" />Prospeo</li><li><img src="https://app.outflare.ai/v1/connectors/reoon/logo.svg" alt="" width="20" height="20" loading="lazy" />Reoon Email Verifier</li><li><img src="https://app.outflare.ai/v1/connectors/requesty/logo.svg" alt="" width="20" height="20" loading="lazy" />Requesty</li><li><img src="https://app.outflare.ai/v1/connectors/simple_analytics/logo.svg" alt="" width="20" height="20" loading="lazy" />Simple Analytics</li><li><img src="https://app.outflare.ai/v1/connectors/smartlead/logo.svg" alt="" width="20" height="20" loading="lazy" />Smartlead</li><li><img src="https://app.outflare.ai/v1/connectors/umami/logo.svg" alt="" width="20" height="20" loading="lazy" />Umami</li><li><img src="https://app.outflare.ai/v1/connectors/vercel_ai_gateway/logo.svg" alt="" width="20" height="20" loading="lazy" />Vercel AI Gateway</li><li><img src="https://app.outflare.ai/v1/connectors/vercel_analytics/logo.svg" alt="" width="20" height="20" loading="lazy" />Vercel Web Analytics</li><li><img src="https://app.outflare.ai/v1/connectors/xai/logo.svg" alt="" width="20" height="20" loading="lazy" />xAI</li><li><img src="https://app.outflare.ai/v1/connectors/zerobounce/logo.svg" alt="" width="20" height="20" loading="lazy" />ZeroBounce</li></ul>

By category, including what is planned:

| Category | Examples |
| --- | --- |
| Email verification | ZeroBounce, NeverBounce, MillionVerifier, Bouncer, Reoon, Emailable, DeBounce, Hunter |
| Mailbox suppliers | [Cheap Inboxes](/docs/integrations/cheap-inboxes/), Mailreef, Infraforge |
| Sequencers | Instantly, Smartlead (import and switch over), EmailBison, Apollo |
| CRMs and calendars | HubSpot, Salesforce, Pipedrive, Attio, Google Calendar, Outlook, Calendly, Cal.com |
| Website analytics | [Google Analytics, Search Console, Bing Webmaster Tools, PostHog, Plausible, Fathom, Matomo, Umami, Mixpanel, Amplitude, Cloudflare, Simple Analytics, Clarity, Vercel](/docs/integrations/analytics/) |
| SEO | [DataForSEO, Ahrefs](/docs/integrations/seo/), paid per call within a monthly budget |
| Social | [X, LinkedIn](/docs/guides/social/): followers and your own posts' numbers, with your own X app and LinkedIn sign-in |
| Code and deploys | [GitHub, Vercel](/docs/integrations/deploys/): when each website ships, read only |
| Social | [Reddit](/docs/guides/reddit/), with your workspace's own app: find posts and post replies a person approves from the brand's own account |
| Ad platforms | [Google Ads, Meta Ads, Microsoft Advertising, Reddit Ads, X Ads, LinkedIn Ads](/docs/integrations/paid-media/), read only, with your own ad accounts |
| DNS and registrars | Cloudflare, Namecheap, GoDaddy, Route 53 |
| AI models | [Claude, OpenAI, Gemini, Mistral, xAI, DeepSeek and the routers OpenRouter, Vercel AI Gateway and Requesty](/docs/agents/ai-models/), for planning and running missions and for [AI visibility](/docs/guides/ai-visibility/), with your own key |
| Custom | Any HTTP API or MCP server you register |

The full catalog, with each connector's status and credential fields, is public at `GET /v1/connectors`. No key is needed, so agents and this site can read it.

Every entry has a `logo_url` and a `logo_dark_url`: the company's own mark as a square SVG, or a clean monogram when there is none. They point at `GET /v1/connectors/{id}/logo.svg` (add `?theme=dark` for dark backgrounds), which is public and cacheable, so an `<img>` tag, the SDK, the CLI or an agent can show the same logos as the app. Marks are used unmodified to name each connector; the trademarks belong to their owners.

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
| Attio | Attio | Access token |
| PostHog | PostHog Cloud, no app to register | Personal API key (also self-hosted) |
| Calendly | Calendly | Personal access token |
| Apollo | Apollo | Master API key |
| Ahrefs | Ahrefs Connect | API key |
| Cloudflare Web Analytics | Cloudflare | API token and account id |
| LinkedIn | LinkedIn | |
| X | Your own X app (OAuth 2.0 with PKCE) | Your app's client id and secret, then sign in |
| Cal.com | Cal.com (cloud) | API key (also self-hosted) |
| Stripe | Stripe | Restricted key |
| OpenRouter | OpenRouter, no app to register | API key |
| Everything else | Not offered by the vendor | API key or token |

In a workspace with [brands](/docs/guides/brands/), a connection is made once and shared with every brand, or with the brands you pick, and a brand with an account of its own can connect that one for itself. See [Connect a tool once for every brand](/docs/guides/brands/#connect-a-tool-once-for-every-brand).

Each catalog entry says how it connects. `auth_methods` lists the ways, recommended first. `auth_options` says which of them work on this server, and what to set when one doesn't. Each connection records its `auth_method` (`oauth2` or `api_key`).

## Connect over the API

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/integrations \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"connector": "zerobounce", "credentials": {"api_key": "..."}}'
```

Any connector whose `auth_methods` include `api_key` connects this way, even if it also offers OAuth. To sign in instead, open `GET /v1/workspaces/$WS/integrations/oauth/{connector}/authorize` in a browser (add `?format=json` to get the link). A wrong key is refused with the provider's reason. `POST /integrations/{id}/test` signs in again, `PATCH` renames it or replaces the key, and `DELETE` disconnects it. These need scope `integrations.manage`.

Signing in needs an app registered with the provider. Self-hosters set `CONNECTOR_<ID>_CLIENT_ID` and `CONNECTOR_<ID>_CLIENT_SECRET`, and use `<PUBLIC_URL>/v1/integrations/oauth/callback` as the redirect URL. Google connectors fall back to `GOOGLE_OAUTH_CLIENT_ID` and Outlook to `MICROSOFT_OAUTH_CLIENT_ID`. PostHog needs no app, only a public https `PUBLIC_URL`, and OpenRouter needs none at all: signing in makes a key on your own OpenRouter account. If you registered the app with different scopes, `CONNECTOR_<ID>_SCOPES` (space separated) replaces the defaults. Without an app, any connector that also takes a key still connects with the key.

| Provider | Register the app at | Variables |
| --- | --- | --- |
| HubSpot | developers.hubspot.com, Apps, Create app | `CONNECTOR_HUBSPOT_CLIENT_ID`, `_CLIENT_SECRET` |
| Attio | build.attio.com, create an app with read access (scopes are set on the app) | `CONNECTOR_ATTIO_CLIENT_ID`, `_CLIENT_SECRET` |
| Calendly | developer.calendly.com, scopes `users:read` and `scheduled_events:read` | `CONNECTOR_CALENDLY_CLIENT_ID`, `_CLIENT_SECRET` |
| Apollo | Apollo, Settings, Integrations, API, OAuth registration | `CONNECTOR_APOLLO_CLIENT_ID`, `_CLIENT_SECRET` |
| Ahrefs | Ahrefs, Account settings, Ahrefs Connect (Ahrefs approves production access) | `CONNECTOR_AHREFS_CLIENT_ID`, `_CLIENT_SECRET` |
| Cloudflare | Cloudflare dashboard, Manage account, OAuth clients | `CONNECTOR_CLOUDFLARE_WEB_ANALYTICS_CLIENT_ID`, `_CLIENT_SECRET` |
| Cal.com | app.cal.com, Settings, Developer, OAuth clients, scopes `PROFILE_READ` and `BOOKING_READ` (Cal.com reviews new clients) | `CONNECTOR_CAL_COM_CLIENT_ID`, `_CLIENT_SECRET` |
| Stripe | A Stripe App with read access to customers, charges, events, products, prices and subscriptions (Stripe reviews public apps). The secret is the key of the Stripe account that owns the app, and `_AUTH_URL` is the app's OAuth install link | `CONNECTOR_STRIPE_CLIENT_ID`, `_CLIENT_SECRET`, `_AUTH_URL` |

PostHog and HubSpot used to be two connectors each (`posthog_cloud`, `hubspot_private_app`). Each is now one connector (`posthog`, `hubspot`) with both ways in, and existing connections moved over automatically. Use the new ids in API calls.

## See everything that's connected

`GET /v1/workspaces/{ws}/connections` lists every account the workspace has connected, in one shape: connectors (the same as `GET /integrations`) and the Google and Microsoft sign-ins for mailboxes (the same as `GET /oauth-connections`). Each entry says its `kind` (`integration` or `mailbox_oauth`), `connector` (for example `hubspot`, or `google` for a mailbox sign-in), `name`, `category`, `status` and `brand_id`, and its `id` opens it in its own list. Add `?category=crm` for one category; `mailboxes` includes the mailbox sign-ins.

With `?brand=repocket` it lists the connections that brand uses. Mailbox sign-ins belong to the whole workspace, so they are left out when a brand is picked or the caller is kept to some brands. It needs scope `integrations.read`; the MCP tool is `list_connections`.

## Let an agent connect things

You tell an agent what you want, and it connects what it needs. It never asks you to paste a key into the chat. Instead:

1. The agent calls `request_connection` (MCP) or `POST /v1/workspaces/{ws}/connect-requests` with the service and one sentence on why it needs it.
2. It gives you a one-time link.
3. You open the link and sign in to Outflare. Only an owner or admin of the workspace that asked can use it; anyone else is told the link isn't for them. The page names the workspace, the service, who asked and the agent's reason. Paste the key there, or sign in with the provider. Only connect when you expected the request: Outflare never asks for keys in an email or a chat.
4. The key is tested and saved, and the agent sees the request turn `connected` and carries on.

Links work once, expire after 24 hours by default, can be cancelled, and can only connect the one service they name. The audit log records which token asked.

## Live updates (webhooks)

Some tools can tell Outflare when something happens, instead of Outflare asking them again and again. A connection that can do this shows **Live updates** on its page in Connectors. Geonode is the first: Outflare hears straight away when an extract, batch or crawl job finishes.

1. Open the connection on the Connectors page and press **Turn on live updates**.
2. For Geonode, that's all: Outflare adds its address in your own Geonode account with the key you connected, and removes it again when you turn live updates off or disconnect. For a tool Outflare can't set up itself, copy the address into the tool, and paste its signing secret back if it shows one.

What you can count on:

- **Every delivery is checked.** With a signing secret, a delivery whose signature doesn't match is refused. Without one, the address itself is the secret, so keep it private. **New address** replaces it, and the old one stops working straight away.
- **Repeats are ignored.** An event sent twice is handled once.
- **Everything is logged.** The connection's page shows its recent events, and **Logs → Incoming webhooks** lists every event in the workspace for 90 days, with any error. A failed event can be **run again** for 30 days. From Geonode, Outflare keeps the job id, status and counts, never page content. Events nothing in Outflare uses yet are marked "logged".
- **Self-hosted servers must be reachable.** Live updates need `PUBLIC_URL` set to the server's public https address. A server on `localhost` or a private network can't receive webhooks, and the card says so.

Over the API: `POST /v1/workspaces/{ws}/integrations/{id}/hook` turns live updates on (`GET` to read it, `DELETE` to turn it off), `POST .../hook/rotate` makes a new address, `PUT .../hook/signing-secret` saves a signing secret, `GET /v1/workspaces/{ws}/hook-events` lists events, and `POST .../hook-events/{event}/replay` runs one again. The MCP tools are `get_connection_hook`, `set_up_connection_hook`, `rotate_connection_hook`, `remove_connection_hook`, `list_hook_events` and `replay_hook_event`.
