---
title: Coupons
description: Keep every coupon code in one list per brand, made in Outflare or in your own product, and pay a partner when their code is used, even when nobody clicked their link.
sidebar:
  order: 9.65
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

A coupon is a code a customer types at checkout or sign-up, such as `MAYA`. Outflare keeps every code of a brand in one list: what it gives, who it belongs to and each time it was used. Give a code to a [partner](/docs/guides/partners/) and they earn commission when it is used, **even when the customer never clicked their link**. That is how a podcast host or a video creator gets paid for the people who heard the code and typed it in.

Open **Partnerships → Coupons** in a brand.

Outflare never changes a price and never grants credits. Your product applies the coupon. Outflare records the use and works out who earned.

## Set it up in three decisions

1. **Where do you make coupons?** In Outflare, in your own product, or both. Pick one under **Coupons → Connection**. You can change it later.
2. **Tell Outflare when a code is used.** Your developer adds one field to the payment your product already sends. This is the only step every brand needs.
3. **Give a coupon to a partner.** On **New coupon**, the first question is "Who is this coupon for?". Search the partner by name or email and pick them.

The **Connection** page shows a live picture of what is working, and ticks each step by itself the first time it sees it work.

## Make a coupon

**New coupon** asks four things:

1. **Who is this coupon for?** A partner, or nobody when it is a general offer.
2. **What is the code?** Outflare says straight away whether it is free to use.
3. **What does the customer get?** Percent off, money off, free credits of your product, or something else in words.
4. **When does it stop working?** Never, or on a date.

**More options** has the limits (how many uses, new customers only, a smallest order) and what the partner earns after the code ends.

## What a partner earns

- **A sale by code pays the same as a sale by link.** The partner's program sets the rate, the hold and how long later payments count. There is no separate rate for codes.
- **Credit with no link click** is on for every new coupon. Switch it off on a coupon and the code earns nothing by itself; a customer who came through the partner's link is still theirs.
- **When the code ends**, you choose per coupon:
  - **Keep paying for customers who used it in time** (the default). New uses stop on the end date. Customers who used the code before then go on earning the partner commission by the program's rules.
  - **Stop all commission on the end date.** Nothing is earned after it, even from customers who used the code earlier.

## Where a coupon is made, and where it is edited

Each coupon shows **Created in**: Outflare or your product. That is where its details are edited, so the two sides never overwrite each other. Who earns from it is always set in Outflare, wherever it was made.

| You make coupons | What happens |
| --- | --- |
| In Outflare | Your product is told about each new or changed coupon through a webhook. |
| In your own product | Your product sends each coupon to Outflare. It shows up on the list, ready to give to a partner. |
| Both | A coupon made in either place appears in the other. |

Two things can go wrong, and both have a safe default:

- **A customer uses a code Outflare has never seen.** The use is saved and the code shows in a banner on the Coupons page. Nobody is paid for it until you add it. You can have such codes added by themselves instead.
- **The same code was made in both places.** The older one stays, and the coupon's page shows both versions side by side for you to choose.

## For your developer

Every call uses your company's API token and the brand's id: `https://app.outflare.ai/v1/brands/{brand}/…`. In the app, **Coupons → Developer guide** shows the same calls with this brand's address already filled in, and a box that turns green when a call arrives.

### 1. Report a code being used (needed)

Add `coupon` to the payment you already send. Token permission: Customers: manage.

```sh
curl https://app.outflare.ai/v1/brands/{brand}/transactions \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "kind": "payment",
    "amount_minor": 4900,
    "currency": "USD",
    "source_id": "pay_1042",
    "user_id": "48213",
    "coupon": { "code": "MAYA", "credits": 1000 }
  }'
```

| Field | Needed? | What it means | Example |
| --- | --- | --- | --- |
| `coupon.code` | Yes | The code the customer typed. Capital and small letters both work. | `MAYA` |
| `coupon.discount_minor` | If money off | What the coupon took off this payment, in the smallest unit of the currency. | `500` is $5.00 |
| `coupon.credits` | If free credits | How many free credits the coupon gave. | `1000` |
| `coupon.perk` | If something else | A few words on what the customer got. | `Free onboarding call` |

