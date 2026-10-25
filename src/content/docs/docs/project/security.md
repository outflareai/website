---
title: Security
description: How to report a vulnerability in Outflare, and how the project protects credentials and data.
---

Outflare holds mailbox credentials and prospect data, so security reports are a priority.

## Reporting a vulnerability

Do **not** open a public issue. Report it privately with the **Report a vulnerability** button on the [repository's Security tab](https://github.com/outflareai/outflare/security). Reports are acknowledged within three working days.

## How credentials and data are protected

- **Mailbox passwords and provider keys are encrypted at rest** with your instance's `OUTFLARE_SECRET_KEY`, and the API never returns them.
- **Tokens are stored as hashes.** API tokens, sessions and invites are random secrets with visible prefixes (`oft_`, `ofs_`, `ofi_`) so a leaked one is easy to recognise and revoke. Only a hash is stored.
- **Workspaces are isolated.** Every query is filtered by workspace, and a workspace you cannot see returns `404`.
- **Least privilege.** API tokens carry explicit scopes that cannot exceed their creator's.
- **Everything is audited**, in the same transaction as the change.
- **Sign-in is rate limited**: ten failed attempts for one email lock it for 15 minutes.

## Running it safely

- Change `POSTGRES_PASSWORD` and keep `OUTFLARE_SECRET_KEY` secret and backed up.
- Serve it over HTTPS and set `PUBLIC_URL` to the `https://` address so session cookies are marked `Secure`. See [Self-hosting](/docs/self-hosting/docker-compose/#put-it-behind-https).
- Do not expose Postgres to the internet. The bundled Compose file does not publish its port.
