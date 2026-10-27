---
title: Usage limits for paid connectors
description: See what Outflare's calls to Ahrefs, DataForSEO, Apollo, email verifiers and Geonode used today and this month, set a daily and monthly limit on each, and get warned before a limit is reached. Every call runs on your own account.
sidebar:
  order: 17
---

<span class="pill shipped">Shipped</span> Usage limits in the app, through the API, as webhooks and for agents.

Some connectors cost money every time Outflare calls them: SEO data ([Ahrefs and DataForSEO](/docs/integrations/seo/)), lead data such as Apollo, email verifiers such as ZeroBounce, and page reads and searches through Geonode. Those calls run on **your own account** with each provider, with your own key, and the provider bills you. Outflare doesn't pay for them, so **set a spend limit with the provider too**. The limits in Outflare are a second line, not a guarantee.

AI calls have their own page: [AI usage and limits](/docs/guides/ai-usage/).

## See what each connection used

Open **Connectors** and pick a paid connection. **Usage and limits** shows:

- **Today** and **this month**, against the connection's limits.
- **The last 30 days**, so a spike stands out.
- **The warnings sent** so far.

The Connectors list shows a line of usage under each paid connection too.

Usage is counted in the provider's own unit: Ahrefs API units, credits for data providers and email verifiers, Geonode tokens, or US dollars for DataForSEO. Ahrefs doesn't say what each call cost, so Outflare works it out from Ahrefs' price list; for email verifiers it counts one credit per address checked. Days and months are UTC.

## Set a limit

An owner or admin can give each paid connection a **daily limit** and a **monthly limit**. Leave one empty for no limit, or set 0 to stop every call. Ahrefs (10,000 API units) and DataForSEO (US$10) start with a monthly limit so a new connection can't run away; for them the monthly limit is the same thing as the budget in their [SEO settings](/docs/integrations/seo/#cost-and-budget). Other connections start with none.

When a limit is reached, Outflare stops calling that connection until the next day or month, or until you raise the limit:

- SEO reports answer `402` with `budget_reached`, and weekly snapshots wait.
- Lead list runs stop and say why.
- Email verification checks the rest with the free built-in checks, so sending is never held up.
- Site crawls stop reading blocked pages through Geonode.

Untick **Stop calls at the limit** if you'd rather only be warned.

## Warnings before a limit is reached

When a connection's usage reaches **80%** of a limit, and again when it **reaches** it, each owner and admin with a confirmed email address gets an email, once a day or month for each limit. The same moments are the `connection_limit.warned` and `connection_limit.reached` [webhooks](/docs/api/webhooks/#paid-connection-limits).

## Over the API and MCP

| Endpoint | MCP tool | What it does |
| --- | --- | --- |
| `GET /v1/workspaces/{ws}/connection-usage` | `list_connection_usage` | Every paid connection, with today's and this month's usage and its limits |
| `GET /v1/workspaces/{ws}/integrations/{id}/usage` | `get_connection_usage` | One connection's usage per day, its limits and the warnings sent |
| `PUT /v1/workspaces/{ws}/integrations/{id}/usage/limits` | `update_connection_limits` | Set its daily and monthly limits, and whether reaching one stops calls |
| `DELETE /v1/workspaces/{ws}/integrations/{id}/usage/limits` | | Go back to its starting limits |

```sh
curl -X PUT https://outflare.example.com/v1/workspaces/$WS/integrations/$ID/usage/limits \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"daily_limit": 1000, "monthly_limit": 10000, "hard_stop": true}'
```

Reading needs the `integrations.read` scope and changing limits `integrations.manage`.
