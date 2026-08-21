---
locale: pt
translationKey: merge-coverage
title: "@jtmdias/merge-coverage"
date: 2023-04-01
shortDescription: Uma CLI que transforma relatórios de cobertura e testes de várias ferramentas num único resultado pronto para CI.
description: Uma ferramenta de linha de comandos em TypeScript para limpar resultados antigos, combinar cobertura e agregar relatórios JUnit.
role: Criador e responsável pela manutenção da CLI
problem: A Feedzai tinha milhares de testes em Jest e centenas em Cypress, mas os relatórios separados escondiam o código que continuava sem testes.
impact: Um único comando previsível substituiu a agregação manual de relatórios em pipelines de CI de produção na Feedzai e na Farfetch.
sourceCode: https://github.com/JoaoTMDias/frontend/tree/main/packages/merge-coverage
liveDemo: https://www.npmjs.com/package/@jtmdias/merge-coverage
skills:
  - node
  - typescript
  - oclif
  - playwright
  - ci
  - testes
thumbnail: /work/merge-coverage/project-icon.svg
cover: /work/merge-coverage/project-cover.png
coverAlt: Interface de linha de comandos do Merge Coverage a combinar relatórios de cobertura de testes num único resultado.
themeBackground: "#0080FF"
themeForeground: "#00101F"
---

## Contexto

Criei o Merge Coverage na Feedzai depois de encontrar um ponto cego considerável na nossa estratégia de testes. Tínhamos milhares de testes unitários em Jest e centenas de testes de integração em Cypress, mas cada ferramenta produzia os seus próprios ficheiros de cobertura e JUnit. Consultar apenas um desses relatórios não permitia perceber que partes do código continuavam sem testes no conjunto completo.

As equipas podiam agregar esses ficheiros manualmente ou acrescentar mais scripts ao CI, mas esse trabalho era repetitivo e propenso a erros. Queria transformar todo o processo num único comando, com o mesmo comportamento localmente e num pipeline.

## Processo e decisões

Desenvolvi a ferramenta como uma CLI em TypeScript com três responsabilidades bem definidas: limpar pastas de relatórios antigos, combinar dados de cobertura Istanbul e agregar relatórios JUnit em XML. As equipas podem configurar as ferramentas envolvidas, as pastas de origem e os destinos sem alterar o código da aplicação.

Escolhi o oclif porque, na altura, oferecia a melhor experiência de desenvolvimento que tinha encontrado para ferramentas de linha de comandos em TypeScript. O processamento de argumentos, as opções e a estrutura de comandos davam-me as peças necessárias para construir uma pequena CLI sem ter de começar por criar toda essa infraestrutura.

O fluxo original juntava Jest e Cypress; o suporte para Vitest surgiu à medida que a nossa estratégia de testes evoluiu. Na Farfetch, alarguei a mesma convenção para incluir a cobertura do Playwright no CI de produtos como o CR Manager. Como a agregação trabalha com ficheiros de cobertura normalizados, em vez de depender dos detalhes internos de cada ferramenta, é possível acrescentar outra ferramenta sem alterar o propósito do comando.

O resultado é um relatório de cobertura HTML unificado e um ficheiro JUnit agregado, que os sistemas de CI podem publicar e as equipas podem consultar. Incluir a limpeza dos relatórios na mesma CLI também evita que resultados de uma execução anterior contaminem silenciosamente a seguinte.

## Resultado

O Merge Coverage foi adotado nos pipelines de GitLab de produtos da Feedzai como o Case Manager, o SAR Manager e o design system Escudo, onde continua a ser utilizado anos depois do primeiro lançamento. Também o usei em pipelines da Farfetch e continuo a escolhê-lo para os meus projetos sempre que mais do que uma ferramenta de testes contribui para a cobertura.

O pacote continua a ser fiável em produção, embora as dependências e algumas partes da implementação beneficiem de uma modernização. O seu principal valor mantém-se: as equipas obtêm uma visão mais completa da cobertura sem manter scripts personalizados de agregação de relatórios em cada produto.

## Aprendizagem

Uma pequena ferramenta de desenvolvimento pode ter uma longa vida útil quando transforma um problema de integração confuso num comando previsível, com entradas e saídas claras.
