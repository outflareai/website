---
title: Website analytics
description: Read Google Analytics, Search Console, Bing Webmaster Tools, PostHog, Plausible and more through the same five reports, in the app, over the API and from an agent.
sidebar:
  order: 4
---

<span class="pill shipped">Shipped</span> Untested against live accounts so far; tell us in an issue if a provider misbehaves.

Outflare reads the analytics tools already on your website, so a person, a script or an agent can ask "how is the site doing?" without caring which tool answers. Every provider answers the same five reports in the same shape. Outflare only reads: nothing changes at the provider. A sync stores each tool's daily numbers, so you can look back months, line one website up across tools and compare them without calling the providers again. **Nothing else in Outflare needs analytics connected.** For domain rating, backlinks and keyword rankings, see [SEO](/docs/integrations/seo/); its figures join the same websites by domain. Agents should start with [Analytics for agents](/docs/agents/analytics/): one call says what changed on each website.

## Connect

Open **Connectors** and pick the **Analytics** category, or go straight to the **Analytics** page and click **Choose a tool**. Google tools connect with a read-only Google sign-in, and one sign-in connects both Google Analytics and Search Console. They also take a service account key. PostHog and Cloudflare offer a sign-in or a key, and you choose. The rest take an API key. An agent can ask for a connection with `request_connection`: you get a one-time link to paste the key into or sign in from, so the key never passes through the chat.

When a connection can read several sites (GA4 properties, Search Console properties, PostHog projects), the Website analytics page asks which one to read. Your choice becomes the connection's default, for agents too.

## Providers

| Provider | Connect with | Reports |
| --- | --- | --- |
| Google Analytics 4 (`google_analytics`) | Sign in with Google (read-only), or a service account key | traffic, pages, sources, events (key events count as conversions) |
| Google Search Console (`google_search_console`) | Sign in with Google (read-only), or a service account key | traffic (clicks, impressions), pages, search_queries |
| Bing Webmaster Tools (`bing_webmaster`) | API key | traffic, pages, search_queries |
| PostHog (`posthog`) | Sign in with PostHog, US or EU Cloud (read-only), or a personal API key (cloud or self-hosted) | traffic, pages, sources, events |
| Plausible (`plausible`) | Stats API key and site domain, cloud or self-hosted | traffic, pages, sources, events (goals) |
| Fathom (`fathom`) | API key | traffic, pages, sources, events |
| Matomo (`matomo`) | Address and auth token | traffic, pages, sources, events (plus goal conversions) |
| Umami (`umami`) | Cloud API key, or a self-hosted address and login | traffic, pages, sources, events |
| Mixpanel (`mixpanel`) | Service account and project id | traffic (from the page view event), pages, sources, events |
| Amplitude (`amplitude`) | API key and secret key | traffic (active users, page views), pages, events |
| Cloudflare Web Analytics (`cloudflare_web_analytics`) | Sign in with Cloudflare, or an API token and account id | traffic (page views, visits), pages, sources |
| Simple Analytics (`simple_analytics`) | Domain, plus API key for private sites | traffic, pages, sources |
| Microsoft Clarity (`microsoft_clarity`) | API token | traffic and pages for the last three days only, plus rage and dead clicks |
| Vercel Web Analytics (`vercel_analytics`) | Access token, plus team id for team projects | traffic, pages, sources, events (custom events); production traffic only, and the project needs Web Analytics turned on |

Listed but not connectable, because they have no read API for traffic:
Hotjar (surveys and user lookup only) and Segment (it forwards events but
does not count visits).

## Reports

| Report | What |
| --- | --- |
| `traffic` | Totals for the range plus one point per day |
| `pages` | Top pages |
| `sources` | Top referrers and sources |
| `search_queries` | What people searched before clicking through (Search Console, Bing) |
| `events` | Events and conversions by name |

Metrics are `visitors`, `pageviews`, `sessions` (visits), `bounce_rate` and
`ctr` (fractions from 0 to 1), `avg_duration` (seconds), `clicks`,
`impressions`, `position`, `events` and `conversions`. A metric a provider
does not measure is left out of the answer, never reported as zero. `notes`
explains caveats in words, such as Search Console's two to three day delay.

```sh
# Connected analytics tools, their reports and default site
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/analytics"

# Traffic totals from every tool, one call
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/analytics/summary?from=2026-09-27&to=2026-10-24"

# Top 50 search queries from one connection
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/analytics/$ID/reports/search_queries?limit=50"

# Which sites a connection can read, and pick the default
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/analytics/$ID/sites"
curl -X PUT -H "Authorization: Bearer $TOKEN" -d '{"site":"123456789"}' "$URL/v1/workspaces/$WS/analytics/$ID/site"
```

Reads need the `analytics.read` scope (owners, admins, operators and viewers
have it). Setting the default site needs `integrations.manage`. Dates are
inclusive `YYYY-MM-DD`; the default range is the last 28 days. When a
connection can read several sites and has no default, a report answers
`400 pick_site` with how to choose one; with one site, it is used
automatically.

Answers are kept for 15 minutes (an hour for Mixpanel and Amplitude, six
hours for Clarity, which allows ten calls a day) so dashboards and agents do
not spend the provider's rate limits. `fresh=true` asks again.

