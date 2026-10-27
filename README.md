<a href="https://outflare.ai"><picture><source media="(prefers-color-scheme: dark)" srcset="https://outflare.ai/brand/svg/outflare-lockup-white.svg"><img src="https://outflare.ai/brand/svg/outflare-lockup-black.svg" alt="Outflare" width="140" height="28"></picture></a>

# Outflare website

**Live at [outflare.ai](https://outflare.ai)** · [Docs](https://outflare.ai/docs/) · [Engine repo](https://github.com/outflareai/engine) · [hello@outflare.ai](mailto:hello@outflare.ai)

The marketing site and documentation for [Outflare](https://outflare.ai), open-source GTM infrastructure for humans and agents. The product itself lives in [outflareai/engine](https://github.com/outflareai/engine) (private; releases are published to the public [outflareai/outflare](https://github.com/outflareai/outflare)).

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build). The output is a static site with built-in search.

## Develop

Needs Node 22.23 or later (24 recommended, see `.nvmrc`).

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/
```

Canonical URLs, the sitemap and `llms.txt` use `https://outflare.ai` (no `www`). Set `SITE_URL` only to build for another address, such as a preview.

## Where things are

| Path | What |
| --- | --- |
| `src/pages/index.astro` | Marketing home page |
| `src/content/docs/docs/` | Docs pages in Markdown and MDX, served under `/docs/` |
| `src/pages/docs/api/reference.astro` | Endpoint reference, generated from `spec/openapi.yaml` |
| `src/data/project.ts` | The site URL, contact email, GitHub repo links, and roadmap and feature status |
| `spec/openapi.yaml` | Copy of `api/openapi.yaml` from the main repo |
| `src/pages/llms.txt.ts` | `/llms.txt`, an index of the docs for LLMs and agents |
| `src/styles/marketing.css` | Home page styles: the web app's own Tailwind v4 theme and shadcn tokens (`outflare/web/src/index.css`), plus button, badge and card classes matching the app's components. Update both together. |
| `src/styles/tokens.css` | The same tokens as plain CSS variables for the docs, which Starlight styles. |
| `public/app/` | Screenshots of the real web app on demo data, dark and light, for the home page. Retake them when the app's look changes. |
| `astro.config.mjs` | Site config and docs sidebar |

## Hosting

The site is meant for Cloudflare Pages, with the domain's DNS on Cloudflare (the hosted app runs separately, from the private cloud repo). In the Cloudflare dashboard, Workers & Pages → Create → Pages → Connect to Git, pick this repository and set:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variables | `NODE_VERSION` = `24` |

Then add `outflare.ai` and `www.outflare.ai` (redirected to `outflare.ai`) under Custom domains. Every push to `main` deploys, and pull requests get preview links. `public/_headers` sets security headers and long caching for `/_astro/` files. Official profiles live in `src/data/social.json`: the [/social](https://outflare.ai/social/) page, the Organization `sameAs` data and the short links (`outflare.ai/x` and so on, written to `_redirects` at build time) all read it.

### Analytics

Analytics are off unless the build sets their IDs, so forks and local builds send nothing. On the Pages project, Settings → Variables and Secrets → Production, as plain-text variables:

| Variable | What it turns on |
| --- | --- |
| `PUBLIC_GTM_ID` | Google Tag Manager (`GTM-…`). The container loads GA4. The site sets consent defaults before GTM: no analytics or ad cookies for EEA, UK and Swiss visitors (GA gets cookieless pings), analytics only elsewhere, ads never. |
| `PUBLIC_POSTHOG_KEY` | PostHog (`phc_…`) in cookieless mode, so no banner. Needs "Cookieless server hash mode" on in the PostHog project. |
| `PUBLIC_POSTHOG_REGION` | `us` (default) or `eu`. Also read at runtime by `functions/ingest/`, which forwards PostHog traffic through `outflare.ai/ingest/`. |

Cloudflare Web Analytics needs no code: enable it under the Pages project's Metrics tab and Pages injects it. The tags themselves live in `src/components/Analytics.astro`, used by both the marketing layout and the docs head.

With either tag on, clicks on sign-up (`sign_up_click`), sign-in (`sign_in_click`), Dashboard (`dashboard_click`, shown instead of Sign in and Sign up to people signed in to the app), GitHub (`github_click`) and contact (`contact_click`) links, brand page downloads (`brand_kit_download`, `brand_asset_download`) and colour copies (`brand_color_copy`), clicks on the profiles at /social (`social_profile_click`, labelled by profile), and script errors (`site_error`), are sent to GA4 and PostHog by one helper, `window.outflareTrack`. In GA4, mark `sign_up_click` as a key event once it arrives. [`AGENTS.md`](AGENTS.md) has the rule for new events.

## Keeping the docs honest

The docs describe what Outflare does today. Pages for features that have not shipped are marked **Planned** and describe the intended design.

When the main repo changes:

1. Refresh the API contract: `npm run sync-spec` (from `main`), or `npm run sync-spec -- <branch>`, or `OUTFLARE_DIR=../outflare npm run sync-spec` from a local checkout.
2. Update `src/data/project.ts` when a roadmap step ships, and remove the **Planned** label from its docs page.
3. Check install and configuration pages against `README.md`, `deploy/` and `engine/internal/config` in the main repo.
4. Merge only once app.outflare.ai runs the change. Put `Needs outflareai/engine#NN` (or `outflareai/cloud#NN`) in the pull request's description; the `deployed` check (`scripts/check-deployed.mjs`) stays red until that pull request is merged and in the version production reports at `/v1/meta`, and until production serves the same `spec/openapi.yaml`. Re-run it after the deploy. It reads the private repositories with the `DEPLOY_CHECK_TOKEN` secret.

## License

Apache-2.0. The Outflare core is AGPL-3.0; see its repository.
