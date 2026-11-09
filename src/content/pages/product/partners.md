---
title: "Affiliate and referral program software · Outflare"
description: "Run affiliate, referral and influencer programs per brand. Partners get links and codes, and the sign-ups and payments you already send credit them once."
h1: "Affiliate and referral programs on the data you already send."
label: Partners
lede: "Give affiliates, referrers and influencers a link and a code, set the rewards, and let the sign-ups, events and payments your product already sends Outflare credit the right partner, each counted once."
answer: "Outflare runs affiliate, referral and influencer programs for each brand. Every partner gets a code, a short link and a campaign link; Outflare's website tracking reads the code when a visitor arrives, and the sign-ups, events and payments your server already sends credit that partner with a fixed amount, a percentage of each sale or a bounty for an event. Partners and the customers they refer are records in your CRM, and you can import an existing Tolt program."
points:
  - "Short links and ?ref= codes for every partner"
  - "Rewards for sign-ups, a share of sales, or any event"
  - "Each sign-up and payment credited once, refunds taken back"
  - "Import partners and commissions from Tolt"
docs:
  - label: Partner programs
    href: /docs/guides/partners/
  - label: Website tracking
    href: /docs/guides/website-tracking/
  - label: Transactions
    href: /docs/guides/transactions/
  - label: Tracking domains
    href: /docs/guides/tracking-domains/
faqs:
  - q: "How does Outflare know which partner sent a customer?"
    a: "The partner's short link or ?ref= (or ?via=) code is read by Outflare's website snippet when the visitor arrives. When your server sends the sign-up, with the visitor's anonymous id, Outflare credits the partner whose link they came from, or the one named in the event's ref or promo_code property."
  - q: "Do I need to write partner-specific code?"
    a: "No. A program reads the sign-ups, events and payments your product already sends Outflare. If your backend can't send them, a partner conversions API takes sign-ups, sales, refunds and custom conversions with a token that has only the partners.conversions scope."
  - q: "What rewards can a program pay?"
    a: "A fixed amount for a sign-up, a percentage of each sale, or a bounty for any event you choose, such as Trial Started. Refunds and deleted payments take their commission back."
  - q: "Can partners game the program from the browser?"
    a: "Browser events never credit a partner, because anyone can send them. Only your server's events, transactions and the partner conversions API count, and each sign-up and payment is credited once by its id."
  - q: "Can I move from Tolt?"
    a: "Yes. Connect Tolt with your own Tolt API key and run Import from Tolt. It brings over partners, codes, customers and commissions so existing links keep working, and Run again brings only what's new or changed."
related:
  - /product/customer-data/
  - /product/outcomes/
  - /product/analytics/
  - /product/brands/
  - /product/social/
updated: 2026-11-09
order: 95
---

## How it works

1. **Make a program** under **Partners** in a brand: affiliate, referral or influencer, with its rewards.
2. **Add partners.** Each is a person in your [customer records](/product/customer-data/) with a code, such as `ana`.
3. **Install the snippet** from the program's **Settings → Install** on every page a partner link can land on, and on your app's sign-up pages.
4. **Send what you already send**: sign-ups, events and payments from your server.
5. **See credit** per partner as customers sign up, act and pay.

## Partner links

| Link | How it works |
| --- | --- |
| Short link | `https://<your tracking domain>/r/ana` counts the click and sends the visitor to your landing page with `ref=ana`. Add `?sub=` for the partner's own click id or `?to=/pricing` for another page. |
| Campaign link | Your own page with `?ref=ana` or `?via=ana`, with no redirect. The website snippet reads the code. |

Until you add a [tracking domain](/docs/guides/tracking-domains/), short links use `app.outflare.ai/r/<workspace id>/ana`. One visitor id covers your site and its subdomains, so a click to `www.example.com` still counts when they sign up on `app.example.com`.

## Credit from what you already send

| What happens | What you send | What the program does |
| --- | --- | --- |
| Someone signs up | Your sign-up's `identify` with the user id and anonymous id, or a `Signed Up` event | Credits the partner whose link they came from, or the one its `ref` or `promo_code` names |
| They do something you reward | A track event, such as `Trial Started` | Credits the bounty for that event |
| They pay, or get a refund | A payment or refund to the transactions API, or an Order Completed event | A partner sale or refund, once per payment |

- **A sign-up is a person's first user id.** Signing in again doesn't count, nor does an existing user.
- **Each thing counts once**, however many ways it's reported.
- **Order doesn't matter.** A payment that arrives up to an hour before the sign-up that links the partner is still credited.
- **Only your server's events count**, never browser events.
- Use the same user id in your events and your transactions, so a payment finds the person who signed up.

## The partner conversions API

If your backend can't send events or transactions to Outflare, report sign-ups, sales, refunds and custom conversions to `POST /v1/workspaces/{ws}/partner-conversions`, with a token that has only the `partners.conversions` scope. It stores the same events and transactions with the same ids, so a customer reported both ways still counts once.

## Moving from Tolt

Connect Tolt with your own API key and open **Settings → Import from Tolt**. Partners, codes, customers and commissions come over, so every link your partners already shared keeps working. Once the snippet is on your site and your events and payments reach Outflare, you can stop using Tolt.

## Why it sits in Outflare

Partners and referred customers are the same records your CRM, [attribution](/docs/guides/attribution/) and [lifecycle email](/product/lifecycle-email/) use. Visits keep the referral code they arrived with, so referrals sit beside your other channels, and programs are in the REST API and the [MCP server](/product/mcp/) for your agents.

## What to know

- Each brand runs its own programs.
- The docs describe crediting and commissions; they don't describe paying partners out, so plan payouts with your own payment tool.
