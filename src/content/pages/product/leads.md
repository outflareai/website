---
title: Email finder and B2B lead lists · Outflare
description: Build B2B lead lists from your own Apollo or People Data Labs account, find and verify work emails cheapest first, and score leads against your ideal customer.
h1: Lead lists and an email finder on your own data accounts.
label: Leads
lede: Import leads from any CSV, or build lists from a search at a data provider you already pay for. Outflare finds emails through a waterfall of providers, verifies them, scores each lead against your ideal customer and leaves out anyone you shouldn't contact.
answer: Outflare builds B2B lead lists and finds work emails using your own data provider accounts. Search Apollo, People Data Labs or MoltSets for people, find missing emails through a waterfall of providers so you only pay the next one for people the first missed, verify the addresses, and score every lead against your ideal customer profile. A free email finder also proposes likely addresses from the patterns your own contacts use.
points:
  - Free preview of ten people before any credits are spent
  - Email waterfall across seven providers, cached for 180 days
  - Free built-in verification, or your own verifier
  - Suppression and recent contact checks across every list
docs:
  - label: Lead lists
    href: /docs/guides/lead-lists/
  - label: Find emails
    href: /docs/guides/find-emails/
  - label: Import leads
    href: /docs/guides/import-leads/
  - label: Ideal customers
    href: /docs/guides/ideal-customers/
  - label: Email verification
    href: /docs/integrations/email-verification/
faqs:
  - q: Does Outflare have its own email finder?
    a: Yes. The email finder proposes a likely work email from a person's name and company domain, with a confidence score, using the address shape that company uses in your own contacts. Finding is free, and checking an address uses your own connected verifier only when the free checks can't settle it.
  - q: Does Outflare sell lead data?
    a: No. Outflare never sells or stores contact data of its own. Every person comes from your own Apollo, People Data Labs, MoltSets or other provider account, and the provider bills you directly.
  - q: Which data providers can I connect?
    a: Apollo, People Data Labs and MoltSets search for people and find emails. Prospeo, LeadMagic, Findymail and Hunter find emails. For verification, ZeroBounce, NeverBounce, MillionVerifier, Bouncer, Reoon, Emailable, DeBounce or Hunter.
  - q: How do I import a lead list from a CSV?
    a: Open Leads, choose the file and press Import, or post it to the API. Only an email column is needed, files can have up to 100,000 rows, and exports from Apollo, Clay or HubSpot import unchanged. Duplicates are merged, and anyone on the suppression list is counted and never emailed.
  - q: Can Outflare find companies that fit my ideal customer for me?
    a: The Lead finder does that in Outflare Cloud. It finds companies that fit your ideal customer profile, the people to contact there and their work email, on accounts your workspace connects. Lead lists, the email finder and verification are open source.
related:
  - /product/cold-email/
  - /product/customer-data/
  - /product/website-visitors/
  - /compare/outflare-vs-apollo/
  - /alternatives/apollo/
  - /best/cold-email-software/
updated: 2026-11-09
order: 37
---

## Three ways to get leads

1. **Import a CSV.** Only an email column is required. Standard columns are recognised under the names Apollo, Clay, HubSpot and spreadsheets use, files can be up to 50 MB and 100,000 rows, and duplicates are merged. See [Import leads](/docs/guides/import-leads/).
2. **Build a list from a search** at a data provider you already pay for, with refreshes on a schedule. See [Lead lists](/docs/guides/lead-lists/).
3. **Add them from code or an agent**, through the API or the [MCP server](/product/mcp/).

Every lead is also a person in your [customer records](/product/customer-data/), so cold email, replies, meetings and deals all point at the same person.

## Build a list from a search

| Provider | Search people | Find emails |
| --- | --- | --- |
| Apollo | Yes | Yes |
| People Data Labs | Yes | Yes |
| MoltSets | Yes | Yes |
| Prospeo, LeadMagic, Findymail, Hunter | | Yes |

1. **Pick who to find**: job titles, seniority, company size, industries, locations, domains and keywords, or copy them from an [ideal customer profile](/docs/guides/ideal-customers/).
2. **Preview** ten people and the total number of matches. Nothing is saved and no credits are spent.
3. **Choose the email waterfall.** Providers are asked in order until one returns an email, and results are cached for 180 days, so a refresh never pays twice for the same person.
4. **Set guard rails**: most leads per run, a credit cap per run, a minimum fit score (checked before credits are spent), verification, and who to leave out.
5. **Build, then refresh**, by hand or every N days. People already in the list are skipped for free.

Each run reports what it found and added, what it left out and why, and the credits it spent per provider. Credits go into the spend ledger, so [cost per meeting](/product/outcomes/) includes your data costs.

## Find and check work emails

**CRM → Email finder** has three tools:

- **Find a work email** from a first name, last name and company domain, with a confidence score and where it came from.
- **Check an address** through a waterfall: free built-in checks first, then your own verifier only if needed.
- **Domain email pattern**: the shape a company's addresses take, such as `first.last`, its mail provider, and whether it is catch-all.

Patterns are learned only from your own workspace's contacts and their verification results, and never shared with another workspace. See [Find emails](/docs/guides/find-emails/).

## Verification before the first email

Every lead's address is checked before its first email, and undeliverable addresses are never emailed. With nothing connected, Outflare runs free checks for syntax, mail servers, about 13,000 throwaway domains and role addresses. Connect ZeroBounce, NeverBounce, MillionVerifier, Bouncer, Reoon, Emailable, DeBounce or Hunter for a full mailbox check. Each address is **deliverable**, **undeliverable**, **risky** or **unknown**, and you choose whether risky and unknown addresses are emailed. See [Email verification](/docs/integrations/email-verification/).

## Ideal customer profiles

Describe who you sell to once, in words and as filters. Lead lists score every person against the profile, so low-fit leads are left out before you pay to find their emails, and agents read the same description. A profile can belong to one [brand](/product/brands/) or fit them all.

## Who never gets emailed

A list build leaves out anyone on the suppression list, anyone emailed in the last 90 days (you can change it), and anyone already in an active sequence, across every list and campaign in the workspace. The [policy check](/docs/concepts/policy-check/) then checks every recipient again before each email.

## Lead finder in Outflare Cloud

<span class="pill cloud">Outflare Cloud</span> The [Lead finder](/docs/guides/lead-finder/) finds companies that fit your ideal customer profile, the people to contact there and their work email, adds them to your customer records and, if you choose, to a sequence, then shows the replies, meetings and cost per meeting that came of it. It runs on accounts your workspace connects, such as a web data connection, your own AI model and your own data provider, and it pauses and says which connection to add when one is missing.

## What Outflare doesn't do

- It doesn't sell or store contact data of its own.
- It never uses an Outflare-provided key for finding or verifying. You pay your providers directly.
