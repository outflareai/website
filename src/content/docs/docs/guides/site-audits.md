---
title: Crawl and audit your sites
description: Add your websites, prove you own them, and let OutflareBot crawl them politely to find broken links, redirects, noindex pages and what robots.txt blocks.
sidebar:
  order: 13
---

<span class="pill shipped">Shipped</span> Sites, ownership checks and crawls, through the API and agents. The SEO pages in the app, the audit rules, the health score and the fixes list come next.

Outflare reads your own websites with its crawler, [OutflareBot](/bot/), and records every page it finds: its HTTP status, where redirects lead, which pages ask not to be indexed, and which pages your robots.txt keeps crawlers away from. It needs no connector or API key. SEO tools like [DataForSEO and Ahrefs](/docs/integrations/seo/) add what others see of your site, and are separate.

## Add a site

Add the site's address, such as `https://www.example.com`. If one of your [brands](/docs/guides/brands/) lists that domain, the site joins that brand; otherwise you choose a brand or leave it shared.

## Prove you own it

Any site can be crawled lightly. Proving that you own a site lets you crawl it fully:

| | Not proved | Proved |
| --- | --- | --- |
| Pages per crawl | Up to 100 | Up to 10,000 |
| Pause between requests | At least 2 seconds | As little as 250 ms |
| robots.txt | Always obeyed | You may audit pages your own robots.txt hides |

Add any one of these, then ask Outflare to check (`POST .../verify`, or the `verify_seo_site` tool):

- **A DNS record:** a TXT record on your domain (without `www.`) with the value `outflare-site-verification=` followed by your site's token.
- **A meta tag** in the `<head>` of the start page: `<meta name="outflare-site-verification" content="your token">`.
- **A file** at `/.well-known/outflare-site-verification.txt` holding the token.

Outflare checks a proved site again every 30 days. If the proof has gone, the site goes back to the lower limits.

## Crawl

Start a crawl, or set the site to crawl daily or weekly by itself. OutflareBot reads robots.txt and your sitemaps first, then follows links from the start page, one request at a time. It slows down when your server answers `429` or `503`, sends `Retry-After`, or answers slowly, and stops after ten errors in a row. [outflare.ai/bot](/bot/) says exactly how it behaves, for anyone who sees it in their logs.

Each page the crawl found is one of:

- **Fetched**, with its HTTP status. A 404 is a broken link, and a 3xx shows where it redirects.
- **Blocked**: robots.txt does not allow it.
- **Failed**: the server did not answer or answered with an error.
- **Skipped**: never reached, because the crawl hit its page limit or was stopped.

Each page also shows how it was found (from the start page, a link, a sitemap or a redirect), the page that led there, and whether it asks not to be indexed or followed.

For each HTML page, Outflare also keeps what an audit checks: the title, meta description, canonical, h1, language and hreflang, the structured data types, the word count, images without alt text, the viewport tag, and a fingerprint that matches pages with the same words. It never stores the page's text. It also keeps every link on the page, with its anchor text, so you can see a page's links out with the status each one returned (a 404 is a broken link) and the pages that link to it. A page in your sitemap that nothing links to is an orphan. A meta refresh counts as a redirect, and links marked `nofollow`, `ugc` or `sponsored` are not followed.

## Pages built by JavaScript

Some sites send an almost empty page and build it in the browser with JavaScript (React, Vue, Angular and the like). Read as served, such a page has no title, words or links. When the server has a browser, OutflareBot loads those pages in it, lets their scripts run, and audits what the browser built. Each site's `render` setting says when:

- **Auto** (the default): when the page as served looks like an empty app shell.
- **Always**: every HTML page. Slower, because each page takes a few seconds.
- **Never**: every page is read as served.

A rendered page shows `rendered`, and `raw_word_count` keeps the words in the HTML as served. Far fewer words than the rendered `word_count` means crawlers that don't run JavaScript see little of the page. If rendering fails, the page is kept as served.

The browser follows the same rules as the crawler. Each page gets a fresh profile with no cookies, loads no images, video or fonts, obeys robots.txt on your site, never submits a form, and gets at most 20 seconds and 150 requests. Every request it makes goes through the Outflare server, which only lets it reach public addresses.

A site's `rendering_available` says whether its server can render. On a self-hosted server, set `OUTFLARE_CHROME_PATH` or `OUTFLARE_RENDER_URL` (see [Configuration](/docs/self-hosting/configuration/)).

## From the API or an agent

```sh
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"url": "https://www.example.com", "schedule": "weekly"}' \
  https://app.outflare.ai/v1/workspaces/$WS/seo-sites
curl -X POST -H "Authorization: Bearer $TOKEN" https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/verify
curl -X POST -H "Authorization: Bearer $TOKEN" https://app.outflare.ai/v1/workspaces/$WS/seo-sites/$SITE/crawls
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/crawls/$CRAWL/pages?status=blocked"
curl -H "Authorization: Bearer $TOKEN" "https://app.outflare.ai/v1/workspaces/$WS/crawls/$CRAWL/pages?http_status=404"
curl -H "Authorization: Bearer $TOKEN" https://app.outflare.ai/v1/workspaces/$WS/crawls/$CRAWL/pages/$PAGE
```

Reading needs the `seo.read` scope; adding sites, checking ownership and crawling needs `seo.manage`. Agents use the MCP tools `add_seo_site`, `verify_seo_site`, `start_crawl`, `get_crawl`, `list_crawl_pages` and `get_crawl_page` (see [MCP](/docs/agents/mcp/)).

On a self-hosted server, OutflareBot only visits public sites. Set `OUTFLARE_CRAWL_ALLOW_PRIVATE=true` to audit an intranet or a site in development.
