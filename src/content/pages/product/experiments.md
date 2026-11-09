---
title: "A/B testing, feature flags and SEO split testing · Outflare"
description: "Test page versions with no code, run feature flags, and measure SEO changes with matched test and control pages from your own Search Console data."
h1: "A/B tests, feature flags and SEO split tests in one place."
label: Experiments
lede: "Change a page with the visual editor or your own AI model, split visitors between versions with feature flags, and see how likely each version is to win. For search, test a change on half your pages and compare it with the other half."
answer: "Outflare runs three kinds of experiment. A/B tests split your visitors between versions of a page, built in a no-code editor or in code, and show how likely each version is to beat the original with a check that stays honest however often you look. Feature flags turn things on for the visitors you pick. SEO experiments split your pages into matched treatment and control groups and measure a change from your own Search Console data, so a Google update isn't mistaken for your change."
points:
  - "No-code page tests with a visual editor and AI help"
  - "Results safe to check every day, with variance reduction"
  - "Feature flags shared by your pages and your servers"
  - "SEO split tests from your own Search Console data"
docs:
  - label: A/B tests
    href: /docs/guides/ab-tests/
  - label: Feature flags
    href: /docs/guides/feature-flags/
  - label: SEO experiments
    href: /docs/guides/seo-experiments/
  - label: Website tracking
    href: /docs/guides/website-tracking/
faqs:
  - q: "What is SEO split testing?"
    a: "Instead of changing every page and comparing before and after, you change only a treatment group of pages and leave a matched control group alone. The control shows what would have happened anyway, so a Google update or a seasonal dip isn't mistaken for your change. Outflare matches the groups and measures clicks, impressions, CTR or position from Search Console."
  - q: "Can I run an A/B test without a developer?"
    a: "Yes, once the tracking script is on your site. Choose Test a page, then edit each version in the visual editor (change text, styles and images, move or hide parts) or describe the change and let your own AI model write it. Nothing the editor saves can run code."
  - q: "Can I check A/B test results every day?"
    a: "Yes. Outflare's Safe to stop check stays honest however often you look, so peeking doesn't produce false winners. The price is that it needs two to three times the visitors of a test you look at only once; adjusting for what visitors did before the test narrows the range again."
  - q: "How long will my A/B test take?"
    a: "Before you start, the planner reads the last 28 days of your real traffic and says how many visitors and weeks each version needs for a 5, 10, 25 or 50% change. Small sites can only find big changes, and the planner warns when a test is unlikely to finish within 8 weeks."
  - q: "Can an AI agent run A/B tests?"
    a: "An agent can build a no-code test and its versions through the API or MCP and check them with previews. Anything visitors would see, such as starting or shipping a test, waits for a person to approve it."
related:
  - /product/product-analytics/
  - /product/analytics/
  - /product/seo/
  - /product/agents/
  - /product/consent/
updated: 2026-11-09
order: 85
---

## Three kinds of experiment

| | A/B tests | Feature flags | SEO experiments |
| --- | --- | --- | --- |
| Question | Which version of a page wins with visitors? | Who should get this, and when? | Did a change to these pages help in search? |
| Splits | Visitors | Visitors | Pages |
| Measured on | Events, page views, revenue, won deals | (Run an A/B test on the flag) | Search Console clicks, impressions, CTR or position |
| Where | Analytics → A/B tests | Analytics → Feature flags | SEO → Experiments |

## A/B tests

**Test a page, no code.** Enter the page, how many new versions to compare (one to four) and the goal. Build each version in the visual editor, which opens your real page with an editor over it: click anything to change its text, style or image, drag parts around, add a button or hide something. Or describe the change, such as "make the headline shorter and add a Start free button", and your own [AI model](/docs/agents/ai-models/) writes it for you to keep or discard. **Split URL tests** send visitors to whole other pages on your own domains.

**From a feature flag.** Developers show versions in code or CSS, then pick the control, one to five goals, up to five guardrails and the smallest change worth finding.

**Before you start**, a checklist catches what would stop the test measuring something useful (a broken version, no visitors in a week, slow flags that show the original first), and a planner estimates how long it will take on your real traffic. Starting **registers** the test: its hypothesis, control, goals and guardrails are fixed, so results can't be reshaped afterwards.

**Reading the results.** For each goal and version: visitors and conversions, **chance to beat the control**, **lift** with a range, and a **Safe to stop** badge that stays honest however often you look. The winner is a version at least 95% likely to beat the control and safe to stop. Results correct for several versions, adjust for what visitors did in the 28 days before (variance reduction), flag a guardrail a winner hurts, and warn in red when the split looks wrong. Breakdowns by device, source, country and new or returning visitors are for learning; the winner is always decided on everyone.

There are also multivariate tests across up to three flags, a check for tests that ran at the same time, and a Learnings library you can ask questions of.

## Feature flags

A flag is a **switch** (on or off) or a **split** between two to ten weighted versions, each able to carry content such as a new headline. Target by path, site, URL parameter, referrer, device, language or properties your server sends, then roll out to a share of matching visitors.

- **Each visitor keeps their version** on every page and visit, and your servers get the same answer from the API.
- **No flicker**: decide on your server and hand the answer to the page, or hide the page for at most 1.5 seconds until flags arrive.
- **Exclusion groups and holdouts** keep tests apart and measure what all of a group's changes did together.

## SEO experiments

1. **Make it.** Pick the site, a path pattern such as `/blog/*`, the metric, the share of pages held back (50% by default) and how many days to compare (28 before and after by default).
2. **Change the treatment pages** only. Outflare lists them; the groups are matched so both get the same mix of busy and quiet pages.
3. **Start it.** By default it starts on the site's next production deploy from a watched GitHub repository or Vercel project, or from a date you give.
4. **Read the result**: each group's change, the lift, a p-value and a verdict of `better`, `worse`, `no_clear_change` or `too_early`.

Where a change must go to every page at once, choose **before and after** instead, knowing it can't separate your change from anything else that happened.

## For agents

Everything is in the API and the [MCP server](/product/mcp/): `create_ab_test`, `get_ab_test_results`, `ship_ab_test`, `create_flag`, `evaluate_flags`, `create_experiment`, `start_experiment` and more. **Agents build, people decide**: starting or shipping a test, turning a flag on, and changing a live version wait for a person under **Actions**.

## What to know

- AI help uses your own AI key and appears under AI usage as **A/B tests**. The AI only proposes; nothing changes until you apply it.
- Your own team and bots are left out of every test.
- Ending a test and shipping the winner stay yours. Outflare alerts you when a test is safe to stop, but never ships on its own.
