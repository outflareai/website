---
title: "Customer journeys, rules and lifecycle stages · Outflare"
description: "Build onboarding, failed-payment and win-back journeys with emails, waits, checks and holdouts, driven by rules and per-product lifecycle stages."
h1: "Customer journeys that react to what people do."
label: Journeys
lede: "Turn what happens to your customers into business events with rules, keep each customer's stage per product from trial to churned, and run if-this-then-that journeys of emails, waits, checks and actions, with holdouts that show what they changed."
answer: "Outflare journeys are if-this-then-that flows for the people on your customer records, such as onboarding a new trial or winning back someone who cancelled. Rules turn what happens into business events of your own, like \"stalled after sign-up\", and products and lifecycle stages track where each company and person stands with each product, emitting an event on every move. A journey starts on any of those events and sends lifecycle email, waits, branches and takes actions, and a random holdout shows whether it actually made a difference."
points:
  - "A visual builder with emails, waits, checks, splits and actions"
  - "Rules emit business events you can dry-run first"
  - "A lifecycle stage per product, from trial to churned"
  - "Holdouts measure what a journey changed"
docs:
  - label: Journeys
    href: /docs/guides/journeys/
  - label: Rules
    href: /docs/guides/rules/
  - label: Products and lifecycle stages
    href: /docs/guides/products-and-lifecycle/
  - label: Lifecycle email
    href: /docs/guides/lifecycle-email/
faqs:
  - q: "What is a customer journey in Outflare?"
    a: "A flow that starts when an event lands on a person's timeline (or when someone adds them by hand), then sends lifecycle emails, waits, checks conditions, splits people and takes actions until they reach the end, the goal event or an exit condition."
  - q: "What is the difference between a rule and a journey?"
    a: "A rule watches people and companies and emits a business event, such as customer.stalled, when its condition becomes true; it never sends anything itself. A journey acts on events. Keeping them apart lets one event drive several journeys and webhooks, each changed on its own."
  - q: "Can a journey track customers per product?"
    a: "Yes. Products and lifecycle stages keep a stage per product for every company and person, so a company that cancels one product while it keeps paying for another isn't treated as churned, and a journey can check which product a move was about."
  - q: "How do I know a journey worked?"
    a: "Mark one path of a random split as a holdout. The journey then shows each path against the people held out, with conversions and revenue in the 30 days after the split and whether the difference is real or too early to tell."
  - q: "Can I change a journey while it's live?"
    a: "Yes. Edit makes a draft version beside the live one, and Publish swaps it in. You choose whether people already in it finish on their version or move to the new one, and every version that went live is kept."
related:
  - /product/lifecycle-email/
  - /product/customer-data/
  - /product/product-analytics/
  - /product/paid-media/
  - /product/agents/
updated: 2026-11-09
order: 91
---

## Three parts that work together

| Part | What it does | Example |
| --- | --- | --- |
| [Products and lifecycle stages](/docs/guides/products-and-lifecycle/) | Keeps each company's and person's stage per product, and emits an event on every move | `product.churned` when a company cancels one product |
| [Rules](/docs/guides/rules/) | Turns what happens into business events of your own | `customer.stalled`: signed up, no activation within 7 days |
| [Journeys](/docs/guides/journeys/) | Acts on events with emails, waits, checks and actions | Onboarding, saving a failed payment, win-back |

## Journeys

Open **Lifecycle → Journeys**. The builder draws the flow from the top down, with each step's live numbers and how many people are on it now. Anything that would stop it going live, such as an unpublished template, is marked in red.

**What starts it:** an event on a person's timeline that matches its filter (from your app, a connected tool or a rule), or a person added by hand. By default a person goes through once, and you can cap how many start an hour or a day.

**Steps:**

- **Email** sends a published [lifecycle template](/product/lifecycle-email/), with the person's topic and marketing choices respected.
- **Wait** from a minute to 90 days, or **Wait until** an event, a condition or a timeout.
- **Check** goes one way or the other on a field, the event, something they did since, or whether they opened or clicked an earlier email.
- **Split** by conditions or at random by weight, with an optional holdout.
- **Actions**: set a field, add a tag, move someone in or out of a list, record consent, assign an owner, move a deal, start or stop another journey or a sequence, raise an alert, post to Slack, call a webhook, push to HubSpot, a sequencer or an ad audience, or ask your own AI model to sort the person.

Steps that call another service use your workspace's own connection and stay off until you connect it.

**Test** takes one person through the journey without sending or changing anything, and lights up the path they would take.

## Holdouts: what a journey changed

Mark one path of a random split as a holdout, and those people leave the journey there. Because the split is random, what they do afterwards shows what would have happened anyway. Select the split to see each path against them: conversions and payments in the 30 days after, the difference, and whether it's real (it needs at least 30 people on each side).

## Rules

A rule reads as a sentence: "**When** someone does **signed_up** **and doesn't** do **product_activated** **within 7 days**, **if** plan is not enterprise, **emit** customer.stalled."

| Trigger | Fires when |
| --- | --- |
| Event | An event happens on a person's timeline |
| Change | A record's fields come to meet the conditions, such as a deal becoming won |
| Absence | An event doesn't happen within a time, or nothing happens for a stretch |
| Audience | Someone joins or leaves a smart list |

**Dry run** shows what a rule would have done over the last 7, 30 or 90 days. Rules fire once per record and episode, never for what happened before they went live, for late data, for website snippet events or for hand edits unless you allow it.

## Products and lifecycle stages

A brand can sell several products, and a customer can be in a different place with each. Outflare keeps a **company stage** per product (lead, trial, active, at risk, churned) for billing, and a **person stage** (invited, activated, at risk, inactive) for usage. Products are matched from your events, a billing connection or aliases; you don't need Stripe. Churn can mean cancelling, or no usage for a set number of days for pay-as-you-go products.

Every move emits an event such as `product.trial_started`, `product.at_risk` or `product.reactivated`, plus the `lifecycle.moved` webhook. Each company also has an overall status across products, such as `partly_churned`. Turning stages on starts from nothing: events from before never move anyone or send anything.

## For agents

Journeys live under `/v1/brands/{brand}/journeys`, rules under `/v1/brands/{brand}/rules` and stages under `/v1/brands/{brand}/lifecycle`, with MCP tools such as `create_journey`, `test_journey`, `get_journey_lift`, `create_rule`, `simulate_rule` and `get_record_lifecycle`. Ask *"Did the onboarding journey's emails make more trials pay than the people we held out?"*

## What to know

- Emails go through your own Amazon SES, Postmark or Resend account.
- Journeys act on your [customer records](/product/customer-data/), so your product needs to send events to Outflare.
