---
title: Agencies were removed
description: Outflare no longer has agency accounts. A workspace is one company, with its brands inside it.
sidebar:
  hidden: true
---

Outflare no longer has agency accounts, to keep it simple: a workspace is one company, and a company with several businesses runs them as [brands](/docs/guides/brands/) inside it.

## What changed

- The **Agency** page, the `/v1/agencies` API, agency tokens (`ofa_…`), agency white label and the agency log are gone, and so are the MCP tools `list_clients`, `use_client` and `create_client`.
- Client workspaces stayed, with their own members, data and tokens. People who reached a workspace only through an agency lost access to it; an owner of the workspace can [invite them as members](/docs/guides/workspaces-and-access/).
- Agency tokens stopped working. Make a workspace [API token](/docs/api/authentication/) in each workspace instead.

To work across several workspaces, be a member of each and pick one with `--workspace` in the [CLI](/docs/agents/cli/) or `workspace` in the [SDKs](/docs/sdk/python/).
