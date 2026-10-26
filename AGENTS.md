# AGENTS.md

Instructions for coding agents (and humans) working on outflare.ai, the marketing site and docs for **Outflare**. Use only that name: never any other product name, and the domain is always `outflare.ai` (no `www`). The engine's own rules are in [`outflareai/outflare` AGENTS.md](https://github.com/outflareai/outflare/blob/main/AGENTS.md); this file adds what is specific to the site.

## Events: every action and every error (hard rule)

Every action a visitor takes that tells us something (a sign-up, sign-in, GitHub or contact click, a button that matters) is an event, and every script error is one too. A change that adds a call to action or a script without its event is not done.

- **One helper.** Send events only through `window.outflareTrack(name, props)` from `src/components/Analytics.astro`, which feeds both GA4 (through GTM's `dataLayer`) and PostHog. Never call `gtag`, `dataLayer.push` or `posthog.capture` from a page.
- **Links track themselves.** Links to `app.outflare.ai/signup` (`sign_up_click`), `app.outflare.ai` (`sign_in_click`), `github.com/outflareai` (`github_click`) and `mailto:` (`contact_click`) are recorded with where they sit (`header`, `footer`, `nav`, `page`). For anything else, add `data-track="name"` to the element, and `data-track-label="fixed-label"` to say which one (for example which file was downloaded). Script errors are `site_error`.
- **Names.** snake_case `object_verb` (GA4 allows no dots), the same in GA4 and PostHog. Never rename a shipped name: GA4 key events and dashboards depend on them.
- **Properties.** Fixed labels, the page path and the link's location only. Never what someone typed, their email address, or anything from the URL's query string except UTM tags.
- **Off by default.** Nothing loads unless the build sets `PUBLIC_GTM_ID` or `PUBLIC_POSTHOG_KEY`, so forks and local builds send nothing. PostHog runs cookieless; GA4 follows the consent defaults in `Analytics.astro`.

## Docs

Docs describe what Outflare does today; see "Keeping the docs honest" in the README. An engine change that adds a feature gets a matching docs change here.

## Docs after the deploy (hard rule)

This site deploys on every push to main (Cloudflare Pages), but app.outflare.ai deploys separately, after the engine and Cloud pull requests merge (the engine's and Cloud's AGENTS.md). So docs can go live before the feature. To keep them in order:

1. **Name what the docs wait for.** A pull request that documents an engine or Cloud change has a line `Needs outflareai/outflare#NN` (or `outflareai/cloud#NN`) per pull request in its description. Docs-only fixes and marketing copy need none.
2. **The `deployed` check enforces it.** It fails until each named pull request is merged and contained in the version production reports at `/v1/meta` (`<engine commit>+<cloud commit>`), and, when the pull request changes `spec/openapi.yaml`, until production serves that exact file. Re-run it once the deploy is done; never merge around it.
3. **Re-copy the spec before merging.** `spec/openapi.yaml` must equal the engine's `api/openapi.yaml` that production runs (`npm run sync-spec -- <that commit>`), not a branch.
4. **Never say "live" or "deployed"** about a feature until production's `/v1/meta` version contains it.
5. **No releases from here.** Self-hosted releases are tags on the engine, and only Jack pushes them.

## Costs registry (hard rule)

Every third-party service Outflare runs on or pays for, including the ones this site uses (Cloudflare Pages, Web Analytics, Google Tag Manager and GA4, PostHog, the domain), is listed in the costs registry in the private Cloud repository (`internal/costs/registry.go`), which feeds the staff Costs tab. Whenever we sign up for, create or change a third-party service for the site, such as a new analytics tool, form provider, font service, plan or domain, update the registry in the same change. Never buy, upgrade or change a plan to do it; that is the owner's call.
