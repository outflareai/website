---
title: Customer records
description: One record of each person and company your business knows, with the emails and ids that point at them, shared by every Outflare feature.
sidebar:
  order: 1.5
---

<span class="pill shipped">Shipped</span> Records, identities, links, the shared catalog, product events, duplicates and merges, timelines and consent, through the REST API and the MCP server. [Smart lists](/docs/guides/smart-lists/) group records by rules. The customer pages come next.

Outflare keeps one record of each person and company your business knows, plus anything else you track, such as deals, subscriptions or partners. The customer data platform, the CRM and lifecycle email all use the same records, so nobody types the same detail twice and nothing ends up in a separate copy.

Moving from Attio? [Import it once](/docs/guides/move-from-attio/) and its people, companies and deals become records here.

## Leads are people

Every lead you import or add is a person record too. A new lead joins the person who already has its email, or gets a record of its own marked as a prospect, with its name, job title and LinkedIn filled in. Its email stays unverified, so it never takes over an address someone later proves they own. Each lead in the API has a `record_id` that points at its person.

Cold email, replies, meetings and deals are linked to the person as well: through their lead, or else through the address (a reply's sender, a meeting's attendee). Merging two records moves all of it to the one you keep.

## The catalog

The catalog lists everything a record can hold, and every feature uses the same definitions.

