---
title: "Transactional email via SES, Postmark or Resend · Outflare"
description: "Send receipts, password resets and onboarding email from your own Amazon SES, Postmark or Resend account, with versioned templates, topics and broadcasts."
h1: "Product email from your own SES, Postmark or Resend."
label: Lifecycle email
lede: "Write receipts, sign-in codes and onboarding emails once as templates, send them from your app by handle, and see every delivery, bounce and unsubscribe, through the email provider account you already pay for."
answer: "Outflare sends lifecycle and transactional email (receipts, password resets, sign-in codes, onboarding and newsletters) through your own Amazon SES, Postmark or Resend account. You write each email once as a versioned template, send it from your app with one API call, and Outflare handles suppression, unsubscribe topics, delivery events and broadcasts. Cold outreach never goes this way; it stays on sequences."
points:
  - "Amazon SES, Postmark or Resend, on your own account"
  - "Versioned templates your app sends by handle"
  - "Topics, a preference page and one-click unsubscribe"
  - "Broadcasts with a random holdout to measure what they add"
docs:
  - label: Lifecycle email
    href: /docs/guides/lifecycle-email/
  - label: Email templates
    href: /docs/guides/email-templates/
  - label: Email providers
    href: /docs/integrations/email-providers/
  - label: Journeys
    href: /docs/guides/journeys/
faqs:
  - q: "Which email providers does Outflare work with?"
    a: "Amazon SES, Postmark and Resend. You connect your own account with its key, Outflare sets up delivery events for you, and you pay the provider directly."
  - q: "What is the difference between transactional and lifecycle email in Outflare?"
    a: "Transactional email (receipts, password resets, sign-in codes) reaches people even after they unsubscribe from updates, because they need it. Lifecycle email (onboarding, tips, newsletters) carries a one-click unsubscribe link and skips anyone who left its topic."
  - q: "How do I send an email from my app?"
    a: "Publish a template, then POST to /v1/brands/{brand}/emails with the recipient, the from address, the template's handle and its data, using an API token with the emails.send scope. Send an Idempotency-Key and a retry never sends twice."
  - q: "Can I send a newsletter or launch announcement?"
    a: "Yes, as a broadcast. Pick a published template and its topic, and it goes to everyone on your customer records who may get that topic, each with their own copy. You can hold back 5 to 50% at random to see what the email added."
  - q: "Can I use it for cold email?"
    a: "No. Prospects from lead lists who never agreed to marketing email are skipped. Cold email goes through Outflare's sequences, from your own mailboxes."
related:
  - /product/journeys/
  - /product/customer-data/
  - /product/cold-email/
  - /product/deliverability/
  - /product/consent/
updated: 2026-11-09
order: 79
---

## How it works

1. **Connect an email provider.** Amazon SES, Postmark or Resend, each with a step-by-step guide in the app and a prompt your own AI agent can follow. The agent stops before the key is created, so you paste it yourself and the secret never passes through a chat.
2. **Verify the domain you send from.** Outflare lists the DKIM, SPF and DMARC records to add and checks for them every minute.
3. **Hear about deliveries, bounces and complaints.** Delivery events are set up when you connect: a configuration set and SNS topic on SES, a webhook on Postmark or Resend.
4. **Send a test** to yourself.
5. **Send from your app** with an API token that has the `emails.send` scope.

| Provider | Best for (from the docs) |
| --- | --- |
| Amazon SES | The lowest price at volume |
| Postmark | Fast, reliable transactional delivery |
| Resend | The quickest setup |

## Templates, written once

A template is an email you send many times by its handle, such as `password-reset`. Start from blank, password reset, sign-in code, receipt or welcome.

- **Drafts and versions.** Editing changes a draft; **Publish** makes it the next version with a note. A half-finished edit never reaches customers, and your app can pin a version.
- **Variables** with fallbacks (`{{first_name|there}}`), objects (`{{user.plan}}`), conditionals and `{{unsubscribe_url}}`. A required variable that's missing refuses the send and names what's missing.
- **Preview** as desktop, phone or plain text while you type, and **Send a test**.

```sh
curl -X POST "https://app.outflare.ai/v1/brands/$BRAND/emails" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" \
  -H "Idempotency-Key: $(uuidgen)" \
  -d '{"to": "ana@customer.example", "from": "Acme <billing@acme.example>",
       "template": "password-reset", "data": {"reset_url": "https://app.acme.example/r/abc"}}'
```

Sends run on their own queue, so a password reset never waits behind a big broadcast.

## What keeps you safe

- **Suppression.** Every recipient passes your suppression list first; hard bounces and spam complaints are added on their own.
- **Topics and a preference page.** Topics are what people choose to get, such as product updates or a beta program, either "everyone until they leave" or "only people who opt in". The unsubscribe link opens a preference page, and each choice is saved as a consent on the person's [customer record](/product/customer-data/).
- **Verified domains only.** The `from` address must be on a domain verified with the provider.
- **Agents ask first.** Emails that Outflare's built-in agent wants to send wait for a person to approve them.

## Broadcasts

A broadcast sends one published template to many people, such as a newsletter or a launch. Nothing goes out until you press **Send now** or schedule it within 30 days. It skips people who left the topic, never joined an opt-in topic, or are prospects who never agreed to marketing email, and lists who was skipped and why.

**Hold out** keeps 5, 10, 20 or 50% of the audience, picked at random, from getting it. Afterwards the broadcast shows **Against the people held out**: who converted in the 30 days after, what they paid, and whether the difference is real or too early to tell.

## See every email

**Sent emails** lists every email with its rendered content, its timeline (queued, sent, delivered, bounced) and what sent it: the API token, person or mission, linked to the exact call. Each person's emails also show on their customer record. Open and click tracking are off by default and turned on per template; opens are a rough signal, and mail scanners' clicks aren't counted.

For automated flows such as onboarding or win-back, send these templates from a [journey](/product/journeys/).

## For agents

The MCP server has `send_email`, `list_emails`, the topic and broadcast tools, `get_email_overview`, and tools for providers, domains and templates. Webhooks cover `email.delivered`, `email.bounced`, `email.complained`, `email.unsubscribed`, `email.opened` and more.

## What Outflare doesn't do

- It doesn't send from an account of its own. Every email goes through your provider, billed to you.
- It isn't for cold email, which runs as [sequences](/product/cold-email/) from your own mailboxes.
- SMS and push aren't there yet; the docs list them as later channels.
