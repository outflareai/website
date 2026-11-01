---
title: Write and pitch stories
description: Turn your own data, today's news or an expert's view into a press release with a source behind every number and only quotes your experts approved, pitch it to journalists through your own sequences, and count what it wins.
sidebar:
  order: 15
---

<span class="pill shipped">Shipped</span> Stories, experts, the check, AI ideas and drafts, pitches and results, in the app, through the API and for agents.

A story is what your brand pitches to journalists: a finding from your own numbers, a comment on today's news, or an expert's view on a topic, written up as a press release. Outflare keeps the fact behind every number and the quotes your experts approved, checks the release before it goes anywhere, and a person approves it. Then you pitch it to the journalists the [news watch](/docs/guides/news-watch/) found, and see the replies and coverage it wins.

Journalists remember a brand that sends them invented quotes or unsourced numbers, so the rules are strict:

- a quote appears only once its expert approved those exact words;
- every number has a fact with a source;
- only a person approves a release or a pitch.

Choose a [brand](/docs/guides/brands/), then open **Outreach → Stories**. It has two tabs: **Stories** and **Experts**.

## Experts

Each brand keeps the people it quotes: who they are, how to introduce them (such as "CEO") and the topics they speak to. A brand's first expert is its default, and a quote with no expert named goes to them; you can make another expert the default. Add an expert from your [customer records](/docs/guides/customer-records/) or by email and name. Only add people who agreed to be quoted.

## A story

A story has a headline, a kind (**data**, **reactive** to a news article, or **comment**), notes for the team, the release itself in Markdown, and an optional embargo: a time before which it must not be published. It moves from **Idea** to **Draft** once it has a release, then to **Approved**, and you can archive it.

### Facts

Every number in the release needs a **fact** that states it, with where it comes from: a link, a note on how to find it again (such as the name of a saved query), or both. Say what kind of source it is: your own data, public data, news, a brand fact or something else. Figures from your own data are aggregates only, never about a person.

### Quotes

A **quote** is drafted for one of the brand's experts. It can appear in the release only once a person records that the expert approved those exact words, with a note on how (such as "by email on 29 October"). Changing the words makes it a draft again. API tokens and agents can draft quotes, but only a person can record an approval.

## The check

**Check** reads the release and keeps the result on the story.

| Finding | Kind | What it means |
| --- | --- | --- |
| No release | Error | The story has no release yet. |
| Unsourced number | Error | A number in the release appears in none of the story's facts. Numbers are compared with their unit, so 37% and "37 percent" match. Years and single digits don't count. |
| Fact without a source | Error | A fact has no link and no note. |
| Unapproved quote | Error | A quoted passage isn't part of a quote its expert approved. |
| Hype phrase | Warning | Words journalists skip a release for, such as "revolutionary" or "game-changer". |
| Needs a second look | Warning | A finance or health claim, such as "guaranteed returns", for a person to check against the rules for those. |

Errors stop approval; warnings are for the person approving to read.

## Approval

**Approve** runs the check and, when it passes, marks the story approved. Only a person can approve: API tokens and agents can't. Changing an approved story's headline, kind, release or embargo, a quote's words, or removing a fact or the expert sends it back to draft, to be approved again.

## With AI

Two tools use your workspace's own [AI model](/docs/agents/ai-models/), under the **PR stories** task. Outflare never uses an AI key of its own: without a connected model these tools stay off and say so, and their calls count against your [AI limits](/docs/guides/ai-usage/).

- **Suggest ideas with AI** suggests up to 10 story ideas from your brand, its facts, its experts' topics, its recent coverage and the last two weeks of news its topic searches found, with an optional brief from you. Each idea becomes a story at **Idea**; a reactive idea keeps the article it answers. Ideas never state numbers or quotes: a data idea says which of your numbers to look up.
- **Draft with AI** writes the release from the story's headline, notes, facts and approved quotes only, never a draft or withdrawn quote, with optional guidance from you. If there is a release already, **Redraft with AI** improves it. The draft replaces the release and runs the check straight away, so you see at once whether it used a number with no fact or changed a quote. A person still approves it.

