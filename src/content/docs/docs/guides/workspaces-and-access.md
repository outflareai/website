---
title: Companies and access
description: Companies, members, roles, invites, API tokens and the audit log.
sidebar:
  order: 1
---

<span class="pill shipped">Shipped</span>

## Companies

A company holds everything for one team or client: mailboxes, pools, leads, lists, the suppression list, sequences, sent and received mail, members and tokens. Nothing is shared between companies. Anyone signed in can create a company and becomes its owner.

The API calls a company a workspace: its routes are under `/v1/workspaces/{workspace}` and its rows carry `workspace_id`.

### Company URL

Each company has a short name for its URL, made from its name when it is created: a company called Acme opens at `https://app.outflare.ai/acme`, and each page follows it, such as `/acme/members`, or `/acme/summitly/outreach/sequences` for a page of the brand Summitly. Owners and admins can rename the company and change its URL under **Settings → General**. The URL can use 3 to 40 lowercase letters, numbers and dashes, and a few words the app needs for its own pages (such as `admin`, `signup` and `settings`) are taken.

Changing the URL doesn't break links: the old one keeps leading to the company until another company takes it. Links from before company URLs existed (`/w/<workspace id>/...`) still work and switch to the new address.

Sequences, lead lists, missions, sending servers, infrastructure plans, API tokens and webhooks get readable URLs too, made from their names: `/acme/summitly/outreach/sequences/q3-founders`. Two with the same name become `q3-founders` and `q3-founders-2`. Renaming one gives it a new URL, and its old URL still opens it, so shared links keep working.

A connection's URL is named after what it connects, not what you called it: `/acme/summitly/connectors/posthog`, and `posthog-2` for a second PostHog account. The same URL opens the dialog to connect PostHog when nothing is connected yet, so you can share one link for "connect PostHog" or "our PostHog".

### A link to any screen

Every screen has a link of its own, so you can send a teammate the link instead of "open this page, then click that tab". Copy it from the address bar: whoever opens it, and may see that screen, lands on exactly the same page, tab, item and layout, on the same brand.

A link reads from big to small: the company, the brand, the area, the page, then what is open on it.

| Link | Screen |
| --- | --- |
| `/acme/summitly/crm/people` | The People list |
| `/acme/summitly/crm/people/{id}/activity` | One person, on the Activity tab |
| `/acme/summitly/tracker/campaigns` | The Tracker's Campaigns page |
| `/acme/summitly/seo/declining` | The SEO overview's Declining view |
| `/acme/summitly/partners/{id}/payouts` | One partner, on the Payouts tab |
| `/acme/summitly/company/brand/table` | Brands, as a table instead of cards |
| `/acme/members` | Members, which belongs to the whole company |

- **Tabs and layouts are part of the link.** A tab, a tab inside an item, and a layout such as list or gallery, board or table, each add a word to the link. The first tab of a page has no word.
- **Searching and sorting a list are in the link too**, after a `?`: `?search=acme&order=-revenue` is the list searched for "acme", biggest revenue first. The link without them opens the same screen, unfiltered.
- **Switching tabs is instant.** The address changes without loading a page, and Back and Forward step through the tabs you opened.
- **Old links keep working.** A link from before a page moved (`/acme/summitly/tracker-campaigns`, or one ending in `?view=` or `#ideas`) opens the same screen and switches to today's address.

## Roles

Each member has one role in each company, and the role decides what they can do. Every company starts with four:

| Role | What it's for |
| --- | --- |
| **Owner** | Everything, including removing people and managing owners. Fixed: it can't be changed. |
| **Admin** | Everything except removing people or reducing their access. The role for your own team. |
| **Member** | All the marketing work, and connecting tools. No settings, people, API tokens or audit log. Stored and sent in the API as `operator`. |
| **Viewer** | Sees everything, changes nothing. |

Change what Admin, Member or Viewer allows, or add roles of your own (a "Content writer" with only SEO and Social, say), under **Settings → Members → Roles**. Each role opens on its own page, with a level for each area: **None**, **View** or **Edit**. Open an area to see the single permissions inside it and switch them one by one (the level then shows **Custom**). Edit gives reading and changing only: actions that need their own say, such as sending email, posting to social accounts, approving missions and spending or removing ads, are separate switches inside the area, so picking Edit never hands out an approval. The **Company** card holds settings, the unsubscribe list, shared fields, webhooks, API tokens and the audit log; **People and access** holds inviting people, adding people to teams, editing teams, editing roles, removing people and resetting two-factor. Save applies the whole page at once. A changed starting role can be reset to its defaults.

