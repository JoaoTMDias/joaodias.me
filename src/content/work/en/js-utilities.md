---
locale: en
translationKey: js-utilities
title: "@jtmdias/js-utilities"
date: 2023-01-01
shortDescription: Targeted JavaScript functions and React hooks shared across web products without broad utility dependencies.
description: A typed, tree-shakeable package that replaces copied helpers and one-function dependencies with tested utilities.
role: Library creator and maintainer
problem: Feedzai teams repeatedly copied the same helpers or installed libraries such as lodash and react-use for only one or two functions.
impact: The shared package reduced duplication and production bundle weight across Feedzai products, while my maintained fork supports my open-source work.
sourceCode: https://github.com/JoaoTMDias/frontend/tree/main/packages/js-utilities
liveDemo: https://www.npmjs.com/package/@jtmdias/js-utilities
skills:
  - typescript
  - react
  - vite
  - cypress
  - npm
thumbnail: /work/js-utilities/project-icon.svg
cover: /work/js-utilities/project-cover.png
coverAlt: JS Utilities documentation introducing the package and its reusable functions and React hooks.
galleryImages:
  - image: /work/js-utilities/api-overview.png
    alt: JS Utilities documentation overview with the available API organised by category.
    caption: The documentation makes the package's public API easier to discover and understand.
    width: 1600
    height: 1200
  - image: /work/js-utilities/utility-example.png
    alt: Documentation for a JS Utilities function showing its signature, parameters and usage example.
    caption: Each utility is documented with the information needed to use it without reading its implementation.
    width: 1600
    height: 1200
  - image: /work/js-utilities/package-tests.png
    alt: Automated test results for the JS Utilities package in a terminal.
    caption: Automated tests protect the behaviour of the shared functions and React hooks.
    width: 1236
    height: 666
themeBackground: "#072720"
themeForeground: "#25C2A0"
---

## Context

I started JS Utilities at Feedzai after seeing the same small functions copied between products. In other cases, teams installed broad packages such as lodash or react-use to gain one or two helpers, adding more code and another dependency for a narrow problem.

The individual functions were simple. The repeated implementation, inconsistent fixes and cumulative bundle cost were not. I wanted one tested library that teams could adopt selectively without turning it into another oversized utility framework.

## Process and decisions

I built the library from patterns already used in production. It includes small test helpers such as `random` and `draw`; type checks such as `isNil`, `isEmpty` and `isPromise`; array and object utilities; storage wrappers for browser storage and cookies; and React hooks including `useAutoId`, `useConstant`, `usePrevious`, `useMount` and `useIntersection`.

The package publishes ESM and CommonJS builds with matching TypeScript declarations. CommonJS kept it compatible with legacy Feedzai toolchains, while ESM and `sideEffects: false` allow modern bundlers to remove unused code.

React hooks live under a separate `./hooks` export. Plain JavaScript consumers can therefore use functions such as `classNames`, `chunk` or `getValue` without including React-specific code in their bundle.

The 11 kB size ceiling came from the complete version 1.0.0 bundle. I turned that starting size into an automated limit so future convenience could not quietly become bloat. Cypress component tests exercise the functions and hooks in a browser.

My fork lives in the shared frontend monorepo because React A11y Tools depends on it, and because the packages can share build, test, documentation and release infrastructure instead of reproducing that setup in separate repositories.

## Result

The original `@feedzai/js-utilities` package is used across major Feedzai products, including Case Manager, Pulse, Genome, RiskOps Studio, SAR Manager and the Escudo design system. Replacing copied helpers and larger general-purpose dependencies reduced duplication and production bundle sizes across that suite.

I continue to maintain and release `@jtmdias/js-utilities` on npm. It is used daily across my projects and provides the same focused foundation for the other packages in my monorepo.

## Learning

A shared utility library stays useful when every addition earns its place. Separate entry points, real consumers and a fixed size budget keep convenience from becoming another source of dependency weight.