Agents use the MCP tools `list_analytics`, `get_analytics_summary`,
`get_analytics_report`, `list_analytics_sites` and `set_analytics_site` for
live answers, and `get_analytics_overview`, `query_analytics_history`,
`compare_analytics_tools` and `sync_analytics` for stored history. To
connect a tool, an agent finds it with `list_connectors` (category
`analytics`) and calls `request_connection`: the person pastes the key or
signs in with Google on the link, never in the chat.

## Stored history

Every six hours the engine copies each analytics connection's daily numbers
into Postgres (`analytics_daily`), one row per site, report, day and key, in
the same metrics as the live reports. Clarity syncs once a day and traffic
only, because its API allows ten calls a day and three days of history.

- **First sync:** 90 days of traffic, and 7 days of pages, sources, search
  queries and events (the top 50 per day). It starts within a few minutes of
  connecting.
- **Later syncs:** the last three days again, because providers keep
  revising recent days (Search Console runs two to three days behind).
  Breakdowns build up a day at a time from then on.
- **Limits:** a sync makes a few calls per connection per report and day it
  fetches (about 30 on the first sync, about 15 after), so it stays well
  inside every provider's rate limits. A
  connection whose key stops working is marked in Connectors and skipped
  until it is fixed. Set `"sync_paused": true` in a connection's config to
  stop syncing it.
- **Websites line up by domain.** Each connection's site gets a domain
  (`example.com`, without `www.`), taken from the site's address. Google
  Analytics properties and Vercel projects do not show one, so set it on the
  Analytics page or with `PUT .../analytics/$ID/site` and `"domain"`. Stored
  history moves with it.

Reading history never calls a provider, so it is fast and free:

```sh
# Every website, each tool side by side, search clicks added up across Google and Bing
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/analytics/overview?from=2026-07-01&to=2026-10-23"

# Each tool's daily traffic for one website, to compare them
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/analytics/compare?host=example.com"

# Top pages over three months, added up across tools
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/analytics/history?report=pages&group=key&host=example.com&from=2026-07-24&limit=50"

# Sync status, and sync now (one connection waits and returns rows stored; all is queued)
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/analytics/syncs"
curl -X POST -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/analytics/$ID/sync"
curl -X POST -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/analytics/sync"
```

`history` groups by `day` (one row per day per tool), `tool` (totals per
tool), `key` (each page, source, query or event across tools) or `tool_key`.
Counts are added up; click-through and position are weighted by
impressions. Visitors added up over several days count a returning visitor
once per day, so they run higher than a tool's own unique-visitor total for
the range. Syncing needs `integrations.manage`; reading needs
`analytics.read`. Deleting a connection deletes its stored history.

## In the app

The **Analytics** page starts with your websites: each domain with every tool's stored visitors, page views and search clicks side by side, search clicks added up across Google and Bing, when each tool last synced, and **Sync now**. **Compare tools day by day** draws one line per tool for that website. A tool whose site has no domain gets a field to add one. Below that, one tool at a time, live: headline numbers, a chart per day, and tabs for pages, sources, search queries and events. Pick the period (7, 28 or 90 days, or 12 months); the refresh button asks the provider again instead of using the cached answer.

## PostHog sign-in on your own server

PostHog reads Outflare's sign-in details from a document your server hosts at
`$PUBLIC_URL/v1/integrations/oauth/clients/posthog.json`. That URL is
the client id, so there is no app to register with PostHog and no secret to
set. PostHog has to fetch the document, so the sign-in only works when
`PUBLIC_URL` is a public https address. On `localhost`, choose the API key
instead. Outflare works out whether the account is on US or EU
Cloud by itself.

## Google Analytics and Search Console on your own server

Both use the server's Google OAuth client (`GOOGLE_OAUTH_CLIENT_ID` and
`GOOGLE_OAUTH_CLIENT_SECRET`, the same one used for Google sign-in and Gmail
mailboxes). `CONNECTOR_GOOGLE_ANALYTICS_CLIENT_ID` and friends override it
per connector.

No Google client on the server? Connect either tool with a service account
key instead. In Google Cloud, go to IAM & Admin, Service accounts, create
one, add a JSON key, and paste the whole file. Then give the service
account's email read access: add it as a Viewer in Google Analytics, or as a
Restricted user in Search Console. Outflare stores only the key, encrypted,
and signs in with it when needed.

Each Google connector asks for the Analytics and the Search Console scope
together. When the person grants both, Outflare connects the other tool too,
unless the workspace already has it or the account has no properties there.
Anyone can untick a scope on Google's consent screen, and only what they grant
gets connected.

In Google Cloud Console:

1. Enable the **Google Analytics Data API**, the **Google Analytics Admin
   API** and the **Google Search Console API** on the client's project.
2. Add `$PUBLIC_URL/v1/integrations/oauth/callback` to the client's
   authorised redirect URIs.
3. Add the scopes `https://www.googleapis.com/auth/analytics.readonly` and
   `https://www.googleapis.com/auth/webmasters.readonly` to the consent
   screen.

Both scopes are "sensitive" to Google. While the app is in testing, only
test users you list can connect (and their sign-in lasts seven days). To let
anyone connect, submit the app for Google's verification, which needs a
privacy policy, a homepage on your domain and a short video of the consent
flow, and usually takes a few days to a few weeks. Sensitive scopes do not
need the paid security assessment that restricted scopes (such as full
Gmail) need.
