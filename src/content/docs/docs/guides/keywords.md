---
title: See what each page ranks for
description: The Keywords page shows what Google shows each page of your site for, the keyword each page targets, where you rank on Google, which pages bring conversions, what dropped, pages that compete for one search, and how Google indexed your pages, from your own Search Console.
sidebar:
  order: 14
---

<span class="pill shipped">Shipped</span> Search Console by page and query, keyword targets, rank tracking, conversions by page, drops, internal links, cannibalisation, indexing and sitemaps, in the app, through the API and for agents.

The **Keywords** page in the SEO module shows what Google shows each page of your site for and how often people click, for up to 16 months, with how Google indexed each page and the sitemaps it read. It works for the sites you [audit](/docs/guides/site-audits/), from your own [Google Search Console](/docs/integrations/analytics/) sign-in. Outflare only reads, and opening the page never calls Google: the sync stores the numbers every six hours.

## Set it up

1. Add your website under **Site audits**, if it isn't there yet.
2. Connect **Google Search Console** on the Connectors page with the Google account that sees the site. It is read-only access, and the same sign-in can connect Google Analytics.
3. Wait for the first sync. It stores the last 90 days within a few minutes, then goes further back a couple of weeks at a time, to the 16 months Search Console keeps.

Your site's numbers come from the Search Console property that covers it: a domain property (`sc-domain:example.com`) first, otherwise the closest URL-prefix property. Only pages on the site's own host count, so `docs.example.com` stays out of `www.example.com`.

## What it shows

- **Pages:** each page's clicks, impressions, click-through rate and average position over the last 28 days Search Console has sent (it runs two or three days behind). Open a page to see the queries Google shows it for.
- **Queries:** the same by query. Open a query to see which of your pages Google shows for it. Two pages sharing one query's impressions is often a sign they compete. Press **Track** on a query to add it to rank tracking in one click (US, desktop, weekly); queries you already track show **Tracked**. The same button is on each query in a page's breakdown and on each search under Cannibalisation.
- **Drops:** what got worse since the numbers before (see below).
- **Targets:** the keyword each page should rank for (see below).
- **Rankings:** where your site ranks on Google for the keywords you track (see below).
- **Conversions:** the visits that start on each page and how many convert, from your own PostHog (see below).
- **Internal links:** pages about a target keyword that don't link to its page yet (see below).
- **Cannibalisation:** searches where Google shows more than one of your pages and splits the clicks (see below).
- **Indexing:** what Google's URL Inspection says about your pages: indexed or not, Google's reason (for example "Crawled - currently not indexed"), the canonical Google chose when it differs from the page's own, and when Google last crawled it. Each sync inspects up to 100 pages, starting with the pages OutflareBot crawled and the pages Google shows, and checks each again after a week, within Google's daily limit. When a page's verdict changes, you see what it was before.
- **Sitemaps:** each sitemap you submitted in Search Console, when Google last read it, its errors and warnings, and how many of its URLs are indexed.

## A target keyword for each page

Give each page the search it should rank for. Set it by hand, or accept the keyword Outflare suggests: the query that brought the page the most clicks over the last 28 days. **Accept all** sets every suggestion at once, and **Dismiss** stops suggestions for a page.

Each target is checked against your latest crawl: is every word of the keyword in the page's title, its H1 and its meta description? Whatever is missing goes on the [fixes list](/docs/guides/site-audits/) as a keyword fix for that page, with a prompt you can hand to a coding agent. The check runs again whenever you change a target and after every crawl, so a fix you made is confirmed by the next crawl, and one that comes back opens again. Each target also shows the clicks, impressions and average position its keyword brought the page.

Targets work without Search Console. Suggestions and the numbers need it.

## Track your rankings

Search Console gives an average position over every search a page was shown for. **Rankings** answers a narrower question: where does your site rank on Google today for the keywords you care about. Type the keywords, or press **Track every target keyword**, and choose desktop or mobile. Each keyword is checked weekly, or daily if you switch it.

Checks read Google's top 100 results through your own [DataForSEO or Geonode](/docs/integrations/seo/#rank-tracking) connection, never an account of Outflare's, so rank tracking stays off until you connect one. A check costs about $0.02 on your DataForSEO account, or 10 credits (about $0.005) on your Geonode account. It counts towards the connection's monthly budget and stops when the budget is spent, and every check is recorded in [Outcomes](/docs/guides/outcomes/) with its cost.

With both connected, DataForSEO checks by default. Choose **Check with Geonode** when you add keywords, or switch a single keyword with the picker on its row. If Geonode stops before the 10th page of results and your site wasn't on the pages it read, the check is marked incomplete and runs again next time, rather than counting your site as outside the top 100.

