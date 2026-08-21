---
locale: en
translationKey: raider
title: Raider
date: 2026-07-01
shortDescription: A single-screen reference for exploring artists and the relationships between them.
description: A music-discovery tool that combines Last.fm data, Deezer imagery and interactive relationship maps for quick research.
role: Product designer and frontend engineer
problem: While presenting a radio show, moving between separate artist pages made it difficult to research connections and compare related acts quickly on air.
impact: Raider brings search, artist details, related acts and top tracks into one visual reference without requiring a third-party login.
sourceCode: https://github.com/JoaoTMDias/raider
liveDemo: https://music-raider.netlify.app/
skills:
  - nextjs
  - react
  - typescript
  - visx
  - lastfm
  - deezer
  - playwright
thumbnail: /work/raider/project-icon.svg
cover: /work/raider/project-cover.webp
galleryImages:
  - image: /work/raider/5-raider-artist-search.webp
    alt: Raider artist search interface
  - image: /work/raider/3-raider-artist-detail.webp
    alt: Artist details with biography and top tracks
  - image: /work/raider/2-raider-related-artists.webp
    alt: Visual map of related artists
themeBackground: "#000000"
themeForeground: "#B78FF0"
---

## Context

I created Raider to solve a problem I encountered while presenting a radio show. On air, I needed a quick reference for an artist's background, popular tracks and connections to other musicians. Spotify and other streaming services made that research a page-by-page journey, just when I needed several pieces of information on one screen.

I also wanted a practical reason to learn Visx and explore how an external music API could drive an interactive data visualisation rather than another recommendation list.

## Process and decisions

The first version used Spotify's developer API. When Spotify removed access to the endpoints Raider depended on, the application lost its data source and I had to rethink the integration rather than abandon the product.

I moved artist discovery, profiles, related acts and top tracks to Last.fm, then added Deezer as a separate source for higher-quality artist imagery. Neither integration requires the person using Raider to create or connect an account.

I designed search, artist detail and relationship exploration as one continuous flow. Next.js and React provide the application structure, TanStack Query manages remote data, and Zustand keeps focused interface state separate from server state. Visx turns related-artist data into an interactive, zoomable hierarchy that can be explored without opening a chain of new pages.

## Accessibility and engineering

The relationship map adds another route through the information rather than becoming its only representation. Artist details, related acts and top tracks remain available as text alongside the visualisation.

Ariakit and React A11y Tools provide the interaction foundations, while Playwright and axe-core cover integration behaviour and automated accessibility checks.

## Result

Raider is now a working single-page reference for searching artists, checking profiles and top tracks, and moving through related acts without third-party authentication. It serves the original on-air need while remaining an experiment in visual music discovery.

## Learning

External APIs can disappear underneath a product. Keeping their responsibilities separate made the pivot possible, while the visualisation remained useful because it complemented the underlying information instead of replacing it.
