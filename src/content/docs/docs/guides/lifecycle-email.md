---
title: Lifecycle email
description: Send receipts, password resets, sign-in codes and onboarding email from your own Amazon SES, Postmark or Resend account, with delivery tracking and suppression built in.
sidebar:
  order: 13
---

<span class="pill shipped">Shipped</span>

Lifecycle email is the email people asked for: receipts, password resets, sign-in codes, onboarding and product updates. Outflare sends it through **your own provider account** (Amazon SES, Postmark or Resend), so you pay the provider directly and keep your own sending reputation. Cold outreach never goes this way; it stays on [sequences](/docs/guides/sequences/).

Open **Lifecycle** in the sidebar. The home page has a short checklist:

1. **Connect an email provider.** Pick one and follow its guide. See [Email providers](/docs/integrations/email-providers/).
2. **Verify the domain you send from.** Outflare lists the DNS records to add and checks for them every minute.
3. **Hear about deliveries, bounces and complaints.** This is set up for you when you connect.
4. **Send a test email** to yourself.
5. **Send from your app**, with an API token that has the `emails.send` scope.

Once you are sending, the page shows the last 30 days: emails sent, how many were delivered, bounce and complaint rates, and a day-by-day chart.

## Send from your app

Write the email once as a [template](/docs/guides/email-templates/), then send it by its handle:

```sh
curl -X POST "https://app.outflare.ai/v1/workspaces/$WS/emails" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  -H "Idempotency-Key: $(uuidgen)" \
  -d '{"to": "ana@customer.example", "from": "Acme <billing@acme.example>",
       "template": "password-reset", "data": {"reset_url": "https://app.acme.com/r/abc"}}'
```

You can also send `subject` and `html` directly, without a template. Send the same `Idempotency-Key` when you retry, and the email goes out only once. The answer is `202` with the email, `queued`. Sends run on their own queue, so a password reset never waits behind a big send.

## What keeps you safe

- **Suppression.** Every recipient passes your suppression list first. A hard bounce or a spam complaint adds the address on its own, and the email page says so.
- **Transactional or lifecycle.** Transactional email (receipts, resets, codes) still reaches people who unsubscribed from updates, because they need it. Lifecycle email (onboarding, tips) carries a one-click unsubscribe link and skips anyone who used it.
- **Verified domains only.** The `from` address must be on a domain verified with the provider.
- **Agents ask first.** Emails that Outflare's built-in agent wants to send wait for a person to approve them.

## Sent emails

**Sent emails** lists every email, newest first. You can filter by status, kind, recipient or test sends. Open one to see:

- what it looked like, as HTML or plain text
- its timeline: queued, handed to the provider, delivered, bounced and so on
- the template version it used, the provider's message id and your metadata

An email that is still queued or scheduled can be cancelled.

## What sent it

Each email shows what sent it: a call from your app (and whether it came from the web app, the API, MCP, the CLI, an SDK or a mission), or a test send. The **Sent by** card names the API token, person or mission behind it and links to the exact call on the **Logs** page. Filter Sent emails by **Sent by** to see only API sends or only tests. Events, journeys and broadcasts will add their own triggers as they arrive.

## Opens and clicks

Open and click tracking are off by default, as in sequences. Turn them on per template under **Tracking**; changes apply to new sends straight away, without publishing. Your app can also turn them on or off for one send with `track: {"opens": true, "clicks": true}`.

- **Clicks** go through redirect links on your tracking domain, when you have one.
- **Opens** use an invisible image. Treat them as a rough signal: Apple Mail loads images for privacy, and some apps block them.
- **Scanners don't count.** Loads and clicks by mail scanners right after sending stay on the timeline but aren't counted.

Viewing an email in Outflare never counts as an open.

## One person's history

Select any address on an email, or search Sent emails by recipient, to see everything that address was sent: how many emails were delivered, bounced, opened and clicked, whether the address is suppressed and why, the lead with that address, and every event, newest first.

## Statuses

| Status | Meaning |
| --- | --- |
| `queued`, `scheduled` | Waiting to go, or waiting for its `send_at` time |
| `sent` | The provider took it |
| `delivered` | The receiving server took it |
| `delayed` | The receiving server asked to try later |
| `bounced`, `complained` | It bounced, or was marked as spam |
| `suppressed` | Not sent: the address is on your suppression list |
| `failed`, `cancelled` | The provider refused it, or you cancelled it |

## For agents and integrations

- **MCP tools:** `send_email`, `list_emails`, `get_email`, `get_email_recipient`, `cancel_email`, `get_email_overview`, plus tools for providers, domains and templates.
- **Webhook events:** `email.delivered`, `email.bounced`, `email.complained`, `email.unsubscribed`, `email.opened`, `email.clicked` and the rest of the `lifecycle_email` category.
- **Scopes:** `emails.read` to read, `emails.send` to send, `emails.manage` to change providers, domains and templates.

SMS and push will join later as more channels, using the same templates, sends and events.