Each keyword shows its position and how it moved since the check before, its best position, and the page that ranks. When a page other than the keyword's target ranks, you see the target beside it. The history keeps every check with the top 10 results, so you can see who outranks you.

## Which pages bring conversions

Search Console tells you which pages people find, not which pages bring people who sign up or buy. Connect your own [PostHog](/docs/integrations/analytics/) and **Conversions** shows, for each page, the visits that started on it and how many went on to a conversion, overall and from search engines, beside its Search Console clicks, position and target keyword. Pages with plenty of search visits and no conversions need a better offer; pages that convert well deserve more search traffic.

Type the PostHog events that count as a conversion (for example `signed_up, purchase`) and press **Save events**. Until you do, the tab shows visits only. A visit counts under the page it started on, and as a search visit when it came from a search engine's results. Each sync makes one query on your PostHog project: the last 90 days the first time, and whenever you change the events, then the last three days again.

## What dropped

After every Search Console sync, rank check, conversions sync and crawl, Outflare compares your latest numbers with the ones before and lists what got worse under **Drops**:

- a page whose search clicks this week are 40% or more under its weekly average over the four weeks before (when it had at least 20 a week),
- a tracked keyword in the top 20 that fell five or more places, or out of the top 100,
- a page Google had indexed and no longer does,
- a landing page whose conversions halved (when it had at least 5 a week),
- the site's health score down ten or more points since the crawl before.

Each drop is on the [fixes list](/docs/guides/site-audits/) with what changed and how to look into it, so a webhook on `fix.found` tells your own systems straight away. When the numbers recover, the drop moves to **Recovered** and its fix is done. It only compares what Outflare already stored, so it costs nothing.

## Internal links worth adding

For every page with a target keyword, **Internal links** lists up to five other pages of your site about the same keyword that don't link to it yet: pages Google shows for that search, or whose title or H1 has it. The pages with the most links of their own come first, since their links pass on the most. Add a link from each, with the keyword or a close variant as the link text. Each target page is on the fixes list, and the next crawl that finds the links marks it done.

## Pages that compete for one search

When Google shows several of your pages for the same search, they split its clicks and none ranks as well as one strong page would. The **Cannibalisation** tab lists those searches from the last 28 days of Search Console: shown at least 100 times, with two or more pages each getting a tenth of the impressions or more and ranking in the top 30. Searches for your brand name are left out, since several of your pages showing for your name is normal.

Each search shows its pages with their share and position, and the page to keep: the one whose target keyword it is, otherwise the one with the most clicks. Keep that page, and merge the others into it with a redirect, or give them their own target. The 50 most shown searches are on the fixes list, checked again after every Search Console sync, and so are pages you gave the same target keyword.

## API and agents

```sh
# Pages by clicks, or queries by impressions
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/search"
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/search?group=query&sort=impressions"
# Which pages Google shows for one query
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/search?group=page_query&keyword=proxy%20pricing"
# One page day by day, pages not indexed, and sitemaps
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/search/history?page=https%3A%2F%2Fwww.example.com%2Fpricing"
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/indexing?state=not_indexed"
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/sitemaps"
# Keyword targets and suggestions; set one, or accept every suggestion
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/targets"
curl -X PUT -H "Authorization: Bearer $TOKEN" -d '{"url": "https://www.example.com/pricing", "keyword": "proxy pricing"}' "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/targets"
curl -X POST -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/targets/accept"
# Track keywords (and every target keyword), then read where they rank
curl -X POST -H "Authorization: Bearer $TOKEN" -d '{"keywords": ["proxy pricing"], "from_targets": true}' "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/rankings"
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/rankings"
# Conversions by landing page, most conversions from search first
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/conversions?sort=search_conversions"
# What dropped, and what recovered
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/regressions"
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/regressions?status=resolved"
# Internal links worth adding, and searches your pages compete for
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/internal-links"
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/cannibalisation"
```

Each answer has `source`, the property the numbers come from, or `null` when no Search Console property covers the site. Reading needs the `seo.read` scope, and setting targets or tracking keywords `seo.manage`. Agents use the MCP tools `get_site_search`, `get_site_search_history`, `get_site_indexing`, `get_site_sitemaps`, `list_page_targets`, `set_page_target`, `accept_page_targets`, `track_keywords`, `list_rankings`, `get_rank_history`, `get_site_conversions`, `get_site_regressions`, `get_site_internal_links` and `get_site_cannibalisation`, for example: "Which pages get many impressions but few clicks, and what would you change on them?" or "Accept the suggested target keywords and fix the pages whose titles miss them."
