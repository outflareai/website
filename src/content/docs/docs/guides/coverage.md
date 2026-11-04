---
title: Manage your brand's presence
description: Track where your brand appears online (articles, backlinks, influencer posts, YouTube videos, forums, MCP directories, app listings and paid placements) with the partners behind them, publication checks, commercial delivery, maintenance work and growth reports.
sidebar:
  order: 15
---

Presence shows everywhere your brand appears online, and the publishers, agencies, partners and creators behind it. Use it for earned articles, comparisons, profiles, case studies, backlinks, influencer posts, YouTube videos, forum threads, MCP directory and app store listings, paid editorial, newsletters and advertising. It was called Coverage before, and the API still uses that name.

Choose a [brand](/docs/guides/brands/), then open **Outreach → Presence**. Its records belong to that brand. CRM permissions still control which contacts and conversations you can see.

## Find the right screen

| Screen | What to do there |
| --- | --- |
| Overview | Review tracked placements, page availability, growth and open work. |
| Work queue | Assign, prioritize, snooze and resolve publication, link, accuracy and relationship work. |
| Placements | Manage individual placements in a table or pipeline, with filters and saved views. |
| Publishers | Connect websites to CRM companies and review their placements and relationship context. |
| Commercial | Manage agreements, deliverables, invoices, payments, rate cards, budgets and documents. |
| Discovery | Review existing search and backlink discoveries before confirming placements. |
| Opportunities | Work the places worth your team's effort, ranked by SEO and AI answers together. |
| Competitors | See where your competitors appear and which of those sites you're not on yet. |
| Reports | Review growth, retention, delivery and recorded referral outcomes; save report snapshots. |

**Automations** configures maintenance rules and owners. **Settings** explains the source connections, Knowledge and permissions used by the module.

## Add a publisher and placement

A publisher website links to a CRM company. One company can own several websites, and each website can have many placements.

1. Select **Add placement** and enter a title.
2. Choose the publisher, or create the publisher and its CRM company without leaving the form.
3. Choose the format, such as **Blog**, **Comparison**, **Influencer post**, **YouTube video**, **Forum thread**, **MCP directory**, **App store listing** or **Banner**. Record the arrangement separately: paid, earned, organic (free and unprompted), exchange, affiliate or unknown. Under **Who delivered it**, choose in-house, agency or partner.
4. Set the owner, stage and promised dates. Add the page URL when it exists. For a future article, newsletter or ad slot, you can start without a URL and describe its inventory location.
5. Link a contact or agreement when relevant. Under content and monitoring, set the expected brand wording, target URL, expected link attributes and checking cadence.

Different inventory positions can share a page URL. One agreement can also cover several placements and deliverables.

The pipeline records the team's progress. Page health records what Outflare observed. A placement marked **Live** can still have an unverified or inaccessible page.

### Import existing coverage

Select **Import CSV** from Placements. Match the file's columns to placement fields, then choose a default publisher or map a **Publisher website** column to match existing websites. Unmatched websites need a publisher before they can be imported.

Preview first: each row reports whether it is valid, a duplicate or needs correction. **Import valid rows** saves the accepted rows. The default **Treat imported placements as existing coverage** marks a historical baseline; importing a page does not establish when it was published.

Search, advanced all/any filters and private or team saved views help teammates maintain their own working lists. Bulk actions report individual failures, so a conflicting edit does not hide which rows succeeded.

## Discover new mentions and links

Presence looks for new finds by itself once a day, from:

- your brand's [news searches](/docs/guides/news-watch/),
- [backlink sources](/docs/guides/backlinks/) and link prospects,
- posts your social watches found,
- pages that AI answers cite when they name your brand, from [AI visibility](/docs/guides/ai-visibility/),
- the brand's **web searches**, which read Google results.

Select **Refresh discoveries** to bring finds in straight away. If another batch remains, refresh again to continue.

Each find gets a type from its address: a YouTube video, a forum thread such as a Reddit post, an influencer post, a review site, an MCP directory, an app store listing, a comparison or a roundup. When the address doesn't say, the type is left empty for you to pick. Confirming the find makes a placement of that type.

### Web searches

Web searches sit at the top of **Discovery**. Each one reads the Google results for a query every day, week or month. Every result that isn't one of your brand's own pages becomes a find. A search for your brand's name, in quotes, is added on the first day, and you can add more, such as `"Your brand" alternatives` or `"Your brand" review`. **Run now** runs a search straight away, and **Pause** stops it.

Web searches run on your workspace's own [DataForSEO or Geonode connection](/docs/integrations/seo/), within that connection's budget. Until you connect one, each search shows **Needs a search results connection** and nothing is spent. News searches stay separate: they find recent articles, while web searches find the pages that rank.

[Geonode, Ahrefs and DataForSEO](/docs/integrations/seo/) always run on your workspace's own connected accounts and budgets. No Outflare-provided key or fallback account is used. An integration stays unavailable until the workspace connects what it needs; manual records and available native checks remain usable.

