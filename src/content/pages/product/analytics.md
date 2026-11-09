---
title: Analytics dashboard for GA4 and Search Console · Outflare
description: Google Analytics, Search Console, PostHog, Plausible and more in one website analytics dashboard, with stored history, SEO figures and answers for agents.
h1: One website analytics dashboard for every tool you use.
label: Analytics
lede: Outflare reads the analytics tools already on your website, such as Google Analytics, Search Console, PostHog and Plausible, and lines them up by website, so a person, a script or an agent can ask how the site is doing without caring which tool answers.
answer: Outflare is an open-source website analytics dashboard that reads Google Analytics 4, Google Search Console, Bing Webmaster Tools, PostHog, Plausible and nine other tools through the same five reports, traffic, pages, sources, search queries and events. It stores each tool's daily numbers so you can look back months and compare tools side by side, adds SEO figures for each website, and only ever reads from your accounts.
points:
  - 14 analytics tools, one shape of report
  - GA4 and Search Console with one read-only Google sign-in
  - Daily history stored in your own database
  - "One call for agents: what changed, and why"
docs:
  - label: Website analytics
    href: /docs/integrations/analytics/
  - label: Analytics for agents
    href: /docs/agents/analytics/
  - label: Dashboards
    href: /docs/guides/dashboards/
  - label: Daily and weekly digests
    href: /docs/guides/digests/
faqs:
  - q: Can I see Google Analytics and Search Console in one place?
    a: Yes. One read-only Google sign-in connects both, and Outflare shows each website's visitors, page views and search clicks side by side, with search clicks added up across Google and Bing. You can also connect them with a service account key.
  - q: Which analytics tools does Outflare support?
    a: Google Analytics 4, Google Search Console, Bing Webmaster Tools, PostHog, Plausible, Fathom, Matomo, Umami, Mixpanel, Amplitude, Cloudflare Web Analytics, Simple Analytics, Microsoft Clarity and Vercel Web Analytics. Outflare also has its own website tracking tag.
  - q: Does Outflare change anything in my analytics tools?
    a: No. Outflare only reads. It stores each tool's daily numbers in its own database every six hours, so reading history never calls the provider again.
  - q: Can I build an SEO report with it?
    a: Each website shows its traffic, search clicks from Google and Bing, and its latest SEO figures, such as domain rating and ranking keywords from your Ahrefs or DataForSEO connection, side by side. The SEO overview says whether each brand is growing in search, and the API returns the same numbers for reports of your own.
  - q: How does an AI agent read my analytics?
    a: Over the API or the MCP server. get_analytics_changes answers, per website, what changed against the period before, with headline sentences that name the tool and dates, the pages and queries that moved, unusual days and what is missing for a full picture.
related:
  - /product/seo/
  - /product/product-analytics/
  - /product/website-visitors/
  - /best/seo-reporting-tools/
  - /product/mcp/
  - /compare/outflare-vs-semrush/
updated: 2026-11-09
order: 40
---

## Every tool, the same five reports

| Report | What it answers |
| --- | --- |
| Traffic | Totals for the range, plus one point per day |
| Pages | Top pages |
| Sources | Top referrers and sources |
| Search queries | What people searched before clicking through (Search Console, Bing) |
| Events | Events and conversions by name |

Metrics are visitors, page views, visits, bounce rate, click-through rate, average duration, clicks, impressions, position, events and conversions. A metric a tool doesn't measure is left out, never shown as zero, and caveats such as Search Console's two to three day delay are explained in words.

## Supported tools

| Tool | Connect with |
| --- | --- |
| Google Analytics 4 | Read-only Google sign-in, or a service account key |
| Google Search Console | The same Google sign-in, or a service account key |
| Bing Webmaster Tools | API key |
| PostHog | Sign in with PostHog (US or EU), or a personal API key |
| Plausible, Fathom, Matomo, Umami | API key, cloud or self-hosted where offered |
| Mixpanel, Amplitude | Service account or API keys |
| Cloudflare Web Analytics | Sign in with Cloudflare, or an API token |
| Simple Analytics, Microsoft Clarity, Vercel Web Analytics | API key or token |

One sign-in often sees many sites, such as every GA4 property your login can open. Each syncs unless you switch it off, up to 20 per connection, and each is placed in a [brand](/product/brands/), shared by all brands, or not imported. Outflare suggests the brand from each site's address and says why.

If your site has Outflare's own [website tracking](/docs/guides/website-tracking/) tag, the page shows visitors, visits, page views, bounce rate and visit length before you connect any tool, counted live and with bots left out.

## Stored history

Every six hours Outflare copies each connection's daily numbers into your Postgres database. The first sync takes 90 days of traffic and 7 days of breakdowns, then builds up a day at a time. Later syncs read the last three days again, because providers revise recent days.

- **Websites line up by domain**, so one site measured by GA4 and Plausible shows both tools side by side.
- **Compare tools day by day** draws one line per tool for a website, to spot a tracking gap.
- **History is free to read.** It never calls a provider, so it doesn't spend their rate limits.

## SEO next to traffic

Each website also shows its latest [SEO](/product/seo/) figures: domain rating, referring domains and ranking keywords, from your own Ahrefs or DataForSEO connection. Search clicks from Search Console and Bing are added up, so you see organic search beside total traffic. Connect PostHog and the Keywords page shows which landing pages bring conversions, not just clicks.

## Dashboards, reports and digests

- **[Dashboards](/product/dashboards/)** put your saved funnels, trends, retention and paths on one page over the same dates, with notes. Share one by a read-only link, with a password and an expiry.
- **[Channels](/docs/guides/attribution/)** show visits, sign-ups, revenue and cost for every channel under the attribution model you choose.
- **[Digests](/docs/guides/digests/)** summarise the workspace daily or weekly, each number next to the period before, in the app, as a webhook, or by email through your own provider.

## For agents

`get_analytics_changes` answers "what changed?" for every website in one call: headline sentences that name their tool and dates, each tool against the period before, the pages, sources and queries that moved most, unusual days, SEO moves since the last weekly snapshot, and the gaps with how to fix them. It reads stored data, so it is free and fast. See [Analytics for agents](/docs/agents/analytics/) and the [MCP server](/product/mcp/).

## What Outflare doesn't do

- It doesn't change anything in your analytics tools.
- It doesn't need analytics connected for anything else in Outflare to work.
- Hotjar and Segment are listed but can't be connected, because they have no read API for traffic.
