---
title: Talking videos
description: Make a video of a person saying your script to the camera on your own ElevenLabs and fal.ai accounts, then fix or remove single words without making it again.
sidebar:
  order: 1.9
---

<span class="pill shipped">Shipped</span> In the REST API and the MCP server. Pages for it in the web app come next.

A talking video is a person in a scene saying a script to the camera: the kind of ad that looks filmed on a phone. Outflare makes one stage by stage, keeps what every stage made, and lets you fix or remove a word afterwards without paying for the whole video again.

## Your own accounts, always

Every stage that calls a provider is a request like any other [picture, video or voice](/docs/guides/pictures-video-voice/): it runs on an account the workspace connected itself ([Connectors](/docs/integrations/connectors/)) and is paid by the workspace to that provider. Outflare has no account of its own for this, on Outflare Cloud or self-hosted. Without the connections nothing is made, and the answer names what to connect.

- **ElevenLabs** reads the script and times every word. The key needs Text to Speech and Speech to Text.
- **fal.ai** renders the video and upscales it.

## The stages

`POST /v1/brands/{brand}/videos` with the script, the picture to start from and the model of every stage:

```json
{
  "name": "Kitchen ad",
  "script": "Meet Northpeak, the fastest way to ship.",
  "direction": "A woman in a kitchen talks to her phone camera, handheld, morning light.",
  "scene_asset_id": "…",
  "settings": {
    "voice": { "voice": "<a voice id>", "model": "<an ElevenLabs speech model>" },
    "words": { "model": "<an ElevenLabs speech to text model>" },
    "video": { "model": "<a fal.ai video model that takes a picture and a sound file>", "options": { "resolution": "480p", "aspect_ratio": "9:16" } },
    "upscale": { "model": "<a fal.ai video upscaler>", "options": { "target_resolution": "1080p" } },
    "finish": { "tighten": true, "phone_look": true, "captions": true }
  }
}
```

