---
title: Projects were removed
description: Outflare no longer has projects. Everything sits in a brand and its sequences. Here is where each part of a project went.
sidebar:
  hidden: true
---

Outflare no longer has projects. Everything sits in a **brand** and its **sequences**, as in Instantly, Smartlead and lemlist. A brand holds the context agents read, its domains and mailboxes, its lead lists and its sequences. Each sequence has its own switch and its own daily send limit.

If you never used projects, nothing changed for you.

## Where each part went

| What a project had | Where it is now |
| --- | --- |
| Offer, audience, market and the written brief | Added to the brand's context notes, or to the company context when the project had no brand. A brand's context says what it is, who it's for, goals, voice, rules and notes. See [Brands](/docs/guides/brands/#tell-agents-about-it). |
| Ideal customer filters | [Ideal customer profiles](/docs/guides/ideal-customers/). Each lead list scores against its own profile (`profile_id`). |
| Pause and archive | Pause the sequences themselves. Sequences in a paused or archived project were paused for you. |
| Daily send limit across its sequences | Each sequence's own daily send limit. See [Sequences](/docs/guides/sequences/). |
| Domains and mailboxes | The brand. Any sequence in a brand may send from any of the brand's mailboxes. Shared mailboxes, in no brand, send for any sequence. |
| Lead lists | The brand. |
| Project API tokens | Workspace tokens with the same scopes. To keep a token to one brand, create it with `brand`. |
| Reply rules | The rules of each of its sequences. |
| Costs and results | Per brand or per sequence on the [Outcomes](/docs/guides/outcomes/) page. |
| Missions, memories, meetings, deals and spend | Keep their brand. |

## What changed when you upgraded

- **Briefs.** Each project's offer, audience, market and written brief were added to its brand's context notes, or to the company's when it had no brand. Read them over and move each part into the field it belongs in.
- **Paused projects.** Their sequences were paused. Start the ones you want running again.
- **Daily limits.** A project's daily send limit was split evenly over its sequences, rounded down, as each sequence's own limit.
- **Lead lists.** A list that was in a project now scores against the project's ideal customer profile, through its own `profile_id`.
- **API tokens.** A token limited to one project became a workspace token with the same scopes, so it can now see and change the whole workspace. Each change is in the audit log. Review your tokens under **Settings → API tokens** and revoke any that should stay narrow, or make a new one kept to a brand.
- **Infrastructure plans and costs** kept the project's brand.

## For agents and the API

- The project endpoints are gone, and so are the MCP tools `list_projects`, `get_project_brief`, `create_project`, `update_project`, `add_to_project` and `remove_from_project`. Agents read the brief with `get_context` (with `brand`) or `get_brand_context`, save it with `update_brand_context`, and move records with `add_to_brand`.
- `project_id` and `project_ids` are gone from every request and response. Sending one is refused with a 400 as an unknown field.
- The `projects.read` and `projects.manage` scopes are now `profiles.read` and `profiles.manage`. They cover ideal customer profiles and moving records between brands. Tokens and roles that held the old names were moved to the new ones.
- The `project.*` webhook events are gone, and webhooks that listened for them no longer list them.

See [Brands](/docs/guides/brands/), [Sequences](/docs/guides/sequences/) and [Ideal customers](/docs/guides/ideal-customers/).