- **You can't give what you don't have.** Every permission in a role you create or edit, or a role you give someone, must be one you hold.
- **You can't change someone who can do more than you.** Only owners make, change or remove owners, and a company always keeps at least one.
- **People permissions are separate.** **Add people to teams** (`teams.members`) puts people in a team or takes them out; **Edit teams** (`teams.manage`) also creates, renames and deletes teams and changes what they allow; **Reset someone's two-factor** (`members.two_factor`) is owners only by default. Roles that could invite people before can still edit teams, and roles that could remove people can still reset two-factor.
- **Taking access away is its own permission.** Removing someone, moving them to a role that can do less, or taking brands away from them needs **Remove people** (`members.remove`). Only owners have it by default; an owner can switch it on for any role.
- **Changes apply at once**, and API tokens a person made lose the permissions their role no longer has. Every change is in the audit log (`role.created`, `role.updated`, `role.deleted`, `member.role_changed`).
- **Deleting a role in use** asks where its people and pending invites should move.
- **Anyone can leave** a company under Settings → Members, except its last owner.

API tokens never hold more than the person who made them, and never `members.remove` or `roles.manage`. Connected AI apps never get people, roles, tokens, company settings or approvals, whatever the role allows.

In the API: `GET /v1/workspaces/{ws}/roles` lists the roles with their scopes (MCP: `list_roles`); `POST /roles`, `PATCH /roles/{role}` and `DELETE /roles/{role}` (`?move_to=` when it's in use) need `roles.manage`. Members and invites take `role` (a starting role) or `role_id` (one of the company's own roles).

### A different role on one brand

A person has one role in the company, and can be on another role for single brands: a Viewer of the company who is a Member on Summitly, or a Member who only views one brand. Open the person under **Settings → Members** (Edit), untick "Same role on every brand" and pick a role for each brand, or "No access".

- On that brand, the brand's role decides what they can do. On every other brand their company role applies.
- What belongs to the company and not to a brand (connections, mailboxes, settings) always follows the company role.
- Only a role without workspace-wide permissions (settings, people, roles, API tokens or the audit log) can be a brand's role, and only for a person whose own role has none: an owner or admin is the same on every brand.
- The rules above apply on each brand: you can't give what you don't have, and lowering someone on a brand needs **Remove people**.
- API tokens a person made never do more on a brand than their role there allows.
- Every change is in the audit log (`member.brand_roles_changed`).

In the API: `PATCH /v1/workspaces/{ws}/members/{user}` takes `brand_roles` (`[{"brand_id": "summitly", "role": "operator"}]`), which replaces the person's roles on single brands; an empty list clears them. `GET /members` returns each member's `brand_roles`, and `GET /v1/workspaces/{ws}` returns your own, with the `scopes` each gives you on its brand.

### Teams

A team gives a group of people the same access, set up once. Under **Settings → Members**, in **Teams**, open a team (or make one), pick the role it carries on each brand, or one role on every brand, and add people. An agency that only works on Summitly's ads is a team with one role on one brand.

- Everyone in a team may do what the team's roles allow, on top of their own role. Someone in several teams gets everything those teams allow.
- A team can open a brand to someone who isn't on that brand themselves.
- Taking someone out of a team, or a role off the team, takes that access away straight away.
- A team's role is one without workspace-wide permissions (settings, people, roles, API tokens or the audit log), and it counts for people whose own role has none: an owner or admin already does everything on every brand.
- What belongs to the company and not to a brand always follows the person's own company role.
- You can't give a team more than you may do yourself. Taking a role off a team with people in it, taking people out of a team that carries a role, or deleting such a team needs **Remove people**.
- A role a team carries can't gain workspace-wide permissions or be deleted until the team changes.
- API tokens are made from their maker's own role: a team never lets a token do more.
- Every change is in the audit log (`team.access_changed`).

In the API a team has `role` (every brand) and `brand_roles` (`GET` and `POST /v1/workspaces/{ws}/teams`, `PATCH /v1/workspaces/{ws}/teams/{id}`), and `GET /v1/workspaces/{ws}` lists what you may do on each brand in `brand_access`.

### Module access

Roles say what someone may do. Module access says which whole parts of Outflare they can get into at all. Under **Settings → Members**, in **Module access**, an owner sets each module (Customers, Growth, Support, Analytics, Agents, Finances, People, Goals) to one of three:

