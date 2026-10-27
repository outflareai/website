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

Cloudflare Workers, Vercel and Netlify rewrites work the same way.

### Keep the visitor's address

Behind your proxy, every visit comes from your server's address. To pass the visitor's own address on, open the key and choose **Proxy secret** (or call `POST /v1/workspaces/{ws}/site-keys/{id}/proxy-secret`, or the MCP tool `create_site_proxy_secret`). The secret starts `ofp_` and is shown once. Keep it in your proxy's configuration, never in a page.

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

## Sites on more than one domain

Without help, a visitor going from `northpeak.example` to `northpeak-app.example` would get a new id on the second site. List both domains in `data-domains` and links between them carry the visitor along:

```html
<script async src="https://app.outflare.ai/site.js" data-key="ofk_test_not_a_real_key" data-domains="northpeak.example,northpeak-app.example"></script>
```

The id travels only on a link clicked from one of the listed domains, and only for two minutes, so a copied link pasted elsewhere starts a new visitor. The key's snippet lists the domains for you when its origins span more than one. Subdomains of one domain need nothing.

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
