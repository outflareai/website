---
title: Content
description: Posts and pages written for your own website, approved by you, and sent to your site through a webhook or copied and downloaded, without giving Outflare access to your code or CMS.
sidebar:
  order: 16
---

<span class="pill shipped">Shipped</span> The Content page, the `content.approved` and `content.delivered` webhook events, the GitHub Action, and reporting a page live, in the app, through the API and for agents.

**Content** (under SEO, `/<workspace>/<brand>/content`) lists the posts and pages written for a brand's website: drafts, approved ones and the ones that are live. Outflare writes them from your brand's context and knowledge base, and a person approves each one before it can go anywhere.

You stay in charge of your site. Outflare never needs access to your repository, your hosting or your CMS. An approved page reaches your site in one of two ways:

- **A pull request.** If your site lives in a GitHub repository, the Outflare content GitHub Action runs in that repository and opens a pull request for each approved page. You review and merge it like any other change.
- **A webhook.** Your site, an automation tool (Zapier, Make, n8n) or a coding agent receives the whole page, puts it in place under your own review, and tells Outflare where it went live.
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

## Pull requests in your repository

For sites built from a GitHub repository (Astro, Next.js, Hugo, Eleventy, Jekyll, Docusaurus and the like). The action runs in your repository, on your schedule, with an Outflare token you keep in your own secrets, so Outflare never gets access to the repository.

1. Make an API token with the `content.read` and `content.manage` scopes (**Settings → API tokens**) and add it to your repository as the secret `OUTFLARE_TOKEN`.
2. Add `.github/workflows/outflare-content.yml`, with your brand's id, where page files go, and your site's address:

```yaml
name: Outflare content
on:
  schedule:
    - cron: "*/30 * * * *"
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

concurrency: outflare-content

jobs:
  content:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: outflareai/outflare/integrations/github-action/content@main
        with:
          outflare-token: ${{ secrets.OUTFLARE_TOKEN }}
          brand: 00000000-0000-0000-0000-000000000000
          path: src/content/blog/{slug}.md
          site-url: https://acme.example
          url: /blog/{slug}/
```

Each run:

- **Opens a pull request** for each approved page. The page is a Markdown file with front matter (title, description, language, keyword, image and more), on its own branch. The pull request lists what to check before it goes live, where the page goes, which of your pages should link to it, and its images.
- **Updates that pull request** when the page is approved again in Outflare. A pull request you close isn't opened again until the page is approved again.
- **Reports the page live** at its address once the pull request is merged.

`path` and `url` take `{slug}`, `{id}`, `{language}`, `{collection}` and `{target}`; `url` also takes `{path}`, the page's placement path. Set `report-live: false` to report from your own deploy instead. Pull requests opened with the default GitHub token don't start your other workflows; pass a GitHub App or fine-grained token as `github-token` if your checks should run on them. The action's README in the [Outflare repository](https://github.com/outflareai/outflare/tree/main/integrations/github-action/content) lists every input.

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
