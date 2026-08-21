---
locale: pt
translationKey: raider
title: Raider
date: 2026-07-01
shortDescription: Uma forma interativa de descobrir artistas e as relações entre eles.
description: Um produto de descoberta musical que transforma dados do Last.fm em pesquisa, perfis, percursos entre artistas relacionados e contexto musical.
role: Designer de produto e engenheiro frontend
problem: As listas de recomendações escondem a relação entre artistas e dificultam a exploração para além da sugestão seguinte.
impact: O Raider combina pesquisa, detalhes, projetos relacionados e faixas populares numa interface visual sem exigir autenticação de terceiros.
featuredOrder: 3
sourceCode: https://github.com/JoaoTMDias/raider
liveDemo: https://music-raider.netlify.app/
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
    alt: Interface de pesquisa de artistas do Raider
  - image: /work/raider/3-raider-artist-detail.webp
    alt: Detalhes de um artista, biografia e faixas populares
  - image: /work/raider/2-raider-related-artists.webp
    alt: Mapa visual de artistas relacionados
themeBackground: "#000000"
themeForeground: "#B78FF0"
---

## Contexto

As recomendações musicais costumam chegar em listas planas. Quis que a descoberta fosse exploratória: começar num artista, compreender a cena envolvente e avançar deliberadamente por projetos relacionados.

## Processo e decisões

Desenhei a pesquisa, os detalhes e a exploração de relações como um fluxo contínuo. O Last.fm fornece os dados sem obrigar a criar ou ligar outra conta.

Next.js e React estruturam a aplicação. O TanStack Query gere o estado remoto, o Visx apresenta relações e hierarquias ampliáveis, e o Zustand separa o estado focado da interface dos dados do servidor.

## Acessibilidade e engenharia

O Ariakit e o React A11y Tools fornecem bases robustas para interação. Playwright e axe-core cobrem integração e verificações automatizadas. Os detalhes textuais e as faixas continuam disponíveis em paralelo com o mapa visual.

## Resultado

A aplicação permite pesquisar artistas, explorar projetos relacionados, perfis e faixas populares num único produto, sem autenticação de terceiros.

## Aprendizagem

A exploração visual funciona melhor quando acrescenta um percurso pela informação, sem se tornar a única forma de lhe aceder.

