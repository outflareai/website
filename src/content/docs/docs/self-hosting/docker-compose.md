---
title: Self-hosting with Docker Compose
description: Run Outflare in production on your own server. Requirements, settings, HTTPS, backups and upgrades.
sidebar:
  order: 1
---

The repository ships a Compose file, `deploy/docker-compose.yml`, with two services: `postgres` (Postgres 16) and `engine` (the Outflare binary with the built web app). That is the whole stack.

## Requirements

- A Linux server with Docker and the Compose plugin. 1 vCPU and 1 GB of RAM is enough to start; add memory as you add mailboxes, since each one keeps an IMAP connection open once inbox sync ships.
- Outbound access to your mailboxes' SMTP and IMAP servers: ports 465 or 587 and 993. Some cloud providers block outbound SMTP by default, so check yours.
- A domain name and HTTPS in front of the engine if anyone other than you will use it.
- Optional: [pgvector](/docs/guides/query-and-search/#self-hosting) in Postgres for meaning-based search. Use the `pgvector/pgvector:pg16` image for the `postgres` service to have it.

## Install

```sh
git clone https://github.com/outflareai/outflare
cd outflare
cp deploy/.env.example deploy/.env
echo "OUTFLARE_SECRET_KEY=$(openssl rand -base64 32)" >> deploy/.env
# edit deploy/.env: set a strong POSTGRES_PASSWORD
docker compose -f deploy/docker-compose.yml up -d
```

### From a release, without cloning

Each release ships `outflare-<version>.tar.gz` on [GitHub Releases](https://github.com/outflareai/outflare/releases). Its `docker-compose.yml` pulls the published image `ghcr.io/outflareai/outflare:<version>` (amd64 and arm64) instead of building from source:

```sh
tar xzf outflare-<version>.tar.gz && cd outflare-<version>
cp .env.example .env
echo "OUTFLARE_SECRET_KEY=$(openssl rand -base64 32)" >> .env
docker compose up -d
```

No version has been released yet, so for now install from the repository as shown above. Release images send the [anonymous daily report](/docs/self-hosting/telemetry/) unless you turn it off.

Open `http://your-server:8080` and complete setup. The first visit creates the owner account and first workspace.

## Settings

`deploy/.env` is read by Compose. These are the settings it passes through:

| Variable | Default | What it does |
| --- | --- | --- |
| `POSTGRES_PASSWORD` | `outflare` | Password for the bundled Postgres. Change it before exposing the instance. |
| `PORT` | `8080` | Host port the app and API are published on. |
| `OUTFLARE_SECRET_KEY` | none, required | Base64 32-byte key that encrypts mailbox passwords and provider keys at rest. Generate with `openssl rand -base64 32`. |
| `WORKERS` | `32` | Concurrent job workers for sending, inbox sync and connection checks. |

The engine itself reads more settings. See the full [configuration reference](/docs/self-hosting/configuration/).

## Put it behind HTTPS

Run a reverse proxy in front of port 8080. With [Caddy](https://caddyserver.com/), which fetches certificates for you, the whole config is:

```text title="Caddyfile"
outflare.example.com {
    reverse_proxy localhost:8080
}
```

Then tell the engine its public address, so invite links point at the right place and session cookies are marked `Secure`. The bundled Compose file does not pass `PUBLIC_URL` through yet, so add it to the `engine` service:

```yaml title="deploy/docker-compose.yml"
  engine:
    environment:
      PUBLIC_URL: https://outflare.example.com
```

Finally, stop publishing port 8080 to the internet, or firewall it, so all traffic goes through the proxy.

## Health checks

| Endpoint | Meaning |
| --- | --- |
| `GET /healthz` | The process is up. |
| `GET /readyz` | The engine can reach Postgres and is ready for traffic. |
| `GET /v1/meta` | Instance name, version and capabilities. |

## Back up

Back up two things, together:

1. **The database.** For example, nightly:

    ```sh
    docker compose -f deploy/docker-compose.yml exec -T postgres \
      pg_dump -U outflare outflare | gzip > outflare-$(date +%F).sql.gz
    ```

2. **`OUTFLARE_SECRET_KEY`.** Store it in your password manager or secret store. A database backup without the key restores everything except mailbox credentials, which then have to be imported again.

## Upgrade

```sh
git pull
docker compose -f deploy/docker-compose.yml up -d --build
```

From a release bundle: unpack the new version's bundle, copy your `.env` into it, and run `docker compose up -d` there. Postgres data lives in the `outflare_pgdata` volume, so it carries over.

Migrations run automatically when the engine starts. They are append-only, so an upgrade never rewrites a migration that already ran. Take a backup before upgrading.

## Logs

```sh
docker compose -f deploy/docker-compose.yml logs -f engine
```
