# AGENTS.md

Instructions for coding agents (and humans) working on outflare.ai, the marketing site and docs for **Outflare**. Use only that name: never any other product name, and the domain is always `outflare.ai` (no `www`). The engine's own rules are in [`outflareai/outflare` AGENTS.md](https://github.com/outflareai/outflare/blob/main/AGENTS.md); this file adds what is specific to the site.

## Bring your own keys (hard rule, no exceptions)

All third-party APIs are on an account basis. Outflare never gives access to its own API keys for connectors, AI or any other third-party service: everybody adds their own. No exceptions. The engine enforces it in code and CI ([engine AGENTS.md](https://github.com/outflareai/outflare/blob/main/AGENTS.md), "Bring your own keys"); on this site:

- **Never promise or describe an Outflare-provided key.** No free credits, included AI, trial keys, "works out of the box with our key", or a shared Geonode, Anthropic, OpenAI or data provider account, on any page, plan or comparison table, for Cloud or self-hosting.
- **Docs for a feature that calls a third-party API say whose account it runs on:** the workspace connects its own key or signs in to its own account, and the feature stays off until it does. Link the connector's page.
- **The site's own services are not workspace features.** GTM, GA4, PostHog, Cloudflare and the `deployed` check run outflare.ai itself; they stay as they are under "Secrets and security" and the costs registry.

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

## Secrets and security (hard rule)

This repository is public. Everything in it is readable by anyone, forever: every file on every branch, every old commit, pull request titles and descriptions, issues, comments and CI logs. Bots scrape GitHub for keys within minutes of a push, so deleting a commit or force-pushing does not undo a leak. The site is static and holds no secrets. Build-time ids such as `PUBLIC_GTM_ID` and `PUBLIC_POSTHOG_KEY` are public by design, but nothing else is.

- **Never commit a secret.** That means API keys, tokens (ours or a provider's, including `DEPLOY_CHECK_TOKEN`), passwords, private keys, and `.env` files. Secrets live only in Railway variables, GitHub Actions secrets, or the owner's password manager. The build reads them from Cloudflare Pages environment variables.
- **Never put a secret anywhere else people can see it either.** Not in a commit message, PR body, issue, comment, chat message, log line, screenshot, error message or docs example. Never ask anyone to paste one in chat.
- **Fakes must look fake.** Test fixtures and docs use values like `oft_test_not_a_real_token` and `sk-test-not-a-real-key`, never a real-looking provider key. Docs examples use obviously fake values too.
- **No customer or internal data.** No real email addresses, names, domains, mailbox contents, lead lists, Geonode data, production logs or database dumps. Use `example.com`, Acme and Northpeak. Screenshots use the demo workspace. Hosted-only details (staff emails, Railway ids, internal hostnames) never appear on the site.
- **Check before you push.** Run `gitleaks git --no-banner --log-opts=origin/main..HEAD .` (or the Security workflow on your pull request). GitHub push protection blocks known key formats. Never bypass push protection or a gitleaks finding to get a push through.
- **False positives** go in `.gitleaksignore` as the exact fingerprint, only after a person has confirmed the value is fake, with the reason in the pull request. Never widen `.gitleaks.toml` to silence a rule.
- **If a secret leaks, revoke it first.** Rotate it at the provider straight away, update the Cloudflare Pages or Railway variable, and tell Jack. Only then clean up the history. Never "fix" a leak by deleting the commit or ignoring the finding.
- **Workflows in a public repository.** Pin third-party actions to a full commit SHA with the version in a comment. Default to `permissions: contents: read` and `persist-credentials: false`. Never use `pull_request_target` or `workflow_run` to check out or run pull request code. Pass untrusted text (PR titles, bodies, branch names, comments) to scripts through `env:`, never `${{ }}` inside `run:`. GitHub withholds secrets from pull requests opened from forks; never work around that. The Security workflow runs zizmor to check all of this.
- **Vulnerabilities are reported privately** (`SECURITY.md`). Never describe an unfixed vulnerability in a public issue, pull request or commit message.
- **Daily security scan.** `.github/workflows/security.yml` runs gitleaks over the whole history of every branch, zizmor over the workflows, and `npm audit` over dependencies. It runs every day at 03:23 UTC, on every push to main, and (secrets and workflows) on every pull request. Cloud's Security workflow also scans every public outflareai repository each day and fails if any repository is public that shouldn't be. A failed run on main is filed as an issue by Bugwatch. Fix it before other work, and treat a real secret as an incident.
- **Only Jack changes repository visibility** or security settings. Before a repository goes public, its full history is scanned and it is added to `security/public-repos.txt` in Cloud. Cloud is never public.

## Costs registry (hard rule)

Every third-party service Outflare runs on or pays for, including the ones this site uses (Cloudflare Pages, Web Analytics, Google Tag Manager and GA4, PostHog, the domain), is listed in the costs registry in the private Cloud repository (`internal/costs/registry.go`), which feeds the staff Costs tab. Whenever we sign up for, create or change a third-party service for the site, such as a new analytics tool, form provider, font service, plan or domain, update the registry in the same change. Never buy, upgrade or change a plan to do it; that is the owner's call.
