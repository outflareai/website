---
title: Move from Attio
description: Connect Attio and see everything your CRM holds before moving it into Outflare, with nothing changed in Attio.
sidebar:
  order: 9
---

<span class="pill shipped">Shipped</span> The preview is here; the import comes with Outflare's own CRM records. Not yet tested against a live Attio workspace.

Outflare is getting its own CRM, so moving from Attio is a one-off import, not an ongoing sync. Start by seeing what you'd bring over.

1. [Connect](/docs/integrations/connectors/) Attio on the Connectors page, or ask your agent to. Sign in with Attio, or paste an access token from Attio's **Workspace settings → Developers**. Read access is enough.
2. Ask your agent to preview the import, or call the API below. Nothing is copied and nothing in Attio changes.

The preview lists:

- **Every object.** People, Companies, Deals and any custom ones, with how many records each holds.
- **Every field.** Its type, whether it's required or unique, its options or pipeline stages in order, which objects a reference points at, and how many records actually fill it in, so unused fields are easy to spot.
- **Every list and pipeline**, with its own fields and how many entries it has.
- **How many notes, tasks and members** the workspace has.

Each count stops at 5,000 and says so, so the preview answers in seconds even for a large CRM.

```sh
curl "https://outflare.example.com/v1/workspaces/$WS/integrations/$ID/crm-import-preview" -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

Agents use `preview_crm_import`.

When the import arrives, it will match records on Attio's ids, so you can run it again on the day you switch to pick up anything your team changed in Attio since.
