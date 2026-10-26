---
title: Warm up mailboxes
description: Build each mailbox's sending reputation before it sends cold email, and see how much of your mail reaches the inbox.
sidebar:
  order: 4
---

<span class="pill shipped">Shipped</span> Warm-up between your own mailboxes, with a daily ramp, spam rescue and replies, and inbox placement per mailbox and per domain.

A new inbox that sends cold email straight away lands in spam. Google and Microsoft trust a mailbox once it has a history of sending mail that people open, rescue from spam and reply to. Warm-up builds that history for you, before your first sequence and for as long as you keep it on.

![Mailboxes with warm-up on: each mailbox's inbox placement over 7 days and its daily warm-up volume](/screens/warmup-mailboxes.png)

## How it works

When warm-up is on, your mailboxes email each other:

1. **A slow ramp.** A mailbox sends 2 warm-up emails on its first day and 2 more each day after that, up to its daily target (20 by default). Sends are spread over the day.
2. **Natural mail.** Each email is a short, plain note between colleagues, written fresh from varied parts. Nothing in it marks it as warm-up: the receiving mailbox recognises it by the Message-ID the engine recorded when it sent it.
3. **Engagement.** About every 20 minutes the receiving mailbox looks for its warm-up mail in the inbox and the spam folder. It marks each message read, **moves it to the inbox if it landed in spam**, and answers some of them (30% by default) a few minutes to an hour and a half later, in the same thread.
4. **Placement.** Where each message landed is recorded: inbox, spam, or missing if it never arrived within two days.

Warm-up mail never shows in your **Inbox**, doesn't count towards daily limits, and isn't in your sending stats. It only goes between the active mailboxes of one workspace, and never to an address on your suppression list.

:::note[You need at least two]
Mailboxes warm each other up, so turn warm-up on for at least two, ideally on different domains. Teams that buy reseller inboxes in bulk usually have plenty.
:::

### When nothing is being sent

A mailbox with warm-up on that can't send says why in its **Warm-up** column, and the API returns the reason as `warmup.waiting_on`:

| Shows | `waiting_on` | What to do |
| --- | --- | --- |
| Needs a second mailbox | `another_mailbox` | Turn warm-up on for another mailbox in the workspace. Sends start within a minute. |
| Not connected | `connection` | Reconnect the mailbox. Warm-up needs its SMTP and IMAP login, so mailboxes that only live in an outside sequencer can't warm up here. |
| Paused | `paused` | Resume the mailbox. |
| Sends failing | `null` | The mailbox's server refused the last warm-up email. Hover for the error, which is also `warmup.last_error`; `warmup.failed_7d` counts failures over 7 days. |
| Turning on in EmailBison | `platform` | The sequencer that runs this mailbox's warm-up hasn't shown it on yet. It updates on the next sync, within 5 minutes. |

## Warm up in your sequencer instead

Already paying for warm-up in a sequencer? A mailbox that is also in an EmailBison, Instantly or Smartlead account [connected for mailbox allocation](/docs/guides/mailbox-allocation/) can warm up there instead of in Outflare.

- **One mailbox:** its menu on **Mailboxes** has **Warm up with…**. Pick Outflare or the sequencer.
- **All of an account's mailboxes:** the Mailboxes page shows a card for each connected sequencer that can run warm-up, with **Warm up all N in EmailBison** and **Use Outflare's warm-up instead**.
- **Mailboxes Outflare has no login for** (they only live in the sequencer) warm up in the sequencer when you turn warm-up on.

Outflare then leaves the mailbox out of its own warm-up and turns the sequencer's warm-up on or off whenever you turn it on or off here. The **Warm-up** column shows the sequencer's warm-up score. For a mailbox in an [infrastructure plan](/docs/guides/infrastructure/), that score stands in for inbox placement when deciding the mailbox is ready. Switching back to Outflare turns the sequencer's warm-up off.

Over the API, send `provider` with the integration id. Without `mailbox_ids` or `pool_id`, it applies to every mailbox that account has:

```sh
curl -X POST https://outflare.example.com/v1/workspaces/$WS/mailboxes/warmup \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"enabled": true, "provider": "'$EMAILBISON_INTEGRATION'"}'
```

`"provider": "outflare"` moves mailboxes back. Each mailbox's `warmup.provider` says who runs it, and `warmup.platform` holds the sequencer's view: `enabled`, `score` and when it was last read. Over MCP, `set_warmup` takes the same `provider`.

## Turn it on

In the web app, open **Mailboxes**. Until any mailbox is warming, the page offers **Warm up N mailboxes** for all of them. Afterwards, each mailbox's menu has **Turn on warm-up** and **Turn off warm-up**. Mailboxes that need attention are left out until they are fixed.

Over the API, turn it on for chosen mailboxes, a whole pool, or every mailbox in the workspace:

```sh
# Every mailbox in a pool. Leave out pool_id for all, or send mailbox_ids instead.
curl -X POST https://outflare.example.com/v1/workspaces/$WS/mailboxes/warmup \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"enabled": true, "pool_id": "'$POOL'", "daily_target": 20, "reply_rate": 30}'
```

The answer is `{"updated": 12}`. One mailbox can also be changed with `PATCH /v1/workspaces/{ws}/mailboxes/{id}` and `{"warmup": {"enabled": false}}`.

| Setting | Field | Default | What it does |
| --- | --- | --- | --- |
| On or off | `enabled` | off | Turning it on starts the ramp again from day one. |
| Daily target | `daily_target` | 20 | Warm-up emails a day once ramped up, 1 to 100. |
| Reply rate | `reply_rate` | 30 | Percent of received warm-up emails that are answered, 0 to 100. |

Plan on **two weeks** of warm-up before a new mailbox sends sequences, and leave it on afterwards to protect its reputation.

## Read the results

![A mailbox's warm-up over 14 days: messages that reached the inbox, landed in spam, or never arrived](/screens/warmup-history.png)

- **Per mailbox.** The **Warm-up** column on Mailboxes shows the share of the last 7 days' warm-up mail that reached the inbox, and today's volume on the ramp. Click it for a 14-day chart. The API returns the same as `warmup` on each mailbox, and day by day from `GET /v1/workspaces/{ws}/mailboxes/{id}/warmup`.
- **Per domain.** Each [sending domain](/docs/guides/sending-domains/) sums its mailboxes' placement. Below 90% it raises an `inbox_placement` warning, and below 75% a critical issue, each with what to do.
- **Workspace.** The Mailboxes page shows overall **Inbox placement**, and the overview warns when it drops below 75%. `GET /v1/workspaces/{ws}/stats` returns it as `warmup_inbox_rate`.

| Placement | What to do |
| --- | --- |
| 90% or more | Healthy. Keep warm-up on alongside your sequences. |
| 75% to 90% | Some mail lands in spam. Lower the domain's daily limits and keep warming. |
| Under 75% | Most mail goes to spam. Pause cold sending from the domain, fix its DNS issues, and let warm-up run until placement recovers. |

## For agents

The [MCP server](/docs/agents/mcp/) has `set_warmup`, which takes the same settings as the API, and `get_mailbox_warmup` for a mailbox's 14-day history. `list_mailboxes` includes each mailbox's warm-up results, so an agent can check a mailbox is ready before adding it to a sequence's pool.