Review each candidate, choose its publisher, and confirm or dismiss it. Matching pages are deduplicated, while source history is retained. A discovered page is not automatically classified as earned or counted as a newly published article.

## See where competitors appear

**Competitors** scans each competitor you track on the [Competitors page](/docs/guides/competitors/). A scan reads:

- the Google results for the competitor's name,
- who links to the competitor's site,
- pages that AI answers cite when they name the competitor, from [AI visibility](/docs/guides/ai-visibility/).

Each page shows its type, the site's domain rating and traffic, and which of these found it. **Likely paid** appears only when there's a reason, such as a link marked sponsored, an affiliate code in the link, or "sponsored" in the page's address or title; hover over it to see which. Without one, it shows **Unknown**, because nobody outside the deal can know for sure. **Only sites we're not on** keeps the sites where your brand has no publisher yet: the places to go after.

Your top 10 competitors, by the keywords you share, are scanned weekly and the rest monthly. Change how many count as top and how often each group is scanned at the top of the tab, or give one competitor its own cadence. **Scan now** scans a competitor straight away.

Search results and links run on your workspace's own [DataForSEO, Geonode or Ahrefs connection](/docs/integrations/seo/), within that connection's budget. Until you connect one, the competitor says which connection each part needs, and nothing is spent. AI answers need no connection of their own.

## Work the best opportunities first

**Opportunities** lists the places worth your team's effort, with a score from 0 to 100. The score adds up:

- **SEO:** the site's domain rating and traffic.
- **AI answers:** how often answers to your brand's questions cite the site, from [AI visibility](/docs/guides/ai-visibility/).
- **Competitors:** how many of your competitors are there.
- **Page type:** comparisons, roundups, reviews, directories and listings score highest.
- **Relationship:** a site that already wrote about you is the easiest win.

Each opportunity says why it is there and what to do next:

| Why | Next step |
| --- | --- |
| Competitors are here, you aren't | Pitch to be included |
| AI answers cite it | Pitch to be included |
| Names you without a link | Ask for a link |
| Your link was removed | Win the link back |

**Pick** one to take it on, **Dismiss** one that isn't worth it, or mark it **Won**. Opportunities update every day and after each competitor scan, and one is marked won by itself once your brand has a publisher on that site or the link is back. Picking an opportunity contacts nobody: reach out through the [outreach workflow](/docs/guides/sequences/) with its normal approval and sending checks.

## Check publication, links and accuracy

Open a placement's **Content & links** tab to queue a page check and inspect its observations. Checks retain the page URL, time, available text sample, target links, anchor text and observed rel attributes such as `nofollow`, `sponsored` and `ugc`.

A successful page load alone does not verify brand coverage: first verification needs a positive mention or backlink observation. Page loss or a missing/changed expected link needs two agreeing observations. Network failures preserve previous positive evidence. A missing rotating ad or newsletter placement cannot be inferred from a single sampled page; record its delivery evidence instead.

Native checks follow crawl restrictions. The explicit connected reader uses the workspace's Geonode connection and budget. Pausing monitoring also prevents an already queued scheduled check from fetching the placement.

### Watch each placement over time

Every page check also asks two questions, even when you set no target page or wording: does the page link to any of your brand's domains, and does it name your brand? The placement shows **Links to us** or **No link**, and **Mentions us** or **No mention**. When either one was there before and two checks in a row see the page without it, the placement shows **Link removed** or **Mention removed**, with the date. When two checks agree the page is gone, it shows **Offline since** that date. All of these clear when the link, the mention or the page comes back.

A removed mention creates work in the queue, the same as a removed link. Turn either off under **Automations** with a rule. Finding your brand's name or a link to another of your pages doesn't count as first verification for a placement that expects specific wording or a specific target page.

### Review claims against Knowledge

Publish current customer-facing pricing, features and product facts in **Knowledge**, and configure a [workspace AI model](/docs/agents/ai-models/). After a successful page check, select **Review accuracy**.

The result shows the external quote beside the published Knowledge passage and version. Sentiment is separate from factual accuracy, and findings need human review. Historical statements and opinions should not be treated as incorrect current claims merely because they differ from today's positioning.

Changed or withdrawn Knowledge invalidates old assessments. You can also enable **Monitor accuracy** on a placement for scheduled review, no more often than daily and no more frequently than its page checks. When your brand's published Knowledge changes, such as new pricing or a renamed product, placements with **Monitor accuracy** on are checked again within a day, so the brand facts on each page are compared with what is true now. Unchanged page text and Knowledge versions reuse the existing successful analysis. Model calls use the workspace's connection and budget.

AI can also suggest a placement format or prepare an editable thank-you, link request, correction or follow-up. A thank-you and a link request are separate purposes.

## Link the CRM deal and partners

A placement and its deal in the CRM pipeline are the same piece of work. Edit a placement and choose its **CRM deal** under relationship and campaign; the deal must belong to the same brand. The placement's **Relationship** tab then shows **Open deal**, which opens the deal in a new tab.

