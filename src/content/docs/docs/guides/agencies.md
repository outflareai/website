---
title: Agencies were removed
description: Outflare no longer has agency accounts. A company is one company, with its brands inside it.
sidebar:
  hidden: true
---

Outflare no longer has agency accounts, to keep it simple: a company is one company, and a company with several businesses runs them as [brands](/docs/guides/brands/) inside it.

## What changed

- The **Agency** page, the `/v1/agencies` API, agency tokens (`ofa_…`), agency white label and the agency log are gone, and so are the MCP tools `list_clients`, `use_client` and `create_client`.
- Client companies stayed, with their own members, data and tokens. People who reached a company only through an agency lost access to it; an owner of the company can [invite them as members](/docs/guides/workspaces-and-access/).
- Agency tokens stopped working. Make a company [API token](/docs/api/authentication/) in each company instead.

To work across several companies, be a member of each and pick one with `--workspace` in the [CLI](/docs/agents/cli/) or `workspace` in the [SDKs](/docs/sdk/python/).
