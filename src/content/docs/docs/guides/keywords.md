---
title: See what each page ranks for
description: The Keywords page shows what Google shows each page of your site for, how often people click, and how Google indexed your pages, from your own Search Console.
sidebar:
  order: 14
---

<span class="pill shipped">Shipped</span> Search Console by page and query, indexing and sitemaps, in the app, through the API and for agents.

The **Keywords** page in the SEO module shows what Google shows each page of your site for and how often people click, for up to 16 months, with how Google indexed each page and the sitemaps it read. It works for the sites you [audit](/docs/guides/site-audits/), from your own [Google Search Console](/docs/integrations/analytics/) sign-in. Outflare only reads, and opening the page never calls Google: the sync stores the numbers every six hours.

## Set it up

1. Add your website under **Site audits**, if it isn't there yet.
2. Connect **Google Search Console** on the Connectors page with the Google account that sees the site. It is read-only access, and the same sign-in can connect Google Analytics.
3. Wait for the first sync. It stores the last 90 days within a few minutes, then goes further back a couple of weeks at a time, to the 16 months Search Console keeps.

Your site's numbers come from the Search Console property that covers it: a domain property (`sc-domain:example.com`) first, otherwise the closest URL-prefix property. Only pages on the site's own host count, so `docs.example.com` stays out of `www.example.com`.

## What it shows

- **Pages:** each page's clicks, impressions, click-through rate and average position over the last 28 days Search Console has sent (it runs two or three days behind). Open a page to see the queries Google shows it for.
- **Queries:** the same by query. Open a query to see which of your pages Google shows for it. Two pages sharing one query's impressions is often a sign they compete.
- **Indexing:** what Google's URL Inspection says about your pages: indexed or not, Google's reason (for example "Crawled - currently not indexed"), the canonical Google chose when it differs from the page's own, and when Google last crawled it. Each sync inspects up to 100 pages, starting with the pages OutflareBot crawled and the pages Google shows, and checks each again after a week, within Google's daily limit. When a page's verdict changes, you see what it was before.
- **Sitemaps:** each sitemap you submitted in Search Console, when Google last read it, its errors and warnings, and how many of its URLs are indexed.

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
```

Each answer has `source`, the property the numbers come from, or `null` when no Search Console property covers the site. Reading needs the `seo.read` scope. Agents use the MCP tools `get_site_search`, `get_site_search_history`, `get_site_indexing` and `get_site_sitemaps`, for example: "Which pages get many impressions but few clicks, and what would you change on them?"
