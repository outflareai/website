---
title: Email providers
description: Connect Amazon SES, Postmark or Resend to send lifecycle email from your own account, with step-by-step guides and a prompt your AI agent can follow.
sidebar:
  order: 7
---

<span class="pill shipped">Shipped</span>

[Lifecycle email](/docs/guides/lifecycle-email/) goes out through your own email provider. Open **Lifecycle → Email providers** and pick one. Each has a step-by-step guide in the app.

| Provider | Best for | What you paste |
| --- | --- | --- |
| **Amazon SES** | The lowest price at volume, about $0.10 per 1,000 emails | Access key ID, secret access key and region of an IAM user with the policy the guide shows |
| **Postmark** | Fast, reliable transactional delivery | The server API token, and optionally the account API token so Outflare can add domains |
| **Resend** | The quickest setup | A Full access API key |

## Let your AI agent do it

Every guide comes with a prompt for your own AI agent, such as Claude or ChatGPT with a browser, or one that can use the AWS CLI. Copy it, or open it straight in Claude or ChatGPT. The agent:

- creates the IAM user and policy, or the Postmark server
- helps write the SES production access request
- adds the DNS records if it can reach your DNS

It **stops when it is time to create the key**. You create the key and paste it into Outflare yourself, so the secret never passes through a chat. The prompt tells the agent never to ask for the key, print it or save it.

## What Outflare sets up

When you connect, Outflare tests the key and sets up delivery events, so deliveries, bounces and complaints come back on their own:

- **Amazon SES:** a configuration set `outflare` and an SNS topic `outflare-email-events`.
- **Postmark:** a webhook on the server.
- **Resend:** a webhook. If Resend refuses, the provider page shows the URL to add and a box for the signing secret.

Hard bounces and complaints go on your suppression list.

## Sending domains

Add the domain you send from on the provider page. Outflare registers it with the provider and lists the records to add at your DNS host:

- DKIM
- SPF and bounce handling (MAIL FROM)
- a DMARC record, if you have none

There are four ways to add them, quickest first:

- **One click.** When your DNS host supports Domain Connect, press **Approve in** your DNS host and approve the exact records on its own screen, with no account connected ([how it works](/docs/guides/dns-records/)). Otherwise connect the Cloudflare account your domain is on, then press **Add the records in Cloudflare**. Outflare adds only the records that are missing, marks each one "Added by Outflare", and never changes or deletes a record. It keeps a DMARC policy you already have, and it won't add a second SPF record to a name that has one: it tells you what to merge instead. The Cloudflare connection is your own account.
- **Ask your AI agent.** Copy a prompt that lists every missing record exactly as it must be added, or open it straight in Claude or ChatGPT.
- **Send to a developer.** A ready-to-send message with the same records, from your own email.
- **Do it yourself.** Every record has copy buttons.

You don't need to tell Outflare when you're done. It asks your domain's own nameservers, so a record shows within about a minute of being added. It checks every minute for 15 minutes after you add the domain, then less often, for three days. **Check now** checks straight away and starts the every-minute checks again.

Each record shows whether it is in place. When it isn't, Outflare says what looks wrong when it can tell: a different value (shown next to the expected one), your domain typed twice in the name, a CNAME proxied by Cloudflare (switch it to DNS only), or a second SPF record. A DMARC policy you already have counts, and Outflare shows yours rather than its suggestion.

## New account limits

- **SES** starts in a sandbox: verified recipients only, 200 emails a day. The guide walks you through requesting production access, which AWS usually grants within a day.
- **Postmark** sends only to your own domain until it approves the account.
- **Resend's** free plan allows one domain and 100 emails a day.

## More than one provider

The first provider you connect is the default. A provider can be limited to transactional or lifecycle email, paused, or tied to a brand. To change the key or remove a provider, go to **Settings → Connectors**.
