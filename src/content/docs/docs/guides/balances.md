---
title: Balances
description: What customers have paid for and not used yet, such as wallet money, credits or prepaid usage. See what is held now, how much sits untouched and who holds the most.
sidebar:
  order: 9.79
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

When customers pay ahead (a wallet they top up, a pack of credits, prepaid usage), revenue and use are two different numbers. A **balance** is the gap between them: a running total for each customer of what went in, less what came out. It tells you how much you still owe in service, how much of it nobody is touching, and whether customers use what they buy.

In the app, open **Analytics** in the sidebar, then **Balances**. It runs inside Outflare and calls no third-party service. It works from your [payments](/docs/guides/transactions/) and the events your product sends ([website tracking](/docs/guides/website-tracking/) or the API), for payments and events that name a customer.

## Set one up

Each brand says what its balance is made of, and can have as many as it needs.

- **Goes in**: every payment, only the payments for one product (such as a top-up), or **a number on an event**, such as the `amount` on a `credit_granted` event.
- **Comes out**: a number on an event, such as the `cost` on a usage event, and refunds and chargebacks.
- **Runs out**: never, or a number of days after the customer last topped up. After that their balance counts as nothing.
- **Counted in** money, or another unit you name, such as credits or GB. A balance in another unit is made of events only.
- **Untouched after**: how many days with nothing going in or coming out before a balance counts as untouched. The default is 90.

A customer never holds less than nothing: using more than they added leaves them at zero.

## Read it

- **Held now** is what customers have paid for and not used, with how many customers hold some and the median balance.
- **Untouched** is the part held by customers whose balance has not moved for the days you set. It is money for service that may never be asked for, and a list of people worth a message.
- **Used in the last 30 days** sits beside what came in over the same days. Use running ahead of top-ups means balances are draining.
- **Days between top-ups** is the median time from one top-up to the same customer's next.
- The **chart** shows, month by month, what came in, what was used and what was held at the end of the month.
- **Biggest balances** lists who holds the most, with when each last topped up and last used, linked to their record. Tick the box to see only the untouched ones. This needs permission to read customers.

## Save it and put it on a dashboard

Name it and press **Save** to open it again from the page or from All reports. On a [dashboard](/docs/guides/dashboards/), **Add tile** has **Balance**: the tile shows what is held now and the movement by month, whatever dates the dashboard is on.

## Agents and the API

Agents run it with `run_balance` and list who holds the most with `list_balance_customers`. Through the API it is `POST /v1/brands/{brand}/insights/balance` with `in` and `out` (parts of kind `payment`, `event` or `refund`), and optionally `unit`, `expires_days`, `idle_days` and a `date_range`. A money balance is in the currency's minor unit (cents); a number on an event counts as whole units of the currency.
