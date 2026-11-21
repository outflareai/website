---
title: Skills and creatives
description: Save a recipe for each kind of ad, split-test its prompts, and make ads from it on your own AI account. Every creative waits for a person's yes.
sidebar:
  order: 1.8
---

<span class="pill shipped">Shipped</span> In the web app under **Paid ads**, on the **Creatives** tab (Start here, Library, Skills and prompts, Brand kit), in the REST API and in the MCP server.

A brand makes its ads from **skills**: saved recipes for one kind of ad each. A **creative** is one ad made from a skill, for one persona and one pain. Every creative records the skill, the version and the prompt that made it, plus its tags, so results can later be compared by any of them: which prompt, which persona, which opening pays.

The picture or video is made on the brand's own AI account ([Pictures, video and voice](/docs/guides/pictures-video-voice/)) and kept with the [brand's files](/docs/guides/brand-files/). Outflare has no AI account of its own for this: without a connected provider nothing is made, and the answer names what to connect.

## Start here

**Start here** leads the Creatives pages for a brand's first ad. It shows four steps and which one is next:

1. **Add your brand files**: your logo and a few screenshots of your product, in the Brand kit.
2. **Connect your AI accounts**: one account that makes pictures is enough to start. It is your own account and the provider bills you; Outflare has none of its own, so nothing is made until one is connected under Connectors ([Pictures, video and voice](/docs/guides/pictures-video-voice/)).
3. **Pick a starter skill**: Problem first, One number, or Before and after. Each is added with one click and comes with two prompts sharing the creatives between them, plus rules that keep pictures from looking AI-made. You can read the prompts before adding one.
4. **Make your first creative**: open the skill, press **Make a creative**, and say who it is for, the pain and one proof.

Type the picture model's id once, as your AI account names it; Outflare has no default. A starter skill is an ordinary skill once added, so everything below applies to it. Ideas for the first creative come from the personas in the [brand profile](/docs/guides/brand-profile/).

### Say what you want

Under the starter skills is a box for an ad described in your own words, such as "an ad for hikers tired of heavy packs; lead with our weight". **Write the prompt** has the workspace's own AI model draft a skill from it: a name, the prompt for the picture and how to write the words over it. It reads your description and what the brand says about itself (its context and personas), never your customers. Where it needs a number or a proof it wasn't given, it leaves a fill-in in curly brackets instead of inventing one.

Read the draft, change anything and press **Save as a skill**. Until then nothing is saved, and no picture is made or paid for. The draft runs on your own AI model connection and counts toward your AI spend limits (AI tool **Creative prompts**); without one connected, the box says so and links to Connectors.

Over the API, `POST /v1/brands/{brand}/creative-skill-drafts` with a `description` queues a draft, and `GET /v1/brands/{brand}/creative-skill-drafts/{draft}` reads it until its `status` is `ready` or `failed`. Save it with `POST /v1/brands/{brand}/creative-skills` and the picture model you choose.

## Skills

A skill has a name, what it makes (`image` or `video`), an On/Off switch, and a recipe:

- **variants**: one to four prompts. Each has a `picture` (what the AI model is asked to make), a `copy` (how to write the headline, second line and button that are laid over the picture) and a `share`.
- **model** and **provider**: the provider's own id for the AI model, and which of the brand's accounts makes it. There is no default model: providers retire and rename models every few months, so the model is always a setting of the skill.
- **options**: the model's own settings, passed on as they are.
- **sizes**: the shapes the ad is wanted in, such as `1:1`, `4:5`, `9:16`, `16:9`.
- **rules**: added to every prompt, such as what must never be in the picture.

Words in curly brackets are filled in for each creative. `{persona}`, `{pain}`, `{hook}` and `{brand}` come from the creative itself; any other, such as `{proof}` or `{brand fact}`, is given when the creative is made. A skill lists the brackets each prompt needs as `fill_ins`.

```json
{
  "name": "Static ad",
  "kind": "image",
  "model": "your-image-model",
  "sizes": ["1:1", "4:5"],
  "rules": "Never: stock-photo look, extra text in the picture, fake logos.",
  "variants": [
    { "name": "Problem first", "picture": "A {persona} at their desk, stuck on {pain}.", "copy": "Name {pain} as a question. At most 6 words.", "share": 50 },
    { "name": "One number", "picture": "One picture that shows {proof} at a glance.", "copy": "Lead with one number. At most 6 words.", "share": 50 }
  ]
}
```