- **Record types.** People, companies and [deals](#deals) come ready to use. Add your own, such as subscriptions or partners.
- **Fields.** First and last name, job title, seniority, companies, country, city, time zone, LinkedIn and lifecycle stage for people. Website, industry, company size, country, LinkedIn and lifecycle stage for companies. Add your own fields with a value type: text, number, currency, date, checkbox, a choice from a list, rating, email, phone, URL, location, or a link to another record or a teammate.
- **Option lists.** Choices shared across fields, such as country, industry, company size, seniority and lifecycle stage. Add your own, such as deal stages. Options are archived, never deleted, so old records keep their meaning.
- **Product events.** Define the events your product sends, such as `product.activated`, with their properties.

Agents read the catalog with `get_catalog` before writing anything, and reuse a field before adding a new one.

## Deals

Every deal is one record, wherever it came from: made in the CRM, opened by a [reply rule](/docs/guides/inbox/#move-deals-from-replies), brought over from Attio, logged for outreach or synced from HubSpot. The deal you see under Deals and the deal in your [outcomes](/docs/guides/outcomes/) are the same deal, with the same id, so a change on either side shows on the other.

- **Fields.** A deal has a stage (lead, qualified, meeting booked, proposal, negotiation, won, lost), a value, a close date, its people and its company. They match Attio's, so deals from Attio fit as they are. If you made your own Deal type before, it's kept, and gets any of these fields it didn't have, plus won and lost stages.
- **Won and lost** close a deal and count as won or lost in outcomes. Every other stage is open.
- **People and company.** A deal logged for a lead is linked to that person, and to their company when the deal has none.
- **Outreach.** A deal made in the CRM is credited to the outreach that reached its person, the same way a HubSpot deal is: the sequence and project that emailed them, and their latest meeting.
- **HubSpot** stays the source of truth for the deals it syncs: the next sync of a deal writes its name, stage, value and close date again.
- **Archiving** a deal takes it out of outcomes and reports.

A deal shows on the timelines of its people and its company, and its own timeline shows its history.

## Which value wins

Every value remembers where it came from: a person's edit, your own product, a CRM sync, enrichment or an import. When two sources disagree, the higher one wins. By default a person's edit comes first, then your product's own data, then the CRM, then enrichment. So enrichment never overwrites what someone typed, and a CRM sync never overwrites what your product knows. Every change is kept in the record's history, with who made it and from where. Two people or agents changing the same record at once never overwrite each other: a change made against an old copy is refused, so it can be read again and redone. Agents always send the version they read; a change from an agent without one is refused.

Paste the [website tracking](/docs/guides/website-tracking/) snippet into your site and every visit is recorded with the campaign it came from. Connect Stripe and each paying customer's plan, monthly revenue, lifetime revenue, first payment date and billing status are kept on their record for you. See [Revenue from Stripe](/docs/guides/revenue-from-stripe/).

## Emails, phones and ids

A record's identities say who it is: emails, phone numbers, push device tokens, your product's own user ids, payment customer ids and company domains.

Only a **verified** email or phone counts. If someone signs up on your website with another person's email and never confirms it, they get their own record. They never take over the real person's record, and the address stays with its owner. When a person changes their email, the old one is kept in the history, and the new one is refused if another record already holds it verified. Nothing is merged without proof.

## Product events

Send what people do in your product to Outflare in Segment's format: `track`, `identify`, `page`, `screen`, `group` and `alias`. If your product already sends to Segment, RudderStack or a similar library, it can send the same calls to Outflare. Send them from your servers with an API token that can manage customers, one at a time or up to 500 per call.

Each event is matched to a person:

1. By your product's own **user id**. A user id Outflare hasn't seen makes a new person.
2. Otherwise by an email the person **proved** they own (`email_verified: true` in identify's traits).
3. Otherwise by the visitor's **anonymous id**. Visits before sign-up wait unmatched, then join the person as soon as an identify links the two.

Two different user ids are never merged, and an email someone only typed in never matches anyone.

Traits that match a field in the catalog fill in the record: `firstName` is first name, `title` is job title. The rest stay on the event, and the response lists them so you can add the fields you want. A `group` call finds or makes the company by its id and adds it to the person's companies. Send a `messageId` with each event so a retry is stored once. A new event name arrives quarantined, so it drives nothing until someone approves it in the catalog.

## Duplicates

When two records share an email or phone number, they might be the same person. Outflare lists each such pair once, with both records side by side, so someone can decide. This includes pairs you already had before the upgrade.

- **Merge** keeps one record. The other one's emails and ids, links, product events, consent, leads and outreach move to the kept record, and its details fill in whatever the kept record is missing. The usual "which value wins" order still applies, so a CRM value never replaces one someone typed. The merged record stays in the archive, so its history and any old links still lead to the record you kept.
- **Link** keeps both records but marks them as the same person, for example one person with two accounts in your product.
- **Dismiss** says they are different people. You won't be asked about the pair again.

Two records that each have their own user id from your product are two accounts, so they are never merged. You can only link or dismiss them.

Outflare merges on its own in one case only. If your product reports that someone proved they own an email, and that email is held by a record with no user id of its own (for example one from an import or a CRM sync), that record is merged into theirs.

## Timeline

Every person and company has one timeline across every module, newest first (`GET /records/{record}/timeline`, MCP `get_record_timeline`):

- product events, including lifecycle email and payments
- changes to their details, and emails and ids added or replaced
- consent given or taken back, and entries on the [opt-out list](/docs/guides/who-can-be-emailed/#the-opt-out-list)
- cold email sent to them and their replies, meetings and deals
- visits to your website: the landing page, pages seen, where they came from and the campaign
- journeys entered, and finished or left

A company's timeline includes its people's, and each item says whose it is; `people=false` shows only the company's own. Filter it with `kinds`, for example `?kinds=message,meeting,deal` for just the outreach, and with `brand` for one brand's items and the shared ones. Pages are 50 items; pass `next_before` as `before` for the next.

## Consent

Consent is recorded per person and channel (email, SMS, push, WhatsApp, in-app), optionally for one topic such as product updates, with where it was given and what proves it, such as the sign-up form and its wording. Nothing is overwritten: the latest grant or withdrawal counts, and the rest stay as the history. Withdrawing from a whole channel covers every topic on it. Lifecycle email sends marketing only to people whose email consent is granted. Where a record came from never counts as consent.

### Unsubscribes

An unsubscribe from any email, whether a cold sequence's link, a reply asking to stop, the lifecycle unsubscribe link or one imported from another sequencer, does two things. It adds the address to the [suppression list](/docs/guides/import-leads/#the-suppression-list), and it records on the person that they withdrew consent to all marketing email. So they are out of every sequence, broadcast and journey, in every brand. Email they need, such as receipts and password resets, still reaches them.

Only the person opting in again clears it, for example by creating an account and agreeing to receive email, or turning email back on in the preference page. In the API that is a grant to all marketing email with a `source` of `signup_form`, `signup`, `opt_in`, `double_opt_in`, `checkout`, `form`, `in_app` or `preference_center`. It removes the unsubscribe from the suppression list and the audit log records it. A grant from an import, a CRM sync, an agent or the API without one of those sources never clears an unsubscribe, and bounces, complaints and manual blocks always stay.

## Who can do what

| Permission | Allows | Roles |
| --- | --- | --- |
| Read customers | See records, their identities, links, history, timeline and consent, product events, and the catalog | Everyone |
| Manage customers | Add and change records, identities and links, merge duplicates, send product events and record consent | Owners, admins and operators |
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

Send product events the same way:

```sh
curl -X POST https://app.outflare.ai/v1/workspaces/$WS/customer-events \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"batch": [
        {"type": "identify", "userId": "u_123", "anonymousId": "a_9f2", "messageId": "m_1",
         "traits": {"email": "ada@example.com", "email_verified": true, "firstName": "Ada"}},
        {"type": "track", "userId": "u_123", "event": "Order Completed", "messageId": "m_2",
         "properties": {"total": 42}}]}'
```

To find a record or anything in its history by its words, or to count and add up across records, see [Query and search](/docs/guides/query-and-search/). Agents use `track_customer_events`, `get_record_timeline`, `list_record_consents`, `record_consent`, `list_record_duplicates` and `merge_records`.

The full reference is under [API](/docs/api/), at `/v1/workspaces/{ws}/catalog`, `/v1/workspaces/{ws}/records` and `/v1/workspaces/{ws}/customer-events`.
