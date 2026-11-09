---
title: "Cookie consent banner and auto cookie policy · Outflare"
description: "A cookie consent banner in Outflare's website script, with GDPR, CCPA, Global Privacy Control, Google Consent Mode v2 and a cookie policy that updates itself."
h1: "A consent banner and cookie policy that keep themselves current."
label: Consent
lede: "Turn on the banner from the website script you already have. It follows each region's rule, sets Google, Meta, TikTok and Microsoft consent signals, keeps every choice as proof on the visitor's record, and builds a cookie policy from what your site actually uses."
answer: "Outflare's website script can show your cookie consent banner, so you don't need a separate consent tool. It asks first in the EEA, the UK and Switzerland, offers a \"Do not sell or share\" opt-out in the US, honours Global Privacy Control, and sets Google Consent Mode v2 and the Meta, TikTok and Microsoft consent signals. Each choice is kept as a consent on the visitor's customer record, and a cookie policy listing every cookie, storage key and third-party script your site uses updates itself from weekly scans and visitors' browsers."
points:
  - "Ask first in the EEA, UK and Switzerland; opt-out in the US"
  - "Google Consent Mode v2 plus Meta, TikTok and Microsoft signals"
  - "Proof of consent kept on each visitor's record"
  - "A cookie policy built from weekly scans of your site"
docs:
  - label: Consent banner and cookie policy
    href: /docs/guides/consent-banner/
  - label: Website tracking
    href: /docs/guides/website-tracking/
  - label: Paid media
    href: /docs/integrations/paid-media/
  - label: Customer records
    href: /docs/guides/customer-records/
faqs:
  - q: "Does the banner support Google Consent Mode v2?"
    a: "Yes. It sets a default on the first page and an update on each choice. ad_storage, ad_user_data and ad_personalization follow marketing, analytics_storage follows analytics, and functionality_storage and personalization_storage follow preferences. Put the Outflare script above your Google tag."
  - q: "Which privacy laws does it follow?"
    a: "By default it asks first in the EEA, the UK and Switzerland (GDPR, UK GDPR and the Swiss FADP), shows an opt-out with a \"Do not sell or share my personal information\" button in the US, and treats Global Privacy Control as marketing off. Each rule can be changed per site."
  - q: "How does the cookie policy update itself?"
    a: "OutflareBot scans up to 20 pages of your site every week, and visitors' browsers report the names (never values) of cookies, storage keys, scripts and iframes once a day. Findings are matched to a catalogue of around 45 known vendors, unknown ones wait for you to review, and each change publishes a new version."
  - q: "Can I keep my own consent banner?"
    a: "Yes. Call outflare.consent(...) from your own banner and every choice is still kept in Outflare, and add data-banner=\"off\" so Outflare's banner never shows."
  - q: "Does it support the IAB TCF?"
    a: "No. The banner doesn't support IAB's Transparency and Consent Framework, which matters mostly to publishers selling ads through programmatic exchanges."
related:
  - /product/website-visitors/
  - /product/analytics/
  - /product/paid-media/
  - /product/customer-data/
  - /product/experiments/
updated: 2026-11-09
order: 97
---

## Turn it on

Open **Analytics → Website tracking**, press **Consent banner** next to your site, tick **Show the banner** and save. Your site only needs the [website tracking](/docs/guides/website-tracking/) script it already has. Visitors see the banner on their next page.

Tracking, conversions Outflare sends back to ad platforms, and the banner all read the same consent.

## Who sees what

| Rule | What the visitor gets | Default for |
| --- | --- | --- |
| Ask first | Analytics, marketing and preferences stay off until they accept. **Accept all** and **Reject all** look the same. | The EEA, the UK and Switzerland |
| Opt-out | Everything is on, with a "Do not sell or share my personal information" button that turns marketing off | The United States |
| Inform only | Everything is on, and the banner says so once | |
| No banner | Everything is on | Everywhere else |

The region comes from the browser's time zone, or from the visitor's country if your proxy passes it. Browsers that send Global Privacy Control start with marketing off everywhere.

## Holding other tags back

**Necessary** is always on. The banner asks about **analytics**, **marketing** and **preferences**. Hold other tags until their category is allowed:

```html
<script type="text/plain" data-category="marketing" src="https://ads.example/pixel.js"></script>
<iframe data-category="marketing" data-src="https://video.example/embed/123"></iframe>
```

They run the moment their category is allowed. Tags added later by your own code or a tag manager are checked too.

## Ad platforms

With the banner on, the script sets each platform's consent for you: **Google Consent Mode v2**, **Meta** (`fbq('consent', ...)`), **TikTok** and **Microsoft Advertising (UET)**. Conversions Outflare sends back to [ad platforms](/product/paid-media/) follow the same marketing choice.

## How it looks

- A bar at the top or bottom, a box in a corner, or a modal.
- Light, dark, or your brand's logo and colours.
- Outflare's own words in English, German, French, Spanish, Italian, Dutch and Portuguese, in the visitor's language; change any of them.
- A small button reopens the banner after a choice, and any element with `data-outflare-consent-open`, such as a "Cookie settings" footer link, does the same.
- Your own CSS on top of a preset, or your own HTML entirely (owners and admins only).

## Proof of consent

Each choice that changes something is saved as consents on the visitor, one per category plus Google's three ad purposes, with how it was chosen, the banner's version, the region and country, Global Privacy Control, the language and the page. Before the visitor is known, they're kept on their anonymous id; when your product identifies them, they join their [customer record](/product/customer-data/).

Visitors are asked again after a year (you can change it), when you start asking about a new category, when you press **Ask everyone again**, and when your cookie policy adds a new vendor in a category that needs consent.

## The cookie policy

Outflare keeps a cookie policy for each site that lists every cookie, browser storage key and third-party script, embed and pixel, why, and for how long.

- **Scans.** OutflareBot reads up to 20 pages weekly, obeying robots.txt, and records the cookies your server sets and the third-party tags in your HTML.
- **Visitors' browsers.** Once a day per browser, the script reports the names of cookies, storage keys, scripts and iframes, never values or who the visitor is. Turn it off with `data-cookies="off"`.
- **Review.** Known vendors go straight into the policy; unknown ones wait under **To review**. **Set before consent** flags a tag that isn't held back yet.
- **Show it** on your own page with `<div data-outflare-cookie-policy></div>`, on a hosted page, or through the API and MCP.

The policy's own text is in English for now.

## What to know

- Outflare provides the banner and records; whether your setup meets the law where you operate is yours to check.
- The US rule covers the whole country, because a browser can't reliably tell which state someone is in.
