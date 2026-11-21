---
title: Query and search
description: Find any person, company or conversation by its words or by what it means, and answer any question about your data with read-only SQL, for you and your agents.
sidebar:
  order: 1.6
---

<span class="pill shipped">Shipped</span> Query in the web app (**Data → Queries**, with plain-English questions and a builder that needs no SQL), the REST API and the MCP server. Search in the REST API and the MCP server, with the meaning-based search switch under Settings.

Search and Query read the same data you see everywhere else in Outflare: [customer records](/docs/guides/customer-records/), outreach, replies, meetings, deals, lifecycle email and website visits. Search finds things by their words, or by what they mean. Query answers questions with SQL, such as "win rate by source this quarter", in one exact answer instead of many pages of lists. Both run inside your Outflare database, so there is no other service and nothing to sync.

## Search

`GET /v1/workspaces/{ws}/search?q=pricing team`, or ask your agent (MCP `search_workspace`).

- It finds people and companies by name, the text in their fields, and their emails, phones and ids. It also finds the emails you sent and received, meetings, deals and lifecycle email by their words.
- Every word must match, each as the start of a word, so "pric" finds "pricing". Names, email addresses and words in any language match as written.
- Results come best first, records ahead of the rest. Each one says whose it is, and a reply or meeting shows the words around the match.

## Meaning-based search

Add `mode=meaning` (MCP: `mode: "meaning"`) and search finds what means the same in other words. "Unhappy with price" finds a reply saying "too expensive for us", and "asking about an API" finds "can we connect it to our stack?". It covers people and companies, replies, meetings and deals. Use it to find objections, buying signals and themes across your inbox, or let your agent find the past conversations most like the one it is writing.

### How it works

Outflare turns each record, reply, meeting and deal into a vector: a list of numbers that captures what the text means, so texts that mean similar things get similar numbers. Your search is turned into a vector the same way, and the nearest ones come back first. The vectors are stored in your Outflare database next to your data, and hold no text.

### What it costs, and why it shows in AI usage

Making a vector is a small AI call, called an embedding, made with **your own AI key** and billed by your provider to your account, like every AI call in Outflare. Outflare never supplies a key. It works with an OpenAI, Gemini, Mistral or OpenRouter [AI model connection](/docs/agents/ai-models/). Claude doesn't offer embeddings, so if Claude is your only AI model, connect one of these too.

- **Each item is sent once**, and again only when it changes. Each search sends only what you typed, and asking the same thing again within 10 minutes is free.
- **It is cheap.** OpenAI's embedding model costs US$0.02 per million tokens, so a workspace with tens of thousands of emails usually spends cents to embed them all, and less than that each month after.
- **You can see and cap it.** It is its own line, **Meaning-based search**, in [AI usage](/docs/guides/ai-usage/), where you can give it a monthly limit. Your workspace's AI limit applies too.

### On by default, and how to turn it off

It switches on by itself once your workspace has an AI connection that makes embeddings, and is ready within minutes. To turn it off, an owner or admin opens **Settings → Meaning-based search** and chooses **Turn off** (API: `PUT /v1/workspaces/{ws}/semantic-search` with `{"enabled": false}`). That stops its AI calls and deletes the vectors. Search by words keeps working. The same card shows how many items are ready and which model makes them.

When a person or company is deleted, merged or archived, or a reply, meeting or deal is deleted, its vector is deleted within minutes.

## Query

A query belongs to one brand. Open **Data → Queries**, send `POST /v1/brands/{brand}/query` with `{"sql": "select stage, count(*) from deals group by stage"}`, or ask your agent (MCP `run_query`). `GET .../query/tables` (MCP `list_query_tables`) lists the tables and their columns. The older `/v1/brands/{brand}/query` still works for now.

