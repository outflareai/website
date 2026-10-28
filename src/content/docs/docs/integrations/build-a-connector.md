---
title: Build a connector
description: Add your service to Outflare with a short YAML manifest and a pull request on GitHub, without writing Go. How manifests work, what they can do today, and the Verified and Community badges.
sidebar:
  order: 9
---

<span class="pill shipped">Shipped</span> Manifest connectors for email verification, the Verified and Community badges, and listing through a pull request.

Anyone can add their service to Outflare. A connector is a folder in [`integrations/`](https://github.com/outflareai/outflare/tree/main/integrations) on GitHub. It holds a short YAML manifest that describes your API, a logo, and recorded answers that prove the manifest works. You don't write any Go. Once it is merged, your connector shows up in every workspace's Connectors page, in the API catalog (`GET /v1/connectors`), for agents through MCP, and on [outflare.ai/integrations](/integrations/).

The Bouncer and Reoon connectors, which the Outflare team looks after, are written this way, so you can copy either one as a starting point. Everything in `integrations/` is Apache-2.0.

## How it works

A manifest is data, not code. Outflare reads it and makes the calls itself:

- Every request goes to one `base_url` of yours, over https. A person's key is only ever sent there.
- Templates only fill in values, such as `{{api_key}}` or the address being checked (`{{email}}`). There are no expressions or scripts.
- Answers are read with dotted paths (`result.status`, `domain.acceptAll`) and mapped onto Outflare's own types. Every feature that uses that capability then works with your connector, exactly as it does with one built into Outflare.
- Every connection uses the workspace's own key for your service. Outflare never supplies one.

## What a manifest can do today

| Capability | Category | What Outflare gets |
| --- | --- | --- |
| `verify` | `email_verification` | A status (deliverable, undeliverable, risky or unknown), the reason, catch-all, disposable, role and free-mail flags, a suggested correction and a score |

More capabilities are coming: enrichment, email finding and notifications. Until then, other kinds of connectors are built into Outflare by its maintainers. [Open an issue](https://github.com/outflareai/outflare/issues) to ask for one.

Tools such as n8n or Zapier don't need a connector. They call [Outflare's API](/docs/api/) or use the [MCP server](/docs/agents/mcp/).

## Add yours

1. Fork [outflareai/outflare](https://github.com/outflareai/outflare) and add `integrations/connectors/<id>/` containing `manifest.yaml`, `tests.yaml` and `logo.svg`. The [integrations README](https://github.com/outflareai/outflare/blob/main/integrations/README.md) has every field, with a full example.
2. Record real answers from your API in `tests.yaml`. Replace every person, address and domain with fake ones (`ana@acme.example`), and every key with an obvious fake (`test-not-a-real-key`).
3. Run the checks with `go test ./engine/internal/connectors/manifest/`.
4. Open a pull request. CI checks the manifest, the logo and your tests, and scans for secrets and real people's data. Outflare's staff review it.

Once it is merged, your connector ships with the next update of Outflare Cloud and in the next release for self-hosted servers. A [Contributor License Agreement](/docs/project/contributing/#contributor-license-agreement) applies, as for any contribution.

## Rules the checks enforce

- `base_url` is a plain https address on a public host name: no IP address, port or query. Request paths start with `/` and stay on that host.
- The request that tests a key is a `GET` that changes nothing and spends no credits.
- Headers can't set `Host`, `Cookie` or other headers that control the connection.
- Every `{{variable}}` must be one of your key fields or the capability's inputs.
- Unknown fields are errors, so a typo never goes unnoticed.
- HTTP 401 and 403 mean a refused key, 402 and 429 mean out of credits or rate limited, and 5xx means the service is down.

## Badges

Every connector says who built it.

| Badge | Who |
| --- | --- |
| None | Connectors the Outflare team looks after |
| **Verified** | Publishers who proved they own their domain (with a DNS TXT record or `https://<domain>/.well-known/outflare.json`), gave a security contact and passed review |
| **Community** | Everyone else, after review. The connector works fully; the badge says the publisher isn't verified yet |

A connector can't claim a verified publisher's name. To be verified, [open an issue](https://github.com/outflareai/outflare/issues) with your domain and security contact. Over the API, `publisher` and `trust` (`outflare`, `verified` or `community`) are on every connector in `GET /v1/connectors`.

## Private connectors

A connector for your own company's platform, one you'd rather not list publicly, isn't supported yet. Private connectors added to a single workspace are planned.
