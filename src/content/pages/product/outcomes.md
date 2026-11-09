---
title: Cost per meeting and marketing ROI tracking · Outflare
description: See the meetings, deals and revenue your marketing produced, what it cost, and the cost per meeting by sequence and brand, from your calendar, CRM and Stripe.
h1: Know what each meeting and each sale cost you.
label: Outcomes
lede: Sends and replies say whether outreach is working. Outcomes says what each meeting cost, which sequence and brand got it cheapest, and which channel brought the revenue, from your own calendar, CRM, Stripe and spend.
answer: Outflare's Outcomes page shows the meetings and deals your outreach produced, everything you spent to get them, and the cost per reply, per meeting, per held meeting and per won deal, for the whole workspace or by sequence or brand. Meetings come from Google Calendar, Outlook, Calendly, Cal.com or HubSpot, revenue from Stripe, and channel attribution credits sign-ups and payments with the model you choose. Outflare records costs; it never bills.
points:
  - Cost per meeting by sequence and brand
  - Meetings from your calendar, deduplicated across tools
  - Five attribution models, one credit everywhere
  - Revenue from Stripe on each customer's record
docs:
  - label: Outcomes and cost per meeting
    href: /docs/guides/outcomes/
  - label: Channels and attribution
    href: /docs/guides/attribution/
  - label: Revenue from Stripe
    href: /docs/guides/revenue-from-stripe/
  - label: Calendars and HubSpot
    href: /docs/integrations/calendars-and-hubspot/
faqs:
  - q: How is cost per meeting calculated?
    a: Outflare adds up everything recorded in the spend ledger for the period, such as lead data, verification, mailboxes, domains, software and people, shares it across sequences, and divides by the meetings each sequence produced. Charges tagged with a sequence count for it, mailbox and domain costs follow the sequences that sent from them, and the rest is shared by emails sent.
  - q: How does Outflare know a meeting came from outreach?
    a: A meeting counts for the last sequence that emailed one of its attendees before the booking. If no attendee is a lead but one works at a company you emailed, it counts for that lead's sequence. Otherwise it is listed as not from outreach, and you can correct any meeting by hand.
  - q: Which attribution models does it support?
    a: Last non-direct touch (the default), first touch, linear, 40/20/40 and time decay. Every report, channel and ad uses the same credit, so the numbers add up the same way everywhere.
  - q: Does Outflare change anything in Stripe or my calendar?
    a: No. Calendars, HubSpot and Stripe are read only, apart from optionally adding meetings booked from outreach to HubSpot, which is off by default. Only calendar events with a lead among the attendees are stored.
  - q: Can I measure marketing ROI per channel?
    a: Yes. Channels shows visits, conversions, revenue and cost for each channel, with cost per conversion and the return on each channel when cost and revenue are in one currency. Currencies are never converted.
related:
  - /product/cold-email/
  - /product/customer-data/
  - /product/analytics/
  - /product/paid-media/
  - /product/agents/
  - /compare/outflare-vs-hubspot/
updated: 2026-11-09
order: 60
---

## What the Outcomes page shows

For any period, for the whole workspace or by sequence or [brand](/product/brands/):

| Number | From |
| --- | --- |
| Emails sent and replies | Your sequences |
| Meetings, held meetings, no-shows, qualified meetings | Calendars, booking tools, HubSpot, or logged by hand |
| Deals, deals won, pipeline and won amounts | Outflare's own CRM and HubSpot |
| Spend by category | The spend ledger |
| Cost per reply, meeting, held meeting and won deal | All of the above |

The report also lists usage that has no price yet, meetings not tied to outreach, and notes on any number that is estimated or shared. Export meetings, deals, spend or the report as CSV or NDJSON for a warehouse.

## Where meetings come from

- **Google Calendar, Outlook, Calendly and Cal.com**, read every 15 minutes. Only events with a lead among the attendees are stored; the rest of your calendar is never copied.
- **HubSpot** meetings, with their outcome.
- **By hand or by an agent**, with **Log meeting** or the `log_meeting` tool.

The same meeting seen in two tools is counted once. A meeting is credited to the last sequence that emailed one of its attendees, or a colleague of theirs at the same company domain, never a free-mail domain. Fix any meeting on the Meetings tab, and a later sync never overwrites your choice.

## The spend ledger

Every charge is one row: what it was for (lead data, verification, mailboxes, domains, sending, software, people, ads, other), the provider, the amount or the units used, and who caused it, a person, an API token or an agent.

- **Money or units.** Record $99 for a data export, or 2,400 credits when you don't know the price yet, then set a price per unit.
- **Recurring costs**, such as mailbox seats or an SDR's time, spread over the days they were active.
- **Recorded for you.** Data provider credits from [lead lists](/product/leads/) and paid calls from [SEO](/product/seo/) tools go into the ledger on their own.
- **Safe to retry.** Send a `ref` and recording the same charge twice keeps the first one.

## Attribution: which channel gets the credit

Channels shows where your visits, sign-ups and revenue come from, and what each channel costs. Each visit recorded by [website tracking](/docs/guides/website-tracking/) gets a channel from its campaign link, referral code, ad click id, UTM tags or referrer, including **AI answers** for visits from assistants such as ChatGPT and Perplexity.

| Model | Who gets the credit |
| --- | --- |
| Last non-direct touch (default) | The last visit that wasn't direct |
| First touch | The first visit |
| Linear | Every visit equally |
| 40/20/40 | 40% first, 40% last, 20% shared by the rest |
| Time decay | Each week before the conversion counts half as much |

Credit rolls up from people to companies, and won deals are spread across channels in proportion to the credit their people earned. **Identified people only** counts only visits tied to a known person. Attribution runs inside Outflare and calls no third-party service.

## Revenue from Stripe

Connect Stripe with a read-only sign-in or a restricted key, and each customer becomes a person in your [customer records](/product/customer-data/), with every payment, refund, plan change and cancellation on their timeline, and their plan, monthly revenue, lifetime revenue, first payment date and billing status on their record. Outflare never charges, refunds or changes anything in Stripe.

## For agents

Agents read `get_outcomes_report`, `list_meetings`, `list_deals` and `get_attribution_channels` in the [MCP server](/product/mcp/), and an agent that buys a list or a batch of verifications calls `record_spend` with a `ref`, so its cost shows against the mission or sequence it was working on. A [mission](/product/agents/) can aim at revenue credited to its campaigns, or at won deals.

## What Outflare doesn't do

- It never bills. You pay your providers directly, and Outflare only records what was spent.
- It never converts currencies. Spend and revenue in other currencies are listed separately, never dropped.
