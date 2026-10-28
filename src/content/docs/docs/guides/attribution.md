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

## Who can do what

Everyone in the workspace can see the reports (`analytics.read`). Owners, admins and operators can change the default model, the lookback and which events count (`analytics.manage`). Changing the lookback or the events credits every past conversion again within a few minutes.

## For agents and scripts

The REST API is under `/v1/workspaces/{ws}/attribution`: `/settings`, `/channels`, `/campaigns` and `/conversions`, each with `from`, `to`, `model` and `brand`; see the [API reference](/docs/api/). The MCP tools are `get_attribution_settings`, `update_attribution_settings`, `get_attribution_channels`, `get_attribution_campaigns` and `list_attribution_conversions`. Ask your agent something like *"Which channel brought the most revenue this month, and what did each sign-up cost us per channel?"*
