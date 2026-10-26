---
title: Agents and MCP
description: The Outflare MCP server's tools, and how to run it on your own computer with an API token. To connect Claude, ChatGPT or Cursor, see Connect your AI.
sidebar:
  order: 1
---

Outflare is built so that an AI agent can do anything a person can, through the same API, with the same limits. Agents are a first-class client, not an afterthought bolted onto a UI.

There are two ways in. The MCP server is the quickest one for Claude, ChatGPT, Cursor and other MCP apps. Any other agent framework can use the API directly.

**Just want to connect your AI?** Use the hosted server at `https://app.outflare.ai/mcp`: no install, you sign in and approve the app. [Connect your AI](/docs/agents/connect/) has the steps for each app.

## The MCP server <span class="pill shipped">Shipped</span>

[`@outflare/mcp`](https://github.com/outflareai/outflare/tree/main/mcp) is an [MCP](https://modelcontextprotocol.io) server that gives an agent 213 tools over the API (3 more in agency mode): run [missions](/docs/agents/missions/) toward a goal with approvals, read and update the brief of the project it works on, check sending domains and mailbox warm-up, import leads, check them against the suppression list, build, preview and start sequences, see and change which mailboxes each sequence sends from, and read and answer replies.

It calls the same API with a scoped token, so:

- the agent can do only what its token's scopes allow;
- every email still goes through the [policy check](/docs/concepts/policy-check/), however the agent is prompted;
- every change is in the audit log under the token's name.

### Run it on your computer

The hosted server at `/mcp` is the easy way ([Connect your AI](/docs/agents/connect/)). Run the server yourself instead when your app only starts local servers, or to pin it to one project or mission. It is not on npm yet. Build it from the repository (Node 18 or later):

```sh
git clone https://github.com/outflareai/outflare.git
cd outflare
pnpm install
pnpm --filter @outflare/sdk build && pnpm --filter @outflare/mcp build
```

Then configure it:

1. In the web app, open **API tokens** and create a token for the agent:
    - A reporting agent needs `workspace.read`, `mailboxes.read`, `leads.read`, `sequences.read` and `inbox.read`.
    - An agent that runs outreach also needs `leads.manage`, `sequences.manage` and `inbox.manage`, and `mailboxes.manage` to pause domains or change their limits.
    - To keep an agent inside one motion, create the token **for a project** (the project's page has a button for this) and add `projects.read`, plus `projects.manage` if it may edit the brief. It sees only that project and its records. See [Projects](/docs/guides/projects/#agents-and-project-tokens).
    - To let it run [missions](/docs/agents/missions/), add `missions.read` and `missions.run` (set **Missions** to **Change**). Never give it `missions.approve`.
    - For an outreach agent, also set its **sending limits**: a daily send budget across all the sequences it creates, the highest priority it may give a sequence, and whether it may take mailboxes from other sequences (off by default). See [Mailbox allocation](/docs/guides/mailbox-allocation/#agents).
2. Add the server to your client. The token already says which workspace it belongs to.

**Claude Code:**

```sh
claude mcp add outflare \
  -e OUTFLARE_URL=https://outflare.example.com \
  -e OUTFLARE_TOKEN=oft_... \
  -- node /path/to/outflare/mcp/dist/index.js
```

**Claude Desktop, Cursor and other clients** (for Claude Desktop, in `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "outflare": {
      "command": "node",
      "args": ["/path/to/outflare/mcp/dist/index.js"],
      "env": {
        "OUTFLARE_URL": "https://outflare.example.com",
        "OUTFLARE_TOKEN": "oft_..."
      }
    }
  }
}
```

Set `OUTFLARE_MCP_READ_ONLY=1` as well to register only the tools that change nothing, or `OUTFLARE_MISSION=<mission id>` to make every call act inside a mission.

### Tools

| Tool | What it does | Changes data |
| --- | --- | --- |
| `get_context` | Start here: what Outflare knows about the company, its memories and projects, and what is blocked. See [Memory and status](/docs/agents/memory/) | |
| `get_status` | Everything stopping the workspace, worst first, with the tool that fixes each and who must act | |
| `list_memories` | Search the preferences, decisions and facts people and agents saved | |
| `update_context`, `remember`, `update_memory`, `forget` | Save the company context, remember something lasting, correct or forget a memory | Yes |
| `list_projects` | Projects (one motion each: offer, ideal customer, market), with status, limits, what they own and sends | |
| `get_project_brief` | A project's offer, audience, market, ideal customer filters and brief, plus all of it as Markdown for a prompt | |
| `get_outcomes_report` | Cost per reply, meeting and won deal, for the workspace or by project or sequence, with what is estimated or unpriced | |
| `list_meetings`, `list_deals` | Meetings and deals, with which sequence and project each counts for | |
| `list_spend`, `list_recurring_spend`, `list_spend_rates` | The spend ledger, recurring costs, and unit prices with usage still unpriced | |
| `list_outcome_syncs` | Each calendar and CRM source: last run and last error | |
| `get_overview` | Mailbox health and capacity, sends, replies, bounces, unread replies | |
| `list_mailboxes` | Sending mailboxes with status, daily limit, pool and warm-up placement | |
| `get_mailbox` | One mailbox: status and last error, limits, pool, project, stage, warm-up and sender | |
| `list_supplier_mailboxes` | A connected supplier's mailboxes (such as Cheap Inboxes), with import progress and why any failed | |
| `get_mailbox_warmup` | A mailbox's warm-up results per day for 14 days | |
| `list_domains`, `get_domain` | Sending domains with health, issues and their fixes, DNS and blocklist results, settings and sending stats | |
| `list_sending_servers`, `get_sending_server` | Sending servers (shared SMTP host and IPs, such as an SMTP vendor's box or your own mail server) with IP blocklist results, health, shared limit and sending stats | |
| `get_infrastructure` | Mailboxes by stage (warming, ready, resting, retired), the ones not ready with why and until when, plans in progress | |
| `preview_infra_plan` | Try a goal ("10 domains, 30 mailboxes by the 14th") without saving: names, timeline, capacity, warnings | |
| `list_infra_plans`, `get_infra_plan` | Infrastructure plans, and every domain and mailbox in one with what is left to do | |
| `list_leads` | Search leads by email, name or company | |
| `get_lead` | One lead: fields, custom fields, lists, verification and suppression | |
| `list_lead_lists`, `get_lead_list` | Lead lists with sizes, search settings and the latest build | |
| `list_lead_list_members` | A list's leads with their fit score and reasons, best first | |
| `list_data_providers` | Connected data providers that search, find emails or enrich, and the filters each understands | |
| `list_list_runs`, `get_list_run` | Builds, refreshes and enrichments: found, added, left out by reason, credits spent | |
| `get_lead_sources` | Which data provider a lead came from | |
| `check_recipients` | Ask the send policy whether addresses may be emailed, without sending | |
| `list_suppressions` | Emails and domains that are never emailed | |
| `list_sequences`, `get_sequence` | Sequences with steps and counts | |
| `preview_sequence` | Render every step for one lead, with missing variables | |
| `list_enrollments` | The leads in a sequence and where each one is | |
| `list_messages` | Every send attempt, including ones the policy blocked and why | |
| `list_inbox`, `get_inbox_message` | Replies, and the whole conversation with a lead | |
| `list_webhook_event_types`, `list_webhooks`, `list_webhook_deliveries` | The events webhooks can send; the workspace's webhooks and their health; what was sent to one and how the receiver answered | |
| `list_events` | What happened since the last call: replies, bounces, opt-outs, paused mailboxes, held mission writes. Keep `next_after` and pass it back as `after` | |
| `list_logs`, `get_log` | Every API call in the workspace with status, duration, error code and who made it; filter by level, source, operation, tool and time, or look one up by the `request_id` an error returned. Needs `audit.read`. See [Logs](/docs/api/logs/) | |
| `list_jobs`, `get_job` | Background work (syncs, imports, DNS checks) and how it went; a call that queued work returns `job.id` to follow | |
| `import_supplier_mailboxes` | Import a supplier's mailboxes, named or all, with the same checks as a CSV | Yes |
| `sync_supplier_mailboxes` | Read a supplier account again now | Yes |
| `update_supplier_sync` | Turn automatic import or Google app passwords on or off, or set the daily limit for new imports | Yes |
| `get_sequence_mailboxes` | A sequence's mailboxes and why, sends a day needed versus allocated, and what blocked others | |
| `preview_mailbox_allocation` | Dry run: what the allocator would change now | |
| `get_allocation_attention` | Approvals, suggestions, shortages, follow-ups without a mailbox, unconfirmed senders, sequencer accounts needing a look | |
| `list_platforms` | Connected EmailBison, Instantly and Smartlead accounts: last read, first plan awaiting review, unconfirmed and conflicting mailboxes | |
| `list_allocation_changes` | Mailbox assignment history with reasons | |
| `list_senders`, `list_teams` | Who mailboxes send as, and the teams that own sequences and senders | |
| `use_mission` | Act inside a mission from now on (every call carries it), or stop | |
| `list_missions`, `get_mission` | Missions; check in on one: brief, what changes do now, limits, progress, requests and notes | |
| `list_mission_actions`, `get_mission_action` | Changes held or dry-run in a mission, with decisions and results | |
| `list_mission_calls`, `list_pending_approvals` | Every call in a mission; every change waiting for a person | |
| `create_project` | Start a new motion with its brief | Yes |
| `update_project` | Edit the brief (with `brief_version` so no edit is overwritten), pause, archive or cap daily sends | Yes |
| `add_to_project`, `remove_from_project` | Move domains, mailboxes, lead lists or sequences into a project, or make them shared again | Yes |
| `log_meeting`, `update_meeting` | Log a meeting, or correct its status, qualification or which sequence it counts for | Yes |
| `log_deal`, `update_deal` | Log or update a deal (synced deals keep their CRM fields) | Yes |
| `record_spend`, `delete_spend_entry` | Record a charge in money or units, with a `ref` so retries count once; delete one | Yes |
| `set_spend_rate`, `add_recurring_spend` | Price a unit; add a monthly or yearly cost | Yes |
| `sync_outcomes_now` | Read a calendar or CRM now | Yes |
| `set_warmup` | Turn warm-up on or off, or change its volume and reply rate, for mailboxes, a pool or all | Yes, sends |
| `add_domain` | Track a domain, such as one just bought, and check its DNS | Yes |
| `update_domain` | Pause or resume a domain, cap its daily sends, or set limits on all its mailboxes | Yes |
| `check_domain` | Re-check a domain's DNS and blocklists after a DNS change | Yes |
| `update_sending_server` | Pause or resume a sending server, cap its daily sends, set its IPs, or turn off the automatic blocklist pause | Yes |
| `check_sending_server` | Re-check a server's IPs against blocklists, for example after a delisting request | Yes |
| `create_infra_plan`, `update_infra_plan` | Draft or change a plan for domains and mailboxes; a draft buys nothing | Yes |
| `approve_infra_plan` | Start buying, on the user's own supplier account (needs `infrastructure.approve`) | Yes, spends |
| `mark_domains_bought`, `cancel_infra_plan` | Tell a manual plan its domains are bought; stop a plan | Yes |
| `move_mailboxes` | Move mailboxes between warming, ready, resting and retired, with a reason | Yes |
| `create_lead`, `import_leads_csv` | Add or update leads, one at a time or from CSV | Yes |
| `update_lead` | Change a lead's fields | Yes |
| `update_mailbox` | Pause or resume a mailbox, or change its name, daily limit, minimum gap or pool | Yes |
| `add_leads_to_list`, `remove_lead_from_list` | Put existing leads in a list, or take one out | Yes |
| `delete_lead` | Delete a lead; with `suppress: true` its address also goes on the suppression list (erasure requests) | Yes |
| `add_suppressions` | Never email these emails or domains again | Yes |
| `preview_lead_search` | One page of a people search at a data provider, nothing saved | Yes, provider |
| `create_lead_list`, `update_lead_list` | A manual list, or one built from a search with an email waterfall, fit scores, dedupe and credit caps | Yes, provider |
| `run_lead_list` | Build, refresh or enrich a list, within its caps | Yes, provider |
| `cancel_list_run` | Stop a run; leads already added stay | Yes |
| `create_sequence`, `replace_sequence_steps` | Build a draft sequence and its steps | Yes |
| `update_sequence` | Change settings, or start, pause or archive | Yes, sends |
| `enroll_leads` | Add leads or a list to a sequence | Yes, sends |
| `stop_enrollment` | Stop emailing one lead in a sequence | Yes |
| `mark_inbox_read` | Mark a message read or unread | Yes |
| `reply_to_inbox_message` | Reply now, from the same mailbox and thread | Yes, sends |
| `create_webhook`, `update_webhook`, `delete_webhook` | Send events to a URL (signed, retried); change its events or turn it off; remove it | Yes |
| `test_webhook`, `redeliver_webhook` | Send a test event, or one delivery again, and see the result | Yes |
| `assign_mailboxes`, `release_mailboxes` | Move mailboxes to a sequence or free them; busy ones finish their follow-ups first | Yes |
| `lock_mailboxes` | Keep mailboxes on a sequence or team, or out of automatic allocation | Yes |
| `run_mailbox_allocation` | Allocate now instead of waiting for the next minute | Yes |
| `sync_platform` | Read a sequencer account now instead of within 5 minutes | Yes |
| `review_platform_plan` | Let allocation change a newly connected sequencer account, once the user agrees with its first plan | Yes |
| `decide_allocation_suggestion`, `undo_allocation_change` | Apply or decline a suggestion; undo a change | Yes |
| `create_sender`, `confirm_mailbox_sender` | Add a sender and confirm which mailboxes send as it | Yes |
| `resolve_orphaned_follow_ups` | Cancel, or hand to another mailbox, follow-ups whose mailbox is gone | Yes, sends |
| `plan_mission` | Turn a goal in plain words into a mission waiting for approval; Claude drafts it with the workspace's own key (needs the Claude connector) | Yes |
| `create_mission`, `update_mission`, `submit_mission_plan` | Start a mission (a draft, so changes are dry runs), edit it, send the plan for approval | Yes |
| `post_mission_update`, `request_connector` | Progress and questions; ask a person to connect a tool | Yes |
| `pause_mission`, `stop_mission`, `complete_mission` | Pause, end now, or finish with a report | Yes |
| `approve_mission`, `resume_mission`, `decide_mission_action` | Approver tokens only: start a mission, resume it, approve or reject a held change | Yes, sends |
| `list_connectors` | Services the workspace can connect (verification, sequencers to import from, mailbox suppliers, CRMs, data and more), with the fields each needs | |
| `request_connection`, `get_connection_request` | The usual way to connect anything: a one-time link the user opens to paste a key or sign in, so the agent never sees keys; then its status | Yes |
| `get_oauth_link` | A sign-in link for an OAuth connector | |
| `connect_integration`, `update_integration`, `test_integration`, `disconnect_integration` | Connect with credentials the agent already holds, rename or replace a key, sign in again, or remove an account | Yes |
| `list_integrations` | Connected accounts with status, the account found at sign-in and the last error; never the credentials | |
| `verify_emails` | Verify addresses, a lead list or every lead without a fresh result, with the connected verification service | Yes, *provider* |
| `list_verifications`, `verification_summary` | Verification results, and how many leads are verified, stale or unchecked | |
| `get_verification_settings`, `update_verification_settings` | Which service verifies and what happens to each result | Yes |
| `get_mailbox_health`, `update_mailbox_health_settings` | Every mailbox graded worst first with the fix, and when mailboxes pause automatically | Yes |
| `preview_import`, `start_import`, `get_import` | Bring campaigns, leads and sending accounts over from Instantly or Smartlead: look first, import, check progress | Yes |
| `get_report` | Sends, contacts, bounces, replies, opt-outs and warm-up placement for a period | |
| `list_members`, `triage_inbox_message` | Workspace members; sort, assign, snooze or close a reply | Yes |
| `list_tracking_domains`, `add_tracking_domain`, `check_tracking_domain` | Optional own domain for unsubscribe and click links, verified by CNAME | Yes |
| `list_analytics`, `get_analytics_summary` | Connected website analytics tools, and traffic across all of them for a period | |
| `get_analytics_report` | One tool's traffic, pages, sources, search queries or events report | |
| `get_analytics_changes`, `get_analytics_catalog` | Start here: what changed on each website (headlines, period on period, movers, unusual days, SEO moves, gaps) and what each website can be asked. See [Analytics for agents](/docs/agents/analytics/) | |
| `get_analytics_overview`, `query_analytics_history`, `compare_analytics_tools` | Stored analytics history: every website across tools, history by day, tool or page/query, and one website's tools day by day | |
| `sync_analytics` | Copy analytics tools' latest numbers into Outflare now | Yes |
| `list_analytics_sites`, `set_analytics_site`, `update_analytics_site` | The sites or properties a connected analytics account can read, the default for live reports, and each site's domain and whether it syncs | Yes |
| `list_seo`, `get_seo_history` | DataForSEO and Ahrefs connections with their budget left, and stored weekly SEO snapshots (keywords with their previous position); free | |
| `get_seo_report` | A live SEO report for any domain: overview, keywords, backlinks, competitors or audit. Costs money within the connection's monthly budget (*provider*) | Yes |
| `update_seo_settings`, `sync_seo` | An SEO connection's domains, country, monthly budget and weekly snapshots; take a snapshot now (*provider*) | Yes |
| `list_seo_sites`, `add_seo_site`, `update_seo_site`, `delete_seo_site` | The websites OutflareBot audits: ownership, crawl settings and limits, latest crawl. See [Crawl and audit your sites](/docs/guides/site-audits/) | Yes |
| `verify_seo_site`, `start_crawl`, `get_crawl`, `list_crawls`, `stop_crawl` | Check the DNS record, meta tag or file that proves ownership; crawl a site and follow the crawl | Yes |
| `list_crawl_pages`, `get_crawl_page` | Every URL a crawl found: HTTP status, redirects, noindex, nofollow, robots.txt blocks, title, description, canonical, h1, hreflang, structured data, word count, links in and out | |
| `list_clients`, `use_client`, `create_client` | Agency mode only (`OUTFLARE_AGENCY`): every client with this week's numbers, switch client, add a client | Yes |

The tools that make email go out, the ones that can spend data provider credits (marked *provider*), and `approve_infra_plan`, which spends money, are marked as reaching the outside world in their MCP annotations, so clients that support it can ask you before running them.

A typical run looks like this:

1. `get_project_brief` for the motion it works on
2. `get_overview`
3. `import_leads_csv` into a list
4. `check_recipients`
5. `create_sequence` with the project's `project_id`
6. `preview_sequence` for a real lead
7. `enroll_leads`
8. `update_sequence` with `status: "active"`

## Any agent: the API with scoped tokens <span class="pill shipped">Shipped</span>

Any agent that can make HTTP requests can use Outflare without the MCP server:

1. Create an [API token](/docs/api/authentication/) for the agent with only the scopes it needs.
2. Point the agent at your instance's discovery document and contract:

    ```text
    https://outflare.example.com/.well-known/outflare.json
    https://outflare.example.com/v1/openapi.yaml
    ```

    The OpenAPI file describes every endpoint, parameter and scope, which is enough for an agent framework to generate tools from. The [TypeScript SDK](/docs/sdk/typescript/) is typed from the same file.

3. Read what it did in the audit log, where each action is recorded under the token's name.

For scripts and CI, the [command line client](/docs/agents/cli/) has every API operation as a command.

## Give feedback

If you are building agents for outbound, [open an issue](https://github.com/outflareai/outflare/issues) with the tools you need.
