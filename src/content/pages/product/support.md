---
title: "AI support assistant for chat and email · Outflare"
description: "An AI support assistant that answers from your approved knowledge, asks one question back or hands off to your team. Drafting is open source; Auto is Cloud."
h1: "A support assistant that only says what your knowledge says."
label: Support
lede: "It reads each new chat or email, answers in a few short sentences from the articles your customers may be told, asks one question back when that settles it, or hands the conversation to your team with the reason."
answer: "Outflare's support assistant reads each new message in your support inbox, by chat or email, and either answers from your approved knowledge, asks one question back, or hands the conversation to your team with the reason. Every answer must name the articles it used and pass a second check that finds every fact in them. Drafting replies for a person to send is open source; Auto, where passing answers are sent on their own and signed as an AI assistant, runs only on Outflare Cloud."
points:
  - "Answers only from knowledge your customers may be told"
  - "Hands off disputes, refunds, legal and upset customers to a person"
  - "Learns from your website and past replies, after you approve"
  - "Draft mode is open source; Auto is Outflare Cloud"
docs:
  - label: Support assistant
    href: /docs/guides/support-assistant/
  - label: Inbox
    href: /docs/guides/inbox/
  - label: AI models
    href: /docs/agents/ai-models/
  - label: Open source and Cloud
    href: /docs/project/open-source-and-cloud/
faqs:
  - q: "Does the support assistant make things up?"
    a: "It answers only from the articles and answers you approved for customers, never from general knowledge. Every answer must name the articles it used, and a second check must find every price, time, step, link and promise in them; if not, it hands the conversation to your team."
  - q: "Is the AI support assistant open source?"
    a: "Drafting is. In Draft mode the assistant writes a reply above the reply box and a person sends it. Auto, which sends passing answers on its own signed as an AI assistant, is part of Outflare Cloud; on a self-hosted server the assistant drafts."
  - q: "When does it hand a conversation to a person?"
    a: "When your knowledge doesn't cover it, it needs the customer's account or an action such as a refund, the customer sounds upset, something is unclear, or someone asks for a person. Disputes, chargebacks, legal matters, security and personal data always go to a person."
  - q: "Which AI model does it use?"
    a: "Your own, connected under the Support replies task with your own key. Outflare never pays for the AI or lends a key; without one the assistant stays off and says which connection to add."
  - q: "How does it learn new answers?"
    a: "When your knowledge has no answer, it looks on your website and in Slack channels you pick, and your teammates' replies are offered too. Everything it finds waits in Knowledge → Review, and nothing is used until a person approves it."
related:
  - /product/inbox/
  - /product/reviews/
  - /product/agents/
  - /product/customer-data/
  - /product/brands/
updated: 2026-11-09
order: 93
---

## What it does with each message

- **Answers** in a few short sentences, the answer first, from the articles your customers may be told, and says which ones it used.
- **Asks one question back** when that settles it, such as which plan they're on.
- **Hands the conversation to your team**, with the reason: not covered by your knowledge, needs their account or an action, the customer sounds upset, or something is unclear.

It writes like a capable person on your team, with no filler such as "Great question", and it says it's an AI assistant, never a person.

## Draft and Auto

Open **Support → Support settings → AI assistant** and choose **Off**, **Draft** or **Auto** for email and for website chat. **Try it** asks a question as a customer would, without storing or sending anything.

| Mode | What happens | Where it runs |
| --- | --- | --- |
| Draft | A reply appears above the reply box with the articles it used; **Use this** puts it in for a person to edit and send | Open source and Outflare Cloud |
| Auto | A reply that passes every check is sent on its own, signed as the assistant; anything handed off waits for your team | Outflare Cloud only |

In Auto, an email answer waits a few minutes first (5 by default), with **Stop**, **Edit** and **Discard**, and never goes if a teammate replies first or the customer writes again. On chat, each answer asks **Did this help?**, and **No** hands the chat to a person.

## What keeps it safe

These rules are part of Outflare, not instructions to the AI, so no message can talk it out of them:

- **It stays out** of automatic replies, no-reply senders and conversations a teammate is already answering, and answers at most three times in one conversation.
- **A person always handles** anyone who asks for a person, and disputes, chargebacks, legal matters, security and personal data.
- **Every answer is checked** against the articles it names before anyone sees it.
- **Style rules** catch filler, long replies, more than one link, links outside your own sites, and contact details that aren't in your articles.
- **It has no tools.** Customers' messages and web pages are read as text, never as instructions, and it can only write a reply.

## Hand-off topics

List what your conversations are about, such as Billing, Bugs or Sales. The assistant tags each conversation with its topic so you can filter the [inbox](/product/inbox/), routes hand-offs to the topic's person and team, and never answers a topic you mark **Always hand it to your team**.

## Teach it from what you already have

- **Your website.** **Import website** reads your site's pages into a Website folder and checks it daily for changes.
- **Your past replies.** **Learn from past replies** reads support conversations closed in the last 90 days and suggests one general answer per question your team answered, leaving out anything about one customer.
- **Gaps.** When your knowledge has no answer, it looks on your website's FAQ, help, pricing and docs pages and in the Slack channels you pick (read only).

All of it waits in **Knowledge → Review** for a person to approve. Owners and admins get an alert at most once a day while answers wait.

## See how it's doing

Support settings show the last 30 days against the 30 before: how often it answered or handed off and why, how many drafts went out as written, and what chat visitors said. Agents can draft replies, try questions and read its stats through the API and the [MCP server](/product/mcp/).

## What to know

- It needs a support inbox (a support mailbox, your support address or your website chat), knowledge your customers may be told, and your own AI model.
- Its AI calls count against your workspace's AI limits and bill your own provider.
- A brand can have its own settings and its own assistant name.
