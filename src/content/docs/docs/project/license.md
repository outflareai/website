---
title: Open source and licensing
description: Why Outflare is open source, and what the AGPL-3.0 core and Apache-2.0 SDKs mean for you.
---

## Why open source

Go-to-market tools hold some of a company's most sensitive data: mailbox credentials, every prospect you have contacted and every reply. With Outflare:

- **You own the data.** It lives in your Postgres. Export it, query it, back it up, move it.
- **You can read the send path.** Deliverability and compliance depend on exactly what the sender does. Here you can read the code that decides whether an email goes out.
- **No per-seat or per-mailbox pricing** when you self-host. Add the hundredth mailbox for free.
- **Agents and integrations are first class**, because the API that the web app uses is the same public, documented API you build on.
- **No lock-in.** If the project goes a direction you do not like, you can fork it.

## The licenses

| Part | License | What it means |
| --- | --- | --- |
| Engine, web app, API spec, deploy files | [AGPL-3.0](https://github.com/outflareai/outflare/blob/main/LICENSE) | Use, self-host and modify freely. If you run a **modified** version as a service for others, you must publish your changes. |
| SDKs, provider SDK, examples | Apache-2.0 | Embed in anything, including closed-source products, with no copyleft obligations. |
| This website and docs | Apache-2.0 | Reuse the docs and examples freely. |

The reasoning is in [ADR 1](https://github.com/outflareai/outflare/blob/main/docs/adr/0001-license.md): anyone can self-host and build on Outflare, integrating through the API or SDKs carries no copyleft, and a company that runs a modified core as a hosted service has to share its changes.

## Common questions

**Can I use Outflare inside my company without publishing anything?**
Yes. Running it for your own team, modified or not, creates no obligation to publish. The AGPL applies when you offer a modified version to other people over a network.

**Can I build a closed-source product that talks to Outflare?**
Yes. Call the API or use the Apache-2.0 SDK. Your code is not affected by the AGPL.

**Can an agency run it for its clients?**
Yes. If you modify the core and your clients use that modified version, offer them the source of your changes.

**Do contributors sign anything?**
Yes, a Contributor License Agreement, which lets the project keep its licensing consistent and change it later if needed. It will be published, with an automated check on pull requests, before external contributions are accepted.

This page is a summary, not legal advice. The license texts are what apply.
