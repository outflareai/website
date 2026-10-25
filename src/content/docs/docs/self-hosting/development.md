---
title: Run from source
description: Build and run the Outflare engine and web app from source for development.
sidebar:
  order: 4
---

You need Go 1.25 or later, Node 22 or later, pnpm 10 and a Postgres 16 you can reach.

```sh
git clone https://github.com/outflareai/outflare
cd outflare
pnpm install
```

The `Makefile` wraps the common commands. It defaults `DATABASE_URL` to `postgres://postgres@localhost:5432/outflare` and sets a fixed development-only `OUTFLARE_SECRET_KEY`. Never use that key for real mailboxes.

```sh
make migrate          # create the schema in DATABASE_URL
make run              # engine: API + workers on :8080
make web              # web app on :5173, proxying the API to :8080
make test             # Go tests (needs TEST_DATABASE_URL, a disposable database)
make build            # engine binary at engine/bin/outflare, plus pnpm -r build
make docker           # build the outflare:dev image
```

Override the database with `make run DATABASE_URL=postgres://...`.

## Repository layout

| Path | What |
| --- | --- |
| `engine/cmd/outflare` | The binary: `serve`, `migrate` and `version` commands |
| `engine/internal/api` | HTTP handlers, authentication and workspace scoping |
| `engine/internal/jobs` | The Postgres job queue |
| `engine/internal/mailbox` | CSV import, provider detection, SMTP/IMAP checks, DNS health |
| `engine/internal/db/migrations` | Append-only numbered SQL migrations |
| `api/openapi.yaml` | The API contract |
| `web/` | Vite + React web app |
| `sdk/ts/` | TypeScript SDK, generated from the contract |

## Changing the API

Change `api/openapi.yaml` first, then regenerate the SDK types:

```sh
pnpm --filter @outflare/sdk generate
```

CI fails if `sdk/ts/src/schema.ts` does not match the spec. Read [`AGENTS.md`](https://github.com/outflareai/outflare/blob/main/AGENTS.md) before your first change: it lists the rules every change follows, such as workspace scoping, audit events and running side effects in jobs.