Under **People and companies** on the same tab, add the CRM companies and people involved, each with a role: agency, partner, creator, author, editor, owner, account manager or other. Search finds both companies and people. The same record can hold several roles, and removing one keeps it in the placement's history. Seeing these records needs CRM read access.

## Maintain the relationship

Before contacting a publisher, open **Relationship** and review the accessible CRM history, relationship owner and contact preferences. The timeline can provide context from earlier conversations, including conversations unrelated to this placement. No accessible conversation is not proof that nobody has spoken to the publisher.

New verified earned coverage can create a relationship-review task. A publisher marked **Do not contact** does not receive that automatic introduction task. Review and edit any draft, then use the existing conversation or [outreach workflow](/docs/guides/sequences/) with its normal approval and sending checks. Discovery and page checks do not send messages.

Use Work queue to assign owners, set due dates, snooze work or record a resolution. Repeated evidence does not duplicate an open task. Dismissing an incident keeps the same evidence from immediately reopening it; a later recovery and new loss can create fresh work. Snoozing a task does not pause observations.

## Manage paid placements and advertising

Create an agreement with its publisher, currency, total commitment, dates, owner and terms. Add deliverables for articles, ad inventory or newsletter sends, with promised quantities, deadlines and delivery evidence. Optional allocations use the agreement's currency and cannot exceed its total.

Commercial records distinguish commitments, invoices, credits and payments. Partial payments and explicit reversals retain their history. The agreement total is counted once, even when several placements belong to it, and different currencies remain separate.

An authorized person can approve the current agreement version. Editing terms clears that approval. Recording or approving terms does not purchase inventory, renew a contract or send money.

For contracts, invoices or media kits, add a document link and paste the source text when you want AI assistance. **Extract terms** proposes supported amounts, currency, dates and terms with source quotes. Select the fields to review in the agreement form. Nothing changes until you save; saving revised terms requires reapproval.

For advertising and other inventory, add dated delivery reports with their source and evidence. Unknown impressions, clicks or conversions remain unknown. A publisher's delivery report and Outflare's recorded attribution are different measurements.

Separate commercial work tracks upcoming renewals, cancellation notices, invoices due and overdue delivery. Finance access does not follow automatically from ordinary Presence access.

## Review growth over time

Reports distinguish three dates: when a placement was discovered, its recorded publication date, and when Outflare first verified a mention or backlink. Imported baseline inventory is visible separately from new publication.

Choose a period and placement filters to inspect the mix, publisher concentration, confirmed page losses and recoveries, and retention evidence. Select a format or arrangement in the mix to open its matching placements. Retention separates unverified observations from confirmed availability or loss.

Where website tracking and [attribution](/docs/guides/attribution/) are available, the recorded-outcomes panel shows publisher referral sessions, credited conversions and revenue by currency. It requires analytics permission and covers the brand's publisher websites; the placement filters above do not change that panel. Referrers and identity can be missing, and recorded attribution does not establish causal lift.

### See momentum and share of voice

The Overview answers whether your placements are increasing or decreasing, and how fast. Momentum compares placements gained and lost in the last 28 days with the 28 days before, and says whether you are accelerating, growing, slowing, flat or shrinking. Its weighted figure counts a placement that links to you, and one that has taken off, for more than a bare mention. Twelve weeks of gained and lost placements show the trend.

Each live placement also gets a traction verdict every day: **Taking off** when AI answers cite it often or it sends many visits, **Steady** when it gets some, **Quiet** when it gets none, and **Too early** in its first two weeks. Citations come from your [AI visibility](/docs/guides/ai-visibility/) prompts and visits from your own website tracking, so traction stays unknown without them.

Share of voice sets your live placements against the sites each tracked competitor appears on.

Save an immutable snapshot for a weekly review or export the displayed report. Snapshots retain their original period and definitions. Privileged live finance and attribution panels are not included in the saved snapshot.

## API and agents

The brand-scoped API starts at `/v1/brands/{brand}/coverage`. The TypeScript and Python SDKs expose the same operations, and MCP provides Presence tools for records, checks, discovery, reviews, reports and commercial extraction. The people and companies on a placement are the `parties` resource; remove one with `delete_coverage_parties`. Web searches are the `searches` resource, and `run_coverage_search` runs one now. Competitor scans are `/coverage/competitors` and `/coverage/competitor_placements`; `list_coverage_competitor_placements` with `gap` lists the sites to go after, and `scan_coverage_competitor` scans one now. Opportunities are `/coverage/opportunities`; `list_coverage_opportunities` gives agents the next outreach, highest leverage first. Each placement carries `traction`, and the report from `get_coverage_reports` carries `momentum` and `share_of_voice`.

Use `get_coverage_schema` to inspect available fields. Base records use `coverage.read` and `coverage.manage`; commercial data has separate finance scopes, and agreement approval requires `coverage.approve` and a human principal. Existing CRM, Knowledge and analytics access rules still apply.
