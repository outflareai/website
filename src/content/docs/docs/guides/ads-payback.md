---
title: Paid ads payback
description: See whether the money you spend on ads is coming back fast enough to spend more, day by day and over the long run, as profit or revenue.
sidebar:
  order: 9.5
---

<span class="pill shipped">Shipped</span> In the web app under Paid ads, the REST API and the MCP server, on your own ad accounts.

A customer from an ad costs money today and pays it back over weeks or months. **Paid ads → Payback** answers the question that follows: is the spend coming back fast enough to spend more?

Money back is what the customers an ad brought have actually paid you, never the conversion value an ad network reports. Read it as **profit** (after your [cost of goods](/docs/guides/cost-and-margin/)) or as **revenue**, with the switch at the top.

It needs your own ad accounts connected ([Paid media](/docs/integrations/paid-media/)) and payments arriving in Outflare.

## The four views

### Day to day

You can't wait three months to learn that this week went wrong. This view judges each day on its own sign-ups.

- A grey bar is that day's ad spend.
- A line is what that day's sign-ups are worth after a number of days: 1, 2, 3, 7, 14, 30, 60, 90, 180 or 365. Click a number to show or hide its line; 90 days shows first.
- A dashed line is a projection, because those days haven't passed yet. It is what the sign-ups have paid so far, carried forward at the usual pace of your earlier sign-ups.
- A green dot means the day pays for itself by then. A red dot means it does not.

Above the chart, **Right now** says in one sentence whether spend is on pace against your payback target. Campaigns that are off course are listed first, each with **Pause** or **Lower budget**.

### Payback

The long run. What a customer from ads costs, how many days they take to pay that back, and one curve for each of the last six months of new customers. A line that reaches 100% has paid back what those customers cost. The verdict at the top says whether you have a green light to spend more.

### Cash in and out

What you spent on ads and what came back, added up over the days you picked. The gap between the lines is money still out.

### Where to spend more

Each campaign with what a customer costs there, how much of its spend has come back, when the rest is on pace to, and a verdict: room to grow, hold, cut back or too early. **Raise budget**, **Lower budget** and **Pause** sit on the row; each asks before it changes anything in your ad account.

Under the table, a slider estimates what spending more each day would do to the cost of a customer, from how your own weeks have gone. It is an estimate, and it gets weaker the further you go past what you have spent before.

## How it is counted

- **Your target** is the brand's payback period, twelve months unless you change it under Paid ads → Settings.
- **Your own name.** Campaigns on your brand's name are listed but left out of the totals and the verdict, because most of those people were looking for you already. Tick **Count your own name** to put them back.
- **Why the ad networks show more revenue.** A network counts every payment by anyone who clicked an ad. This page counts only customers the ads brought in. One bar shows the difference: first payments, later payments by those customers, and payments by people who were customers before the click.
- **Profit** needs a cost of goods. Without one the page says so and links to [Cost and margin](/docs/guides/cost-and-margin/).
- **Currencies.** Everything is in the brand's ads currency. Money in a currency with no exchange rate is left out and named under **How this is counted**.

## For agents and the API

`GET /v1/brands/{brand}/ads/payback` (MCP: `get_ads_payback`) returns everything the page shows. Query: `from` and `to` (the last 14 days when left out), `basis` (`profit` or `revenue`), `connector` for one network, `branded=true` to count your own name, and `timezone`.
