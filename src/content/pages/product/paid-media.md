---
title: "Paid ads reporting and management across networks · Outflare"
description: "Spend, clicks and conversions from Google, Meta, LinkedIn, TikTok and more in one place, conversions sent back, and suggestions and tests you approve."
h1: "Every ad network in one place, with changes you approve."
label: Paid media
lede: "Outflare reads what your ad accounts spend and what they bring in, per brand, sends your own conversions back to the platforms, and suggests budget, pause and keyword changes that a person approves and Outflare then measures."
answer: "Outflare connects to your own ad accounts on Google Ads, Meta, Microsoft Advertising, LinkedIn, TikTok, Reddit, X, Snapchat, Pinterest, Amazon, Apple Ads, Taboola and Outbrain, and shows spend, clicks and platform conversions next to the visits and revenue its own attribution credits to each campaign. It sends conversions back to the platforms, suggests budget, pause and keyword changes, runs fair tests, and drafts new ads, and every change that could spend more waits for a person. All of this is open source; only Paid ads Autopilot, which applies savings on its own, is Outflare Cloud."
points:
  - "13 ad platforms, synced every six hours, per brand"
  - "Platform numbers beside Outflare's own attribution"
  - "Suggestions are measured and judged Worked or Didn't work"
  - "Your own ad accounts and tokens; nothing spends until you turn it on"
docs:
  - label: Paid media
    href: /docs/integrations/paid-media/
  - label: Website tracking
    href: /docs/guides/website-tracking/
  - label: Channels and attribution
    href: /docs/guides/attribution/
  - label: Open source and Cloud
    href: /docs/project/open-source-and-cloud/
faqs:
  - q: "Which ad platforms does Outflare support?"
    a: "Google Ads, Meta Ads, Microsoft Advertising, Reddit Ads, X Ads, LinkedIn Ads, TikTok Ads, Snapchat Ads, Taboola, Outbrain, Apple Ads, Amazon Ads and Pinterest Ads, each connected with the workspace's own sign-in or credentials. Campaign changes work on Google Ads, Meta, Microsoft Advertising, LinkedIn and TikTok; the others are read only for now."
  - q: "Can Outflare change my campaigns on its own?"
    a: "Only within limits you set. A person approves suggestions; an agent can pause campaigns under its grant, but raising a budget by more than a fifth, targeting changes and anything over its spend caps wait for a person. On Outflare Cloud, Paid ads Autopilot can apply only the savings you tick (lower budgets, pauses, negative keywords) up to a daily limit."
  - q: "Does Outflare send offline conversions back to Google and Meta?"
    a: "Yes. A conversion rule sends a customer event, such as a sign-up or a payment, to a conversion on Google Ads, Meta, Microsoft Advertising, Reddit, TikTok, Snapchat, Taboola or Pinterest. Email and phone are hashed with SHA-256 before they leave, and consent rules apply in the EEA, the UK and Switzerland."
  - q: "Are the conversions the platform's or Outflare's?"
    a: "Both are shown, never added together. Each campaign shows the platform's own conversion count and, beside it, the visits, conversions and revenue Outflare's own attribution credits to it through its tracking template."
  - q: "Does Outflare create ads?"
    a: "It can draft them. The brand agent or a person writes a draft ad, ad group or Google search campaign; a person approves it, Outflare creates it paused on your account, and nothing spends until a person presses Turn on."
related:
  - /product/analytics/
  - /product/outcomes/
  - /product/agents/
  - /product/journeys/
  - /product/consent/
  - /product/brands/
updated: 2026-11-09
order: 77
---

## What it reads

Connect each ad account with your own sign-in, or with your own developer credentials where the platform needs them. Outflare never provides an ad account or an API token, and a platform stays off until you connect it.

A sync runs every six hours. The first reads 90 days, later ones re-read recent days because platforms revise them. It stores:

