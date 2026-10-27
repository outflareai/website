---
title: Social growth on X and LinkedIn
description: Keep each brand's social profiles in one place, see their followers day by day, and see how your own X and LinkedIn posts do.
sidebar:
  order: 15
---

<span class="pill shipped">Shipped</span> Daily followers for every social profile, and post numbers for X and LinkedIn, in the app, through the API and for agents.

Outflare reads your brand's own X accounts, the LinkedIn company pages you administer and your own LinkedIn profile every day. **Social → Accounts** (`/<workspace>/social`) shows followers over time, the posts you published, and their impressions, likes, replies, reposts and clicks. You see it per channel and per brand.

## Start: your accounts

Social opens on **Your accounts**: every social profile of each brand, in one list.

1. **Add them.** Profiles already in the brand's links are listed. Profiles Outflare found on the brand's website show with **Confirm** and **Not ours**, and **Find it on the website** looks again. To add one by hand, paste its address in the box at the bottom (pick the brand first when you have several). **Edit** and **Remove** change a profile in place; removing one stops reading it and keeps its history.
2. **Connect Geonode.** Followers are read from each profile's public page through your own Geonode account. **Connect Geonode** opens it on Connectors, says what it's for, and brings you back to Social once it's connected.
3. **Read every day.** A profile is read as soon as you add or confirm it, then once a day. Each row shows its followers, the change since yesterday, and when it was last read. Day by day, growth adds up in the followers chart and the accounts table (today, 7 days, 28 days).

| Profile | What's read |
| --- | --- |
| X account | Followers and following |
| LinkedIn company or showcase page | Followers |
| YouTube channel | Subscribers |
| Instagram account | Followers, following and posts |
| TikTok account | Followers, following and videos |
| Facebook page | Followers |
| Subreddit | Members |
| GitHub account or organisation | Followers |
| Discord server (an invite link) | Members |

A person's own LinkedIn profile and a Reddit user don't show followers publicly. A profile behind a login wall shows an error on its row and is tried again the next day; it never reads as zero.

The numbers, the accounts table and top posts appear once something has been read.

Publishing, listening for mentions and replying on X and LinkedIn come next, in the same Social module as Reddit.

## Your own accounts only

Outflare never uses a shared X, Geonode or LinkedIn key. Followers come from each profile's public page, read through your own Geonode account (a token or so a day per profile). X posts and their numbers need your workspace's own X developer app, and LinkedIn your own sign-in. Until you connect one, nothing is read for that channel.

X bills the owner of the developer app for each post it reads. To keep that small, Outflare reads each X account once a day and at most 50 of its recent posts. You pay X directly.

## Add X posts with your own X app

Followers on X need only Geonode. For your posts and their numbers too:

1. In the X developer console, create an app with OAuth 2.0 turned on. Choose **Web App** (a confidential client).
2. Set its callback URL to your Outflare's `/v1/integrations/oauth/callback`. On Outflare Cloud that is `https://app.outflare.ai/v1/integrations/oauth/callback`.
3. Under **Connectors**, **Social**, **X**, paste the app's client id and client secret.
4. On Social, choose **Sign in to X** and sign in to the brand's X account.

The first read starts as soon as you sign in.

## Connect LinkedIn

Choose **Connect LinkedIn** on Social (or go to **Connectors**, **Social**, **LinkedIn**) and sign in to your own LinkedIn account. Outflare finds your profile and every company page you administer.

- **Company pages** get followers, and their posts with impressions, clicks, likes, comments and shares.
- **Your profile** gets followers, where LinkedIn allows it. LinkedIn doesn't let apps list a person's own posts, so profile posts don't show.

Self-hosted, the operator registers a LinkedIn app with the Community Management API and sets `CONNECTOR_LINKEDIN_CLIENT_ID` and `CONNECTOR_LINKEDIN_CLIENT_SECRET` (see [Configuration](/docs/self-hosting/configuration/)).

## Finding a brand's links

With Geonode connected, Outflare reads a brand's homepage through your Geonode account and suggests the social profiles and app store listings it links to: X, LinkedIn, YouTube, Instagram, TikTok, Facebook, Discord, Reddit, GitHub and the app stores. Share buttons and single posts are left out. A page built in the browser is read again with JavaScript on, so a brand costs one or two tokens.

It runs when you add a brand with a website, when its website changes and when you first connect Geonode. Choose **Find links** under the brand's **Links** to run it again.

Nothing is added on its own. Under **Links**, each suggestion has **Add** and **Not theirs**: correct the address first if it's wrong. A dismissed link isn't suggested again. The common places the brand has no link for yet (X, LinkedIn, YouTube, Instagram, TikTok and Facebook) show as gaps you can fill in by hand. A social profile you add is read for followers straight away.

| What | REST | MCP tool |
| --- | --- | --- |
| Read the website for links | `POST /brands/{brand}/links/discover` | `find_brand_links` |
| See what was found, and the gaps | `GET /brands/{brand}/link-suggestions` | `list_brand_link_suggestions` |
| Add one, corrected if need be | `POST /brands/{brand}/link-suggestions/{id}/add` | `add_brand_link` |
| Dismiss one | `POST /brands/{brand}/link-suggestions/{id}/dismiss` | `dismiss_brand_link` |

Without Geonode, finding links answers `409 connector_needed`.

## Accounts and brands

Each page and profile becomes an account on the Social page.

- **Brand.** When the workspace has one brand, new accounts get it. Otherwise, pick the brand for each account, and its posts follow.
- **Pause** an account to stop reading it.
- **Disconnected.** If a connection stops reaching an account (for example, you no longer administer a page), the account is marked disconnected and keeps its history.

X is read once a day and LinkedIn twice a day. **Read now** reads every connection straight away.

## For agents and the API

| What | API | MCP tool |
| --- | --- | --- |
| Growth per channel and followers by day | `GET /v1/workspaces/{ws}/social/growth` | `get_social_growth` |
| Accounts, with followers and their change today, over 7 and 28 days | `GET .../social/accounts` | `list_social_accounts` |
| Set an account's brand or pause it | `PATCH .../social/accounts/{id}` | `update_social_account` |
| An account's counts day by day | `GET .../social/accounts/{id}/days` | `get_social_account_days` |
| Your own posts with their numbers | `GET .../social/posts` | `list_own_social_posts` |
| Read now | `POST .../social/accounts/sync` | `sync_social_accounts` |

Reading needs the `social.read` scope. Changes and **Read now** need `social.manage`.
