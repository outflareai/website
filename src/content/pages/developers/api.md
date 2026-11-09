---
title: Marketing and SEO ranking REST API · Outflare
description: "One OpenAPI 3.1 REST API for your marketing and SEO data: rankings, backlinks, Search Console, analytics, email and CRM, with scoped tokens and webhooks."
h1: A REST API for your marketing, SEO rankings included.
label: API
lede: Everything the Outflare app does goes through one documented REST API, from rank tracking and backlinks to sequences, replies and customer records. Your scripts and AI agents call the same endpoints, with scoped tokens, signed webhooks and a log of every call.
answer: Outflare's API is an OpenAPI 3.1 REST API that covers everything the app does, including SEO rankings, keyword history, backlinks, Search Console data, website analytics, cold email and customer records. It is served under /v1 on app.outflare.ai or your own server, takes workspace-bound tokens with explicit scopes, and has no private endpoints. Rank and backlink data come from your own Ahrefs, DataForSEO or Geonode account, so you pay those providers directly.
points:
  - OpenAPI 3.1 contract, served by every instance at /v1/openapi.yaml
  - Scoped tokens bound to one workspace, optionally one brand
  - Signed webhooks, an events feed and 30 days of request logs
  - A CLI with every operation as a command
docs:
  - label: API overview
    href: /docs/api/
  - label: Authentication
    href: /docs/api/authentication/
  - label: Webhooks
    href: /docs/api/webhooks/
  - label: Logs
    href: /docs/api/logs/
  - label: Test workspaces (sandbox)
    href: /docs/api/sandbox/
  - label: Command line
    href: /docs/agents/cli/
faqs:
  - q: Does Outflare have an SEO ranking API?
    a: Yes. You add keywords with POST /v1/workspaces/{ws}/seo-sites/{site}/rankings. GET on the same path returns each keyword's latest Google position in the top 100 and the page that ranks, and .../rankings/{tracked}/history returns one check a day with the top 10 results. The checks run through your own DataForSEO or Geonode connection.
  - q: Where does Outflare's SEO data come from?
    a: Domain rating, backlinks, ranking keywords and competitors come from your own Ahrefs or DataForSEO account. Rank tracking comes from your own DataForSEO or Geonode account. Search Console data comes from your own Google sign-in. Outflare has no SEO data of its own and never lends you an account.
  - q: Do reads of SEO data cost money every time?
    a: No. Weekly snapshots are stored in your database, and endpoints such as /seo/history, /seo/overview and /backlinks only read what is stored, so they don't call the provider. Live reports cost money within the connection's monthly budget and are cached for 24 hours.
  - q: How do API tokens work?
    a: A token is bound to one workspace, holds only the scopes it was given and never more than the person who made it has. It can also be kept to one brand. Actions taken with it are recorded in the audit log under the token's name.
  - q: Are there rate limits?
    a: Each API token may make 600 requests a minute, and every response carries the IETF RateLimit headers. Over the limit, the API answers 429 rate_limited with Retry-After. A self-hosted server sets its own limit with API_RATE_LIMIT.
  - q: Can I test without sending real email?
    a: Yes. A test workspace has the same API, MCP tools and webhooks, but its mailboxes are simulated and nothing reaches the outside world. You can send every due step at once and simulate replies, opt-outs and bounces.
related:
  - /developers/sdk/
  - /developers/open-source/
  - /product/mcp/
  - /product/seo/
  - /product/analytics/
  - /best/rank-tracking-tools/
updated: 2026-11-09
order: 10
---

## One API, no private endpoints

The web app, the [TypeScript and Python SDKs](/developers/sdk/), the CLI and the [MCP server](/product/mcp/) all call the same REST API. There is nothing the app can do that your code can't.

| | |
| --- | --- |
| Base URL | `https://app.outflare.ai/v1` on Outflare Cloud, or `https://your-server/v1` when you [self-host](/developers/open-source/) |
| Contract | OpenAPI 3.1, served at `/v1/openapi.yaml` in the exact version the server runs |
| Auth | `Authorization: Bearer oft_...` with scoped tokens, or the session cookie in the browser |
| Workspace routes | `/v1/workspaces/{ws}/...`, where `{ws}` is the workspace ID or its slug |
| Responses | JSON; lists are wrapped in `data` and paged with `next_cursor` |
| Discovery | `GET /v1/meta` and `/.well-known/outflare.json`, no token needed |

Use the contract to generate a client in any language, import it into Postman or Insomnia, or give it to an agent. The [endpoint reference](/docs/api/reference/) on this site is generated from the same file. Every operation says who may call it in `x-outflare-access`, and the engine's tests check that against the running server, so the document can't drift from what the server enforces.

## SEO ranking and rank data endpoints

Outflare is not an SEO data vendor. It reads your own accounts, stores what they return each week, and gives it back through the API. Endpoints that only read stored data cost nothing to call.

