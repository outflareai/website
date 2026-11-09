---
title: Partner programs
description: Run affiliate, referral and influencer programs per brand. Partners get links and codes, and the events and payments your product already sends credit them, each counted once.
sidebar:
  order: 9.6
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

A partner program pays people who send you customers: affiliates, referrers and influencers. Each brand runs its own programs. A partner is a person in your [customer records](/docs/guides/customer-records/), and so is every customer they refer, so the CRM, attribution and lifecycle email all see the same people.

Open **Partners** in a brand to make a program, add partners and set the rewards (a fixed amount for a sign-up, a percentage of each sale, or a bounty for any event you choose).

**Program settings** (top right of the Partners page) opens a page of its own, in tabs: General, Payouts, Tracking, Fraud, Portal and Import. Change what you need on any tab and press **Save changes** at the foot of the page.

## Partner links

Every partner has a code, such as `ana`.

- **Short link:** `https://<your tracking domain>/r/ana`. Outflare counts the click and sends the visitor to your landing page with `ref=ana`. Until you add a [tracking domain](/docs/guides/tracking-domains/) it is `https://app.outflare.ai/r/<workspace id>/ana`. Add `?sub=` to keep the partner's own click id, or `?to=/pricing` to land on another page of your site.
- **Campaign link:** your own page with `?ref=ana` (or `?via=ana`), with no redirect. The website snippet reads the code when the visitor arrives.

Put the [website tracking](/docs/guides/website-tracking/) snippet on every page a partner link can land on, and on your app's sign-up pages. **Program settings → Tracking** has it ready to paste. One visitor id covers your site and its subdomains, so a visit to `www.example.com` still counts when they sign up on `app.example.com`.

## Credit comes from what you already send

A brand's programs read the events and payments your product already sends Outflare. There is no partner-specific code to write.

| What happens | What you send | What the program does |
| --- | --- | --- |
| Someone signs up | Your sign-up's `identify` with the user id and `outflare.anonymousId()`, or a `Signed Up` event | Credits the partner whose link they came from, or the one the event's `ref` or `promo_code` property names |
| They do something you reward | A track event, such as `Trial Started` | Pays the bounty of the reward rule with that event as its trigger |
| They pay, or get a refund | A payment or refund to the transactions API, or an Order Completed event | A partner sale or refund, once per payment |

- **A sign-up is a person's first user id.** Signing in again doesn't count. An `identify` whose `created_at` trait is more than a day old is an existing user, not a new sign-up.
- **Each thing counts once.** A customer signs up once in a program, and a payment is credited once by its id, however many ways it is reported.
- **Order doesn't matter.** A payment that arrives up to an hour before the sign-up that links the partner is credited once the sign-up is in.
- **A deleted payment** takes its commission back, as a full refund does.
- **Only your server's events count.** Anyone can send events from a browser, so those never credit a partner.
- **Your customer id must match.** Use the same user id in your events and your transactions, so a payment finds the person who signed up.

## The partner conversions API

If your backend can't send events or transactions, report sign-ups, sales, refunds and custom conversions to `POST /v1/workspaces/{ws}/partner-conversions` with a token that has only the `partners.conversions` scope. It stores the same events and transactions, with the same ids, so a customer reported both ways still counts once. See the [API reference](/docs/api/reference/) (`createPartnerConversion`).

## Moving from Tolt

Connect Tolt with your own Tolt API key, then open **Program settings → Import**. It brings over your partners, codes, customers and commissions, so every link partners have already shared keeps working. Click **Run again** whenever you like: each run brings only what's new or changed. Once the snippet is on your site and your events and payments reach Outflare, you can stop using Tolt.
