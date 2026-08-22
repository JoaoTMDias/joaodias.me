# joaodias.me

Source code for [joaodias.me](https://joaodias.me), the personal website of João Dias, a
frontend engineer specialising in web accessibility. The site contains my portfolio, writing,
professional background, radio shows, and an integration showing recently played music.

> [!IMPORTANT]
> This is a publicly visible, source-available repository, not an open-source project. The code,
> writing, visual identity, images, and other assets are all rights reserved. See [LICENSE](LICENSE).

## Features

- Static pages, portfolio case studies, and an MDX-powered blog
- Git-backed content editing through TinaCMS
- Responsive themes and accessibility-focused navigation
- RSS and sitemap generation
- Last.fm listening activity and radio-show content
- Unit tests with Vitest and browser/accessibility tests with Playwright and axe-core

## Architecture

The site is built with [Astro](https://astro.build), with React and Lit used for interactive
components. Content lives under `src/content`, pages under `src/pages`, and static assets under
`public`. TinaCMS defines the editing interface in `tina`, while scripts in `scripts` generate
build metadata, `llms.txt`, and radio-show content. The production output is a static `dist`
directory.

## Requirements

- [Node.js 24](https://nodejs.org/) (also declared in `.nvmrc`)
- [pnpm 11.22.0](https://pnpm.io/)

If Corepack is available, it can activate the package-manager version declared in `package.json`:

```bash
corepack enable
corepack install
```

## Getting started

```bash
git clone https://github.com/JoaoTMDias/joaodias.me.git
cd joaodias.me
pnpm install --frozen-lockfile
cp .env.example .env
pnpm start
```

`pnpm start` runs Astro directly. To run the site with the TinaCMS editing interface, configure
the Tina variables described below and use `pnpm dev`.

## Environment variables

Copy `.env.example` to `.env` and provide only the values needed for the feature you are using.

| Variable | Purpose |
| --- | --- |
| `PUBLIC_LAST_FM_API_KEY` | Browser-visible Last.fm API key used by the listening widget |
| `PUBLIC_TINA_CLIENT_ID` | Public TinaCMS project client ID |
| `TINA_TOKEN` | Private TinaCMS content token; required for Tina-enabled builds |
| `GITHUB_BRANCH` | Optional branch override used by TinaCMS; defaults to `main` |

Never commit `.env` or real credentials. Values prefixed with `PUBLIC_` are included in client-side
code and must not be treated as secrets.

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start TinaCMS and the Astro development server |
| `pnpm start` | Generate local metadata and start Astro without TinaCMS |
| `pnpm build` | Generate metadata and build the static production site |
| `pnpm build:ci` | Build TinaCMS and then run the production build |
| `pnpm preview` | Preview the production build locally |
| `pnpm test` | Run unit tests followed by headless browser tests |
| `pnpm test:unit` | Run Vitest unit/component tests |
| `pnpm test:headless` | Run Playwright end-to-end tests headlessly |
| `pnpm test:ui` | Open Playwright's interactive test UI |
| `pnpm lint` | Check source files with Biome without changing them |
| `pnpm lint:fix` | Lint and automatically fix supported source issues |
| `pnpm format:check` | Check source formatting without changing files |
| `pnpm format` | Format source files with Biome |
| `pnpm typecheck` | Type-check TypeScript without emitting files |
| `pnpm get-latest-shows` | Refresh generated radio-show content |

Install Playwright's Chromium browser before running browser tests for the first time:

```bash
pnpm exec playwright install chromium
```

## Content and deployment

Site content is stored in the Git repository and modelled in `src/content.config.ts` and the Tina
collections. `pnpm build` generates build information and `public/llms.txt`; those generated files
are intentionally ignored. The deployment platform should publish `dist` after a successful build.

GitHub Actions checks linting, formatting, types, unit tests, browser tests, and accessibility on
pushes and pull requests. A scheduled workflow refreshes radio-show content and commits changes
when new entries are found.

## Contributing and reporting problems

Bug reports and accessibility feedback are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md)
before opening an issue or pull request and follow the [Code of Conduct](CODE_OF_CONDUCT.md).
Substantial changes should be discussed in an issue first.

Do not disclose vulnerabilities in a public issue. Follow the private process in
[SECURITY.md](SECURITY.md).

## Copyright

Copyright © João Dias. All rights reserved. See [LICENSE](LICENSE) for the terms that apply to this
repository and its contents.
