---
title: Workspaces and access
description: Workspaces, members, roles, invites, API tokens and the audit log.
sidebar:
  order: 1
---

<span class="pill shipped">Shipped</span>

## Workspaces

A workspace holds everything for one team or client: mailboxes, pools, leads, lists, the suppression list, sequences, sent and received mail, members and tokens. Nothing is shared between workspaces. Agencies typically create one workspace per client. Anyone signed in can create a workspace and becomes its owner.

### Workspace URL

Each workspace has a short name for its URL, made from its name when it is created: a workspace called Geonode opens at `https://app.outflare.ai/geonode`, and each page follows it, such as `/geonode/connectors` or `/geonode/sequences`. Owners and admins can rename the workspace and change its URL under **Settings → General**. The URL can use 3 to 40 lowercase letters, numbers and dashes, and a few words the app needs for its own pages (such as `admin`, `signup` and `settings`) are taken.

Changing the URL doesn't break links: the old one keeps leading to the workspace until another workspace takes it. Links from before workspace URLs existed (`/w/<workspace id>/...`) still work and switch to the new address.

Sequences, projects, lead lists, missions, sending servers, infrastructure plans, API tokens and webhooks get readable URLs too, made from their names: `/geonode/sequences/q3-founders`, `/geonode/projects/fintech-au`. Two with the same name become `q3-founders` and `q3-founders-2`. Renaming one gives it a new URL, and its old URL still opens it, so shared links keep working.

A connection's URL is named after what it connects, not what you called it: `/geonode/connectors/posthog`, and `posthog-2` for a second PostHog account. The same URL opens the dialog to connect PostHog when nothing is connected yet, so you can share one link for "connect PostHog" or "our PostHog".

## Roles

Each member has one role in each workspace, and the role decides what they can do. Every workspace starts with four:

| Role | What it's for |
| --- | --- |
| **Owner** | Everything, including removing people and managing owners. Fixed: it can't be changed. |
| **Admin** | Everything except removing people or reducing their access. The role for your own team. |
| **Member** | All the marketing work, and connecting tools. No settings, people, API tokens or audit log. Stored and sent in the API as `operator`. |
| **Viewer** | Sees everything, changes nothing. |

Change what Admin, Member or Viewer allows, or add roles of your own (a "Content writer" with only SEO and Social, say), under **Settings → Members → Roles**. Each role is a list of areas set to None, View or Edit, plus switches for actions that need their own say: sending email, posting to social accounts, approving missions and spending, the unsubscribe list, shared fields, webhooks, settings, API tokens, the audit log, inviting people, removing people and editing roles. A changed starting role can be reset to its defaults.

- **You can't give what you don't have.** Every permission in a role you create or edit, or a role you give someone, must be one you hold.
- **You can't change someone who can do more than you.** Only owners make, change or remove owners, and a workspace always keeps at least one.
- **Taking access away is its own permission.** Removing someone, moving them to a role that can do less, or taking brands away from them needs **Remove people** (`members.remove`). Only owners have it by default; an owner can switch it on for any role.
- **Changes apply at once**, and API tokens a person made lose the permissions their role no longer has. Every change is in the audit log (`role.created`, `role.updated`, `role.deleted`, `member.role_changed`).
- **Deleting a role in use** asks where its people and pending invites should move.
- **Anyone can leave** a workspace under Settings → Members, except its last owner.

API tokens never hold more than the person who made them, and never `members.remove` or `roles.manage`. Connected AI apps never get people, roles, tokens, workspace settings or approvals, whatever the role allows.

In the API: `GET /v1/workspaces/{ws}/roles` lists the roles with their scopes (MCP: `list_roles`); `POST /roles`, `PATCH /roles/{role}` and `DELETE /roles/{role}` (`?move_to=` when it's in use) need `roles.manage`. Members and invites take `role` (a starting role) or `role_id` (one of the workspace's own roles).

## Invites

Admins and owners invite people by email from **Settings → Members**, picking any role they could give themselves (Admin by default; only owners invite owners). For a role without workspace-wide permissions, you can also keep the person to some brands. The invite link starts with `ofi_` and expires. Pending invites can be revoked. Invite links use your instance's `PUBLIC_URL`, so set it when you run behind a domain.

## Signing in

People sign in with email and password and get a session cookie (`outflare_session`). Ten failed attempts for one email, or 100 from one network, in 15 minutes are refused until the window passes (`429` with `Retry-After`).

### Sign in with Google

When the instance has a Google OAuth app (`GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_CLIENT_SECRET`, the same app used for Gmail mailboxes), the sign-in and invite pages show **Continue with Google**. `GET /v1/meta` lists `google` under `login_methods`.

Google sign-in never creates an account on its own:

- A Google account whose verified email matches an existing person signs them in and is linked to them, so later sign-ins match by Google account even if the email changes. If nobody had confirmed that person's email yet, the password, passkeys, sessions and API tokens made before are removed, since whoever made them may not own the address; a reset link sets a new password.
- A Google account nobody uses goes back to the sign-in page with a message to ask for an invite.
- An invite can be accepted with Google instead of a password, as long as the Google email is the invited address. Accounts made this way have no password and sign in with Google from then on.
- Google emails that aren't verified are refused.

Add `$PUBLIC_URL/v1/auth/google/callback` to the OAuth app's authorised redirect URIs, next to the mailbox one. The app only asks for `openid email profile` at sign-in; mailbox access is still asked for separately when you connect a mailbox.

### Passkeys

Under **Your account** (the menu under your name), anyone can add a passkey: Face ID, Touch ID, Windows Hello, a phone or a security key. The sign-in page then shows **Sign in with a passkey**, which signs them in without typing an email. Each person can have up to 10, and can rename or remove them. Passkeys synced by iCloud Keychain or Google Password Manager are marked **synced**, the rest **this device only**.

