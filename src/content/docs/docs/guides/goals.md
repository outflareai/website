---
title: Projects, goals and tasks
description: Say what the company is working on, where it is going and who does what next, for the whole company or one brand, with who can see each item.
sidebar:
  order: 1.46
---

<span class="pill shipped">Shipped</span> Projects, goals and tasks, in the web app, the REST API, the MCP server and SQL.

**Company → Goals** has three pages: **Goals**, **Projects** and **Tasks**. Each item belongs to the whole company or to one brand, so a company with several brands keeps its own goals and each brand keeps its part under them. Agents read them too: before they plan, an agent's context lists the open goals and the decisions in force, so its work points at a goal.

## Goals

A goal is an outcome by a date, such as *Reach $1M yearly revenue by June*. It has an owner, a due date and, when it is measured by a number, a start value, a target and the value now. The list shows how far along each goal is.

- **Status** is the owner's call: *On track*, *At risk* or *Off track* while it is open, and *Achieved*, *Missed* or *Dropped* once it closes.
- **Adds up to.** A brand's goal can add up to a company goal: Summitly's *Reach $300k* under Northpeak's *Reach $1M*.
- **Decided.** A goal's page keeps what was decided about it: one line, why, who decided and when. A later decision can replace an earlier one, which stays, struck through. To check a decision later, add a task with a due date.

## Projects

A project is a piece of work with a name, such as *Spring launch for Summitly*, run by one department from the [team directory](/docs/guides/team/) and led by one person, with a start and due date. It is *Active* while under way, and *Done* or *Dropped* once it closes.

Goals can be part of a project, but they don't have to be: pick the project on the goal, or choose **Add goal** on the project's page. A project's page lists its goals and how each one stands. Filter the list by department to see what each department runs. Deleting a project keeps its goals, in no project.

## Tasks

A task is one thing someone has to do, for the company or a brand, often toward a goal: who does it, when it is due and whether it is done. When it came from somewhere else, such as a meeting, a chat thread or an email, the task keeps where it came from and the exact words that asked for it, so whoever does it can check what was meant.

Tasks about one person or company (call Ana back, send the contract to Acme) are CRM tasks on that [customer record](/docs/guides/customer-records/) instead.

## Who can see what

Each project, goal, task and decision has one of four levels:

| Level | Who sees it |
| --- | --- |
| Everyone | Everyone in the company; for a brand's, everyone who can see that brand. |
| A team | One department or team from the team directory, plus management. |
| Management | Owners, admins and anyone whose role can see management items. |
| Private | Only whoever made it and the person it names: a goal's owner, a project's lead, a task's assignee. |

Lists, counts, the API, MCP, SQL and what agents read all leave out what you can't see. An API token sees what the person who made it sees.

- **Defaults.** **Who sees new items** on the Goals page sets the level each kind gets when nobody picks one. Out of the box, projects, goals and decisions are for everyone, and tasks are for the team of whoever adds them (everyone, when they are in no team).
- **Never wider than what it belongs to.** A task or decision on a goal, or a goal in a project, is never seen by more people than that goal or project. Keeping a goal or project to fewer people later does the same to what hangs off it, and a goal moved into a narrower project takes its level.
- A project kept to *A team* without naming one is kept to the department that runs it.

## Permissions

Four permissions, which you can mix in [your own roles](/docs/guides/workspaces-and-access/#roles):

| Permission | Lets you | Starting roles |
| --- | --- | --- |
| `goals.read` | See projects, goals, tasks and decisions | Everyone |
| `goals.tasks` | Add, change and tick off tasks | Owners, admins, members |
| `goals.manage` | Start projects, set goals, note decisions and change the defaults | Owners, admins |
| `goals.management` | See items kept to management | Owners, admins |

Someone kept to some brands sees the company's items and their brands', and changes only their brands'.

## For agents and developers

- **API:** `/v1/workspaces/{ws}/projects`, `/goals`, `/tasks`, `/decisions` and `/goal-settings`, each item at `/{id}`. See the [API reference](/docs/api/).
- **MCP:** `list_projects`, `list_goals`, `list_tasks`, `create_task`, `record_decision` and the rest ([MCP server](/docs/agents/mcp/)).
- **SQL:** the `work_projects`, `goals`, `work_tasks` and `decisions` tables, described in the data catalog.