You get the payment back with:

```json
"coupon": { "code": "MAYA", "known": true, "has_partner": true }
```

- `known: false` means the code is not on the brand's list. The payment and the use are still saved.
- Sending the same `source_id` twice counts once, so it is safe to retry.

A sign-up can carry the code too, which ties the customer to the partner from the day they sign up: send a `Signed Up` event with a `coupon` property ([product events](/docs/guides/customer-records/)).

### 2. Send the coupons your product makes

Only if you make coupons in your own product. Token permission: Partners: report conversions.

```sh
curl -X PUT https://app.outflare.ai/v1/brands/{brand}/coupons/WELCOME10 \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "gives": { "kind": "percent", "percent_bp": 1000 },
    "ends_at": "2027-01-31T00:00:00Z"
  }'
```

Send it when a coupon is made and again whenever it changes: the first call answers `201`, later ones `200`.

| `gives.kind` | Also send | Meaning |
| --- | --- | --- |
| `percent` | `percent_bp` | Percent off, in hundredths of a percent: `1000` is 10%. |
| `amount` | `amount_minor`, `currency` | Money off, in the smallest unit of the currency. |
| `credits` | `credits` | Free credits of your product. |
| `perk` | `perk` | Anything else, in words. |

Optional: `name`, `audience` (`everyone` or `new_customers`), `starts_at`, `ends_at`, `max_uses`, `max_uses_per_customer`, `min_amount_minor` and `enabled` (`false` switches it off).

### 3. Receive the coupons made in Outflare

Only if you make coupons in Outflare. Under **Settings → Webhooks**, add your address and tick `coupon.created`, `coupon.updated` and `coupon.deleted`. Each message carries the whole coupon. `coupon.used` is there too if you want every use.

To catch up after downtime, list what changed:

```sh
curl "https://app.outflare.ai/v1/brands/{brand}/coupons?home=outflare&updated_since=2026-11-20T00:00:00Z" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

### 4. Ask whether a code is still valid (optional)

Only if your checkout should refuse a code the moment it is switched off in Outflare. Token permission: Partners: report conversions.

```sh
curl https://app.outflare.ai/v1/brands/{brand}/coupons/MAYA/check \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "user_id": "48213", "amount_minor": 4900 }'
```

```json
{ "valid": true, "reason": "", "code": "MAYA", "gives": { "kind": "credits", "credits": 1000 } }
```

When `valid` is `false`, `reason` says why:

| `reason` | Meaning |
| --- | --- |
| `unknown` | The code is not on the list. |
| `off` | It is switched off. |
| `not_started` | Its start date is still ahead. |
| `ended` | Its end date has passed. |
| `limit_reached` | It has been used as many times as allowed. |
| `used_by_customer` | This customer has used it as often as allowed. |
| `not_a_new_customer` | It is for new customers, and this one has paid before. |
| `below_minimum` | The order is smaller than the coupon allows. |

A check is never counted as a use.

### If a call fails

| You get | Why | What to do |
| --- | --- | --- |
| `401 unauthorized` | The API token is missing or wrong. | Check the `Authorization` line. |
| `403 forbidden` | The token is not allowed to do this. | Make a token with the permission named in the step. |
| `400 invalid_request` | A field is missing or wrong. The message names it. | Fix that field and send again. |
| `409 conflict` | Step 2 only: the same code was already made in Outflare. | Nothing. The brand's team is asked which version to keep. |

## For agents

The MCP server has a tool for each call: `list_coupons`, `get_coupon`, `create_coupon`, `update_coupon`, `delete_coupon`, `bulk_edit_coupons`, `check_coupon`, `send_product_coupon`, `list_coupon_uses`, `list_unknown_coupon_codes`, `get_coupon_settings` and `update_coupon_settings`. Coupons and their uses are also in [SQL](/docs/guides/query-and-search/) as `coupons`, `coupon_uses` and `coupon_settings`.
