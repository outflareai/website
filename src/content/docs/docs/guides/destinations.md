---
title: Destinations
description: Send your product events on to a webhook, Slack, Google Analytics 4 or HubSpot as they arrive, each on your own account.
sidebar:
  order: 1.6
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

A **destination** forwards a brand's [product events](/docs/guides/customer-records/) to a tool you already use, as they arrive. Events come into Outflare once, from the website script, the API or an SDK, and go on from there, so each tool sees the same events without tracking code of its own.

In the app, open **CRM → Customer data → Events**, then **Destinations**. Pick a tool, fill in what it needs and press **Add destination**. Each brand has its own destinations, 20 at most.

## The tools

| Destination | What it does | What it needs |
| --- | --- | --- |
| **Webhook** | Posts each event as JSON to your URL, signed the same way as [webhooks](/docs/api/webhooks/). | An https URL. The signing secret is shown once when you add it. |
| **Slack** | Posts a line in a channel: the event, who did it and its first few properties. | Your own Slack connection and a channel. |
| **Google Analytics 4** | Sends the event to your property from the server, so it counts even when a browser blocks the tag. | The web data stream's measurement ID (`G-…`) and its Measurement Protocol API secret. |
| **HubSpot** | Creates or updates the event's person as a contact, by email, and sets the contact properties you choose, such as `lifecyclestage` to `customer` when an order completes. | Your own HubSpot connection. |

**Every destination runs on your own account.** Slack and HubSpot use the workspace's own connections (add them under **Connectors**), Google Analytics uses your own API secret, which is stored sealed and never shown again, and a webhook is your own server. Outflare has no accounts of its own for any of them, so a destination stays off until its connection or secret is there.

Conversions for ad platforms, such as Meta and Google Ads, are set up under **Paid ads**, where ad consent is checked too.

## Which events are sent

Name the events a destination should take, or leave the list empty to send every tracked event. Page views and identifies go only when you name them (`page.viewed`).

Only events that arrive after you add a destination are sent, so adding one never floods a tool with history. One you turn off and on again starts from the moment it is turned on.

## What each tool receives

- **Webhook:** the event's id, name, kind, times, user and anonymous ids, the record's id, and its properties and traits, with the `webhook-id`, `webhook-timestamp` and `webhook-signature` headers. Answer with a 2xx within 10 seconds. The person's details are not in the body: read them from the API with the record's id.
- **Google Analytics 4:** the event's name (dots become underscores) with up to 25 of its text, number and yes/no properties as parameters. Google takes events up to 72 hours old; older ones are skipped.
- **HubSpot:** the person's email and name, then the properties you set. An event whose person has no email address is skipped.

## See what was sent

Open a destination to see its newest events: **Sent**, **Skipped** (with why), **Failed** (the tool refused it) or **Waiting**. The list shows how many each destination sent and failed in the last 24 hours.

When a tool can't be reached, Outflare tries again each minute, five times, before marking the event failed. While it is down the destination shows since when, and the events behind it wait in order.

## For agents and scripts

```http
GET    /v1/brands/{brand}/destinations
POST   /v1/brands/{brand}/destinations
PATCH  /v1/brands/{brand}/destinations/{id}
DELETE /v1/brands/{brand}/destinations/{id}
GET    /v1/brands/{brand}/destinations/{id}/sends?status=failed
```

Reading needs the `customers.read` scope and changing needs `customers.manage`. MCP tools: `list_destinations`, `create_destination`, `update_destination`, `delete_destination` and `list_destination_sends`.
