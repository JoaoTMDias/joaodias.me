---
title: "@jtmdias/react-a11y-tools"
slug: react-a11y-tools
date: 2020-09-01T00:00:00.000Z
shortDescription: >-
  A small component library that eases the process of creating accessible design
  systems, web apps or websites. Available on npm.
description: >
  A small component and utility library that eases the process of creating
  accessible web content. It is open-source and available on NPM.
sourceCode: "https://github.com/JoaoTMDias/frontend/tree/main/packages/react-a11y-tools"
liveDemo: null
skills:
  - react
  - node
  - cypress-component-testing
  - esbuild
  - rollup
thumbnail: /projects/react-a11y-tools/project-icon.svg
cover: /projects/react-a11y-tools/project-cover.jpg
galleryImages:
  - /projects/react-a11y-tools/project-1.jpg
  - /projects/react-a11y-tools/project-2.jpg
  - /projects/react-a11y-tools/project-3.jpg
  - /projects/react-a11y-tools/project-4.jpg
  - /projects/react-a11y-tools/project-5.jpg
  - /projects/react-a11y-tools/project-6.jpg
  - /projects/react-a11y-tools/project-7.jpg
  - /projects/react-a11y-tools/project-8.jpg
  - /projects/react-a11y-tools/project-9.jpg
  - /projects/react-a11y-tools/project-10.jpg
themeBackground: "#FFC9CB"
themeForeground: "#1b1d1c"
---

## Accessibility Considerations

This library is specifically designed to solve accessibility challenges in React applications:

- **Route Announcements** - Helps screen reader users navigate single-page applications by announcing route changes (similar to what Gatsby had, but works with any router)
- **Roving Tabindex** - Implements the roving tabindex pattern for keyboard navigation in menus, comboboxes, and other composite widgets
- **Focus Trap** - Traps focus within modals and dialogs, ensuring keyboard users can't accidentally navigate outside the modal
- **Heading Order** - Provides utilities to ensure correct heading hierarchy on pages
- **Focusable Disabled Elements** - Allows traditionally keyboard-excluded components (like disabled buttons) to receive focus while remaining disabled and properly announced to screen readers

All components are built following WCAG 2.1 guidelines and WAI-ARIA best practices. The library has been tested with screen readers including NVDA, JAWS, and VoiceOver.

Since version 1.0.0, this library has been used in production UI projects at Feedzai and Farfetch, demonstrating its real-world applicability.

## Technical Approach

Built with:

- **React** - Component library for React applications
- **Node** - For build tooling and npm package management
- **Cypress Component Testing** - For testing components in real browser environments
- **esbuild** - For fast builds during development
- **Rollup** - For production builds and npm package bundling

The library follows the work done by Marcy Sutton for Gatsby's accessibility features, but extends it to work with any routing library including Next.js.

Components are designed to be composable and work together seamlessly. The library focuses on common accessibility patterns that developers repeatedly implement across projects.

## Process

The development process started with identifying common accessibility patterns that I was repeatedly implementing across different projects. The goal was to create reusable components that solve real accessibility challenges.

Cypress component testing was used to test components in real browser environments, ensuring they work correctly with assistive technologies. The library was documented using Docusaurus to provide clear usage examples and API documentation.

The library was developed iteratively, adding components as I encountered new accessibility challenges in my work.

## Results & Impact

The library has been successfully used in production at Feedzai and Farfetch, demonstrating its value in real-world applications. It's available on npm and has helped other developers implement accessibility features more easily.

This project showcases how accessibility can be built into reusable components, making it easier for developers to create accessible applications without needing deep accessibility expertise.
