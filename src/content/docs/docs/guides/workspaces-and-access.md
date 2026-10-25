---
title: Workspaces and access
description: Workspaces, members, roles, invites, API tokens and the audit log.
sidebar:
  order: 1
---

<span class="pill shipped">Shipped</span>

## Workspaces

A workspace holds everything for one team or client: mailboxes, pools, leads, lists, the suppression list, sequences, sent and received mail, members and tokens. Nothing is shared between workspaces. Agencies typically create one workspace per client. Anyone signed in can create a workspace and becomes its owner.

## Roles

Each member has one role in each workspace. Roles grant scopes, and every API endpoint states the scope it needs.

| Role | Can do |
| --- | --- |
| `owner` | Everything, including managing admins. |
| `admin` | Everything: members, invites, API tokens, the audit log, mailboxes, leads, the suppression list and sequences. Cannot act on an owner. |
| `operator` | Read the workspace and members; read and manage projects, missions, mailboxes, leads, sequences and the inbox; add to (but not remove from) the suppression list. |
| `viewer` | Read the workspace, members, projects, missions, mailboxes, leads, the suppression list, sequences, messages and the inbox. |

Managers cannot change or remove someone ranked above them (owner, then admin, then operator, then viewer).

## Invites

Admins and owners invite people by email from **Members**, choosing `admin`, `operator` or `viewer`. The invite link starts with `ofi_` and expires. Pending invites can be revoked. Invite links use your instance's `PUBLIC_URL`, so set it when you run behind a domain.

## Signing in

People sign in with email and password and get a session cookie (`outflare_session`). Ten failed attempts for one email lock it for 15 minutes.

### Sign in with Google

When the instance has a Google OAuth app (`GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_CLIENT_SECRET`, the same app used for Gmail mailboxes), the sign-in and invite pages show **Continue with Google**. `GET /v1/meta` lists `google` under `login_methods`.

Google sign-in never creates an account on its own:

- A Google account whose verified email matches an existing person signs them in and is linked to them, so later sign-ins match by Google account even if the email changes.
- A Google account nobody uses goes back to the sign-in page with a message to ask for an invite.
- An invite can be accepted with Google instead of a password, as long as the Google email is the invited address. Accounts made this way have no password and sign in with Google from then on.
- Google emails that aren't verified are refused.

Add `$PUBLIC_URL/v1/auth/google/callback` to the OAuth app's authorised redirect URIs, next to the mailbox one. The app only asks for `openid email profile` at sign-in; mailbox access is still asked for separately when you connect a mailbox.

### Passkeys

Under **Your account** (the menu under your name), anyone can add a passkey: Face ID, Touch ID, Windows Hello, a phone or a security key. The sign-in page then shows **Sign in with a passkey**, which signs them in without typing an email. Each person can have up to 10, and can rename or remove them. Passkeys synced by iCloud Keychain or Google Password Manager are marked **synced**, the rest **this device only**.

A passkey belongs to one web address, so passkeys turn on by themselves once `PUBLIC_URL` is an `https://` address (`login_methods` in `GET /v1/meta` then includes `passkey`), and stop working if that address changes. `PASSKEYS=off` turns them off. See [Configuration](/docs/self-hosting/configuration/).

### Confirming your email and resetting your password

People who set a password get an email asking them to confirm their address; until they do, a banner offers to send the link again (`POST /v1/me/email-verification`). Google sign-ins are confirmed already. `GET /v1/me` shows `email_verified` and `has_password`.

**Forgot your password?** on the sign-in page emails a link that works for an hour (`POST /v1/auth/password-reset`, which answers the same whether or not the address has an account). Setting a new password from it (`POST /v1/auth/password-reset/confirm`) signs the person out everywhere else and confirms their email. People who only use Google can set a password the same way from **Your account**. Requests are rate limited per address and per IP.

These emails go through Postmark, Resend or Cloudflare Email Service (`EMAIL_FROM` with `POSTMARK_SERVER_TOKEN`, `RESEND_API_KEY`, or `CLOUDFLARE_EMAIL_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`), never through your sending mailboxes. Without one, each link is written to the server log, which is fine on your own machine; `account_email` in `GET /v1/meta` shows which is in use.

## API tokens

Scripts, integrations and agents use API tokens instead of a person's session. A token:

- belongs to one workspace,
- holds an explicit list of scopes, which can never exceed the scopes of the person who created it,
- can expire after 1 to 3650 days, or never,
- starts with `oft_` so a leaked one is easy to recognise, and is shown only once. Only a hash is stored.

The scopes are:

| Scope | Allows |
| --- | --- |
| `workspace.read` | Read the workspace. |
| `members.read` | List members. |
| `members.manage` | Change roles, remove members, manage invites. |
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
| `outcomes.read` | Read meetings, deals, spend and cost reports; export them. |
| `outcomes.manage` | Log and correct meetings, deals and spend; set unit prices and recurring costs; sync now. |
| `projects.read` | List projects and read their briefs. |
| `infrastructure.read` | See infrastructure plans and mailbox stages; preview a plan. |
| `infrastructure.manage` | Draft, change and cancel plans; move mailboxes between stages. |
| `infrastructure.approve` | Approve a plan, which buys domains and mailboxes on your accounts. Owners and admins only by default. |
| `projects.manage` | Create, change, pause and delete projects; move records in and out (with each record's own manage scope). |
| `missions.read` | List missions and read their brief, calls, held changes and updates. |
| `missions.run` | Create and change missions, submit a plan, post updates and connector requests, pause, stop and complete. What an agent needs. |
| `missions.approve` | Approve a mission's plan, resume it, and approve or reject held changes. Never give this to the agent that runs the mission. |

Give each agent its own token with only the scopes it needs, so its actions are attributed to it in the audit log and you can revoke it on its own.

## Audit log

Every significant change writes an audit event in the same transaction as the change: member role changes, invites, tokens created and revoked, mailbox imports and more. Each event records the actor (a person or a token, by name), the action such as `member.role_changed`, the target and the request ID. Read it under **Audit log** or with `GET /v1/workspaces/{ws}/audit-events` (scope `audit.read`).
