---
title: See what each page ranks for
description: The Keywords page shows what Google shows each page of your site for, the keyword each page targets, and how Google indexed your pages, from your own Search Console.
sidebar:
  order: 14
---

<span class="pill shipped">Shipped</span> Search Console by page and query, keyword targets, indexing and sitemaps, in the app, through the API and for agents.

The **Keywords** page in the SEO module shows what Google shows each page of your site for and how often people click, for up to 16 months, with how Google indexed each page and the sitemaps it read. It works for the sites you [audit](/docs/guides/site-audits/), from your own [Google Search Console](/docs/integrations/analytics/) sign-in. Outflare only reads, and opening the page never calls Google: the sync stores the numbers every six hours.

## Set it up

1. Add your website under **Site audits**, if it isn't there yet.
2. Connect **Google Search Console** on the Connectors page with the Google account that sees the site. It is read-only access, and the same sign-in can connect Google Analytics.
3. Wait for the first sync. It stores the last 90 days within a few minutes, then goes further back a couple of weeks at a time, to the 16 months Search Console keeps.

Your site's numbers come from the Search Console property that covers it: a domain property (`sc-domain:example.com`) first, otherwise the closest URL-prefix property. Only pages on the site's own host count, so `docs.example.com` stays out of `www.example.com`.

## What it shows

- **Pages:** each page's clicks, impressions, click-through rate and average position over the last 28 days Search Console has sent (it runs two or three days behind). Open a page to see the queries Google shows it for.
- **Queries:** the same by query. Open a query to see which of your pages Google shows for it. Two pages sharing one query's impressions is often a sign they compete.
- **Targets:** the keyword each page should rank for (see below).
- **Indexing:** what Google's URL Inspection says about your pages: indexed or not, Google's reason (for example "Crawled - currently not indexed"), the canonical Google chose when it differs from the page's own, and when Google last crawled it. Each sync inspects up to 100 pages, starting with the pages OutflareBot crawled and the pages Google shows, and checks each again after a week, within Google's daily limit. When a page's verdict changes, you see what it was before.
- **Sitemaps:** each sitemap you submitted in Search Console, when Google last read it, its errors and warnings, and how many of its URLs are indexed.

## A target keyword for each page

Give each page the search it should rank for. Set it by hand, or accept the keyword Outflare suggests: the query that brought the page the most clicks over the last 28 days. **Accept all** sets every suggestion at once, and **Dismiss** stops suggestions for a page.

Each target is checked against your latest crawl: is every word of the keyword in the page's title, its H1 and its meta description? Whatever is missing goes on the [fixes list](/docs/guides/site-audits/) as a keyword fix for that page, with a prompt you can hand to a coding agent. The check runs again whenever you change a target and after every crawl, so a fix you made is confirmed by the next crawl, and one that comes back opens again. Each target also shows the clicks, impressions and average position its keyword brought the page.

Targets work without Search Console. Suggestions and the numbers need it.

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
```

Each answer has `source`, the property the numbers come from, or `null` when no Search Console property covers the site. Reading needs the `seo.read` scope, and setting targets `seo.manage`. Agents use the MCP tools `get_site_search`, `get_site_search_history`, `get_site_indexing`, `get_site_sitemaps`, `list_page_targets`, `set_page_target` and `accept_page_targets`, for example: "Which pages get many impressions but few clicks, and what would you change on them?" or "Accept the suggested target keywords and fix the pages whose titles miss them."
