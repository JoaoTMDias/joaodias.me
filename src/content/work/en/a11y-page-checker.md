---
role: 'Product designer, architect and lead engineer'
problem: 'Accessibility checks are often scattered across one-off scripts, browser extensions and reports that are difficult to repeat or share.'
impact: 'The project turns the same audit engine into a CLI, local dashboard, HTML reporter and MCP server while isolating page-level failures.'
featuredOrder: 1
coverAlt: A11y Page Checker logo over a blurred view of the local audit dashboard.
locale: en
translationKey: a11y-page-checker
title: A11y Page Checker
slug: a11y-page-checker
date: 2026-07-16T00:00:00.000Z
shortDescription: 'A local-first platform for repeatable accessibility audits across URLs, sitemaps and crawled sites.'
description: |
  A multi-interface accessibility auditing platform built around one stable, typed result contract.
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

Accessibility audits need more than a single score. Teams must define targets, repeat the same checks, understand individual findings and keep useful output when one page fails.

## Process and decisions

I designed the product around a normalized `ScanResult` contract. URL discovery, axe execution and result normalization live in the core package; the CLI, dashboard, reporter and MCP server are adapters over that contract.

The dashboard is deliberately local-first. It binds to loopback, queues one scan at a time and stores history in SQLite. Typed lifecycle events let every interface report progress without coupling itself to the scanner.

Markdown plans make audit scope readable by people and tools. Independent page failures are recorded against their targets instead of cancelling unrelated work.

## Accessibility and engineering

The scanner combines Playwright and axe-core, but its reporting avoids presenting automation as complete accessibility assurance. Deterministic escaped HTML output, machine-readable JSON and explicit failure states make results usable in different workflows.

## Result

The project now supports explicit URLs, sitemaps and same-origin crawls through a TypeScript API, CLI, dashboard and MCP-compatible tools. It remains under active development while the public API stabilizes.

## Learning

The strongest architecture for developer tooling is a small dependable contract surrounded by replaceable interfaces.
