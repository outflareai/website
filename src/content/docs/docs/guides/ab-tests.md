---
title: A/B tests
description: Find out which version of a page wins. Pick a feature flag, say what counts as success, and Outflare shows how likely each version is to beat the original, by how much, and when it's safe to stop.
sidebar:
  order: 9.75
---

<span class="pill shipped">Shipped</span> In the web app (**Analytics → A/B tests**), the REST API and the MCP server.

An A/B test asks a [feature flag](/docs/guides/feature-flags/) a question: which of its versions does best? The flag splits your visitors between versions; the test says which version is the original (the control), what counts as success, and when it measured. Outflare then shows how each version is doing, with numbers you can trust even if you check every day.

A/B tests compare versions shown to visitors. To compare groups of pages for search, use [SEO experiments](/docs/guides/seo-experiments/).

## Set one up

1. Make a flag with two or more versions, such as `control` and `faster`, and read it on your pages (see below).
2. In **Analytics → A/B tests**, choose **New test**, or choose **A/B test it** from the flag's menu in **Feature flags**. Pick:
   - **The control.** The version the others are compared with, usually what visitors see today.
   - **Goals.** One to five. Each is an event, such as `signup_started`, or a page being viewed, such as `/thanks` (`/docs/*` counts every page under `/docs`). The first goal decides the winner; the rest are watched alongside it.
   - **The smallest change worth finding.** +10% for small tweaks on a busy site, +25% for most tests (the default), +50% for bold changes on a small site. The test is tuned to spot changes of about that size.
   - A name and a **hypothesis** (what you expect and why), if you like.
3. **Start** it. If the flag is off, starting turns it on. A flag runs one test at a time. From here the control, goals and smallest change are fixed, so the results can't be reshaped after the fact.
4. Watch the results.
5. **End** it, choosing the version you'll keep (or none). The results are kept as they were. The flag stays as it is: to show the winner to everyone, change the flag.

## Who is counted

A visitor joins the test the first time a page **shows them** their version, not just when it loads the flag. That way, pages that never show the change don't water down the results. Outflare's [tracking script](/docs/guides/website-tracking/) sends an *Experiment Viewed* event, once per visit for each flag:

- when your page reads the flag with `outflare.flag("key")` or `outflare.flagPayload("key")`, or reads it from what `outflare.onFlags(fn)` gives;
- with `data-flags` on the script's tag, for every flag whose class (`of-flag-<flag>-<version>`) goes on the page, since a test done in CSS shows its version that way. Leave `data-flags` off pages that don't show a test, if you want those visitors left out.

Previews (`?of_flag=key:version`) don't count: that's you looking, not a visitor.

If your server shows the version itself (a server-rendered page, an email, an app screen), send the same event through the API with the visitor's id from the page (`outflare.anonymousId()`):

```json
{ "type": "track", "event": "Experiment Viewed", "anonymousId": "the visitor's id", "properties": { "flag": "pricing-headline", "variant": "faster" } }
```

to `POST /v1/workspaces/{ws}/customer-events`. A visitor keeps the first version they saw. They convert when they reach a goal after seeing it, before the test ends, and count once per goal.

## Reading the results

For each goal, each version shows:

- **Visitors, conversions and the rate.**
- **Chance to beat the control.** How likely its true rate is above the control's. "97% likely to beat Control" means what it says.
- **Lift.** How much better or worse it does than the control, with a range: "+18% (range +4% to +33%)".
- **Safe to stop.** A version gets this badge once its result is unlikely to be luck. A classic significance test turns up false winners when people look every day and stop at the first good-looking number; this check stays honest however often you look. The price is that it needs more visitors than a test you only look at once.

Above the table, a sentence says what it means: "faster is 97% likely to beat control: +18% signups (range +4% to +33%). Safe to stop", or "No clear winner yet".

The **winner** is a version at least 95% likely to beat the control and safe to stop, on the first goal. If every other version is that likely to be worse, the control wins.

**A warning about the split.** If visitors split between versions very differently from the flag's weights, something is losing or double-counting them, such as a redirect, a cache or bots. The page shows a red warning, and there is no winner until it's fixed.

Today goals are conversions: did the visitor do it or not. Averages such as revenue per visitor are planned.

## API and agents

The REST API has `GET/POST /v1/workspaces/{ws}/ab-tests`, `GET/PATCH .../ab-tests/{id}`, `POST .../start`, `POST .../end` and `GET .../results`. Agents use the MCP tools `list_ab_tests`, `get_ab_test`, `get_ab_test_results`, `create_ab_test`, `update_ab_test`, `start_ab_test` and `end_ab_test`.

## Who can change them

Anyone with `analytics.read` sees tests and their results; adding, changing, starting and ending them needs `analytics.manage` (owners, admins and operators by default), as for flags. Every change is in the audit log.
