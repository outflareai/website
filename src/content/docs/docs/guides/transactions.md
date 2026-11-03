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

```sh
curl -X POST https://app.outflare.ai/v1/brands/$BRAND/transactions \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"kind": "payment", "amount_minor": 4900, "currency": "EUR",
       "source_id": "inv_1042", "record_id": "…", "product": "pro", "status": "succeeded"}'
```

- `kind` is `payment`, `refund`, `chargeback` or `credit`. `amount_minor` is in the currency's smallest unit (cents) and never negative: the kind says which way the money went. A refund or chargeback can name the payment it gives back with `refund_of` (that payment's `source_id`).
- `source_id` is your own id for it. Sending the same one again never adds it twice: the answer is the transaction already saved (200 instead of 201), with its `status` updated if it changed (`succeeded`, `pending`, `failed` or `reversed`).
- `record_id` is the person or company who paid, and `product` one of the brand's [products](/docs/guides/products-and-lifecycle/) by id or key. Both are optional.
- `occurred_at` is when it happened. It defaults to now.

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
