---
title: Metrics
description: Live totals for every company and person, such as spend in the last 30 days or usage this week, that rules, journeys, smart lists and Query read like any field.
sidebar:
  order: 9.54
---

<span class="pill shipped">Shipped</span> In the REST API, the MCP server and Query, and on each company and person in the web app.

A metric is a number Outflare keeps up to date for each company and person, such as their spend in the last 30 days or how often they used your product this week. [Rules](/docs/guides/rules/), [journeys](/docs/guides/journeys/), [smart lists](/docs/guides/smart-lists/) and Query read metrics like any field, so you can act on totals, not only on single events: "a company spent over $1,000 this month", or "usage this week fell below half of last week's".

Each metric is a running total over a rolling window of UTC days. When an event arrives it is added straight away, so a rule watching the metric can fire the moment it crosses a line. Each new day, the days that left the window drop out.

## The metrics each brand starts with

Turn metrics on with `PATCH /v1/brands/{brand}/metrics` and `{"enabled": true}` (MCP `update_metrics`, permission to manage the catalog). These are added, and you can change or archive them:

| Key | What it is | Kept on |
| --- | --- | --- |
| `spend_30d` | Payments in the last 30 days, in cents | Companies and people |
| `payments_90d` | How many payments in the last 90 days | Companies and people |
| `refunds_90d` | Refunds in the last 90 days, in cents | Companies and people |
| `usage_7d` | Events your product sent in the last 7 days | Companies and people |
| `usage_prev_7d` | The same, for the 7 days before that | Companies and people |
| `active_days_30d` | Days in the last 30 with any usage | People |
| `last_seen` | When your product last sent an event about them | Companies and people |

**Usage** is any event your product sends (`track`, `page` and `screen`). Billing syncs, Outflare's own events and website snippet events never count. A company counts its own events and its people's. Each metric is also kept per [product](/docs/guides/products-and-lifecycle/) unless you turn `per_product` off.

## Where the values are

Each record carries its metrics in its fields under `metrics`:

```json
{"metrics": {"spend_30d": 124000, "usage_7d": 18400, "last_seen": "2026-11-02T08:14:00Z",
  "by_product": {"residential": {"spend_30d": 94000, "usage_7d": 12000}}}}
```

So a change rule on `metrics.spend_30d` greater than `100000` fires when a company crosses $1,000. `GET /v1/brands/{brand}/records/{record}/metrics` (MCP `get_record_metrics`) lists a record's values, and Query has the `metrics` and `metric_values` tables.

## Filled from history, without setting anything off

When metrics are turned on, a metric is added, or what it counts changes, Outflare fills it from the events it already has, in the background, so the numbers are right straight away. A fill never sets anything off: no rule, journey, email or webhook reacts to it. A company already over $1,000 before the fill counts as having crossed already, so it doesn't get a "you reached $1,000" email on its next payment. `POST .../metrics/{metric}/backfill` refills one metric, also quietly.

## Making your own

`POST /v1/brands/{brand}/metrics` (MCP `create_metric`):

| Field | Meaning |
| --- | --- |
| `key` | Its name under `metrics`, such as `api_calls_30d`. It never changes. |
| `aggregate` | `count` events, `sum`, `min` or `max` of a number `property`, `days` with an event, or `last` (when the latest happened) |
| `events`, `usage` | The event names it counts, and whether usage counts too |
| `property` | For `sum`, `min` and `max`: the number property, such as `amount_minor` |
| `window_days`, `offset_days` | The last `window_days` days, today included, ending `offset_days` ago |
| `levels` | `company`, `person` or both |
| `per_product` | Also keep it per product (on by default) |

Changing what a metric counts refills it. `POST .../metrics/{metric}/archive` takes it off every record. To compare two periods, keep two metrics, such as `usage_7d` and `usage_prev_7d`, and compare them in a rule.
