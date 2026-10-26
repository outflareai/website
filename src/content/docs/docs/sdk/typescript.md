---
title: TypeScript SDK
description: Use the Apache-2.0 TypeScript SDK, generated from the OpenAPI contract, to call Outflare from Node, Deno, Bun or the browser.
---

`@outflare/sdk` is a small typed client for the Outflare API. Its types are generated from [`api/openapi.yaml`](/docs/api/), so every path, parameter and response is checked by the TypeScript compiler, and CI keeps it in step with the server. It is licensed **Apache-2.0**, so you can embed it in closed-source tools without copyleft obligations.

<span class="pill building">Not on npm</span> The package is not published to a registry yet. Build it from the repository:

```sh
git clone https://github.com/outflareai/outflare
cd outflare && pnpm install && pnpm --filter @outflare/sdk build
# then, in your project:
npm install /path/to/outflare/sdk/ts
```

## Usage

```ts
import { readFile } from 'node:fs/promises';
import { createClient } from '@outflare/sdk';

const gtm = createClient({
	baseUrl: 'https://outflare.example.com',
	token: process.env.OUTFLARE_TOKEN, // oft_...
});

const ws = process.env.OUTFLARE_WORKSPACE!;

// List active mailboxes
const { data, error } = await gtm.GET('/v1/workspaces/{ws}/mailboxes', {
	params: { path: { ws }, query: { status: 'active' } },
});
if (error) throw new Error(error.error.message);
for (const m of data.data) console.log(m.email, m.daily_limit);

// Import a reseller CSV into a pool
const csv = await readFile('mailboxes.csv', 'utf8');
const res = await gtm.POST('/v1/workspaces/{ws}/mailboxes/import', {
	params: { path: { ws }, query: { pool: 'Warm' } },
	body: csv,
	headers: { 'Content-Type': 'text/csv' },
	bodySerializer: (b: string) => b,
});
console.log(res.data); // { created, updated, errors }
```

The client is built on [`openapi-fetch`](https://openapi-ts.dev/openapi-fetch/). Every call returns `{ data, error, response }` instead of throwing, and `error` has the API's [error shape](/docs/api/#errors).

## Throwing on errors with `ok()`

Scripts and agents usually want a call to either succeed or stop. Wrap it in `ok()`: it returns `data`, or throws an `OutflareError` with the HTTP `status`, the API's error `code` (such as `conflict` or `invalid_request`), the `message` and the `requestId`.

```ts
import { createClient, ok, OutflareError } from '@outflare/sdk';

const stats = ok(await gtm.GET('/v1/workspaces/{ws}/stats', { params: { path: { ws } } }));
console.log(`${stats.sent_24h} sent today of ${stats.mailboxes.daily_capacity}, ${stats.unread_replies} unread replies`);

try {
	ok(await gtm.DELETE('/v1/workspaces/{ws}/oauth-connections/{id}', { params: { path: { ws, id } } }));
} catch (e) {
	if (e instanceof OutflareError && e.code === 'conflict') console.log(e.message); // mailboxes still use it
	else throw e;
}
```

## Options

| Option | Description |
| --- | --- |
| `baseUrl` | Your instance, for example `https://outflare.example.com`. Leave empty for same-origin, as the web app does. |
| `token` | An API token. Omit it in the browser to use the signed-in session cookie. |
| `fetch` | A custom `fetch` implementation, for tests or older runtimes. |
| `mission` | Act inside an agent mission: every call carries `Outflare-Mission`, and writes may come back held. |
| `missions` | `true` for a client that sets the mission header itself (as the MCP server does). Types it like one with `mission`. |
| `maxRetries` | How many times to retry a network error, `429`, `502`, `503` or `504`. Default 3; `0` turns retries off. |
| `clientName` | Names your app in the `Outflare-Client` header. Default `sdk-ts/<version>`. |

## Retries and idempotency

The client retries a call that failed on the network or was answered `429`, `502`, `503` or `504`, up to `maxRetries` times. It waits as long as `Retry-After` asks, up to a minute, or else backs off from half a second with jitter.

Every write carries an `Idempotency-Key`, the same one on each retry, so a retry after a timeout gets the first answer back instead of creating a second lead. To make a whole job safe to run twice, pass your own key; see [Safe retries](/docs/api/#safe-retries):

```ts
const key = `spend-${invoice.id}`;
ok(await gtm.POST("/v1/workspaces/{ws}/spend", { params: { path: { ws }, header: { "Idempotency-Key": key } }, body: spend }));
```

## Paging and fields

`paginate()` yields every item of a paged list, following `next_cursor`. Pass a function that makes the call for a cursor:

```ts
import { paginate } from '@outflare/sdk';

for await (const lead of paginate((cursor) =>
	gtm.GET('/v1/workspaces/{ws}/leads', { params: { path: { ws }, query: { q: 'acme', cursor, fields: ['email'] } } }),
)) {
	console.log(lead.email);
}
```

`fields` trims each item to the fields you read (and `id`). See [Choose the fields](/docs/api/#choose-the-fields).

## Missions

Inside a [mission](/docs/agents/missions/), a write may be answered `202` with a `MissionHeld` body instead of running: a dry run, or held until a person approves it. `isHeld()` tells the two apart:

```ts
import { createClient, isHeld, ok } from "@outflare/sdk";

const gtm = createClient({ baseUrl, token, mission: missionId });
const lead = ok(await gtm.POST("/v1/workspaces/{ws}/leads", { params: { path: { ws } }, body: { email } }));
if (isHeld(lead)) console.log(lead.message, lead.mission_action.id);
else console.log("created", lead.id);
```

A client made without `mission` never gets those answers, so its types leave them out.

## Webhooks

`verifyWebhook()` checks a [webhook](/docs/api/webhooks/) delivery's signature and age, and returns the typed event. Pass the raw body, before any JSON parsing. It uses Web Crypto, so it runs in Node 18+, Deno, Bun, Cloudflare Workers and browsers:

```ts
import { verifyWebhook, WebhookVerificationError } from "@outflare/sdk";

export default {
  async fetch(req: Request, env: { OUTFLARE_WEBHOOK_SECRET: string }) {
    try {
      const event = await verifyWebhook(await req.text(), req.headers, env.OUTFLARE_WEBHOOK_SECRET);
      if (event.type === "lead.replied") await notifyRep(event);
      return new Response(null, { status: 204 });
    } catch (e) {
      if (e instanceof WebhookVerificationError) return new Response("bad signature", { status: 401 });
      throw e;
    }
  },
};
```

With Express, read the body with `express.text({ type: "application/json" })` and pass `req.headers`.

## Types

Common schemas are exported as types, including `Workspace`, `WorkspaceStats`, `Member`, `APIToken`, `Mailbox`, `OAuthConnection`, `ImportResult`, `Lead`, `LeadList`, `Suppression`, `Sequence`, `Step`, `Enrollment`, `Message`, `InboundMessage`, `ThreadEntry`, `Meta` and `ApiError`. The full generated `paths` and `components` types are exported too.

## Other languages

Python has its own [SDK](/docs/sdk/python/). For other languages, generate a client from your instance's `/v1/openapi.yaml` with any OpenAPI 3.1 generator, such as [openapi-generator](https://openapi-generator.tech/) for Go or Java.
