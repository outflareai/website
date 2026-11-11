---
title: Market several brands from one workspace · Outflare
description: Run several businesses from one Outflare workspace, each with its own website, context for agents, mailboxes, analytics and reports, with tools connected once.
h1: Several brands, one workspace.
label: Brands
lede: Many companies market more than one business. In Outflare each brand has its own website, context for agents, sequences, mailboxes and analytics, while your connectors, people and suppression list stay shared, so nothing is connected or invited twice.
answer: Brands let one Outflare workspace market several businesses, such as a company with two products on different websites. Each brand has its own website, context and memories for agents, sending domains, mailboxes, sequences, lead lists, analytics sites and reports. Connectors, team members, API tokens, leads and the suppression list are shared, and you can keep a person or an API token to some brands.
points:
  - Connect Google Analytics or Ahrefs once for every brand
  - A brand's mailboxes never send for another brand
  - Agents read each brand's own context and rules
  - People and tokens can be kept to some brands
docs:
  - label: Brands
    href: /docs/guides/brands/
  - label: Brand setup
    href: /docs/guides/brand-setup/
  - label: Memory and status
    href: /docs/agents/memory/
  - label: Workspaces and access
    href: /docs/guides/workspaces-and-access/
faqs:
  - q: What is a brand in Outflare?
    a: A brand is one business your company markets, with its own website. A workspace is one company, and it can hold several brands, each with its own context, mailboxes, sequences, analytics and reports.
  - q: Do I need to connect my tools again for each brand?
    a: No. Connectors belong to the workspace, so you connect Google Analytics, Search Console or Ahrefs once, and each brand reads its own property, site or account through that connection. A brand can also have its own connection, such as its own Plausible account, used only by it.
  - q: Can two brands email the same person?
    a: You can stop that. Turn on Contacting the same person and choose how many days to wait, and a brand's sequence skips anyone another brand emailed within that time. An unsubscribe from any brand always stops every brand.
  - q: Can I give a contractor access to just one brand?
    a: Yes. An operator or viewer can be kept to some brands, and an API token or MCP connection to one. They see those brands' records plus anything shared, and change only their own brands' records.
  - q: Does Outflare have agency accounts or white label?
    a: No. A workspace is one company with its brands inside it. To work for several companies, be a member of each workspace.
related:
  - /solutions/marketing-teams/
  - /product/agents/
  - /product/analytics/
  - /product/deliverability/
  - /product/outcomes/
  - /product/social/
updated: 2026-11-09
order: 65
---

## What each brand has, and what is shared

| Each brand's own | Shared by the workspace |
| --- | --- |
| Website and other domains, and links to its apps and socials | Connectors and their keys |
| Context for agents: about, audience, goals, voice and rules | Team members and roles |
| Memories, on top of the company's | API tokens |
| Sending domains, mailboxes, sequences and lead lists | Leads and the suppression list |
| Missions, analytics sites, SEO and site audits | The company's own context and rules |
| Reports and cost per meeting | |

A workspace without brands works exactly as before. Anything you leave out of a brand is shared and shows under **All brands**.

## Add a brand

Choose **Add a brand** in the brand switcher and give its name, website and where it ships: web, iOS, Android, TV and so on. Under **Links**, add its app store listings, socials and docs. With your own [Geonode](/docs/integrations/connectors/) connection, Outflare reads the brand's website and suggests the socials and listings it links to, and with your own AI model it also writes **What the website says**: a summary of the business, its products, features and who it serves, each linked to its page.

Each brand has a [setup checklist](/docs/guides/brand-setup/): the website script, its DNS records in one go, then analytics, Search Console, email, payments, ads, social and a CRM.

## Context for agents

Each brand's **About** is read by agents on top of the company's context. Its rules add to the company's and never replace them, so a rule such as "never mention our other brand" keeps every company-wide rule. Memories belong to the company or to one brand, and an agent working on one brand never reads another brand's memories. **How our brands relate**, on the Company page, says what the brands share and when one may mention another. See [Memory and status](/docs/agents/memory/).

## One brand at a time

The brand picker at the top of the sidebar narrows every page to one brand: sequences, lists, mailboxes, domains, missions, connectors, SEO, analytics and site audits. The brand is part of every link, so a link you share opens on the same brand. **All brands** shows everything side by side, with each record's brand.

## Mailboxes and sending

A brand's mailboxes send for that brand's sequences and never for another's, so one brand never emails from another brand's domain. Shared mailboxes can send for any sequence. Turn on **Contacting the same person** to stop two brands cold emailing someone within a number of days you choose.

## Analytics by brand

Connect Google Analytics once, and each property goes to a brand, is shared by all brands, or isn't imported. Outflare suggests the brand from each site's domain and says why, and never makes a brand on its own. SEO and analytics through a shared connection count each website for the brand whose domains include it, so a brand only sees its own keywords and traffic.

## Reports by brand

[Sending reports](/docs/guides/reports/) and [cost per meeting](/product/outcomes/) follow the brand you picked and can group by brand to compare them. Webhooks, the audit log and the events feed can be kept to one brand.

## Keep people and tokens to some brands

Owners and admins see every brand. An operator or viewer can be kept to some brands, and an API token, including an [MCP connection](/product/mcp/), to one. They see their brands' records plus anything shared, change only their own brands' records, and can't use what needs every brand, such as workspace settings, webhooks, missions and connecting tools.

## What brands are not

Outflare has no agency accounts and no white label. A workspace is one company, and a company with several businesses runs them as brands inside it.
