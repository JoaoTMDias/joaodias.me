---
locale: en
translationKey: js-utilities
title: JS Utilities
date: 2025-01-01
shortDescription: Shared JavaScript functions and React hooks packaged for reuse across web projects.
description: A small public package that replaces repeated project-local helpers with tested, typed imports.
role: Maintainer and library author
problem: Reimplementing the same utilities and hooks across projects creates drift, duplicated tests and avoidable bundle cost.
impact: A versioned npm package provides ESM, CommonJS, type declarations and separate hook exports under an 11 kB size budget.
sourceCode: https://github.com/JoaoTMDias/frontend/tree/main/packages/js-utilities
liveDemo: https://www.npmjs.com/package/@jtmdias/js-utilities
skills:
  - typescript
  - react
  - vite
  - cypress
  - npm
thumbnail: /logo.svg
themeBackground: "#f3f4f6"
themeForeground: "#111827"
---

## Context

Small helpers become infrastructure once several products depend on them. Copying them hides ownership and makes fixes inconsistent.

## Process and decisions

I consolidated recurring JavaScript functions and React hooks into a public package inside the frontend monorepo. The package exposes a general entry point and a hooks-specific entry point, with matching TypeScript declarations.

Vite produces ESM and CommonJS builds. Automated size limits keep each published bundle below the defined 11 kB ceiling, and Cypress component tests exercise behaviour in a real browser.

## Result

The package is published on npm and can be upgraded independently while sharing documentation and tooling with the other monorepo packages.

## Learning

Reuse is valuable when its public surface, compatibility and release cost stay smaller than the duplication it replaces.

