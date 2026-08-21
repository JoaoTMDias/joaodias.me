# AGENTS.md

This file gives coding agents repository-specific guidance. For setup and the full command list,
read `README.md`; for contribution policy, read `CONTRIBUTING.md`.

## Project purpose

This repository powers `joaodias.me`, the bilingual personal website and professional portfolio of
João Dias, a senior frontend engineer from Coimbra, Portugal, who specialises in web accessibility.
It presents his work, writing, professional background, radio broadcasts, and listening activity.

The product priorities are accessible and inclusive user experiences, frontend quality, progressive
enhancement, performance, and faithful presentation of owner-authored content. Treat accessibility
as part of the site's identity, not only as a compliance check. Preserve the established editorial
voice and visual identity; Portuguese copy should use European Portuguese.

## Project shape

- This is an Astro 7 static site. Prefer Astro components for rendered content, React for complex
  client-side widgets, and Lit for the existing custom elements.
- English is the default locale at root routes; Portuguese lives under `/pt`. Shared locale helpers
  and interface messages are in `src/i18n`.
- Content collections live in `src/content` and are validated by `src/content.config.ts`. TinaCMS
  collection definitions in `tina/collections` must remain compatible with those schemas.
- Keep component styles beside components as `*.module.scss`; shared styles and custom media
  queries live in `src/assets/styles`.

## Change guidelines

- Preserve semantic HTML, keyboard interaction, visible focus, accessible names, contrast,
  forced-colors support, and reduced-motion behaviour. Only add motion inside the
  `--with-motion` custom-media query.
- Keep English and Portuguese routes, UI messages, and paired content in sync when a change applies
  to both locales. Paired collection entries use the same `translationKey`.
- Treat biography, portfolio copy, articles, testimonials, radio-show entries, resumes, and visual
  assets as owner-authored content. Do not rewrite, translate, regenerate, or replace them unless the
  task explicitly asks for it.
- Do not hand-edit generated or ignored outputs: `.astro/`, `.tina/__generated__/`, `dist/`,
  `src/data/build-info.json`, `public/llms.txt`, or `scripts/src/data/shows.json`. Use the matching
  package script when regeneration is required.
- Never commit credentials. `PUBLIC_*` values are browser-visible and are not secrets.
- Preserve unrelated worktree changes. Do not update dependencies or `pnpm-lock.yaml` unless the
  requested change requires it.
- Follow Biome's existing style: tabs, double quotes, semicolons, trailing commas, and a 100-column
  line width. Prefer existing utilities, components, design tokens, and custom media queries over
  introducing parallel patterns.

## Verification

Run the narrowest relevant checks while iterating, then broaden them according to risk:

- Unit or component logic: `pnpm test:unit`
- TypeScript or component API changes: `pnpm typecheck`
- Source changes: `pnpm lint` and `pnpm format:check`
- Routes, navigation, localization, or interactive UI: the relevant Playwright spec in `tests/e2e`
- Build, content-schema, or generation changes: `pnpm build`

Playwright builds and previews the site automatically and expects Chromium to be installed. For
visible changes, also inspect both locales, keyboard operation, responsive layouts, reduced motion,
and browser console errors. Add or update tests for behavioural changes; do not rely on automated
accessibility checks alone.
