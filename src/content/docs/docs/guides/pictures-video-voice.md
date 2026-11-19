---
title: Pictures, video and voice
description: Have a picture, a video or a voice recording made on your own OpenAI, fal.ai or ElevenLabs account, and keep it with the brand's files.
sidebar:
  order: 1.7
---

<span class="pill shipped">Shipped</span> In the REST API and the MCP server. Pages for it in the web app come next.

A brand can ask an AI account of its own for a picture, a video or a voice recording, and Outflare keeps the finished file with the [brand's files](/docs/guides/brand-files/). Ads and other content are then built from it like from any other file.

## Your own accounts, always

Every request runs on an account the workspace connected itself ([Connectors](/docs/integrations/connectors/)), and is paid by the workspace to that provider. Outflare has no account of its own for this, on Outflare Cloud or self-hosted: without the connection nothing is made, and the answer names what to connect.

| To make | Connect | Where |
|---|---|---|
| A picture | OpenAI, or fal.ai | OpenAI under Connectors, AI models (the same key your AI model uses); fal.ai under Connectors, Pictures, video and voice |
| A video | fal.ai | Connectors, Pictures, video and voice |
| A voice recording | ElevenLabs | Connectors, Pictures, video and voice |

Connecting fal.ai or ElevenLabs checks the key without spending anything; ElevenLabs also shows the plan and the characters left. One fal.ai key reaches many models (Seedance, Kling, Veo and others), each at its own price.

`GET /v1/brands/{brand}/generations/providers` says which of these the brand has connected.

## Asking for a file

`POST /v1/brands/{brand}/generations` with:

- **kind**: `image`, `video` or `voice`.
- **model**: the provider's own id for the model. There is no default: providers retire and rename models every few months, so the model is always your choice. For fal.ai it is the model's endpoint as its page shows it, `owner/app/path`.
- **prompt**: what to make. For a voice, the script to read out.
- **voice**, for a voice: the id of the voice that reads it, from `GET /v1/brands/{brand}/generations/voices`.
- **options**: the model's own settings, passed on as they are. For OpenAI pictures: `size`, `quality`, `background`, `output_format`, `output_compression`, `moderation`, `complexity`. For fal.ai: whatever the model's page lists, such as `duration`, `aspect_ratio` or `image_url`. For ElevenLabs: `output_format` (MP3 only), `language_code`, `voice_settings`, `seed`, `previous_text`, `next_text`, `apply_text_normalization`.
- **provider**, when the brand has more than one account for the kind.
- **asset_kind** and **name**: what the file is kept as among the brand's files (`other` when left out) and what it is called.

```json
{
  "kind": "video",
  "model": "owner/app/text-to-video",
  "prompt": "A laptop on a desk, the screen lighting up",
  "options": { "duration": 5, "aspect_ratio": "9:16" },
  "asset_kind": "example_ad"
}
```

The answer is the request with `status: queued`. Read it (`GET /v1/brands/{brand}/generations/{id}`) until it is `done`, when `asset_id` is the brand file, or `failed`, when `error_code` and `error` say why. A picture or a recording takes seconds to a few minutes; a video can take many minutes.

## Paid once

A request is sent to the provider once. A video that renders for minutes is asked about until it is ready, never started again. If Outflare is interrupted between sending a request and noting the answer, the request fails with `generation_interrupted` instead of being sent a second time: check the provider's own history before asking again.

A provider that hasn't finished in 45 minutes fails the request with `generation_timed_out`. A brand makes at most 200 files in 24 hours, so a runaway script can't empty an account.

## When it fails

| `error_code` | What happened |
|---|---|
| `connector_invalid` | The provider refused the request: a prompt its rules don't allow, a setting the model doesn't have, a model that doesn't exist. `error` has the provider's words. |
| `connector_auth` | The provider no longer accepts the key. Reconnect it. |
| `connector_quota` | The account is out of credit or rate limited. |
| `connector_unavailable` | The provider couldn't be reached after several tries. |
| `connector_needed` | The connection was removed before the request ran. |
| `generation_failed` | The provider's model ended without a file. |
| `generation_timed_out`, `generation_interrupted` | See above. |
| `generation_wrong_file` | The provider answered with another type of file than was asked for. |
| `unavailable`, `not_configured` | The server's file storage failed or is missing (`OUTFLARE_S3_*`). |

## People and voices

A file kept as a `person` or a `voice` can't be used until someone confirms the person agreed, like any other [brand file](/docs/guides/brand-files/). Use a cloned voice of a real person, or a picture of one as a reference, only with that person's agreement.

## For agents

The MCP server has `list_generation_providers`, `list_generation_voices`, `create_brand_generation`, `get_brand_generation` and `list_brand_generations`. An agent is told that every request costs the brand money, to make only what was asked for, and to ask which model to use.

## Ads from saved recipes

To make ads the same way every time, and to see which prompt makes the better ones, save the prompt as a skill and make creatives from it: see [Skills and creatives](/docs/guides/skills-and-creatives/).
