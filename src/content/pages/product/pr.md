---
title: "Digital PR software with a journalist finder · Outflare"
description: "Write press releases with a source behind every number, find the journalists who cover your topics, pitch them from your own mailboxes and track coverage."
h1: "Digital PR with a source behind every number."
label: PR
lede: "Watch the news on your topics, find the journalists who write about them, turn your own data or an expert's view into a checked press release, pitch it through your own sequences, and count the coverage it wins."
answer: "Outflare is open-source digital PR software. Its news watch runs saved searches on your own Geonode account, keeps every article about your brand as coverage and finds the journalists behind them. Stories turn your data, today's news or an expert's comment into a press release that is checked for unsourced numbers and unapproved quotes, a person approves it, and you pitch it to journalists through your own sequences. On Outflare Cloud, the PR autopilot runs the news reaction every morning, with each quote, release and pitch still approved by you."
points:
  - "Every number needs a sourced fact; every quote needs the expert's approval"
  - "Journalists found from bylines, never bought"
  - "Pitches from your own mailboxes, each journalist at most once a week"
  - "PR autopilot is Outflare Cloud only; everything else is open source"
docs:
  - label: Write and pitch stories
    href: /docs/guides/stories/
  - label: Watch the news and find journalists
    href: /docs/guides/news-watch/
  - label: Presence
    href: /docs/guides/coverage/
  - label: PR autopilot (Cloud)
    href: /docs/guides/pr-autopilot/
faqs:
  - q: "Is Outflare press release distribution software?"
    a: "Not a wire service. Outflare doesn't syndicate releases to news sites. It helps you write a checked release and pitch it directly to the journalists who cover your topic, through your own mailboxes and sequences, then tracks replies and coverage."
  - q: "Where does the journalist database come from?"
    a: "Outflare builds it from the news your searches find. Its crawler reads each new article's byline, and the free email finder looks for the author's address at the outlet's own domain. Outflare never buys journalist data, and the journalists are contacts in your own CRM."
  - q: "How does Outflare stop invented quotes and numbers?"
    a: "The check flags any number that appears in none of the story's sourced facts, any quoted passage its expert didn't approve word for word, and hype words. Errors stop approval, and only a person can approve a release, record a quote's approval or approve a pitch."
  - q: "What does the PR autopilot do?"
    a: "On Outflare Cloud, it reads the news on your experts' topics every morning and, when a story is worth reacting to, starts a reactive story with a draft comment, drafts the release once you approve the quote, and starts pitches that each wait for your approval. It runs as a mission on your own AI key."
  - q: "What do I need to connect?"
    a: "A Geonode account of your own for news searches, mailboxes and a sequence for pitching, and your own AI model for ideas, drafts and pitch openers. Without an AI model you write releases and openers yourself."
related:
  - /product/competitors/
  - /product/cold-email/
  - /product/inbox/
  - /product/agents/
  - /product/brands/
updated: 2026-11-09
order: 87
---

## How it works

1. **Watch the news.** Save searches for a topic ("residential proxies") or your brand. Each runs on a schedule, from every 6 hours to weekly, on your own [Geonode](/docs/integrations/seo/) account.
2. **Keep your coverage.** Articles that name your brand become its coverage, waiting for a person to **Confirm** or **Dismiss**.
3. **Find journalists.** Outflare reads each new article's byline, and when it's fairly sure of the author's address, they become a journalist on the outlet's company record.
4. **Write a story.** A data finding, a reaction to today's news, or an expert's comment, written up as a press release with its facts and approved quotes.
5. **Check, approve and pitch** to the journalists who cover the topic, through your own sequence.
6. **Count the results**: replies by kind and the coverage each story won.

## The news watch and journalists

Each run keeps up to 50 results, once per workspace however many searches find them. Outflare's crawler reads up to 20 new articles a run for the byline and date, obeying robots.txt and costing nothing.

The **Journalists** tab lists each journalist with how many articles they wrote, their latest, their outlets and the searches they came up in. **Make a media list** turns a search's journalists into a smart list that keeps itself up to date as new articles arrive.

## Stories with a source behind every number

Journalists remember a brand that sends invented quotes or unsourced numbers, so the rules are strict:

- **Facts.** Every number in the release needs a fact that states it, with a link or a note on where it came from. Figures from your own data are aggregates only.
- **Quotes.** A quote appears only once a person records that its expert approved those exact words. Changing the words makes it a draft again.
- **The check.**

| Finding | Kind |
| --- | --- |
| No release yet | Error |
| A number in no fact | Error |
| A fact without a source | Error |
| A quote its expert didn't approve | Error |
| Hype phrases such as "revolutionary" | Warning |
| Finance or health claims that need a second look | Warning |

With your own [AI model](/docs/agents/ai-models/), **Suggest ideas with AI** proposes up to 10 stories from your brand, experts, coverage and recent news, and **Draft with AI** writes the release from the facts and approved quotes only, then runs the check straight away.

## Pitching journalists

Pitch an approved story to up to 50 journalists at a time through one of your own [sequences](/product/cold-email/):

- Your AI model writes a short opener for each journalist from the story and their latest article, checked like the release.
- **A person approves each pitch**, and enrolment is held until the story's embargo lifts.
- A journalist is pitched once per story and at most once a week by your workspace, whichever brand. Anyone who asked not to be contacted is skipped.
- Replies are read as covering it, wants the data, wants an interview, not my beat or declined, and tagged in the [inbox](/product/inbox/).

Four playbooks run digital PR end to end as missions you approve: a data story, a regional data story, a reaction to today's news, and an expert comment. **Turn mentions into links** asks coverage that names you without linking to add the link.

## PR autopilot (Outflare Cloud only)

The [PR autopilot](/docs/guides/pr-autopilot/) runs only on Outflare Cloud at app.outflare.ai. Every morning it reads the news on your experts' topics; on a day with something worth reacting to, it starts a reactive story with a draft comment for your expert, drafts and checks the release once you've recorded the expert's approval, and starts pitches to the journalists covering the story, each waiting for you. It runs as a mission on your own AI key, and you set the most stories it may start a week. Everything else on this page is in the open-source engine.

## Coverage and presence

Confirmed coverage feeds [Presence](/docs/guides/coverage/), where you manage every placement, publisher and paid arrangement for a brand, and see where your [competitors](/product/competitors/) appear that you don't.

## What Outflare doesn't do

- It doesn't distribute releases on a newswire or sell media lists.
- It doesn't put words in your expert's mouth or approve anything for you.
- It runs no searches or AI on its own keys: news searches use your Geonode account, and drafting uses your AI provider.
