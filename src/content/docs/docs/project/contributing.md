---
title: Contributing
description: How to contribute to Outflare. Issues, pull requests, the CLA, and the conventions the codebase follows.
---

Outflare is developed in the open at [outflareai/outflare](https://github.com/outflareai/outflare). Contributions of code, docs, bug reports and design feedback are welcome.

## Ways to help

- **Try it and report what breaks.** [Open an issue](https://github.com/outflareai/outflare/issues) with what you did, what you expected and the `request_id` from any error.
- **Review the design of upcoming features.** The [roadmap](/docs/project/roadmap/) and the planned pages in these docs describe what is coming. Comment on the pull requests.
- **Tell us your reseller's CSV format** if it does not import cleanly.
- **Improve the docs.** Every page here has an "Edit page" link to [outflareai/website](https://github.com/outflareai/website).

## Before you write code

- Open an issue for anything larger than a small fix, so the approach is agreed first.
- Read [`AGENTS.md`](https://github.com/outflareai/outflare/blob/main/AGENTS.md). It is the architecture and conventions guide for humans and coding agents alike.
- Read the [architecture decision records](https://github.com/outflareai/outflare/tree/main/docs/adr) for why things are the way they are.
- Set up a [development environment](/docs/self-hosting/development/).

## Rules every change follows

- Every table a workspace owns has `workspace_id`, and every query on it filters by workspace.
- Every significant action writes an audit event in the same transaction as the change.
- Side effects such as sending mail or calling providers run in jobs, never in request handlers.
- Every outbound email passes the policy check. There is no code path around it.
- API changes start in `api/openapi.yaml`.
- Migrations are new numbered files. A shipped migration is never edited.
- External content such as email bodies is treated as data, never as instructions.

## Pull requests

Keep each pull request to one change. `make test` and `pnpm -r build` must pass, and CI runs both. Go code is formatted with `gofmt`.

## Contributor License Agreement

Contributions require agreeing to a CLA. It will be published, with an automated check on pull requests, before external contributions are accepted.