| Tables | What they hold |
| --- | --- |
| `people`, `companies`, `records` | Customer records, with their fields in `attributes` (read one with `attributes->>'plan'`) |
| `record_identities`, `record_relationships` | Emails, phones and ids, and links between records |
| `customer_events`, `consents`, `subscriptions` | Product events, consent, and payment subscriptions from Stripe |
| `leads`, `sequences`, `enrollments`, `messages`, `replies` | Outreach and the mail it got back, without email bodies |
| `deals`, `meetings`, `spend` | Outcomes, and what you spent |
| `emails`, `email_events`, `broadcasts` | Lifecycle email and what happened to it |
| `visits`, `social_posts`, `brands` | Website visits, your social posts and brands |
| `transactions` | Payments, refunds, chargebacks and credits ([Transactions](/docs/guides/transactions/)) |
| `products`, `lifecycle_states`, `lifecycle_moves`, `lifecycle_overall` | Products and where each company and person stands with each ([Products and lifecycle stages](/docs/guides/products-and-lifecycle/)) |
| `metrics`, `metric_values` | Live totals per company and person ([Metrics](/docs/guides/metrics/)) |
| `bulk_edits` | [Bulk edits](/docs/guides/bulk-edits/) and what they changed |
| `attribute_changes`, `record_merges`, `field_definitions`, `option_sets`, `record_types` | Every record's full field history (old and new value, who and when), merges, and your fields and record types |
| `smart_lists`, `smart_list_members`, `static_list_members`, `score_definitions`, `score_history`, `signals` | Lists and who is in them, scores per day, and signals such as buying intent or churn risk |
| `sales_leads`, `sales_events`, `crm_activities`, `crm_calendar_events`, `crm_mail_messages` | Sales leads and what happened on them, tasks, and meetings and emails with customers, without their content |
| `revenue_days`, `revenue_customers`, `revenue_forecast_history` | MRR per day with new, expansion and churned MRR, and the quarterly forecast week by week |
| `support_conversations`, `support_messages`, `support_assistant_runs` | Support conversations with response times, SLA breaches and ratings, and what the AI agent did, without message bodies |
| `partner_programs`, `partner_referrals`, `partner_conversions`, `partner_rewards`, `partner_payouts` | Partner and affiliate programs, referrals, credited sales, rewards and payouts |
| `ad_accounts`, `ad_entities`, `ad_metrics_daily`, `ad_keywords`, `ad_search_terms_daily`, `ad_clicks` | Your ad accounts, campaigns, ad groups and ads with their daily spend, clicks and conversions, keywords and search terms. Amounts are in micros: divide by 1,000,000 |
| `ad_acquisitions`, `ad_revenue`, `attribution_conversions`, `attribution_credits` | The ad click that brought each customer in, the revenue credited to it, and each conversion's credit per attribution model |
| `tracking_campaigns`, `tracking_link_clicks`, `tracker_offers`, `tracker_conversions`, `tracker_network_costs` | Tracking links and their clicks, and the click tracker's offers, conversions and network costs |
| `search_daily`, `url_inspections`, `crawl_pages`, `crawl_issues`, `tracked_keywords`, `rank_observations` | Search Console clicks by page and query, indexing, crawls, and rankings |
| `seo_competitors`, `competitor_pages`, `ai_prompts`, `ai_samples`, `ai_mentions`, `ai_citations` | Competitors and their new pages, and AI visibility: each AI answer, the brands it named and the pages it cited |
| `analytics_daily`, `page_vitals`, `heatmap_clicks`, `site_visitors`, `experiments`, `ab_tests` | Web analytics, page speed, heatmaps, site visitors, and experiments and A/B tests with their results |
| `agent_runs`, `missions`, `mission_updates`, `actions`, `brand_findings` | What agents did: runs and missions with their plans and reports, the action log, and what they learned |
| `social_accounts`, `social_publications`, `social_post_snapshots`, `content_items`, `journey_run_steps` | Social accounts and posts with their numbers over time, your content, and each step people took through journeys |

This is a selection. The data catalog lists every table.

### Data catalog

**Data → Catalog** lists every table you can query for the brand: what a row is, where the rows come from, how many there are and how recent they are. Open a table to see every column explained: what it means, its unit (such as minor units of a currency, or micros), what it joins to, whether it holds personal data, how often it is filled and its most common values, with example questions and their SQL. The numbers are read live from your data with your own permissions, so the catalog never shows more than a query could.

Agents read the same catalog with the MCP tool `describe_brand_data` (`GET /v1/brands/{brand}/data/catalog`, and `.../data/catalog/{table}` for one table), so they know what data exists before they write SQL. Agents get `run_query` and `describe_brand_data` by default. For a list longer than 1,000 rows, the MCP tool `export_query_csv` gives up to 10,000 rows as CSV.

Every kind of data Outflare stores, brings in from a connection or computes is added to Query and the catalog as it ships. Secrets, sign-in details, message bodies and similar content are never in Query.

- Projects were removed, so there is no `projects` view and no `project_id` column. A saved query that names either needs to drop it.
- A query is one `SELECT`. It never changes anything, so an agent kept to missions can run it without one.
- Up to 100 rows come back by default, and at most 1,000. A query running over 15 seconds is stopped, so count and group rather than list.

