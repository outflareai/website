---
title: Command line
description: The outflare CLI has every API operation as a command, for scripts, CI and quick checks from a terminal.
sidebar:
  order: 4
---

The `outflare` binary that runs the server is also a client for any Outflare server. Its commands are read from the API document built into it, so every endpoint is there, with the same names, parameters and scopes as the [endpoint reference](/docs/api/reference/).

## Install and log in

```sh
go install github.com/outflareai/outflare/engine/cmd/outflare@latest
outflare login --url https://outflare.example.com
```

`login` asks for an [API token](/docs/api/authentication/) (it is not echoed), checks it with `GET /v1/whoami`, and saves the server, token and the token's workspace to your config folder (`~/.config/outflare/config.json` on Linux, readable only by you). In CI, skip `login` and set `OUTFLARE_URL` and `OUTFLARE_TOKEN`, or pipe the token in with `outflare login --url ... --token-stdin`. `outflare whoami` shows the token, its workspace and scopes; `outflare logout` forgets it.

## Run any operation

Each operation's `operationId` is a command, in kebab case. Flags are its parameters and body fields:

```sh
outflare upsert-lead --email ana@acme.com --first-name Ana --company Acme
outflare list-leads --q acme --limit 20
outflare get-lead --id bd11615b-2eab-4c55-945e-a3c1fb3fa9d0
outflare create-webhook --url https://example.com/hook --events lead.replied,lead.bounced
outflare import-leads --data @leads.csv
```

- Arrays take commas (`--events a,b`) or JSON (`--events '["a","b"]'`); objects take JSON (`--custom '{"tier":"a"}'`).
- `--data` sends a whole body: JSON, `@file`, or `-` for stdin. Field flags are merged into a JSON `--data`.
- `outflare help` lists every command by area. `outflare help create-webhook` shows its flags, which are required, the scope it needs and an example. A typo gets suggestions.
- `outflare api GET /v1/meta` calls any path directly.

## Options

| Flag | What it does |
| --- | --- |
| `--all` | Follows `next_cursor` to the last page and prints every item as one `{"data": [...]}`. |
| `--curl` | Prints the request as a `curl` command instead of sending it, with the token as `$OUTFLARE_TOKEN`. |
| `--mission ID` | Acts inside an [agent mission](/docs/agents/missions/). A held write prints its `MissionHeld` answer and says so. |
| `--idempotency-key K` | Sets the [retry key](/docs/api/#safe-retries). Without it, every write gets a fresh one. |
| `--workspace ID` | Another workspace, such as an agency client. |
| `--raw` | Prints the answer exactly as the server sent it. |

When a body field has the same name as one of these (a webhook's `--url`), the flag goes to the body; set the server with `OUTFLARE_URL` for that call.

## Listen for events

`outflare listen` shows what happens in the workspace as it happens, from now on. Add `--forward-to URL` to send each event to a receiver on your machine, signed like a real webhook delivery; see [Test a receiver on your machine](/docs/api/webhooks/#test-a-receiver-on-your-machine).

```sh
outflare listen --types lead.replied,mailbox.auto_paused
outflare listen --forward-to http://localhost:3000/webhooks
```

## Scripting

Answers go to stdout as JSON, pretty-printed in a terminal and compact when piped, so `jq` works:

```sh
outflare list-mailboxes --all | jq -r '.data[] | select(.status == "error") | .email'
```

Errors go to stderr as `outflare: 404 Not Found: not_found: lead not found (request …)` and the exit code is 1 (2 for a mistake in the command itself). Network errors, `429` and `502` to `504` are retried with backoff, waiting as long as `Retry-After` asks (up to a minute); writes are only retried because they carry an `Idempotency-Key`, so a retry never does anything twice.
