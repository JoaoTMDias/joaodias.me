---
title: "@jtmdias/react-a11y-tools"
slug: react-a11y-tools
date: 2020-09-01
shortDescription: A small component library that eases the process of creating accessible design systems, web apps or websites. Available on npm.
description: A small component and utility library that eases the process of creating accessible web content. It is open-source and available on NPM.
accessibilityConsiderations: |
  This library is specifically designed to solve accessibility challenges in React applications:

  - **Route Announcements** - Helps screen reader users navigate single-page applications by announcing route changes (similar to what Gatsby had, but works with any router)
  - **Roving Tabindex** - Implements the roving tabindex pattern for keyboard navigation in menus, comboboxes, and other composite widgets
  - **Focus Trap** - Traps focus within modals and dialogs, ensuring keyboard users can't accidentally navigate outside the modal
  - **Heading Order** - Provides utilities to ensure correct heading hierarchy on pages
  - **Focusable Disabled Elements** - Allows traditionally keyboard-excluded components (like disabled buttons) to receive focus while remaining disabled and properly announced to screen readers

  All components are built following WCAG 2.1 guidelines and WAI-ARIA best practices. The library has been tested with screen readers including NVDA, JAWS, and VoiceOver.

  Since version 1.0.0, this library has been used in production UI projects at Feedzai and Farfetch, demonstrating its real-world applicability.
technicalApproach: |
  Built with:
  - **React** - Component library for React applications
  - **Node** - For build tooling and npm package management
  - **Cypress Component Testing** - For testing components in real browser environments
  - **esbuild** - For fast builds during development
  - **Rollup** - For production builds and npm package bundling

  The library follows the work done by Marcy Sutton for Gatsby's accessibility features, but extends it to work with any routing library including Next.js.

  Components are designed to be composable and work together seamlessly. The library focuses on common accessibility patterns that developers repeatedly implement across projects.
process: |
  The development process started with identifying common accessibility patterns that I was repeatedly implementing across different projects. The goal was to create reusable components that solve real accessibility challenges.

  Cypress component testing was used to test components in real browser environments, ensuring they work correctly with assistive technologies. The library was documented using Docusaurus to provide clear usage examples and API documentation.

  The library was developed iteratively, adding components as I encountered new accessibility challenges in my work.
results: |
  The library has been successfully used in production at Feedzai and Farfetch, demonstrating its value in real-world applications. It's available on npm and has helped other developers implement accessibility features more easily.

  This project showcases how accessibility can be built into reusable components, making it easier for developers to create accessible applications without needing deep accessibility expertise.
sourceCode: https://github.com/JoaoTMDias/frontend/tree/main/packages/react-a11y-tools
liveDemo:
skills:
  - react
  - node
  - cypress-component-testing
  - esbuild
  - rollup
thumbnail: /projects/react-a11y-tools/project-icon.svg
cover: /projects/react-a11y-tools/project-cover.jpg
themeBackground: "#FFC9CB"
themeForeground: "#1b1d1c"
---

## The Problem

Have you ever tried to build an accessible and complex web pattern, such as a roving tabindex or a focus trap inside a dialog? And have you tried to reuse that implementation logic in different projects without too much of a hassle?

That's exactly the point where I got. I've been working with web accessibility before React was a thing and each new project brought new challenges. And repeated code for the same patterns.

Along came React, with this new reactivity paradigm shift, this idea of building components, the 'lego pieces' for the web. But I still had to repeat the same implementations for the same usage patterns over and over again.

There were already a few libraries in this space that did most of what I wanted, but I didn't need all of it, just a small set of tailored components, for the common accessibility challenges I faced daily as a frontend developer.

## The Solution

For starters, I wanted something that would help me announce route changes on a single-page app. At the time, only Gatsby had something like that implemented, so I followed the work that Marcy Sutton had made for the framework and did something similar that could be used with any routing library and even Next.js.

Then, I also wanted a piece of software that could allow me to easily implement a roving tabindex pattern, very commonly found in navigation components, such as menus and comboboxes.

Finally, something that could allow me to trap focus within a certain area, such as a modal or a dialog window.

Of course, I ended up adding a bit more components and helpers for specific uses-cases that I found out that I needed at work, such as a system of rendering out the correct heading order on a page or even allowing traditionally keyboard-excluded components (such as disabled buttons) to be able to receive focus but skill be disabled and announced as such.

I also wrote the documentation using Docusaurus.

Since version 1.0.0 this little library has been used on UI projects at Feedzai and Farfetch

