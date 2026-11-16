---
title: Brand agent
description: On Outflare Cloud, each brand can have its own agent that keeps working toward the objectives you set, asks before it changes anything, and tells you what it tried and whether it worked.
sidebar:
  order: 3
  badge:
    text: Cloud
    variant: note
---

<span class="pill cloud">Outflare Cloud</span> The brand agent runs only on [app.outflare.ai](https://app.outflare.ai/).

A brand agent is one agent for one [brand](/docs/guides/brands/) that keeps working toward objectives you give it, day after day. It uses the same tools you do in Outflare, on your own connected accounts, and it runs on your own [AI model](/docs/agents/ai-models/): Outflare never pays for the AI or lends you a key.

You stay in control. Every change the agent makes goes through [agent actions](/docs/agents/actions/): until you allow a kind of change, it waits for you on the **Agents** page.

## Set one up

1. Connect an [AI model](/docs/agents/ai-models/) with your own key.
2. Pick the brand, then open **Agents**. The brand's agent opens first.
3. Give it a first objective, and any standing instructions it should always follow.

## Objectives

An objective is what you want more of. Choose one or several:

- Grow search traffic
- Book meetings
- Grow sign-ups
- Grow revenue
- Publish content
- Build links
- Get press coverage ([PR autopilot](/docs/guides/pr-autopilot/))
- Grow the audience
- Get more from paid ads ([Paid ads Autopilot](/docs/integrations/paid-media/#paid-ads-autopilot))
- Win more with A/B tests
- Keep and grow customers: the agent works your [Needs attention](/docs/guides/signals/) queue. It reads each account before it speaks, gives accounts with no owner one through your [routing](/docs/guides/routing/) rules, writes what it found and a suggested next step for the owner, flags what your rules missed, and tells you which signals are noise. It never contacts a customer or closes a signal itself, and it is measured by the signals your team closed as won
- Something else, in your own words

Where Outflare can measure an objective, the agent reads the number itself, so you see where it stands. An objective that needs a connection you haven't made says which one to add. An agent with no open objective does nothing until you give it another.

## Talk to it

The **Agent** button in the top bar (or Ctrl+J) opens a chat with the brand's agent beside any page. Ask what it is doing, tell it what to change, or hand it a task. Home shows what it is working on and what waits for you.

The chat opens on a new conversation, unless your latest one is still going (the agent is working on it or owes you an answer, or you wrote in the last half hour). The dropdown at the top of the chat lists every conversation, newest first, with a search and **New chat**.

Each conversation's **⋯** menu pins it to the top of the list, renames it, archives it or deletes it. Archived conversations move to **Archived** at the bottom of the list and come back as soon as anyone writes in them. Pins and the archive are shared by everyone on the brand, like the conversations.

The task count next to the agent's status opens a list of its tasks, with where each one stands and how far its plan has got. Pick one to open its page.

## Changes that wait for you

Each task's page lists every change the agent made or asked for, and what became of it:

- **Needs your OK**: nothing has happened yet. The row says why the agent asked (for example, a web search costs money on your own search connection) and has the buttons: **Allow once** runs it now, **Always allow changes like this** runs it and adds a rule so the agent makes changes like it on its own, and **Don't allow** turns it down. The agent sees your answer at its next turn.
- **Done**: it ran, after your OK or because a rule allows it.
- **Not allowed**, **Expired** (nobody decided within 30 days) or **Cancelled**: it never ran.
- **Failed**: it ran and didn't go through; the agent sees why.
- **Blocked by a rule**: one of your rules stops changes like this.

The rules you've added are under **Settings**, **Rules** on the Agents page, where you can remove them.

## What you see

- **Conversations**: your chats with the agent.
- **Objectives**: each objective with what the agent tried for it, the number before and after, and whether it worked. What it learned about the brand is listed below.
- **Activity** and **Turns**: everything it read and changed, and what each working session did.

It alerts you when it finishes a task, when changes wait for you, and when it is stuck. You can pause, resume or stop it at any time. If it has no AI model or keeps failing, it pauses itself and says why.

## What it can't do

- Approve its own changes, or set its own rules.
- Change what always needs a person: mailboxes, senders, connections, API tokens, the suppression list and the rest of the [always a person](/docs/agents/actions/#what-happens-to-a-change) list.
- Send an email around the [policy check](/docs/concepts/policy-check/), or spend past the caps you set.
