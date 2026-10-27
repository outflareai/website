---
title: Revenue from Stripe
description: Connect Stripe so every customer is a person in Outflare, with their payments on their timeline and their plan, monthly revenue and lifetime revenue on their record.
sidebar:
  order: 9.5
---

<span class="pill shipped">Shipped</span> Stripe, in the web app, the REST API and the MCP server. Sheepy (crypto payments) is next. Not yet tested against a live Stripe account.

Connect your Stripe account and Outflare knows who pays you, how much and for what. Each customer becomes a person in your [customer records](/docs/guides/customer-records/), so the CRM, lifecycle email, missions and partners all read the same revenue. Outflare only reads: it never charges, refunds or changes anything in Stripe, and never touches money.

1. [Connect](/docs/integrations/connectors/) Stripe on the Connectors page and choose **Sign in with Stripe**. Approve read-only access on Stripe's page. It runs on your own Stripe account.
2. Or use a key: in Stripe, open **Developers → API keys → Create restricted key**, give it **Read** access to Customers, Charges, Events, Products, Prices and Subscriptions, and nothing else, then paste it. A test-mode key reads your test data, which is a good way to try it first.

The first sync reads everything you have in Stripe. After that, Outflare reads what changed every five minutes.

## What you get

- **Every customer is a person.** If your product stores its own user id on the Stripe customer (`metadata.user_id`), the customer joins the person who already has that id. Otherwise Outflare adds a person for them.
- **Payments on the timeline.** Each payment, refund, new subscription, plan change and cancellation is an event on the person's timeline, with the amount and currency.
- **Revenue on the record.** Each paying person gets five fields that Outflare keeps up to date:
  - **Plan**: the product of their largest subscription.
  - **Monthly revenue**: what their active subscriptions bring in each month, before discounts and tax.
  - **Lifetime revenue**: everything they have paid, less refunds.
  - **Customer since**: the date of their first payment.
  - **Billing status**: trialing, active, past due or canceled.

  You can filter and sort people by these fields, but you can't edit them, because they always come from Stripe.

## Nothing claimed by mistake

A billing email address comes in unverified. Billing contacts are often someone else, such as a finance team, so a Stripe email never takes over a person who proved that address is theirs and never merges two people. Give your Stripe customers your product's user id to join them to the right person.

## Check on it

The Stripe connection shows when it last synced and any error. If Stripe refuses the key, for example because it was deleted, the connection asks you to connect again.

From the API, `GET /v1/workspaces/{ws}/integrations/{id}/payment-sync` shows how the sync is going, and `POST` on the same path syncs now. Your agent can do the same with the `get_payment_sync` and `run_payment_sync` tools.
