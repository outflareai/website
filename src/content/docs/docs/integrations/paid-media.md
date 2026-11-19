---
title: Paid media
description: Read spend, clicks and platform conversions from every ad network you connect, per brand, send your own conversions back, and act on suggestions, tests, targeting and new ads, with your own ad accounts.
sidebar:
  order: 5
---

<span class="pill shipped">Shipped</span> Untested against live accounts so far; tell us in an issue if a platform misbehaves.

Outflare reads what your ad accounts spend and what the platforms say it
brought in, so a person, a script or an agent can ask "what did ads cost this
month, per brand, and what did they return?" without opening six dashboards.
It can also send conversions back: when someone the ads brought signs up or
pays, the platform hears about it, so its bidding learns from real results.
And it manages what runs: a person, or an agent within the grants a person
set, pauses and resumes a campaign and sets its daily budget ("Managing
campaigns" below). That is all it changes: it never creates campaigns, ads,
audiences or creative, and never changes bids or targeting.

Every connection is the workspace's own: it signs in to its own ad accounts and,
where the platform needs one, adds its own developer token. Outflare never
provides an ad account, an API token or a developer token, and an ad platform
stays off until the workspace connects it.

Google Ads no longer takes a developer token (Google retired them on
9 September 2026, and ignores one sent anyway). Its API access level now
belongs to the Google Cloud project of the server's Google sign-in app
(`GOOGLE_OAUTH_CLIENT_ID`, or `CONNECTOR_GOOGLE_ADS_CLIENT_ID`), so whoever
runs the server applies for it once, for every workspace: in the Google Cloud
console, open that project, then the Google Ads API, and apply for Basic
access (it needs a project whose branding Google verified). The data stays the
workspace's own: each one signs in to its own Google Ads accounts. A token a
workspace added before is still sent and does no harm.

## Platforms

| Platform | Connect with | Also needs |
| --- | --- | --- |
| Google Ads (`google_ads`) | Sign in with Google (read-only Google Ads access). Manager accounts list the accounts under them. | Nothing: Google retired developer tokens in September 2026 (see below). |
| Meta Ads (`meta_ads`) | A system user access token from your own Business Manager with `ads_read` (and `ads_management` for journeys to fill audiences), or sign in with Facebook | Nothing |
| Microsoft Advertising (`microsoft_ads`) | Sign in with Microsoft | The workspace's own developer token, from the Microsoft Advertising Developer Portal. |
| Reddit Ads (`reddit_ads`) | Sign in with Reddit, with read and edit access to ads, so Outflare can pause campaigns and set budgets when a person approves it. A connection made before edit access was asked for keeps reading; connect it again to manage campaigns. To send conversions back, add your pixel ID and a Conversions API token on the connection. | Nothing |
| X Ads (`x_ads`) | Your own X developer app's API key and secret, then **Sign in to X** on the connection (Paid ads, Accounts) with the account that runs the ads. Before you sign in, set the app's permissions to Read and write, so Outflare can pause campaigns and set budgets, and add `https://app.outflare.ai/v1/integrations/oauth/callback` (or your own server's address) to the app's callback URLs. An access token and secret made in X's developer portal still work instead. To send conversions back, add your pixel ID and conversion event IDs (`Sign-up = o8z2x, Purchase = o8z2y`) on the connection. | Ads API access approved for that app by X |
| LinkedIn Ads (`linkedin_ads`) | Sign in with LinkedIn (`r_ads`, `r_ads_reporting`) | Advertising API access approved for the app by LinkedIn |
| TikTok Ads (`tiktok_ads`) | Sign in with TikTok For Business and choose the ad accounts to share (Ad Account Management and Reporting read access). To add accounts later, connect again. | Nothing |
| Snapchat Ads (`snapchat_ads`) | Sign in with Snapchat (`snapchat-marketing-api`). Every ad account of every organization you belong to is listed. | Nothing |
| Taboola Ads (`taboola_ads`) | Your own Backstage API client id and secret, and optionally an account id. A network account reads every advertiser account under it; without an account id, the credentials' own account is read. | Backstage API access, which your Taboola account manager grants and issues the credentials for |
| Outbrain Ads (`outbrain_ads`) | Your own Outbrain username and password. Outflare trades them for an Amplify API token (`GET /login`), keeps the token sealed with them and gets a new one every 25 days (a token lasts 30). Every marketer the login can see is listed; spend is in the currency of the marketer's budgets. | Amplify API access for that login, which you request from Outbrain |
| Apple Ads (`apple_ads`, formerly Apple Search Ads) | Your own Apple Ads API user: its client id, team id and key id from Account Settings → API, and the private key whose public half you uploaded there (see below). Every ad account the user can reach is listed, App Store and Apple Maps. | An API role for that user (API Account Read Only is enough) |
| Amazon Ads (`amazon_ads`) | Sign in with Amazon (Login with Amazon, `advertising::campaign_management`). Every advertising profile the sign-in reaches is an ad account: one advertiser in one marketplace, with its currency and time zone, in North America, Europe or the Far East. Sponsored Products campaigns are read; their daily numbers come from Amazon's reports, which Amazon builds in a few minutes, so a sync can take longer than for other platforms. Purchases and sales are Amazon's seven-day attribution. | Nothing |
| Pinterest Ads (`pinterest_ads`) | Sign in with Pinterest (`ads:read`, read-only) | Nothing |
| ChatGPT Ads (`chatgpt_ads`) | Your own Advertiser API key from [OpenAI Ads Manager](https://ads.openai.com), under Settings. A key reaches one ad account, so connect each account with its own key. To send conversions back, add the pixel ID, a conversion key (Conversions, Manage conversion keys) and your website address on the connection. | Nothing |

**Apple Ads** has no sign-in: it uses OAuth client credentials that belong to
your own Apple Ads organization. An account administrator invites a user with
an API role; that user makes a P-256 key pair
(`openssl ecparam -genkey -name prime256v1 -noout -out private-key.pem`, then
`openssl ec -in private-key.pem -pubout -out public-key.pem`), pastes the public
key into Apple Ads under Account Settings → API, and gives Outflare the client
id, team id and key id shown there with the private key. Outflare keeps them
sealed, signs a short-lived client secret with the key when it syncs, and trades
it with Apple for a one-hour access token, held only in memory. It reads through
the Apple Ads Platform API, which replaces the Campaign Management API (v5) that
Apple turns off on January 26, 2027. Taps are the clicks; for App Store
campaigns, total installs (tap and view-through) are the conversions. Apple
Maps campaigns report spend, impressions and taps only.

Signing in uses the operator's OAuth app (`CONNECTOR_<ID>_CLIENT_ID` and
`_CLIENT_SECRET`, see [connectors.md](/docs/self-hosting/configuration/)); the tokens it produces
belong to the workspace's own ad account. Amazon Ads also sends that app's
client id (not its secret) with every call, as Amazon requires, so the
connection keeps it beside the workspace's tokens. When a connection still needs a
developer token, `GET /v1/workspaces/{ws}/ads/connections` lists it under
`setup_needed`, and a person adds it in Integrations
(`PUT /v1/workspaces/{ws}/ads/connections/{id}/setup`). Outflare checks the
token against the platform before storing it, sealed like every other
credential.

## What is stored

A sync runs every six hours, and a failed one is tried again sooner: after 15 minutes, then 1 and 2 hours, then every 4 hours until one works. The first one reads 90 days; later runs read the
last 7 days, and the last 30 once a day, because platforms keep revising recent
numbers. Each run stores:

- **Ad accounts**, with currency and time zone. Each account can belong to a
  brand (`PATCH /v1/workspaces/{ws}/ads/accounts/{id}`) or be shared, and can be
  switched off. A new account takes the brand of the connection that sees it
  (a brand's own sign-in, or a shared one used by a single brand) until you
  set another. The page shows each account's name, its id as the platform
  writes it and, for Google Ads and Meta, a link that opens it there.
- **Campaigns**, with status, objective and daily budget.
- **Ad sets and ads** (Meta Ads and Google Ads, where Google calls ad sets ad
  groups): each one under its campaign, with its status, a Meta ad set's own
  budget, and for each ad what the platform says about it: its headline, text,
  landing page, URL parameters (Meta) or final URL suffix and tracking template
  (Google, the ad's own or the ones it inherits from its ad group, campaign or
  account), its type (Google) and a preview image (Meta, a link that expires
  and is refreshed by each sync), and whether those links carry Outflare's
  tracking template.
  Removed ad groups and ads aren't listed, but their numbers still sync while a
  report has them.
- **Daily metrics** for each campaign, ad set and ad: spend, impressions,
  clicks, and the platform's own conversions and conversion value where it
  reports them. Days are the account's own days, in its time zone. An ad set's
  and an ad's numbers are already in their campaign's, so totals count
  campaigns only. From Meta also link clicks, landing page views, 3-second
  video views and reach. Reach is each day's people: added over days, someone
  reached on two days counts twice, so frequency is the average day's.
- **Conversions by type** for each campaign, ad set and ad per day. Meta's
  standard kinds (purchase, lead, complete_registration, start_trial,
  subscribe) each count once, though Meta reports a purchase as `purchase`,
  `omni_purchase` and the pixel's own; custom conversions are listed as
  `custom.<id>` and aren't in the conversions total. Google's are its
  conversion actions, by name.
- **Google and Microsoft search keywords and search terms**: each keyword that showed an
  ad, with its match type and numbers per day, and what people searched, with
  the keyword it matched. Google leaves out searches too few people made.
- **Spend in the costs ledger**: one entry per campaign (never per ad set or ad) per day, channel
  `paid_ads`, in the account's currency and brand, so paid ads sit beside every
  other cost and outcome. An entry is updated when the platform revises the day.

Conversions and ROAS here are **platform-reported**: each platform's own count,
with its own attribution window. They are not Outflare's attribution, and they
are not added up across platforms as if they were.

## Reading it

In the app, open **Paid ads** in the sidebar. The page is for one goal: more paying customers at or under your target cost. It has seven tabs, each with its own address, and one date menu (Today, Yesterday, the last 7, 28, 30 or 90 days, this month, last month or a custom range).

| Tab | What it is for |
| --- | --- |
| **Overview** | Pick all networks, one network or one ad account at the top, and everything below follows it. One sentence says where you stand against your target, then cost per new customer, cost per sign-up, new customers, spend, revenue and return. Campaigns named for your brand are judged apart from everything else, so a cheap average doesn't hide an expensive campaign. **Do this next** lists the three open actions with the biggest effect, and a funnel shows ad clicks, sign-ups and first payments. Every number reads the same rows, so they can't disagree. |
| **Actions** | One table of what to do: **Fix** (something is broken), **Cut waste**, **Grow** and **Experiment**, each with why, the expected effect and one main button. Views: To do, In progress, Done and Dismissed. A switch turns recommendations on or off; while off, what Outflare would have recommended is under Preview. Nothing changes in an ad account until you approve it, and a budget raise shows the budget before and after and the most it can add a month. |
| **Campaigns** | Every campaign with what it spent and brought; open one for its ad groups, ads, keywords and searches. Tables start on **All enabled**, with a **Status** filter (All enabled, All but removed, All) and two total rows under each: one for the rows shown and one for all of them. For Google Ads, an enabled campaign, ad group or ad also says whether it is really serving, in Google's words (Eligible, Limited by budget, Limited by bidding, Learning, Not eligible), with Google's reasons on hover, and the table has Google's Optimization score and **Room to grow**: the share of searches a search campaign missed over the last 7 days because its budget ran out, and because others ranked higher. Sort by it to see where a raise would buy the most. |
| **Customers** | The people your ads brought, and which campaign each came from. |
| **Audiences** | Lists of your people sent to the ad networks you choose ([Audiences](#audiences-one-list-several-ad-networks)). |
| **Experiments** | Tests the ad network splits fairly, and how each change you approved turned out. |
| **Settings** | A row of its pages sits under the tabs (General, Tracking, Send conversions, Send log, Ad accounts, Change history). General is one table with a status on each line: ad accounts, recommendations, conversions sent to the networks, the send log, tracking, the counting window, which customers' revenue counts, and the change history. |

It shows spend, clicks, CTR, cost per click and platform conversions for 7, 28 or 90 days, by day, platform and campaign, with each account's brand and sync switch. Each campaign shows the visits, conversions and revenue Outflare's own attribution credits to it beside what the platform reports. Click a campaign and it opens as a page of its own, like a level in the ad platform, with a trail back (All campaigns, then the campaign, then the ad group): its numbers and trend by day, its conversions by type, its ad groups or ad sets and its ads, and for Google and Microsoft Advertising its keywords and search terms. On a Microsoft campaign you can exclude a search as a negative keyword, add a search as a keyword, and pause an ad group; on X you can pause a line item. Click an ad group or ad set for its own page with only its ads. Each page has its own address, so the browser's back button and shared links work. Paid visits whose campaign id matches no campaign in a connected account are listed on their own, with why that happens. An ad whose links lack the tracking template is marked. A connection that still needs a developer token asks for it at the top.

| Call | What it answers |
| --- | --- |
| `GET /v1/workspaces/{ws}/ads/accounts` | Every account, its brand and sync status |
| `GET /v1/brands/{brand}/ads/campaigns` | Campaigns ranked by spend over `from`–`to`, with CPC, CTR, cost per conversion and platform ROAS, their type, how the platform bids, the brand's target with over or under, and the trend against the days before |
| `PUT /v1/brands/{brand}/ads/campaigns/{id}/target` | Set a campaign's target cost per conversion (`analytics.manage`) |
| `PUT /v1/workspaces/{ws}/ads/accounts/{id}/target` | Set the target for every campaign of an account without its own (`analytics.manage`) |
| `GET /v1/brands/{brand}/ads/items` | Ad sets and ad groups (`level=ad_group`) or ads (`level=ad`), ranked by spend, with their campaign; `campaign_id` or `parent_id` narrows them |
| `GET /v1/brands/{brand}/ads/conversion-actions` | Platform conversions by action, per connector and currency; `entity_id` gives one campaign's, ad set's or ad's |
| `GET /v1/brands/{brand}/ads/keywords` | Google search keywords ranked by spend; `campaign_id` or `ad_group_id` narrows them. Each also carries Outflare's own count of who its clicks brought: `signups` in the range, how many of those have paid since (`signups_paid`, `paid_share`), `new_payers` and `cost_per_new_payer_micros` |
| `GET /v1/brands/{brand}/ads/search-terms` | What people searched that showed a Google ad, with the keyword it matched, ranked by spend. `keyword_signups`, `keyword_signups_paid` and `keyword_paid_share` are the matched keyword's own numbers: a network doesn't say which search a click came from |
| `GET /v1/brands/{brand}/ads/summary` | Totals grouped by `connector`, `brand`, `account` or `day`, per currency; `entity_id` gives one campaign's, ad set's or ad's numbers alone |
| `POST /v1/workspaces/{ws}/ads/sync` | Sync now instead of within six hours |

All of them take `brand`. Money is in micros (1,000,000 = one unit).

**One currency per brand.** An ad account billed in another currency (an
account a network made you open in Singapore dollars, say) is converted into
the brand's currency, so its spend adds up with the rest. The Overview, the
Campaigns tables and the totals of each campaign, ad group, ad, keyword and
search term, the money in a finding's and a verdict's text, and the cost on
the Bidding strategies table are in the brand's currency, at the latest daily reference rate
Outflare keeps (the European Central Bank's), and the page says so ("billed
in SGD, shown in USD"). In the API each row says what its account is billed
in (`account_currency`, or `currency` beside `report_currency` and
`exchange_rate`). A budget and a cost target stay in the ad account's
currency in the API, because that is what the network sets; the app shows
them converted, and the forms that change them use the account's currency.
Money in a currency with no rate stays in its own and is never added to
another. The MCP
server has a tool for each (`list_ad_accounts`, `list_ad_campaigns`, `list_ad_items`,
`list_ad_conversion_actions`, `list_ad_keywords`, `list_ad_search_terms`,
`get_ads_summary`, `sync_ads`, `list_ad_connections`, `update_ad_account`,
`set_ad_target`).

### Targets and trends

Each campaign comes with what an agent or a person needs to judge it, not only
its numbers:

- **Type** (`objective`): the platform's own word, such as Google's `search`,
  `performance_max`, `display`, `video` or `demand_gen`.
- **How the platform bids** (`bidding_strategy`) and the cost per conversion or
  return it bids to (`platform_target_cpa_micros`, `platform_target_roas`), as
  set in Google Ads. A portfolio bid strategy keeps its target on the strategy,
  so only its type shows.
- **The brand's own target cost per conversion**, set on the campaign or, for
  every campaign without one, on its ad account. It is Outflare's alone and is
  never sent to the platform. `target_status` compares the range's cost per
  conversion with it: `on_target` within a tenth either way, `under` below that,
  `over` above it, and `over` too when the campaign spent with no conversions.
- **Trend**: `previous_totals` holds the same numbers for the same number of
  days just before the range, and `trend` says which way spend moved:
  `scaling_up` or `scaling_down` past 15% either way, `steady` inside it, `new`
  with no spend before and `stopped` with none now. `spend_change` is the move
  as a fraction.

The Paid ads page shows them in the Campaigns table, with a Target button on
each campaign and on each ad account. Day-by-day charts are on the page and on
each campaign.

To credit sales to each ad by its id, paste the network's tracking template
into it ([website tracking](/docs/guides/website-tracking/)): every
paid click then lands with the network's own campaign, ad set and ad ids.
Google Ads clicks know their campaign even without it: with auto-tagging on,
Google adds `gad_campaignid` to the landing page, and the website script keeps
it as the visit's campaign. Ad group and ad ids still need the template.
On Google Ads, Outflare can add it for you: **Paid ads → Tracking → Fix tracking
links** shows every URL suffix it would change, then adds the template when
you confirm ([how it works](/docs/guides/website-tracking/)).

### What each campaign brought

**Paid ads → What each campaign brought** puts Outflare's own count beside
each campaign's spend. It shows the visits that came through the campaign
(matched by the ids its tracking template put on the landing page), and the
conversions and revenue [attribution](/docs/guides/attribution/) credits to those visits
under the workspace's model, with the return on spend. The platform's own
conversion count is shown next to it for comparison, never added in.

A campaign with spend and no tracked visits is listed too: it usually has no
tracking template yet.

`GET /v1/brands/{brand}/attribution/ads` (MCP `get_attribution_ads`) gives the
same rows. It takes `level` (`campaign`, `adset` or `ad`), `from`, `to`,
`model` and `brand`. Meta and Google ad sets and ads come with their names and
spend; other platforms sync campaigns only, so their ad sets and ads come with
first-party numbers but no name or spend.

## Sending conversions back

A conversion rule sends one customer event (such as `signed_up` or
`payment.succeeded`, from the website snippet, the API or a connected tool) to one
conversion on one ad account.

For purchases, send **`payment.succeeded`**, valued at `amount_minor` (minor
units). Every payment becomes one, whether it arrives as a
[transaction](/docs/guides/transactions/), an `Order Completed` event or from a billing
connector, and a payment sent more than one way is counted once
([One payment, counted once](/docs/guides/transactions/#one-payment-counted-once)). A rule
on `order_completed` sends only payments that arrive as orders.

A rule can also name one of the workspace's
conversion definitions (`"conversion": "qualified_call"`)
instead of a bare event. It then sends only the events that meet the
definition's conditions, such as a call over a minute, and each one is worth
what the definition says unless the rule sets its own value. The event type
defaults to the definition's name for that network (`network_events`) when the
platform offers it.

Each event is checked against the conditions once, a minute after it arrives.
One that doesn't qualify is never sent and never appears in the send log.
Archiving the definition stops the rule. In the app, **Add a rule** offers the
definitions first.

### Qualified sign-ups with a predicted value

A sign-up carries no money, so an ad platform that is told about every
sign-up bids as hard for the people who never pay as for the ones who do. A
rule on an event such as `signed_up` has two switches for that, both off by
default:

- **Send a predicted value** (`predicted_value`): each event is sent worth
  what people like the person went on to pay, in the brand's currency, in
  place of the rule's own value.
- **Send qualified ones only** (`qualified_only`): events from people less
  likely to pay than the brand's average are skipped, and the send log says
  why. A throwaway email address is never qualified.

Both decide from the brand's own history, read with
`GET /v1/brands/{brand}/ads/signup-quality?event=signed_up`: of the people
who did the event in the 90 days that ended two days ago, how many paid
(`payment.succeeded`) within 30 days and what a payer paid on average, by the
country they came from and the kind of email address they gave (work, free,
throwaway or unknown, from Outflare's own classifier; no lookup leaves the
server). A group's share is pulled toward the brand's average where the
group is small, so twenty people from one country never swing a prediction.
The predicted value is that share of what a payer paid.

With fewer than 100 people or 10 payers in the window (`enough` is false)
nothing is predicted: every event is sent, with the rule's own value. The
history is read again every hour. The rule form shows the history under
**Who pays after this event**, with the breakdown by country and email. The
MCP tool is `get_signup_quality`.

| Platform | Where it goes | Matched on | Also needs |
| --- | --- | --- | --- |
| Google Ads | A conversion action that takes uploaded clicks (Upload clicks) | `gclid`, `gbraid` or `wbraid`; hashed email and phone (enhanced conversions for leads) | The sign-in needs Google Ads access that can upload |
| Meta Ads | A pixel (dataset), as a standard event such as Purchase or Lead | `fbc` (from `fbclid`), `fbp`, hashed email, phone and record id, and the person's IP address and browser | The system user assigned to the pixel |
| Microsoft Advertising | An offline conversion goal | `msclkid`; hashed email and phone | The developer token above |
| Reddit Ads | Your pixel, through the Conversions API, as SignUp, Lead, Purchase and so on | `rdt_cid`, hashed email and record id, and the person's IP address and browser | Your own pixel ID and Conversions API access token, from Reddit Ads Manager → Events Manager. A connection with a token but no pixel ID still sends through Reddit's older endpoint, so add the pixel ID before Reddit retires it. |
| X Ads | A conversion event on your pixel, through the Conversions API, by its Event ID from Events Manager | `twclid`, hashed email and phone, and the person's IP address and browser (only when both are known) | The pixel ID and Event IDs on the connection, from X Ads Manager → Tools → Events Manager. Conversions are sent with the connection's keys, or with a Conversion API access token from Events Manager if you add one |
| TikTok Ads | A pixel, through the Events API, as CompletePayment, CompleteRegistration, SubmitForm and so on | `ttclid`, the `_ttp` cookie (`ttp`), hashed email, phone and record id, and the person's IP address and browser | The sign-in's Pixel and Events access; if TikTok refuses it, an Events API access token from Events Manager on the connection |
| Snapchat Ads | A Snap Pixel, through the Conversions API, as PURCHASE, SIGN_UP, SUBSCRIBE and so on | `ScCid`, the `_scid` cookie (`scid`), hashed email, phone and record id, and the person's IP address and browser | The sign-in's access; if Snapchat refuses it, a Conversions API token from Ads Manager → Business Details on the connection |
| Taboola Ads | An active event-based conversion (Realize → Tracking, "Create conversions using code"), by its event name, as a server-to-server action | `tblci` only | Nothing: the bulk S2S endpoint takes no token |
| Pinterest Ads | The Conversions API, as checkout, signup, lead and so on | `epik`, hashed email, phone and record id, and the person's IP address and browser | The workspace's own conversion access token, from Pinterest Ads Manager → Conversions |
| ChatGPT Ads | Your pixel, through OpenAI's Conversions API, as `registration_completed`, `order_created`, `lead_created`, `subscription_created` and so on | `oppref`, the pixel's browser reference, hashed email, phone and record id; beside them the IP address the event's own context carries (`context.ip`), the person's browser (from the event, else from their latest visit recorded by the Outflare site script, so your server doesn't need to send it) and their country, unhashed as OpenAI asks | Your own pixel ID and conversion key from OpenAI Ads Manager → Conversions, and your website address. OpenAI takes conversions from the last 7 days only. |

The IP address and browser are the ones the event's own context carries (`context.ip`, `context.userAgent`); the browser falls back to the one the site script stored on the person's latest earlier event, up to 90 days back. They go to Meta, TikTok, Snapchat, Pinterest, Reddit, X and ChatGPT Ads, unhashed as each asks, only beside a click id or an identifier, never as the only thing sent, and only when the conversion passes the consent check below. The send log lists them as `ip_address` and `user_agent`. On server events, send the user's own address and browser in `context`, not your server's.

Taboola matches only on its click id: a conversion with no `tblci` from the
click is skipped. Taboola accepts each batch at once and processes it later
without reporting back, so `sent` there means Taboola received it; check the
conversion's numbers in Realize. Revenue goes only in the currencies Taboola
lists for S2S (USD, EUR, GBP and 16 others); in any other currency the
conversion is sent without it.

Apple Ads takes no conversions: its ads open the App Store, not your website,
and Apple measures installs in your app through its AdServices framework, so
there is nothing for Outflare to send back.

Amazon Ads doesn't take conversions back yet: its conversion events match on
hashed identifiers per advertiser account rather than on an ad click, and are
still in beta.

How it works:

- Every two minutes Outflare matches new events to the enabled rules and sends
  them, up to 500 per call. Only events that arrive after the rule was made are
  sent, never older ones, and only within a week of arriving.
- The ad click comes from the event itself (`click_ids`) or from the person's
  latest visit with that platform's click id in the 90 days before it. For
  Google, when no visit kept a `gclid`, `gbraid` or `wbraid`, the `gclid` in
  the Google tag's `_gcl_aw` cookie (read with marketing consent) is used.
  Gmail addresses are sent to Google without the dots before the `@`, as
  Google asks, so they match the Google account. Email and
  phone come from the person's record, hashed with SHA-256 before they leave;
  nothing is sent in the clear and nothing is copied into the send log.
- The event's message id is the conversion's id (Google's order id, Meta's,
  Reddit's, TikTok's, Snapchat's and Pinterest's event id, Taboola's order id). On the website, `outflare.track()` returns it: pass it to
  the browser pixel as its event id (`fbq('track', 'Purchase', {}, {eventID:
  id})`) and the platform counts a conversion once when both send it.
- **Sent from both the browser and your server.** Give the event the same
  message id on both sides: `outflare.track("Signed Up", {}, {messageId:
  "signup-" + userId})` in the browser, and `messageId: "signup-<userId>"` on
  your server's event. Outflare sends it to each rule once, under that id. The
  server's copy is preferred, since it names the person: a browser copy waits
  15 minutes for it, and is sent only if it doesn't come.
- **If the ids don't match** (the browser call left out `messageId`, so the
  script made its own), the two copies are still matched: the same event name
  for the same person, or the same browser, within 15 minutes of each other is
  one event, and the server's copy is the one sent. Tracking health raises
  `events_without_shared_id` so the developer can add the id. An order's
  copies with the same `order_id` in their properties are one event however
  far apart they arrive, with no warning.
- **Refunds.** <a id="refunds"></a>When a payment whose conversion was sent
  is refunded (a `payment.refunded`, from a refund transaction or an Order
  Refunded event), Outflare changes that conversion on Google Ads with a
  conversion adjustment, found by the order id it was sent with: a partial
  refund restates its value to what is left (in proportion to the value sent),
  and a full refund retracts it, so bidding learns from net revenue. Google
  may not know a conversion for a few hours after taking it, so a refused
  adjustment is tried again, up to 8 times over about a day. Microsoft
  Advertising is changed the same way, found by the click id or the hashed
  email or phone the conversion was sent with. Platforms that can't change a
  conversion after taking it skip the adjustment and say so: Meta has no way
  to take a conversion back, so keep refunded customers out of Meta with an
  audience set to **Never show them ads** ([Audiences](#audiences-one-list-several-ad-networks)):
  make a list of the people who were refunded, and Outflare excludes it on
  every campaign.
- The value comes from an event property (in major units, 12.50, or minor units,
  1250) or a fixed value; the currency from the rule, the event's `currency`
  property or the account's.
- **Consent.** In the EEA, the UK and Switzerland, and whenever a person's
  country is unknown, a conversion is sent only when they said yes to ad data
  (a consent with channel `ads` and purpose `ad_user_data`, recorded with
  `POST /v1/brands/{brand}/records/{id}/consents` when your consent banner
  says yes). Elsewhere the workspace's setting decides: **Everyone,
  unless they opted out** (`opt_out`, the default) or **Only people who said
  yes** (`opt_in`). Anyone who withdrew consent is never sent.
  A brand whose own site already asks every visitor for consent to ad data,
  but hasn't yet passed those answers to Outflare, can choose **Everyone:
  our site already collects consent** (`collected`). Conversions are then
  sent for everyone, in every country and when the country is unknown,
  marked as consented; people who withdrew are still never sent. It is the
  brand's own statement about its site, so only a signed-in person can
  choose it (an API token or an agent gets `403`), the web app asks to
  confirm, and the change is in the audit log. It covers conversions, not
  adding people to ad audiences, which keeps asking for consent to ad
  personalisation.
  A person's country is their latest website visit's. For someone the site
  script never saw, such as a purchase sent only from your server, it is the
  event's own: `context.location.country` (two letters, such as `US`), else
  the country of `context.ip`. When that event says nothing either, Outflare
  looks at the person's most recent earlier event that carried a country or
  an IP address, and then at the `country` on their customer record (two
  letters). Only when none of these says is the person treated as country
  unknown. So send the user's IP address (or country) in `context` on server
  events: it is the most reliable source.
- Every matched event is a row in the send log: `sent` (with the kinds of
  identifiers it carried, such as `gclid` and `email`), `skipped` with the reason
  (no consent, nothing to match on), `failed` when the platform refused it or
  could not be reached after five tries, or `queued`. Each row also has the
  `country` the consent decision was made on and its `country_source`
  (`visit`, `event`, `earlier_event` or `record`), the conversion it was
  going to (`target_name`, `ad_account_id`) and the person's name
  (`record_name`). In the web app the log is its own screen, **Paid ads → Setup →
  Send log**: filter by result or rule, read what happened in plain words,
  open the person from any row, and download it as CSV.
- **Sent against counted.** Above the log, a table compares, for each
  conversion action a rule sends to, the conversions the network accepted
  with what the network counts for that action, over 7, 14, 30 or 90 days
  ending two days ago (networks report a conversion a day or two late). It
  shows how many sends carried the network's own click id, the only ones it
  can count, the share of those it counted, and a status: Counted, Under half
  counted, None counted, Too few to judge (under 10 sends with a click id) or
  Not reported (the network doesn't report by conversion action; today only
  Google Ads does). `GET /v1/brands/{brand}/ads/conversion-check?days=`
  returns the same rows with the numbers per day.

On the **Paid ads** page, **Send conversions back** adds and switches rules,
sets who to send for, and shows the latest sends.

### First payments only

A rule on `payment.succeeded` chooses **Payments to send**:

- **Every payment** (the default): first payments, renewals and top-ups alike.
- **First payments only**: a customer's first ever payment for the brand and
  nothing after it, marked as a new customer. Each new paying customer counts
  once, so point it at a conversion action set to count **one** per click. A
  renewal, a top-up or the same payment sent again adds nothing, because each
  payment goes to the platform with one order id built from its payment id.
- **Repeat payments only**: every payment after a customer's first, marked as
  returning.

Outflare decides which payment is the first from the brand's whole payment
history, so import past payments ([Transactions](/docs/guides/transactions/))
before you switch a first-payments rule on. In the API this is the rule's
`feed_role`: `custom`, `first_payment` or `repeat_payment`.

| Call | What it does |
| --- | --- |
| `GET /v1/workspaces/{ws}/ads/conversion-targets?account_id=` | Where an account's conversions can go, asked live from the platform, and any setup still needed |
| `GET`, `POST /v1/workspaces/{ws}/ads/conversion-rules` | List rules with their last 30 days, or add one |
| `PATCH`, `DELETE /v1/workspaces/{ws}/ads/conversion-rules/{id}` | Change, switch off or delete a rule |
| `GET /v1/workspaces/{ws}/ads/conversion-sends` | The send log, newest first |
| `GET /v1/brands/{brand}/ads/conversion-check?days=` | Per conversion action, conversions sent against what the network counts, with a status and the same per day |
| `GET`, `PUT /v1/brands/{brand}/ads/settings` | The brand's `consent_mode`: `opt_out`, `opt_in` or `collected` (the workspace route is deprecated and acts on the first brand) |

The MCP tools are `list_ad_conversion_targets`, `list_ad_conversion_rules`,
`create_ad_conversion_rule`, `update_ad_conversion_rule`,
`delete_ad_conversion_rule`, `list_ad_conversion_sends`, `get_ad_settings`,
`set_ad_settings` and `get_ad_conversion_check`. X and LinkedIn follow once their API access is approved.

Outbrain Ads only reads: the Amplify API has no call that takes conversions.
Outbrain's click id (`ob_click_id`) is still recorded on each visit, so its
clicks count in Outflare's own attribution.

## Audiences: one list, several ad networks

An **audience** is one of the brand's lists of people (a smart list such as
"paid in the last 90 days", a list you filled by hand, or a saved query's),
named once and sent to the ad accounts you choose, so the same people reach
several ad networks. It is under **Paid ads, Audiences**, and at
`/v1/brands/{brand}/ads/audiences` (`POST` with `name`, `list_id` and
`ad_account_ids`; `PATCH` to rename it, turn it on or off, point it at another
list or change where it goes; `POST .../{id}/sync` to sync now; `DELETE`).
It runs on the workspace's own ad accounts and stays off until one is
connected ([Platforms](#platforms)).

- **What Outflare does on the network.** Through your own connection it
  makes a customer list named "<name> (Outflare)" on each ad account (a
  Google Ads Customer Match list, a Meta custom audience, an X custom
  audience, a Reddit customer list, a ChatGPT Ads custom audience), adds the
  people in the list, and once a day sends what changed: people who joined go
  in, people who left come out. Only hashed emails and phone numbers leave
  Outflare. On ChatGPT Ads the list is a custom audience filled through your
  connection's Advertiser API key; which campaigns target or exclude it is
  chosen in OpenAI Ads Manager, and OpenAI doesn't offer custom audiences on
  campaigns shown in the EEA or Switzerland. OpenAI takes no conversion back,
  so a list of the people who were refunded, excluded on your campaigns
  there, is how a refund reaches it.
- **Consent.** The same rules as sending conversions, for ad data and ad
  personalisation: someone who may not be added is left out, and someone who
  withdraws consent is taken out at the next sync.
- **Status per network.** Each destination shows whether it synced, how many
  people were sent and left out, the last error, and what the network says it
  matched. Networks hide the number for small lists and take a day or two to
  count a new one.
- **Networks that take a file.** A network Outflare can't fill a list on, such
  as TikTok Ads, takes an upload instead: **Download file**
  (`GET .../ads/audiences/{id}/file`) gives a CSV with the columns
  `email_sha256` and `phone_number_sha256`, never a plain email or phone.
- **Turning it off or deleting it** stops the syncs. The lists already on the
  networks stay as they are; delete them there if they are no longer wanted.

- **Never show them ads.** An audience can be people no campaign should show
  to, such as everyone who was refunded (`exclude: true`). Once its list is on
  the network, each sync queues the list as an exclusion on every active
  campaign of the ad account that hasn't had it, so a new campaign is covered
  within a day. Each one is a change in the campaign's history
  (`exclusion_add`, kind `audience`), like any exclusion. Take it off one
  campaign (`POST .../ads/campaigns/{id}/exclusions` with `kind: audience`,
  the list's id on the network as `value` and `action: remove`) and it stays
  off that campaign. Choosing the other option again takes it out of the
  campaigns Outflare put it on. Google Ads (a negative customer list on the
  campaign; Performance Max takes none, and its change says so) and Meta Ads
  (excluded on each ad set) take this from here (`can_exclude`). On the other
  networks the list is still kept up to date, and you exclude it on your
  campaigns there.

Use any other list on the network as usual: add it to a campaign
([Targeting](#targeting), on a campaign's page) or exclude it.

## Audiences from journeys

A journey's `sync_audience` step adds a person to a customer list audience on
one of your ad accounts, or takes them out: a Meta custom audience made from a
customer list, or a Google Ads Customer Match list that is open. `GET
.../ads/audiences?account_id=` (MCP `list_ad_audiences`) lists them, live from
the platform. Make the audience on the platform first; Outflare only fills it.

Only the person's SHA-256 hashed emails and phone numbers are sent, and the
platform matches them on its side, so it never says who matched. Adding
follows the same consent rules as conversions (above), for both ad data and ad
personalisation; removing never needs consent. Each change records
`ads.audience_synced` on the person. Meta needs the token to have
`ads_management` as well as `ads_read`, and the Custom Audience terms accepted
in the ad account. See
[Lifecycle email](/docs/guides/journeys/) for the step itself.

## Suggestions

After each sync Outflare reads every campaign it can change (Google Ads, Meta, Microsoft Advertising, LinkedIn, TikTok, Reddit, X and ChatGPT) and suggests at most one change for each, with why and the numbers behind it, on the **Actions** tab:

- **Raise the budget** by a fifth when a conversion cost at most nine tenths of the target over the last 14 days and the budget ran out on at least 4 of the last 7.
- **Lower the budget** by a fifth when a conversion cost more than 1.3 times the target (with at least 5 conversions).
- **Pause** a campaign that spent three targets' worth in 14 days with no conversion (without a target, three times what a conversion costs across its account).
- **Resume** a paused campaign whose conversions cost at most eight tenths of the target while it ran in the last 90 days.

On Google search campaigns, from the last 30 days, it also suggests:

- **Add a keyword**: a search people made that converted at least twice at or under the target, and isn't a keyword in its ad group yet, as an exact keyword there.
- **Add a negative keyword**: a search with at least 10 clicks and two targets' worth of spend but no conversion, as an exact negative for the campaign.
- **Give a keyword its own ad group**: a keyword with at least 10 conversions and two fifths of its ad group's spend, shared with at least two other keywords. Outflare makes an ad group named after it with the keyword (exact) and copies of the group's active responsive search ads, and adds it as an exact negative to the old group, so its searches go to the new one.

On Google campaigns that bid for as many conversions as they can with no target, it also suggests:

- **Bid to a target**: a campaign with at least 30 conversions in the last 28 days gets a target cost per conversion at what a conversion cost it over those days, so Google keeps that cost while it learns. It is measured after 14 days to settle, and works when a conversion costs at most 1.05 times what it did with at least 0.85 times the conversions; it didn't work when conversions fell below 0.7 times or a conversion cost more than 1.2 times. It can be tried as a test first (see Tests).

At most one of each per campaign at a time. They are measured on the whole campaign after a week to settle (a day for a negative). With an account picked, the tab also shows Google Ads' own recommendations for it, read live.

Budget suggestions need a target cost per conversion (the campaign's, its account's or the platform's own). A campaign changed in the last week, or still being measured, gets none. Nothing changes until a person approves; an agent changes campaigns with the campaign calls below, which follow its grant. Approving makes the change exactly as those calls do (it shows in the change history under **Settings**) and starts its measuring window:

- the platform's settling time (3 days for a budget, 7 for a resumed campaign), then
- at least a week, and long enough for about 30 conversions at the campaign's rate, plus 3 days for conversions reported late,
- at most six weeks; a change still unclear then is **Not sure**.

When the window ends the change is judged against as many days just before it: **Worked**, **Didn't work** or **Not sure**, with a sentence on why. A raised budget works when the extra conversions cost at most 1.2 times the target; a lowered one when a conversion got cheaper; a pause when the account converted at least nine tenths as well without the campaign; a resume when its conversions cost at most 1.1 times the target. A changed campaign whose conversions cost more than twice the target three days running is judged early. Conversions here are the platform's own.

| Call | What it does |
| --- | --- |
| `GET /v1/brands/{brand}/ads/suggestions` | Suggestions by network (`connector`), account, campaign or status, open first (`analytics.read`) |
| `POST /v1/brands/{brand}/ads/suggestions/{id}/approve` | Make the change and start measuring it; a person's session only (`ads.manage`), except savings applying on their own (below) |
| `POST /v1/brands/{brand}/ads/suggestions/{id}/dismiss` | Leave the campaign as it is (`ads.manage`) |
| `GET /v1/brands/{brand}/ads/recommendations` | The platform's own recommendations for an account, read live (Google Ads; `analytics.read`) |
| `POST /v1/brands/{brand}/ads/suggestions/refresh` | Read the campaigns again now, at most once an hour (`ads.manage`) |
| `GET /v1/brands/{brand}/ads/findings/{id}` | One action: what it would change, the numbers behind it, the expected effect, how it turned out, and what you said about it (`analytics.read`) |
| `POST /v1/brands/{brand}/ads/findings/{id}/feedback` | Say it was good or bad advice: `rating` (`good` or `bad`) and an optional `note` (`ads.manage`) |

**One action, and what you think of it.** Each row under Actions opens its own page: what it would change, every number behind it, the expected effect, and how it turned out. There you say **Good advice** or **Bad advice**, with a reason. It decides nothing and changes nothing on the network. The rating and reason stay on the action and are kept as one of the brand's memories, which agents read with the brand's context, so the next advice follows it; rating again replaces both. MCP: `get_ad_finding`, `rate_ad_finding`.

**Savings that apply on their own.** An extension can let an agent approve suggestions that only spend less (a lower budget, a pause, a negative keyword) for a brand; `/v1/meta` then lists `ad_suggestions_auto`. Anything that can spend more always waits for a person, a suggestion on an account every brand shares never applies on its own, the agent's grant still applies, and the change is measured and judged like any other. `ad_suggestion.approved` carries `auto: true` for these. On Outflare Cloud, this is [Paid ads Autopilot](#paid-ads-autopilot).

## In the weekly digest

A brand with ad spend gets a **Paid ads** section in its
[digest](/docs/guides/digests/) (weekly on Mondays unless changed, in the
app, as the `digest.ready` webhook and by email when the brand chose that):
ad spend, clicks, the sign-ups and new paying customers the ads brought and
the cost per new paying customer, each beside the period before, in the
brand's currency. Under them are the three campaigns that spent the most
with what each brought (marked good or bad against the brand's target cost
per new paying customer), how many alerts are open, how many recommendations
wait for a decision, and how many of the changes measured that period
worked. Sign-ups and paying customers are Outflare's own count, not the
platform's. Spend in a currency with no exchange rate is left out rather
than added as if it were the brand's. Section id `paid_ads`.

In the app, **Paid ads → Set up** has a **Weekly report** card that says
when the digest is made, who gets it by email, and opens the Digests page
to change either.

## Tests

A before-and-after comparison can be thrown off by anything else that changed that week. A test avoids that: the network itself splits one campaign between how it is and a **trial** that tries one thing differently, on the same days, so the two compare fairly. Start one on the **Experiments** tab, or press **Test it first** on a budget suggestion instead of approving it.

- **Google Ads** runs it as a custom experiment on a search or display campaign: the trial gets a share of the campaign's traffic (half, unless the call says otherwise) and bids to a different target cost per conversion.
- **Meta** runs it as a split test: Outflare copies the campaign with its ad sets and ads, gives the copy a different daily budget, and Meta splits the audience so no one sees both. The ad account must belong to a business, and the token needs `ads_management` and `business_management`.

A test starts the next day and runs until the smaller side has about 30 conversions at the campaign's recent rate: at least two weeks, at most six. The first days don't count while the trial settles (a week for a new bid target, three days for a budget). Outflare reads both sides after each sync and shows them as they go. Three days after the test ends (for conversions reported late) it says which did better:

- a **bid target** wins when the trial gets clearly more conversions for its money, at 95% confidence;
- a **budget** wins when the trial's conversions cost at most 1.1 times the target and no clearly more than the campaign's.

A trial whose conversions cost more than twice the target three days running is judged early. Then a person presses **Keep it** (Google promotes the trial's bid target to the campaign; on Meta the campaign gets the trial's budget and the copy is paused) or **Roll back** (the campaign stays as it was and the trial stops). Either can be pressed while a test runs, too. A suggestion that was tested is judged with its test. A campaign being tested gets no suggestions, and has one test at a time.

| Call | What it does |
| --- | --- |
| `GET /v1/brands/{brand}/ads/tests` | Tests by network, account, campaign or status, with both sides' numbers and the verdict (`analytics.read`) |
| `POST /v1/brands/{brand}/ads/tests` | Start a test; a person's session only (`ads.manage`) |
| `POST /v1/brands/{brand}/ads/tests/{id}/keep` | Apply the trial's change to the campaign and end the test (`ads.manage`) |
| `POST /v1/brands/{brand}/ads/tests/{id}/roll-back` | End the test and leave the campaign as it was (`ads.manage`) |
| `POST /v1/brands/{brand}/ads/suggestions/{id}/approve` with `{"test": true}` | Test a budget suggestion instead of making it (`ads.manage`) |

**Proposed experiments.** A recommendation that can spend more is offered
as an experiment instead of a plain approval when the network can test
that kind of change (a bid target on Google Ads, a budget on Meta) and the
campaign converts often enough for an even split to reach an answer within
six weeks. Its row under Actions has the type **Experiment** and its main
button is **Test it first**; **Make the change now** is under **More**. In
the API the finding carries `test_first` (`kind`, `days`, `note`); approve
it with `{"test": true}` to start the test. Changes that only save money
are made, not tested.

X Ads has no tests here: X splits an audience only between campaigns that already exist and offers no way to copy a campaign with its ads, so change an X budget directly and compare the days before and after.

## Managing campaigns

Three changes, on Google Ads, Meta, Microsoft Advertising, LinkedIn,
TikTok, Reddit, X and ChatGPT (the other platforms are read but not changed yet, and
say so with `422 connector_invalid`). On Reddit, a campaign with campaign
budget optimization holds its daily budget; otherwise the campaign's budget
is the sum of its ad groups' daily budgets, and a new one is shared between
them in the same proportions. A campaign with only lifetime budgets is
refused with a reason. On ChatGPT, the campaign's daily spend limit is set
(at least 1 of the account's currency); a campaign with only a lifetime
limit is refused with a reason:

| Call | What it does |
| --- | --- |
| `POST /v1/brands/{brand}/ads/campaigns/{id}/pause` | Pause a campaign (`ads.manage`) |
| `POST /v1/brands/{brand}/ads/campaigns/{id}/resume` | Run a paused campaign again (`ads.manage`). When its budget would take the brand's running budgets over the daily budget ceiling, it answers 409 `ad_budget_ceiling`; a signed-in person can confirm and go ahead |
| `PATCH /v1/brands/{brand}/ads/campaigns/{id}` | Set its daily budget, `daily_budget_micros` in the account's currency (`ads.manage`) |
| `POST /v1/brands/{brand}/ads/pause-all` | The kill switch: pause every active campaign of the brand at once, on every platform that can be changed, as one batch (`ads.manage`) |
| `GET /v1/brands/{brand}/ads/changes` | Every change asked for, by network (`connector`), account (`account_id`), campaign, status or brand (`analytics.read`) |

Each call checks the campaign (yours, on an active account, in a state the
change makes sense for) and answers `202` with the **change**: what the campaign was before, what was asked, who asked and,
for an agent, its action. A job (`ads.change`) then makes the one call on the
workspace's own account, reads the campaign back from the platform, and
records how it ended: `applied` with `verified_at` when the platform shows
the change, `applied` with a `verify_note` when it shows something else or
could not be read back (the next sync corrects the mirror), or `failed` with
the platform's reason. An unreachable platform is retried for a while first.
The campaigns list follows the platform's answer at once. On the Paid ads
page each campaign has Pause, Resume and a budget field, and a brand has
**Pause all ads**.

`ads.manage` is its own scope, because it spends money. Operators have it;
give it to a token on purpose. For an agent on the action layer
([actions.md](/docs/agents/missions/)):

- a pause spends nothing, so it runs under the agent's grant;
- raising a daily budget by more than a fifth, or setting one on a campaign
  that had none, always waits for a person, whatever the grant;
- a raise or a resume that would put the brand's active campaigns over the
  grant's daily spend cap, or the month (what it has spent plus the daily
  total for the rest of it) over its monthly cap, waits for a person. A run
  grant on ads paths gets $50 a day and $500 a month unless a person sets
  its own caps.

Every change is an audit event and a webhook (`ad_campaign.paused`,
`ad_campaign.resumed`, `ad_campaign.budget_changed`, `ads.paused_all`), and
how it ended is a product event (`ad_change.applied`, `ad_change.failed`) and
the metric `outflare_ads_changes_total` (the Grafana row "Paid media
(managing campaigns)"). Meta needs the `ads_management` permission on the
token or sign-in, LinkedIn `rw_ads`, TikTok write access to Ad Account
Management on the app, Reddit edit access to ads, and X an app with Read and write permission
before you sign in; a connection made before that was asked for is
reconnected to manage campaigns. Microsoft's sign-in already covers it.

## Targeting

How a campaign bids, which audiences it reaches and in which countries it runs, on Google Ads and Meta. The campaign's page on Paid ads shows them, with buttons to change each one.

| Call | What it does |
| --- | --- |
| `GET /v1/brands/{brand}/ads/campaigns/{id}/targeting` | Its bidding method and target, audiences, countries, and notes on anything else (regions, cities, exclusions, ad sets that differ), read live, plus the bidding methods the platform lets Outflare set (`analytics.read`) |
| `POST /v1/brands/{brand}/ads/campaigns/{id}/bidding` | Bid for as many conversions as it can (`maximize_conversions`, with an optional `target_cpa_micros`) or as much conversion value (`maximize_conversion_value`, with an optional `target_roas`); Google Ads only (`ads.manage`) |
| `POST /v1/brands/{brand}/ads/campaigns/{id}/audiences` | Add or remove (`add: false`) one of the account's audiences, such as one made from a smart list (`ads.manage`) |
| `POST /v1/brands/{brand}/ads/campaigns/{id}/countries` | Add or remove a country by its two-letter code (`ads.manage`) |
| `POST /v1/brands/{brand}/ads/campaigns/{id}/locations/preview` | What setting the campaign's places would add and take out, without changing anything (`analytics.read`) |
| `POST /v1/brands/{brand}/ads/campaigns/{id}/locations` | Set the places the campaign shows in and is kept out of, in one change (`ads.manage`, Google Ads) |
| `POST /v1/brands/{brand}/ads/campaigns/{id}/rename` | Rename the campaign (`ads.manage`, Google Ads) |

Each answers `202` with the change, which runs as a job like the other campaign changes and shows in the change history under **Settings**. On Meta an audience or a country is added to or removed from every ad set of the campaign, keeping the rest of each ad set's targeting as it was. A campaign never loses its last country: removing it is refused, so it can't start running everywhere. A change made by an agent always waits for a person, whatever its grant. Each is an audit event (`ad_campaign.bidding_changed`, `ad_campaign.audience_added`, `ad_campaign.audience_removed`, `ad_campaign.country_added`, `ad_campaign.country_removed`).

## New ads

The brand agent writes new ads where a campaign needs them, from the
brand's own knowledge and site, with why each should do better (the
playbook **Write new ads where the old ones are tired**). A person can
write one through the API too. Each is a **draft**:

- **A new ad** in an ad group (an ad set on Meta). On Google, a responsive
  search ad: 3 to 15 headlines of at most 30 characters, 2 to 4
  descriptions of at most 90, and an optional display path. On Meta, a link
  ad with one headline, its main text, an image, a button (Learn more by
  default) and the Facebook page it runs as (the account's first unless
  named).
- **A new ad group** in a Google campaign, with its keywords (phrase match
  unless named) and an ad.
- **A new search campaign** on Google, with a daily budget, at least one
  country, bidding (maximise conversions unless named) and an ad group.

Drafts are checked against the platform's rules when written, and wait for
a person on the **Actions** tab under **New ads**. Approving one makes it
on the workspace's own account, everything paused: on Google in one batch,
so a refused draft makes nothing. Check it on the platform, then **Turn on**:
the ad, and the ad group and campaign when the draft made them, are turned
on. Nothing spends until then.

| Call | What it does |
| --- | --- |
| `GET /v1/brands/{brand}/ads/drafts` | The brand's drafts, those waiting for a person first, by `status`, account or campaign (`analytics.read`) |
| `POST /v1/brands/{brand}/ads/drafts` | Write a draft: `kind` (`ad`, `ad_group`, `campaign`), where it goes (`ad_group_id`, `campaign_id` or `account_id`), what it makes and `reason` (`ads.manage`) |
| `PATCH /v1/brands/{brand}/ads/drafts/{id}` | Rewrite one before it is approved (`ads.manage`) |
| `POST /v1/brands/{brand}/ads/drafts/{id}/approve` | Make it on the platform, paused; a person's session only; again on a failed one to retry (`ads.manage`) |
| `POST /v1/brands/{brand}/ads/drafts/{id}/go-live` | Turn on what it made; a person's session only (`ads.manage`) |
| `POST /v1/brands/{brand}/ads/drafts/{id}/dismiss` | Leave it unmade (`ads.manage`) |

Writing a draft spends nothing, so an agent writes it under its grant;
approving and turning on are always a person's. The job (`ads.draft`) makes
the platform calls, so a draft moves from `draft` to `creating`, `paused`,
`going_live` and `live`, or to `failed` with the platform's reason (or back
to `paused` when turning on failed). Each step is an audit event
(`ad_draft.written`, `ad_draft.edited`, `ad_draft.approved`,
`ad_draft.launched`, `ad_draft.dismissed`), the job's results are product
events (`ad_draft.made`, `ad_draft.went_live`, `ad_draft.failed`), and the
metric `outflare_ads_draft_steps_total` is on the Grafana row "Paid media
(suggestions)". Meta makes new ads only; new ad sets and campaigns are made
in Ads Manager.

## Paid ads Autopilot

<span class="pill cloud">Outflare Cloud</span>

On Outflare Cloud, a brand's agent can apply paid ads savings for you. On
the **Agents** page, while the brand agent has a paid ads objective, the
**Paid ads Autopilot** card lets a person choose which savings it may apply
on its own (lower a budget, pause a campaign, add a negative keyword) and how
many a day. Only a person can turn it on or change it, and it starts off.

- The agent approves only the kinds you ticked, up to the day's limit. Every
  other suggestion, and anything that could spend more, still waits for you.
- Each change is made, measured and judged like one you approved, and shows
  in the change history and on the **Actions** tab as approved by the agent.
- Turning it on, changing it and turning it off show in the agent's activity
  and the audit log.
- The agent also learns which kinds of suggestion have tended to work, from
  verdicts across Outflare Cloud accounts. Only counts are shared, never your
  campaigns or numbers.

### Ask the agent why

<span class="pill cloud">Outflare Cloud</span>

On Outflare Cloud, an action's page has **Ask the agent why**. It opens the
brand agent's chat beside the page with the question already asked, so the
agent explains the recommendation with its numbers, says what would make it
wrong and what it would do instead. It reads what you said about earlier
advice (Good advice, Bad advice) before it answers. It can also answer
questions about your audiences, and propose a campaign's places or a new
name, which wait for your OK like its other changes. The agent runs on the
workspace's own AI key ([Brand agent](/docs/agents/brand-agent/)).

## Coming next

Syncing whole segments to audiences on a schedule, new Meta ad sets and
campaigns, and judging new ads against the ones beside them are planned.
