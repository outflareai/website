---
title: Lifetime value
description: What a customer is worth from their first payment on, month by month, split by the product they bought first, the channel they came from or any customer field.
sidebar:
  order: 9.77
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

**Lifetime value** answers what a customer is worth. Take everyone whose first payment fell in the dates you pick. How much has each paid since, adding up month by month from that first payment? The answer tells you what you can afford to spend to win a customer, and which products and channels bring the customers who keep paying.

In the app, open **Analytics** in the sidebar, then **Lifetime value**. It runs inside Outflare and calls no third-party service. It works from your [payments](/docs/guides/transactions/): succeeded payments, less refunds and chargebacks, in the brand's currency at each day's rate.

## Ask it

- **Customers who first paid** in the last 12, 24 or 36 months.
- **Split by** the product, product category, channel, source or landing page of the first payment, or any field on the customer, such as country or plan. Up to 10 groups show, largest first.
- **Add up by** month or week.
- **+ Filter** counts only some first payments, such as one product or one first channel. Add up to five; all of them must hold.
- **Take off refunds**, on by default. Turn it off to see what was paid before refunds and chargebacks.

## Read it

- **Average value so far** is everything these customers have paid, divided by how many there are. **Median value so far** is the amount half of them paid less than. A few large customers pull the average far above the median, so read both.
- **Value after 12 months** is the average paid per customer by the end of their twelfth month.
- **Paid more than once** is the share who came back and paid again.
- The **chart** shows the average paid per customer by the end of each month after the first payment, one line per group and a dashed line for everyone.
- The **table** has each group's customers and their value after 1, 3, 6 and 12 months.
- **By month they first paid** has one row per month of new customers, adding up across. Darker is more.

A customer who first paid two months ago can't tell you about month six. So each month's step counts only the customers who have reached that month, and newer customers never drag the later months down. Faded numbers are months some customers are still inside: they can still grow.

**Click a number of customers** (the total, a group's or a month's) to see who they are: each customer with when they first paid, how many payments they made and what they have paid so far, biggest first, each linked to their record. This needs permission to read customers.

Payments with no customer on them are left out.

## Save it

Name the report and press **Save** to keep it for everyone in the brand. It keeps only the question, so every view adds up the payments again. A saved report goes on a [dashboard](/docs/guides/dashboards/) like a funnel or a trend. On a dashboard it keeps its own dates: the dashboard's date range and filters don't change it.

## For agents and the API

Agents run it with the MCP tool `run_lifetime_value`, and list its customers with `list_lifetime_value_customers`. Over the API:

```http
POST /v1/brands/{brand}/insights/lifetime-value
{
  "date_range": {"preset": "last_12_months"},
  "interval": "month",
  "periods": 12,
  "breakdown": "product"
}
```

The answer has the customers, total, average and median in minor units of the brand's currency, a `curve` with the value per customer at the end of each period, the same per group in `groups`, and per month of first payment in `cohorts`. A period marked `partial` can still grow. It needs the `analytics.read` scope.
