---
title: Scaling and monitoring
description: Split a busy server into app, website-event and worker services, watch it with Prometheus and Grafana, and move old analytics events to ClickHouse or object storage.
---

One process runs all of Outflare: the app, the API, website event collection, the job workers and the background loops. That is all a small install needs. This page is for when it grows.

## Run it as several services

Run the same image several times, each with a role, so the parts deploy, restart and scale apart:

| `OUTFLARE_ROLE` | Answers | Runs jobs and loops | Use it for |
| --- | --- | --- | --- |
| `all` (default) | Everything | Yes | A single server. |
| `api` | The app, API, MCP and website events | No | The service people and agents use. Run two or more for deploys without downtime. |
| `ingest` | `POST /v1/site/events`, `/site.js` and health checks | No | Collecting website events on their own address (for example `t.example.com`), so a busy or deploying app never drops a visit. |
| `worker` | Health checks only | Yes | Sending, syncs, crawls and every other job. |

Every role runs the migrations at start-up under a lock, so starting several at once is safe, and serves `/healthz` and `/readyz`. A request a role doesn't answer gets a `404`.

A split install:

1. Run **one** `worker` service. Keep it to one for now.
2. Run one or more `api` services behind your load balancer, at the app's address (`PUBLIC_URL`).
3. Optionally, run one or more `ingest` services at a tracking address, and load the [website tracking](/docs/guides/website-tracking/) snippet from it. The `api` services still take website events, so nothing breaks before the snippet moves.
4. Give each service its own share of database connections with `pool_max_conns` in `DATABASE_URL`, so the total stays under Postgres's `max_connections`. For example, with a limit of 100: api 2 × 15, ingest 2 × 5, worker 1 × 45 (the worker needs about `WORKERS` plus 10).

All services share the same settings, and `OUTFLARE_SECRET_KEY` must be the same everywhere.

Website events never wait on the app: the server checks and stores each batch as one row and answers, and a worker files the events a moment later. A slow query or a worker deploy only makes events appear a little later; it never makes a site's events fail.

## Metrics, dashboards and alerts

Outflare can report how busy, slow and healthy it is as Prometheus metrics: request rates and latency per route, the job queue, the database connection pool, Postgres itself, and CPU and memory. It's off unless you turn it on, and nothing leaves your server. Metrics never carry workspace ids, people or anything a customer typed.

| Variable | Default | What it does |
| --- | --- | --- |
| `OUTFLARE_METRICS_ADDR` | empty (off) | Where to serve `/metrics`, such as `:9091`. A separate, private listener; it refuses to share the public port. |
| `OUTFLARE_METRICS_TOKEN` | empty | When set, scrapers must send `Authorization: Bearer <token>`. Use one whenever other services share the network. |
| `OUTFLARE_METRICS_PPROF` | `false` | Also serve Go's profiler at `/debug/pprof/` on the same listener. Profiles can contain request data: private listeners only. |

With Docker Compose, metrics are already on inside Docker's own network, and an optional `monitoring` profile starts Prometheus and Grafana with Outflare's dashboard and alert rules:

```sh
echo "GRAFANA_ADMIN_PASSWORD=$(openssl rand -base64 18)" >> deploy/.env
docker compose -f deploy/docker-compose.yml --profile monitoring up -d
```

Open <http://localhost:3000> (bound to localhost only), sign in as `admin`, and open **Outflare** in the Outflare folder. To be told when an alert fires, add a contact point in Grafana. The details, including Grafana Cloud and your own Prometheus, are in [`docs/monitoring.md`](https://github.com/outflareai/outflare/blob/main/docs/monitoring.md).

## Analytics storage

Product events (site visits, tracked events and your server's own usage) live in Postgres, which is all a small install needs. Three optional settings let the same server keep far more:

| Setting | What it does |
| --- | --- |
| `OUTFLARE_CLICKHOUSE_URL` | Keeps a copy of every product event in your own ClickHouse, for fast reports over large volumes. The server creates its tables and copies events in the background, about a minute after they're written. |
| `OUTFLARE_S3_ENDPOINT`, `OUTFLARE_S3_REGION`, `OUTFLARE_S3_BUCKET`, `OUTFLARE_S3_ACCESS_KEY_ID`, `OUTFLARE_S3_SECRET_ACCESS_KEY` | An S3-compatible bucket (Cloudflare R2, Amazon S3, MinIO) for archived events. Set all of them or none, and give the key access to that one bucket only. |
| `OUTFLARE_EVENT_RETENTION_DAYS` | How long events stay in Postgres. `0`, the default, keeps everything. |

Every six hours, events older than the retention are moved out of Postgres: written to the bucket first when there is one, kept in ClickHouse when it has copied them, and otherwise deleted. These run your server, like Postgres does, so they are set in the environment, not per workspace. More in [`docs/analytics-storage.md`](https://github.com/outflareai/outflare/blob/main/docs/analytics-storage.md).
