---
title: Retention
description: Of the people who first did something in a week, how many came back the week after, and the one after that. And each week, how many active people were new, returning or back after a gap.
sidebar:
  order: 9.75
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

**Retention** answers who came back. Take everyone who first did something in a given week (a cohort): visited, signed up, paid. How many of them did it again, or did something else, in the week after, and the one after that? Cohorts that stick are the ones to learn from; cohorts that fade point at what changed.

In the app, open **Analytics** in the sidebar, then **Retention**. Retention runs inside Outflare and calls no third-party service. It works from the visits [website tracking](/docs/guides/website-tracking/) records, the events your workspace sends or syncs, your [conversions](/docs/guides/attribution/) and [payments](/docs/guides/transactions/).

## Ask it

- **Who starts a cohort**: a website visit, a page view, an event such as `signed_up`, a conversion or a payment, with the same filters as a [funnel](/docs/guides/funnels/) step. Each person joins the cohort of the period they first did it in the dates.
- **What counts as coming back**: the same thing again, or something else. *Signed up, then paid* is a sign-up start with a payment return.
- **Dates the cohorts start in**, **By** day, week or month, and how many **periods after** to follow (up to 24).

## Read it

- The **curve** is the average share who came back in each period, over the cohorts that have reached it.
- The **triangle** has one row per cohort: how many people started, and the share who came back in period 0 (the start period itself), 1, 2 and so on. Darker is better. A dot is a period that hasn't begun yet.
- Each person counts once per period, however often they came back in it.

Save a question for everyone in the brand with a name; it keeps only the question, so every view counts again. Saved questions can go on a [dashboard](/docs/guides/dashboards/).

## Lifecycle

The **Lifecycle** view at the top of the page asks the other retention question: is the active base growing, and from where? Pick what counts as **active** (a visit, a page, an event, a conversion or a payment) and a period. Each day, week or month then shows, as one bar:

- **New**: active for the first time ever. Outflare looks at the person's whole history, not only the dates shown.
- **Returning**: active this period and the one before.
- **Resurrected**: active this period, not the one before, but some time earlier.
- **Dormant**, below the line: active the period before and not this one. These are the people lost, so they are not part of the period's active count.

New, returning and resurrected add up to everyone active in the period. A growing bar made of returning people is a product people keep using; a bar that is mostly new with a long dormant tail is a leaky bucket. Hover a bar for the numbers; the table underneath has every period. Lifecycle questions save and go on dashboards like cohorts do.

## Who can do what

Everyone in the workspace can run retention (`analytics.read`). Owners, admins and operators can save, change and delete questions (`analytics.manage`).

## For agents and scripts

The REST API is `POST /v1/brands/{brand}/insights/retention` for cohorts and `POST /v1/brands/{brand}/insights/lifecycle` for lifecycle, and `/v1/brands/{brand}/insights` keeps saved questions with funnels and trends. See the [API reference](/docs/api/). The MCP tools are `run_retention` and `run_lifecycle`, with `save_insight` and the other saved-insight tools. Ask your agent something like *"Of the people who signed up each week this quarter, what share came back the week after, and which cohort sticks best?"*