| Stage | What happens | Where |
|---|---|---|
| `voice` | The script is read out in the voice you name. The voice comes first, because a video model given only the text slurs words. | ElevenLabs |
| `words` | Long pauses are closed, then every word is timed. A word the voice read differently from the script is listed in `notes` with its time. | Outflare, ElevenLabs |
| `render` | The video is made to that voice-over, from the scene picture, your direction and the script. | fal.ai |
| `upscale` | The render is made large. Rendering small and upscaling costs far less than rendering large. Leave `settings.upscale` out to skip it. | fal.ai |
| `finish` | The look of a phone camera (a little grain and sharpening, a phone's compression) and captions that appear as the words are said. Each is a switch under `settings.finish`. | Outflare |

The answer is the video with `status: working`. Read `GET /v1/brands/{brand}/videos/{video}` until it is `ready`, when `final_asset_id` is the finished file among the [brand's files](/docs/guides/brand-files/), or `failed`, when `error_code` and `error` say why.

Every model is yours to name. There are no defaults, because providers rename and retire models often. `scene_as`, `audio_as` and `video_as` are the models' own names for their inputs, for a model that doesn't use `image_urls`, `audio_urls` and `video_url`.

The voice-over may run as long as the video model takes in one request: 30 seconds unless `settings.video.max_seconds` says otherwise. A longer one fails with `video_too_long` before anything is rendered. A brand makes at most 50 videos in 24 hours.

## The scene picture

The picture decides how real the video looks. A good way to make one: take a frame of a real video shot where you want yours to be, upload it as a brand file, and ask for a picture with that frame as a reference and a prompt for a different person in the same place ([Starting from your own files](/docs/guides/pictures-video-voice/#starting-from-your-own-files)). Keep the picture: used again as `scene_asset_id`, it keeps the person and the place the same across videos.

A picture of a real person, or a cloned voice, is used only with that person's agreement: a brand file kept as a `person` or a `voice` can't be used until someone confirms the person agreed.

## What each stage kept

`steps` on a video lists what every stage did: the file it made and, for a provider, the request it ran, which holds its recipe (exactly what was sent and what came back). A stage is sent to a provider once. When a video fails, `POST /v1/brands/{brand}/videos/{video}/retry` starts it again at the stage that failed; the stages before it are kept and not paid for again.

## Editing by the words

A ready video lists every word with its time in `words`. `POST /v1/brands/{brand}/videos/{video}/edits` picks words by position (`from` and `to`, counted from 0):

- `{"action": "remove", "from": 4, "to": 6}` cuts those words out and closes the gap.
- `{"action": "redo", "from": 4, "to": 4, "text": "Northpeak", "say": "north peek"}` has them said again and stitched in, for a word the voice read wrong or words you want changed. `text` is what to show in their place (left out: the same words) and `say` is how to spell them for the voice.

For a redo the voice reads only that stretch, the video model renders only that stretch, starting on the frame the old one started on, and it is upscaled and stitched in. A stretch shorter than two seconds takes in the words next to it, since a video model renders no less. Both edits end with the finish again, so the captions follow the new words. One edit runs at a time, and one that fails leaves the video ready as it was, with `error` saying why.

A redo costs a short voice-over, its word timings and a few seconds of video: a fraction of the whole.

Add `note` to an edit to say what is wrong in your own words. The video model is told it, and it is kept in the video's history.

## Keep the fix or go back

A fix never replaces your video by itself. When it is ready it waits as a new version (`waiting_version` on the video), and the video stays as it was until a person answers:

- `POST .../videos/{video}/fix/keep` makes the fix the video. The version before it is kept. `{"remember": true}` also saves how the fix spelled its words for the voice, so every later voice-over says them that way.
- `POST .../videos/{video}/fix/go-back` leaves the video as it was. `reason` and `note` say why, and the fix stays among the versions with them. `{"try_again": true}` makes the same fix again with your note told to the video model (and `say` to the voice), which costs another short voice-over and stretch of video.

`versions` on a video lists every version with its number and state. `POST .../videos/{video}/versions/{number}/restore` makes any earlier version, or a fix you turned down, the video again; the one it replaces is kept.

## Like it and make more

`POST .../videos/{video}/rating` records `liked` or `not_this` with a `reason` (an empty rating takes it back). It is an opinion, separate from anything else: liked marks what to make more of.

`POST .../videos/{video}/variations` makes more of a video that works. Each value makes one new video that is the same except for one thing:

| `change` | Each value is |
| --- | --- |
| `first_line` | A new first sentence for the script |
| `direction` | How it looks and moves |
| `scene` | The id of another scene picture |
| `voice` | Another voice id |

Up to five at a time. Each is a whole new video and costs what a video costs. `GET .../videos?family={video}` lists a video and its variations together.

## Lessons

Something you say once can hold for everything made later. `GET` and `POST /v1/brands/{brand}/creative-lessons` list and add the brand's lessons, and `DELETE .../creative-lessons/{lesson}` stops one being used:

- `{"kind": "say", "word": "Northpeak", "say": "north peek"}` is read that way by every voice-over.
- `{"kind": "rule", "rule": "No stock-photo smiles", "applies_to": "image"}` is added to every prompt for pictures, videos (`video`) or both (`all`).

## One history

`GET .../videos/{video}/history` lists everything that happened to a video, newest first, with who did it and what they said: made, each fix asked for, each fix kept, turned down or failed, versions gone back to, likes and variations.

## Self-hosting

The steps Outflare does itself (closing pauses, the phone-camera look, captions and edits) need `ffmpeg` and `ffprobe` on the server, with the H.264 and AAC encoders. Without them videos are still made, as the model made them, each video's `notes` says what was left out, and edits answer `not_configured`. Files are kept in the server's object storage (`OUTFLARE_S3_*`).

## For agents

The MCP server has `create_brand_video`, `get_brand_video`, `list_brand_videos`, `edit_brand_video`, `retry_brand_video`, `update_brand_video` and `delete_brand_video`, and for the answers `keep_brand_video_fix`, `go_back_brand_video_fix`, `restore_brand_video_version`, `rate_brand_video`, `create_brand_video_variations`, `get_brand_video_history`, `list_creative_lessons`, `add_creative_lesson` and `remove_creative_lesson`. An agent shows a waiting fix and asks: it keeps one or goes back only when the person said so. An agent is told that every stage costs the brand money, to make only what was asked for, and to ask which models to use.
