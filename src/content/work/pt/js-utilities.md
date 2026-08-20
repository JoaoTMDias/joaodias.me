---
locale: pt
translationKey: js-utilities
title: JS Utilities
date: 2025-01-01
shortDescription: Funções JavaScript e hooks React empacotados para reutilização entre projetos web.
description: Um pequeno pacote público que substitui auxiliares repetidos em cada projeto por importações testadas e tipadas.
role: Responsável de manutenção e autor da biblioteca
problem: Reimplementar os mesmos utilitários e hooks cria divergências, testes duplicados e custos de bundle evitáveis.
impact: Um pacote npm versionado fornece ESM, CommonJS, declarações de tipos e exportações separadas para hooks com um limite de 11 kB.
sourceCode: https://github.com/JoaoTMDias/frontend/tree/main/packages/js-utilities
liveDemo: https://www.npmjs.com/package/@jtmdias/js-utilities
skills:
  - typescript
  - react
  - vite
  - cypress
  - npm
thumbnail: /logo.svg
themeBackground: "#f3f4f6"
themeForeground: "#111827"
---

## Contexto

Pequenos auxiliares tornam-se infraestrutura quando vários produtos dependem deles. Copiá-los esconde a responsabilidade e torna as correções inconsistentes.

## Processo e decisões

Reuni funções JavaScript e hooks React recorrentes num pacote público do monorepo frontend. O pacote expõe um ponto de entrada geral e outro específico para hooks, ambos com declarações TypeScript.

O Vite produz versões ESM e CommonJS. Limites automáticos mantêm cada bundle publicado abaixo dos 11 kB definidos, enquanto os testes de componentes com Cypress validam o comportamento num navegador real.

## Resultado

O pacote está publicado no npm e pode ser atualizado de forma independente, partilhando documentação e ferramentas com os restantes pacotes do monorepo.

## Aprendizagem

A reutilização compensa quando a superfície pública, a compatibilidade e o custo de publicação são menores do que a duplicação eliminada.

