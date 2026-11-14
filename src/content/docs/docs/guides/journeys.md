---
title: Journeys
description: If-this-then-that flows for the people on your customer records, such as onboarding or win-back, with emails, waits, checks, actions and holdouts.
sidebar:
  order: 13.5
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

A journey is an if-this-then-that flow for the people on your [customer records](/docs/guides/customer-records/), such as onboarding a new trial, saving a failed payment or winning back someone who cancelled. Open **Automations → Rules and journeys**. A journey is a draft until you activate it.

## Build one

The builder draws the journey from the top down: what starts it, then each step, with a check's Yes and No side by side and End where a path finishes. Press **+** on any link to add a step there, and select a step to change it in the side panel. Each step shows its live numbers and how many people are on it now. Anything that would stop it going live, such as an unpublished template or a step nothing leads to, is marked in red. Changes save as you go, and Undo and Redo step through them. On a phone the flow is read-only.

## What starts it

- **An event.** A run starts when an event with that name lands on a person's timeline, such as `signed_up`, if the person and the event match its filter (for example, their plan isn't free). The event can come from your app, a connected tool or one of your rules, so a journey can follow a change, a week without activity or someone joining a smart list.
- **By hand.** Someone adds a person, in the app or with the API.

By default a person goes through a journey once. Set it to run again to let them start again after their run ends; nobody is in the same journey twice at once. You can cap how many people start an hour or a day.

## Steps

- **Email** sends a published lifecycle template, filled in with the person's fields and the event that started the run. Their topic and marketing choices apply as for any lifecycle email.
- **Wait** waits a set time, from a minute to 90 days.
- **Check** goes one way when its conditions hold and the other when they don't: a field on the person, something in the event, whether they did something since the run started, or whether they opened or clicked an earlier email.
- **Wait until** waits for whichever comes first: an event, a condition coming true, or a timeout.
- **Split** sends people down one of several paths: the first whose conditions hold, or at random by weight. A random path can be a holdout (below).
- **Actions** do something besides email: set a field, add a tag, move someone in or out of a list, record consent, assign an owner, move a deal, start or stop another journey or a sequence, suppress an address, send a transactional email, raise an alert, post to Slack, call a webhook, push to a sequencer, HubSpot or an ad audience, or ask your own AI model to sort the person.

- **Raise a signal** puts the person or company in [Needs attention](/docs/guides/signals/) for their owner, with a type, a title and a due date, so a flow can wait, check something and only then ask a person to step in.
- **Do an Outflare action** makes one API call in the journey's brand as one of your agents, so a journey can do anything Outflare can. The [action layer](/docs/agents/actions/) decides it like any agent's change: what you granted runs, anything else waits for a person on the Agents page while the journey goes on.

## Journeys about companies

When you make a journey, choose who goes through it: people or companies. A company journey starts on the company's own events or on anything its people do, once per company, and its goal, exit and wait events count for anyone at the company. It takes the steps that make sense for a company (wait, check, set a field, add a tag, create a task, assign an owner, raise a signal, alerts, webhooks and Outflare actions), not emails to one person. Who a journey is about can't change once it has run.

## Journeys about deals

Choose **Each deal** and every deal goes through the journey on its own. It starts on the deal's own events (created, moved a stage, won, lost, reopened), its checks read the deal's fields such as its stage, value and close date, and it ends when that deal reaches its goal, so a journey that chases a proposal stops the moment the deal is won. Its steps act on the deal: tasks, fields, owners, alerts, signals and webhooks. Deals have no tags, so the tag steps are left out, and email steps need a journey about people.

Steps that call another service use your workspace's own connection to it, and stay off until you connect it.

## Holdouts: what a journey changed

A random split can keep some people out on purpose: mark one of its paths as a holdout, and the people sent down it leave the journey there. Because the split is random, what the held-out people do afterwards shows what would have happened anyway.

On the journey, select the split to see each path against the people held out: how many converted in the 30 days after the split, what they paid, how much better or worse each path did, and whether the difference is real or too early to tell (it needs at least 30 people on each side). [Broadcasts](/docs/guides/lifecycle-email/#broadcasts) and [sequences](/docs/guides/sequences/) can hold people out too. See [Channels and attribution](/docs/guides/attribution/) for how conversions are counted.

## Ending a run

A run ends when it reaches the end of its path, when the person does the journey's goal event, or when they do one of its exit events or meet one of its exit conditions. People on the journey's excluded lists or tags, or at a company with one of those tags, never start.

## Changing a live journey

A live journey is read-only. **Edit** makes a draft version beside it while the live one keeps running, and **Publish** swaps it in. You choose whether the people already in it finish on the version they started or move onto the new one. Every version that went live is kept and can be compared with the live one. Pausing holds everyone where they are.

**Test** takes one person through the journey without sending or changing anything, and lights up the path they would take: which way each check goes and the email they would get.

## For agents and scripts

The REST API is under `/v1/brands/{brand}/journeys`, and a split's holdout comparison is `GET .../journeys/{id}/lift?step=`; see the [API reference](/docs/api/). The MCP tools include `create_journey`, `activate_journey`, `add_to_journey`, `test_journey` and `get_journey_lift`. Ask your agent something like *"Did the onboarding journey's emails make more trials pay than the people we held out?"*
