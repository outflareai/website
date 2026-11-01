---
title: Daily and weekly digests
description: One summary of the whole workspace each day or week, kept in the app, sent as a webhook, and emailed through your own email provider when you choose.
sidebar:
  order: 15
---

<span class="pill shipped">Shipped</span> Digests in the app, through the API, as a webhook and for agents.

A digest is a daily or weekly summary of the whole workspace in one place: what needs a person, fixes found and confirmed, deploys, site health, outreach, lifecycle email, missions and channels (visits, conversions, revenue and cost), each number shown next to the period before. Every part of Outflare that has something to say adds its own section, so a digest covers the whole tool, not one part of it.

Each digest is kept in the app (**Settings → Digests**), sent as the `digest.ready` [webhook](/docs/api/webhooks/) so Slack, a CRM or your own system can post it, and emailed only when you choose to.

## The schedule

Without changes, a workspace gets a weekly digest on Mondays at 08:00 UTC, kept in the app and sent as a webhook, with no email. Owners and admins change it on the Digests page or with `PUT /v1/workspaces/{ws}/digest-settings`:

| Field | Values |
| --- | --- |
| `frequency` | `weekly` (the default), `daily` or `off` |
| `weekday` | For weekly digests, `0` (Sunday) to `6`; `1` is Monday |
| `hour` | `0` to `23`, in `timezone` |
| `timezone` | An IANA time zone such as `Australia/Sydney` |
| `recipients` | Who gets it by email: `none` (the default), `admins` (owners and admins) or `members` |
| `provider_id`, `from_address` | The email provider and sender, needed when `recipients` isn't `none` |

A period with nothing in it is skipped rather than sent empty. If the server was down when a digest was due, it makes it within six hours and never sends a backlog of old ones. **Make one now** makes the digest of the day or week that ends now, and the preview shows what it would say without keeping or sending it.

## Email

Digest email goes only through the workspace's own email provider (Amazon SES, Postmark or Resend, connected under [Lifecycle email](/docs/guides/lifecycle-email/)), from an address on one of its verified sending domains. Outflare never sends it from an account of its own. Until the provider and sender are set up, digests are still kept and sent as webhooks, and the Digests page says what is missing.

It goes to members who see every brand (a digest covers all of them) and have confirmed their email address. Anyone can turn it off for themselves on the Digests page.

Each email is a transactional email in Sent emails, tagged `digest`, so its delivery, bounces and complaints show there like any other.

## API and MCP

| Endpoint | MCP tool | What it does |
| --- | --- | --- |
| `GET /v1/workspaces/{ws}/digest-settings` | `get_digest_settings` | The schedule, who gets it, and why it can't be emailed yet |
| `PUT /v1/workspaces/{ws}/digest-settings` | `update_digest_settings` | Change them (`workspace.manage`) |
| `PUT /v1/workspaces/{ws}/digest-settings/me` | | Turn the email off or on for yourself |
| `GET /v1/workspaces/{ws}/digests` | `list_digests` | The newest 50 digests |
| `GET /v1/workspaces/{ws}/digests/{id}` | | One digest |
| `GET /v1/workspaces/{ws}/digests/preview` | `preview_digest` | The digest of the period that ends now, not kept |
| `POST /v1/workspaces/{ws}/digests` | `send_digest` | Make one now (`workspace.manage`) |
