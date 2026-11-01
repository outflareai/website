---
title: Campaign links
description: Tag every link you share with one channel, source and campaign, plus a short campaign id, so each visit, lead and sale is credited to the right place.
sidebar:
  order: 9.5
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

Campaign links give every link you share the same set of tags, so reports never split one campaign across three spellings. Make a campaign once, then make as many links for it as you need: one per ad, post, email or button. When someone clicks, [website tracking](/docs/guides/website-tracking/) records the tags they arrived with.

In the app, open **Analytics** in the sidebar, then **Campaign links**. Tagging runs inside Outflare and calls no third-party service.

## Channels

Every campaign belongs to one channel. The channel sets `utm_medium`, so the same kind of traffic always lands in the same place.

| Channel | `utm_medium` | Usual sources |
| --- | --- | --- |
| Paid ads | `cpc` | google, meta, linkedin, microsoft, reddit, x, tiktok |
| Organic social | `social` | linkedin, x, facebook, instagram, youtube, tiktok, threads, bluesky |
| Reddit | `social` | reddit |
| Outbound email | `email` | outflare, emailbison, instantly, smartlead |
| Lifecycle email | `email` | outflare, newsletter |
| Affiliates | `affiliate` | partner |
| Referral | `referral` | newsletter, podcast, producthunt, event, qr |
| SEO | `organic` | google, bing |
| AI answers | `ai` | chatgpt, perplexity, gemini, claude, copilot |

You can type any source. Outflare cleans it up and merges common spellings: `fb`, `Facebook` and `facebook.com` all become `facebook`, and `Twitter` becomes `x`. Channels with one usual source, such as Reddit, fill it in for you.

## Make a campaign

1. Click **New campaign**.
2. Give it a name, such as *Spring launch, US*, and pick the channel and source.
3. Optionally pick a brand and a landing page.

The preview shows the tags before you save. Outflare gives the campaign:

- a **slug** from its name, sent as `utm_campaign` (`spring-launch-us`);
- a **campaign id**, a random 10-character code sent as `ofc`. It still identifies the campaign when an app or a person strips the other tags.

The slug, channel and source can't change once the campaign exists, so links already out keep reporting to the same place. You can rename a campaign, change its brand or landing page, or archive it. An archived campaign takes no new links, and links already out still work.

## Make a link

Open a campaign and fill in **Make a link**: the page (the landing page if you leave it empty), and optionally the content (which ad, post or button) and the term. Copy the tagged link it gives you:

```
https://northpeak.example/pricing?plan=pro&utm_source=linkedin&utm_medium=cpc&utm_campaign=spring-launch-us&utm_content=carousel-1&ofc=ab12cd34ef
```

Old campaign tags on the page are replaced, and its other parameters and `#section` are kept. Making the same link twice gives back the one you already have.

## Links Outflare tags for you

Some parts of Outflare tag their own links, so you don't make those campaigns by hand. Each makes one campaign per thing it sends, the first time it needs one, and lists it here with the rest:

| Where the link goes out | One campaign per | Channel | Which links |
| --- | --- | --- | --- |
| [Sequences](/docs/guides/sequences/) | sequence | Outbound email | Links in each step to your brand's website and domains |
| Broadcasts | broadcast | Lifecycle email | Links in the email to your brand's website and domains |
| Journeys | journey | Lifecycle email | The same |
| [Social replies](/docs/guides/social/) | watch | Reddit, or Organic social for X and LinkedIn | The watch's landing page, with each reply as the content |

For an email with no brand, links to any of your brands' sites count. Links to other companies' sites are never tagged, and a link you tagged yourself (it already has `utm_campaign`) keeps your tags. Test emails and test sends are never tagged.

In a sequence, links are tagged before [click tracking](/docs/guides/tracking-domains/) wraps them, so the person still lands on the tagged page, and your unsubscribe link is left alone. Visits from cold email then show under **Outbound email** in [Channels](/docs/guides/attribution/), by sequence.

## Who can do what

Everyone in the workspace can see campaigns and links (`analytics.read`). Owners, admins and operators can make and change them (`analytics.manage`).

## For agents and scripts

The REST API is under `/v1/workspaces/{ws}/tracking-campaigns`, with `/tracking-taxonomy` for the channel list; see the [API reference](/docs/api/). The MCP tools are `get_tracking_taxonomy`, `list_tracking_campaigns`, `get_tracking_campaign`, `create_tracking_campaign`, `update_tracking_campaign`, `list_tracking_links` and `create_tracking_link`. Ask your agent something like *"Make a tagged link for our spring launch on LinkedIn ads, pointing at the pricing page."*
