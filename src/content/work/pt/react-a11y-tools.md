---
locale: pt
translationKey: react-a11y-tools
title: "@jtmdias/react-a11y-tools"
date: 2022-08-01
shortDescription: Componentes e utilitários React para implementar padrões recorrentes de acessibilidade.
description: Uma biblioteca pública que transforma soluções repetidas de acessibilidade em primitivas reutilizáveis e testadas.
role: Designer e responsável de manutenção da biblioteca
problem: As equipas implementavam repetidamente padrões difíceis de acessibilidade com resultados inconsistentes.
impact: O pacote npm disponibiliza primitivas para foco, navegação, anúncios e estrutura semântica em diferentes aplicações.
featuredOrder: 2
sourceCode: https://github.com/JoaoTMDias/frontend/tree/main/packages/react-a11y-tools
liveDemo: https://www.npmjs.com/package/@jtmdias/react-a11y-tools
skills: [react, typescript, cypress-component-testing, vite, npm]
thumbnail: /work/react-a11y-tools/project-icon.svg
cover: /work/react-a11y-tools/project-cover.jpg
themeBackground: "#FFC9CB"
themeForeground: "#1b1d1c"
---

## Contexto

Mudanças de rota, roving tabindex, gestão de foco e hierarquia de títulos são problemas recorrentes. Reimplementá-los em cada produto aumenta o risco e o custo de teste.

## Processo e decisões

Transformei as soluções que usava em projetos reais numa biblioteca React composta por componentes e utilitários independentes. Os consumidores escolhem apenas o padrão necessário, sem adotar um design system completo.

Os testes de componentes com Cypress validam o comportamento num navegador. A documentação liga cada API ao problema de interação que resolve.

## Resultado

A biblioteca está publicada no npm e foi utilizada em interfaces de produção. O monorepo partilha documentação, publicação e ferramentas com JS Utilities e Merge Coverage.

## Aprendizagem

Uma abstração de acessibilidade deve tornar o comportamento correto mais fácil, sem esconder a responsabilidade de testar com pessoas, teclado e tecnologias de apoio.

