---
title: "Product analytics with funnels, retention and paths · Outflare"
description: "Funnels from ad click to first payment, retention cohorts, paths, trends with formulas, dashboards and digests, from your own events, visits and payments."
h1: "Funnels, retention and paths from ad click to payment."
label: Product analytics
lede: "Follow people from an ad click or a website visit through sign-up to their first payment, see who comes back, where they go and what each number costs, then put it all on a dashboard and in a weekly digest."
answer: "Outflare's product analytics answers who got through each step, who came back and where people went, from the visits its website tracking records, the events your product sends, your conversions, payments and your ad accounts' daily numbers. It has funnels, retention cohorts and lifecycle, paths, trends with formulas such as cost per sign-up, dashboards you can share by link, and daily or weekly digests. It all runs inside Outflare and calls no third-party service."
points:
  - "Funnels that count people across ad click, visit, sign-up and payment"
  - "Retention cohorts and a new, returning and dormant lifecycle view"
  - "Trends with formulas, such as ad spend divided by sign-ups"
  - "Dashboards shared by link, and a digest every day or week"
docs:
  - label: Funnels
    href: /docs/guides/funnels/
  - label: Retention
    href: /docs/guides/retention/
  - label: Paths
    href: /docs/guides/paths/
  - label: Trends
    href: /docs/guides/trends/
  - label: Dashboards
    href: /docs/guides/dashboards/
  - label: Digests
    href: /docs/guides/digests/
faqs:
  - q: "Where does Outflare's product analytics data come from?"
    a: "From the visits Outflare's website tracking records, the events your product sends or a connected tool syncs, your conversions and payments, and, for ad numbers, the daily figures your connected ad accounts report. Queries run inside Outflare on your own data."
  - q: "Can a funnel start from an ad click and end at a payment?"
    a: "Yes. Steps can be website visits filtered by ad network or campaign, events, page views, conversions or payments, with time limits such as a first payment within 3 days of signing up. A visit from before someone signed up counts for them once your site identifies them."
  - q: "How is retention measured?"
    a: "Pick what starts a cohort (a visit, page, event, conversion or payment) and what counts as coming back, by day, week or month for up to 24 periods. The Lifecycle view also splits each period's active people into new, returning and resurrected, with the dormant ones below the line."
  - q: "Can I share a dashboard with someone outside the workspace?"
    a: "Yes. Share by link gives a read-only page at app.outflare.ai/share/… with every tile run live, optionally behind a password and with an expiry from 7 days to a year. Taking the link back stops it at once."
  - q: "Can I get alerted when a number moves?"
    a: "Yes. Under a saved trend, Alert on this number raises an alert when the number goes above or below a value, or rises or falls by more than a percentage, checked every hour, in the app, by email, in Slack or as a webhook."
related:
  - /product/analytics/
  - /product/experiments/
  - /product/journeys/
  - /product/customer-data/
  - /product/outcomes/
  - /product/paid-media/
updated: 2026-11-09
order: 89
---

## What you can ask

| Tool | The question it answers |
| --- | --- |
| Funnels | How many people got through each step, where did the rest drop off, and how long did each step take? |
| Retention | Of the people who started in a week, how many came back the week after, and the one after that? |
| Lifecycle | Is the active base growing from new, returning or resurrected people? |
| Paths | Where do people actually go after a page, or before they pay? |
| Trends | How does any number move over time, and what is it per sign-up? |
| Dashboards | What do the numbers that matter look like together, over the same dates? |
| Digests | What changed this week across the whole workspace? |

All of them are under **Analytics** in the app, per brand, and in the API and MCP server.

## Funnels

A funnel counts people, not events, so each bar shows exactly who you lost. Add up to ten steps: a **website visit** (filtered by ad network, channel, campaign, landing page, device or country), an **event**, a **page view**, a **conversion** or a **payment** (tick **first** for first payments only). Give any step a time limit.

- **In any order** for set-up steps that can happen in any sequence.
- **Leave people out** who did something between two steps, such as contacting support.
- **Count companies** instead of people.
- **Ad clicks** puts your ad network's own click count in front of step 1 for comparison.
- **Break down** by campaign, ad network or [A/B test](/product/experiments/) version.
- Click a bar to see the people behind it, and **Save as a list** to mail them. *Signed up, never paid* is a sequence waiting to happen.
- **What did people who finished do differently?** compares the events, pages and properties of people who finished with those who didn't.

## Retention and lifecycle

Choose who starts a cohort and what counts as coming back, by day, week or month. The curve shows the average share who came back each period; the triangle shows each cohort. The **Lifecycle** view shows each period's active people as new, returning and resurrected, with dormant people below the line: a growing bar of returning people is a product people keep using.

## Paths

Start from a page or event, work back from one, or start from each person's first step. See 2 to 6 steps of page views, events or both, how many took each route and where they stopped. Funnels check the route you expect; paths show the routes people take.

## Trends

Up to six series on one chart: website visits, page views, events, conversions, payments and your ad networks' clicks, impressions, spend and conversions. Break them down, compare with the period before, and add a **formula** such as `A / B` for cost per sign-up. **Notes** mark launches and outages on every chart, and **Alert on this number** tells you when it crosses a line.

## Dashboards and digests

A dashboard holds saved funnels, trends, retention, lifecycle and paths questions, plus notes, all re-run over the dashboard's dates when you open it, so nothing is out of date. Arrange tiles on a twelve-column grid and share it read-only by link, with an optional password and expiry.

The [digest](/docs/guides/digests/) is one daily or weekly summary of the whole workspace: what needs a person, site health, outreach, lifecycle email, missions, visits, conversions, revenue and cost, each against the period before, plus your dashboards' trends if you tick them. It's kept in the app, sent as the `digest.ready` webhook, and emailed only through your own email provider when you choose.

## For agents

Every question is an API call and an MCP tool (`run_funnel`, `run_trend`, `run_paths`, retention and lifecycle, `save_insight`, `create_dashboard`, `preview_digest`), so you can ask an agent *"Of the people who came from our Google ads last month, how many signed up, and how many of those paid within 3 days?"*

## What to know

- It needs data in Outflare: the [website tracking](/docs/guides/website-tracking/) snippet, your product's events, and payments from the transactions API or a billing connection.
- Everyone in the workspace can run questions; owners, admins and operators save and change them.
- For page-level website analytics from Google Analytics, Search Console or PostHog side by side, see [website analytics](/product/analytics/).
