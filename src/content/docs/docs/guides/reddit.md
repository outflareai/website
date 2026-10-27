---
title: Reply on Reddit
description: Find Reddit threads where your brand can genuinely help, draft replies that say who you are, approve each one, and see the visitors and sign-ups every reply brings.
sidebar:
  order: 14
---

<span class="pill shipped">Shipped</span> Watches, AI drafts, approval and results, in the app, through the API and for agents.

Outflare watches Reddit for posts where your brand can genuinely help, such as someone asking "which proxy for scraping?" or "best passive income app?". It drafts a reply that answers the question first and says who you are. A person approves every reply before it posts from the brand's own Reddit account. Each reply's link is tagged, so the visitors and sign-ups it brings show next to it.

Reddit is the first channel of the Social module. In the app, open **Reddit** at `/<workspace>/reddit`.

## What it never does

- **No bought upvotes, no other accounts, no undisclosed posts.** Replies go out from the brand's own account only, and every reply ends with a disclosure line such as "Disclosure: I work at Northpeak." Outflare refuses a reply without it.
- **No reply without a person.** Only someone signed in to Outflare can approve a reply. API tokens and AI agents can find posts and draft replies, but never approve them.
- **No shared keys.** Outflare searches and posts with your workspace's own Reddit app, and drafts with your workspace's own [AI model](/docs/integrations/connectors/). Until you connect them, nothing runs. Without an AI model, you write replies yourself.

## Set up

1. Signed in to the brand's Reddit account, create an app at reddit.com/prefs/apps and choose **web app**.
2. Set its redirect URI to the address the Reddit page shows (your Outflare's `/v1/integrations/oauth/callback`).
3. In Outflare, under **Connectors**, **Social**, **Reddit**, paste the app's client id and secret. Outflare checks them with Reddit before saving.
4. On the Reddit page, choose **Sign in to post** and sign in to the brand's account.

Watches can search after step 3. Replies can post after step 4. Reddit's Data API terms apply to your app.

## Watches

A watch searches Reddit every hour for posts from the last week that contain one of your phrases. You choose:

- **Phrases** people use when they need you, and words that rule a post out.
- **Subreddits** your buyers ask in, or none to search all of Reddit.
- **Disclosure**, the line every reply ends with. With a brand set, it defaults to "Disclosure: I work at <brand>."
- **Guidance**: what the product is good and bad at, who it's for, and the tone.
- **Landing page**: the page a reply may link to.
- **AI drafts**: whether your AI model drafts replies to new posts on its own (up to 5 per check).
- **Most replies a day**: 5 by default.

Adult posts, removed posts and the brand's own posts are left out.

## Drafts and approval

Your AI model drafts a reply on your own AI bill (the **Social replies** task under Settings, AI model). It answers the person's question honestly, mentions the brand only when it fits, links at most once, and ends with the disclosure. When it can't honestly help, it says so instead of drafting.

You read each draft under **Waiting for approval**, edit it if you like, then approve or reject it. Approving posts it once from the brand's account. Each post gets one reply, and the watch's daily limit applies. Posts and drafts waiting also show on the [fixes list](/docs/guides/site-audits/#the-fixes-list).

## Results

Each reply's link carries `utm_source=reddit`, `utm_medium=social`, the watch as `utm_campaign` and the reply's own tag as `utm_content`. When your site sends page views to Outflare as [customer events](/docs/guides/customer-records/), each reply shows:

- the visitors it brought;
- the known people among them who then signed up, or did any other event you count as a conversion.

The reply's score on Reddit and whether a moderator removed it are refreshed with every check.

## For agents

The API is under `/v1/workspaces/{ws}/social`, with scopes `social.read` and `social.manage`. Approving needs `social.post` and a signed-in person. The MCP tools are:

- `get_social_overview`
- `create_social_watch`, `list_social_posts`
- `draft_social_reply`, `write_social_reply`, `update_social_reply`, `reject_social_reply`
- `list_social_replies`
- `get_social_sign_in_link`, which gives a person the link to sign in to the brand's account

There is no tool that approves a reply.
