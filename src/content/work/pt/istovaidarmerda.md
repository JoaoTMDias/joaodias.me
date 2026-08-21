---
locale: pt
translationKey: istovaidarmerda
title: Isto Vai Dar Merda
date: 2021-01-01
shortDescription: O site de uma conferência online sobre os efeitos menos positivos da pandemia.
description: Um site Next.js entregue num fim de semana, combinando conteúdo sério, uma identidade irreverente e pequenos easter eggs.
role: Engenheiro frontend, a partir da identidade visual de Henrique Macedo
problem: Uma conferência criada durante o confinamento precisava de uma presença distinta, rápida e utilizável.
impact: O site apoiou o evento e traduziu a identidade visual numa experiência testada e operável por teclado.
sourceCode: https://github.com/JoaoTMDias/istovaidarmerda.online
liveDemo: null
skills: [nextjs, cypress, jest, testing-library]
thumbnail: /work/istovaidarmerda.online/project-icon.svg
cover: /work/istovaidarmerda.online/project-cover.jpg
galleryImages:
  - image: /work/istovaidarmerda.online/project-1.jpg
    alt: Página inicial do Isto Vai Dar Merda
  - image: /work/istovaidarmerda.online/project-2.jpg
    alt: Página de conteúdos da conferência
themeBackground: "#f5e7ad"
themeForeground: "#4d352d"
---

## Contexto e papel

O Isto Vai Dar Merda foi uma conferência online sobre os efeitos menos positivos da pandemia em diferentes áreas da sociedade. Henrique Macedo criou uma identidade visual deliciosamente irreverente; eu tive um fim de semana para a transformar no site do evento.

O prazo obrigou a definir prioridades com clareza. O site tinha primeiro de comunicar o programa e apoiar o evento, sem perder o humor e a personalidade que tornavam a identidade memorável.

## Engenharia e acessibilidade

Implementei o design em Next.js e Styled Components, criando peças reutilizáveis rapidamente sem diluir a direção visual do Henrique. Jest e Testing Library cobriram os componentes, enquanto o Cypress exercitou os fluxos completos num navegador. A suite impunha um limiar global de 95% de cobertura, ajudando a manter disciplinado um desenvolvimento muito rápido.

A estrutura semântica, a hierarquia de títulos, os formulários, o foco visível e a navegação por teclado foram tratados durante a implementação. As verificações automáticas com axe-core complementaram os testes, sem substituir a revisão manual.

E havia, claro, os easter eggs. O site incluía sons de peidos opcionais porque, enfim, a conferência chamava-se Isto Vai Dar Merda. Ficaram separados da informação e das interações essenciais, para que a piada não se tornasse um obstáculo para quem usava o site com teclado ou tecnologias de apoio.

## Resultado

O site final apoiou o evento online e preservou uma identidade distinta apesar do prazo muito curto. É também um pequeno exemplo de como a acessibilidade pode coexistir com o humor, sem retirar a um design tudo o que o torna invulgar.

## Aprendizagem

As restrições não têm de produzir trabalho insípido. Prioridades claras, decisões de acessibilidade tomadas cedo e testes focados permitiram avançar depressa sem perder usabilidade nem personalidade.
