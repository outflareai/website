---
title: Marketing dashboards, trends and digests · Outflare
description: Build marketing dashboards from saved funnels, trends and retention, share them by link, and get a daily or weekly digest of the whole workspace.
h1: Marketing dashboards that are never out of date.
label: Dashboards
lede: Put your saved funnels, trends, retention and paths questions on one page, run over the same dates, with notes between them. Share it read-only by link, and get a digest of the whole workspace each day or week.
answer: In Outflare, a dashboard is one page of saved funnels, trends, retention, paths and lifecycle questions, all run live over the same dates, so nothing on it is ever stale. Trends chart website visits, product events, conversions, revenue and ad spend, with formulas such as cost per sign-up. You can share a dashboard read-only by link with a password and an expiry, and a daily or weekly digest summarises the whole workspace, including SEO and site health.
points:
  - Tiles for funnels, trends, retention, paths, lifecycle and notes
  - Every tile re-runs on open, over the dashboard's dates
  - Share read-only by link, with a password and an expiry
  - Daily or weekly digests in the app, by webhook or email
docs:
  - label: Dashboards
    href: /docs/guides/dashboards/
  - label: Trends
    href: /docs/guides/trends/
  - label: Daily and weekly digests
    href: /docs/guides/digests/
  - label: Funnels
    href: /docs/guides/funnels/
  - label: Reports
    href: /docs/guides/reports/
faqs:
  - q: Can I build a custom marketing dashboard in Outflare?
    a: Yes. Create a dashboard under Analytics, add saved funnels, trends, retention, paths or lifecycle questions and notes as tiles, and arrange them on a twelve-column grid. Every tile runs again when you open the page, over the dashboard's dates.
  - q: Is there a customisable SEO dashboard?
    a: SEO has its own pages rather than dashboard tiles. The SEO overview shows each brand's branded search, visitors, domain rating, links, site health and open fixes, and the weekly digest includes site health and fixes. Dashboard tiles chart visits, events, conversions, revenue and ad numbers, not Search Console or rankings.
  - q: Can I share a dashboard with a client or investor?
    a: Yes. Share by link gives a read-only page where every tile runs live, and nothing else of the brand is visible. Add a password and an expiry from 7 days to a year, and take the link back at any time.
  - q: Where does the dashboard data come from?
    a: From what Outflare already records, the visits its website tracking sees, the events your product sends or syncs, your conversions and payments, and the daily numbers your connected ad accounts report. Trends call no third-party service when they run.
  - q: Can an AI agent build a dashboard?
    a: Yes, over the API or MCP, with tools such as create_dashboard, add_dashboard_tile, run_trend and share_dashboard. Ask something like "Make a Weekly numbers dashboard with the sign-up funnel and a cost-per-sign-up trend."
related:
  - /product/analytics/
  - /product/product-analytics/
  - /product/outcomes/
  - /product/seo/
  - /best/seo-reporting-tools/
  - /solutions/marketing-teams/
updated: 2026-11-09
order: 104
---

## What goes on a dashboard

A dashboard answers one question: the weekly numbers, a launch, a channel. Open **Analytics**, then **Dashboards**, name it and add tiles.

| Tile | What it shows |
| --- | --- |
| Trend | Any number over time, as lines, bars, a table or a single number with the change on the period before |
| Funnel | How many people get from one step to the next, full width |
| Retention | How many people come back, period by period |
| Paths | What people do before or after a step |
| Lifecycle | New, returning and resurrected people |
| Note | A few lines on what the page is for or what to look at first |

Choose the dates at the top: a moving range such as the last 30 days, fixed dates, or each tile's own dates. Turn on **against the period before** to compare every trend. **Arrange** moves and resizes tiles on a twelve-column grid; everyone in the brand sees the same layout. Taking a tile off never deletes the saved question behind it.

## Trends: the numbers marketers chart

A trend is any number over time, by day, week or month, with up to six series:

- **Website visits and page views**, from [website tracking](/product/website-visitors/).
- **Product events** such as `signed_up`, counted, by people, or summed by a property.
- **Conversions** and **payments**, including revenue and first payments.
- **Ad numbers**: clicks, impressions, spend and the network's own conversions, from your connected [ad accounts](/product/paid-media/).

Filter by channel, campaign, landing page, device or country, break down by any of them, and add a **formula** such as `A / B`. With ad spend as A and sign-ups as B, that is cost per sign-up. **Notes on these dates** mark launches, campaigns and outages on every chart of the brand, so a jump has its reason beside it.

**Alert on this number** checks a saved trend every hour and alerts you in the app, by email, in Slack or by webhook when it crosses a line or moves by more than a percentage.

## Share by link

**Share by link** makes a read-only page at `app.outflare.ai/share/…` for people outside the workspace. Every tile runs live over the dashboard's dates, or dates the viewer picks, and nothing else of the brand is shown. Add a password and an expiry, see how often the link was opened, and **Take the link back** to stop it at once. A dashboard has one link at a time.

## Digests: the whole workspace in one summary

A digest is a daily or weekly summary of everything in one place: what needs a person, fixes found and confirmed, deploys, site health, outreach, lifecycle email, missions and channels (visits, conversions, revenue and cost), each number against the period before. Tick **Put its trends in the digest** and a dashboard's trends join it.

- **Weekly by default**, on Mondays at 08:00 UTC, or daily, at the hour and time zone you choose.
- **Kept in the app** and sent as the `digest.ready` [webhook](/developers/api/), so Slack or your own system can post it.
- **Emailed only if you choose**, through your own Amazon SES, Postmark or Resend account, from one of your verified domains. Outflare never sends it from an account of its own.

## SEO and sending reports

SEO numbers live on their own pages rather than dashboard tiles. The [SEO overview](/product/seo/) answers whether each brand is growing in search, with branded search, visitors, domain rating, links, site health and open [fixes](/product/fixes/), all from stored data. [Website analytics](/product/analytics/) puts each site's GA4, Search Console and other tools side by side. **Sending reports** break cold email down by day, week, sequence, step, mailbox or domain, and [Outcomes](/product/outcomes/) show cost per meeting.

## For AI agents and scripts

Dashboards are in the API at `/v1/brands/{brand}/dashboards`, with tiles at `.../dashboards/{dashboard}/tiles`. Agents use `list_dashboards`, `create_dashboard`, `add_dashboard_tile`, `share_dashboard`, `run_trend` and `list_digests` over [MCP](/product/mcp/). Everyone in the workspace can open dashboards; owners, admins and operators can change them.

## What dashboards don't do

- Tiles don't chart Search Console, rankings or backlinks; those are on the SEO pages and in the digest.
- They don't pull in numbers from tools Outflare hasn't connected or recorded.
- Shared links show numbers without the brand's notes.