- **Everyone whose role allows it.** The default: each person's role decides.
- **Only owners.** The module is gone for everyone else: out of their menu and pages, and out of reach of the API tokens and agents they made, whatever their role says.
- **Only the roles and teams I pick.** Owners, plus the roles and teams you choose, each to **View** or to **Edit**. View reads the module; Edit also changes things in it.

Finances and People start as owners only and can't be opened to everyone: you open them to the roles and teams you choose, without making anyone an owner. For example, a Finance team can view Finances while everyone else never sees it.

A change applies straight away. Owners always get into every module, and only an owner, signed in, changes module access. Every change is in the audit log (`module.access_changed`).

In the API, `GET /v1/workspaces/{ws}/module-access` lists each module with its `access` (`everyone`, `owners` or `chosen`) and `grants`, and `PUT /v1/workspaces/{ws}/module-access/{module}` sets one.

## Invites

Admins and owners invite people by email from **Settings → Members**, picking any role they could give themselves (Admin by default; only owners invite owners). For a role without workspace-wide permissions, you can also keep the person to some brands. **Send invite** emails them a link to join, through the instance's account email service, and shows you the link once so you can share it another way too (an instance with no email service only shows it). The link starts with `ofi_`, works once and expires after 7 days. A new invite to the same address replaces a pending one, and someone already in the company can't be invited again. Pending invites can be revoked. Invite links use your instance's `PUBLIC_URL`, so set it when you run behind a domain.

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

### Two-factor sign-in

Under **Your account**, anyone can turn on two-factor sign-in: scan the QR code with an authenticator app (1Password, Google Authenticator, Authy or any app that makes 6-digit codes), type the code it shows, and save the 10 backup codes. From then on, signing in with a password or with Google asks for a code from the app. A backup code works once in its place, for when the phone is lost; **New backup codes** replaces the whole set.

