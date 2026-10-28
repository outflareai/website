---
title: Contributing
description: How to contribute to Outflare. Issues, pull requests, the CLA, and the conventions the codebase follows.
---

The open-source engine is published at [outflareai/outflare](https://github.com/outflareai/outflare). Contributions of code, docs, bug reports and design feedback are welcome.

## Ways to help

- **Try it and report what breaks.** [Open an issue](https://github.com/outflareai/outflare/issues) with what you did, what you expected and the `request_id` from any error.
- **Suggest what to build next.** [Open an issue](https://github.com/outflareai/outflare/issues) with what you're trying to do and what's missing.
- **Tell us your reseller's CSV format** if it does not import cleanly.
- **Add your service as a connector.** A short YAML manifest, no Go needed: see [Build a connector](/docs/integrations/build-a-connector/).
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

Outflare's maintainers work in a private repository, and each release is published to `outflareai/outflare` as one commit. Pull requests there are welcome all the same: a maintainer brings yours into the private repository with you credited as its author, it goes through the same checks, and it ships in the next release. Your pull request is then closed with a link to that release. The full steps are in [`CONTRIBUTING.md`](https://github.com/outflareai/outflare/blob/main/CONTRIBUTING.md).

Keep each pull request to one change. `make test` and `pnpm -r build` must pass, and CI runs both. Go code is formatted with `gofmt`.

## Contributor License Agreement

Contributions require agreeing to the [Contributor License Agreement](https://github.com/outflareai/outflare/blob/main/CLA.md). You keep your copyright. On your first pull request a bot asks you to sign by replying with one sentence, and that covers all your later contributions.
