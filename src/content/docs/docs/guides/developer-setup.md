---
title: Developer setup
description: "A live checklist of what each brand's developer sends: sign-ups, orders, payments and refunds, and whether the website and server agree, with what to send to fix anything that's off."
sidebar:
  order: 9.53
---

<span class="pill shipped">Shipped</span> In the web app (**CRM → People → Developer setup**), the REST API and the MCP server.

Developer setup checks what one brand's developer sends, live. Each [brand](/docs/guides/brands/) has its own, because each brand's integration is separate. The page refreshes every 30 seconds while it's open, so a developer can watch a test sign-up or order arrive.

Each check says **OK**, **Check** (it works, but something should be fixed) or **Not yet** (nothing has arrived), what it found, and what to send to fix it, with an example to copy.

| Check | OK when |
| --- | --- |
| Sign-ups arrive from your server | A `Signed Up` event from your server in the last 7 days. |
| Orders arrive and count as payments | An `Order Completed` from your server in the last 7 days, and every recent one had a `userId` and revenue above zero, so each [counts as a payment](/docs/guides/transactions/#one-payment-counted-once). |
| Payments are counted once | A payment in the last 7 days, and every recent one has a person, so it counts toward revenue and ads. |
| Refunds find their payment | Every refund names a payment Outflare has. |
| Website and server copies agree | The website tag's sign-ups and orders match your server's copies by `messageId`, or for orders by `order_id`. A copy matched only by person and time is still counted once, but shows as **Check** so you add the id. |
| Refunds lower the conversions sent to ad networks | Shown once a refund has gone to an ad network: every one was accepted. |

## Refunds to match

A refund that names a payment Outflare doesn't have is kept, but doesn't count. Developer setup lists these, newest first. Type the payment's order id (or its order's `messageId`, or Outflare's transaction id) and press **Link**. The refund then counts, comes off that payment's revenue and lowers its conversion in your ad networks.

A refund that arrives before its payment needs nothing: it counts as soon as the payment comes.

## From the API and MCP

- `GET /v1/brands/{brand}/developer-setup` returns the checks and `unmatched_refunds`. MCP `get_developer_setup`.
- `POST /v1/brands/{brand}/transactions/{transaction}/refund-of` with `{"payment": "ch_1042"}` links a refund to its payment. MCP `link_refund`.
