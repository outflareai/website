---
title: SPF, DKIM and DMARC explained · Outflare
description: What SPF, DKIM and DMARC are, how email authentication works, what Gmail, Yahoo and Outlook require from senders, and how to check your DMARC record.
h1: SPF, DKIM and DMARC explained.
label: SPF, DKIM and DMARC
term: DMARC
lede: SPF, DKIM and DMARC are the three DNS records that prove your email really comes from your domain. Here is what each does, what the big mailbox providers require, and how to check yours.
answer: "SPF, DKIM and DMARC are email authentication standards published as DNS records on your domain. SPF lists the servers allowed to send for the domain, DKIM adds a signature that proves a message wasn't changed and came from the domain, and DMARC tells receivers what to do when a message fails and asks for reports. Gmail, Yahoo and Outlook require all three from bulk senders."
points:
  - SPF is a TXT record starting v=spf1; only one per name
  - DKIM is a public key under a selector, such as google._domainkey
  - DMARC is a TXT record at _dmarc with a policy of none, quarantine or reject
  - Gmail requires SPF, DKIM and DMARC from senders of 5,000+ messages a day
docs:
  - label: Sending domains
    href: /docs/guides/sending-domains/
  - label: Add DNS records in one click
    href: /docs/guides/dns-records/
  - label: Mailbox health
    href: /docs/guides/mailbox-health/
  - label: Email providers
    href: /docs/integrations/email-providers/
faqs:
  - q: What is DMARC in simple terms?
    a: DMARC is a DNS record that tells mailbox providers what to do with mail that claims to be from your domain but fails SPF and DKIM checks (nothing, spam folder or reject), and where to send reports about it.
  - q: Do I need SPF, DKIM and DMARC?
    a: Yes, if you send email at any volume. Google requires SPF or DKIM from every sender to Gmail, and SPF, DKIM and DMARC from senders of 5,000 or more messages a day. Yahoo and Microsoft's Outlook.com have similar rules for bulk senders.
  - q: What DMARC policy should I use?
    a: Start with p=none to collect reports without affecting delivery; Google and Yahoo accept p=none for bulk senders. Move to quarantine and then reject once reports show all your legitimate mail passes.
  - q: How do I check my DMARC record?
    a: Look up the TXT record at _dmarc.yourdomain, for example _dmarc.example.com, with any DNS lookup tool. Outflare checks SPF, DKIM, DMARC and blocklists for every sending domain daily and shows the exact fix.
  - q: Can I have two SPF records?
    a: No. A domain name should have exactly one v=spf1 record. Two records make SPF fail. Merge every sending service into one record instead.
  - q: What does alignment mean in DMARC?
    a: The domain in the visible From address must match the domain that passed SPF or DKIM. Google and Yahoo require this alignment from bulk senders.
related:
  - /product/deliverability/
  - /glossary/email-warmup/
  - /product/cold-email/
  - /product/lifecycle-email/
  - /best/email-warmup-tools/
  - /best/cold-email-software/
checked: 2026-11-09
updated: 2026-11-09
order: 50
---

## How each one works

### SPF (Sender Policy Framework)

A TXT record on your domain that lists which servers may send its mail. A receiving server checks the sending server against the list. Defined in [RFC 7208](https://www.rfc-editor.org/rfc/rfc7208).

```text
example.com.  TXT  "v=spf1 include:_spf.google.com ~all"
```

`include:` adds a provider's servers, and `~all` (soft fail) or `-all` (fail) says what to do with everyone else. A name should have exactly one SPF record.

### DKIM (DomainKeys Identified Mail)

Your mail server signs each message with a private key; the public key sits in DNS under a selector, such as `google._domainkey.example.com`. A receiver checks the signature to confirm the message came from the domain and wasn't changed. Defined in [RFC 6376](https://www.rfc-editor.org/rfc/rfc6376).

### DMARC (Domain-based Message Authentication, Reporting and Conformance)

A TXT record at `_dmarc` that ties SPF and DKIM to the address people see in the From line, sets a policy for mail that fails, and asks for reports. Now defined in [RFC 9989](https://www.rfc-editor.org/info/rfc9989), a Proposed Standard that replaces the original RFC 7489.

```text
_dmarc.example.com.  TXT  "v=DMARC1; p=none; rua=mailto:dmarc@example.com"
```

| Policy | What receivers do with failing mail |
| --- | --- |
| `p=none` | Deliver as usual, and report |
| `p=quarantine` | Treat as suspicious, usually the spam folder |
| `p=reject` | Refuse it |

## What mailbox providers require

| Provider | All senders | Bulk senders |
| --- | --- | --- |
| [Gmail](https://support.google.com/a/answer/81126) | SPF or DKIM, valid forward and reverse DNS, TLS, spam rate below 0.3% | 5,000+ messages a day: SPF and DKIM, DMARC (p=none is fine), From aligned with SPF or DKIM, one-click unsubscribe for marketing mail |
| [Yahoo](https://senders.yahooinc.com/best-practices/) | SPF or DKIM, spam rate below 0.3%, valid DNS | SPF and DKIM, DMARC of at least p=none that passes, alignment, one-click unsubscribe honoured within 2 days |
| [Outlook.com](https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730) | | Over 5,000 emails a day: SPF, DKIM and DMARC of at least p=none, aligned with SPF or DKIM |

Checked on each provider's own pages in November 2026. Google also recommends a DKIM key of 2048 bits where your provider supports it.

## Why it matters

Without these records, mailbox providers can't tell your mail from someone forging your domain, so they treat it with suspicion or refuse it. For cold email, one broken record can hurt every mailbox on the domain. For product email, it can send receipts and password resets to spam.

## How to check and fix them

The free [SPF, DKIM and DMARC checker](/tools/dmarc-checker/) reads all three for any domain and gives the exact record to add for anything missing.


Outflare checks every [sending domain](/docs/guides/sending-domains/) when it is added and again every day:

- **SPF:** exactly one `v=spf1` record, including your provider, ending in `~all` or `-all`.
- **DKIM:** a key under your provider's selector or a common one.
- **DMARC:** a `v=DMARC1` record at `_dmarc`, and its policy.
- **MX and blocklists:** where replies go, and the Spamhaus DBL and SURBL.

Each problem comes with the exact fix, and [mailbox health](/docs/guides/mailbox-health/) grades every mailbox on its domain's setup. To add missing records, the [one-click button](/docs/guides/dns-records/) lets you approve them on your DNS host's own screen, or adds them through your own Cloudflare account. It adds only what is missing, keeps a DMARC policy you already have, and won't add a second SPF record.

Authentication is the floor, not the whole job. New mailboxes also need [warm-up](/glossary/email-warmup/) before they send cold email. See [deliverability](/product/deliverability/).
