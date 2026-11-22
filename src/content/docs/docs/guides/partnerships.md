---
title: Partnerships
description: One menu for every site and person a brand works with, from finding them to paying them, in six tabs that follow the work in order.
sidebar:
  order: 9.5
---

Partnerships is the one place for every site and person a brand works with: the sites you want to be on, the offers and agreements you make with them, the links and mentions that are live, your affiliate programs, what you owe and what it all brought in.

Choose a [brand](/docs/guides/brands/), then open **Partnerships**. Each tab has its own address, so you can bookmark it or send it to a teammate.

| Tab | What you do there |
| --- | --- |
| **Find** | See sites worth being on, ranked: sites that link to or mention your competitors but not you. From here you can open pages that lost links and sellers' price lists. |
| **Offers** | Follow every offer, link order and agreement with one site or person on one board, paid or free. (Sales deals are in CRM, not here.) The columns are Draft, Offer sent, Negotiating, Agreed, Live and Done, and a card moves by itself when its status changes. Declined and lost ones stay hidden until you show them. |
| **Live** | See everywhere your brand appears right now, earned or paid. Outflare checks each page and tells you when a link or mention disappears. |
| **Affiliates** | Run your referral, affiliate and influencer [partner programs](/docs/guides/partners/). |
| **Payments** | See what you owe in three lists: needs you (a live link to approve, a commission due), waiting or held (not live yet, or the link was lost before payment), and paid. Outflare records payments; it never moves money. |
| **Results** | See how each creator deal is doing, then what you spent on links, how many paid links are live, the cost per paid link and how often a price was agreed, then the return on each link. |

**New offer** on the Offers tab opens the offer form, and clicking a card opens it on a page of its own.

## Sending an offer

**New offer** opens a full page: who the offer is for, what you ask for (the page and the link), what you pay and when, and your message. Paid links are normal, followed links and stay up for good, and nothing is paid before the link is live. To reuse an offer, choose **Save as template**; next time, pick it from **Start from a template**.

## When the site owner suggests changes

The site owner can answer your offer with changes, up to three times. They can change only the price, the page your link goes on, the link text and the publish date. Your URL, the link type, that the link is permanent and that payment comes only once it is live stay fixed.

Their suggestion shows on the offer. **Accept these terms** agrees to it, and the new price is spread over the payments in the offer. **Answer with other terms** opens the offer so you can send back your own.

## Deals with video creators

A creator deal is for paying a creator to carry your link in their videos: in every video they already have, in one video, as a mention in a new video, or in a whole video about you. The creator is one of your [partners](/docs/guides/partners/), so they already have a partner link and earn your program's usual commission on everything it brings. The deal adds what you agreed and where it stands.

On the Offers tab, **New creator deal** asks three things:

1. **Who is the creator?** Choose one of your partners. If they are not a partner yet, add them under Affiliates first.
2. **What will they do?** Link in every video, link in one video, mention in a new video, or a whole video about you.
3. **What will you pay them?**

Everything else uses your usual terms, which are the terms of your newest deal: how much you pay up front, how soon after the link goes live you pay the rest, how many months the link stays up, credits for the creator and what their viewers get. Your first deal starts with half up front, the rest within 7 days of going live, for 12 months. **Change** shows the terms so you can set them for this one deal. It also takes the short link on your own site, such as `northpeak.example/sam`, that sends viewers on to the creator's partner link. Outflare doesn't create that short link: set it up as a redirect on your site.

Clicking a deal opens its page:

- **The creator's link**, to copy and send.
- **The stage**: Found, Pitched, Talking, Terms agreed, Live, Paid, Results in to start with. Press a stage to move the deal there. **Edit stages** renames them, moves them, adds your own and removes one, for this brand only. Each stage says what it means (just a step, the terms are agreed, the link is live, or the deal is stopped), and that meaning, not the name, is what dates a deal as agreed or live.
- **What was agreed**, with **Edit**, and **Record a payment** for each payment you make. Outflare records payments; it never moves money.
- **Videos carrying the link.** **Add videos** takes the links of the videos that should have your link, one per line. Outflare then checks the link for you: once a week it reads each video's description and marks the video **In place** or **Missing**, and **Check now** does it straight away. **Missing only** lists the ones to chase, and you get an alert when a link that was in place goes missing. The check reads pages through your workspace's own page reading connection, on your own account with that provider; until one is connected the card says so and you mark videos by hand. It reads the description, not pinned comments, so when you can see the link yourself, **Mark in place**: a video you mark is left as you set it until **Check again** hands it back. A video whose page couldn't be read shows **Couldn't read** and keeps its last status, and the videos of a stopped deal aren't checked.
- **What it brought**: clicks, sign-ups, paying customers, sales and the cost per customer.

The numbers on a deal are the creator's totals as a partner: everything their link has brought, counted when someone who came through it signs up or pays. A creator with two deals shows the same totals on both.

The **Results** tab lists every creator with what you paid, clicks, customers, sales, cost per customer and a plain reading: working once sales cover what you paid, too early to tell in the first 30 days after going live, and not working after that when nobody has paid.

Agents and the API use `/v1/brands/{brand}/creator-deals` and the MCP tools `list_creator_deals`, `create_creator_deal` and the others named after them. In Query the tables are `creator_deals` and `creator_deal_videos`.

## If a paid link is removed

Each brand sets what happens when a site removes a link you already paid for, under **Payments → Removed links**:

| Rule | What it means |
| --- | --- |
| Restore or refund (the default) | The site owner puts the link back within 14 days or refunds you, for the first 12 months. You can change both numbers. |
| Restore or refund, for good | The same, with no end date. |
| Refund that shrinks over time | The refund falls evenly to nothing over the months you choose. |
| Warn only | Outflare tells you; there is no refund. |

The rule in force when you send an offer is written into it, so changing the rule later doesn't change offers already agreed. The site owner sees it on the offer under the fixed terms.

## Where the old pages went

Presence, Partners, Link orders, Link ROI and Link building now open inside Partnerships, and their old addresses still work:

| Before | Now |
| --- | --- |
| Outreach → Presence | Partnerships → Live (and Find for opportunities) |
| Partners | Partnerships → Affiliates |
| SEO → Link orders | Partnerships → Offers |
| SEO → Link ROI | Partnerships → Results |
| Outreach → Link building | Partnerships → Find |

## Who sees what

Each tab shows only what you're allowed to read. Offers from partner programs need access to Partners, link orders need access to Presence, and agreements and payments need access to Presence finances. An admin can change this under [roles](/docs/guides/workspaces-and-access/).

Agents and the API use the same calls as before (link orders, partner proposals and payouts, and the Presence resources), so nothing changes for scripts or the [MCP server](/docs/agents/mcp/).
