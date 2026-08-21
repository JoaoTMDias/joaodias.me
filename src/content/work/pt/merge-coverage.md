---
locale: pt
translationKey: merge-coverage
title: "@jtmdias/merge-coverage"
date: 2023-04-01
shortDescription: Uma CLI que combina cobertura e relatórios de testes do Jest, Vitest e Cypress.
description: Uma ferramenta de linha de comandos focada em transformar evidência de testes dispersa num resultado útil para CI.
role: Designer da CLI e responsável de manutenção
problem: Diferentes test runners produzem ficheiros de cobertura e JUnit separados, escondendo o sinal global de qualidade no CI.
impact: A CLI publicada limpa resultados antigos, combina cobertura e agrega relatórios JUnit com pastas e destinos configuráveis.
sourceCode: https://github.com/JoaoTMDias/frontend/tree/main/packages/merge-coverage
liveDemo: https://www.npmjs.com/package/@jtmdias/merge-coverage
skills:
  - node
  - typescript
  - oclif
  - ci
  - testes
thumbnail: /work/merge-coverage/project-icon.svg
cover: /work/merge-coverage/project-cover.png
coverAlt: Interface de linha de comandos do Merge Coverage a combinar relatórios de cobertura de testes num único resultado.
themeBackground: "#0080FF"
themeForeground: "#00101F"
---

## Contexto

Uma estratégia de testes frontend pode usar ferramentas para testes unitários, de componentes e end-to-end. Cada uma produz evidência útil, mas os relatórios separados dificultam a leitura e publicação do resultado conjunto.

## Processo e decisões

Criei uma pequena CLI com o oclif e comandos explícitos para limpar pastas antigas, combinar cobertura e agregar XML JUnit. As opções permitem escolher ferramentas, pastas e ficheiros de saída sem alterar o código da aplicação.

O pacote vive junto das bibliotecas que o utilizam, pelo que os consumidores reais exercitam continuamente o fluxo.

## Resultado

O Merge Coverage é um pacote público no npm que suporta fluxos com Jest, Vitest e Cypress e pode ser chamado em scripts de ciclo de vida ou no CI.

## Aprendizagem

A experiência de desenvolvimento melhora quando um problema de integração se transforma num comando previsível, com entradas e saídas claras.

