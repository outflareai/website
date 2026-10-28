---
title: Consent banner and cookie policy
description: Show your cookie banner from Outflare's website script, follow each region's law and the ad platforms' consent signals, and keep a cookie policy that updates itself from what your site uses.
sidebar:
  order: 9.65
---

<span class="pill shipped">Shipped</span> In the web app (**Analytics → Website tracking**), the REST API and the MCP server.

Outflare's [website script](/docs/guides/website-tracking/) can show your cookie consent banner itself, so you don't need a separate banner tool. Tracking, conversions sent back to ad platforms, and the banner all read the same consent. Each visitor's choice is kept as a consent on their [customer record](/docs/guides/customer-records/).

Every law and framework is on by default, and you can turn each one off per site:

- **Ask first** in the EEA, the UK and Switzerland (GDPR, UK GDPR and the Swiss FADP).
- **Opt-out** in the US, with a "Do not sell or share my personal information" button (the CCPA and the other state privacy laws).
- **Global Privacy Control**: browsers that send it get no marketing.
- **Google Consent Mode v2**, and the **Meta**, **TikTok** and **Microsoft** consent signals.

## Turn it on

Open **Analytics → Website tracking**, press **Consent banner** next to your site, tick **Show the banner** and save. Your site only needs the script you already have. Visitors see the banner on their next page, or within five minutes if they already have the site open.

The same settings are in the API (`PUT /v1/workspaces/{ws}/site-keys/{id}/consent-banner`) and MCP (`update_consent_banner`):

```json
{ "enabled": true, "policy_url": "/cookies" }
```

## Who sees what

Each region has a rule:

| Rule | What the visitor gets | Default for |
|---|---|---|
| Ask first (`opt_in`) | Analytics, marketing and preferences stay off until they accept. **Accept all** and **Reject all** look the same, as European regulators require. | The EEA, the UK and Switzerland |
| Opt-out (`opt_out`) | Everything is on. The banner says so once, with a "Do not sell or share my personal information" button that turns marketing off. | The United States |
| Inform only (`notice`) | Everything is on. The banner says so once. | |
| No banner (`none`) | Everything is on, with no banner. | Everywhere else |

