---
role: 'Product designer, architect and lead engineer'
problem: 'During a major Feedzai website update, the team lacked a repeatable way to run basic accessibility checks across every page and track regressions between releases.'
impact: 'Repeatable audits helped the team reduce accessibility violations on the published site, while the project grew into a reusable platform for local, CI and AI-assisted workflows.'
coverAlt: A11y Page Checker logo over a blurred view of the local audit dashboard.
locale: en
translationKey: a11y-page-checker
title: A11y Page Checker
slug: a11y-page-checker
date: 2026-01-16T00:00:00.000Z
shortDescription: 'A local-first platform for repeatable accessibility audits across URLs, sitemaps, crawled sites and test plans.'
description: |
  A Playwright and axe-core auditing platform with a CLI, local dashboard, portable reports and tools for AI agents.
sourceCode: 'https://github.com/JoaoTMDias/a11y-page-checker'
liveDemo: null
skills:
  - accessibility
  - playwright
  - axe-core
  - typescript
  - react
  - mcp
thumbnail: /work/a11y-page-checker/project-icon.svg
cover: /work/a11y-page-checker/project-cover.webp
galleryImages:
  - image: /work/a11y-page-checker/scan-setup.webp
    alt: A11y Page Checker form configured to start a local sitemap scan.
    caption: 'A scan can start from a crawl, sitemap or Markdown plan and runs only on the local machine.'
  - image: /work/a11y-page-checker/findings-list.webp
    alt: Completed sitemap scan with a progress summary and a list of colour contrast findings.
    caption: The dashboard preserves the overall scan result while exposing findings for each page.
  - image: /work/a11y-page-checker/finding-detail.webp
    alt: 'Expanded accessibility findings with rule guidance, affected HTML and contrast details.'
    caption: Each finding retains rule context and the affected page and element.
  - image: /work/a11y-page-checker/html-report.webp
    alt: Standalone HTML accessibility report summarising findings across scanned pages.
    caption: The same normalized result contract produces a portable HTML report.
  - image: /work/a11y-page-checker/cli-audit.webp
    alt: Terminal running the A11y Page Checker CLI and reporting findings for several pages.
    caption: The CLI uses the same audit engine for repeatable local and automated workflows.
themeBackground: '#144232'
themeForeground: '#C4EDDF'
---

## Context

The idea began during a major update to Feedzai's website. We had no automated, repeatable way to run basic accessibility checks across every page, compare releases or see whether a fix survived the next deployment.

Manual testing remained essential, but browser extensions and one-off scripts did not scale well to a multi-page release. I started combining Playwright and axe-core so the same checks could run locally or in CI and produce JSON and HTML reports that were easier to compare and share.

## Process and decisions

The first version read `sitemap.xml` and audited each URL. I later added explicit URL lists and same-origin crawling, making the scanner useful for sites and single-page applications whose routes are not always represented by a sitemap.

As the project grew, I split it into focused packages. URL discovery, Playwright and axe execution, and result normalization live in the core engine. A stable, typed `ScanResult` contract then supports replaceable adapters: the CLI, HTML reporter, local dashboard and MCP server.

The dashboard is deliberately local-first. It binds to loopback, queues scans and stores their history in SQLite. Typed lifecycle events allow each interface to show progress without coupling it to the scanner.

Markdown plans make an audit's scope readable by people and tools. They already define targets and validate interaction metadata; executing those user-story actions is still being refined. I also introduced the MCP package early so AI agents could run the same audits through a defined tool interface instead of inventing a separate integration.

## Accessibility and engineering

Automated checks cannot establish that a product is accessible, so the reports present axe-core findings rather than a blanket score or claim of conformance. Deterministic, escaped HTML, machine-readable JSON and explicit failure states make the results useful in local and automated workflows.

Each attempted URL keeps its own result. If one page fails to load or scan, the tool records that failure and continues with independent targets instead of discarding the rest of the audit.

## Result

The original audits helped the Feedzai team reduce accessibility violations, leaving the published website with significantly fewer issues than its first build.

Today, A11y Page Checker supports single URLs, sitemaps and same-origin crawls through a TypeScript API, CLI, local dashboard, JSON and HTML reports, and MCP tools. It is intended for web developers, design system engineers and product teams that need repeatable audits in local workflows, CI pipelines or AI-assisted toolchains. The project remains under active development while I stabilize its public API and expand interaction-based scan plans.

## Learning

A one-off check becomes much more valuable when a team can repeat it, compare the result and fit it into the way they already work.
