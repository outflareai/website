---
title: Content
description: Posts and pages written for your own website, approved by you, and sent to your site through a webhook or copied and downloaded, without giving Outflare access to your code or CMS.
sidebar:
  order: 16
---

<span class="pill shipped">Shipped</span> The Content page, the `content.approved` and `content.delivered` webhook events, and reporting a page live, in the app, through the API and for agents.

**Content** (under SEO, `/<workspace>/<brand>/content`) lists the posts and pages written for a brand's website: drafts, approved ones and the ones that are live. Outflare writes them from your brand's context and knowledge base, and a person approves each one before it can go anywhere.

You stay in charge of your site. Outflare never needs access to your repository, your hosting or your CMS. An approved page reaches your site in one of two ways:

- **A webhook.** Your site, an automation tool (Zapier, Make, n8n), a GitHub Action in your own repository or a coding agent receives the whole page, puts it in place under your own review, and tells Outflare where it went live.
- **By hand.** Open the page in Content, copy it as Markdown (with front matter) or HTML, or download it as a `.md` file, and add it to your site yourself. Then press **Mark live** and paste its address.

Sites on WordPress or Ghost can also take content straight from a [connection](/docs/integrations/connectors/), as a draft there or live.

## Approve a page

Open a draft and press **Approve**. Only people who can manage content (the `content.manage` scope) can. Approving sends the `content.approved` webhook to every endpoint that listens for content events. Approving the same page again after an edit sends it again with a higher `revision`, so your receiver always knows which version is newest.

Before you approve, read the **Check before it goes live** box: facts the writer wants a person to confirm, such as a competitor's price.

## Send pages to your site

1. In **Settings → Webhooks**, add your receiver's URL and pick the **Content** events (or `content.*` over the API). See [Webhooks](/docs/api/webhooks/) for signatures and retries.
2. Approve a page. Your receiver gets `content.approved` with everything it needs (below).
3. When the page is live, report its address: `POST /v1/brands/{brand}/content/{id}/delivered` with `{"url": "https://acme.example/blog/a-post", "revision": 2}`. Agents use the `deliver_content` MCP tool. The page shows as **Live**, and Outflare starts measuring it. A `revision` older than the latest approval is refused, so an old version is never reported live.

```sh
curl -X POST "https://app.outflare.ai/v1/brands/$BRAND/content/$ID/delivered" \
  -H "Authorization: Bearer $OUTFLARE_TOKEN" -H "Content-Type: application/json" \
  -d '{"url": "https://acme.example/blog/acme-vs-northpeak", "revision": 2}'
```

## What the webhook carries

Fields a page doesn't have are left out.

| Field | What it is |
| --- | --- |
| `content_id`, `revision` | The page, and how many times it has been approved. Replace the version you have when the revision goes up. |
| `target`, `slug`, `brand` | Post or page, its slug, and the brand's id, name, handle and website. |
| `language` | A language tag such as `en-AU`. The page is written in it, with matching spelling, currency and units. |
| `placement` | Where it goes: `type` (post, page, landing, comparison, docs, glossary, faq, other), `collection`, `path`, `parent`, `template_hint` (an existing page whose layout to follow) and `nav_label`. |
| `content` | `title`, `excerpt`, the body as `markdown` and as `html` (raw HTML left out, unsafe links dropped), `tags`, `word_count` and `reading_minutes`. |
| `seo` | `meta_title`, `meta_description`, `primary_keyword`, `secondary_keywords`, `intent`, `robots`, `canonical`, Open Graph fields and `schema` (JSON-LD). |
| `links` | `internal` links to other pages on your site, `external` links (sources), and `add_links_from`: existing pages that should link to this one, with the text the link goes after. |
| `media` | Images, each with a `url`, `role` (featured, inline, social), `alt`, `caption`, size, `filename` and `credit`. Copy them onto your own storage. |
| `brief` | `goal`, `opportunity` (why the page exists), `measure`, `check_before_live`, `overlaps` (your pages competing for the same search, and what to do) and `redirects`. |
| `review`, `callback` | Who approved it and when, and the path and scope to report the live address to. |

## Over the API and MCP

Routes are under `/v1/brands/{brand}/content`. `content.read` lists and reads pages; `content.manage` writes, approves and reports them live. Set the delivery fields above with `language`, `placement`, `seo`, `links`, `media` and `brief` when you create or update a page. MCP tools: `list_content`, `get_content`, `create_content`, `update_content`, `publish_content` and `deliver_content`.

## Measuring

Once a page is live, its results come from Search Console clicks per page, [AI visibility](/docs/guides/ai-visibility/) citations and sign-ups [attributed](/docs/guides/attribution/) to it.
