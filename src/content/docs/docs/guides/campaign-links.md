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

## What Outflare adds to a redirect link's destination

A redirect link sends each click on to a page: a lander, an offer, or the link's own page. Three kinds of parameter on that page's address belong to Outflare, and it adds each of them once:

| Parameter | What it is | Who sets it |
| --- | --- | --- |
| `ofclk` | The click's id: 16 letters and digits. Your page or your postback uses it to say which click converted. | Outflare, on every destination |
| `ofc` and `utm_*` | The campaign's id and tags | The campaign and the link |
| Everything else, such as `plan=pro` or a network's `subid={click_id}` | Yours | You. Kept as written, repeats and `#section` included |

So leave `ofclk`, `ofc` and `utm_*` out of the URLs you save. If you do write them:

- `ofclk={click_id}`, `ofc` and `utm_*` are dropped when you save, because the redirect adds them anyway. The page never gets one twice.
- Any other `ofclk`, such as a fixed value, is refused with a message that says why. It would name a different click from the real one.

To hand the click id to an affiliate network, put the `{click_id}` token in the network's own parameter, for example `https://network.example/offer?id=7&subid={click_id}`. That stays exactly as you wrote it.

### Click id delivery on an offer

Each offer has a **Click id delivery** setting, which decides when Outflare warns you that the click id can't reach whoever reports the sale:

- **Automatic** (the default). A page on one of the brand's own domains, or on one of its verified tracking domains, reads `ofclk` itself, so nothing is missing. Any other page needs `{click_id}` in its URL, or a postback source that adds it.
- **Our own page**. Use this for a page of yours on a domain the brand doesn't list. No warning.
- **Affiliate network**. The URL must pass `{click_id}` on, or the offer shows **Missing click id**.
- **No conversions expected**. No warning.

If your own pages show **Missing click id**, either add their domain to the brand (**Company**, then **Brands**, then **Other domains**) or set those offers to **Our own page**.

### See what a click gets

On the offer and lander forms, **Show what a click gets** shows the final address for the URL you typed and who set each parameter. It is built the same way as a real redirect, for a made-up click, and it counts no click and no visit.

Over the API that is `GET /v1/brands/{brand}/destination-preview?destination=...&campaign=...`, and the MCP tool is `preview_destination`. An offer in the API carries `click_id_delivery`, `click_id_via` (how the id travels: `template`, `network`, `ofclk` or `none`) and `missing_click_id`.

## Links Outflare tags for you

Some parts of Outflare tag their own links, so you don't make those campaigns by hand. Each makes one campaign per thing it sends, the first time it needs one, and lists it here with the rest:

| Where the link goes out | One campaign per | Channel | Which links |
| --- | --- | --- | --- |
| [Sequences](/docs/guides/sequences/) | sequence | Outbound email | Links in each step to your brand's website and domains, with the step as the content (`step-1`, `step-2`) |
| Broadcasts | broadcast | Lifecycle email | Links in the email to your brand's website and domains |
| Journeys | journey | Lifecycle email | The same |
| [Social replies](/docs/guides/social/) | watch | Reddit, or Organic social for X and LinkedIn | The watch's landing page, with each reply as the content |

For an email with no brand, links to any of your brands' sites count. Links to other companies' sites are never tagged, and a link you tagged yourself (it already has `utm_campaign`) keeps your tags. Test emails and test sends are never tagged.

In a sequence, links are tagged before [click tracking](/docs/guides/tracking-domains/) wraps them, so the person still lands on the tagged page, and your unsubscribe link is left alone. Visits from cold email then show under **Outbound email** in [Channels](/docs/guides/attribution/), by sequence.

## Who can do what

Everyone in the workspace can see campaigns and links (`analytics.read`). Owners, admins and operators can make and change them (`analytics.manage`).

## For agents and scripts

The REST API is under `/v1/brands/{brand}/tracking-campaigns`, with `/tracking-taxonomy` for the channel list; see the [API reference](/docs/api/). The MCP tools are `get_tracking_taxonomy`, `list_tracking_campaigns`, `get_tracking_campaign`, `create_tracking_campaign`, `update_tracking_campaign`, `list_tracking_links` and `create_tracking_link`. Ask your agent something like *"Make a tagged link for our spring launch on LinkedIn ads, pointing at the pricing page."*
