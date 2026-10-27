---
title: Who can be emailed
description: Each person's contact basis, the rule for marketing email, the one opt-out list and how it stays in step with EmailBison, Instantly and Smartlead.
sidebar:
  order: 6.5
---

<span class="pill shipped">Shipped</span> Through the REST API and the MCP server.

Outflare connects the tools you send email with. It isn't an email service provider, and it expects you to play by the rules. It still keeps you from the mistakes that get domains blocked: smart defaults, a few hard stops where a send would clearly be wrong, and plain-words warnings for everything else.

## Each person's contact basis

Every person record says how you got them and what may go out to them (`contactability` on each record):

| Basis | Who | Cold outreach | Marketing email (newsletters, product updates, journeys) |
| --- | --- | --- | --- |
| Opted in | Agreed to marketing email: a sign-up form, the preference page or the consents API | Yes | Yes |
| Opted out | Took that back | No | No |
| Customer | Signed up, bought or used your product | Yes | Unless they said no |
| Third party | From a lead list, a data provider such as Apollo, a scrape, a sequencer import or a visitor reveal | Yes | **Never** without their own consent |
| Unknown | From a CRM, an import or added by hand, with nothing saying how you got them | Yes | Unless they said no |

Each record also names the tool it came from (`acquired_via`, such as `csv`, `apollo` or `attio`), and says yes or no for transactional, cold and marketing email with the reason in a sentence. Receipts and account email reach anyone who isn't blocked outright.

### People who never said yes or no

`GET`/`PATCH /contact-rules` (MCP `get_contact_rules`, `set_contact_rules`) sets what happens to customers and people of unknown origin:

- `inferred` (the default): they get marketing email unless they said no.
- `opt_in`: only people who agreed get it.

Either way, third-party leads never get marketing email until they agree. The rule applies to broadcasts, journeys and every lifecycle email at the moment it is sent, and a skipped person's reason says which rule kept them out.

### Warnings, not walls

A broadcast that hasn't started shows its audience by basis, with warnings in plain words. One says how many people are third-party leads who won't get it, and what to do instead. Another appears when a quarter or more of the audience has no record of how you got them. A scheduled broadcast with a warning is on Home's to-do list.

### Checking many people at once

`POST /recipients/check` (MCP `check_recipients`) answers for up to 1,000 addresses, each with a reason code. Pass `purpose`:

- `cold` (the default): only the opt-out list counts.
- `lifecycle`: the contact basis applies too.
- `transactional`: unsubscribes let receipts through.

## The opt-out list

One list that every send checks: every unsubscribe, bounce and complaint from any tool, and the entries people add (`GET /suppressions`, MCP `list_suppressions`). Each entry says:

- **Why** (`reason`).
  - `unsubscribed` and `competitor` stop cold and marketing email.
  - `customer` and `partner` keep people out of cold email only.
  - `bounced`, `complained`, `manual`, `legal` and `do_not_contact` stop every email.
- **How** (`method`).
  - `manual`: a person added it.
  - `automated`: a bounce, an unsubscribe link or a sync.
  - `ai_suggested`: the AI read a reply as an opt-out. It comes with the AI's confidence and the reply.
- **Who added it, and from which tool** (`source`), such as `unsubscribe_link`, `emailbison_sync` or a label you give, like `hubspot_export`.

Filter the list by reason, method, source or connection. To move a list over from another tool, add up to 100,000 emails or domains at once with `POST /suppressions` (MCP `add_suppressions`), giving its `source` and `reason`, for example `competitor` for rivals' domains.

## Kept in step with your sequencers

When EmailBison, Instantly or Smartlead is connected, every platform sync (every five minutes) works both ways:

1. **It reads the platform's blocklist into the opt-out list.** Addresses come in as `unsubscribed` and domains as `do_not_contact`. Smartlead's list can't be read, but its unsubscribed leads arrive with campaign imports.
2. **It writes the opt-out list to the platform's blocklist**, each entry once. Entries read from a platform are never written back to it.

So a campaign sent from the sequencer honours Outflare's list, and the other way round. `GET /suppression-syncs` (MCP `list_suppression_syncs`) shows each sync's counts and last error, and `PATCH /suppression-syncs/{integration}` turns reading or writing off. Nothing is ever removed from the platform's list.

Both run on your own connection to the sequencer.
