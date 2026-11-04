---
title: Trends
description: Chart any number over time, such as visits, sign-ups, revenue or ad spend, with a breakdown, a formula like cost per sign-up, and the period before.
sidebar:
  order: 9.7
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

A **trend** is any number over time: website visits, sign-ups, people who did something, revenue, your ad networks' clicks and spend, by day, week or month. Put several on one chart, split them by campaign or country, and work out a number between them, such as cost per sign-up.

In the app, open **Analytics** in the sidebar, then **Trends**. Trends run inside Outflare and call no third-party service. They work from the visits [website tracking](/docs/guides/website-tracking/) records, the events your workspace sends or syncs, your [conversions](/docs/guides/attribution/), [payments](/docs/guides/transactions/) and the daily numbers your connected ad accounts report.

## Series

Add up to six series. Each one is:

- **Website visits** or **Page views**: how many, or how many people.
- **An event**: a product event by name, such as `signed_up`: how many, how many people, or the total or average of one of its properties. Tick **only the first time each person did it** for first-time counts.
- **A conversion**: one of your conversions, with the event and filters it already has.
- **Payments**: how many, how many people, or the total (revenue) or average, in your brand's currency. Tick **only first payments** for new customers.
- **Ad numbers**: clicks, impressions, spend or the network's own conversions, for one ad network or all of them, and only campaigns whose name contains a word if you like. Spend is in the ad account's currency.

Filter any series the same way as a funnel step: by the visit's network, channel, campaign, landing page, device or country; by a page's path or a query parameter; by any property of an event; by a payment's amount or product.

## Options

- **Dates** and **By**: a moving range such as the last 30 days, by day, week or month.
- **Show as**: lines, bars, a number (the totals, for a dashboard tile) or a table.
- **Break down by**: split every series by something, such as the campaign, the ad network or the country. The ten largest groups are shown.
- **Formula**: a sum between the series by their letters, such as `A / B`. If A is ad spend and B is sign-ups, that is cost per sign-up. Use `+ - × ÷` and brackets.
- **Compare with the period before**: also run the same length of time before, shown dashed, with the change on each total.

Hover any point for its value. Save a trend for everyone in the brand with a name; a saved trend keeps only its series and settings, so every view counts again and it is never out of date. Saved trends can go on a [dashboard](/docs/guides/dashboards/).

## Who can do what

Everyone in the workspace can run trends (`analytics.read`). Owners, admins and operators can save, change and delete them (`analytics.manage`).

## For agents and scripts

The REST API is `POST /v1/brands/{brand}/insights/trend` to run a trend and `/v1/brands/{brand}/insights` for saved funnels and trends. See the [API reference](/docs/api/). The MCP tools are `run_trend`, `list_insights`, `get_insight`, `save_insight`, `update_insight` and `delete_insight`. Ask your agent something like *"Plot visits, sign-ups and ad spend by week for the last 90 days, and the cost per sign-up."*
