---
title: Channels and attribution
description: See visits, sign-ups, revenue and cost for every channel, credited the same way in every report, and compare five attribution models.
sidebar:
  order: 9.55
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

**Channels** shows where your visits, sign-ups and revenue come from, and what each channel costs. Every report, channel and ad uses the same credit, so the numbers add up the same way everywhere.

In the app, open **Analytics** in the sidebar, then **Channels**. Attribution runs inside Outflare and calls no third-party service. It works from the visits [website tracking](/docs/guides/website-tracking/) records and the customer events your workspace sends or syncs, such as sign-ups and [payments from Stripe](/docs/guides/revenue-from-stripe/). With no tracking snippet on your site, the page shows how to add one.

## Each visit's channel

Within a minute or two of a visit, Outflare gives it a channel, a source and a campaign. The first rule that matches wins:

1. A [campaign link](/docs/guides/campaign-links/) id (`ofc`): the campaign's channel, source and name.
2. A partner's referral code: **Affiliates**.
3. An ad click id from Google, Microsoft, LinkedIn, Reddit, X or TikTok: **Paid ads**.
4. UTM tags: `utm_medium` decides (`cpc` or `paid_social` is paid ads, `email` is lifecycle email or, from a sequencer, outbound email, `social` is organic social or Reddit), otherwise the source does.
5. Where the visit came from: AI assistants such as ChatGPT and Perplexity are **AI answers**, search engines **SEO**, social networks **Organic social**, Reddit **Reddit**, and any other site **Referral**. Links between your own sites don't count.
6. Nothing: **Direct**.

Facebook adds its click id to every link, paid or not, so Meta ads need UTM tags or a campaign link to count as paid.

## Who gets the credit

A conversion is a sign-up or a payment, unless you change which events count. A few minutes after one happens, Outflare finds the visits before it: by the person, or, before they were identified, by their browser. It looks back 90 days, and at most 50 visits. The credit is shared under the model you pick:

| Model | Who gets the credit |
| --- | --- |
| Last non-direct touch (the default) | The last visit that wasn't direct |
| First touch | The first visit |
| Linear | Every visit equally |
| 40/20/40 | 40% the first visit, 40% the last, 20% shared by the rest |
| Time decay | Shared, with each week before the conversion counting half as much |

Direct visits get credit only when there is nothing else. A conversion with no visit before it is counted as direct.

Every model is worked out for every conversion, so switching the model at the top of the page is instant. Pick one and press **Make it the default** to use it everywhere. Under the shared models a channel can have part of a conversion, such as 2.5.

A refund comes off the revenue of the channels that got the payment, so revenue is always net of refunds.

## Cost

Cost per channel comes from your spend: ad spend from your connected ad accounts, and the costs you record against a channel. Spend that isn't tied to a channel is shown under the totals, never guessed. With cost and revenue in one currency, the table shows cost per conversion and the return on each channel.

Paid ads read the same credit. The conversions each ad platform reports about itself stay on the **Paid ads** page and are never added in.

## Drill down

Click a channel to see its sources and campaigns: visits, conversions and revenue each, most conversions first. Campaigns made with campaign links show their name.

Tick **Split by content** to split each campaign by the link's content tag (`utm_content`). For a sequence, that is the step a link went out in (`step-1`, `step-2` and so on), so you see which email in the sequence brought the visit and the sale.

## Identified people only

A visit is tied to a person in one of two ways: they identified themselves (for example by signing in or filling in a form), or Outflare only knows their browser. Pick **Identified people only** at the top of the page to count only the first kind: visits on a person's record, and credit only on those visits. Conversions matched by browser alone are left out. Use it when you want numbers you can stand behind, at the cost of missing some visits.

Each conversion's credited visits say how they were matched: `record` (identified), `browser` or `none`.

## New or known people

**New or known people** splits each channel's conversions into people who weren't in Outflare yet when they visited (new to you) and people who already were (a lead you had imported or emailed, a customer coming back). It splits revenue into each person's first payment and their later ones.

**What people are worth, by first channel** takes the people whose first conversion was in the dates you picked, groups them by the channel that first brought them, and shows how many have paid and everything they have paid since, in total and per person. It always uses first touch, whatever model you pick.

## Companies and deals

Credit rolls up from people to their company. **Companies** shows, for each company, how many of its people converted, the conversions and revenue credited to them, the channel that brought the most, and the deals it won in the dates you picked. A person counts toward their first company only.

**Won deals by channel** spreads each deal won in the dates you picked across channels, in proportion to the credit its people earned before it closed. A deal's people are its contacts and everyone at its company. Deals where nobody had a tracked visit are listed apart, never guessed.

## What a journey changed

A journey's random split can hold some people back on purpose (a holdout). On the journey's page, such a split shows each path against the people held back: how many converted within 30 days after the split, what they paid, how much better or worse each path did, and whether the difference is real or too early to tell (it needs at least 30 people on each side). Revenue beyond what as many held-back people paid is shown too.

## On Home and in your digest

**Home** shows the last 28 days across every channel, below **Needs you**: visits, conversions, revenue and cost, with a link to Channels. It appears once your site has visits, for anyone who can see the reports.

Your [daily or weekly digest](/docs/guides/digests/) has a **Channels** section: visits, conversions, and revenue and cost in each currency, each next to the period before, and the three channels that brought the most conversions. Both use your default model.

[Missions](/docs/agents/missions/) can aim at revenue credited to the campaign links in their sequences and broadcasts, and to their social posts and replies, under your default model.

## Who can do what

Everyone in the workspace can see the reports (`analytics.read`). Owners, admins and operators can change the default model, the lookback and which events count (`analytics.manage`). Changing the lookback or the events credits every past conversion again within a few minutes.

## For agents and scripts

The REST API is under `/v1/workspaces/{ws}/attribution`: `/settings`, `/channels`, `/campaigns`, `/conversions`, `/customers`, `/cohorts`, `/accounts` and `/deals`, each with `from`, `to`, `model`, `brand` and `match` (`identified` for identified people only). `/campaigns` also takes `split=content`. A journey's holdout comparison is `GET /v1/brands/{brand}/journeys/{id}/lift?step=`. See the [API reference](/docs/api/). The MCP tools are `get_attribution_settings`, `update_attribution_settings`, `get_attribution_channels`, `get_attribution_campaigns`, `list_attribution_conversions`, `get_attribution_customers`, `get_attribution_cohorts`, `get_attribution_accounts`, `get_attribution_deals` and `get_journey_lift`. Ask your agent something like *"Which channel brought the most revenue this month, and what did each sign-up cost us per channel?"*
