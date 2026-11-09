---
title: TypeScript and Python SDKs for Outflare · Outflare
description: Apache-2.0 TypeScript and Python SDKs generated from Outflare's OpenAPI contract, with typed calls, retries, idempotency keys, paging and webhook checks.
h1: Typed SDKs for TypeScript and Python.
label: SDKs
lede: Two small clients for the Outflare API, generated from the same OpenAPI file as the server, so every endpoint is there and CI keeps them in step. Both are Apache-2.0, so you can embed them in closed-source tools.
answer: Outflare has two official SDKs, @outflare/sdk for TypeScript and outflare for Python, both generated from the API's OpenAPI 3.1 contract and licensed Apache-2.0. They retry failed calls safely with idempotency keys, follow pagination for you, and verify signed webhook deliveries. Neither is published to npm or PyPI yet, so you install them from the open-source repository.
points:
  - Generated from api/openapi.yaml; tests fail if they fall behind
  - Apache-2.0, with no copyleft obligations
  - Built-in retries, idempotency keys, paging and webhook verification
  - Not on npm or PyPI yet; install from the repository
docs:
  - label: TypeScript SDK
    href: /docs/sdk/typescript/
  - label: Python SDK
    href: /docs/sdk/python/
  - label: API overview
    href: /docs/api/
  - label: Webhooks
    href: /docs/api/webhooks/
faqs:
  - q: Is there an Outflare SDK on npm or PyPI?
    a: Not yet. Both SDKs are in the open-source repository at github.com/outflareai/outflare. Build the TypeScript one with pnpm and install it from its folder, or install the Python one with pip install ./outflare/sdk/python.
  - q: What licence are the SDKs under?
    a: Apache-2.0. You can embed them in anything, including closed-source products, with no copyleft obligations. The engine itself is AGPL-3.0, but calling it through the API or an SDK doesn't bring your code under the AGPL.
  - q: Which runtimes does the TypeScript SDK support?
    a: Node, Deno, Bun and the browser. Its webhook check uses Web Crypto, so it also runs in Node 18 and later and in Cloudflare Workers. In the browser it can use the signed-in session cookie instead of a token.
  - q: Which Python versions does the SDK need?
    a: Python 3.9 or newer. It depends only on httpx and ships type hints.
  - q: What about other languages?
    a: Generate a client from your instance's /v1/openapi.yaml with any OpenAPI 3.1 generator, such as openapi-generator for Go or Java. The CLI also has every operation as a command.
related:
  - /developers/api/
  - /developers/open-source/
  - /product/mcp/
  - /solutions/cursor/
  - /product/agents/
updated: 2026-11-09
order: 20
---

## Two SDKs, one contract

The [API](/developers/api/) is described by one OpenAPI 3.1 file, `api/openapi.yaml`. The server, the web app, the CLI, the [MCP server](/product/mcp/) and both SDKs are built from it, and the engine's CI fails if an SDK falls behind. A new endpoint is in the SDKs the day it ships.

| | TypeScript | Python |
| --- | --- | --- |
| Package | `@outflare/sdk` | `outflare` |
| Runs on | Node, Deno, Bun, browsers, Cloudflare Workers | Python 3.9 or newer |
| Built on | `openapi-fetch` | `httpx` |
| Call style | Typed paths: `client.GET('/v1/workspaces/{ws}/leads', …)` | One method per operation: `client.list_leads(...)` |
| Errors | `{ data, error }`, or `ok()` to throw `OutflareError` | Raises `OutflareError` |
| Paging | `paginate()` | `client.paginate(...)` |
| Webhooks | `verifyWebhook()` | `verify_webhook()` |
| Licence | Apache-2.0 | Apache-2.0 |
| Published | Not on npm yet | Not on PyPI yet |

## Install

Neither SDK is on a package registry yet. Install from the open-source repository:

