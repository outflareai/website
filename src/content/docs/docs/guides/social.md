---
title: Social growth on X and LinkedIn
description: See followers day by day and how your own posts do on X and LinkedIn, per channel and per brand, read every day through your own connections, and find each brand's social links on its website.
sidebar:
  order: 15
---

<span class="pill shipped">Shipped</span> Followers and post numbers for X and LinkedIn, in the app, through the API and for agents.

Outflare reads your brand's own X accounts, the LinkedIn company pages you administer and your own LinkedIn profile every day. The **Social** page (`/<workspace>/social`) shows followers over time, the posts you published, and their impressions, likes, replies, reposts and clicks. You see it per channel and per brand.

Publishing, listening for mentions and replying on X and LinkedIn come next, in the same Social module as Reddit.

## Your own accounts only

Outflare never uses a shared X, LinkedIn or Geonode key. X followers come through your own Geonode account, X posts through your workspace's own X developer app, and LinkedIn through your own sign-in. Until you connect one, nothing is read for that channel.

## X followers, with no X app

For followers alone you don't need an X developer app. Connect your own [Geonode](https://geonode.com/) account on the [Connectors](/docs/integrations/connectors/) page (paste its API key), and add each brand's X profile to its links on the brand's page, or let Outflare [find it](#finding-a-brands-links). Once a day Outflare reads the account's public profile page through your Geonode account and keeps its followers, following count, name and picture. That costs one Geonode token per account per day, billed by Geonode to you.

If the page shows no follower count (a login wall or a suspended account), the account shows an error and is tried again the next day; it never records zero. Take the link off the brand to stop reading it. Posts and their numbers need the X app below.

## X posts, with your own X app

X bills the owner of the developer app for each post it reads. To keep that small, Outflare reads each X account once a day and at most 50 of its recent posts. You pay X directly.

1. In the X developer console, create an app with OAuth 2.0 turned on. Choose **Web App** (a confidential client).
2. Set its callback URL to your Outflare's `/v1/integrations/oauth/callback`. On Outflare Cloud that is `https://app.outflare.ai/v1/integrations/oauth/callback`.
3. Under **Connectors**, **Social**, **X**, paste the app's client id and client secret.
4. On the Social page, choose **Sign in to X** and sign in to the brand's X account.

The first read starts as soon as you sign in.

## Connect LinkedIn

Under **Connectors**, **Social**, **LinkedIn**, sign in to your own LinkedIn account. Outflare finds your profile and every company page you administer.

- **Company pages** get followers, and their posts with impressions, clicks, likes, comments and shares.
- **Your profile** gets followers, where LinkedIn allows it. LinkedIn doesn't let apps list a person's own posts, so profile posts don't show.

Self-hosted, the operator registers a LinkedIn app with the Community Management API and sets `CONNECTOR_LINKEDIN_CLIENT_ID` and `CONNECTOR_LINKEDIN_CLIENT_SECRET` (see [Configuration](/docs/self-hosting/configuration/)).

## Finding a brand's links

With Geonode connected, Outflare reads a brand's homepage through your Geonode account and suggests the social profiles and app store listings it links to: X, LinkedIn, YouTube, Instagram, TikTok, Facebook, Discord, Reddit, GitHub and the app stores. Share buttons and single posts are left out. A page built in the browser is read again with JavaScript on, so a brand costs one or two tokens.

It runs when you add a brand with a website, when its website changes and when you first connect Geonode. Choose **Find links** under the brand's **Links** to run it again.

Nothing is added on its own. Under **Links**, each suggestion has **Add** and **Not theirs**: correct the address first if it's wrong. A dismissed link isn't suggested again. The common places the brand has no link for yet (X, LinkedIn, YouTube, Instagram, TikTok and Facebook) show as gaps you can fill in by hand. An X link you add is read for followers straight away.

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
| Accounts | `GET .../social/accounts` | `list_social_accounts` |
| Set an account's brand or pause it | `PATCH .../social/accounts/{id}` | `update_social_account` |
| An account's counts day by day | `GET .../social/accounts/{id}/days` | `get_social_account_days` |
| Your own posts with their numbers | `GET .../social/posts` | `list_own_social_posts` |
| Read now | `POST .../social/accounts/sync` | `sync_social_accounts` |

Reading needs the `social.read` scope. Changes and **Read now** need `social.manage`.
