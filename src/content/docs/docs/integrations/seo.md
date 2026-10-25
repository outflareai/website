---
title: SEO
description: Read domain rating, backlinks, keyword rankings, competitors and site audit from DataForSEO or Ahrefs, within a monthly budget, in the app, over the API and from an agent.
sidebar:
  order: 5
---

<span class="pill shipped">Shipped</span> Untested against live accounts so far; tell us in an issue if a provider misbehaves.

Outflare reads how a domain looks from the outside through **DataForSEO**
and **Ahrefs**: domain rating, backlinks and referring domains, the
keywords a site ranks for and where, competitors in search, and (Ahrefs)
site audit issues. Both are paid per call, so every live call is capped by a
monthly budget, cached for a day and recorded in Outcomes with its cost.
Outflare only reads, and nothing else in Outflare needs SEO connected.

## Connecting

| Tool | What to paste | Where to find it |
| --- | --- | --- |
| DataForSEO | API login and API password | dataforseo.com, Dashboard → API Access (the API password is not your account password) |
| Ahrefs | API key | ahrefs.com, Account settings → API keys (needs a plan with API access) |

Connect either on the Connectors page (category SEO), with
`POST /v1/workspaces/$WS/integrations`, or let an agent ask with
`request_connection`: you get a one-time link to paste the key into, so the
key never passes through the chat. The connection test reads your DataForSEO
balance or your Ahrefs unit limit and usage, and costs nothing.

## Reports

Every tool answers the same reports in the same shape, keyed by domain.

| Report | What it answers | DataForSEO | Ahrefs |
| --- | --- | --- | --- |
| `overview` | Domain rating, backlinks, referring domains, ranking keywords, keywords in the top 3, estimated visits and traffic value per month | Yes | Yes |
| `keywords` | The keywords the domain ranks for: position, searches per month, estimated visits, ranking page | Yes | Yes |
| `backlinks` | The referring domains linking to it, strongest first | Yes | Yes |
| `competitors` | Domains competing for the same keywords, with keywords in common | Yes | Yes |
| `audit` | Site audit health score and issues, errors first | No | Yes, for a site already set up as an Ahrefs Site Audit project |

DataForSEO's domain rating is its own 0 to 100 rank, and Ahrefs' is Ahrefs
DR, so the two are not the same scale. Traffic numbers are each tool's
estimate from search rankings, not your real visits; real visits come from
the [analytics connectors](/docs/integrations/analytics/). Country defaults to the US; set
another two-letter country per connection or per call.

## Cost and budget

- **DataForSEO** reports the exact cost of every call in dollars. An
  overview costs about $0.03 and a keyword list about $0.01 plus $0.0001 a
  row. The default budget is **$10 a month** per connection.
- **Ahrefs** charges API units from your plan. Its API does not return the
  cost of a call, so Outflare estimates it (at least 50 units a request,
  about 21 per keyword row and 11 per backlink or competitor row) and marks
  the ledger entry as estimated. The default budget is **10,000 units a
  month** per connection.
- The budget runs per calendar month (UTC). Before each live call Outflare
  estimates its cost and refuses with `402 budget_reached` if it would go
  over; raise the budget in the connection's SEO settings to carry on.
- Every live call is recorded in Outcomes (category `data`, provider
  `dataforseo` or `ahrefs`), so SEO spend shows next to the rest of your
  cost per meeting. Calls that fail after the provider charged are recorded
  too.
- Answers are kept for 24 hours, so asking again the same day is free.
  Pass `fresh=true` to ask again.

## Weekly snapshots

Once a week each SEO connection takes an overview and the top 50 keywords
for each of its domains and stores them (`seo_snapshots`). That is what the
Analytics page, `GET /seo/history` and the overview read, so looking is free.

- **Domains:** the connection's `domains` setting, or else the websites
  your analytics tools follow (up to five).
- **Cost:** about $0.05 a domain a week on DataForSEO (about $0.20 a
  month). About 1,200 units a domain a week on Ahrefs, so the default
  10,000-unit budget covers about two domains; raise it for more. A
  snapshot stops when the budget runs out.
- Turn it off with `"sync": "off"`, or take one now with
  `POST /seo/$ID/sync` or "Snapshot now" on the Analytics page.
- Each website on the Analytics page shows its latest SEO figures next to
  its analytics, and keyword rows show how far each position moved since the
  snapshot before. `GET /analytics/overview` includes the same figures under
  `seo` for each website.

## API

```sh
# SEO connections, their domains, budget and snapshot status
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/seo"

# Stored snapshots: free, never calls the provider
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/seo/history?report=overview&host=example.com"
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/seo/history?report=keywords&host=example.com&limit=50"

# A live report: costs money within the budget, cached for a day
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/seo/$ID/reports/backlinks?target=example.com&limit=100"

# Settings: domains, country, monthly budget (dollars or units), weekly snapshots
curl -X PUT -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"domains":["example.com"],"country":"GB","monthly_budget":25,"sync":"weekly"}' \
  "$URL/v1/workspaces/$WS/seo/$ID/settings"

# Take a snapshot now
curl -X POST -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/seo/$ID/sync"
```

`target` can be left out when the connection follows one domain. Send
`"domains": null` or `"monthly_budget": null` to go back to the defaults.
Reading needs `analytics.read`; settings and snapshots need
`integrations.manage`.

## MCP

- `list_seo`: connections, domains, budget left and snapshot status.
- `get_seo_history`: stored snapshots, with each keyword's previous position.
  Use this first; it is free.
- `get_seo_report`: a live report. Costs money within the budget, so it is
  hidden when the MCP server runs read-only.
- `update_seo_settings` and `sync_seo`: change settings, take a snapshot.
- `get_analytics_overview` includes each website's latest SEO figures.
