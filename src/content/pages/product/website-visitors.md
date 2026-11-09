---
title: "Website visitor identification you control · Outflare"
description: "See which companies and people visit your website, what they read and who is ready to talk, with hot-visitor alerts and lookups on your own data provider."
h1: "See who visits your website, and who is ready to talk."
label: Website visitors
lede: "Outflare's website tracking records every visit, joins visitors to the people and companies already in your workspace when they sign in or click your emails, scores them on buying intent and alerts you when one turns hot."
answer: "Outflare identifies website visitors by tying them to people already in your workspace, when they sign in to your product, click a link in an email you sent, or open a visitor link. It has no identity data of its own and never fingerprints devices. For unknown visitors you can turn on company lookups through your own People Data Labs or Snitcher account, or take in people named by your own RB2B, Vector or Warmly account, and every person and company gets a 0–100 intent score with an alert when it turns hot."
points:
  - "Visitors join their records on sign-in or an email click"
  - "Company lookups on your own PDL or Snitcher account"
  - "Intent scores from pricing, demo and comparison page views"
  - "Hot visitors alert you in the app, by email, Slack or webhook"
docs:
  - label: Website visitors
    href: /docs/guides/website-visitors/
  - label: Website tracking
    href: /docs/guides/website-tracking/
  - label: Alerts
    href: /docs/guides/alerts/
  - label: Consent banner
    href: /docs/guides/consent-banner/
faqs:
  - q: "How does Outflare identify website visitors?"
    a: "It joins a visitor's browser to someone already in your workspace when they sign in to your product (your product sends identify), click a link in a sequence or lifecycle email you sent, or open a visitor link you made for them. It never guesses, fingerprints devices or matches people by IP address on its own."
  - q: "Can Outflare tell me which company an anonymous visitor works at?"
    a: "Yes, if you connect your own People Data Labs (IP Enrichment) or Snitcher account and turn on company lookups. Only visitors who accepted your cookies are looked up, lookups spend your provider's credits, and a looked-up company is never added to your CRM until someone clicks Add to CRM."
  - q: "Does Outflare work with RB2B, Vector or Warmly?"
    a: "Yes. With your own account at one of them, Outflare takes in the people it names through a webhook. New people are held for review and get no email of any kind until someone approves them. These tools only name people in the United States."
  - q: "What makes a visitor hot?"
    a: "Each person and company gets a 0–100 score from key page views (pricing, demo, contact, comparison and others you set), return visits and pages viewed, fading after 7, 14 and 30 days without a visit. At the hot score, 60 by default, Outflare raises an alert and sends the visitor.became_hot webhook, at most once a week each."
  - q: "Is visitor identification GDPR-friendly?"
    a: "Outflare's own matching uses only first-party signals (sign-ins and your email clicks), by default keeps no visitor cookie for people in the EEA, the UK and Switzerland until they consent, and looks up companies only for visitors who accepted cookies. People-naming tools must never be used for visitors in the EU, UK, Canada or Australia, and you are responsible for your privacy policy."
related:
  - /product/analytics/
  - /product/customer-data/
  - /product/consent/
  - /product/leads/
  - /product/inbox/
updated: 2026-11-09
order: 81
---

## How visitors are named

Outflare names a visitor only when it can tie them to someone already in your workspace. It keeps no identity data of its own and never guesses:

- **Your product.** When your product sends `identify` on sign-up or sign-in, with the browser's anonymous id, that browser's earlier and later visits join the person's record.
- **Email clicks.** A link to your own site in a sequence or lifecycle email carries a short signed token. The first browser that opens it joins the person the email went to. It works for seven days, mail scanners never get one, and a forwarded link opened elsewhere names nobody.
- **Visitor links.** For your own product emails, texts, push notifications or QR codes, make a visitor link for a person through the API or MCP. It works like an email click.

When a browser joins a person, its earlier pages, events, visits and consent choices move onto their record, and their timeline shows **Went from anonymous visitor to known**, with how and on which device.

Setup is the [website tracking](/docs/guides/website-tracking/) snippet: one script tag per brand.

## Optional: companies and people from your own providers

For visitors nobody knows yet, two options run on accounts you connect, never on Outflare's:

| Option | Provider (your own account) | What it does |
| --- | --- | --- |
| Company lookups | People Data Labs (IP Enrichment) or Snitcher (IP to Company) | Matches a visitor's IP address to a company, up to a daily limit you set (500 by default) |
| People by name | RB2B, Vector or Warmly | Takes in the people the tool names, through a webhook, held for review |

Company lookups run only for visitors who accepted your cookies. The IP address goes to your provider in a background job and is never stored. Home, phone, VPN and data-centre connections name nobody. A company already in your CRM is linked at once; any other is listed as **Not in CRM** until someone adds it, because lookups are often wrong.

People-naming tools only name people in the United States. New people stay off your lists and get no email until someone approves them, and approved people remain third-party prospects: cold email only, never marketing email without their own consent.

## Scores and hot visitors

**Visitors** shows companies or people for the last 7, 30 or 90 days, with pages viewed, key pages viewed, visits, the last page and a score from 0 to 100. Key pages show buying intent. The defaults are pricing, plans, demo, contact, booking, comparison, alternatives, enterprise, sign-up and trial pages, and you can set your own paths.

When a person or company reaches the hot score, Outflare:

- raises an [alert](/docs/guides/alerts/) for owners and admins, in the app, by email and in Slack if you connect it;
- sends the `visitor.became_hot` webhook, so your CRM or Zapier can act;
- puts them in your [digest](/docs/guides/digests/).

Leave out your own company's domains, and optionally your paying customers, so the list shows prospects only.

## Every visitor's journey

**Everyone** lists every browser on your site, anonymous ones included, with the looked-up company, country, device and visits. Open one to see its journey visit by visit, with the channel, referrer and campaign each came from and the pages and events in order. Each profile has its own link to share with your team.

## For agents

The API and the [MCP server](/product/mcp/) list visitors and browsers, read and change settings, add a looked-up company to your CRM, approve or reject held people and make visitor links (`list_website_visitors`, `get_visitor_browser`, `create_visitor_link` and more). Ask an agent "which companies looked at pricing this week, and are any of them in an open deal?"

## What Outflare doesn't do

- It doesn't sell or hold identity data, or fingerprint devices.
- It doesn't add looked-up companies to your CRM by itself, or email anyone a tool named without approval.
- It doesn't pay for lookups. They spend your own provider's credits.
