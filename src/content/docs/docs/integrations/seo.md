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
| Ahrefs | Sign in with Ahrefs (Ahrefs Connect), or an API key | ahrefs.com, Account settings → API keys (needs a plan with API access). Signing in needs an Ahrefs Connect app on the server (`CONNECTOR_AHREFS_CLIENT_ID`). Calls then spend the signed-in account's units. |

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
| `links` | Single links to it, strongest linking domains first; `since=YYYY-MM-DD` adds links lost since then | Yes | Yes |
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
SEO page, `GET /seo/history` and the overview read, so looking is free.

- **Domains:** the connection's `domains` setting, or else the websites
  your analytics tools follow (up to five).
- **Cost:** about $0.05 a domain a week on DataForSEO (about $0.20 a
  month). About 1,200 units a domain a week on Ahrefs, so the default
  10,000-unit budget covers about two domains; raise it for more. A
  snapshot stops when the budget runs out.
- Turn it off with `"sync": "off"`, or take one now with
  `POST /seo/$ID/sync` or "Snapshot now" on the SEO page.
- Each website on the Website analytics page shows its latest SEO figures next to
  its analytics, and keyword rows show how far each position moved since the
  snapshot before. `GET /analytics/overview` includes the same figures under
  `seo` for each website.

## Is each brand growing?

The **SEO overview** page, first in the SEO module, answers that for each
[brand](/docs/guides/brands/) from what is already stored, so it is free.
Each brand gets four answers, the last four whole weeks against the four
before, each marked Growing, Falling or Steady (within 3%):

- **Branded search:** clicks on searches that name the brand: its name, its
  handle or its domains' names, such as "repocket" for repocket.com. It needs
  Google Search Console connected on your own account.
  Consoles hide rare searches, so this is a floor, not a total.
- **Visitors**, from your analytics tools (GA4, Plausible and the like), and
  search clicks. A website two tools both measure is counted once.
- **Domain rating** and **referring domains and backlinks**, from the weekly
  snapshots above. Ahrefs DR is used when Ahrefs is connected.

Below them are the brand's audited sites with their [health score](/docs/guides/site-audits/)
and its open fixes. Websites no brand claims show as shared. Pick a brand in
the brand switcher to see only that one. An answer reads "Not enough data"
until its tool has synced eight weeks, or two snapshots four weeks apart.

## Backlinks

Each weekly snapshot also reads the links to every site you [audit](/docs/guides/site-audits/), merges what both tools found into one list and keeps every link gained, lost and regained. See [Track your backlinks](/docs/guides/backlinks/).

## Competitors

Each weekly snapshot also suggests the domains competing with each audited site for the same keywords. Tracked competitors get an overview each week (up to 10 a site, priced like one of your own domains) and a light look from OutflareBot at their robots.txt, sitemaps and home page, and every change is kept in a feed. See [Follow your competitors](/docs/guides/competitors/).

## API

```sh
# SEO connections, their domains, budget and snapshot status
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/seo"

# Is each brand growing in search: free
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/workspaces/$WS/seo/overview?brand=repocket&weeks=12"

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

- `get_seo_overview`: each brand's search growth (branded search, visitors,
  domain rating, links) with its trends, site health and open fixes. Free;
  start here when asked how SEO is going.
- `list_seo`: connections, domains, budget left and snapshot status.
- `get_seo_history`: stored snapshots, with each keyword's previous position.
  Use this first; it is free.
- `get_seo_report`: a live report. Costs money within the budget, so it is
  hidden when the MCP server runs read-only.
- `update_seo_settings` and `sync_seo`: change settings, take a snapshot.
- `list_backlinks`, `list_backlink_events` and `get_backlinks_summary`: the
  links to your audited sites from both tools, what was gained, lost and
  regained, and each site's totals. Free.
- `list_seo_competitors` and `list_competitor_events`: each site's suggested
  and tracked competitors with their numbers, and what changed at them. Free.
  `add_seo_competitor`, `update_seo_competitor`, `remove_seo_competitor` and
  `check_seo_competitor` track, dismiss, remove or look at one.
- `get_seo_competitor_gaps`: keywords your tracked competitors rank for that
  you don't, and domains that link to them but not to you. Free.
- `get_analytics_overview` includes each website's latest SEO figures.
