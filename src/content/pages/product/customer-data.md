---
title: Open-source CRM and customer data platform · Outflare
description: An open-source CRM with one record per person and company, deals, smart lists, rules, metrics, bulk edits with undo, and read-only SQL for you and your agents.
h1: An open-source CRM your agents can read and write.
label: Customer data
lede: Outflare keeps one record of each person and company your business knows, built from your website, product, payments, CRM and campaigns. The CRM, cold email, lifecycle email and every agent use the same records, and every change is in the record's own history.
answer: Outflare is an open-source CRM and customer data platform (AGPL-3.0) you can self-host for free. It keeps one record per person and company, with deals, your own record types and fields, smart lists that update themselves, rules that turn what people do into business events, live metrics, bulk edits with undo, and read-only SQL. Every lead, reply, meeting, payment and website visit lands on the same record, and the API and MCP server give agents the same access as a person.
points:
  - One record per person and company, shared by every module
  - Every change kept in the record's history, with who made it
  - Smart lists, rules and metrics that update themselves
  - Import from Attio once; sync deals from HubSpot
docs:
  - label: Customer records
    href: /docs/guides/customer-records/
  - label: Smart lists
    href: /docs/guides/smart-lists/
  - label: Rules
    href: /docs/guides/rules/
  - label: Metrics
    href: /docs/guides/metrics/
  - label: Bulk edits
    href: /docs/guides/bulk-edits/
  - label: Query and search
    href: /docs/guides/query-and-search/
faqs:
  - q: Is Outflare an open-source CRM?
    a: Yes. The customer records, deals, catalog, smart lists, rules, metrics, bulk edits and Query are all in the open-source engine under AGPL-3.0. Self-hosting is free, and Outflare Cloud at app.outflare.ai is free during early access.
  - q: Can I self-host the CRM?
    a: Yes. Outflare runs as one binary with Postgres as its only dependency, and your records stay in your own database. The same API, SDKs and MCP server work against a self-hosted server and Outflare Cloud.
  - q: Can I move from Attio or HubSpot?
    a: Attio imports once, as person, company and deal records with their fields, stages, owners and links, and nothing changes in Attio. HubSpot connects as a source of meetings and deals, and stays the source of truth for the deals it syncs.
  - q: Can AI agents use the CRM safely?
    a: Yes. Agents read the catalog before writing, must send the version of a record they read so they never overwrite someone else's change, and every change they make is in the record's history under their name. Query is read-only SQL, so an agent can answer questions without changing anything.
  - q: What happens when two records are the same person?
    a: Records that share an email or phone number are listed as possible duplicates, side by side, to merge, link or dismiss. A merge moves emails, ids, events, consent, leads and outreach to the record you keep, and an import or merge can be undone.
related:
  - /best/open-source-crm/
  - /alternatives/hubspot/
  - /compare/outflare-vs-hubspot/
  - /product/leads/
  - /product/journeys/
  - /product/outcomes/
updated: 2026-11-09
order: 55
---

## One record per person and company

Open **CRM → People** to see every person and company in the brand you picked. Each record shows its fields, its emails and ids, the companies, people and deals it is linked to, its consent, what may be sent to it and why, and the history of every field.

- **Leads are people.** Every lead you import is a person record, so fix someone's job title on their record and that is what the next cold email says.
- **One timeline** across every module: product events, payments, cold email and replies, meetings and deals, website visits, consent changes and journeys.
- **Deals** with stages from lead to won or lost, a value and a close date. The deal under Deals and the deal in your [outcomes](/product/outcomes/) are the same record.
- **Your own record types and fields**, such as subscriptions or partners, with text, number, currency, date, choice, link and more.
- **Consent** per person and channel, with where it was given and what proves it. An unsubscribe from any email stops every sequence, broadcast and journey in every brand.

## Where the data comes from

| Source | What it adds |
| --- | --- |
| [Website tracking](/docs/guides/website-tracking/) | Every visit, with the campaign it came from |
| Your product | Events in Segment's format (`track`, `identify`, `group` and so on) |
| [Stripe](/docs/guides/revenue-from-stripe/) | Payments on the timeline; plan, monthly and lifetime revenue on the record |
| Cold email and the inbox | Sends, replies and labels |
| Calendars and HubSpot | Meetings and deals |
| [Attio](/docs/guides/move-from-attio/) | A one-off import of people, companies, deals and custom objects |
| CSV imports and enrichment | Leads and their details |

When two sources disagree, a person's edit wins, then your product's own data, then the CRM, then enrichment. So enrichment never overwrites what someone typed.

## Lists, rules and metrics

| Feature | What it does |
| --- | --- |
| [Smart lists](/docs/guides/smart-lists/) | Groups of people that update themselves from rules on fields, events and lists, with a live count while you edit |
| [Rules](/docs/guides/rules/) | Turn what happens into business events of your own, such as `customer.stalled`, that journeys, webhooks and smart lists act on. Dry-run any rule first |
| [Metrics](/docs/guides/metrics/) | Live totals per company and person, such as spend in the last 30 days, that rules and lists read like any field |
| [Bulk edits](/docs/guides/bulk-edits/) | Change many records at once from a list, a saved query or ids, with a preview first and undo for 7 days |

A rule never sends anything itself: it emits an event, and a [journey](/product/journeys/) or webhook decides what to do about it.

## Every change in the record's history

Whoever changes a person or company, a teammate, an agent, an import or a bulk edit, the change is written to that record's own history with who made it and, for a bulk edit, which one. An undo adds history and never erases it. Two people or agents changing the same record at once never overwrite each other: a change made against an old copy is refused, so it can be read again and redone.

Deleted records can be restored for 7 days, and a record can be erased for good when someone asks.

## Search and Query

- **Search** finds people, companies, emails, meetings and deals by their words, or by what they mean: "unhappy with price" finds a reply saying "too expensive for us".
- **Query** answers any question with read-only SQL, such as win rate by source this quarter, inside your own database, with nothing to sync.

## For agents

Everything is in the API under `/v1/brands/{brand}/records` and in the [MCP server](/product/mcp/), with tools such as `get_catalog`, `get_record_timeline`, `search_workspace` and `send_brand_events`. Ask your agent "which companies spent over $1,000 this month and haven't been contacted?" and it can answer from Query.

## Who can do what

Everyone in the workspace can read records. Owners, admins and operators can change them and merge duplicates. Owners and admins manage the catalog, and only owners run bulk edits. People and tokens kept to some [brands](/product/brands/) see only their brands' records and the shared ones.
