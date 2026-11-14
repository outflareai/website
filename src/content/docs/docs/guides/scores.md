---
title: Scores
description: A health score, a lead score, or any score of your own from 0 to 100 on every company or person, built from factors you choose, kept up to date, and able to say why.
sidebar:
  order: 1.62
---

<span class="pill shipped">Shipped</span> In the web app (**People → Scores**), the REST API and the MCP server.

A score is one number from 0 to 100 that Outflare keeps on every company or person and keeps up to date, such as a health score for customers or a lead score for people who signed up. You decide what goes into it, so it means what your business needs it to mean, and every record can say why it scores what it does.

Scores are part of the [customer data platform](/docs/guides/customer-records/) and belong to one brand. Everything here works the same from the REST API (`/v1/brands/{brand}/scores`), the MCP server and Query. In the app, People → Scores adds, changes and archives scores (people with `catalog.manage`; everyone else can read them), and a company's or person's page shows their scores with a "Why?" that lists the factors.

## How a score is worked out

Everyone starts at the same number, the **base**. Each **factor** adds points, or takes them, when it is true for the record. The result is kept between 0 and 100.

A factor has:

- a **label** in plain words, shown on the record: "Usage fell by a third";
- one to five **conditions** on the record's fields, the same tests [rules](/docs/guides/rules/) use: `metrics.usage_7d_change` `lt` `-29`, `renews_on` `lt` `+60d`, `plan` `eq` `enterprise`. With several, `match` says whether `all` must hold or `any`;
- **points** from -100 to 100.

A score has up to 30 factors, and a brand keeps up to 10 scores.

```json
{"key": "health", "label": "Health score", "record_type": "account", "base": 60,
 "high_from": 70, "low_below": 40,
 "factors": [
   {"label": "Used the product in the last 7 days", "points": 20,
    "conditions": [{"attribute": "metrics.usage_7d", "op": "gt", "value": 0}]},
   {"label": "Usage fell by a third or more on the week before", "points": -20,
    "conditions": [{"attribute": "metrics.usage_7d_change", "op": "lt", "value": -29}]}
 ]}
```

Factors read any field on the record, including [metrics](/docs/guides/metrics/) and their trends, dates compared with today (`today`, `+60d`, `-14d`), and fields your own systems send. A score can't read another score.

## Bands

Each score also has a band: **high** from `high_from` up (70 unless you change it), **low** under `low_below` (40), and **medium** between. Bands are what most rules and lists want: "health is low" reads better than a number, and stays right when you tune the points.

## Starters

`GET /v1/brands/{brand}/scores` returns `starters`: a health score for companies and a lead score for people, built on the standard metrics. They are drafts. Add one as it is with `POST /v1/brands/{brand}/scores`, or change its factors first. In the app they are the cards under "Start with".

## Where the values are

Each record carries its scores in its attributes under `scores`:

```json
{"scores": {"health": 80, "health_band": "high"}}
```

So anything that reads a field reads a score:

- a [rule](/docs/guides/rules/): when `scores.health_band` comes to be `low`, emit `account.health_low`, which can raise a [signal](/docs/guides/signals/) or start a journey;
- a [smart list](/docs/guides/smart-lists/): companies where `scores.health` is less than 40;
- [Query](/docs/guides/query-and-search/): `attributes->'scores'->>'health'`.

`GET /v1/brands/{brand}/records/{record}/scores` (MCP `get_record_scores`) gives a record's scores with every factor, its points and whether it holds now.

## When a record is scored

- **When a field a factor reads changes**, including a metric moving, the record is scored again within moments. Rules and waiting journeys hear of the change.
- **Once a day** (UTC) every record is scored again, because a factor can compare a date with today and new records need a first score.
- **When you add or change a score**, every record of its type is scored straight away, in the background. This pass is quiet: no rule, journey, email or webhook fires for where records already stand, the same as when metrics are filled from stored events. From then on a rule fires when a record comes to match.

A move from one band to another is written to the record's history (`scores.<key>_band`, source `score`), so you can see when an account went from high to low. The number itself changes too often to keep every step.

Archiving a score takes it off every record, quietly, and frees its key.

## API

| | |
| --- | --- |
| `GET /v1/brands/{brand}/scores` | The scores, with how many records are in each band, and the starters. `customers.read` |
| `POST /v1/brands/{brand}/scores` | Add a score. `key` and `record_type` (`account` or `person`) never change. `catalog.manage` |
| `PATCH /v1/brands/{brand}/scores/{score}` | Change it. A change to the base, factors or bands makes a new version and scores every record again. `catalog.manage` |
| `POST /v1/brands/{brand}/scores/{score}/archive` | Archive it. `catalog.manage` |
| `GET /v1/brands/{brand}/records/{record}/scores` | A record's scores, and why. `customers.read` |

MCP: `list_scores`, `create_score`, `update_score`, `get_record_scores`.

The [Revenue](/docs/guides/revenue/) page uses the score with the key `health`: it adds up the recurring revenue of paying customers in its low band as revenue at risk.

## From a playbook

The playbook **Score account health and catch usage drops** sets a health score up for you: name the event that shows someone is using the product and it adds the score, the metrics it reads, and a rule and journey that flag a company whose usage falls. See [Playbooks](/docs/agents/playbooks/).
