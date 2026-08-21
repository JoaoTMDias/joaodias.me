---
locale: en
translationKey: merge-coverage
title: "@jtmdias/merge-coverage"
date: 2023-04-01
shortDescription: A CLI that combines coverage and test reports from Jest, Vitest and Cypress.
description: A focused command-line tool for bringing fragmented test evidence into one CI-friendly output.
role: CLI designer and maintainer
problem: Mixed test runners produce separate coverage and JUnit files, obscuring the overall quality signal in CI.
impact: The published CLI clears stale output, combines coverage and merges JUnit reports with configurable folders and destinations.
sourceCode: https://github.com/JoaoTMDias/frontend/tree/main/packages/merge-coverage
liveDemo: https://www.npmjs.com/package/@jtmdias/merge-coverage
skills:
  - node
  - typescript
  - oclif
  - ci
  - testing
thumbnail: /work/merge-coverage/project-icon.svg
cover: /work/merge-coverage/project-cover.png
coverAlt: Merge Coverage command-line interface combining test coverage reports into a single output.
themeBackground: "#0080FF"
themeForeground: "#00101F"
---

## Context

A frontend test strategy may use unit, component and end-to-end runners. Each produces useful evidence, but separate reports make the combined signal harder to understand and publish.

## Process and decisions

I built a small oclif CLI with explicit commands for clearing stale report directories, combining coverage and merging JUnit XML. Options allow teams to select tools, folders and output files without changing application code.

The package lives beside the libraries that use it, so its real consumers continuously exercise the workflow.

## Result

Merge Coverage is a public npm package that supports Jest, Vitest and Cypress reporting workflows and can be called directly from lifecycle scripts or CI.

## Learning

Developer experience improves when an integration problem becomes one predictable command with clear inputs and outputs.

