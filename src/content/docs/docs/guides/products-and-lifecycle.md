---
title: Products and lifecycle stages
description: Keep where each company and person stands with each product a brand sells, from trial to active to churned, and emit an event on every move for rules, journeys and webhooks.
sidebar:
  order: 9.53
---

<span class="pill shipped">Shipped</span> In the web app (**CRM → People → Products**, and a Products card on each person and company), the REST API and the MCP server.

A brand often sells more than one product, and a customer can be in a different place with each: still paying for one, cancelled on another, trying a third. Outflare keeps a **stage per product** for every company and person, so a [rule](/docs/guides/rules/) or [journey](/docs/guides/journeys/) reacts to the right product. A company that cancels one product while it keeps paying for another isn't "churned", and doesn't get a "welcome back" email for the product it never left.

Everything here belongs to one brand, under `/v1/brands/{brand}/`.

## Products

A product is something the brand sells, such as "Residential proxies". Each has:

- **An id and a key.** The key is made from the name (`residential-proxies`) unless you choose one. Neither ever changes, so renaming a product never breaks a rule or an event.
- **Aliases**: the names your own systems use for it. `event:resi` is a name your product sends in its events, and `billing:prod_123` is its id in your billing tool. A bare name is an event name.
- **A churn mode.** `cancellation` (the default): a customer churns when they cancel. `inactivity`: a customer churns after no usage for `churn_days` (30 by default), which suits pay-as-you-go products nobody ever cancels.
- **`at_risk_days`** (14 by default): no usage for this long moves an active customer to *at risk*.

`POST /v1/brands/{brand}/products` adds one (MCP `create_product`), `PATCH .../products/{product}` changes it, and `POST .../archive` and `.../restore` archive and bring it back. An archived product keeps its history, but its events no longer move anyone. Changing products needs permission to manage the catalog.

### Which product an event is about

An event names its product in its properties, as `product_id` (the product's id or key) or `product` (an alias):

```json
{"type": "track", "userId": "u_42", "event": "Proxy Request", "properties": {"product": "resi"}}
```

Billing connections name the product on subscription events by its billing id, which matches a `billing:` alias. You don't need Stripe: products can come from a billing connection, the API, the names in your events, or be added by hand.

A name no product has yet is **held** for review, with how often and when it was seen, and drives nothing until someone maps it. `GET /v1/brands/{brand}/product-names?status=held` (MCP `list_product_names`) lists them, and `PATCH .../product-names/{name}` maps one to a product or ignores it.

## Stages

Stages are kept on two levels:

| Level | Kept on | Default stages | For |
| --- | --- | --- | --- |
| Company | The company (a person with no company carries them on their own record) | lead → trial → active → at risk → churned | Billing: sales, win-back, alerts to the account owner |
| Person | Each person | invited → activated → at risk → inactive | Usage: onboarding and nudges to that person only |

A brand can rename, add and remove stages under **Products → Lifecycle stages → Edit stages**, with `PUT /v1/brands/{brand}/lifecycle/stages` or MCP `set_lifecycle_stages`. A stage's key never changes once saved, and a stage someone is in can't be removed.

### Moves

A move takes someone from some stages to another and **emits an event** on their timeline, which rules, journeys and webhooks can act on. A move is set off by one of three things:

- **An event** for the product, such as `subscription.canceled`, optionally with tests on its properties.
- **Usage**: any event your product sends about itself. Billing syncs and Outflare's own events never count as usage.
- **Inactivity**: no usage for the product's `at_risk_days` or `churn_days`.

The defaults:

| Level | Set off by | From | To | Emits |
| --- | --- | --- | --- | --- |
| Company | A trial starts | none, lead | trial | `product.trial_started` |
| Company | A payment or an active subscription | none, lead, trial | active | `product.activated` |
| Company | A payment or an active subscription | churned | active | `product.reactivated` |
| Company | The trial ends | trial | churned | `product.trial_expired` |
| Company | The subscription is cancelled (cancellation products) | trial, active, at risk | churned | `product.churned` |
| Company | Usage | at risk | active | `product.recovered` |
| Company | Usage (inactivity products) | churned | active | `product.reactivated` |
| Company | No usage for `at_risk_days` | active | at risk | `product.at_risk` |
| Company | No usage for `churn_days` (inactivity products) | active, at risk | churned | `product.churned` |
| Person | `user.invited` | none | invited | `product.user_invited` |
| Person | Usage | none, invited | activated | `product.user_activated` |
| Person | Usage | at risk, inactive | activated | `product.user_recovered` |
| Person | No usage for `at_risk_days` | activated | at risk | `product.user_at_risk` |
| Person | No usage for `churn_days` | activated, at risk | inactive | `product.user_inactive` |

Each emitted event carries `product_id`, `product_key`, `level`, `move`, `from_stage` and `to_stage`, so a journey can check which product it was. Each move is also the `lifecycle.moved` webhook event. Change the moves under **Edit moves**, with `PUT /v1/brands/{brand}/lifecycle/moves` or MCP `set_lifecycle_moves`.

Moves are safe to rely on:

- **Once per cause.** The same event, retried or replayed, never moves anyone twice.
- **Late news only counts as usage.** An event that arrives over a day late, or happened before the current stage began, moves nobody.
- **A late check goes straight to the right stage.** A product unused past both waits moves to churned, not through at risk first.

## A company's overall status

Each company also has an **overall status** across its products: its best billing stage, plus flags. `partly_churned` means one product churned while another is still live; `trialling_another` means it pays for one product while trying another. Changes to it are events on the company too: `customer.became_customer`, `customer.expanded`, `customer.partly_churned` and `customer.fully_churned`.

`GET /v1/brands/{brand}/records/{record}/lifecycle` (MCP `get_record_lifecycle`) shows a record's stage per product, its overall status and its latest moves. In [Query](/docs/guides/query-and-search/#query) they are the `products`, `lifecycle_states`, `lifecycle_moves` and `lifecycle_overall` tables.

## Turning it on

`PATCH /v1/brands/{brand}/lifecycle` with `{"enabled": true}` (MCP `update_lifecycle`). A brand with no stages yet gets the defaults above.

Turning it on **starts from nothing**: stages fill only from events after that moment, and nothing from before ever moves anyone or sends anything. Turning it off stops all moves and keeps the stages as they are.
