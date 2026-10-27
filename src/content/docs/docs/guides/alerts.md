---
title: Alerts
description: Hear about hot replies and hot website visitors as they happen, in the app, by email to the right person, in Slack, and as a webhook.
sidebar:
  order: 16
---

<span class="pill shipped">Shipped</span> Alerts for hot replies and hot website visitors, in the app, by email, in Slack, as a webhook, in the digest and for agents.

An alert says something needs a person now. Outflare raises one once for each thing that happens:

| Alert | When | Who it's for |
| --- | --- | --- |
| Hot replies (`reply.hot`) | A reply is labelled interested, meeting booked or question, by the built-in rules, a person, or [your own AI model](/docs/guides/inbox/#ai-labelling-with-your-own-key) at 80% or more. A label waiting for review alerts once someone confirms it. | The person the reply is assigned to, else whoever made the sequence. |
| Hot website visitors (`visitor.hot`) | A known person or company reaches your hot score on the website, at most once a week each ([website visitors](/docs/guides/website-visitors/)). | The owners and admins. |

Each alert is:

- **Kept in the app** under **Settings → Alerts**, newest first, with a link to the reply or visitor.
- **Sent as the `alert.raised` [webhook](/docs/api/webhooks/)**, with ids only, so Slack, a CRM or Zapier can act on it.
- **Counted in the [digest](/docs/guides/digests/)**.
- **Emailed** to the person it's for, to every owner and admin, or to nobody, as you choose.
- **Posted to Slack**, in a channel you pick, through your own Slack.

## Alert emails

Alert emails come from Outflare's account email, the one that sends sign-in links, so there is nothing to set up. They say what happened and link to it, and never quote the reply. Each person gets at most 50 a day; the rest wait in the app. Whoever caused an alert, such as the person who labelled the reply, isn't emailed about it.

Under **Settings → Alerts**, owners and admins choose who gets each kind by email: **The person it's for** (the default; owners and admins when there is nobody in particular), **Owners and admins**, or **Nobody**. Anyone can **Mute** a kind for themselves.

A brand can choose differently from the workspace through the API:

```sh
curl -X PUT https://outflare.example.com/v1/workspaces/$WS/alerts/settings \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"brand_id": "'$BRAND_ID'", "kind": "visitor.hot", "email": "off"}'
```

`email` is `owner`, `admins`, `off`, or `null` to follow the workspace again. Changing settings needs `workspace.manage`.

## Slack

Connect your Slack under **Connectors → Slack**: sign in with Slack, or paste a bot token from a Slack app of your own (bot scopes `chat:write`, `chat:write.public`, `channels:read` and `groups:read`). Outflare only posts, and never reads your messages. Then pick a channel for each kind of alert under **Settings → Alerts**. Each post says what happened and has a button to open it in Outflare. Without a Slack connection, nothing is posted.

Through the API, list the channels with `GET /v1/workspaces/{ws}/alerts/channels?integration_id=` and pick one:

```sh
curl -X PUT https://outflare.example.com/v1/workspaces/$WS/alerts/settings \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"kind": "reply.hot", "slack_integration_id": "'$SLACK_ID'", "slack_channel": "C0123456789"}'
```

Send both as `null` to stop posting.

## API and agents

`GET /v1/workspaces/{ws}/alerts` lists alerts, newest first, with a `title`, a line of `text` and the app `path` that has each one. Filter with `kind` and page with `before` (`next_before` from the last page). You see the kinds your role can read: hot replies need `inbox.read`, hot visitors `customers.read`, and brand-limited people see their brands' alerts and the shared ones.

`GET /v1/workspaces/{ws}/alerts/settings` shows the kinds and who gets each, and `PUT /v1/workspaces/{ws}/alerts/mutes` with `kind` and `muted` mutes one for you. Agents use `list_alerts`, `get_alert_settings`, `set_alert_settings`, `list_alert_channels` and `mute_alerts`.

## In your CRM

Hot replies can also land in HubSpot as a note on the contact and a follow-up task for the lead's owner, through your own HubSpot connection. Set `push_replies` and `reply_tasks` on it ([Calendars and HubSpot](/docs/integrations/calendars-and-hubspot/)).