### Queries in the app

**Data → Queries** works on the brand picked in the sidebar. It lists your saved queries; each one opens on its own page, with Save and Cancel.

**Describe it in English.** Type what you want, such as "customers who spent over $500 in total: their email, user id, sign-up date and lifetime spend, biggest spenders first", and press **Build it**. Your workspace's own AI model (connect one under [AI models](/docs/agents/ai-models/); Outflare never supplies a key, and the box says what to connect when there is none) turns it into a builder, or into SQL when a builder can't say it, or tells you which data is missing. It sees your table and field names, never your customers' data, and Outflare runs every answer once, with your permissions, before you see it. On a query you already have, describe a change: "also show their country". The API is `POST /v1/brands/{brand}/query/ask`, then `GET .../query/ask/{question}` for the answer.

**The builder** makes a query without SQL: pick the table to start from, the columns (including totals from related tables, such as each person's total payments, shown as money), filters, the order and how many rows. Results update as you change it. The **SQL** tab shows the SQL it writes; editing it by hand turns the builder off for that query. `POST /v1/brands/{brand}/query/build` answers a builder's SQL.

**Make it a list.** A saved query that starts from people or companies links each row to the person or company, and **Make it a list** turns it into a dynamic list that stays up to date, ready for sequences, broadcasts and ad audiences.

**SQL** stays there for anyone who wants it: the editor completes table and column names, Cmd/Ctrl+Enter runs the query, and beside it are the tables with their columns and each record type's fields. Results come back as a table or as a bar, line or area chart, and anyone who can run queries can download them as CSV (up to 10,000 rows).

### Saved queries

Save a query to run it again. A saved query is private to you until you share it with the brand. Every change to its SQL, builder, description or chart is a new version, and every version is kept, so you can open, run or restore an old one. Use `GET`/`POST /v1/brands/{brand}/queries` and `POST .../queries/{saved_query}/run`, or the MCP tools `list_saved_queries`, `get_saved_query`, `run_saved_query` and `save_query`. Saving needs permission to manage customers.

### Published endpoints

Owners and admins can publish a saved query (from its menu) as an endpoint, listed under **Data → Endpoints**, that another system, such as a BI tool or a warehouse job, calls with an API token made for the brand that holds only `query.endpoints`:

```sh
curl -X POST https://app.outflare.ai/v1/brands/$BRAND/query-endpoints/new-signups/run \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"params": {"country": "DE"}}'
```

- Publish with `POST /v1/brands/{brand}/query-endpoints`, giving the saved query, a `slug`, its `params` (bound in order as `$1`, `$2`, …, never written into the SQL), a `row_cap` (up to 10,000) and a `rate_per_minute` per token.
- It reads what its publisher could read, and never another brand. It stays on the version it was published with until you move it.
- Every call is logged, allowed or refused, for 90 days (`GET .../query-endpoints/{endpoint}/calls`). Over the rate limit it answers `429` with `Retry-After`.

## Who sees what

Search and Query see exactly what the person or agent asking could see anywhere else in Outflare:

- **Only this workspace.** Another workspace's data is never reachable.
- **Only your brands.** Someone kept to some brands, or an agent connected for one brand, sees those brands and what all brands share.
- **Only what you may read.** Each kind of data needs the same permission as everywhere else, such as Customers to read people or Outcomes to read deals. Query tells you which permission a table needs.

Query runs as its own read-only database user for each workspace, which can read only these tables, so even a hand-written query can't reach anything else.

## Self-hosting

Meaning-based search needs the [pgvector](https://github.com/pgvector/pgvector) extension in your Postgres database. Without it, everything else works and meaning-based search says it is unavailable. Most managed Postgres hosts include pgvector, and Outflare adds it itself when its database user may (otherwise the database owner runs `CREATE EXTENSION vector;` once). With Docker Compose, change the `postgres` image to `pgvector/pgvector:pg16`. If you move an existing database from `postgres:16-alpine`, run `REINDEX DATABASE outflare;` once before starting Outflare, because the new image sorts text differently. Outflare checks every five minutes, so there is no need to restart.

Query needs the database user in `DATABASE_URL` to be allowed to create database users (`CREATEROLE`). The Docker Compose setup and most managed Postgres already allow it. Without that, Query answers `query_unavailable` and the server log says why. Search by words needs nothing extra.