The region comes from the browser's time zone. If your site sends tracking through its own domain with a proxy secret, the proxy can pass the visitor's country instead ([see below](#the-visitors-country)). A browser can't reliably tell which US state someone is in, so the US rule covers the whole country.

With Global Privacy Control on (the default), a browser that sends it starts with marketing off everywhere. The visitor can still turn marketing on themselves.

## Categories and holding tags back

**Necessary** is always on. It covers remembering the visitor's choice (the `of_consent` cookie). The banner asks about **analytics**, **marketing** and **preferences**; untick any your site doesn't use. The analytics choice also decides whether the visitor's id is kept in the `of_aid` cookie.

Hold other tags back until their category is allowed. Give a script `type="text/plain"` and `data-category`, and give an iframe `data-src` instead of `src`:

```html
<script type="text/plain" data-category="marketing" src="https://ads.example/pixel.js"></script>
<script type="text/plain" data-category="analytics">startStats();</script>
<iframe data-category="marketing" data-src="https://video.example/embed/123"></iframe>
```

They run as soon as their categories are allowed: straight away for someone who allowed them before, or the moment the visitor accepts. Tags added later, by your own code or a tag manager, are checked too. A tag with several categories (`data-category="analytics marketing"`) needs all of them.

## Ad platforms

With the banner on, the script sets each platform's consent for you. You can turn any of them off.

- **Google Consent Mode v2:** a default on the first page, then an update on each choice. `ad_storage`, `ad_user_data` and `ad_personalization` follow marketing, `analytics_storage` follows analytics, and `functionality_storage` and `personalization_storage` follow preferences. Put the Outflare script above your Google tag or Tag Manager container so the default lands first.
- **Meta:** `fbq('consent', 'grant')` or `'revoke'`.
- **TikTok:** holds consent while the visitor decides, then grants or revokes it.
- **Microsoft Advertising (UET):** consent mode for `ad_storage`.

Conversions Outflare sends back to ad platforms use the same choice: marketing decides whether they may be sent.

## How it looks

- **Layout:** a bar across the top or bottom, a box in a corner, or a modal in the middle of the page.
- **Look:** light, dark, or your brand's. The brand look uses the logo and colours under **Company → About your company → Logo and colours**, or a brand's own logo and colours when the script belongs to a brand that has them.
- **Changing their mind:** after a choice, a small button in the corner reopens the banner. Any element with `data-outflare-consent-open`, such as a "Cookie settings" link in your footer, does the same.
- **Words:** Outflare's own come in English, German, French, Spanish, Italian, Dutch and Portuguese, in the visitor's language. Change any of them, in any language, in the settings or the API (`texts`).
- **Your own design:** add CSS on top of a preset, or replace the banner's HTML entirely. Buttons with `data-of-consent="accept"`, `"reject"`, `"customize"` or `"save"`, and checkboxes with `data-of-category="analytics"`, work as they do in the presets. Any element can also call `outflare.consent(...)`. Your own CSS and HTML run on your website, so only owners and admins can change them.

## From your own code

```js
outflare.consent();                       // the visitor's choices: analytics, marketing, preferences, region...
outflare.consent(true);                   // accept everything
outflare.consent(false);                  // refuse or withdraw everything
outflare.consent({ marketing: false });   // change some
outflare.showConsent();                   // open the banner on its categories
outflare.onConsent(function (c) { ... }); // now, and on every change
```

These work without Outflare's banner too: keep your own banner, call `outflare.consent(...)` from it, and each choice is still kept in Outflare. Add `data-banner="off"` to the script tag if Outflare's banner should never show.

## Proof of consent

Each choice that changes something is saved as consents on the visitor, one per category, plus Google's three ad purposes. Each consent records:

- what was chosen and how (accept all, reject all, per category, opt-out, Global Privacy Control, or your own code)
- the banner's version
- the region, and the country when known
- Global Privacy Control
- the language and the page

Before the visitor is known, these are kept on their anonymous id. When your product sends `identify` with that id, they join the person's record along with their earlier visits. Read them with `GET /v1/workspaces/{ws}/records/{record}/consents`.

## Asking again

Where the rule is ask first:

- **After a year:** visitors are asked again after 365 days. You can change how long, or set 0 to never ask again.
- **A new category:** starting to ask about a category the banner didn't ask about before asks everyone again.
- **By hand:** **Ask everyone again** (API `POST .../consent-banner/reask`, MCP `reask_consent_banner`) does it whenever you choose.
- **A new vendor:** your cookie policy starts listing a vendor in a category that needs consent, so what visitors agreed to has changed (see below).

## The cookie policy

Outflare keeps a cookie policy for each site up to date on its own. It lists every cookie, browser storage key and third-party script, embed and pixel your site uses, why, and for how long.

### How it finds them

- **Scans:**
  - OutflareBot reads up to 20 pages of your site: the home page, then the pages visits land on most. It follows `robots.txt`.
  - It records the cookies your server sets, and the third-party scripts, embeds and pixels in your HTML, including the ones inline snippets load.
  - Sites with the banner on are scanned every week. **Scan now** runs one straight away (API `POST .../site-keys/{id}/cookie-scans`, MCP `scan_site_cookies`).
- **Visitors' browsers:**
  - Once a day per browser, three seconds after a page loads, the script reports the *names* of the page's cookies, storage keys, scripts and iframes. This catches what scripts and tag managers set, which a scan of the HTML can't see.
  - It never sends a value, a query string or who the visitor is.
  - Add `data-cookies="off"` to the script tag to stop it.

Each thing found is matched to Outflare's catalogue of around 45 known vendors, such as Google, Meta, TikTok, LinkedIn, Microsoft, HubSpot, Hotjar and Stripe. The catalogue gives its category, purpose and how long it is kept.

### Reviewing what was found

Press **Cookies** next to your site on **Analytics → Website tracking** (API `GET .../site-keys/{id}/cookies`, MCP `list_site_cookies`).

- Things the catalogue knows go into the policy straight away.
- Things it doesn't know wait under **To review**. Give each one a category and a purpose to list it, or **Leave out** (API `PATCH .../cookies/{cookie}`, MCP `classify_site_cookie`). Your answer always wins over the catalogue's.
- **Set before consent** marks something a visitor's browser had before they allowed its category. It usually means a tag that isn't held back yet: give it `type="text/plain"` and `data-category`.
- Anything not seen for 30 days drops out of the policy.

### Versions

Each time what the policy lists changes, a new version is published, recording what was added and what was removed (API `GET .../cookie-policy/versions`). When a version adds a vendor new to analytics, marketing or preferences, visitors who chose before are asked again where their region asks first. A cookie that disappears asks no one again.

### Showing it

- **On your own page:** add `<div data-outflare-cookie-policy></div>` where the policy should go. The script fills it in, with a button that opens the banner.
- **Hosted page:** `https://app.outflare.ai/cookie-policy/{site key id}`, linked from the Cookies panel.
- **API:** `GET .../site-keys/{id}/cookie-policy?format=markdown` (or `text` or `html`) for your workspace. Your site's pages can also fetch the public `GET /v1/site/cookie-policy?key=ofk_...&format=json` (or `markdown`, `text` or `html`).
- **MCP:** `get_cookie_policy`.

The policy's own text is in English for now.

## The visitor's country

If your site sends tracking through its own domain with a [proxy secret](/docs/guides/website-tracking/), the proxy can also pass the visitor's country in `X-Outflare-Country` as two letters, such as `DE`. Take it from your CDN's geolocation: `CF-IPCountry` on Cloudflare, or `x-vercel-ip-country` on Vercel. The banner then picks the region's rule by country instead of time zone. Outflare uses it only when the proxy secret matches.

## IAB TCF

The banner doesn't support IAB's Transparency and Consent Framework, which matters mostly to publishers selling ads through programmatic exchanges.
