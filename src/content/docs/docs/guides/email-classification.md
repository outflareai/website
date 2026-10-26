---
title: Email classification
description: Find out whether an address or domain is a free mailbox, a private mailbox, an alias service, a throwaway inbox, a school, a government, or unknown.
---

<span class="pill shipped">Shipped</span>

Ask Outflare what kind of email address someone gave you before you let them sign up or add them to a list. It tells you whether the address is at a free mailbox like Gmail, a private one like Proton, an alias service like Hide My Email, a throwaway inbox, a school or a government, or that it doesn't know yet. With each answer you get the evidence and a suggested action.

It doesn't check that the mailbox exists or who owns it. [Email verification](/docs/integrations/email-verification/) does that.

```sh
curl https://outflare.example.com/v1/workspaces/$WS/classifications \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"email": "jo@proton.me"}'
```

Send `email` or `domain`, not both. Sending only the domain keeps the person's address out of the request. `GET /v1/workspaces/{ws}/email-domains/{domain}` is the same lookup. Your token needs the `leads.read` scope. Agents use the MCP tool `classify_email`.

## Categories

| Category | Means | Examples |
| --- | --- | --- |
| `free_personal` | A free consumer mailbox, including mail from internet providers | Gmail, Outlook.com, Yahoo, iCloud, BigPond |
| `private_mailbox` | A privacy-first or paid personal mailbox. Not a throwaway. | Proton, Tuta, Fastmail, Posteo |
| `relay_alias` | An alias that forwards to a real mailbox. Not a throwaway just because it forwards. | Hide My Email, Firefox Relay, SimpleLogin, addy.io, DuckDuckGo |
| `disposable` | A throwaway or temporary inbox | Mailinator and about 13,000 others |
| `education`, `government` | Read from the domain's ending (`.edu`, `.ac.uk`, `.gov.au`), so treat them as a strong hint, not proof | |
| `unknown` | Not enough evidence yet | Most company domains |

A company domain whose mail runs on Google Workspace or Microsoft 365 comes back `unknown`, not `business`. Having its own domain doesn't prove a business, so Outflare doesn't guess.

## What else you get

- **Attributes** such as `is_disposable`, `is_forwarder`, `is_free_provider`, `is_role_address` (info@, support@), `has_mx` and `mx_provider_id`. Each is `true`, `false` or `"unknown"`. No evidence means `"unknown"`, never `false`.
- **Confidence.** `confidence` stays empty until it has been measured against domains checked by hand. `confidence_status` tells you what the answer is based on: `verified` (a provider Outflare reviewed), `corroborated` (two lists agree), `inferred` (one list, or the domain's ending) or `insufficient_evidence`.
- **Risk.** A score from 0 to 100 with the reasons behind it, such as `listed_disposable_provider` or `no_mail_servers`. It describes the domain, not the person.
- **Evidence.** Each fact behind the answer and where it came from.
- **Suggested action** (`effective.action`): `allow`, `verify`, `review` or `block`. By default Outflare blocks throwaway domains and domains that can't receive mail, asks you to verify unknown domains, and allows the rest. It's only a suggestion; your sign-up flow makes the call.

## Researching the domains nobody knows

Most domains Outflare can't place say what they are on their own homepage: "free disposable email, no sign-up", "secure mailbox from €1 a month", or nothing about email at all. You can have those pages read.

It runs on your own accounts, because Outflare never lends you its API keys:

1. Connect **Geonode**, which fetches the page.
2. Connect an **AI model** with your own key under Settings → AI model. Claude Haiku is the cheap, accurate choice, and a researched domain costs a fraction of a cent.
3. Turn on **domain research** in the same settings.

After that, an unknown domain comes back with `analysis.status` of `queued`, Outflare reads the homepage in the background, and your next lookup answers `researched` with what it found:

```json
{
  "research": {
    "category": "disposable",
    "subcategory": "short_lived_mailbox",
    "confidence_status": "inferred",
    "signals": ["site_offers_temporary_addresses"],
    "note": "The site hands out inboxes that expire after ten minutes.",
    "model": "claude-haiku-5-5"
  }
}
```

Some things it won't do:

- **Spend without a ceiling.** Research stops at your monthly research limit, US$200 by default, or at your overall AI limit, whichever comes first. Set the limit to 0 to stop it. A domain is looked at again only after 90 days, and at most once a day.
- **Share what you paid for.** A verdict belongs to your workspace. Nobody else sees it, and it never changes the data Outflare ships.
- **Overrule what Outflare knows.** Where research disagrees with a reviewed provider, the reviewed answer stands and the suggested action becomes `review`, for a person to settle.
- **Do as a web page tells it.** The homepage goes to the model as quoted evidence, and the model is told to treat every word of it as evidence about the site, never as an instruction.

Research is off until you turn it on, and classification works without it.

## Where the data comes from

The data ships with Outflare, so a self-hosted server doesn't call anyone else for it. It comes from three places:

- providers Outflare has reviewed,
- the [disposable-email-domains](https://github.com/disposable-email-domains/disposable-email-domains) list (CC0),
- the [fakefilter](https://github.com/7c/fakefilter) list (BSD 3-Clause).

Reviewed providers win when a list disagrees. Mail-server details come from DNS. Nothing your workspace does changes this data, and no other customer's lookups go into it.

The free built-in checks in [email verification](/docs/integrations/email-verification/) use the same data. That means they block the same throwaway domains, and they count Proton as a private mailbox, not a free one.
