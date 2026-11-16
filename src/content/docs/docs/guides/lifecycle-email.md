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
curl -X POST "https://app.outflare.ai/v1/brands/$BRAND/emails" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  -H "Idempotency-Key: $(uuidgen)" \
  -d '{"to": "ana@customer.example", "from": "Acme <billing@acme.example>",
       "template": "password-reset", "data": {"reset_url": "https://app.acme.example/r/abc"}}'
```

You can also send `subject` and `html` directly, without a template. Send the same `Idempotency-Key` when you retry, and the email goes out only once. The answer is `202` with the email, `queued`. Sends run on their own queue, so a password reset never waits behind a big send.

## What keeps you safe

- **Suppression.** Every recipient passes your suppression list first. A hard bounce or a spam complaint adds the address on its own, and the email page says so.
- **Transactional or lifecycle.** Transactional email (receipts, resets, codes) still reaches people who unsubscribed from updates, because they need it. Lifecycle email (onboarding, tips) carries a one-click unsubscribe link and skips anyone who used it, or who left the email's [topic](#topics-and-the-preference-page).
- **Verified domains only.** The `from` address must be on a domain verified with the provider.
- **Agents ask first.** Emails that Outflare's built-in agent wants to send wait for a person to approve them.

## Topics and the preference page

Topics are what people can choose to get from you, such as product updates, tips or a newsletter. Add them under **Lifecycle → Topics**, then pick one on each lifecycle template. Your app can also name one on a send with `"topic": "product_updates"`. Receipts and other transactional email never have a topic, because people asked for them.

Each topic is one of two kinds:

- **Everyone, until they leave.** For email people expect from you.
- **Only people who opt in.** For extras such as a beta program. It goes only to people who joined.

The unsubscribe link in a lifecycle email opens a preference page with your workspace's name on it. One button leaves the email's topic, a box per topic lets people choose what they get, and one more turns off all marketing email. A mail app's own unsubscribe button leaves just the email's topic. An email with no topic works as before: unsubscribing stops all lifecycle email to that address. Receipts and password resets still go either way.

What people choose is saved on their [customer record](/docs/guides/customer-records/) as a consent, so the CRM and the API see the same answer. Your app can record consent itself, for example from your own settings page, with `POST /v1/brands/{brand}/records/{record}/consents` (channel `email`, the topic's key, purpose `marketing`). When someone is skipped, the email shows `suppressed` and why, such as "unsubscribed from Product updates".

A topic's key never changes, because consents point at it. Archive a topic to stop new sends naming it.

## Broadcasts

A broadcast sends one published template to many people at once, such as a newsletter or a launch. Open **Lifecycle → Broadcasts** and press **New broadcast**. It opens a page with four steps, a summary and a preview of the email beside them:

1. **What kind of email is it?** Marketing, or a service message (below).
2. **Which email do you want to send?** One of your published templates of that kind.
3. **Who gets it?** Everyone subscribed to a topic, or the people in a list.
4. **Name it.** The name is only for your team. It starts as the email's name.

**Save draft and review** saves it and opens the draft, which shows how many people it goes to. Nothing goes out until you press **Send now** there, or **Schedule** it for a time in the next 30 days.

- **Who it goes to.** Everyone in a topic is the people on your [customer records](/docs/guides/customer-records/) with a verified email address who may get it. A list is any list under **Lists**: a [saved list or segment](/docs/guides/smart-lists/) or a lead list, as it is when the broadcast sends. Through the API you can also list the records yourself. A list reaches the emails in it even when they aren't verified, such as ones you imported: whoever built the list vouches for them.
- **Upload a CSV of people.** Under **Lists**, press **New list**, then **Upload a CSV of people** (step 3 of a new broadcast has the same button). The file needs an `email` column, a `user_id` column (your own id for each person) or both, and an optional `name`; you can download an example. Outflare shows which columns it found and the first rows before anything is saved. Say who they are: your own users or customers, people from a list you bought or found, or people you're not sure about. Each row is matched to someone already here by user id, then by email; only a new email makes a new person. They go into a new list, ready to send to. Through the API it's `POST /v1/brands/{brand}/records/import` (MCP `import_people`), up to 10,000 people at a time.
- **Service messages.** Pick **Service message** in step 1 for news about the service people use, such as a change or an end date, not marketing. It sends a transactional template to a list, whatever people chose about marketing, with no unsubscribe link and no hold-out. Bounced, complained and do-not-contact addresses are still never sent. Use it only for real service news.
- **Who is skipped.** For marketing: people who left the topic or all marketing email, people who never joined an opt-in topic, and prospects from lead lists who never agreed to marketing email. Cold email goes through [sequences](/docs/guides/sequences/). The broadcast lists who was skipped and why.
- **Each person gets their own copy.** Their fields fill the template, such as `{{person.first_name}}`, beside the data you set for everyone. The email carries the topic's unsubscribe link and passes the same checks as any send. Sending again never emails anyone twice.
- **Hold some people back.** Under **More options** in step 4, hold back 5, 10, 20 or 50% of the audience to measure what the email adds. That share, picked at random among the people who could get it, gets nothing. Once it has gone, the broadcast shows **Against the people held out**: who converted in the 30 days after, what they paid, how much better the people who got it did, and whether the difference is real or too early to tell.
- **Results.** Delivered, opened, clicked, unsubscribed and bounced, as counts and rates. **See its emails** opens Sent emails filtered to it. Cancel stops a scheduled or sending broadcast; emails that haven't gone yet are cancelled.
- **Recipients.** Under the results, a sent broadcast lists everyone it reached for, one row per person: whether their email was delivered, bounced (with the receiving server's reply), marked as spam, not sent or skipped (with why), and when it was sent, delivered, first opened and first clicked. The buttons above the table show one group at a time, each the people behind a number in the results, such as everyone who bounced. Search finds a person by name or address, a click on a row opens their email, and **Download CSV** saves the group you are looking at. Over the API, `GET /v1/brands/{brand}/email-broadcasts/{id}/recipients?show=bounced` lists the same (`show` is `sent`, `delivered`, `opened`, `clicked`, `bounced`, `complained`, `unsubscribed`, `not_sent` or `skipped`; `q` searches), and the MCP tool is `list_email_broadcast_recipients`.

Your app or agent can do the same with `POST /v1/brands/{brand}/email-broadcasts` and `POST .../email-broadcasts/{id}/send`, or the MCP tools `create_email_broadcast` and `send_email_broadcast`.

## Sent emails

**Sent emails** lists every email, newest first. You can filter by status, kind, recipient or test sends. Open one to see:

- what it looked like, as HTML or plain text
- its timeline: queued, handed to the provider, delivered, bounced and so on
- the template version it used, the provider's message id and your metadata

An email that is still queued or scheduled can be cancelled.

## What sent it

Each email shows what sent it: a call from your app (and whether it came from the web app, the API, MCP, the CLI, an SDK or a mission), or a test send. The **Sent by** card names the API token, person or mission behind it and links to the exact call on the **Logs** page. Filter Sent emails by **Sent by** to see only API sends, tests or broadcasts; an email from a broadcast links back to it.

## Opens and clicks

Open and click tracking are off by default, as in sequences. Turn them on per template under **Tracking**; changes apply to new sends straight away, without publishing. Your app can also turn them on or off for one send with `track: {"opens": true, "clicks": true}`.

- **Clicks** go through redirect links on your tracking domain, when you have one.
- **Opens** use an invisible image. Treat them as a rough signal: Apple Mail loads images for privacy, and some apps block them.
- **Scanners don't count.** Loads and clicks by mail scanners right after sending stay on the timeline but aren't counted.

Viewing an email in Outflare never counts as an open.

## One person's history

Select any address on an email, or search Sent emails by recipient, to see everything that address was sent: how many emails were delivered, bounced, opened and clicked, whether the address is suppressed and why, the lead with that address, and every event, newest first.

People with a [customer record](/docs/guides/customer-records/) also get each email on their record's timeline, beside what they did in your product and what they agreed to: sent, delivered, bounced, marked as spam, not sent (with why), and the first open and click. Sending to an address never creates a record, and test sends stay off it.

## Statuses

| Status | Meaning |
| --- | --- |
| `queued`, `scheduled` | Waiting to go, or waiting for its `send_at` time |
| `sent` | The provider took it |
| `delivered` | The receiving server took it |
| `delayed` | The receiving server asked to try later |
| `bounced`, `complained` | It bounced, or was marked as spam |
| `suppressed` | Not sent: the address is on your suppression list, or left the email's topic |
| `failed`, `cancelled` | The provider refused it, or you cancelled it |

## For agents and integrations

- **MCP tools:** `send_email`, `list_emails`, `list_email_topics`, `create_email_topic`, `update_email_topic`, `list_email_broadcasts`, `get_email_broadcast`, `create_email_broadcast`, `update_email_broadcast`, `send_email_broadcast`, `cancel_email_broadcast`, `get_email`, `get_email_recipient`, `cancel_email`, `get_email_overview`, plus tools for providers, domains and templates.
- **Webhook events:** `email.delivered`, `email.bounced`, `email.complained`, `email.unsubscribed`, `email.preferences_changed`, `email.opened`, `email.clicked` and the rest of the `lifecycle_email` category.
- **Scopes:** `emails.read` to read, `emails.send` to send emails and broadcasts, `emails.manage` to change providers, domains, templates and topics and to draft broadcasts.

SMS and push will join later as more channels, using the same templates, sends and events.
