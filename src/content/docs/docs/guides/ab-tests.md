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

1. Make a flag with two or more versions, such as `control` and `faster`, and show them on your pages: in code, in CSS, or with the [visual editor](/docs/guides/feature-flags/#change-a-page-without-code).
2. In **Analytics → A/B tests**, choose **New test**, or choose **A/B test it** from the flag's menu in **Feature flags**. Pick:
   - **The control.** The version the others are compared with, usually what visitors see today.
   - **Goals.** One to five. The first goal decides the winner; the rest are watched alongside it for learning. See [What a goal measures](#what-a-goal-measures).
   - **Guardrails**, if you like: things the winner mustn't make worse ([below](#guardrails)).
   - **The smallest change worth finding.** +10% for small tweaks on a busy site, +25% for most tests (the default), +50% for bold changes on a small site. The test is tuned to spot changes of about that size.
   - A name and a **hypothesis**: what you expect and why.
3. Work through the [checklist](#before-you-start) and check [how long it will take](#how-long-it-will-take), then **start** it. If the flag is off, starting turns it on. A flag runs one test at a time. Starting [registers the test](#registered-at-start): its hypothesis, control, goals, guardrails and smallest change are fixed from here on, so the results can't be reshaped after the fact.
4. Watch the results.
5. **Ship** the winner to everyone, or **end** the test choosing the version you'll keep (or none). The results are kept as they were.

## What a goal measures

A goal is an event, such as `signup_started`; a page being viewed, such as `/thanks` (`/docs/*` counts every page under `/docs`); or a won deal. Each goal measures one of three things per visitor:

- **Conversion** (the default): did they reach it? Versions are compared on the rate.
- **Count**: how many times did they reach it? Compared on times per visitor.
- **Value**: the total of a number, such as the `revenue` on an order event or a won deal's value. Compared on value per visitor, such as revenue per visitor.

Two settings keep a goal honest:

- **A window**, such as a week: only what happens within that long of a visitor first seeing their version counts.
- **A cap**, for counts and values: the most one visitor can add, so a few huge orders can't swing the result.

**Deal goals** count won deals of the person a visitor belongs to, closed after they first saw their version, in US dollars for value. Outflare knows who a visitor is once they sign in or click a tracked link in one of your emails.

## Before you start

A draft test has a **Before you start** checklist of anything that would stop it measuring something useful:

- the flag: archived, one version or a missing control can't start;
- another test of the same flag still running, which must end first, and tests of other flags running at the same time ([below](#tests-at-the-same-time));
- whether pages showed the flag's versions in the last week, so visitors will join;
- how long visitors waited for their version: a warning when one in ten waited too long and may have seen the original first, with how to [stop the flicker](/docs/guides/feature-flags/#no-flicker);
- whether visitors reach the first goal, and how long the test is likely to take;
- whether someone has checked every version (below);
- guardrails, if there are none.

Anything that fails stops the test starting; warnings let it start.

### Preview and check each version

**Preview** gives a link for each version on the pages that showed the flag most in the last 28 days, or on any page you choose. A link opens the page with that version for the rest of your visit, and counts nothing, so previewing never changes the results.

Open each version, then mark it **Looks right** or **Broken**, with a note if something is off. A version marked broken stops the test starting. A check holds for the version as it was: change its content and someone needs to look again.

## How long it will take

Before you start, the test shows how long it's likely to take on your real traffic. It reads the last 28 days of visits (on the page the test changes, if you name one) and how those visitors did on the goal. Then it shows how many visitors each version needs, and how many weeks that is, if your change truly moves the goal by 5%, 10%, 25% or 50%. It also says the smallest change it can find in 4 and in 8 weeks, and warns you when the test is unlikely to finish within 8 weeks.

Small sites can only find big changes. At 2,000 visitors a week per version and a 4% sign-up rate, a 25% lift takes about four weeks; a 10% lift takes over half a year. Revenue varies more from visitor to visitor than a yes or no, so a revenue goal usually needs more visitors than the sign-ups behind it, and each extra version needs more visitors too. These are typical times: half of tests finish sooner, half later.

## Who is counted

A visitor joins the test the first time a page **shows them** their version, not just when it loads the flag. That way, pages that never show the change don't water down the results. Outflare's [tracking script](/docs/guides/website-tracking/) sends an *Experiment Viewed* event, once per visit for each flag:

- when your page reads the flag with `outflare.flag("key")` or `outflare.flagPayload("key")`, or reads it from what `outflare.onFlags(fn)` gives;
- with `data-flags` on the script's tag, for every flag whose class (`of-flag-<flag>-<version>`) goes on the page, since a test done in CSS shows its version that way. Leave `data-flags` off pages that don't show a test, if you want those visitors left out;
- when the [visual editor's](/docs/guides/feature-flags/#change-a-page-without-code) changes for the visitor's version go onto the page.

Previews (`?of_flag=key:version`) don't count: that's you looking, not a visitor.

If your server shows the version itself (a server-rendered page, an email, an app screen), send the same event through the API with the visitor's id from the page (`outflare.anonymousId()`):

```json
{ "type": "track", "event": "Experiment Viewed", "anonymousId": "the visitor's id", "properties": { "flag": "pricing-headline", "variant": "faster" } }
```

to `POST /v1/workspaces/{ws}/customer-events`. A visitor keeps the first version they saw. They convert when they reach a goal after seeing it, before the test ends.

## Reading the results

For each goal, each version shows:

- **Visitors and conversions**, and the rate; for a count or value goal, the total and the average per visitor.
- **Chance to beat the control.** How likely it truly does better than the control. "97% likely to beat Control" means what it says.
- **Lift.** How much better or worse it does than the control, with a range: "+18% (range +4% to +33%)". The range stays honest however often you look, and it leaves out zero exactly when the result is safe to stop.
- **Safe to stop.** A version gets this badge once its result is unlikely to be luck. A classic significance test turns up false winners when people look every day and stop at the first good-looking number; this check stays honest however often you look, and once a version is safe to stop it stays so. The price is that it needs two to three times the visitors of a test you only look at once.
- **Day by day.** Charts of each version's rate and its lift over the control through the test, so you can see whether a lead is steady.

Above the table, a sentence says what it means: "faster is 97% likely to beat control: +18% signups (range +4% to +33%). Safe to stop", or "No clear winner yet".

The **winner** is a version at least 95% likely to beat the control and safe to stop, on the first goal. If every other version is that likely to be worse, the control wins.

- **Several versions.** Each extra version against the control is another chance of a false winner, so the results correct for it: each comparison needs stronger proof, and its range is wider.
- **Other goals** are for learning. Checking many goals turns up chance differences, so they never decide the winner.
- **A warning about the split.** If visitors split between versions very differently from the flag's weights, something is losing or double-counting them, such as a redirect, a cache or bots. The page shows a red warning, and there is no winner until it's fixed.

### Breakdowns

**Breakdown** shows the first goal within groups of visitors: by device, by where they came from, by country, or new against returning. Use it to learn where a change works, such as on phones only. Every group is another chance of a lucky difference, so each one needs stronger proof than the whole test, and the winner is always decided on everyone.

## Variance reduction

Tests adjust for what each visitor did before they joined: how they did on the goal in the 28 days before they first saw a version. People who signed up or bought a lot before tend to do so again whatever version they see, and taking that predictable part out leaves the same expected lift with a tighter range and an earlier answer. How much sooner depends on how many of your visitors come back; a site of mostly first-time visitors gains little. The results say how much of the noise was taken out.

It's part of how a test is registered, so a test uses it for its whole life. Tests started before it was added keep their original maths, and breakdowns aren't adjusted.

## Registered at start

When a test starts, Outflare keeps what it set out to show, under **Registered when it started** on the test's page: the hypothesis, control, goals, guardrails, smallest change, the plan (about how many weeks and visitors it was likely to need), and the flag as it was, with each version's share and content and the rollout. It never changes, so anyone reading the results later can see the test was judged by rules set before it ran.

Changing the flag while its test runs mixes two experiments into one. The page lists each change since the start (a version's share or content changed, a version added or removed, the rollout changed, or the flag turned off) and keeps judging the split against the shares it started with. To measure the new setup cleanly, end the test and duplicate it.

## Guardrails

A test can watch up to five **guardrails**: things a winner mustn't hurt, such as errors, refunds, unsubscribes or won deals. Each is a goal with the direction that's good, higher or lower. The results show each guardrail like a goal and call out any version that clearly makes one worse. A guardrail never decides the winner, but a winner that hurts one is flagged, and the summary suggests weighing the trade instead of shipping it.

## Alerts

Outflare checks each running test every few hours and raises an [alert](/docs/guides/alerts/), once, when it becomes safe to stop, when its split breaks, and when a version clearly hurts a guardrail. Alerts go to owners and admins by email or Slack. Outflare only tells you: ending a test and shipping the winner stay yours.

## Ship, freeze, duplicate

- **Ship** a version to show it to everyone: the flag gives it all the traffic, and a running test ends with it as the decision, keeping its results. You can also ship the version you chose after a test ended. Nothing ships on its own.
- **Freeze** a running test to stop new visitors joining while those already in keep counting, such as before a launch that would change your traffic. Unfreeze to let them join again.
- **Duplicate** a test to get a new draft with the same flag, control, goals, guardrails and hypothesis.

## Tests at the same time

Two tests running at once on the same pages can share visitors, and one change can alter the other's effect: a bolder button that only helps with the new headline, say. The checklist warns when another test is running on a flag outside this one's [exclusion group](/docs/guides/feature-flags/#exclusion-groups). Either put the flags in one group, so no visitor is in both, or let them overlap and check them.

**Tests at the same time** on a test's page checks it against each other test that ran alongside it: how many visitors saw both, and each version's effect within each of the other test's versions. When the effects differ by more than chance allows, the version **interacts**: its effect depends on the other change. Read the effects before shipping either, and ship the combination that did best.

## Clean data

- **Your own team is left out.** Visitors from the companies you exclude on the Visitors page, such as your own, don't count in any test.
- **Bots** never reach a test: the tracking script doesn't send their events.
- **Crossovers.** Visitors who saw more than one version count under the first. Many of them means something, such as a cache, shows versions inconsistently.

## AI help

With your own AI model connected (Settings, AI model), Outflare can help at each step. It only proposes: nothing changes until you apply it.

- **Suggest tests.** Ideas from your busiest pages, the goals visitors reach, your brand and the tests you've already run. Each comes with a hypothesis, the page, the change and the goal, plus how long it would take on that page. **Use this** fills in a new test.
- **Write versions.** Describe what to change, such as "a shorter, more urgent headline for agencies", and get new versions of the flag's headline, call to action or other copy, in your brand's voice. **Add to flag** puts the ones you like into the split.
- **Summarise.** A running or finished test's results in plain English, with next steps. What it recommends is decided by Outflare from the numbers: ship the winner, weigh a guardrail it hurts, keep the original, fix the split, keep it running, stop and try something bolder, or wait. The AI only puts it into words.
- **Learnings.** When a test ends, Outflare writes what it taught in a headline and a short paragraph, with tags such as `headline` or `pricing`. A test without a clear winner taught that the change made no large difference, and says so.
- **Ask about past tests.** On the **Learnings** page, ask a question such as "what have we learned about headlines on the pricing page?" and get an answer from your finished tests, with the tests it drew on. The Learnings library of finished tests, and searching it, works without an AI model too.

The AI is told never to invent facts, numbers, testimonials or prices. Check generated copy before visitors see it. AI calls are billed to your own AI provider account and appear under AI usage as **A/B tests**.

## API and agents

Everything here is in the REST API, under `/v1/workspaces/{ws}/ab-tests`: creating and changing tests, the checklist, previews and checks, starting, freezing, ending, shipping and duplicating, results, breakdowns, tests at the same time, the planner, learnings and AI help. Agents use the matching MCP tools, such as `create_ab_test`, `get_ab_test_checklist`, `start_ab_test`, `get_ab_test_results`, `get_ab_test_breakdown`, `get_ab_test_interactions` and `ship_ab_test`. See the [API reference](/docs/api/).

## Who can change them

Anyone with `analytics.read` sees tests, their results and plans; adding, changing, starting, ending and shipping them, checking versions, and AI help need `analytics.manage` (owners, admins and operators by default), as for flags. Every change is in the audit log.
