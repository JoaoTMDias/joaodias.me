---
locale: en
translationKey: a11y-page-checker
title: A11y Page Checker
date: 2026-08-01
shortDescription: A local-first platform for repeatable accessibility audits across URLs, sitemaps and crawled sites.
description: A multi-interface accessibility auditing platform built around one stable, typed result contract.
role: Product designer, architect and lead engineer
problem: Accessibility checks are often scattered across one-off scripts, browser extensions and reports that are difficult to repeat or share.
impact: The project turns the same audit engine into a CLI, local dashboard, HTML reporter and MCP server while isolating page-level failures.
featuredOrder: 1
sourceCode: https://github.com/JoaoTMDias/a11y-page-checker
liveDemo: null
skills:
  - accessibility
  - playwright
  - axe-core
  - typescript
  - react
  - mcp
thumbnail: /logo.svg
themeBackground: "#111827"
themeForeground: "#facc15"
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