- **Ad accounts**, each assigned to a brand or shared, with currency and time zone.
- **Campaigns**, and for Google Ads and Meta their ad groups or ad sets and ads, with headlines, landing pages and tracking.
- **Daily metrics**: spend, impressions, clicks and the platform's own conversions and value.
- **Google search keywords and search terms**, with the keyword each search matched.
- **Spend in the costs ledger**, so paid ads sit beside every other cost in [Outcomes](/product/outcomes/).

Open **Paid ads** to see all networks, one network or one account, with campaigns ranked by spend, cost per click, cost per conversion and platform ROAS, each against the brand's own target and its trend. Money is shown in each account's currency and never converted.

## What each campaign really brought

Platform conversions use each platform's own attribution window, so they don't add up across networks. Outflare puts its own count beside them: the visits that came through each campaign (matched by the ids its tracking template put on the landing page), and the conversions and revenue [attribution](/docs/guides/attribution/) credits to those visits. A campaign with spend and no tracked visits is listed too, because it usually has no tracking template yet. On Google Ads, **Fix tracking links** shows each URL suffix it would change and adds the template when you confirm.

## Send conversions back

A conversion rule sends one customer event, such as `signed_up` or `payment.succeeded`, to one conversion on one ad account, so the platform's bidding learns from real sign-ups and sales.

| Platform | Where it goes |
| --- | --- |
| Google Ads | A conversion action that takes uploaded clicks, plus enhanced conversions for leads |
| Meta Ads | A pixel (dataset), as a standard event such as Purchase or Lead |
| Microsoft Advertising | An offline conversion goal |
| Reddit, TikTok, Snapchat, Pinterest | Each platform's Conversions or Events API |
| Taboola | An event-based conversion, server to server |

Email and phone are hashed before they leave. In the EEA, the UK and Switzerland, and when the country is unknown, a conversion is sent only when the person said yes to ad data. On Google Ads, refunds adjust or retract the conversion that was sent.

## Suggestions, measured

After each sync Outflare suggests at most one change per campaign it can change, with why and the numbers behind it: raise or lower the budget, pause a campaign that spends with no conversions, or resume one that converted well. On Google search campaigns it also suggests keywords to add, negative keywords and keywords that deserve their own ad group, and a target cost per conversion for campaigns ready for one.

Nothing changes until a person approves. Each approved change gets a measuring window and is then judged **Worked**, **Didn't work** or **Not sure**, with a sentence on why.

## Tests and new ads

A before-and-after comparison can be thrown off by anything else that happened that week. A **test** has the network split one campaign between how it is and a trial: a custom experiment on Google Ads (a different target cost per conversion) or a split test on Meta (a different daily budget). Outflare reads both sides and says which did better, then a person presses **Keep it** or **Roll back**.

The brand agent can also draft **new ads** where a campaign needs them: a responsive search ad or a Meta link ad, a new Google ad group, or a new Google search campaign. Drafts are checked against the platform's rules; approving one creates it paused, and only **Turn on** makes it live.

## Paid ads Autopilot (Outflare Cloud only)

On [Outflare Cloud](/docs/project/open-source-and-cloud/), a brand's agent can apply paid ads savings for you. A person chooses which kinds it may apply on its own (lower a budget, pause a campaign, add a negative keyword) and how many a day. Anything that could spend more still waits for you, and every change is measured like one you approved. Everything else on this page is in the open-source engine.

## For agents

Every report and change is in the [API](/docs/api/) and the [MCP server](/docs/agents/mcp/). Changing campaigns needs the `ads.manage` scope, which you give to a token on purpose. A pause runs under an agent's grant; a large budget raise, a targeting change, or anything over the grant's daily or monthly spend cap waits for a person. `POST /v1/brands/{brand}/ads/pause-all` is the kill switch for a brand.

## What to know

- Outflare doesn't buy media or take a share of spend. You pay each platform directly.
- The docs note the integrations haven't all been tested against live accounts yet, and ask you to open an issue if a platform misbehaves.
