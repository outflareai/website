---
title: Query and search
description: Find any person, company or conversation by its words, and answer any question about your data with read-only SQL, for you and your agents.
sidebar:
  order: 1.6
---

<span class="pill shipped">Shipped</span> In the REST API and the MCP server. Not in the web app yet.

Search and Query read the same data you see everywhere else in Outflare: [customer records](/docs/guides/customer-records/), outreach, replies, meetings, deals, lifecycle email and website visits. Search finds things by their words. Query answers questions with SQL, such as "win rate by source this quarter", in one exact answer instead of many pages of lists. Both run inside your Outflare database, so there is no other service and nothing to sync.

## Search

`GET /v1/workspaces/{ws}/search?q=pricing team`, or ask your agent (MCP `search_workspace`).

- It finds people and companies by name, the text in their fields, and their emails, phones and ids. It also finds the emails you sent and received, meetings, deals and lifecycle email by their words.
- Every word must match, each as the start of a word, so "pric" finds "pricing". Names, email addresses and words in any language match as written.
- Results come best first, records ahead of the rest. Each one says whose it is, and a reply or meeting shows the words around the match.

## Query

`POST /v1/workspaces/{ws}/query` with `{"sql": "select stage, count(*) from deals group by stage"}`, or ask your agent (MCP `run_query`). `GET .../query/tables` (MCP `list_query_tables`) lists the tables and their columns.

| Tables | What they hold |
| --- | --- |
| `people`, `companies`, `records` | Customer records, with their fields in `attributes` (read one with `attributes->>'plan'`) |
| `record_identities`, `record_relationships` | Emails, phones and ids, and links between records |
| `customer_events`, `consents`, `subscriptions` | Product events, consent, and payment subscriptions from Stripe |
| `leads`, `sequences`, `enrollments`, `messages`, `replies` | Outreach and the mail it got back, without email bodies |
| `deals`, `meetings`, `spend` | Outcomes, and what you spent |
| `emails`, `email_events`, `broadcasts` | Lifecycle email and what happened to it |
| `visits`, `social_posts`, `brands`, `projects` | Website visits, your social posts, brands and projects |

- A query is one `SELECT`. It never changes anything, so an agent kept to missions can run it without one.
- Up to 100 rows come back by default, and at most 1,000. A query running over 15 seconds is stopped, so count and group rather than list.

## Who sees what

Search and Query see exactly what the person or agent asking could see anywhere else in Outflare:

- **Only this workspace.** Another workspace's data is never reachable.
- **Only your brands.** Someone kept to some brands, or an agent connected for one brand, sees those brands and what all brands share.
- **Only what you may read.** Each kind of data needs the same permission as everywhere else, such as Customers to read people or Outcomes to read deals. Query tells you which permission a table needs.

Query runs as its own read-only database user for each workspace, which can read only these tables, so even a hand-written query can't reach anything else.

## Self-hosting

Query needs the database user in `DATABASE_URL` to be allowed to create database users (`CREATEROLE`). The Docker Compose setup and most managed Postgres already allow it. Without that, Query answers `query_unavailable` and the server log says why. Search needs nothing extra.
