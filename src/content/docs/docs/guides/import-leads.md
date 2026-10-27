---
title: Import leads
description: Lead CSV import, deduplication, custom fields, lists and the suppression list.
sidebar:
  order: 6
---

<span class="pill shipped">Shipped</span> Leads are the people a workspace emails. Import them from any CSV export, group them into lists, and keep a suppression list of people and domains that must never be emailed.

## Import a CSV

In the web app open **Leads**, choose the file, optionally name a list to add everyone to, and select **Import**. Or use the API (scope `leads.manage`):

```sh
curl -X POST "https://outflare.example.com/v1/workspaces/$WS/leads/import?list=Q4%20founders" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  -H "Content-Type: text/csv" \
  --data-binary @leads.csv
```

```json
{ "created": 4812, "updated": 160, "duplicates": 23, "suppressed": 41, "errors": [{ "line": 77, "email": "n/a", "error": "invalid email \"n/a\"" }], "list_id": "…" }
```

Only an **email** column is required. Files can be up to 50 MB and 100,000 rows, and a file that size imports in a few seconds.

### Columns

Standard fields are recognised under the names data providers, CRMs and spreadsheets use, so exports from Apollo, Clay or HubSpot import unchanged:

| Field | Also accepted as |
| --- | --- |
| `email` | Email Address, Work Email, Business Email, Person Email |
| `first_name`, `last_name` | First Name, Last Name, Surname; or one Name / Full Name column, split at the last space |
| `company` | Company Name, Organization, Account Name |
| `title` | Job Title, Position, Headline |
| `phone` | Phone Number, Mobile, Direct Phone |
| `linkedin_url` | LinkedIn, Person Linkedin Url, Profile URL |
| `website` | Company Website, Domain |

**Every other column is kept** as a custom field under its header in snake_case, for example `# Employees` becomes `employees` and `ICP Tier` becomes `icp_tier`. Custom fields will be available as template variables in sequences. Up to 50 custom columns are kept.

### Deduplication and updates

Leads are unique by email within a workspace, ignoring case.

- A row for a lead that already exists **updates** it: non-empty values replace stored ones, empty values keep what is stored, and custom fields are merged. Re-importing an enriched export fills in the gaps rather than creating duplicates.
- Rows that repeat an email within one file are merged first and counted as `duplicates`.
- Rows with an invalid email are skipped and reported by line number. The rest of the file still imports.

### Add or update one lead

`POST /v1/workspaces/{ws}/leads` with JSON upserts one lead by email, with the same rules. Optional `list_id` adds it to a list.

```json
{ "email": "ana@acme.example", "first_name": "Ana", "company": "Acme", "custom": { "icp_tier": "A" } }
```

## Lists

Lists group leads for a sequence, for example one per campaign or segment. A lead can be in many lists. Create one by importing with `?list=Name`, from **Leads**, or with `POST /lead-lists`. Add existing leads with `POST /lead-lists/{id}/leads` and `{"lead_ids": [...]}`. Deleting a list keeps its leads. To build a list from a search at Apollo or People Data Labs instead of a file, see [Lead lists](/docs/guides/lead-lists/).

## Search

`GET /v1/workspaces/{ws}/leads` lists leads ordered by email, 100 per page (up to 500 with `limit`). Filter with `q` (email, name or company), `list_id` and `suppressed=true|false`. The response includes `total` and `next_cursor`; pass it back as `cursor` for the next page.

## The suppression list

The suppression list holds addresses and whole domains that must never be emailed: people who unsubscribed or complained, hard bounces, customers, competitors, anyone who asked not to be contacted. A suppressed domain blocks every address at it.

- **Add** entries under **Suppression** (paste or upload one per line) or with `POST /suppressions` and `{"values": ["bob@acme.example", "competitor.example"], "reason": "do_not_contact"}`. Domains are also accepted as `@acme.example` or a URL. Reasons are `manual`, `do_not_contact`, `unsubscribed`, `bounced` and `complained`. Up to 100,000 values per request.
- **Remove** an entry only with the `suppressions.manage` scope, which owners and admins have and operators do not, because removing one can mean emailing someone who opted out. Removals are in the audit log.
- Suppressed leads still import and are flagged, so your data stays complete, but they are never emailed. An unsubscribe also withdraws the person's consent to all marketing email ([how unsubscribes work](/docs/guides/customer-records/#unsubscribes)). Every send goes through the [policy check](/docs/concepts/policy-check/), and you can run the same recipient check yourself before enrolling anyone with `POST /recipients/check`.

### Erasure requests

To honour a request to be forgotten, delete the lead with `?suppress=true` (or choose OK when deleting in the web app). The lead is deleted and its address is added to the suppression list with reason `do_not_contact`, so a later import cannot put the person back into a sequence.