```sh
git clone https://github.com/outflareai/outflare
# Python
pip install ./outflare/sdk/python
# TypeScript
cd outflare && pnpm install && pnpm --filter @outflare/sdk build
npm install /path/to/outflare/sdk/ts
```

## TypeScript

Every path, parameter and response is checked by the TypeScript compiler, because the types are generated from the contract.

```ts
import { createClient, ok, paginate } from '@outflare/sdk';

const of = createClient({ baseUrl: 'https://app.outflare.ai', token: process.env.OUTFLARE_TOKEN });
const ws = process.env.OUTFLARE_WORKSPACE!;

const stats = ok(await of.GET('/v1/workspaces/{ws}/stats', { params: { path: { ws } } }));

for await (const lead of paginate((cursor) =>
	of.GET('/v1/workspaces/{ws}/leads', { params: { path: { ws }, query: { q: 'acme', cursor, fields: ['email'] } } }),
)) {
	console.log(lead.email);
}
```

Common schemas such as `Lead`, `Sequence`, `Mailbox`, `InboundMessage` and `ApiError` are exported as types, as are the full generated `paths` and `components`. Options include `maxRetries`, a custom `fetch`, and `clientName`, which names your app in the request log. See the [TypeScript SDK docs](/docs/sdk/typescript/).

## Python

Methods are the API's operation IDs in snake case, so `listLeads` is `list_leads`, the same as the CLI's `outflare list-leads`. IDs in the path are positional; query and body fields are keyword arguments.

```python
from outflare import Outflare, OutflareError

client = Outflare()  # reads OUTFLARE_TOKEN, and OUTFLARE_URL for a self-hosted server

lead = client.upsert_lead(email="ana@acme.example", first_name="Ana", company="Acme")

for mailbox in client.paginate(client.list_mailboxes, status="active"):
    print(mailbox["email"], mailbox["daily_limit"])

try:
    client.create_sequence(name="Q3 founders")
except OutflareError as e:
    print(e.status, e.code, e.param, e.request_id)
```

Calls go to the token's own workspace, found with `GET /v1/whoami` on first use. `help(client.create_webhook)` shows the operation's description, the scope it needs and its HTTP call. For endpoints newer than your copy, `extra_body={...}` sends unknown fields and `client.request(...)` calls any path. See the [Python SDK docs](/docs/sdk/python/).

## Retries you can trust

Both SDKs retry network errors, `429`, `502`, `503` and `504`, three times by default, waiting as long as `Retry-After` asks, up to a minute. Every write carries an `Idempotency-Key`, the same one on each retry, so a retry after a timeout gets the first answer back instead of creating a second lead. Pass your own key to make a whole job safe to run twice.

## Verify webhooks

Webhook deliveries are signed the Standard Webhooks way. Pass the raw body, before any JSON parsing:

```ts
import { verifyWebhook } from '@outflare/sdk';

const event = await verifyWebhook(await req.text(), req.headers, env.OUTFLARE_WEBHOOK_SECRET);
if (event.type === 'lead.replied') {
	// event.target.id is the lead
}
```

A delivery whose signature doesn't match, or that is more than five minutes old, is rejected, which stops replays. In Python it is `verify_webhook(body, headers, secret)`. Test a receiver on your machine with `outflare listen --forward-to http://localhost:3000/webhooks`.

## Agents and missions

Inside an agent [mission](/docs/agents/missions/), a write may be held for a person's approval and answered `202`. Make the client with `mission` (TypeScript) or `client.with_options(mission=...)` (Python), and `isHeld()` or `is_held()` tells a held write from one that ran. If your agent runs in Claude, ChatGPT or Cursor, the [MCP server](/product/mcp/) is usually the quicker way in: it gives an agent the same API as MCP tools.

## What the SDKs don't do

- They don't hold API keys for any other service. Your workspace connects its own Ahrefs, DataForSEO, AI and email accounts in Outflare, and the SDK only talks to Outflare.
- They don't widen what a token can do. A call gets exactly what the token's workspace and scopes allow, as it would with `curl`.
