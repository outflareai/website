---
title: PR autopilot
description: On Outflare Cloud, the PR autopilot reads the news on your experts' topics every morning and, when a story is worth it, drafts your expert's comment and pitches the journalists covering it. You approve each quote, release and pitch.
sidebar:
  order: 15
  badge:
    text: Cloud
    variant: note
---

<span class="pill cloud">Outflare Cloud</span> The PR autopilot runs only on [app.outflare.ai](https://app.outflare.ai/).

The PR autopilot does reactive PR for one of your brands every morning. It reads the news on your experts' topics and, when a story is worth reacting to, starts a [story](/docs/guides/stories/) with a comment for your expert to approve. Once the quote and the release are approved, it pitches the journalists who cover the story. It is the **React to today's news** playbook, run for you every day.

You stay in control of everything that reaches a journalist:

- **A person records each quote's approval** on the expert's word. The autopilot never puts words in your expert's mouth.
- **A person approves each release and each pitch.** The autopilot can't approve them.
- **The pitching rules still hold.** It pitches through your own sequences and mailboxes, each journalist at most once a week, with one follow-up at most, and it stops when they reply.

## What it needs

- A [brand](/docs/guides/brands/) with at least one **expert** (**Outreach → Stories → Experts**), with the topics they speak to.
- [News searches](/docs/guides/news-watch/) for those topics, so there is news to react to and journalists who cover it. They run on your own Geonode account.
- A pitch sequence, as [Stories](/docs/guides/stories/#pitching) describes.
- An [AI model](/docs/agents/ai-models/) connected with your own key. The autopilot runs as a [mission](/docs/agents/missions/) on that model, and its calls count against your [AI limits](/docs/guides/ai-usage/). Outflare never pays for the AI or lends you a key.

## Set it up

1. Open **Outreach → PR autopilot**.
2. Choose the brand and the most stories it may start a week.
3. Select **Set up the autopilot**. It opens the autopilot's mission for you to review.
4. Approve the mission. Nothing runs before you do.

Each brand has one autopilot while its mission runs. The page lists your autopilots with their mission's status, a link to review and approve it, and a link to the brand's stories. To change one, stop its mission and set up a new one.

## Each day

The autopilot checks in once a day. On a day with nothing worth reacting to, it does nothing. Otherwise it starts a reactive story with a draft comment for your expert and tells you what it started in the mission's updates. When you have recorded the expert's approval of the quote, it drafts and checks the release for you to approve. Once the release is approved, it starts pitches to the journalists covering the story, each waiting for your approval.

You see everything it did in the mission and on **Outreach → Stories**, and the replies and coverage in each story's results.

## Permissions

Setting up an autopilot needs permission to run missions; seeing them needs permission to read missions. Its work is a [mission](/docs/agents/missions/) like any other, so the mission's approval gate, limits and history apply, and the stories, pitches and coverage it creates follow the [Stories](/docs/guides/stories/#permissions) permissions.
