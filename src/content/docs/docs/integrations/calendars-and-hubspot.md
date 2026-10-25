---
title: Calendars and HubSpot
description: Connect Google Calendar, Outlook, Calendly, Cal.com and HubSpot so meetings and deals from outreach are counted.
sidebar:
  order: 3
---

<span class="pill shipped">Shipped</span> Google Calendar, Outlook, Calendly, Cal.com and HubSpot connectors for [Outcomes and cost per meeting](/docs/guides/outcomes/). Not yet tested against every account type; tell us in an issue if one misbehaves.

Connect them under **Connectors**, like any other connector: paste an API key, or click **Connect** and sign in for OAuth. Each connection is read every 15 minutes, or now with **Sync now** on the Outcomes page's Sources tab.

| Connector | Connect with | Reads | Writes |
| --- | --- | --- | --- |
| Google Calendar | OAuth (read-only events) | Meetings, incrementally | Nothing |
| Outlook | OAuth (`Calendars.Read`) | Meetings, incrementally | Nothing |
| Calendly | Personal access token | Scheduled events and invitees | Nothing |
| Cal.com | API key; base URL for self-hosted Cal.com | Accepted bookings | Nothing |
| HubSpot | OAuth, or a private app token | Meetings with their outcome; deals with stage and amount | Booked meetings, when turned on |

Only events with a lead among the attendees are stored. Your other meetings are never copied.

## Settings

Each connection takes these settings as `config` with `PATCH /v1/workspaces/{ws}/integrations/{id}` (a settings form in the web app is coming):

- `own_domains`: your own email domains, so colleagues on an invite are never taken for prospects.
- `calendar_id` (Google, Outlook): which calendar to read. The primary one by default.
- `push_meetings` (HubSpot): write meetings booked from outreach into HubSpot, creating or updating the contact by email. Off by default.
- `paused`: stop syncing without disconnecting.

## OAuth apps for self-hosting

On a self-hosted instance, Google Calendar, Outlook and HubSpot OAuth need an app you register with the provider. Use `<PUBLIC_URL>/v1/integrations/oauth/callback` as the redirect URL and set:

| Connector | Variables |
| --- | --- |
| Google Calendar | `CONNECTOR_GOOGLE_CALENDAR_CLIENT_ID`, `CONNECTOR_GOOGLE_CALENDAR_CLIENT_SECRET` |
| Outlook | `CONNECTOR_OUTLOOK_CALENDAR_CLIENT_ID`, `CONNECTOR_OUTLOOK_CALENDAR_CLIENT_SECRET` |
| HubSpot | `CONNECTOR_HUBSPOT_CLIENT_ID`, `CONNECTOR_HUBSPOT_CLIENT_SECRET` |

Calendly, Cal.com and HubSpot private app tokens need no app registration. Chili Piper, SavvyCal and Zoom Scheduler are planned.

## Adding a source

A calendar or CRM is a connector on the shared connectors framework that implements `outcomes.MeetingSource` (and `outcomes.DealSource` or `outcomes.CRMWriter` for a CRM). Cursors, attribution, de-duplication and the sync schedule come for free. See [`docs/connectors.md`](https://github.com/outflareai/outflare/blob/main/docs/connectors.md).
