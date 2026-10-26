---
title: Customer records
description: One record of each person and company your business knows, with the emails and ids that point at them, shared by every Outflare feature.
sidebar:
  order: 1.5
---

<span class="pill shipped">Shipped</span> Records, identities, links and the shared catalog, through the REST API and the MCP server. Product events, merges, segments and the customer pages come next.

Outflare keeps one record of each person and company your business knows, plus anything else you track, such as deals, subscriptions or partners. The customer data platform, the CRM and lifecycle email all use the same records, so nobody types the same detail twice and nothing ends up in a separate copy.

Moving from Attio? [Import it once](/docs/guides/move-from-attio/) and its people, companies and deals become records here.

## The catalog

The catalog lists everything a record can hold, and every feature uses the same definitions.

- **Record types.** People and companies come built in. Add your own, such as Deal.
- **Fields.** First and last name, job title, seniority, companies, country, city, time zone, LinkedIn and lifecycle stage for people. Website, industry, company size, country, LinkedIn and lifecycle stage for companies. Add your own fields with a value type: text, number, currency, date, checkbox, a choice from a list, rating, email, phone, URL, location, or a link to another record or a teammate.
- **Option lists.** Choices shared across fields, such as country, industry, company size, seniority and lifecycle stage. Add your own, such as deal stages. Options are archived, never deleted, so old records keep their meaning.
- **Product events.** Define the events your product sends, such as `product.activated`, with their properties.

Agents read the catalog with `get_catalog` before writing anything, and reuse a field before adding a new one.

## Which value wins

Every value remembers where it came from: a person's edit, your own product, a CRM sync, enrichment or an import. When two sources disagree, the higher one wins. By default a person's edit comes first, then your product's own data, then the CRM, then enrichment. So enrichment never overwrites what someone typed, and a CRM sync never overwrites what your product knows. Every change is kept in the record's history, with who made it and from where.

## Emails, phones and ids

A record's identities say who it is: emails, phone numbers, push device tokens, your product's own user ids, payment customer ids and company domains.

Only a **verified** email or phone counts. If someone signs up on your website with another person's email and never confirms it, they get their own record. They never take over the real person's record, and the address stays with its owner. When a person changes their email, the old one is kept in the history, and the new one is refused if another record already holds it verified. Nothing is merged without proof.

## Who can do what

| Permission | Allows | Roles |
| --- | --- | --- |
| Read customers | See records, their identities, links and history, and the catalog | Everyone |
| Manage customers | Add and change records, identities and links | Owners, admins and operators |
| Manage catalog | Add and change record types, fields, option lists and events | Owners and admins |

People and tokens kept to some brands see only their brands' records and the ones every brand shares.

## Use it from the API

```sh
curl -X POST https://app.outflare.ai/v1/workspaces/$WS/records \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"type": "person", "origin": "first_party", "source": "first_party",
       "attributes": {"first_name": "Ada", "last_name": "Lovelace", "country": "GB"},
       "identities": [{"namespace": "user_id", "value": "u_123"},
                      {"namespace": "email", "value": "ada@example.com", "verified": true}]}'
```

The full reference is under [API](/docs/api/), at `/v1/workspaces/{ws}/catalog` and `/v1/workspaces/{ws}/records`.
