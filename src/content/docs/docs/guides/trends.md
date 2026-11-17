---
title: Trends
description: Chart any number over time, such as visits, sign-ups, active people, revenue or ad spend, with breakdowns, a formula like cost per sign-up, a forecast and the period before.
sidebar:
  order: 9.7
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

A **trend** is any number over time: website visits, sign-ups, people who did something, revenue, your ad networks' clicks and spend, by day, week or month. Put several on one chart, split them by campaign or country, and work out a number between them, such as cost per sign-up.

In the app, open **Analytics** in the sidebar, then **Trends**. Trends run inside Outflare and call no third-party service. They work from the visits [website tracking](/docs/guides/website-tracking/) records, the events your workspace sends or syncs, your [conversions](/docs/guides/attribution/), [payments](/docs/guides/transactions/) and the daily numbers your connected ad accounts report.

## Series

Add up to six series. Each one is:

- **Website visits** or **Page views**: how many, or how many people.
- **An event**: a product event by name, such as `signed_up`: how many, how many people, or a number from one of its properties (see Measures below). Tick **only the first time each person did it** for first-time counts.
- **A conversion**: one of your conversions, with the event and filters it already has.
- **Payments**: how many, how many people, or the total (revenue), average, median or a percentile of the amount, in your brand's currency. Tick **only first payments** for new customers.
- **Ad numbers**: clicks, impressions, spend or the network's own conversions, for one ad network or all of them, and only campaigns whose name contains a word if you like. Spend is in the ad account's currency.

Filter any series the same way as a funnel step: by the visit's network, channel, campaign, landing page, device or country; by a page's path or a query parameter; by any property of an event; by a payment's amount or product.

## Measures

Each series counts **how many** by default. You can also pick:

- **People**: how many different people. By day, that is your daily active people.
- **Weekly active people** and **Monthly active people**: the different people in the 7 or 30 days up to each point, so a daily chart moves smoothly instead of dipping every weekend.
- **Total of**, **Average of**, **Median of**, **90th percentile of**, **99th percentile of**, **Smallest** and **Biggest**: read one property of an event, or a payment's amount. The 90th percentile is the value nine in ten are under, useful for load times and order sizes.
- **Times per person**: how many times each person did it in the period, as the average, the median or the most. It shows how often a typical person uses a feature.

Totals are exact. A total of people counts each person once, even when they show up on several days or in several groups.

## Options

- **Dates** and **By**: a moving range such as the last 30 days, by day, week or month.
- **Show as**: lines, stacked areas, bars, stacked bars, bars across (each total as a bar), a ring of shares, a world map (when you break down by country), a number (the totals, for a dashboard tile) or a table.
- **Break down by**: split every series by something, such as the campaign, the ad network or the country. Each group is its own line on the chart, six at a time: click a group under the chart to put it on or take it off. The 25 largest groups are listed, and the rest are "Everything else".
- **Then by**: split each group again by a second field, such as country and then device.
- **Formula**: a sum between the series by their letters, such as `A / B`. If A is ad spend and B is sign-ups, that is cost per sign-up. Use `+ - × ÷` and brackets.
- **Compare with the period before**: also run the same length of time before, shown dashed, with the change on each total.
- **Show a forecast**: on by default for lines and bars. See below.
- **Running total**: add each period to the ones before it.
- **Each group as a share of the whole**: with a breakdown, show percentages that add up to 100.
- **Numbers on the chart**: write the value on each point or bar.
- **Smooth over**: a moving average of 3, 7, 14 or 28 periods, to see through day-to-day noise.
- **A second axis on the right**: read one series against its own scale, for numbers of a different size such as spend beside sign-ups.

Hover the chart for a card with the exact numbers for that day, week or month, the period before and the change. Save a trend for everyone in the brand with a name; a saved trend keeps only its series and settings, so every view counts again and it is never out of date. Saved trends can go on a [dashboard](/docs/guides/dashboards/). The Trends page opens on the list of saved trends: click one to open it, or **New trend** to start one.

## The forecast

Line and bar charts continue each line past today as a lighter dashed line, inside a shaded band where the real number is about 80% likely to land. It follows the recent direction, levels off instead of shooting up, and for daily numbers over three weeks or more it keeps the weekly pattern. The day, week or month still running is drawn dashed and marked "So far", with its expected total in the hover card.

The forecast is worked out in your browser from the numbers already on the chart. It uses no AI and no outside service, so it needs no key. It shows for up to three series with at least six finished periods, and not on stacked charts. Untick **Show a forecast** to hide it.

## Notes on the chart

Under the chart, **Notes on these dates** lists what happened when: a launch, a campaign, an outage, a price change. **Add a note** marks a day; it shows as a marker on every chart of the brand and in the hover, so a jump or a dip has its reason beside it. Owners, admins and operators add and remove notes (`analytics.manage`); everyone sees them.

## Alert on a number

Under a saved trend, **Alert on this number** sets a line: when the number **goes above** or **below** a value, or **rises** or **falls by more than** a percentage against the period before. The number is the formula's total, else the first series', over the trend's own dates; it is checked every hour, and an alert is raised once when it crosses the line, and again only after it came back. Alerts reach the app, email, Slack and webhooks like every other [alert](/docs/guides/alerts/) (kind `insight.threshold`), to whoever set it up.

## Who can do what

Everyone in the workspace can run trends (`analytics.read`). Owners, admins and operators can save, change and delete them (`analytics.manage`).

## For agents and scripts

The REST API is `POST /v1/brands/{brand}/insights/trend` to run a trend and `/v1/brands/{brand}/insights` for saved funnels and trends. See the [API reference](/docs/api/). Alerts on a number are `/v1/brands/{brand}/insight-alerts`; notes are `/v1/brands/{brand}/annotations`. The MCP tools are `run_trend`, `list_insights`, `get_insight`, `save_insight`, `update_insight`, `delete_insight`, `create_insight_alert`, `list_insight_alerts`, `delete_insight_alert`, `list_annotations`, `create_annotation` and `delete_annotation`. Ask your agent something like *"Plot visits, sign-ups and ad spend by week for the last 90 days, and the cost per sign-up."*
