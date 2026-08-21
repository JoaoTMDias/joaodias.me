---
locale: pt
translationKey: js-utilities
title: "@jtmdias/js-utilities"
date: 2023-01-01
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
thumbnail: /work/js-utilities/project-icon.svg
cover: /work/js-utilities/project-cover.png
coverAlt: Documentação do JS Utilities a apresentar o pacote e as suas funções reutilizáveis e hooks React.
galleryImages:
  - image: /work/js-utilities/api-overview.png
    alt: Visão geral da documentação do JS Utilities com a API disponível organizada por categoria.
    caption: A documentação facilita a descoberta e compreensão da API pública do pacote.
    width: 1600
    height: 1200
  - image: /work/js-utilities/utility-example.png
    alt: Documentação de uma função do JS Utilities com a assinatura, os parâmetros e um exemplo de utilização.
    caption: Cada utilitário é documentado com a informação necessária para o utilizar sem consultar a implementação.
    width: 1600
    height: 1200
  - image: /work/js-utilities/package-tests.png
    alt: Resultados dos testes automatizados do pacote JS Utilities num terminal.
    caption: Os testes automatizados protegem o comportamento das funções partilhadas e dos hooks React.
    width: 1236
    height: 666
themeBackground: "#072720"
themeForeground: "#25C2A0"
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