| Endpoint | What it returns | Data from |
| --- | --- | --- |
| `GET /seo-sites/{site}/rankings` | Each tracked keyword, its latest position in Google's top 100, the ranking page, the previous and best position | Your DataForSEO or Geonode account |
| `POST /seo-sites/{site}/rankings` | Track up to 100 keywords for a country and device, weekly or daily | Your DataForSEO or Geonode account |
| `GET /seo-sites/{site}/rankings/{tracked}/history` | One check a day, up to 400, with the top 10 results | Stored, free |
| `GET /seo/history` | Weekly snapshots: overview, keywords with their previous position | Stored, free |
| `GET /seo/overview` | Is each brand growing in search: branded search, visitors, domain rating, links | Stored, free |
| `GET /seo/{id}/reports/{report}` | A live overview, keywords, backlinks, links, competitors or audit | Your Ahrefs or DataForSEO account, within its budget |
| `GET /backlinks` and `/backlinks/events` | Links from both tools merged, and links gained, lost and regained | Stored, free |
| `GET /seo-sites/{site}/search` | Search Console clicks, impressions and position by page or query | Your Google Search Console |

All paths are under `/v1/workspaces/{ws}`. A rank check costs about $0.02 on DataForSEO or about $0.005 on Geonode, counts towards the connection's monthly budget and is recorded with its cost. Without a connection, rank tracking stays off and the API says which connection to add (`409 connector_needed`). See [SEO tools](/docs/integrations/seo/) and [See what each page ranks for](/docs/guides/keywords/).

```sh
curl -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/rankings"
```

The same API covers the rest of marketing: [website analytics](/product/analytics/), site audits and the fixes list, [cold email](/product/cold-email/), the reply inbox, [customer records](/product/customer-data/), lifecycle email and outcomes.

## Tokens and scopes

Create a token in the app under **API tokens**, or with `POST /v1/workspaces/{ws}/api-tokens`. The secret is shown once.

- A token is bound to one workspace and can't read any other.
- It holds only the scopes it was given, such as `seo.read` or `leads.manage`, and never more than its creator has.
- It can be kept to one [brand](/product/brands/), so it sees that brand's records plus shared ones.
- `GET /v1/whoami` tells a script holding only a token its workspace, brand, scopes and expiry.
- A `403` for a missing scope says how to get it.

## Errors, paging and retries

Every error has the same shape: `{"error": {"code", "message", "request_id"}}`, plus `param` when a `400` is about one field. `GET /v1/error-codes` lists every code, what it means and whether retrying helps.

- **Pagination.** Lists answer `next_cursor`; pass it back as `cursor` until it is `null`. `limit` sets the page size, and `fields` trims each item to what you read.
- **Safe retries.** Every workspace write accepts an `Idempotency-Key`. A repeat within 24 hours gets the first answer back instead of creating a second record.
- **Background work** answers `202` with the job and a URL to poll.
- **Rate limits.** 600 requests a minute per token, with `RateLimit` headers on every answer.

## Webhooks and the events feed

Register a URL under **Settings → Webhooks** or with the API, and Outflare POSTs events such as `lead.replied`, `crawl.done`, `fix.found` or `deploy.detected`. Deliveries are signed the [Standard Webhooks](https://www.standardwebhooks.com) way and retried with backoff for about three and a half hours. Every event is written in the same database transaction as the change, so you never hear about one that was rolled back.

No public URL? Read the same events from `GET /v1/workspaces/{ws}/events`, or run `outflare listen --forward-to http://localhost:3000/webhooks` to test a receiver on your laptop.

## Logs of every call

Every API call in a workspace is in its request log, from the app, scripts, MCP agents, the CLI and missions: status, duration, error code, operation, MCP tool and who made it. Search and filter it in the app, follow it live, export it, or read it with `GET /v1/workspaces/{ws}/logs`. Logs never keep request or response bodies, query values, headers, keys or IP addresses, and are kept for 30 days.

## Sandbox workspaces

A test workspace works like a live one, with the same API, MCP tools and webhooks, but mailboxes are simulated, domains check out without DNS lookups and nothing can be bought. `POST .../test/send-now` sends every due step at once, and `POST .../test/inbound` plays the lead's side: a reply, an auto-reply, an opt-out or a bounce. Every answer carries `Outflare-Test-Workspace: true`.

## The CLI

The `outflare` binary is also a client. Each `operationId` is a command:

```sh
outflare login --url https://app.outflare.ai
outflare help list-rankings        # its flags, required fields and scope
outflare list-backlinks --all > backlinks.json
outflare logs --follow --level error
```

`--all` follows every page, `--curl` prints the request instead of sending it, and writes are retried safely with an idempotency key.

## What the API doesn't do

- It doesn't sell or proxy SEO, lead or AI data. Each workspace connects its own Ahrefs, DataForSEO, Geonode or AI account and pays the provider directly.
- It doesn't let a token skip the [policy check](/docs/concepts/policy-check/) on outbound email, or act outside its workspace and scopes.
