---
locale: en
translationKey: react-a11y-tools
title: "@jtmdias/react-a11y-tools"
slug: react-a11y-tools
date: 2022-08-01
shortDescription: >-
  Tested React primitives for recurring accessibility patterns in design systems,
  applications and websites.
description: >
  An open-source library that packages focus management, keyboard navigation,
  announcements and semantic structure into reusable React components and hooks.
role: Library creator and maintainer
problem: Engineers at Feedzai repeatedly encountered complex accessibility patterns but did not always have the specialist knowledge or time to implement them consistently.
impact: The library became an accessibility foundation for Escudo, Feedzai's internal design system, and continues to support personal and professional projects through my maintained fork.
sourceCode: "https://github.com/JoaoTMDias/frontend/tree/main/packages/react-a11y-tools"
liveDemo: "https://www.npmjs.com/package/@jtmdias/react-a11y-tools"
skills:
  - react
  - typescript
  - cypress-component-testing
  - vite
  - docusaurus
thumbnail: /work/react-a11y-tools/project-icon.svg
cover: /work/react-a11y-tools/project-cover.jpg
galleryImages:
  - image: /work/react-a11y-tools/project-1.jpg
    alt: React A11y Tools component library overview
    caption: ''
  - image: /work/react-a11y-tools/project-2.jpg
    alt: Accessibility testing interface
    caption: ''
  - image: /work/react-a11y-tools/project-3.jpg
    alt: Component documentation page
    caption: ''
  - image: /work/react-a11y-tools/project-4.jpg
    alt: Interactive accessibility examples
    caption: ''
  - image: /work/react-a11y-tools/project-5.jpg
    alt: Code samples and implementation guide
    caption: ''
  - image: /work/react-a11y-tools/project-6.jpg
    alt: Additional component examples
    caption: ''
  - image: /work/react-a11y-tools/project-7.jpg
    alt: Accessibility audit results
    caption: ''
  - image: /work/react-a11y-tools/project-8.jpg
    alt: Testing utilities showcase
    caption: ''
  - image: /work/react-a11y-tools/project-9.jpg
    alt: Best practices documentation
    caption: ''
  - image: /work/react-a11y-tools/project-10.jpg
    alt: Component API reference
    caption: ''
themeBackground: "#FFC9CB"
themeForeground: "#1b1d1c"
---

## Context

I created React A11y Tools while working at Feedzai, where teams build software for financial institutions and accessibility cannot be treated as a finishing touch. Engineers generally wanted to do the right thing, but complex interaction patterns require specialist knowledge and time that a delivery team may not always have.

The same challenges kept returning: managing focus in dialogs, implementing roving tabindex, announcing route changes and preserving a meaningful heading structure. Different teams solved them differently, and under pressure some patterns risked being simplified or skipped.

## Process and decisions

I turned those recurring solutions into a dedicated library of React components and hooks. The primitives provide behaviour for focus management, keyboard navigation, announcements, skip links and semantic headings while leaving visual design to the consuming product or design system.

The library was designed around WCAG 2.1 guidance and the WAI-ARIA Authoring Practices. Cypress component and integration tests exercise behaviour in a real browser, including keyboard interaction and automated accessibility checks.

Adoption depended on more than a reliable API. I built interactive Docusaurus documentation with live examples and code samples so engineers could understand both how to use a primitive and which interaction problem it solved.

## Result

The library was adopted quickly inside Feedzai and became an accessibility foundation for Escudo, its internal design system. Reusing the same patterns gave product teams a more consistent starting point and kept difficult interaction behaviour out of one-off implementations.

I was the library's sole creator and maintainer at Feedzai. I now maintain the public `@jtmdias/react-a11y-tools` fork and use it regularly across personal and professional projects. The current package remains available on npm with primitives for route and message announcements, focus management, roving tabindex, keyboard-only testing, skip links, semantic headings and tabbable-element discovery.

## Learning

Accessibility scales more effectively when the difficult behaviour is reusable, tested and documented, while teams still retain responsibility for how it works in the finished product.
