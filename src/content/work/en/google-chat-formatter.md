---
locale: en
translationKey: google-chat-formatter
title: Google Chat Formatter
slug: google-chat-formatter
date: 2022-01-01T00:00:00.000Z
shortDescription: A browser extension for preparing formatted text before pasting it into Google Chat.
description: A compact, accessible editor that filled a gap in Google Chat until native formatting arrived.
role: Product designer and frontend engineer
problem: Google Chat did not offer rich-text controls, while injecting UI into its unstable contenteditable implementation would be fragile.
impact: An accessible browser-extension popup provided formatting until Google introduced its own native editor.
sourceCode: "https://github.com/JoaoTMDias/g-chat-format-bar"
liveDemo: null
skills:
  - preact
  - vitejs
  - cypress
  - chromium
thumbnail: /work/g-chat-format-bar/project-icon.svg
cover: /work/g-chat-format-bar/project-cover.jpg
galleryImages:
  - image: /work/g-chat-format-bar/project-1.jpg
    alt: Rich Content Editor experience
    caption: ""
  - image: /work/g-chat-format-bar/project-2.jpg
    alt: Google Chat Formatter extension interface
    caption: ""
  - image: /work/g-chat-format-bar/project-3.jpg
    alt: Formatting toolbar with text editor
    caption: ""
themeBackground: "#69f0ae"
themeForeground: "#0f1729"
---

## Context

Google Chat did not provide rich-text controls when I built this extension. My first idea was to place a formatting toolbar beside its editor, but the interface used a `contenteditable` element without stable identifiers. Injecting controls there would tie the extension to implementation details that Google could change at any time.

## Process and decisions

I chose an independent browser-extension popup instead. People could prepare formatted text in a predictable interface and paste the result into Google Chat without the extension manipulating a third-party page.

Preact kept the interface small while retaining a familiar component model. CSS Modules isolated its styles, Vite handled the extension build, and Cypress component tests exercised the editor in a real browser rather than a simulated DOM.

The popup supported keyboard operation, accessible names, focus management, and light and dark themes. These behaviours were part of the component tests, alongside automated checks with axe-core.

## Result

The extension served its purpose for several months. When Google introduced its own formatting editor, the workaround was no longer necessary—a natural end for a tool built around a temporary product gap.

## Learning

A less invasive integration can be more resilient than one that reaches deeply into an interface you do not control. Sometimes success also means knowing when a workaround has finished its job.
