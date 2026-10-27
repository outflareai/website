---
title: Query and search
description: Find any person, company or conversation by its words or by what it means, and answer any question about your data with read-only SQL, for you and your agents.
sidebar:
  order: 1.6
---

<span class="pill shipped">Shipped</span> In the REST API and the MCP server. Not in the web app yet, except the meaning-based search switch under Settings.

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

Meaning-based search needs the [pgvector](https://github.com/pgvector/pgvector) extension in your Postgres database. Without it, everything else works and meaning-based search says it is unavailable. Most managed Postgres hosts include pgvector, and Outflare adds it itself when its database user may (otherwise the database owner runs `CREATE EXTENSION vector;` once). With Docker Compose, change the `postgres` image to `pgvector/pgvector:pg16`. If you move an existing database from `postgres:16-alpine`, run `REINDEX DATABASE outflare;` once before starting Outflare, because the new image sorts text differently. Outflare checks every five minutes, so there is no need to restart.

Query needs the database user in `DATABASE_URL` to be allowed to create database users (`CREATEROLE`). The Docker Compose setup and most managed Postgres already allow it. Without that, Query answers `query_unavailable` and the server log says why. Search by words needs nothing extra.
