---
title: Cost and margin
description: Set what it costs you to deliver what you sell, once for the whole company or product by product, so reports can show profit and not only revenue.
sidebar:
  order: 1.6
---

<span class="pill shipped">Shipped</span> In the web app under Company, the REST API and the MCP server.

Revenue says what customers paid. Profit says what you kept. To show profit, Outflare needs one fact from you: out of every 100 you are paid, how much goes on delivering it. You set that once, under **Company → Cost and margin**, and every report that can show profit reads it from there.

## Set it

1. Open **Company → Cost and margin**.
2. Under **One number for everything**, type your cost of goods as a percent: servers, licences, payment fees, anything that grows with each sale. With 25, you keep 75 of every 100.
3. Press **Save**.

That is enough. The page shows **Your margin** on the last 90 days of sales.

## Give a product its own number

Some products cost more or less to deliver than the rest. Under **By product**, type a number next to the product. A product left empty uses the company's number; **Reset** puts it back.

The table shows each product's share of your sales, so you can see which numbers matter most. Your margin at the top is each product's share at its own cost, and everything else at the company's.

Owners and admins can change the numbers. Everyone else can read them.

## Where it is used

- [Paid ads payback](/docs/guides/ads-payback/) shows money back from ads as profit or as revenue.
- Other reports read the same numbers as they gain a profit view.

Until a cost is set, a report that needs one says so and links to this page. It never guesses a margin for you.

## For agents and the API

- `GET /v1/workspaces/{ws}/margin` (MCP: `get_margin`) returns the company's number, each product with its own number and share of sales, and the margin.
- `PATCH /v1/workspaces/{ws}/margin` (MCP: `update_margin`) sets or clears the company's number and any products'.
- In [Query](/docs/guides/query-and-search/), `products` has `cost_of_goods_percent` (the product's own) and `effective_cost_of_goods_percent` (its own, else the company's).
