---
title: Social media analytics and Reddit replies · Outflare
description: Track followers for every brand on X, LinkedIn, YouTube and more, see your X and LinkedIn post numbers, and post Reddit replies you approve first.
h1: Social growth and Reddit replies, on your own accounts.
label: Social
lede: Outflare reads each brand's social profiles every day and shows followers over time, your own X and LinkedIn posts with their numbers, and Reddit threads where your brand can genuinely help, with a reply drafted for you to approve.
answer: Outflare's Social module tracks followers for each brand's profiles on X, LinkedIn, YouTube, Instagram, TikTok, Bluesky, GitHub and more, every day, and shows impressions, likes, replies, reposts and clicks for your own X posts and LinkedIn company page posts. On Reddit, it watches for posts where your brand can help, drafts a reply with a disclosure line, and posts it from the brand's own account only after a person approves it. Everything runs on your own Geonode, X, LinkedIn, Reddit and AI accounts.
points:
  - Daily followers for 14 kinds of profile
  - X and LinkedIn post numbers with your own app and sign-in
  - Reddit replies always disclosed, always approved by a person
  - Visitors and sign-ups from each Reddit reply
docs:
  - label: Social growth on X and LinkedIn
    href: /docs/guides/social/
  - label: Reply on Reddit
    href: /docs/guides/reddit/
  - label: Brands
    href: /docs/guides/brands/
  - label: Connectors
    href: /docs/integrations/connectors/
faqs:
  - q: Which social networks does Outflare track?
    a: Followers on X, LinkedIn company and showcase pages, YouTube, Instagram, TikTok, Facebook, Threads, Bluesky and Mastodon, members of subreddits and Discord servers, GitHub stars and Docker Hub pulls, and posts on DEV. Post numbers come from X and LinkedIn company pages.
  - q: Does Outflare post to X or LinkedIn?
    a: Not yet. Today it reads followers and post numbers. Publishing, listening for mentions and replying on X and LinkedIn are planned for the same Social module as Reddit.
  - q: Is it safe to reply on Reddit with Outflare?
    a: "Replies go out only from the brand's own Reddit account, every reply ends with a disclosure line such as 'Disclosure: I work at Northpeak.', and only a signed-in person can approve one. Agents and API tokens can find posts and draft replies, but never approve them. There are no bought upvotes or other accounts."
  - q: Do I need my own API keys?
    a: Yes. Followers are read through your own Geonode account, X posts need your workspace's own X developer app, LinkedIn your own sign-in, and Reddit your own Reddit app. Drafts use your own AI model. X bills the app's owner for each post it reads, so Outflare reads at most 50 recent posts per account a day.
related:
  - /product/brands/
  - /product/analytics/
  - /product/outcomes/
  - /product/reviews/
  - /product/agents/
updated: 2026-11-09
order: 70
---

## Followers for every profile

**Social → Accounts** lists every social profile of each brand. Profiles in the brand's links are there already, profiles found on the brand's website show with **Confirm** and **Not ours**, and you can paste any address to add one. Each profile is read when you add it and then once a day, and the followers chart builds up day by day, with today, 7-day and 28-day changes.

| Profile | What's read |
| --- | --- |
| X | Followers and following |
| LinkedIn company or showcase page | Followers |
| YouTube | Subscribers |
| Instagram, TikTok | Followers, following and posts or videos |
| Facebook page, Threads | Followers |
| Bluesky, Mastodon | Followers, following and posts |
| Subreddit, Discord server | Members |
| GitHub | Stars across its repositories |
| Docker Hub | Pulls across its images |
| DEV | Published posts |

Followers come from each profile's public page, through your own [Geonode](/docs/integrations/connectors/) account, at about a token a day per profile. A profile behind a login wall shows an error and is tried again the next day; it never reads as zero.

## Your own posts on X and LinkedIn

- **X.** Create an app with OAuth 2.0 in the X developer console, paste its client id and secret under Connectors, and sign in to the brand's X account. Outflare reads each account once a day and at most 50 recent posts, with impressions, likes, replies, reposts and clicks. You pay X directly.
- **LinkedIn.** Sign in with your own LinkedIn account. Company pages you administer get followers and their posts with impressions, clicks, likes, comments and shares. Your own profile gets followers where LinkedIn allows it.

Each account belongs to a [brand](/product/brands/), so growth shows per channel and per brand.

## Reply on Reddit

Reddit is the first channel where Outflare helps you take part, not just measure.

1. **Watch.** A watch searches Reddit every hour for posts from the last week with your phrases, in the subreddits you choose or across Reddit, leaving out adult, removed and your own posts.
2. **Draft.** Your own AI model drafts a reply that answers the person's question first, mentions the brand only when it fits, links at most once and ends with the disclosure. When it can't honestly help, it says so instead of drafting.
3. **Approve.** You read each draft under **Waiting for approval**, edit it, and approve or reject it. Approving posts it once from the brand's account, within the watch's daily limit (5 by default).
4. **Measure.** Each reply's link is tagged, so the visitors it brought and the known people who then signed up show next to it, with its Reddit score.

| Outflare never | Why |
| --- | --- |
| Posts without a person's approval | Agents and API tokens can draft, never approve |
| Posts without a disclosure line | A reply without one is refused |
| Uses other accounts or buys upvotes | Replies go from the brand's own account only |
| Uses a shared Reddit or AI key | Your own Reddit app and AI model, or nothing runs |

## For agents

Growth, accounts, posts and Reddit watches are in the API under `/v1/brands/{brand}/social` and in the [MCP server](/product/mcp/), with tools such as `get_social_growth` and `list_social_accounts`. Reddit replies waiting for approval show in the workspace's status and on the fixes list, so nothing posts without you.
