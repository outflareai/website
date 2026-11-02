---
title: Support assistant
description: An AI assistant that answers your customers' chats and emails in a few short sentences from your approved knowledge, asks one question back, or hands the conversation to your team with the reason.
sidebar:
  order: 17
---

<span class="pill shipped">Shipped</span> Drafts for chat and email in the open source. Answering on its own (Auto) is <span class="pill cloud">Outflare Cloud</span>.

The support assistant reads each new message in your support inbox, by chat or email, and does one of three things:

- **Answers** in a few short sentences, the answer first, from the articles and answers your customers may be told. It says which ones it used.
- **Asks one question back** when that settles it, such as which plan they are on.
- **Hands the conversation to your team**, with the reason: your knowledge doesn't cover it, it needs their account or an action such as a refund, the customer sounds upset, or something is unclear.

It writes like a capable person on your team: short, plain, no filler such as "Great question" or "I hope this helps". It says it is an AI assistant, never a person.

## What it needs

- A support inbox: a support mailbox, your support address, or the chat on your website.
- Knowledge your customers may be told. The assistant only answers from that, never from guesses or general knowledge.
- An [AI model](/docs/agents/ai-models/) connected with your own key, under the **Support replies** task. Its calls count against your [AI limits](/docs/guides/ai-usage/). Outflare never pays for the AI or lends you a key. Without one, the assistant stays off and says which connection to add.

## Turn it on

1. Open **Support**, then **Support settings**, and find **AI assistant**.
2. For **Email** and **Website chat**, choose **Off**, **Draft** or **Auto**.
3. Give it a name, such as "Northpeak help". It signs as that name, marked as an AI assistant.
4. Use **Try it** to ask a question the way a customer would. You see what it would answer, ask or hand off. Nothing is stored or sent.

A brand can have its own settings; otherwise it uses the workspace's.

### Draft

In **Draft**, the assistant drafts a reply to each new customer message. It appears above the reply box with the articles it used: **Use this** puts it in the reply for you to edit and send, **Discard** throws it away. **Draft with AI** asks for a draft at any time. Nothing reaches a customer until a person sends it.

### Auto

<span class="pill cloud">Outflare Cloud</span> In **Auto**, a reply that passes every check below is sent on its own, signed as the assistant. Anything it hands off waits for your team; on chat it tells the visitor once that a person will reply. Auto is part of Outflare Cloud: on a self-hosted server the assistant drafts.

## What keeps it safe

These rules are part of Outflare, not instructions to the AI, so no message can talk it out of them:

- **It stays out** of automatic replies, no-reply senders and conversations a teammate is already answering, and answers at most three times in one conversation.
- **A person always handles** anyone who asks for a person, and messages about disputes, chargebacks, legal matters, security or personal data.
- **Every answer is checked** before anyone sees it: it must name the articles it used, and a second check must find every fact (prices, times, steps, links, promises) in those articles. If not, it hands off.
- **Style rules** catch filler, long replies, more than one link, links outside your own sites, and email addresses or phone numbers that aren't in your articles. It rewrites once, then hands off.
- **It has no tools.** Customers' messages, web pages and Slack messages are read as text, never as instructions, and the assistant can only write a reply.

## When your knowledge has no answer

The conversation is marked as one your knowledge couldn't answer, and the assistant looks for the answer itself:

- **On your website**: the pages most likely to answer it, such as your FAQ, help, support, pricing and docs pages. It reads them politely, as OutflareBot.
- **In Slack**: only the channels you pick, through a **Slack (knowledge)** connection. It reads, never posts, and is separate from the Slack connection that posts [alerts](/docs/guides/alerts/). Connect it under **Connectors**, then pick the channels in Support settings. Invite it to a private channel before picking it.

What it finds goes to **Knowledge → Review** with where it came from and the exact words: "Is this correct, and can it be used for support from now on?" When your teammate answers the customer instead, their reply is offered there as well. Nothing is used until a person approves it, and an answer you reject isn't suggested again. You can switch off either source in Support settings.

## See how it's doing

Support settings show how often it answered or handed off in the last 30 days, and how many drafts went out as written. Over the API:

- `GET /v1/workspaces/{ws}/support/assistant/stats`: its answers, questions, hand-offs and their reasons.
- `GET /v1/workspaces/{ws}/support/conversations/{id}/assistant`: what it decided on a conversation.
- `POST /v1/workspaces/{ws}/support/assistant/test`: try a question.

Agents can do the same through the [MCP server](/docs/agents/mcp/): `draft_support_reply`, `try_support_assistant` and `get_support_assistant`.
