---
title: Open-source SEO platform with rank tracking · Outflare
description: Rank tracking, backlinks, site audits, competitors and Search Console keywords in one open-source SEO platform, on your own Ahrefs or DataForSEO account.
h1: An open-source SEO platform on your own data accounts.
label: SEO
lede: Track rankings, backlinks and competitors from your own Ahrefs, DataForSEO or Geonode account, crawl and audit your sites with OutflareBot, and see what each page ranks for from your own Search Console, all with weekly history and a budget you set.
answer: Outflare is an open-source SEO platform. It reads domain rating, backlinks, ranking keywords and competitors through your own Ahrefs or DataForSEO account, tracks Google rankings for the keywords you choose through DataForSEO or Geonode, crawls your sites against 61 audit rules, and shows what each page ranks for from your own Search Console. Every paid call is capped by a monthly budget and recorded with its cost.
points:
  - Rank tracking from about $0.005 a check on your own account
  - Backlinks merged from Ahrefs and DataForSEO, with gained and lost
  - Site audits with a 0 to 100 health score
  - Weekly snapshots, so looking back is free
docs:
  - label: SEO tools
    href: /docs/integrations/seo/
  - label: See what each page ranks for
    href: /docs/guides/keywords/
  - label: Crawl and audit your sites
    href: /docs/guides/site-audits/
  - label: Track your backlinks
    href: /docs/guides/backlinks/
  - label: Follow your competitors
    href: /docs/guides/competitors/
faqs:
  - q: How does rank tracking work in Outflare?
    a: Add the keywords you care about and choose desktop or mobile. Each is checked weekly or daily against Google's live top 100 results through your own DataForSEO or Geonode connection, about $0.02 a check on DataForSEO or 10 credits (about $0.005) on Geonode, within a monthly budget you set.
  - q: Do I need an Ahrefs subscription?
    a: No. Ahrefs and DataForSEO both work, and DataForSEO is paid per call. Site audits, crawling and the Keywords page from Search Console need neither. Outflare has no SEO data of its own and never lends an account.
  - q: Is there a backlink checker?
    a: Yes. Each week your Ahrefs or DataForSEO connection reads the links to every site you audit, and Outflare merges both tools into one list, keeping every link gained, lost and regained, so you still see lost links after the tools forget them.
  - q: What does the site audit check?
    a: OutflareBot crawls your site and checks every page against 61 rules, such as broken pages, redirect chains, canonicals, hreflang, missing titles and descriptions, thin or duplicate content, orphan pages and pages hidden from AI search. Issues are grouped by URL template, so 38 blog posts with one problem show as one fix.
  - q: Is there a rank tracker API?
    a: Yes. Rankings, snapshots, backlinks and audits are all in the REST API, and agents use the MCP server, with tools such as get_seo_overview, get_seo_history and list_backlinks that read stored data for free.
related:
  - /product/analytics/
  - /product/ai-visibility/
  - /product/competitors/
  - /product/experiments/
  - /best/rank-tracking-tools/
  - /compare/outflare-vs-ahrefs/
updated: 2026-11-09
order: 45
---

## What's in it

| Part | What it does | Runs on |
| --- | --- | --- |
| Rank tracking | Where you rank on Google today for the keywords you choose, weekly or daily, desktop or mobile | Your DataForSEO or Geonode account |
| Domain overview | Domain rating, backlinks, referring domains, ranking keywords, estimated traffic | Your Ahrefs or DataForSEO account |
| Backlinks | One list from both tools, with links gained, lost and regained ([link management](/product/link-building/)) | Your Ahrefs or DataForSEO account |
| Competitors | Suggested and tracked competitors, their weekly numbers, and a feed of what they change | Your Ahrefs or DataForSEO account, plus OutflareBot |
| Site audits | A crawl of your site, 61 rules, a health score and a [fixes list](/product/fixes/) | OutflareBot, no key needed |
| Keywords | What Google shows each page for, targets, drops, cannibalisation and indexing | Your own Google Search Console |
| Experiments | Whether a change to some pages helped, against matched control pages | Your own Google Search Console |

## Rank tracking

Type keywords, or press **Track every target keyword**. Each check reads Google's top 100 results, so you see your position, how it moved since the last check, your best position and the page that ranks. When a page other than the keyword's target ranks, you see both. The history keeps the top 10 results of every check, so you can see who outranks you.

Checks run on your own [DataForSEO or Geonode](/docs/integrations/seo/#rank-tracking) account, never Outflare's, so rank tracking stays off until you connect one. Every check counts toward the connection's monthly budget and is recorded in [Outcomes](/product/outcomes/) with its cost.

## Weekly snapshots and budgets

Once a week each SEO connection stores an overview and the top 50 keywords for each of your domains, about $0.05 a domain a week on DataForSEO. That is what the SEO pages read, so looking is free.

- **Budgets.** $10 a month per DataForSEO connection and 10,000 units per Ahrefs connection by default. Before a live call Outflare estimates its cost and refuses it if it would go over.
- **Cached for a day**, so asking again the same day costs nothing.
- **Is each brand growing?** The SEO overview compares the last four weeks with the four before for branded search, visitors, domain rating, links and organic keywords, and marks each Growing, Falling or Steady.

## Site audits with OutflareBot

Add a site and [OutflareBot](/bot/) crawls it politely, reading robots.txt and sitemaps first and slowing down when your server asks. It needs no connector. A site you have not proved you own is crawled lightly (up to 100 pages); prove ownership with a DNS record, meta tag or file to crawl up to 10,000 pages.

Each crawl gets a health score from 0 to 100, the share of pages with no error, and every issue says why it matters and how to fix it. Fixes can become tickets for your team or a coding agent. See [Crawl and audit your sites](/docs/guides/site-audits/).

## Keywords from Search Console

With your own Search Console connected, the Keywords page shows each page's clicks, impressions, click-through rate and position for up to 16 months, what got worse, pages that compete for one search, internal links you could add, and how Google indexed each page through URL Inspection. Connect PostHog and it also shows which pages bring conversions. See [See what each page ranks for](/docs/guides/keywords/).

## SEO experiments

Split pages into a treatment group and a matched control group, change only the treatment pages, and Outflare measures the result from Search Console, starting from your next production deploy. See [Experiments](/product/experiments/).

## For agents

Every part is in the [API](/developers/api/) and the [MCP server](/product/mcp/). Agents start with `get_seo_overview`, read stored history with `get_seo_history`, and use `get_seo_competitor_gaps` to find keywords and linking domains your competitors have and you don't. Live reports that cost money are hidden when the MCP server runs read-only.

## What Outflare doesn't do

- It has no link or keyword data of its own and never lends an account. You pay Ahrefs, DataForSEO or Geonode directly.
- It only reads from those tools. Nothing changes there.