## Pitching

Pitch an approved story to journalists through one of your own [sequences](/docs/guides/sequences/), from your existing mailboxes and their sending rules. On the story's **Pitches** card, choose the sequence and up to 50 journalists, such as those on a [media list](/docs/guides/news-watch/#media-lists).

- **The sequence** must stop on any reply, have one or two steps (one follow-up at most), and use `{{custom.opener}}`. `{{custom.story_title}}` holds the headline.
- **The opener.** Your workspace's AI model writes two to four sentences for each journalist from the story's facts and approved quotes and the journalist's latest article. It is checked like the release, so an opener with a number that isn't a fact, or a quote that isn't approved, waits for a person to fix it. Without a connected AI model, each pitch waits for a person to write the opener.
- **A person approves each pitch**, editing the opener first if they like. Approving makes the journalist a lead and enrolls them, **held until the story's embargo** lifts.
- **Gentle with journalists.** A journalist is pitched once per story, and at most once a week by your workspace, whichever brand. Anyone who asked not to be contacted is skipped, and the sequence stops when they reply.
- **Replies.** Each reply is read as **covering it**, **wants the data**, **wants an interview**, **not my beat**, **declined** or other, shown on the pitch and tagged in the [inbox](/docs/guides/inbox/). Requests for data or an interview also go to a person.

## Results

Each story shows its pitches, replies by kind and coverage over a period you choose (28 days by default). A story's coverage is coverage a person put on it, or coverage of its brand written by a journalist it pitched, after the pitch. **Home** shows a **Digital PR** row for the last 28 days next to your other channels, once there is something to show.

## Playbooks

Four [playbooks](/docs/agents/playbooks/) run digital PR end to end with these tools, each as a mission you approve:

- **Data story**: a surprising finding in your own data, as aggregates, written up and pitched to journalists on the topic.
- **Regional data story**: one finding split by region, each version pitched to that region's journalists.
- **React to today's news**: your expert's approved comment on a story the news watch found, pitched within hours to the journalists covering it.
- **Expert comment**: your expert offered to journalists on their beat, with an approved quote and an interview.

**Turn mentions into links** asks coverage that names your brand without linking to add the link. On Outflare Cloud, the [PR autopilot](/docs/guides/pr-autopilot/) runs the news reaction every morning.

## Permissions

Reading experts, stories and results, and running the check, needs `seo.read`; changing them and approving needs `seo.manage`. Pitches enroll leads in sequences, so they need `sequences.read` to list and `sequences.manage` to start, change, approve or reject. A member limited to some brands sees and changes only those brands' experts and stories.

## API and agents

| Call | What it does |
| --- | --- |
| `GET /v1/workspaces/{ws}/pr-experts`, `POST` | List or add experts |
| `GET /v1/workspaces/{ws}/stories`, `POST` | List or start stories |
| `POST /v1/workspaces/{ws}/stories/{story}/check` | Check the release |
| `POST /v1/workspaces/{ws}/stories/{story}/approve` | Approve it (people only) |
| `POST /v1/workspaces/{ws}/stories/ideas` | Suggest ideas with AI |
| `POST /v1/workspaces/{ws}/stories/{story}/draft` | Draft the release with AI |
| `POST /v1/workspaces/{ws}/stories/{story}/pitches` | Start pitches to journalists |
| `GET /v1/workspaces/{ws}/story-pitches` | List pitches |
| `POST /v1/workspaces/{ws}/story-pitches/{pitch}/approve` | Approve a pitch (people only) |
| `GET /v1/workspaces/{ws}/stories/results` | Pitches, replies and coverage per story |

Agents use `list_stories`, `create_story`, `add_story_fact`, `add_story_quote`, `check_story`, `suggest_stories`, `draft_story`, `pitch_story`, `list_story_pitches`, `get_story_results` and `list_pr_experts`, among others. They can draft a story and fix what the check finds; a person approves quotes, releases and pitches in Outflare.
