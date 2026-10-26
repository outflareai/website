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
