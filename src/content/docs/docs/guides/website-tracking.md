---
title: Website tracking
description: Record visits to your own sites with the campaign tags, ad click ids and referral codes they arrived with, so sign-ups and revenue can be credited to the channel that brought them.
sidebar:
  order: 9.6
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

Website tracking records each visit to your sites as an event in your [customer records](/docs/guides/customer-records/). It keeps what the visitor arrived with, exactly as it came: UTM tags, ad click ids, the referrer and any referral or partner code. Outflare works out channels and attribution from these on the server, never in the browser. Visitors stay anonymous until your own product says who they are.

## Set it up

The quickest way is your brand's [setup checklist](/docs/guides/brand-setup/): one click through your own Google Tag Manager, a message for your developer, or a prompt for your AI coding tool. By hand:

1. Open **Settings → General → Website tracking** and add your site. You can list the origins it takes events from, such as `https://example.com` or `https://*.example.com`.
2. Copy the snippet and paste it into every page's `<head>`:

   ```html
   <script async src="https://app.outflare.ai/site.js" data-key="ofk_test_not_a_real_key"></script>
   ```

3. When someone signs up or signs in, have your server send `identify` with their user id and their `anonymousId` to the [customer events API](/docs/guides/customer-records/). In the browser, `outflare.anonymousId()` gives it, and it's also in the `of_aid` cookie. Their earlier visits then join their record.

The script tells Outflare its version with every visit. If your pages run an old copy, or a site stops sending visits, [install health](/docs/guides/brand-setup/#when-something-goes-out-of-date) tells you on Home.

To record a step that isn't a page, such as a click on a sign-up button, call `outflare.track("Signup Started")`. Use plain names: dotted ones like `payment.succeeded` are Outflare's own.

## What each visit records

- The page's address and title, keeping only the campaign tags, click ids and referral codes below from its query string, and where the visitor came from (just the site and path). A sign-in link's token or an email address in a URL is never kept.
- The `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` and `utm_id` tags.
- Ad click ids: `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `li_fat_id`, `rdt_cid` and `twclid`.
- A referral or partner code from `ref` or `via`, and an Outflare campaign link's `ofc`.

## Safe to put in a page

The site key is public by design. It can only add anonymous page views and track events:

- It can't read anything.
- It can't name, create or merge a person.
- It doesn't start journeys, send email or count as revenue.
- It works on no other part of the API.

Limiting a key to your origins filters out stray traffic. **Rotate** gives the key a new value, and the old one keeps working for seven days while you update the site. **Revoke** stops it at once.

## Consent

The visitor's id is kept in a first-party cookie, but only with consent. By default, visitors in the EEA, Switzerland and the UK, and anyone with Global Privacy Control on, get no cookie: their id lasts only for the page they're on. Once they accept analytics cookies in your banner, call `outflare.consent(true)` and the id is kept for a year.

You can change this on the script tag:

- `data-consent="required"` asks everyone for consent first.
- `data-consent="granted"` is for sites whose banner runs before the script loads.

Without consent, the campaign tags a visitor landed with are kept with that first visit only. If they sign up later, on another visit or another domain, Outflare can't join the two. So on a site without a consent banner, keep the landing page's `utm_*` tags, ad click ids, `ref` and `ofc` (for example in hidden fields on your sign-up form) and send them with the sign-up `identify`: the tags in `context.campaign` and the click ids in `properties.click_ids`, just as the script does. The sign-up is then credited to the right channel even when the visits can't be joined.

Visits are stored in your workspace with the rest of your customer data and aren't shared with anyone.
