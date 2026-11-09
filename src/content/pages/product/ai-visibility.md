---
title: LLM visibility tracking for your brand · Outflare
description: Track how ChatGPT, Claude, Gemini and other AI models answer your buyers' questions, whether they name and recommend you, and which pages to get onto.
h1: See whether AI answers name your brand.
label: AI visibility
lede: Outflare asks AI assistants the questions your buyers ask, on a schedule and on your own accounts, then shows question by question whether the answers name and recommend you, who they name instead, and which pages to get onto.
answer: Outflare's AI visibility tracks your brand in AI answers. It asks AI models and assistants, including ChatGPT and Gemini as people see them, the questions your buyers ask, then scores each answer on whether it recommends you, names you or leaves you out. You see your score, rank and share of voice against competitors, the pages the answers cite, and what AI says about you. It runs on your own DataForSEO and AI model accounts.
points:
  - A 0 to 100 visibility score, rank and share of voice
  - The cited pages worth getting onto, ranked
  - Checks answers against your brand's facts
  - Shows AI crawler access and AI-referred visits
docs:
  - label: See how AI answers mention you
    href: /docs/guides/ai-visibility/
  - label: Follow your competitors
    href: /docs/guides/competitors/
  - label: AI models
    href: /docs/agents/ai-models/
  - label: Manage your brand's presence
    href: /docs/guides/coverage/
faqs:
  - q: What is LLM visibility?
    a: LLM visibility is how often, and how favourably, AI models such as ChatGPT, Claude, Gemini and Perplexity mention your brand when people ask them questions in your market. Tracking it means asking those questions regularly and recording whether the answers name or recommend you.
  - q: How does Outflare measure AI visibility?
    a: For each question, an answer that recommends you scores 1, one that names or lists you 0.6, and one that warns against you or leaves you out 0. Questions are weighted by how many people ask them, giving a score from 0 to 100, plus your rank, share of voice and average position in answers.
  - q: Which AI assistants can it track?
    a: Up to 8 at once. ChatGPT and Gemini as people see them on their own screens, through your DataForSEO connection, and models through their APIs on your own Claude, OpenAI, Gemini, Mistral, xAI or DeepSeek key, or a router such as OpenRouter, which can cover many models with one key.
  - q: What does it cost?
    a: Outflare itself is free to self-host and free on Outflare Cloud during early access. The questions run on your own accounts, so DataForSEO and your AI provider bill you directly; answers as people see them cost about US$0.004 each on DataForSEO. AI visibility has its own monthly limit, US$10 unless you change it.
  - q: How do I get named in more AI answers?
    a: Work down the Sources page, which ranks the pages the answers cite by how much being named there is worth, and shows whether each one already links to you or your competitors. Questions where no answer names you go on the fixes list with a prompt for a writer or an agent.
related:
  - /glossary/llm-visibility/
  - /glossary/generative-engine-optimization/
  - /glossary/ai-mode/
  - /best/ai-visibility-tools/
  - /product/seo/
  - /product/competitors/
updated: 2026-11-09
order: 25
---

## How it works

1. **Name your brand.** Its name and the other names it goes by, and what it offers, read from its website.
2. **Pick competitors.** The ones you already track on the [Competitors](/docs/guides/competitors/) page are ticked.
3. **Choose questions.** Outflare drafts the questions a buyer would type, from what the brand offers, its competitors, your personas and your own Search Console queries. With DataForSEO, it adds real questions people put to ChatGPT whose answers mention you or your competitors. Keep what fits, or type your own.
4. **Choose assistants.** Up to 8, each on your own account, and whether they search the web before answering.
5. **Run.** You see what one run costs before you start, then run it weekly, daily or by hand.

Until a brand's first run, the Overview walks you through these steps.

## What you see

| Page | What it answers |
| --- | --- |
| Overview | Your AI visibility score, rank, share of voice, how often you are recommended, and what to do next |
| Questions | For each buyer question, whether the answers name you and recommend you, and how that moved |
| Competitors | Who wins AI answers, and who else they name |
| Sources | Which pages the answers cite, and which to get onto first |
| How AI describes you | What the answers say you are known for, and what they hold against you |
| Traffic | What AI answers bring your site, and whether AI crawlers can read it |

The score chart can compare by competitor, assistant, question type, topic, persona or market. Each weekly point carries its range, so you can tell a real move from the usual wobble between answers.

## Two ways to ask

- **As people see it.** ChatGPT and Gemini on their own screens, as a signed-out person in your market sees them, read through your own [DataForSEO](/docs/integrations/connectors/) connection. These answers come with the searches the assistant ran, every page it read and the brands it named.
- **Through the models' APIs**, on your own AI connection: Claude, OpenAI, Gemini, Mistral, xAI, DeepSeek, or a router such as OpenRouter, Vercel AI Gateway or Requesty. See [AI models](/docs/agents/ai-models/).

Outflare never supplies a key. With neither connection, AI visibility stays off and tells you which connection to add.

## From tracking to action

- **Placements to get.** The Sources page ranks cited pages by how many answers cite them, how many people ask those questions, and which competitors are named there. Outflare reads each page and says whether it links to you or each competitor, and each page is also an opportunity in [Presence](/docs/guides/coverage/), where outreach to get onto it starts.
- **Are the answers right?** List what is true about your brand, such as "There is no free plan". After each run your own AI model reads every answer against those facts and shows which answers contradict them.
- **Fixes.** A question no answer names you for, a question where a competitor is recommended instead, a contradicted fact, and a claim you mark **Not true** all go on the brand's fixes list. The next run checks each one and closes it once the answers change.

## Can AI read your site?

AI answers can only cite pages AI crawlers may read. Each [site audit](/docs/guides/site-audits/) checks your robots.txt for search crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot), user crawlers (ChatGPT-User, Claude-User, Perplexity-User) and training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot). Pages hidden from AI search, and a site with no `/llms.txt`, go on the fixes list. With a Cloudflare Web Analytics connection, Outflare also counts AI crawler requests per site and day.

With [website tracking](/docs/guides/website-tracking/) on your site, the Traffic page shows the visits ChatGPT, Perplexity, Gemini, Claude, Copilot and others sent, and the sign-ups and revenue credited to them.

## Share and report

Make a read-only share link with the score, rank, share of voice and each question's results, with an optional password and expiry. Download the Questions and Sources tables as CSV. The brand's weekly or daily [digest](/docs/guides/digests/) has an AI visibility section.

## For agents

Everything is in the API under `/v1/brands/{brand}/ai-visibility` and in the [MCP server](/product/mcp/), with tools such as `get_ai_visibility`, `get_ai_visibility_questions`, `get_ai_visibility_placements` and `draft_ai_prompts`. The **Get named in AI answers** playbook puts them together. Answers are treated as data, never as instructions.

AI visibility as described here is in the open-source engine and in Outflare Cloud. A managed version across many models at scale is planned for [Outflare Cloud](/docs/project/open-source-and-cloud/).
