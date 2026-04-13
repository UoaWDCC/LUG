# UoA Linux User Group Website

This repository contains the Web Development and Consulting Club (WDCC) project for the University of Auckland Linux User Group (LUG).

The project is a server-first web application for the club’s public website and administrative functionality. A core requirement of this project is that important functionality must continue to work even when browser JavaScript is disabled.

## Project goals

This project aims to provide:

- a public-facing website for the club
- a maintainable codebase for future contributors
- admin tooling for LUG executives
- a means for LUG executives to write blog posts and share news with members
- a server-rendered experience that does not rely on client-side JavaScript for core functionality

## Core constraints

These constraints should guide development decisions throughout the project:

- Core functionality must work when browser JavaScript is disabled.
- Use server-rendered components by default.
- At this stage, **do not add** `"use client"` at all.
- Client-side JavaScript should be treated as progressive enhancement, not a requirement.
- Simplicity, maintainability, and accessibility should be prioritised over unnecessary interactivity.

## Tech stack

Current stack:

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ESLint
- Prettier
- pnpm

Planned additions:

- PostgreSQL

## Getting started

### Prerequisites

Make sure you have the following installed:

- Node.js 24.x
- pnpm 10.33.0

This repository uses **pnpm** as its package manager.

- Use `pnpm` for dependency installation and scripts.
- Do not use `npm` or `yarn` in this repository.
- The project enforces pnpm-only installs via a preinstall check.

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

Then open the local development URL shown in the terminal.


## Environment variables

No environment variables are required at the current stage of the project.

This section will be expanded once services such as the database and authentication are introduced.

## High-level architecture

The application currently follows a server-first architecture using the Next.js App Router.

High-level principles:

- shared layout structure is defined in the root `layout.tsx`
- routes are server-rendered by default
- reusable layout and primitive components live under `src/components`
- core user flows should work with standard links, forms, and full page reloads
- browser JavaScript should only be introduced later if it provides a clear, non-essential enhancement

As the project evolves, more detailed architecture documentation will be added under the `docs/` directory.

## Repository structure

This repository is still in the early setup stage, but currently follows a simple structure:

```text
src/
  app/
  components/
public/
docs/
```

This structure may evolve as the project grows.

## Contributing

Development should happen on feature branches and changes should be merged through pull requests.

Contribution guidelines and workflow conventions are documented in: `docs/CONTRIBUTING.md`.

## Staging and deployment

A Fly.io deployment pipeline has already been set up for staging.

This section will be expanded later with deployment workflow details.

## Team

| Name           | Role            |
| -------------- | --------------- |
| Amanda Yap    | Project Manager |
| William Tay     | Tech Lead       |
| Vedanti Tewari  | Developer       |