### Versions

`PATCH /v1/brands/{brand}/creative-skills/{skill}` changes the name, description and switch in place. A change to the prompts, model, provider, options, sizes or rules is saved as a **new version**, with a `note` saying what changed. Earlier versions are never edited, so a creative made by version 3 still shows exactly what version 3 was. `restore_version` goes back to an earlier version by saving it as a new one. `GET .../versions` lists them all, with how many creatives each made.

### Split tests

A version with more than one prompt taking a share is a split test (`split_test: true`). New creatives are shared between the prompts by their shares: each one is made by the prompt furthest behind its share, unless you name a `variant`. To end a test, save a version with only the winning prompt.

## Creatives

`POST /v1/brands/{brand}/creatives` with a `skill_id`, the `persona` and `pain` it is for, the words for any other curly brackets in `fill_ins`, and the words to lay over the picture (`headline`, `subline`, `cta`):

```json
{
  "skill_id": "…",
  "persona": "Agency owner",
  "pain": "unclear pricing",
  "fill_ins": { "proof": "one price per GB, no contract" },
  "headline": "Pay per GB. No contract.",
  "cta": "Start free",
  "tags": ["pricing"]
}
```

The prompt is filled in and sent to the brand's AI account once. A bracket with no word is refused before anything is sent, so nothing is paid for a prompt with a hole in it. The creative gets a short code within the brand (`CR-0142`) and a status:

| Status | Meaning |
|---|---|
| `making` | The AI account is working on it. |
| `failed` | It ended without a file; `error_code` and `error` say why. |
| `needs_review` | The file is there (`asset_id`) and it waits for a person. |
| `approved`, `rejected` | A person's answer. A rejection keeps its reason. |

`POST .../creatives/{creative}/approve` and `.../reject` record the answer. Nothing reaches an ad network without a yes. `PATCH` renames a creative or changes its tags and words; no new picture is made or paid for.

`POST .../creatives/{creative}/rating` records `liked` or `not_this` with a `reason`, separate from approving (an empty rating takes it back). A reason worth keeping can be saved as a rule for every new picture ([Lessons](/docs/guides/talking-videos/#lessons)): rules are added to every prompt by themselves. `GET .../creatives/{creative}/history` lists everything that happened to a creative, newest first, with who did it: made, its words changed, approved, rejected with the reason, liked or not.

The list filters by `status`, `skill_id`, `kind`, `persona`, `pain`, `tag` and `q` (part of a name or headline).

## The finished ad

The picture the AI account makes carries no words. Outflare lays the headline, second line, button and the brand's logo over it:

`GET /v1/brands/{brand}/creatives/{creative}/ad?size=4:5&width=1080`

- **size**: the shape, as width:height (`1:1`, `4:5`, `9:16`, `16:9`, or any other up to three times as wide as tall or as tall as wide). The picture is cropped around its middle to fit. Left out, the picture's own shape.
- **width**: 240 to 2160 pixels, 1080 when left out. **format**: `jpeg` (default) or `png`. **logo=false** leaves the logo out; **download=true** saves it as a file.

So one picture gives the ad in every size, and changing the words costs nothing: the ad is drawn from the creative as it is now, and no copy of it is kept. It uses the newest logo (PNG, JPEG, WebP or GIF) and font (TTF or OTF) among the [brand's files](/docs/guides/brand-files/), a built-in font when the brand has none, and the brand's primary colour for the button. Only pictures are drawn; a video creative is its own file.

## Limits

A brand keeps at most 100 skills, each with up to 4 prompts and 500 versions. Creatives count toward the brand's 200 pictures, videos and recordings in 24 hours. Finished files need object storage (`OUTFLARE_S3_*`).

## For agents

The MCP server has a tool for each call: `list_creative_skills`, `get_creative_skill`, `list_creative_skill_versions`, `create_creative_skill`, `update_creative_skill`, `list_creatives`, `get_creative`, `create_creative`, `update_creative`, `approve_creative`, `reject_creative`, `rate_creative` and `get_creative_history`, plus `draft_creative_skill` and `get_creative_skill_draft` to draft a skill from an ad described in words. An agent writes the headline as the prompt's `copy` says, makes only what the person asked for, and approves only when the person said so.
