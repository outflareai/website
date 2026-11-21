---
title: Usage and limits
description: See how many events, tracker clicks, contacts and session recordings each brand uses this month, how close its workspace is to a limit, and what stops when a limit is reached. You hear about it before anything stops.
sidebar:
  order: 18
---

<span class="pill shipped">Shipped</span> In the app, through the API and for agents.

**Settings → Usage and limits** shows what a brand stores and tracks, next to its whole workspace's total and the workspace's limits:

- **Website and product events** and **tracker clicks** since the 1st of the month (UTC).
- **Contacts and companies** and **session recordings** the brand keeps now.

Each card shows the brand's own share, the other brands' share and what is left before the limit. Counts refresh every hour.

## Limits are shared

Limits belong to the workspace, so all its brands count toward the same ones. A busy brand can use up a limit for the others; the card shows how much of the total is this brand's.

A self-hosted server has no limits unless its owner adds them, so every card says **no limit**. On Outflare Cloud, the Free plan and a trial that ended without a card have a monthly allowance; paying, trialing and credit workspaces have none. **Raise the limit** opens your plan.

## When a limit is close or reached

- **Close:** a yellow banner on every page, and a **Usage limit close** alert, once a month per limit, before anything stops.
- **Reached:** a red banner on every page that you can't dismiss. It says what stopped (for example, new events aren't stored), since when and how many were refused, with **Raise the limit** next to it. The owners and admins get a **Usage limit reached** alert, once a month per limit.

Both alerts go by email, Slack or Telegram as you choose under [Alerts](/docs/guides/alerts/).

What stops at each limit:

| Limit | What stops |
| --- | --- |
| Events | New website and product events are refused and not stored. |
| Tracker clicks | New clicks on [tracking links](/docs/guides/campaign-links/) aren't stored. People still reach the page. |
| Contacts and companies | New people and companies from imports, forms and events are refused. |

## For agents and the API

- `GET /v1/brands/{brand}/usage` returns each item with `brand`, `workspace`, `limit`, `status` (`ok`, `near` or `reached`), what `stops`, and `refused_since` and `refused` once it is reached. See the [API reference](/docs/api/).
- The MCP tool `get_brand_usage` reads the same.
- In [Query](/docs/guides/query-and-search/), `brand_usage_daily` has a row per day and metric.

Outcome exports return up to 100,000 rows per call. When there are more, the file stops there and the `X-Outflare-Truncated: true` header says so: narrow `from` and `to` for the rest.
