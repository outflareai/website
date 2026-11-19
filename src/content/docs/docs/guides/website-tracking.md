---
title: Website tracking
description: Record visits to your own sites with the campaign tags, ad click ids and referral codes they arrived with, so sign-ups and revenue can be credited to the channel that brought them.
sidebar:
  order: 9.6
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

Website tracking records each visit to your sites as an event in your [customer records](/docs/guides/customer-records/). It keeps what the visitor arrived with, exactly as it came: UTM tags, ad click ids, the referrer and any referral or partner code. Outflare works out channels and attribution from these on the server, never in the browser. Visitors stay anonymous until your own product says who they are.

[Website visitors](/docs/guides/website-visitors/) shows which known companies and people came, and who is ready to talk. [Page speed](#page-speed) shows how fast your pages were for real visitors, and [Right now](#right-now) who is on your site this minute. [Session recordings](/docs/guides/session-recordings/) play a visit back, and [heatmaps](/docs/guides/heatmaps/) show where each page is clicked.

## Set it up

The quickest way is your brand's [setup checklist](/docs/guides/brand-setup/): one click through your own Google Tag Manager, a message for your developer, or a prompt for your AI coding tool. By hand:

1. Open **Analytics → Website tracking** and pick your brand. **Get my script** makes the brand's script; with no brands yet, enter your site and press **Make script**. One script records every page of the site and its subdomains, so each brand needs only one.
2. Copy the snippet and paste it into every page's `<head>`:

   ```html
   <script async src="https://app.outflare.ai/site.js" data-key="ofk_test_not_a_real_key"></script>
   ```

3. When someone signs up or signs in, have your server send `identify` with their user id and their `anonymousId` to the [customer events API](/docs/guides/customer-records/). In the browser, `outflare.anonymousId()` gives it, and it's also in the `of_aid` cookie. Their earlier visits then join their record.

The script tells Outflare its version with every visit. If your pages run an old copy, or a site stops sending visits, [install health](/docs/guides/brand-setup/#when-something-goes-out-of-date) tells you on Home.

To show visitors different versions of a page, or turn something on for some of them, add `data-flags` and use [feature flags](/docs/guides/feature-flags/).

To record a step that isn't a page, such as a click on a sign-up button, call `outflare.track("Signup Started")`. Use plain names: dotted ones like `payment.succeeded` are Outflare's own.

## What each visit records

- The page's address, host, path and title, with its whole query string, so reports can filter on any parameter. A sign-in link's token, a password, a code, a session id or an email address in a URL is never kept, and **Edit sites** lets you leave out more by name (`plan`) or prefix (`fb_*`).
- Where the visitor came from: just the other site's address and path, without its query string.
- The `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` and `utm_id` tags.
- Ad click ids: `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `li_fat_id`, `rdt_cid`, `twclid` and `oppref` (ChatGPT).
- A referral or partner code from `ref` or `via`, and an Outflare campaign link's `ofc`.

## Visits, first and last touch

Each visit is a session. It ends after 30 minutes without activity, or when the visitor comes back through a different campaign: new tags, a new ad click, a `ref` or an `ofc`. A visit keeps:

- its landing page and referrer
- its tags, click ids and codes
- a rough country, taken from the browser's time zone, not its address
- the device type, browser and system

A visit from another page of your own site, or from another of the key's origins, doesn't count as a referral.

When your product identifies a visitor, their visits join their record, and Outflare fills these fields on the person:

- **First touch:** `first_touch_at`, `first_touch_source`, `first_touch_medium`, `first_touch_campaign`, `first_touch_referrer` and `first_touch_landing_page`.
- **Last touch:** the same with `last_touch_`, from their latest visit that came from somewhere (or their latest visit, if every visit was direct).
- **Referral code:** `referral_code`, the partner code from their latest visit that had one.

The source is the `utm_source`, else the ad platform behind the click id (`gclid` is google, `fbclid` facebook), else the site that linked to you, else `direct`. When two people merge, their visits move with them and the touches are worked out again.

Bots, crawlers, link previews and scripts are counted on the key and left out of your data. A browser driven by automation sends nothing.

If a visit can't be sent because of a network or server error, the script tries again after 1, 5 and 25 seconds. Each event has its own id, so a retry is never counted twice.

## Serve it from your own domain

Ad blockers drop requests to analytics hosts, and Safari keeps a cookie set by a script for only seven days. To avoid both, forward a path on your own site to Outflare and load the script from there:

```html
<script async src="/ofx/site.js" data-key="ofk_test_not_a_real_key"></script>
```

The script sends visits to the same path, so they stay on your domain. When the visitor has consented, Outflare sets the `of_aid` cookie from the server on your domain, where browsers keep it for the full year. Your own server can then read it at sign-up.

Forward `/ofx/` to `https://app.outflare.ai/`, for example with a Next.js rewrite:

```js
rewrites: async () => [{ source: "/ofx/:path*", destination: "https://app.outflare.ai/:path*" }]
```

or with nginx:

```nginx
location /ofx/ { proxy_pass https://app.outflare.ai/; proxy_set_header Host app.outflare.ai; proxy_ssl_server_name on; }
```

Cloudflare Workers, Vercel and Netlify rewrites work the same way. In the app, **Website tracking** has the steps for each, ready to copy with your key: choose **Set up own domain** under your script.

The same place tells you whether it works, from the last 7 days of visits: how many came through your own domain, and how many came from Safari or an iPhone or iPad straight to Outflare (visitors those browsers forget after 7 days). The status is **working** once nearly all visits come through your domain. A subdomain pointed at Outflare doesn't count: Safari still keeps its cookies for only 7 days, because the server answering isn't yours.

### Keep the visitor's address

Behind your proxy, every visit comes from your server's address. To pass the visitor's own address on, open the key and choose **Proxy secret** (or call `POST /v1/brands/{brand}/site-keys/{id}/proxy-secret`, or the MCP tool `create_site_proxy_secret`). The secret starts `ofp_` and is shown once. Keep it in your proxy's configuration, never in a page.

Have the proxy send the secret in `X-Outflare-Proxy` and the visitor's address in `X-Outflare-Client-IP`, replacing anything the browser sent. With nginx:

```nginx
location /ofx/ {
  proxy_pass https://app.outflare.ai/; proxy_set_header Host app.outflare.ai; proxy_ssl_server_name on;
  proxy_set_header X-Outflare-Proxy "ofp_test_not_a_real_secret";
  proxy_set_header X-Outflare-Client-IP $remote_addr;
}
```

A Cloudflare Worker sets the same two headers, taking the address from `CF-Connecting-IP`. A plain Next.js rewrite can't add headers, so use middleware there. Behind a CDN, take the address from the CDN's own header, never from the first `X-Forwarded-For` entry, which the browser can set.

Outflare uses the address only when the secret matches and the address is public. Otherwise it uses the connecting address. A new secret replaces the old one at once, and `DELETE .../proxy-secret` removes it.

With the secret, the proxy can also pass the visitor's country in `X-Outflare-Country` (two letters, such as `DE`), from `CF-IPCountry` on Cloudflare or `x-vercel-ip-country` on Vercel. The [consent banner](/docs/guides/consent-banner/) then picks each region's rule by country.

## Sites on more than one domain

Without help, a visitor going from `northpeak.example` to `northpeak-app.example` would get a new id on the second site. List both domains in `data-domains` and links between them carry the visitor along:

```html
<script async src="https://app.outflare.ai/site.js" data-key="ofk_test_not_a_real_key" data-domains="northpeak.example,northpeak-app.example"></script>
```

The id travels only on a link clicked from one of the listed domains, and only for two minutes, so a copied link pasted elsewhere starts a new visitor. The key's snippet lists the domains for you when its origins span more than one. Subdomains of one domain need nothing.

## Clicks and forms without code

Two switches on a script record what visitors do without any change to your pages. Both are off until you turn them on under **Settings → Website tracking**, in **What the script does on its own** below your script. Each switch saves at once.

- **Capture clicks** sends `Element Clicked` for each click on a link or button, with its label, id, classes, the link's address without its query string and the page's path.
- **Capture forms** sends `Form Submitted` with the form's id, name, action and number of fields.

The script never reads what someone typed. A label that holds an email address, a long number or a key-shaped string is left out, and so is anything inside an element marked `data-of-mask` or `data-of-block`. Add `data-outflare-ignore` to an element to leave it out, or `data-autocapture="off"` to the script tag to stop all of it. A page sends at most 100 captured events.

To give one element an event name of its own in your markup, add `data-outflare-event="Pricing CTA Clicked"`. It is sent with or without the switch.

### Named clicks

**Analytics → Named clicks** turns a captured click into an event with a proper name, with no change to the site. The page lists the clicks your site captured; press **Name this click** on one, give it a name such as `Pricing CTA Clicked`, and choose what it matches: the label, a part of the link's address, the element's id or a class, and optionally the page. From then on each matching click is also stored under that name, so it works in funnels, trends, A/B test goals and destinations like any event you send yourself. Naming applies to clicks from now on; the page shows how many of the last 7 days' clicks a rule would have matched.

## Signed-in visitors

Your marketing site often needs to know whether a visitor already has an account, to show **Open the app** instead of **Sign up**. Call this from your app when someone signs in or out:

```js
outflare.signedIn(true);   // after sign-in
outflare.signedIn(false);  // after sign-out
```

The script keeps a cookie on your site's widest domain that holds only `1`. It names nobody. On any page of that domain:

- `outflare.isSignedIn()` says whether the hint is set.
- Elements with `data-outflare-signed-in="show"` appear only for signed-in visitors, and `"hide"` only for everyone else.
- A [feature flag](/docs/guides/feature-flags/) or A/B test can use the **Signed in** condition.

This is a hint for what to show, never proof. Your server must still check who someone is before it shows them anything private.

## Identify from the browser

A browser can never say who its visitor is on its own word: anyone can open the console and type an id. The safest way stays an `identify` from your server at sign-up and sign-in. When that is awkward, your server can vouch for the id and the page does the rest.

1. Under **Settings → Website tracking**, open the script's menu and choose **Turn on browser identify**. You get an identify secret, shown once. Keep it on your server with your other secrets, never in a page.
2. When someone signs in, your server signs their user id with the secret and gives the page the id and the signature:

   ```js
   import { identifySignature } from "@outflare/sdk";
   const signature = await identifySignature(process.env.OUTFLARE_IDENTIFY_SECRET, user.id);
   ```

   ```python
   from outflare import identify_signature
   signature = identify_signature(os.environ["OUTFLARE_IDENTIFY_SECRET"], user.id)
   ```

   In any other language it is the HMAC-SHA256 of the user id with the secret as the key, written as hex.
3. In the page: `outflare.identify(user.id, signature)`.

The browser's earlier visits then join that person. A signature only works for the id it was made for, so a visitor can't use theirs to become someone else. The page sends no traits: a person's name, plan and other fields still come only from your server. **New identify secret** replaces the secret at once, and **Turn off browser identify** removes it.

## Errors

A third switch, **Capture errors**, sends the errors your pages throw. It is also at the top of the Errors page. See [Errors](/docs/guides/errors/).

## Ad pixels without code

The script can load an ad platform's pixel for you, so your site carries no pixel snippet and your developers pass no user data to it. Today that is the ChatGPT Ads pixel.

1. Connect your own ChatGPT Ads account for the brand and fill in its **Pixel ID** (Paid ads, Accounts, Connections).
2. On Website tracking, turn on **Load the ChatGPT Ads pixel** on the site's script. Until the connection has a Pixel ID, the switch stays off and says where to add it.

From the next page a visitor opens, the script loads the pixel once the page has loaded, counts each page view with it, and gives it the signed-in visitor's hashed email address, phone number and id. The hashes are made on Outflare's server, the same ones their conversions carry, so the script never sees an email address. A browser gets them only once your product has identified the person on it ([Identify from the browser](#identify-from-the-browser), or an identify from your server that names the visitor's `anonymousId`).

Nothing loads without the visitor's consent to marketing, and withdrawing it tells the pixel. Someone whose ad data may not be sent has none passed, as with conversions.

If a page still carries the pixel's own snippet, the script leaves it in charge and only adds the user data. Once the switch is on, take that snippet off the site so page views are counted once. Sign-ups and purchases still go from Outflare's server, not from the page.

A site with a Content Security Policy allows `https://bzrcdn.openai.com` in `script-src` and `connect-src`, and `https://bzr.openai.com` in `connect-src` and `img-src`. `data-pixels="off"` on the tag stops the script loading any pixel on that page.

## Safe to put in a page

The site key is public by design. It can only add anonymous page views and track events:

- It can't read anything.
- It can't name, create or merge a person on its own word. The one way in is browser identify above, with a signature only your server can make.
- It doesn't start journeys, send email or count as revenue.
- It works on no other part of the API.

**Edit sites** limits a script to your own domains, which filters out stray traffic: `example.com` covers the site and every subdomain, and `https://app.example.com` that one address. To track another domain with the same brand, add it here rather than making a second script; the tag then lists both, so a visit that crosses them stays one visit. If a brand ends up with two scripts, the page marks the one in use and lets you delete the spare.

Under **More**, **Rotate key** gives the script a new key, and the old one keeps working for seven days while you update the site. **Delete script** stops it at once.

## Consent

The visitor's id is kept in a first-party cookie, but only with consent. By default, visitors in the EEA, Switzerland and the UK, and anyone with Global Privacy Control on, get no cookie. Until they consent, their id lasts for the visit: it's kept in the browser tab's session storage, so every page of the visit counts as the same visitor and shows the same [feature flag](/docs/guides/feature-flags/) versions, and it's gone when the tab closes. Separate visits aren't linked. Once they accept analytics cookies in your banner, call `outflare.consent(true)` and the same id is kept in the cookie for a year.

You can change this on the script tag:

- `data-consent="required"` asks everyone for consent first.
- `data-consent="granted"` is for sites whose banner runs before the script loads.

Without consent, the campaign tags a visitor landed with are kept with that first visit only. If they sign up later, on another visit or another domain, Outflare can't join the two. So on a site without a consent banner, keep the landing page's `utm_*` tags, ad click ids, `ref` and `ofc` (for example in hidden fields on your sign-up form) and send them with the sign-up `identify`: the tags in `context.campaign` and the click ids in `properties.click_ids`, just as the script does. The sign-up is then credited to the right channel even when the visits can't be joined.

To have Outflare show the banner for you, with each region's rules, Google Consent Mode and the ad platforms' consent signals, and keep a cookie policy that updates itself, turn on the [consent banner](/docs/guides/consent-banner/). `outflare.consent()` then also takes categories (`{analytics: true, marketing: false}`), and every choice is kept as the visitor's consent.

Visits are stored in your workspace with the rest of your customer data and aren't shared with anyone.

## Page speed

**Analytics › Page speed** shows how fast your pages were for real visitors. From version 16, the script measures every page load by itself: how long the biggest part of the page took to show (LCP), how long the page took to react to a click or key (INP), and how much the layout jumped while loading (CLS). It also records the first paint (FCP) and the server's response time (TTFB). Sites that load the script from Outflare get the new version with no change.

Each number is the 75th percentile, the value Google judges a page by: three in four visits were at least this fast. Each one is graded good, needs work or poor with Google's thresholds (LCP 2.5s and 4s, INP 200ms and 500ms, CLS 0.1 and 0.25). The page shows:

- The three numbers for your site, with the period before for comparison, and the share of visits where every measured number was good.
- A warning for any page that got noticeably slower than the period before, with enough page loads in both to be sure.
- A table of your pages with their loads, their three numbers and how their loading time changed.

You can narrow it to one website, to phones or computers, and to the last 7, 28 or 90 days. This covers every page your script runs on, including pages too small for Google to have field data for.

A reading carries only the page's address without its query string, the kind of device and the country. It has no visitor id, sets no cookie and isn't an event, so it needs no consent and doesn't count toward your event limits. Readings are deleted after 90 days. To turn the measurement off, add `data-vitals="off"` to the script tag.

In the API it's `GET /v1/brands/{brand}/analytics/page-speed`, and in the MCP server `get_page_speed`.

## Right now

**Analytics › Right now** shows who is on your website this minute, and updates every 5 seconds while it's open. It shows:

- How many visitors are on the site now (active in the last 5 minutes), in the last 30 minutes, and per minute over those 30 minutes.
- The pages open now, where those visitors came from and their countries.
- The events in the last hour, such as sign-ups and orders.
- A feed of the last 30 page views and events as they happen.

It names nobody: a visitor who is already one of your contacts shows as "a known visitor". In the API it's `GET /v1/brands/{brand}/analytics/live`, and in the MCP server `get_site_live`.
