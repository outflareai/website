---
title: Distribution
description: How your customers are spread by what they paid, how often they pay and how long they go between purchases, with the median beside the average.
sidebar:
  order: 9.78
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

An average hides most of what matters. If a few customers pay a great deal and most pay a little, the average describes nobody. **Distribution** shows the spread: one number for each customer, counted into ranges, so you can see where the typical customer sits and how much the biggest ones carry.

In the app, open **Analytics** in the sidebar, then **Distribution**. It runs inside Outflare and calls no third-party service. It works from your [payments](/docs/guides/transactions/): succeeded payments that name a customer, in the brand's currency at each day's rate.

## Ask it

- **Spread of** one number per customer:
  - **Total paid** in the dates, less refunds and chargebacks. Untick **Take off refunds** to count payments only.
  - **Average payment**.
  - **Number of payments**.
  - **Days between payments**, for customers who paid more than once: how long they go before buying again.
  - **Days since last payment**: who has gone quiet.
- **In** the last 12, 24 or 36 months, this year, the last 30 or 90 days, or between two dates.
- **Split by** the product, product category, channel or source of the customer's first payment in the dates, or any field on the customer.
- **Ranges** are chosen for you as round numbers that fit your data. To set your own, type where each range ends, such as `25, 50, 100, 250`.

## Read it

- **Average** and **Median**. The median is the middle customer: half are under it. When the average is far above the median, a few large customers are pulling it up, and the median is the better picture of a typical one.
- **90% paid under** is the number nine customers in ten are at or under.
- **Top 10% of customers** is how much of all the money (or all the payments) comes from the tenth of customers who paid most. A high share means the business leans on a few accounts.
- The **bars** show how many customers fall in each range, with dashed lines at the median and the average.
- **By range** lists each range with its customers, their share of all customers and their share of the money. **Click a range** to see who is in it, largest first, each linked to their record. This needs permission to read customers.
- With a split, a table shows each group's customers, average, median, the number nine in ten are under, and a small picture of its spread.

## Save it and put it on a dashboard

Name it and press **Save** to open it again from the page or from All reports. On a [dashboard](/docs/guides/dashboards/), **Add tile** has **Distribution**: the tile shows the average, the median and the bars. It keeps its own dates, because they decide which payments each customer's number is made of.

## Agents and the API

Agents run it with `run_distribution` and list the customers in a range with `list_distribution_customers`. Through the API it is `POST /v1/brands/{brand}/insights/distribution` with a `measure` (`total_paid`, `average_payment`, `payments`, `days_between` or `days_since_last`), a `date_range`, and optionally a `breakdown`, `filters` and your own `buckets`. Money is in the currency's minor unit (cents).
