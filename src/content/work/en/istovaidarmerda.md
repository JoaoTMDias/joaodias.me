---
locale: en
translationKey: istovaidarmerda
title: Isto Vai Dar Merda
slug: istovaidarmerda
date: 2021-01-01T00:00:00.000Z
shortDescription: A website for an irreverent online conference created during the pandemic lockdown.
description: A Next.js event site delivered in one weekend, combining serious subjects, a playful visual identity and a few deliberately smelly surprises.
role: Frontend engineer, working from Henrique Macedo's visual identity
problem: A pandemic-era online conference needed a distinctive site delivered over one weekend without sacrificing core usability.
impact: The finished Next.js site supported the event and translated its playful identity into a tested, keyboard-operable experience.
sourceCode: "https://github.com/JoaoTMDias/istovaidarmerda.online"
liveDemo: null
skills:
  - nextjs
  - cypress
  - jest
  - testing-library
thumbnail: /work/istovaidarmerda.online/project-icon.svg
cover: /work/istovaidarmerda.online/project-cover.jpg
galleryImages:
  - image: /work/istovaidarmerda.online/project-1.jpg
    alt: Isto Vai Dar Merda website homepage
    caption: ''
  - image: /work/istovaidarmerda.online/project-2.jpg
    alt: Website content page
    caption: ''
  - image: /work/istovaidarmerda.online/project-cover@2x.jpg
    alt: Project cover image
    caption: ''
themeBackground: "#f5e7ad"
themeForeground: "#4d352d"
---

## Context

Isto Vai Dar Merda was an online conference about the less positive effects of the pandemic across different parts of society. Henrique Macedo created its wonderfully irreverent visual identity; I had one weekend to turn it into the event website.

The deadline made prioritisation essential. The site needed to communicate the programme and support the event first, while still carrying the humour and personality that made its identity memorable.

## Process and decisions

I implemented the design in Next.js and Styled Components, creating reusable pieces quickly without flattening Henrique's visual direction. Jest and Testing Library covered components and Cypress exercised the complete flows in a browser. The test suite enforced a 95% global coverage threshold, which helped keep a very fast build disciplined.

Semantic structure, heading order, forms, focus visibility and keyboard navigation were handled during implementation. Automated checks with axe-core supplemented those tests rather than standing in for manual review.

Then there were the easter eggs. The site included optional fart sounds because, well, the conference was called Isto Vai Dar Merda. They remained separate from essential information and interaction, so the joke did not become an obstacle for people using the site with a keyboard or assistive technology.

## Result

The finished site supported the online event and preserved a distinctive identity under a very short deadline. It is also a compact example of accessibility working alongside humour rather than sanding away everything unusual about a design.

## Learning

Constraints do not have to produce bland work. Clear priorities, early accessibility decisions and focused testing made it possible to move quickly without losing either usability or personality.
