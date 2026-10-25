---
title: Switch from Instantly or Smartlead
description: Bring campaigns, leads, suppressions and sending accounts over from Instantly or Smartlead without emailing anyone twice.
sidebar:
  order: 8
---

<span class="pill shipped">Shipped</span> Not yet tested against live accounts.

1. [Connect](/docs/integrations/connectors/) your Instantly or Smartlead account on the Connectors page, or ask your agent to.
2. Click **Import** on the connected account. It shows what the account holds first: campaigns, leads and sending accounts. Nothing is copied yet.
3. Pick what to bring over and start the import. It runs in the background.

What comes over:

- **Campaigns become draft sequences.** Steps are converted: variables are renamed, HTML becomes plain text, and anything that couldn't be carried over is listed as a warning. Nothing sends until you start a sequence.
- **Leads keep their place.** Each lead keeps the step it reached and the mailbox that wrote to it, so follow-ups go from the same mailbox in the same thread.
- **Bounced and unsubscribed leads** go straight onto the suppression list.
- **Sending accounts are matched to your mailboxes by address.** Neither tool shares mailbox passwords, so the ones not connected here yet are listed, with a CSV to fill in and [import](/docs/guides/import-mailboxes/).

Running an import again updates what it brought over instead of duplicating it. Nothing in the other tool is changed. Pause the campaigns there before you start them here.

```sh
curl "https://outflare.example.com/v1/workspaces/$WS/integrations/$ID/import-preview" -H "Authorization: Bearer $OUTFLARE_TOKEN"
curl -X POST "https://outflare.example.com/v1/workspaces/$WS/integrations/$ID/imports" -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  -H "Content-Type: application/json" -d '{"leads": true}'
```

`GET /v1/workspaces/{ws}/imports/{id}` shows what an import did. Agents use `preview_import`, `start_import` and `get_import`.
