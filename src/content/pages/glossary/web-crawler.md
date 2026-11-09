---
title: What is a crawler in SEO? Web crawlers explained · Outflare
description: What a web crawler is in SEO, how Googlebot and AI crawlers find and read pages, how robots.txt controls them, and how an SEO crawler audits your own site.
h1: What is a web crawler in SEO?
label: Web crawler
term: Web crawler
lede: A web crawler is a program that finds web pages by following links and downloads them, so a search engine, an AI assistant or an SEO tool can read them. Here is how crawlers work and why they matter for SEO.
answer: "A web crawler (also called a spider or bot) is a program that discovers web pages by following links and reading sitemaps, then downloads them so they can be processed. In SEO, crawling is the first step of search: Google's crawler, Googlebot, fetches pages before Google can index and rank them. SEO crawlers, such as OutflareBot, crawl your own site the same way to find broken links, redirects, noindex pages and robots.txt blocks before they cost you traffic."
points:
  - Google Search works in three stages, starting with crawling
  - Crawlers find new URLs mainly through links on pages they already read
  - robots.txt tells crawlers which paths they may fetch
  - AI assistants run their own crawlers for search, training and user requests
docs:
  - label: Crawl and audit your sites
    href: /docs/guides/site-audits/
  - label: See what each page ranks for
    href: /docs/guides/keywords/
  - label: See how AI answers mention you
    href: /docs/guides/ai-visibility/
faqs:
  - q: What is a crawler in SEO?
    a: It is the program a search engine uses to find and download web pages, such as Googlebot. If a crawler can't reach a page, because of a broken link, a robots.txt rule or a server error, that page can't be indexed or ranked.
  - q: What is an SEO crawler?
    a: An SEO crawler is a tool that crawls your own website the way a search engine would, and reports problems such as broken links, redirect chains, missing titles, noindex pages and pages robots.txt blocks. Outflare's crawler is OutflareBot.
  - q: How do I stop a crawler from visiting my site?
    a: Add a rule for its user agent token to robots.txt at the root of your site, such as User-agent followed by the bot's name and Disallow /. Well-behaved crawlers, including Googlebot, OpenAI's and Anthropic's, follow it. Blocking a page in robots.txt doesn't always keep its URL out of Google's results; use noindex for that.
  - q: Should I block AI crawlers?
    a: It depends on the crawler. Blocking AI search crawlers such as OAI-SearchBot or Claude-SearchBot can keep your pages out of those assistants' search answers. Blocking training crawlers such as GPTBot, ClaudeBot or Google-Extended is a separate choice about model training.
  - q: Do crawlers run JavaScript?
    a: Googlebot does. Google says it renders pages and runs JavaScript with a recent version of Chrome. Many other crawlers read only the HTML as served, so a page built entirely in the browser can look empty to them.
related:
  - /product/seo/
  - /glossary/llm-visibility/
  - /glossary/ai-mode/
  - /best/rank-tracking-tools/
  - /best/seo-reporting-tools/
  - /product/ai-visibility/
checked: 2026-11-09
updated: 2026-11-09
order: 70
---

## How crawlers work

Google's [How Search works](https://developers.google.com/search/docs/fundamentals/how-search-works) describes three stages: crawling, indexing and serving results. In the first, "Google downloads text, images, and videos from pages it found on the internet with automated programs called crawlers". Its crawler, Googlebot, is "also known as a crawler, robot, bot, or spider".

A crawl follows the same loop for any crawler:

1. **Read robots.txt** to learn which paths the site allows.
2. **Start from known URLs:** a home page, a sitemap, links found earlier.
3. **Fetch a page** and record the response: 200, a redirect, a 404, an error.
4. **Extract links** and add new URLs to the queue. Google says Googlebot [finds new URLs mainly from links](https://developers.google.com/search/docs/crawling-indexing/googlebot) in pages it already crawled.
5. **Repeat,** at a pace the server can handle, slowing down when it answers slowly or with errors.

Crawling is not indexing. A crawled page may still not be indexed, and Google notes that blocking Googlebot from crawling a page doesn't stop its URL appearing in results.

## Kinds of crawler

| Crawler | Who runs it | What it is for |
| --- | --- | --- |
| Googlebot | Google | Crawling for Google Search |
| Google-Extended | Google | A robots.txt token to limit AI training and grounding in some of Google's other systems |
| OAI-SearchBot, GPTBot, ChatGPT-User | OpenAI | [Search, training and user requests](https://developers.openai.com/api/docs/bots) |
| Claude-SearchBot, ClaudeBot, Claude-User | Anthropic | [Search, training and user requests](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) |
| SEO crawlers, such as OutflareBot | SEO tools | Auditing sites for technical problems |

OpenAI says sites that opt out of OAI-SearchBot won't be shown in ChatGPT search answers, and that blocking GPTBot signals content shouldn't be used for training. Anthropic says the same split applies to its bots, and supports the non-standard `Crawl-delay` rule.

## Why crawlers matter for SEO

If a crawler can't reach a page, nothing else you do for it counts. Common causes:

- **Broken internal links** (404s) that lead crawlers nowhere.
- **Redirect chains** that send crawlers through several hops to reach a page.
- **robots.txt rules** that block more than intended.
- **noindex tags** left on pages that should rank.
- **Orphan pages** in the sitemap that nothing links to.
- **Firewalls and bot protection** that answer crawlers with a challenge page.
- **Pages built only by JavaScript**, which look empty to crawlers that don't render.

The same applies to AI search: an assistant can only cite pages its crawler may read. See [LLM visibility](/glossary/llm-visibility/).

## How to audit your site with a crawler

Outflare's [site audits](/docs/guides/site-audits/) crawl your own websites with its crawler, [OutflareBot](/bot/), which needs no connector or API key. It reads robots.txt and your sitemaps first, follows links from the start page one request at a time, and slows down on `429` or `503` answers, `Retry-After` or slow responses. Prove you own a site (a DNS record, meta tag or file) to crawl up to 10,000 pages instead of 100.

Each crawl records every page's status, redirects, noindex and robots.txt blocks, plus what an audit checks: titles, meta descriptions, canonicals, headings, structured data, images without alt text and links. Problems go on a fixes list you can hand to a person or a coding agent, and the next crawl confirms the fix. The same audit checks which AI crawlers your robots.txt allows.

Seeing OutflareBot in your logs? [outflare.ai/bot](/bot/) explains how it behaves, how to slow it down or block it with robots.txt, and the addresses Outflare Cloud crawls from. See [SEO](/product/seo/).
