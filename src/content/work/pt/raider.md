---
locale: pt
translationKey: raider
title: Raider
date: 2026-07-01
shortDescription: Uma ferramenta de consulta num único ecrã para explorar artistas e as relações entre eles.
description: Uma ferramenta de descoberta musical que combina dados do Last.fm, imagens do Deezer e mapas interativos de relações para pesquisa rápida.
role: Designer de produto e engenheiro frontend
problem: Durante a apresentação de um programa de rádio, navegar entre páginas separadas dificultava a pesquisa de ligações e a comparação rápida de artistas relacionados em direto.
impact: O Raider reúne pesquisa, detalhes de artistas, artistas relacionados e faixas populares numa referência visual sem exigir autenticação de terceiros.
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
    alt: Interface de pesquisa de artistas do Raider
  - image: /work/raider/3-raider-artist-detail.webp
    alt: Detalhes de um artista, biografia e faixas populares
  - image: /work/raider/2-raider-related-artists.webp
    alt: Mapa visual de artistas relacionados
themeBackground: "#000000"
themeForeground: "#B78FF0"
---

## Contexto

Criei o Raider para resolver um problema que encontrava ao apresentar um programa de rádio. Em direto, precisava de consultar rapidamente o percurso de um artista, as faixas mais conhecidas e as ligações a outros músicos. O Spotify e outros serviços de streaming transformavam essa pesquisa numa sequência de páginas, precisamente quando precisava de reunir várias informações num único ecrã.

Também procurava uma razão prática para aprender Visx e explorar como uma API externa de música poderia alimentar uma visualização de dados interativa, em vez de mais uma lista de recomendações.

## Processo e decisões

A primeira versão usava a API para programadores do Spotify. Quando o Spotify retirou o acesso aos endpoints de que o Raider dependia, a aplicação perdeu a sua fonte de dados e tive de repensar a integração em vez de abandonar o produto.

Passei a descoberta, os perfis, os artistas relacionados e as faixas populares para o Last.fm, acrescentando depois o Deezer como fonte separada de imagens de artistas com maior qualidade. Nenhuma das integrações exige que a pessoa crie ou associe uma conta ao Raider.

Desenhei a pesquisa, os detalhes de artistas e a exploração de relações como um fluxo contínuo. Next.js e React estruturam a aplicação, o TanStack Query gere os dados remotos e o Zustand mantém o estado específico da interface separado do estado do servidor. O Visx transforma os dados de artistas relacionados numa hierarquia interativa e ampliável, que pode ser explorada sem abrir uma cadeia de novas páginas.

## Acessibilidade e engenharia

O mapa de relações acrescenta outro percurso pela informação, sem se tornar a sua única representação. Os detalhes, os artistas relacionados e as faixas populares continuam disponíveis em texto junto da visualização.

O Ariakit e o React A11y Tools fornecem as bases de interação, enquanto o Playwright e o axe-core cobrem o comportamento de integração e as verificações automáticas de acessibilidade.

## Resultado

O Raider é agora uma ferramenta de consulta funcional num único ecrã, que permite pesquisar artistas, consultar perfis e faixas populares e explorar artistas relacionados sem autenticação de terceiros. Responde à necessidade original em direto e continua a ser um projeto experimental de descoberta musical visual.

## Aprendizagem

As APIs externas podem desaparecer por baixo de um produto. Manter as suas responsabilidades separadas tornou possível a mudança, enquanto a visualização continuou a ser útil por complementar a informação subjacente, em vez de a substituir.
