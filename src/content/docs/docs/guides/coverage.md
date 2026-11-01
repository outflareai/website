---
title: Manage coverage and placements
description: Track brand mentions, backlinks, paid placements and publisher relationships, with publication checks, commercial delivery, maintenance work and growth reports.
sidebar:
  order: 15
---

Coverage brings your external presence and publisher relationships together. Use it for earned articles, comparisons, profiles, case studies, backlinks, paid editorial, newsletters and advertising.

Choose a [brand](/docs/guides/brands/), then open **Outreach → Coverage**. Its records belong to that brand. CRM permissions still control which contacts and conversations you can see.

## Find the right screen

| Screen | What to do there |
| --- | --- |
| Overview | Review tracked placements, page availability, growth and open work. |
| Work queue | Assign, prioritize, snooze and resolve publication, link, accuracy and relationship work. |
| Placements | Manage individual placements in a table or pipeline, with filters and saved views. |
| Publishers | Connect websites to CRM companies and review their placements and relationship context. |
| Commercial | Manage agreements, deliverables, invoices, payments, rate cards, budgets and documents. |
| Discovery | Review existing search and backlink discoveries before confirming placements. |
| Reports | Review growth, retention, delivery and recorded referral outcomes; save report snapshots. |

**Automations** configures maintenance rules and owners. **Settings** explains the source connections, Knowledge and permissions used by the module.

## Add a publisher and placement

A publisher website links to a CRM company. One company can own several websites, and each website can have many placements.

1. Select **Add placement** and enter a title.
2. Choose the publisher, or create the publisher and its CRM company without leaving the form.
3. Choose the format, such as **Blog**, **Comparison**, **Case study** or **Display ad**. Record the arrangement separately: earned, paid, exchange, affiliate or unknown.
4. Set the owner, stage and promised dates. Add the page URL when it exists. For a future article, newsletter or ad slot, you can start without a URL and describe its inventory location.
5. Link a contact or agreement when relevant. Under content and monitoring, set the expected brand wording, target URL, expected link attributes and checking cadence.

Different inventory positions can share a page URL. One agreement can also cover several placements and deliverables.

The pipeline records the team's progress. Page health records what Outflare observed. A placement marked **Live** can still have an unverified or inaccessible page.

### Import existing coverage

Select **Import CSV** from Placements. Match the file's columns to placement fields, then choose a default publisher or map a **Publisher website** column to match existing websites. Unmatched websites need a publisher before they can be imported.

Preview first: each row reports whether it is valid, a duplicate or needs correction. **Import valid rows** saves the accepted rows. The default **Treat imported placements as existing coverage** marks a historical baseline; importing a page does not establish when it was published.

Search, advanced all/any filters and private or team saved views help teammates maintain their own working lists. Bulk actions report individual failures, so a conflicting edit does not hide which rows succeeded.

## Discover new mentions and links

Discovery reuses your brand's existing [news searches](/docs/guides/news-watch/), link prospects and [backlink sources](/docs/guides/backlinks/). Configure saved searches inside Coverage or open the existing search and backlink modules. **Refresh discoveries** brings their results into the review list. If another batch remains, refresh again to continue.

[Geonode, Ahrefs and DataForSEO](/docs/integrations/seo/) run on your workspace's own connected accounts and budgets. No Outflare-provided key or fallback account is used. An integration stays unavailable until the workspace connects what it needs; manual records and available native checks remain usable.

Review each candidate, choose its publisher, and confirm or dismiss it. Matching pages are deduplicated, while source history is retained. A discovered page is not automatically classified as earned or counted as a newly published article.

## Check publication, links and accuracy

Open a placement's **Content & links** tab to queue a page check and inspect its observations. Checks retain the page URL, time, available text sample, target links, anchor text and observed rel attributes such as `nofollow`, `sponsored` and `ugc`.

A successful page load alone does not verify brand coverage: first verification needs a positive mention or backlink observation. Page loss or a missing/changed expected link needs two agreeing observations. Network failures preserve previous positive evidence. A missing rotating ad or newsletter placement cannot be inferred from a single sampled page; record its delivery evidence instead.

Native checks follow crawl restrictions. The explicit connected reader uses the workspace's Geonode connection and budget. Pausing monitoring also prevents an already queued scheduled check from fetching the placement.

### Review claims against Knowledge

Publish current customer-facing pricing, features and product facts in **Knowledge**, and configure a [workspace AI model](/docs/agents/ai-models/). After a successful page check, select **Review accuracy**.

The result shows the external quote beside the published Knowledge passage and version. Sentiment is separate from factual accuracy, and findings need human review. Historical statements and opinions should not be treated as incorrect current claims merely because they differ from today's positioning.

Changed or withdrawn Knowledge invalidates old assessments. You can also enable **Monitor accuracy** on a placement for scheduled review, no more often than daily and no more frequently than its page checks. Unchanged page text and Knowledge versions reuse the existing successful analysis. Model calls use the workspace's connection and budget.

AI can also suggest a placement format or prepare an editable thank-you, link request, correction or follow-up. A thank-you and a link request are separate purposes.

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

Separate commercial work tracks upcoming renewals, cancellation notices, invoices due and overdue delivery. Finance access does not follow automatically from ordinary Coverage access.

## Review growth over time

Reports distinguish three dates: when a placement was discovered, its recorded publication date, and when Outflare first verified a mention or backlink. Imported baseline inventory is visible separately from new publication.

Choose a period and placement filters to inspect the mix, publisher concentration, confirmed page losses and recoveries, and retention evidence. Select a format or arrangement in the mix to open its matching placements. Retention separates unverified observations from confirmed availability or loss.

Where website tracking and [attribution](/docs/guides/attribution/) are available, the recorded-outcomes panel shows publisher referral sessions, credited conversions and revenue by currency. It requires analytics permission and covers the brand's publisher websites; the placement filters above do not change that panel. Referrers and identity can be missing, and recorded attribution does not establish causal lift.

Save an immutable snapshot for a weekly review or export the displayed report. Snapshots retain their original period and definitions. Privileged live finance and attribution panels are not included in the saved snapshot.

## API and agents

The brand-scoped API starts at `/v1/brands/{brand}/coverage`. The TypeScript and Python SDKs expose the same operations, and MCP provides Coverage tools for records, checks, discovery, reviews, reports and commercial extraction.

Use `get_coverage_schema` to inspect available fields. Base records use `coverage.read` and `coverage.manage`; commercial data has separate finance scopes, and agreement approval requires `coverage.approve` and a human principal. Existing CRM, Knowledge and analytics access rules still apply.
