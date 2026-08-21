---
locale: en
translationKey: merge-coverage
title: "@jtmdias/merge-coverage"
date: 2023-04-01
shortDescription: A CLI that turns coverage and test reports from multiple runners into one CI-ready result.
description: A TypeScript command-line tool for clearing stale output, combining coverage and merging JUnit reports.
role: CLI creator and maintainer
problem: Feedzai had thousands of Jest tests and hundreds of Cypress tests, but their separate reports obscured the code that remained untested.
impact: One predictable command replaced manual report assembly across production CI pipelines at Feedzai and Farfetch.
sourceCode: https://github.com/JoaoTMDias/frontend/tree/main/packages/merge-coverage
liveDemo: https://www.npmjs.com/package/@jtmdias/merge-coverage
skills:
  - node
  - typescript
  - oclif
  - playwright
  - ci
  - testing
thumbnail: /work/merge-coverage/project-icon.svg
cover: /work/merge-coverage/project-cover.png
coverAlt: Merge Coverage command-line interface combining test coverage reports into a single output.
themeBackground: "#0080FF"
themeForeground: "#00101F"
---

## Context

I created Merge Coverage at Feedzai after running into a sizeable blind spot in our test strategy. We had thousands of Jest unit tests and hundreds of Cypress integration tests, yet each runner produced its own coverage and JUnit files. Looking at either report alone could not show which parts of the codebase remained untested across the complete suite.

Teams could assemble those files by hand or add more CI scripting, but that work was repetitive and easy to get wrong. I wanted the entire process to become one command that behaved the same way locally and in a pipeline.

## Process and decisions

I built the tool as a TypeScript CLI with three focused responsibilities: clear stale report directories, combine Istanbul coverage data and merge JUnit XML reports. Teams can configure the participating tools, source folders and output paths without changing their application code.

I chose oclif because, at the time, it offered the strongest developer experience I had found for TypeScript command-line tools. Its argument parsing, flags and command structure gave me the pieces of a small CLI toolkit without having to build that plumbing first.

The original workflow brought Jest and Cypress together; Vitest support followed as our testing stack evolved. At Farfetch, I extended the same convention to include Playwright coverage in CI for products such as CR Manager. Because the merge step works with normalized coverage files rather than runner-specific internals, another tool can participate without changing the purpose of the command.

The result is a unified HTML coverage report and merged JUnit output that CI systems can publish and teams can inspect. Keeping report cleanup in the same CLI also prevents results from a previous run quietly contaminating the next one.

## Result

Merge Coverage was adopted in GitLab pipelines for Feedzai products including Case Manager, SAR Manager and the Escudo design system, where it remains in active use years after its first release. I also used it in Farfetch pipelines and still reach for it in my own projects whenever more than one test runner contributes to coverage.

The package remains reliable in production, although its dependencies and parts of its implementation would benefit from a modernisation pass. Its main value has held up: teams get a more complete view of their test coverage without maintaining custom report-merging scripts in every product.

## Learning

A small developer tool can have a long working life when it turns a messy integration problem into one predictable command with clear inputs and outputs.
