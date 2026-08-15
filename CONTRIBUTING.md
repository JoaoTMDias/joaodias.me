# Contributing

Thank you for taking the time to report a problem or suggest an improvement. This is a personal,
source-available website rather than a community-owned product, so contributions are reviewed with
the site's voice, design, privacy, and accessibility requirements in mind.

Participation in this project is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).

## Start with an issue

Bug reports and accessibility findings are welcome through the matching GitHub issue form. Please
search existing issues before filing a new one and include a minimal reproduction when possible.

Open an issue before working on a substantial code change. Unsolicited redesigns, personal-content
edits, dependency rewrites, and changes to the site's editorial voice are unlikely to be accepted.
Security vulnerabilities must follow [SECURITY.md](SECURITY.md), never the public issue tracker.

## Development workflow

1. Use Node 24 and pnpm 11.21.0.
2. Install dependencies with `pnpm install --frozen-lockfile`.
3. Copy `.env.example` to `.env` and configure only the integrations needed for the change.
4. Create a focused branch and keep unrelated changes out of the pull request.
5. Run the relevant checks before submitting:

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test:unit
pnpm test:headless
pnpm build
```

Run `pnpm exec playwright install chromium` first if the Playwright browser is not installed.

## Accessibility expectations

Changes must preserve semantic HTML, keyboard operation, visible focus, appropriate accessible
names, sufficient contrast, reduced-motion preferences, and useful screen-reader behaviour. Include
automated tests for behaviour changes, but do not treat automated accessibility checks as a
replacement for keyboard and screen-reader review.

## Pull requests

Explain the problem and solution, link the agreed issue, list the checks performed, and include
screenshots or recordings for visible changes. Do not include credentials, personal data, generated
build output, or assets you do not have permission to contribute.

## Contribution rights

You retain copyright in your contribution. By submitting a pull request, you confirm that you have
the right to contribute the work and grant João Dias a perpetual, worldwide, non-exclusive,
royalty-free, irrevocable licence to use, reproduce, modify, adapt, publish, distribute, and display
the contribution as part of this project and its related website. This grant does not give you any
rights to the rest of the repository, which remains subject to [LICENSE](LICENSE).
