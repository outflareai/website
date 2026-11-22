---
title: Brand profile
description: What your agents know about your company, kept as separate facts a person confirms.
sidebar:
  order: 1.44
---

<span class="pill shipped">Shipped</span> In the web app, the REST API and the MCP server.

The brand profile is what your agents know about your company: who you are, what you sell, who you serve, why customers pick you and how you sound. Every agent reads it before it writes or plans anything for the brand.

It is kept as separate facts, not a few long text boxes. An agent can point to the fact it used, and you can correct one fact without rewriting a page.

In the app, open **Company** in the sidebar, then **Brand profile**. Each [brand](/docs/guides/brands/) has its own profile, and a profile is never shared with another brand or another workspace.

## The twelve sections

| Section | The question it answers |
| --- | --- |
| Company | Who are we? |
| Offer | What do we sell, and for how much? |
| Customers and segments | Who do we serve, and who is not a fit? |
| Personas | Who is the person buying? |
| Positioning | Why us? |
| Proof | Why believe us? |
| Competitors | Who else do they look at? |
| Objections | What stops a deal, and what is the honest answer? |
| Voice | How do we sound? |
| Goals | What are we trying to do now? |
| Channels | Where do we reach them? |
| Rules | What must never happen? |

The overview lists each section with what agents know today, how many facts it holds and whether anything is waiting for you. Click a section to open it. **Back** returns to the overview.

## Facts

A fact is one statement in plain words, such as "14-day free trial, no card needed". Each fact shows:

- **Who can hear it.** *Can say to customers* means agents may use it in emails, posts, ads and replies. *Team only* means agents use it to plan and never say it to a customer. New facts are team only until you say otherwise.
- **Where it came from.** Typed by a person, your website, conversations, or found by AI, with the reason it is believed.
- **Status.** *Confirmed* (a person stands behind it) or *To confirm*.

To add one, open a section and choose **Add a fact**. To change one, click it, edit, and choose **Save**. **Retire** takes a fact out of use. Nothing is deleted: a retired fact stays in the history.

### Split a long fact

If you pasted a whole list into one fact, split it so each line stands on its own. Open the fact's menu and choose **Split into separate facts**. Outflare shows each line as its own box: reword one, or empty a box to leave that line out, then choose **Split**. Each new fact starts with the old fact's settings, and from then on you can confirm it, retire it, or allow it for customers by itself. The old fact is retired and stays in the history.

A list inside a fact shows as a list, in the overview and in each section. The five facts that come from About your company can't be split, because that text is kept whole.

## Only a person confirms

Agents can add to the profile, but only as suggestions. A suggestion is used for planning only and is never said to a customer until a person confirms it. An agent cannot confirm its own suggestion, and cannot change a fact a person confirmed. It can only suggest a replacement.

When suggestions are waiting, the overview says how many. **Review** lists them one by one with **Yes, that's right** and **Not true**. A suggestion that would replace a fact shows the fact it would replace. Saying yes writes it into that fact.

## Personas

A persona is a kind of person you sell to: who they are, what they want, what hurts today, what makes them start looking, what holds them back and where to reach them. A persona is a type, never a real person. Real people and companies live in [customer records](/docs/guides/customer-records/).

## History

**History** lists every change to the profile: who made it, when, and what it said before and after.

## About your company

The older "About your company" page under Knowledge still works. Its five fields (what the brand is, who it is for, goals, voice and rules) each appear in the profile as a fact. Change either one and the other follows.

## From the API and agents

Read the whole profile:

```sh
curl "https://app.outflare.ai/v1/brands/$BRAND/profile" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN"
```

Add a fact. From an API token it is saved as a suggestion:

```sh
curl -X POST "https://app.outflare.ai/v1/brands/$BRAND/profile/facts" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"section": "offer", "title": "Free trial", "text": "14-day free trial, no card needed.",
       "evidence": [{"note": "The pricing page says so", "ref": "https://northpeak.example/pricing"}]}'
```

Split a fact that holds several statements. With no `parts`, it is split at its list items and paragraphs. An API token can only split a suggestion:

```sh
curl -X POST "https://app.outflare.ai/v1/brands/$BRAND/profile/facts/$FACT/split" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"parts": ["14-day free trial.", "No card needed."]}'
```

Reading needs the `workspace.read` scope and writing needs `context.manage`. In a fact, `say_to_customers` is true only when it is confirmed and marked for customers. That one field is the test for using a fact in anything a customer reads.

Over MCP, agents use `get_brand_profile`, `suggest_profile_fact`, `update_profile_fact`, `split_profile_fact`, `list_personas`, `suggest_persona`, `update_persona` and `list_profile_changes`. The brand's context (`get_brand_context`) also carries the confirmed facts and personas.

The profile lives inside Outflare and calls no third-party service.
