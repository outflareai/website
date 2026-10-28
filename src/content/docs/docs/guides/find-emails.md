---
title: Find emails
description: Propose a likely work email for a person at a company, and check an address, learned from your own contacts with a cheapest-first waterfall.
sidebar:
  order: 6.7
---

<span class="pill shipped">Shipped</span> The email finder proposes a likely work email for a person at a company, and checks whether an address is good to send to. It learns the address shape each company uses from your own contacts and their verification results, so it works best on companies you already have people at. Finding is free; checking an address uses your own connected verifier only when it has to.

Everything here is scoped to one workspace. A company's email shape is learned from, and used for, that workspace alone — nothing is shared between workspaces, and Outflare never supplies a key for any of it.

## In the web app

Open **CRM → Email finder**. There are three things on the page:

- **Find a work email** — enter a first name, last name and the company's website domain. You get a proposed address with a confidence score and where it came from: a known address at that domain, the domain's learned shape, or a best guess when little is known yet.
- **Check an address** — run one address through the waterfall: free built-in checks first, then your own connected verifier only if the address can't be settled for free. The result says whether any provider spend was used.
- **Domain email pattern** — the shape a company's addresses take (for example `first.last` or `flast`), the mail provider, whether the domain is catch-all, and how many of your own contacts the shape was learned from.

## Over the API

All three are per-workspace endpoints. Finding needs `leads.read`; checking needs `leads.manage`.

```bash
# The shape a domain uses, with a confidence. Free.
curl -H "Authorization: Bearer $TOKEN" \
  "https://app.outflare.ai/v1/workspaces/{ws}/email-finder/pattern?domain=acme.example"

# Propose addresses for a batch of people (up to 50). Free.
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  "https://app.outflare.ai/v1/workspaces/{ws}/email-finder/find" \
  -d '{"items":[{"ref":"1","first_name":"Alice","last_name":"Nguyen","domain":"acme.example"}]}'

# Check a batch of addresses (up to 50) through the waterfall.
curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  "https://app.outflare.ai/v1/workspaces/{ws}/email-finder/verify" \
  -d '{"items":[{"ref":"1","email":"alice.nguyen@acme.example"}]}'
```

Each result echoes your own `ref` back, so match results to your inputs by `ref` rather than by position. Every result carries a `code` (`found`, `verified`, `risky`, `not_found`, `undeliverable`, `pending`, `retry` or `stop`) that tells an automated caller what to do next, and a `confidence` from 0 to 100.

## For agents

Through [MCP](/docs/agents/mcp/) the same three are `email_pattern`, `find_emails` and `verify_addresses`. Ask your connected AI something like "find the work email for Alice Nguyen at acme.example", and it uses them.

## What it never does

It never shares one workspace's data with another, and it never uses an Outflare-provided key: the verifier it rolls up to is always the account you connected. Every third-party service in Outflare runs on your own connected account.
