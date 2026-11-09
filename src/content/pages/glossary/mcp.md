---
title: What is MCP (Model Context Protocol)? · Outflare
description: "What MCP is: how the Model Context Protocol connects AI apps like Claude and ChatGPT to tools and data, how MCP servers work, and what it means for marketing."
h1: What is MCP (Model Context Protocol)?
label: MCP
term: Model Context Protocol (MCP)
lede: MCP is the open standard that lets AI apps such as Claude, ChatGPT, Cursor and VS Code use outside tools and data. Here is how it works and what it means for marketing teams.
answer: "MCP, the Model Context Protocol, is an open-source standard for connecting AI applications to external systems. An MCP server exposes a tool's actions and data, and an AI app such as Claude, ChatGPT, Cursor or VS Code connects to it, so the model can read data and take actions in that tool during a conversation. Anthropic introduced MCP in November 2024, and in December 2025 donated it to the Agentic AI Foundation under the Linux Foundation."
points:
  - Servers expose tools (actions), resources (data) and prompts (templates)
  - Local servers run on your computer; remote servers run over HTTP
  - Supported by Claude, ChatGPT, Cursor, VS Code and many others
  - Outflare's MCP server is open source and hosted at app.outflare.ai/mcp
docs:
  - label: Connect your AI
    href: /docs/agents/connect/
  - label: The MCP server and its tools
    href: /docs/agents/mcp/
  - label: The policy check
    href: /docs/concepts/policy-check/
faqs:
  - q: What does MCP stand for?
    a: Model Context Protocol. It is an open standard for connecting AI applications to data sources, tools and workflows.
  - q: What is an MCP server?
    a: A program that provides context and actions to AI apps over MCP. It exposes tools (actions the model can call), resources (data) and prompts (reusable templates). It can run locally on your computer or remotely on the vendor's servers.
  - q: Who created MCP?
    a: Anthropic introduced MCP on 25 November 2024. On 9 December 2025 Anthropic donated it to the Agentic AI Foundation, a directed fund under the Linux Foundation co-founded by Anthropic, Block and OpenAI.
  - q: Which AI apps support MCP?
    a: The MCP project lists Claude, ChatGPT, Visual Studio Code, Cursor and many other clients. Each app has its own way to add a server, often a connectors or settings page where you paste the server's address.
  - q: Is MCP safe?
    a: It is as safe as the server's permissions. A good server lets you limit what a connected app may do, signs in with OAuth, and records every action. Outflare's server works through scoped tokens, and every email still passes its policy check, whatever the agent is told.
  - q: What is a marketing MCP server?
    a: An MCP server for a marketing tool, such as a CRM, email platform, analytics or SEO tool, so you can ask an AI app to pull reports or run campaigns. See the best MCP servers for marketing for a comparison.
related:
  - /product/mcp/
  - /best/mcp-servers-for-marketing/
  - /solutions/claude/
  - /solutions/chatgpt/
  - /solutions/cursor/
  - /glossary/agentic-marketing/
checked: 2026-11-09
updated: 2026-11-09
order: 40
---

## How MCP works

The [MCP documentation](https://modelcontextprotocol.io/docs/getting-started/intro) compares it to a USB-C port for AI applications: one standard way to plug an AI app into many systems.

There are three parts, described in the [architecture overview](https://modelcontextprotocol.io/docs/learn/architecture):

- **Host:** the AI application, such as Claude, ChatGPT, Cursor or VS Code.
- **Client:** a connection the host opens to one server. A host connected to five servers has five clients.
- **Server:** a program that provides context and actions. A local server runs on your machine over standard input and output; a remote server runs over Streamable HTTP and usually signs you in with OAuth.

A server offers three kinds of thing:

| Primitive | What it is | Marketing example |
| --- | --- | --- |
| Tools | Actions the model can call | Start a sequence, add a keyword to rank tracking |
| Resources | Data the app can read as context | A brand's positioning, a list of mailboxes |
| Prompts | Reusable templates | "Write a weekly SEO summary" |

When you ask a question, the app sees the tools each connected server offers, the model decides which to call, the app sends the call to the right server, and the result goes back into the conversation.

## A short history

Anthropic [introduced MCP on 25 November 2024](https://www.anthropic.com/news/model-context-protocol) as "a new standard for connecting AI assistants to the systems where data lives". On 9 December 2025 it [donated MCP to the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation), a directed fund under the Linux Foundation co-founded by Anthropic, Block and OpenAI. The MCP site lists support across AI assistants and developer tools, including Claude, ChatGPT, Visual Studio Code and Cursor.

## Why it matters for marketing

Before MCP, using an AI assistant with your marketing tools meant copying data into the chat and pasting results back. With MCP, you can ask Claude "which sequences had the most replies last week, and pause the worst one" and it reads the numbers and acts, in your real tools.

That raises the stakes. An AI app connected to your mailboxes or ad accounts can do real damage if the server lets it. Look for servers that:

- sign in with OAuth or a token you can limit to certain actions;
- enforce limits in the server, not in the prompt;
- record every action under the app's name, so you can see what happened.

## Using MCP with Outflare

Outflare's [MCP server](/product/mcp/) is open source and hosted at `https://app.outflare.ai/mcp` (on a self-hosted server, `https://<your server>/mcp`). Add it in Claude, ChatGPT, Cursor or VS Code, sign in and approve; [Connect your AI](/docs/agents/connect/) has the steps for each app. It gives the app more than 500 tools across cold email, leads, the reply inbox, SEO, AI visibility, analytics, customer records and [missions](/docs/agents/missions/).

The app can do only what its token's scopes allow, every email it sends passes the [policy check](/docs/concepts/policy-check/), a token can carry a daily send budget, and every change is in the audit log. Outflare never supplies an AI key: you use your own AI app, or connect your own model for Outflare's built-in agent. Other servers are compared on [the best MCP servers for marketing](/best/mcp-servers-for-marketing/).
