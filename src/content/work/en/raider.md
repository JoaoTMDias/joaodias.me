---
locale: en
translationKey: raider
title: Raider
date: 2026-07-01
shortDescription: An interactive way to discover artists and the relationships between them.
description: A music-discovery product that turns Last.fm data into searchable artist profiles, related-artist paths and playable context.
role: Product designer and frontend engineer
problem: Recommendation lists hide why artists are connected and make it difficult to explore beyond the next suggested item.
impact: Raider combines search, artist detail, related acts and top tracks in a visual exploration interface without requiring third-party login.
featuredOrder: 3
sourceCode: https://github.com/JoaoTMDias/raider
liveDemo: null
skills:
  - nextjs
  - react
  - typescript
  - visx
  - lastfm
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

Music recommendations usually arrive as flat lists. I wanted discovery to feel exploratory: start with an artist, understand the surrounding scene and move deliberately through related acts.

## Process and decisions

I designed search, artist detail and related-artist exploration as one continuous flow. Last.fm supplies discovery data without requiring users to create or connect another account.

Next.js and React provide the application structure. TanStack Query manages remote state, Visx renders relationships and zoomable hierarchy, and Zustand keeps focused interface state separate from server data.

## Accessibility and engineering

Ariakit and React A11y Tools provide robust interaction foundations. Playwright and axe-core cover integration and automated accessibility checks. Textual artist details and top tracks remain available alongside the visual relationship map.

## Result

The application supports artist search, related artists, profiles and top tracks in a single product with no third-party authentication requirement.

## Learning

Visual exploration works best when it adds a path through information rather than becoming the only way to access it.

