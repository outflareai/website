---
title: What is LLM visibility? How to track it · Outflare
description: "LLM visibility explained: how often ChatGPT, Gemini, Claude and Perplexity name your brand, how LLM visibility tracking works, and how to improve it."
h1: What is LLM visibility?
label: LLM visibility
term: LLM visibility
lede: LLM visibility, or AI visibility, is how often AI assistants name and recommend your brand when people ask them about your market. Here is how it is measured and what moves it.
answer: "LLM visibility is how often and how favourably large language model assistants, such as ChatGPT, Gemini, Claude and Perplexity, mention your brand in their answers to the questions your buyers ask. It is measured by asking those assistants a fixed set of questions on a schedule and recording whether each answer names you, recommends you, cites your pages, and who it names instead."
points:
  - Also called AI visibility, AI share of voice or LLM brand visibility
  - Measured question by question, assistant by assistant, over time
  - Assistants with web search cite pages, so third-party pages matter
  - AI crawlers must be allowed to read your site for it to be cited
docs:
  - label: See how AI answers mention you
    href: /docs/guides/ai-visibility/
  - label: Crawl and audit your sites
    href: /docs/guides/site-audits/
  - label: AI models
    href: /docs/agents/ai-models/
faqs:
  - q: What is LLM visibility tracking?
    a: It is asking AI assistants the questions your buyers ask, on a schedule, and recording whether each answer names or recommends your brand, which pages it cites and which competitors it names. Tracked over weeks, it shows whether your work is moving the answers.
  - q: How is LLM visibility different from SEO rankings?
    a: A ranking is one position on a results page. An AI answer can name several brands, recommend one, warn against another, or leave you out, and it changes between runs. So LLM visibility is measured as shares and scores over many answers, not a single position.
  - q: How do I improve my LLM visibility?
    a: Get named on the pages AI answers cite (reviews, comparisons, forums, docs), keep facts about your brand accurate and consistent across the web, publish pages that answer buyers' questions directly, and let AI search crawlers read your site.
  - q: Do AI crawlers need to access my site?
    a: For citations, yes. OpenAI says sites that opt out of OAI-SearchBot won't be shown in ChatGPT search answers, and Anthropic says blocking Claude-SearchBot may reduce your visibility in its search results. Blocking training crawlers such as GPTBot or ClaudeBot is a separate choice.
  - q: What is a good LLM visibility score?
    a: There is no universal benchmark, because scores depend on the questions you choose. Compare yourself with your competitors on the same questions, and watch the trend.
related:
  - /product/ai-visibility/
  - /best/ai-visibility-tools/
  - /glossary/generative-engine-optimization/
  - /glossary/ai-mode/
  - /glossary/web-crawler/
  - /product/competitors/
checked: 2026-11-09
updated: 2026-11-09
order: 20
---

## How it works

When someone asks an assistant "what's the best tool for X?", the answer comes from two places: what the model learned in training, and, when the assistant searches the web first, the pages it reads for that question. Your visibility depends on both.

Tracking it means turning that into numbers:

1. **Pick the questions.** The ones buyers really ask, at every stage: problem ("how do I stop cold emails landing in spam"), solution ("best email warm-up tools"), competitor ("Acme alternatives") and brand ("is Northpeak any good").
2. **Ask each assistant, regularly.** The same questions, on the same assistants, in the markets you sell in, weekly or daily. Answers vary from run to run, so one answer proves little; trends over many do.
3. **Read every answer.** Does it name you? Recommend you? Where in the answer? Which competitors are named, and which pages are cited?
4. **Score and compare.** Share of answers naming you, share recommending you, share of voice against competitors, and the change since last period.

## Why it matters

Buyers now ask AI assistants for shortlists. If the answer names three competitors and not you, you were never considered, and nothing shows up in your analytics. LLM visibility tracking makes that gap visible, question by question.

It also shows what assistants believe about you. An answer that says you have no free plan when you do, or recommends a competitor "for teams", is a fix you can work on.

## What moves it

- **Be on the cited pages.** Assistants that search cite reviews, comparisons, forums and documentation. Getting named on those pages is often faster than ranking your own.
- **Let AI search crawlers in.** OpenAI's [crawler docs](https://developers.openai.com/api/docs/bots) say sites opted out of OAI-SearchBot "will not be shown in ChatGPT search answers"; Anthropic's [help centre](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) says disabling Claude-SearchBot may reduce your visibility in its search results. Blocking training crawlers (GPTBot, ClaudeBot) is a separate choice.
- **Answer the question on the page.** Clear, direct, factual pages are easier for an assistant to quote. See [generative engine optimisation](/glossary/generative-engine-optimization/).
- **Keep facts consistent.** Pricing, plans and features should read the same on your site and everywhere else.

## How to measure it with Outflare

Outflare's [AI visibility](/product/ai-visibility/) is open-source LLM visibility tracking that runs on your own accounts. It asks your questions of ChatGPT and Gemini as people see them, through your own DataForSEO connection, and of models such as Claude, OpenAI, Gemini, Mistral, xAI and DeepSeek through your own AI key. It then shows:

- a 0 to 100 score per brand, against competitors, week by week;
- each question: named, recommended, and the change;
- the pages the answers cite, ranked by what being named there is worth, and whether each mentions you;
- what AI says you are known for and holds against you, and facts it gets wrong;
- visits AI assistants sent your site, and which AI crawlers your robots.txt allows.

Outflare never supplies a key. Without a DataForSEO or AI model connection, AI visibility stays off and says which to add. Other tools are compared on [the best AI visibility tools](/best/ai-visibility-tools/).
