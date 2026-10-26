---
title: Warm up mailboxes
description: Warm up each mailbox in your connected sequencer before it sends cold email, and see its warm-up score in Outflare.
sidebar:
  order: 4
---

<span class="pill shipped">Shipped</span> Warm-up switched on and off in a connected EmailBison, Instantly or Smartlead account, with each mailbox's warm-up score.

A new inbox that sends cold email straight away lands in spam. Google and Microsoft trust a mailbox once it has a history of sending mail that people open, rescue from spam and reply to. Warm-up builds that history before your first sequence, and for as long as you keep it on.

Outflare doesn't send warm-up mail itself. Warm-up runs in a sequencer with its own warm-up network: **EmailBison**, **Instantly** or **Smartlead**. Outflare turns that warm-up on or off for each mailbox, shows the sequencer's warm-up score next to everything else about the mailbox, and uses the score to decide when a new mailbox is ready.

## Set it up

1. **Add your mailboxes to the sequencer** in its own app.
2. **Connect the sequencer** on **Connectors**, under Sequencers. Outflare reads its mailboxes every few minutes and matches them to yours by address ([mailbox allocation](/docs/guides/mailbox-allocation/) explains the connection).
3. **Turn warm-up on.** Open **Sending → Warm-up** in the sidebar and choose **Warm up N mailboxes**, or **Turn on** for one. The same switch is in each mailbox's menu on **Mailboxes**, and the Mailboxes page has a card for each connected sequencer with **Warm up all N in EmailBison**.

Plan on **two weeks** of warm-up before a new mailbox sends sequences, and leave it on afterwards to protect its reputation.

A mailbox in two connected sequencers warms up in one of them: pick which with **Warm up in…** in its menu. Outflare turns warm-up on in the one you pick and off in the other. A mailbox that is in no connected sequencer can't be warmed up; add it to one first.

## Read the results

The **Warm-up** column on **Mailboxes** and **Warm-up** shows, for each mailbox:

| Shows | What it means |
| --- | --- |
| **92 in EmailBison** | The sequencer runs the warm-up, and this is its warm-up score, 0 to 100. |
| **Turning on in EmailBison** | Outflare asked the sequencer to turn its warm-up on, and it shows on the next sync, within 5 minutes. |
| **On in Instantly** | The sequencer's own warm-up is on, but nobody turned it on through Outflare. |
| **Also warming in Smartlead** | It warms up in two sequencers at once, which doubles its warm-up mail. Pick one with **Warm up in…**. |
| Off | Warm-up is off. |

When Outflare first reads a sequencer account, a mailbox whose warm-up is already on there is taken as warming up there. Nothing is switched.

For a mailbox in an [infrastructure plan](/docs/guides/infrastructure/), the score decides its stage: it moves from **warming** to **ready** once its warm-up days are done and the score is at least 85, and a ready mailbox rests when the score falls below the plan's floor (75 by default). For [mailbox allocation](/docs/guides/mailbox-allocation/), a score under 75 keeps a mailbox from taking new leads.

## Keep warm-up mail out of your inbox

EmailBison, Instantly and Smartlead put a short code in each warm-up email so their own filters can find it. Paste that code on the sequencer's card on the **Mailboxes** page, under **warm-up tag**. Outflare's inbox then leaves out any mail whose subject or body holds it, without opening or moving it, so the sequencer still does its own engagement. Over the API, set `config.warmup_tags` on the integration (up to 20 tags of 4 to 100 characters):

```bash
curl -X PATCH https://app.outflare.ai/v1/workspaces/$WS/integrations/$INTEGRATION \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"config": {"warmup_tags": ["XK7Q2Z9"]}}'
```

## Over the API

Turn warm-up on for chosen mailboxes, a whole pool, or every mailbox in the workspace:

```bash
# Every mailbox in a pool. Leave out pool_id for all, or send mailbox_ids instead.
curl -X POST https://app.outflare.ai/v1/workspaces/$WS/mailboxes/warmup \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"enabled": true, "pool_id": "'$POOL'"}'
```

The answer is `{"updated": 12}`. Without `provider`, each mailbox keeps its sequencer or gets a connected one it is in. Listed mailboxes that are in none make the request fail with a 400 that says how many; for every mailbox in the workspace, those are left out. Send `provider` with a sequencer's integration id to choose it; without `mailbox_ids` or `pool_id`, that applies to every mailbox the account has:

```bash
curl -X POST https://app.outflare.ai/v1/workspaces/$WS/mailboxes/warmup \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"enabled": true, "provider": "'$EMAILBISON_INTEGRATION'"}'
```

One mailbox can also be changed with `PATCH /v1/workspaces/{ws}/mailboxes/{id}` and `{"warmup": {"enabled": false}}`. Each mailbox's `warmup` says whether it is on, `provider` is the sequencer's integration id, `platform` holds the sequencer's view (`enabled`, `score` and when it was last read), and `waiting_on` is `platform` while the sequencer hasn't shown it on yet. Each mailbox's `platforms[].warmup_enabled` says which sequencers have their own warm-up on.

:::note[Outflare's own warm-up is gone]
Outflare used to send warm-up mail between your own mailboxes. It no longer does, and upgrading turned that warm-up off; turn it on again in a connected sequencer. In the API, `daily_target` and `reply_rate` are accepted and ignored, `GET /v1/workspaces/{ws}/mailboxes/{id}/warmup` and the 7-day warm-up counts are deprecated and run down to zero, and `"provider": "outflare"` only goes with `"enabled": false`.
:::

## For agents

The [MCP server](/docs/agents/mcp/) has `set_warmup`, which takes the same settings as the API. `list_mailboxes` includes each mailbox's warm-up and the sequencer's score, so an agent can check a mailbox is ready before adding it to a sequence's pool.
