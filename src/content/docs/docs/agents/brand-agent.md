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
- Anything else, in your own words

Where Outflare can measure an objective, the agent reads the number itself, so you see where it stands. An objective that needs a connection you haven't made says which one to add. An agent with no open objective does nothing until you give it another.

## Talk to it

The **Agent** button in the top bar (or Ctrl+J) opens a chat with the brand's agent beside any page. Ask what it is doing, tell it what to change, or hand it a task. Home shows what it is working on and what waits for you.

The chat opens on a new conversation, unless your latest one is still going (the agent is working on it or owes you an answer, or you wrote in the last half hour). The dropdown at the top of the chat lists every conversation, newest first, with a search and **New chat**.

To give the chat more room, drag its left edge (or focus the edge and use the arrow keys). The width is remembered in your browser and stays the same on every page; double-click the edge to put it back.

While the agent is replying, the Send button becomes **Stop**. Press it after a typo or a change of mind, then send a new message. The reply ends within a couple of seconds, your message stays in the conversation marked **Stopped, not answered**, and the agent never answers it. Stop doesn't undo anything: changes the agent already made stay made, and changes waiting for your OK still wait. It only ends the reply to your message; to stop the agent's own scheduled work, pause the agent.

Every reply has a **Copy** button, and so does each code block and table in it, so you can paste the agent's text somewhere else in one click. The conversation's ID sits at the top of the chat. Its menu copies the ID or a link to the conversation, copies the whole conversation as Markdown, or downloads it as a `.md` file. The Markdown keeps each reply with the changes the agent asked for and how each one ended, so you can share a conversation, or hand its ID to someone on your team, without retyping it.

Each conversation's **⋯** menu pins it to the top of the list, renames it, archives it or deletes it. Archived conversations move to **Archived** at the bottom of the list and come back as soon as anyone writes in them. Pins and the archive are shared by everyone on the brand, like the conversations.

## Tasks

The Agents page has one column for everything the agent is on, with the chat beside it. At the top are **New chat** and **New task**. **Tasks** lists each task with its status, the ones that need you first, and **Finished** unfolds the tasks that are done or dropped. **Chats** lists your conversations, with a search box. Below them, **Waiting for you** holds every change waiting for your OK, **History** what the agent did, and **What agents may do** your rules and standing instructions. Each of these has its own address, so you can bookmark it or send it to a teammate. On a phone the column folds into one button above the page.

A task has one status, the same everywhere it shows:

| Status | What it means | What you do |
| --- | --- | --- |
| **Needs you** | The agent asked you a question about this task, or one of its changes waits for your OK | Answer or decide on the task's page |
| **Working now** | The agent is on this task right now | Nothing |
| **Reading your answer** | You answered; the agent picks it up next | Nothing |
| **In progress** | The task has a plan and the agent carries on with it the next time it works | Nothing |
| **Steps done** | Every step of the plan is ticked | Check the results, then mark it as done or ask for more |
| **Not started** | The agent hasn't written a plan yet | Nothing, or **Start now** |
| **Paused** | The agent is paused, so the task isn't moving | Resume the agent |
| **Done**, **Dropped** | The agent no longer works on it | **Reopen** to carry on |

Pick a task to open its page. The page has its own address, so you can bookmark it or send it to a teammate with **Copy link**. From the top it shows:

- the status and **what happens next**: when the agent works on it again, or exactly what it needs from you. A question comes with an answer box, and only this task's changes wait here for your OK
- where the task is, in the agent's words, and the plan with the next step marked
- the results so far, linked to where they live
- the number the task is measured by, when Outflare can measure it
- what the agent is trying, the number each attempt is judged by, and when it judges it
- every change the agent made or asked for

The chat beside a task is about that task. Ask "What's the status?" or "Do you need anything from me?", answer its question, or change what it should do. **All chats** goes back to your other conversations. Drag the handle between the task and the chat to make the chat wider or narrower; double-click it to put it back.

## Changes that wait for you

Each task's page lists every change the agent made or asked for, and what became of it:

- **Needs your OK**: nothing has happened yet. The row says why the agent asked (for example, a web search costs money on your own search connection) and has the buttons: **Allow once** runs it now, **Always allow changes like this** runs it and adds a rule so the agent makes changes like it on its own, and **Don't allow** turns it down. The agent sees your answer at its next turn.
- **Done**: it ran, after your OK or because a rule allows it.
- **Not allowed**, **Expired** (nobody decided within 30 days) or **Cancelled**: it never ran.
- **Failed**: it ran and didn't go through; the agent sees why.
- **Blocked by a rule**: one of your rules stops changes like this.

The rules you've added are under **What agents may do**, **Rules** on the Agents page, where you can remove them.

## What you see

- **Chats**: your conversations with the agent.
- **Tasks**: each task with its status, its plan, what the agent tried for it and whether it worked.
- **What agents may do**, **Standing instructions**: the rules the agent follows on every task, and what it has learned about the brand.
- **History**, **Agent activity** and **Agent turns**: everything it read and changed, and what each working session did.

It alerts you when it finishes a task, when changes wait for you, and when it is stuck. You can pause, resume or stop it at any time. If it has no AI model or keeps failing, it pauses itself and says why.

## What it can't do

- Approve its own changes, or set its own rules.
- Change what always needs a person: mailboxes, senders, connections, API tokens, the suppression list and the rest of the [always a person](/docs/agents/actions/#what-happens-to-a-change) list.
- Send an email around the [policy check](/docs/concepts/policy-check/), or spend past the caps you set.
