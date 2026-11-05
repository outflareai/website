---
title: Transactions
description: Every payment, refund, chargeback and credit a brand takes, from your billing connection or your own API calls, converted to the brand's currency and restorable for 7 days if deleted by mistake.
sidebar:
  order: 9.52
---

<span class="pill shipped">Shipped</span> In the web app (**CRM → People → Transactions**), the REST API and the MCP server.

A brand's transactions are the money it takes and gives back: payments, refunds, chargebacks and credits, one row each. They are the record of revenue that [metrics](/docs/guides/metrics/), [product lifecycle stages](/docs/guides/products-and-lifecycle/), reports and Query read.

## Where they come from

- **A billing connection.** Connect [Stripe](/docs/guides/revenue-from-stripe/) or another billing tool on your own account, and each charge and refund it reads after its first full read becomes a transaction of the brand. Transactions start when the connection does: nothing from before is rebuilt.
- **Your own billing**, from the API: `POST /v1/brands/{brand}/transactions`, or MCP `record_transaction`.
- **Order Completed events** with revenue, sent from your servers ([product events](/docs/guides/customer-records/)).

However a payment arrives, it is kept once and counted once: see [One payment, counted once](#one-payment-counted-once).

```sh
curl -X POST https://app.outflare.ai/v1/brands/$BRAND/transactions \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"kind": "payment", "amount_minor": 4900, "currency": "EUR",
       "source_id": "inv_1042", "record_id": "…", "product": "pro", "status": "succeeded"}'
```

- `kind` is `payment`, `refund`, `chargeback` or `credit`. `amount_minor` is in the currency's smallest unit (cents) and never negative: the kind says which way the money went. A refund or chargeback names the payment it gives back with `refund_of`: see [Refunds, counted once](#refunds-counted-once).
- `source_id` is your own id for it. Sending the same one again never adds it twice: the answer is the transaction already saved (200 instead of 201), with its `status` updated if it changed (`succeeded`, `pending`, `failed` or `reversed`).
- `record_id` is the person or company who paid. If you don't have it, send `user_id` instead: your own id for them, the `userId` your events send, and Outflare finds the person. `product` is one of the brand's [products](/docs/guides/products-and-lifecycle/) by id or key. All three are optional, but send `record_id` or `user_id` with every payment: without a person, a payment can't count toward revenue by channel or your ad networks.
- `occurred_at` is when it happened. It defaults to now.

## One payment, counted once

Revenue, attribution and the [conversions sent back to your ad networks](/docs/integrations/paid-media/#sending-conversions-back) count each payment as a `payment.succeeded` event, and each refund as `payment.refunded`. Every payment becomes exactly one, whichever way it arrives:

- **A transaction from the API.** A `succeeded` payment with a person counts. A `pending` one counts when you send it again as `succeeded`. A refund or chargeback comes off the payment it names in `refund_of`. Credits never count.
- **An Order Completed event**, sent from your server for a known person, with `revenue` (or `total`, or `value`) above zero in dollars, not cents (`49.00`), and a `currency` (the brand's if left out). It is saved as a transaction and counted as a payment. Events from the website snippet never count as money, because anyone can send them.
- **A billing connection**, such as Stripe.

**If the same payment arrives twice**, from two of these, Outflare keeps it once. It takes them as one payment when:

1. **They share an id.** The event's `order_id` is the transaction's `source_id` (or the billing tool's charge id). This is the reliable way, so **put the same id in both**.
2. **Or, with no shared id,** the same person paid the same amount in the same currency within 15 minutes.

Whichever arrives second is answered as the first. The API returns the transaction already saved (200), a billing sync skips the charge, and the order event gets an `outflare_payment` property naming the payment it counts as. A transaction sent without a person picks them up from its order event.

To count each payment once in reports and ad networks, use **`payment.succeeded`**, valued at `amount_minor`, in conversion definitions and in **Send conversions back** rules on the Paid ads page, not `order_completed`.

An Order Completed event, from your server to `POST /v1/brands/{brand}/events`:

```json
{"type": "track", "userId": "u_123", "event": "Order Completed", "messageId": "order-ch_1042",
 "properties": {"order_id": "ch_1042", "revenue": 49.00, "currency": "USD"}}
```

The same payment as a transaction, counted once with the event above:

```json
{"kind": "payment", "amount_minor": 4900, "currency": "USD", "source_id": "ch_1042", "user_id": "u_123"}
```

Send every payment that brings money in. Topping up a prepaid balance is a payment; spending that balance on a plan is not, or the same money would count twice.

## Refunds, counted once

Refunds follow the same rule as payments. Send them as a transaction, as an event, or both, and each one counts once. The transactions API is the simplest single path for money: payments and refunds there, and events for what people do.

- **A refund transaction** has `kind` `refund` (or `chargeback`) and names its payment in `refund_of`. Any id the payment has works: its `source_id` (the order's `order_id`), its Order Completed `messageId` (`order-ch_1042`), or Outflare's transaction id.
- **An Order Refunded event**, from your server for a known person, refunds the payment its `order_id` names, the same forgiving way. Its amount is `amount` (or `revenue`, `total`, `value`) in dollars, and the whole payment when you leave it out. Its own id is `refund_id`, else its `messageId`.
- **If the same refund arrives both ways**, it is kept once: the same refund id (the transaction's `source_id` is the event's `refund_id`), or else a refund of the same payment of the same amount within 15 minutes.

A refund counts once Outflare has its payment. One that arrives first waits, and counts when the payment comes. One that names an id no payment has is listed on [Developer setup](/docs/guides/developer-setup/) under **Refunds to match**, to link by hand. A counted refund comes off its payment's revenue and [lowers its conversion in your ad networks](/docs/integrations/paid-media/#refunds).

```json
{"kind": "refund", "amount_minor": 4900, "currency": "USD", "source_id": "re_2001", "refund_of": "ch_1042", "user_id": "u_123"}
```

The same refund as an event, counted once with the transaction above:

```json
{"type": "track", "userId": "u_123", "event": "Order Refunded", "messageId": "refund-re_2001",
 "properties": {"order_id": "ch_1042", "refund_id": "re_2001", "amount": 49.00, "currency": "USD"}}
```

## Currencies

Each amount is kept in its own currency and also converted to the brand's currency (USD unless you change it on the brand) at that day's European Central Bank rate, as `brand_amount_minor`. If the day's rate isn't published yet, it is empty and filled in within the hour.

## Reading them

- `GET /v1/brands/{brand}/transactions` lists them newest first. Add `?record=` for one person or company, or `?kind=refund,chargeback` for some kinds (MCP `list_transactions`). `GET .../transactions/{transaction}` reads one.
- In [Query](/docs/guides/query-and-search/#query) they are the `transactions` table. For example, revenue by month: `SELECT date_trunc('month', occurred_at), sum(brand_amount_minor) FILTER (WHERE kind = 'payment') FROM transactions GROUP BY 1`.
- [Webhooks](/docs/api/webhooks/): `transaction.created` once per transaction, and `transaction.updated` when its status changes.

## Deleting and restoring

A wrong or test transaction can be deleted with **Delete** on the Transactions tab, `POST /v1/brands/{brand}/transactions/{transaction}/delete` or MCP `delete_transaction`. It needs permission to manage customers. The transaction goes to **Recently deleted**, like everything in the [7-day recovery window](/docs/guides/customer-records/#deleting-and-restoring):

- While it is there, the list, Query and the person's record leave it out.
- Sending the same `source_id` again doesn't bring it back: a billing sync skips it, and the API answers `409 transaction_deleted`. Restore it instead.
- Restoring it within 7 days puts it back as it was. `transaction.created` isn't sent again; `deletion.restored` is. If its person or company was merged since, it comes back on the record that was kept.
- After 7 days it is gone for good, and the same `source_id` can be sent again.
- The webhook event is `transaction.deleted`.

A transaction is your business's record of money. Merging two records moves their transactions to the one kept, and erasing a person keeps their transactions without their name, including any waiting in Recently deleted.
