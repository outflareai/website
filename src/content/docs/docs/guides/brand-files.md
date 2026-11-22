---
title: Brand files
description: Keep each brand's logos, fonts, product shots, screenshots, example ads, voices and pictures of people in one place, for ads and other content to be built from.
sidebar:
  order: 1.6
---

<span class="pill shipped">Shipped</span> Brand files in the REST API and the MCP server. A page for them in the web app comes next.

Brand files are what a [brand](/docs/guides/brands/) keeps to build ads and other content from: logos, fonts, product shots, screenshots, example ads, voices, pictures of people and screen recordings of the product. Each brand has its own, and one brand never sees another's.

Keeping them in one place means an agent, a teammate or a tool that makes a creative starts from the same logo and the same product shots, and never from a picture of someone who hasn't agreed to it.

## What a file has

- **Kind**: what it is for. The kind decides which types of file fit.

  | Kind | Takes |
  |---|---|
  | Logo, screenshot | A picture |
  | Product shot, example ad, person | A picture or a video |
  | Recording | A video |
  | Voice | A sound file |
  | Font | A font |
  | Other | Any of them |

- A **name**, a **note** on when to use it ("on dark backgrounds only") and up to 20 **tags**.
- Its **type** and, for a picture, its **size**. Outflare works these out from the file itself, never from its name, so a script renamed `logo.png` is refused.

Outflare takes pictures (PNG, JPEG, GIF, WebP, SVG), videos (MP4, WebM, MOV), sound (MP3, WAV, M4A, OGG) and fonts (TTF, OTF, WOFF, WOFF2), up to 50 MB each and 5,000 files per brand. Uploading a file the brand already has gives you the one it has, not a second copy.

## Voices and people need consent

A voice or a picture of a person shows or sounds like someone real. So it **can't be used** until someone on your team confirms that person agreed, with a note on how (a signed release and its date). Outflare records who confirmed it and when.

- Consent can be taken back at any time, and the file stops being usable straight away.
- Deleting a file removes it and every copy of it for good.
- Agents never confirm consent on their own. They ask you first.

## Archive or delete

**Archive** a file to stop using it for anything new while keeping it; restore it whenever you like. **Delete** is for good, for example when someone no longer agrees to their picture being used.

## For agents and the API

Agents connected over [MCP](/docs/agents/mcp/) look at a brand's files before making anything visual, and use only the ones marked usable. The tools are `list_brand_assets`, `get_brand_asset`, `upload_brand_asset`, `update_brand_asset`, `archive_brand_asset`, `restore_brand_asset` and `delete_brand_asset`.

Over the API the files are under `/v1/brands/{brand}/assets`. Reading needs the `content.read` scope and changing needs `content.manage`. For a picture, `/file?width=240` (or `480`, `960`, `1920`) returns a smaller copy.

## Self-hosting

Files live in your server's object storage, the same bucket as session recordings (`OUTFLARE_S3_*`). A server without a bucket keeps no files and says so.
