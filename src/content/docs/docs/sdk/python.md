---
title: Python SDK
description: Call Outflare from Python with one method per API operation, generated from the OpenAPI contract, with retries, idempotency keys, paging and webhook checks built in.
---

`outflare` is the Python client for the Outflare API. Every operation in [`api/openapi.yaml`](/docs/api/) is a method, generated from the same file as the server, the [CLI](/docs/agents/cli/) and the [TypeScript SDK](/docs/sdk/typescript/), and the engine's tests fail if it falls behind. It needs Python 3.9 or newer, depends only on `httpx`, ships type hints, and is licensed **Apache-2.0**.

<span class="pill building">Not on PyPI</span> The package is not published yet. Install it from the repository:

```sh
git clone https://github.com/outflareai/outflare
pip install ./outflare/sdk/python
```

## Usage

```python
from outflare import Outflare

client = Outflare()  # reads OUTFLARE_TOKEN, and OUTFLARE_URL for a self-hosted server

lead = client.upsert_lead(email="ana@acme.com", first_name="Ana", company="Acme")

for mailbox in client.paginate(client.list_mailboxes, status="active"):
    print(mailbox["email"], mailbox["daily_limit"])

with open("mailboxes.csv") as f:
    client.import_mailboxes(content=f.read(), pool="Warm")
```

`Outflare(token=..., base_url=...)` takes the same settings as arguments. Without `base_url` it calls `https://app.outflare.ai`.

## How methods are named

- Methods are the API's operation IDs in snake case: `listLeads` is `list_leads`, `createWebhook` is `create_webhook`. They match the CLI's commands (`outflare list-leads`).
- IDs in the path are positional: `client.get_lead(lead_id)`. Query parameters and body fields are keyword arguments, and the required ones have no default.
- `help(client.create_webhook)` shows the operation's description, the scope it needs and its HTTP call, the same text as the [API reference](/docs/api/reference/). Editors show it too.
- A field that is a Python keyword gets a trailing underscore: `from_=`.

## Workspace

Calls go to the token's own workspace, which the client looks up with `GET /v1/whoami` on first use. An agency token, or a person working in several workspaces, passes one:

```python
client = Outflare(workspace="acme")           # an ID or a slug
acme = client.with_options(workspace="acme")  # a copy that shares the connection
```

A slug can change, so store the workspace ID in long-lived configuration.

## Answers and errors

Answers are the JSON the API returns, as dicts and lists. Exports come back as text.

Any status other than `2xx` raises `OutflareError`:

```python
from outflare import OutflareError

try:
    client.create_sequence(name="Q3 founders")
except OutflareError as e:
    print(e.status, e.code, e.param, e.request_id)
```

`code` is stable and listed at `GET /v1/error-codes`, `param` names the field a `400` is about, and `request_id` is what to quote when asking for help. A `403` explains which scope is missing and how to get it.

## Retries and idempotency

The client retries network errors, `429`, `502`, `503` and `504` up to `max_retries` times (3 by default). It waits as long as `Retry-After` asks, up to a minute, or else backs off from half a second with jitter.

Every write carries an `Idempotency-Key`, the same one on each retry, so a retry after a timeout gets the first answer back instead of creating a second lead. Pass `idempotency_key=` to choose the key yourself, for example to make a job safe to run twice.

## Paging

`client.paginate(method, **params)` yields every item of a list, following `next_cursor` from page to page. To page by hand, pass `cursor=` and read `next_cursor` from each answer.

Paged lists also take `fields=["email", "status"]`, which answers only those fields of each item (and `id`).

## Newer endpoints and fields

- `extra_body={...}` sends body fields this version of the SDK doesn't know yet.
- `client.request("GET", "/v1/workspaces/{ws}/...", query={...})` calls any path. `{ws}` is filled in for you.

## Missions

`client.with_options(mission=mission_id)` makes every call act inside an [agent mission](/docs/agents/mcp/). A write the mission's limits hold answers `202`; `is_held(answer)` tells you so, and the write runs once someone approves it.

## Webhooks

```python
import os
from outflare import verify_webhook, WebhookVerificationError

event = verify_webhook(raw_body, request.headers, os.environ["OUTFLARE_WEBHOOK_SECRET"])
if event["type"] == "lead.replied":
    ...
```

Pass the raw body, before any JSON parsing. `verify_webhook` raises `WebhookVerificationError` when no signature matches or the delivery is more than five minutes old. See [Webhooks](/docs/api/webhooks/) for the events, and `outflare listen --forward-to http://localhost:8000/webhooks` to test a receiver on your machine.
