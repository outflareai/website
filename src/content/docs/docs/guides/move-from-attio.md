---
title: Move from Attio
description: Import your Attio CRM into Outflare once, as customer records with their fields, stages, owners and links, with nothing changed in Attio.
sidebar:
  order: 9
---

<span class="pill shipped">Shipped</span> People, companies, deals and custom objects, in the web app, the REST API and the MCP server. Lists, notes and tasks come with Outflare's own CRM. Not yet tested against a live Attio workspace.

Outflare has its own CRM on [customer records](/docs/guides/customer-records/), so moving from Attio is a one-off import, not an ongoing sync. Nothing in Attio changes, and you can run the import again on the day you switch.

1. [Connect](/docs/integrations/connectors/) Attio on the Connectors page, or ask your agent to. Sign in with Attio, or paste an access token from Attio's **Workspace settings → Developers**. Read access is enough. The import runs on your own Attio account.
2. Click **Import** on the Attio connection. You see what Attio holds, pick the objects to bring over and follow the import as it runs. Owners and admins can import, because it adds fields to your catalog.

## What comes over

- **People, companies and deals.** People become person records, companies become company records, and deals and your own Attio objects become record types of their own.
- **Fields.** Each Attio field becomes a field in your catalog, or goes into one you already have when it holds the same kind of value. A company's industry goes into Outflare's industry field, for example. Choices and pipeline stages become option lists, so a deal keeps its stage.
- **Emails, phones and domains** become the record's identities. Emails and phones come in unverified, because nobody proved who owns them.
- **Owners** point at the Outflare member with the same email. Attio members who aren't in your workspace are left out.
- **Links.** A person's company, a deal's people and company, and your own reference fields become links between records.

Fields Attio works out itself, such as last interaction and connection strength, are not imported. The import lists every field it left out and every value it couldn't bring over, with why.

## No duplicates, nothing overwritten

- **People and companies already here.** If a record here already has the same email or domain, verified, Attio's values fill in that record. No second record is created.
- **Your edits win.** Attio's values count as CRM data, so they never overwrite what someone typed in Outflare or what your own product sent. They do win over enrichment.
- **Run it again.** Every record keeps its Attio id, so a second import updates the same records and only adds what's new. Run it once to try Outflare, then again on the day you switch to pick up what your team changed in Attio since.

## Preview first

The preview shows what you'd bring over before anything is copied:

- **Every object.** People, Companies, Deals and any custom ones, with how many records each holds.
- **Every field.** Its type, its options or pipeline stages in order, which objects a reference points at, and how many records fill it in, so unused fields are easy to spot.
- **Every list and pipeline**, with its own fields and how many entries it has.
- **How many notes, tasks and members** the workspace has.

Each count stops at 5,000 and says so, so the preview answers in seconds even for a large CRM.

## From the API or your agent

```sh
# See what Attio holds
curl "https://outflare.example.com/v1/workspaces/$WS/integrations/$ID/crm-import-preview" -H "Authorization: Bearer $OUTFLARE_TOKEN"

# Import everything (or send {"objects": ["people", "companies"]})
curl -X POST "https://outflare.example.com/v1/workspaces/$WS/integrations/$ID/crm-imports" -H "Authorization: Bearer $OUTFLARE_TOKEN" -d '{}'

# Follow it
curl "https://outflare.example.com/v1/workspaces/$WS/crm-imports/$IMPORT" -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

Importing needs the `catalog.manage` and `customers.manage` scopes; reading imports needs `customers.read`. Agents use `preview_crm_import`, `start_crm_import` and `get_crm_import`.

Large CRMs take a while: the import reads 500 records at a time and saves where it got to after each page, so it carries on if anything interrupts it. One import runs per connection at a time.

## Not yet

Lists and their entries, notes, tasks and comments stay in Attio for now. They come over once Outflare's CRM has lists, notes and tasks; the preview already counts them.