A passkey belongs to one web address, so passkeys turn on by themselves once `PUBLIC_URL` is an `https://` address (`login_methods` in `GET /v1/meta` then includes `passkey`), and stop working if that address changes. `PASSKEYS=off` turns them off. See [Configuration](/docs/self-hosting/configuration/).

### Confirming your email and resetting your password

People who set a password get an email asking them to confirm their address; until they do, a banner offers to send the link again (`POST /v1/me/email-verification`). Each person gets at most one link a minute, five an hour and ten a day; the button counts down until the next one is allowed (`email_resend_after` on `GET /v1/me`). Google sign-ins are confirmed already. `GET /v1/me` shows `email_verified` and `has_password`.

**Forgot your password?** on the sign-in page emails a link that works for an hour (`POST /v1/auth/password-reset`, which answers the same whether or not the address has an account). Setting a new password from it (`POST /v1/auth/password-reset/confirm`) signs the person out everywhere else and confirms their email. People who only use Google can set a password the same way from **Your account**. Requests are rate limited per address and per IP.

These emails go through Postmark, Resend or Cloudflare Email Service (`EMAIL_FROM` with `POSTMARK_SERVER_TOKEN`, `RESEND_API_KEY`, or `CLOUDFLARE_EMAIL_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`), never through your sending mailboxes. Without one, each link is written to the server log, which is fine on your own machine; `account_email` in `GET /v1/meta` shows which is in use.

## API tokens

Scripts, integrations and agents use API tokens instead of a person's session. To connect Claude, ChatGPT or Cursor, use [Connect your AI](/docs/agents/connect/) instead: the app signs in, and its connection isn't listed under API tokens.

Under **Settings → API tokens**, **New token** asks for a name, what it can do (**Read only**, **Can make changes**, or **Choose** to set each area to No, See or Change), anything riskier under **Also allow** (spending, approving missions, the suppression list, people, tokens, workspace settings), and when it expires (90 days unless you choose otherwise). Click a token later to rename it, change what it may do or its sending limits, or revoke it. A change applies on the token's next request. A token:

- belongs to one workspace,
- holds an explicit list of scopes, which can never exceed the scopes of the person who created it,
- can expire after 1 to 3650 days, or never,
- starts with `oft_` so a leaked one is easy to recognise, and is shown only once. Only a hash is stored.

The scopes are:

| Scope | Allows |
| --- | --- |
| `workspace.read` | Read the workspace. |
| `workspace.manage` | Rename the workspace and change its URL (slug). Owners and admins only by default. |
| `members.read` | List members. |
| `members.manage` | Change roles and manage invites. |
| `members.remove` | Remove members or reduce their access. Owners only by default; never on an API token. |
| `roles.manage` | Create, change and delete roles. Never on an API token. |
| `tokens.manage` | Create and revoke API tokens. |
| `audit.read` | Read the audit log. |
| `mailboxes.read` | List mailboxes, pools and sending-domain health. |
| `mailboxes.manage` | Import, add, change, pause, verify, test-send and remove mailboxes and pools. |
| `leads.read` | List and search leads, lists and the suppression list; run the recipient check. |
| `leads.manage` | Import, add, change and delete leads and lists; add to the suppression list. |
| `suppressions.manage` | Remove entries from the suppression list. Owners and admins only by default. |
| `sequences.read` | List sequences, their leads and the message log; preview a sequence for a lead. |
| `sequences.manage` | Create, change, activate, pause and delete sequences; add and stop leads. |
| `inbox.read` | Read the inbox and conversations. |
| `inbox.manage` | Mark messages read and reply from the inbox. |
| `integrations.read` | List connectors and their status. |
| `integrations.manage` | Connect, change and disconnect connectors, which means handling their API keys. |
| `outcomes.read` | Read meetings, deals, spend and cost reports; export them. |
| `outcomes.manage` | Log and correct meetings, deals and spend; set unit prices and recurring costs; sync now. |
| `projects.read` | List projects and read their briefs. |
| `infrastructure.read` | See infrastructure plans and mailbox stages; preview a plan. |
| `infrastructure.manage` | Draft, change and cancel plans; move mailboxes between stages. |
| `infrastructure.approve` | Approve a plan, which buys domains and mailboxes on your accounts. Owners and admins only by default. |
| `projects.manage` | Create, change, pause and delete projects; move records in and out (with each record's own manage scope). |
| `analytics.read` | Read reports from connected analytics and SEO tools. |
| `missions.read` | List missions and read their brief, calls, held changes and updates. |
| `missions.run` | Create and change missions, submit a plan, post updates and connector requests, pause, stop and complete. What an agent needs. |
| `missions.approve` | Approve a mission's plan, resume it, and approve or reject held changes. Never give this to the agent that runs the mission. |
| `seo.read` | See [SEO sites](/docs/guides/site-audits/), their crawls and the pages they found. |
| `seo.manage` | Add and change SEO sites, check that you own them, and start or stop crawls. Operators have it. |
| `webhooks.read` | List [webhooks](/docs/api/webhooks/) and their deliveries. |
| `webhooks.manage` | Add, change, test and remove webhooks, and see and rotate their signing secrets. Owners and admins only by default, since webhooks receive workspace data. |

Give each agent its own token with only the scopes it needs, so its actions are attributed to it in the audit log and you can revoke it on its own.

## Audit log

Every significant change writes an audit event in the same transaction as the change: member role changes, invites, tokens created and revoked, mailbox imports and more. Each event records the actor (a person or a token, by name), the action such as `member.role_changed`, the target and the request ID. Read it under **Audit log** or with `GET /v1/workspaces/{ws}/audit-events` (scope `audit.read`).
