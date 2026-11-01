---
title: Lead finder
description: Find companies that fit your ideal customer profile, the people to contact there and their work email, add them to your CRM and a campaign, and see what it costs per meeting.
sidebar:
  order: 6.6
  badge:
    text: Cloud
    variant: note
---

<span class="pill cloud">Outflare Cloud</span> The lead finder finds companies that fit your [ideal customer profile](/docs/guides/ideal-customers/), the people to contact there and their work email. It adds them to your [customer records](/docs/guides/customer-records/), and, if you choose, to a [campaign](/docs/guides/sequences/). Then it shows what came of it: replies, meetings, and what each one cost.

It runs only in Outflare Cloud, at [app.outflare.ai](https://app.outflare.ai/). Open **CRM → Lead finder**.

## Your own accounts

Every search, page read, AI call, people search and address check runs on accounts your workspace connects on the [Connectors](/docs/integrations/connectors/) page. The providers bill you directly. Outflare never lends a key, and a search pauses and says which connection to add when one is missing.

- **Web search and page reading:** a web data connection such as Geonode, to find companies and read their websites.
- **AI:** your own AI connection, to plan the searches and check each company against your profile. Its calls show as "Lead finder" on [AI usage](/docs/guides/ai-usage/), where you can give it a limit of its own.
- **People search** (optional): a data provider connection, to find the people at each company.
- **Email checks** (optional): your own [email verifier](/docs/integrations/email-verification/). Without one, addresses get the free built-in checks.

## Start a search

1. Pick an ideal customer profile, or write one.
2. Say how many companies you want, and how much the AI may spend on the search.
3. Choose where the people go: your CRM only, or a campaign as well.

The lead finder searches, reads each company's website, and keeps the ones that fit. You can review the companies it isn't sure about before it looks for people there. Every company and person it adds checks your [opt-out and contact rules](/docs/guides/who-can-be-emailed/) first.

## Campaigns

Each search can send its people into one of your sequences. By default you approve people before they're added. You can let it add people whose address was confirmed on its own; people whose address nothing confirmed always wait for you.

The sequence's own daily new-lead limit and sending hours pace the emails. While the campaign already has enough people waiting, the lead finder stops searching, so you don't pay for people who would go stale.

## Pause, resume and what needs you

The lead finder's front page starts with what needs you:

- companies to review;
- people ready for the campaign;
- a search that paused, and why;
- a search waiting for its campaign to catch up.

Pause a search at any time and resume it later. A search pauses on its own when a connection fails or runs out, and says what to fix.

Big searches are built for thousands of companies and tens of thousands of people. Lists come a page at a time, with filters and counts by state, and you can approve, skip or add people in bulk.

## Results and cost

For each search, and in total for a period, the lead finder shows:

- companies found, how many fit, and how many were added;
- people found, and how many have an email address;
- people in campaigns, replies, and meetings booked.

A meeting counts when a person the lead finder found books one after it found them, and it isn't cancelled. It doesn't matter whether it came from a connected calendar, a booking tool or was logged by hand. Each person counts once.

A search's **Spend** tab shows what it cost on your own accounts: AI, web search, data provider credits and email verifier credits. Credits are priced at the rates you set in [Outcomes](/docs/guides/outcomes/), on the Spend tab, the same prices your other reports use. The lead finder adds them to what it spent, and to the cost per meeting or per person. When a provider's credits have no price yet, the page names it and counts its credits as nothing until you set one. A recent check of an address that your verifier already made costs nothing, and neither do the free built-in checks.