- **Remember this device for 7 days** on the code screen skips the code on that browser for a week. **Forget remembered devices** under Your account ends that everywhere, and so does turning two-factor off.
- A [passkey](#passkeys) is a second step already, so a passkey sign-in asks for no code.
- Ten wrong codes in 15 minutes are refused until the window passes (`429` with `Retry-After`).
- API tokens, MCP and connected agents are not asked for a code: they never sign in with a password.

**Required for everyone.** A company can require two-factor: people without it see the set-up screen before anything else in that company. An owner switches the rule under **Settings → General** (`require_two_factor` on `PATCH /v1/workspaces/{workspace}`, signed-in owners only). It is on unless an owner turns it off; a self-hosted server changes the default for companies that haven't chosen with `REQUIRE_TWO_FACTOR=false` ([Configuration](/docs/self-hosting/configuration/)).

**A lost phone.** **Settings → Members** shows who has two-factor on. Someone with **Reset someone's two-factor** (owners by default) can **Reset two-factor** for a member, who then sets it up again at their next sign-in. The reset only works when they own every company the member belongs to, so one company can't weaken someone's sign-in for another.

`GET /v1/me` shows `two_factor` and `two_factor_verified`; a session that still owes its code gets `401` with the code `two_factor_required` on every route until `POST /v1/auth/two-factor` succeeds.

### Confirming your email and resetting your password

People who set a password get an email asking them to confirm their address; until they do, a banner offers to send the link again (`POST /v1/me/email-verification`). Each person gets at most one link a minute, five an hour and ten a day; the button counts down until the next one is allowed (`email_resend_after` on `GET /v1/me`). Google sign-ins are confirmed already. `GET /v1/me` shows `email_verified` and `has_password`.

**Forgot your password?** on the sign-in page emails a link that works for an hour (`POST /v1/auth/password-reset`, which answers the same whether or not the address has an account). Setting a new password from it (`POST /v1/auth/password-reset/confirm`) signs the person out everywhere else and confirms their email. People who only use Google can set a password the same way from **Your account**. Requests are rate limited per address and per IP.

These emails go through Postmark, Resend or Cloudflare Email Service (`EMAIL_FROM` with `POSTMARK_SERVER_TOKEN`, `RESEND_API_KEY`, or `CLOUDFLARE_EMAIL_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`), never through your sending mailboxes. Without one, each link is written to the server log, which is fine on your own machine; `account_email` in `GET /v1/meta` shows which is in use.

## API tokens

Scripts, integrations and agents use API tokens instead of a person's session. To connect Claude, ChatGPT or Cursor, use [Connect your AI](/docs/agents/connect/) instead: the app signs in, and its connection isn't listed under API tokens.

Under **Settings → API tokens**, **New token** asks for a name, what it can do (**Read only**, **Can make changes**, or **Choose** to set each area to No, See or Change), anything riskier under **Also allow** (spending, approving missions, the suppression list, people, tokens, company settings), and when it expires (90 days unless you choose otherwise). The list shows who created each token, what it can do, and when it was last used and expires; a token made by another token or an agent, or by someone whose account was deleted, shows **Unknown** under **Created by**. Click a token later to rename it, change what it may do or its sending limits, or revoke it. A change applies on the token's next request. A token:

- belongs to one company,
- holds an explicit list of scopes, which can never exceed the scopes of the person who created it,
- can expire after 1 to 3650 days, or never,
- starts with `oft_` so a leaked one is easy to recognise, and is shown only once. Only a hash is stored.

The scopes are:

| Scope | Allows |
| --- | --- |
| `workspace.read` | Read the company. |
| `workspace.manage` | Rename the company and change its URL (slug). Owners and admins only by default. |
| `members.read` | List members. |
| `members.manage` | Change roles and manage invites. |
| `members.remove` | Remove members or reduce their access. Owners only by default; never on an API token. |
| `roles.manage` | Create, change and delete roles. Never on an API token. |
| `teams.members` | Add people to teams and take them out. |
| `teams.manage` | Create, change and delete teams, and add people to them. |
| `members.two_factor` | Reset a member's two-factor. Owners only by default; never on an API token. |
| `tokens.manage` | Create and revoke API tokens. |
| `audit.read` | Read the audit log. |
| `mailboxes.read` | List mailboxes, pools and sending-domain health. |
| `mailboxes.manage` | Import, add, change, pause, verify, test-send and remove mailboxes and pools. |
| `leads.read` | List and search leads, lists and the suppression list; run the recipient check. |
| `leads.manage` | Import, add, change and delete leads and lists; add to the suppression list. |
| `suppressions.manage` | Remove entries from the suppression list. Owners and admins only by default. |
| `sequences.read` | List sequences, their leads and the message log; preview a sequence for a lead. |
| `sequences.manage` | Create, change, activate, pause and delete sequences; add and stop leads. |
| `inbox.read` | Read the inbox: replies to outreach. |
| `inbox.manage` | Mark messages read and reply from the inbox. |
| `support.read` | Read Support: conversations with customers, its reports and settings. |
| `support.manage` | Reply to customers, assign and close conversations, and change Support's settings. |
| `integrations.read` | List connectors and their status. |
| `integrations.manage` | Connect, change and disconnect connectors, which means handling their API keys. |
| `outcomes.read` | Read meetings, deals, spend and cost reports; export them. |
| `outcomes.manage` | Log and correct meetings, deals and spend; set unit prices and recurring costs; sync now. |
| `profiles.read` | Read [ideal customer profiles](/docs/guides/ideal-customers/). |
| `infrastructure.read` | See infrastructure plans and mailbox stages; preview a plan. |
| `infrastructure.manage` | Draft, change and cancel plans; move mailboxes between stages. |
| `infrastructure.approve` | Approve a plan, which buys domains and mailboxes on your accounts. Owners and admins only by default. |
| `profiles.manage` | Create and change ideal customer profiles; move records between brands (with each record's own manage scope). |
| `analytics.read` | Read reports from connected analytics and SEO tools. |
| `missions.read` | List missions and read their context, calls, held changes and updates. |
| `missions.run` | Create and change missions, submit a plan, post updates and connector requests, pause, stop and complete. What an agent needs. |
| `missions.approve` | Approve a mission's plan, resume it, and approve or reject held changes. Never give this to the agent that runs the mission. |
| `seo.read` | See [SEO sites](/docs/guides/site-audits/), their crawls and the pages they found. |
| `seo.manage` | Add and change SEO sites, check that you own them, and start or stop crawls. Operators have it. |
| `webhooks.read` | List [webhooks](/docs/api/webhooks/) and their deliveries. |
| `webhooks.manage` | Add, change, test and remove webhooks, and see and rotate their signing secrets. Owners and admins only by default, since webhooks receive company data. |

Give each agent its own token with only the scopes it needs, so its actions are attributed to it in the audit log and you can revoke it on its own.

## Audit log

Every significant change writes an audit event in the same transaction as the change: member role changes, invites, tokens created and revoked, mailbox imports and more. Each event records the actor (a person or a token, by name), the action such as `member.role_changed`, the target and the request ID. Read it under **Audit log** or with `GET /v1/workspaces/{ws}/audit-events` (scope `audit.read`).
