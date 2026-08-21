---
locale: pt
translationKey: winpicker
title: WinPicker
date: 2024-01-01T00:00:00.000Z
shortDescription: Um seletor de cores multiplataforma com feedback imediato sobre o contraste WCAG.
description: Uma aplicação Tauri e React para recolher cores de primeiro plano e de fundo, compará-las e compreender o respetivo contraste.
role: Designer de produto e engenheiro frontend
problem: Queria uma ferramenta de cores simples para o meu próprio fluxo em Windows, mas as opções disponíveis não combinavam recolha de cores em qualquer ponto do ecrã com informação clara sobre acessibilidade.
impact: O protótipo pessoal evoluiu de uma experiência exclusiva para Windows para a base de uma aplicação desktop multiplataforma e leve.
featuredOrder: 4
sourceCode: https://github.com/JoaoTMDias/winpicker
liveDemo: null
skills: [react, typescript, vite, tauri, fluent-ui, playwright]
thumbnail: /work/winpicker/project-icon.svg
cover: /work/winpicker/winpicker-cover.jpeg
galleryImages:
  - image: /work/winpicker/winpicker-1.png
    alt: Interface principal do WinPicker
  - image: /work/winpicker/winpicker-2.png
    alt: Ecrã de seleção de cores
  - image: /work/winpicker/winpicker-3.jpg
    alt: Resultados de contraste no WinPicker
themeBackground: "#003C6D"
themeForeground: "#FFB3B3"
---

## Contexto

O WinPicker começou como uma ferramenta pessoal. No Windows 11, queria recolher rapidamente cores de primeiro plano e de fundo em qualquer ponto do ecrã, compará-las e compreender o contraste do texto sem alternar entre vários utilitários.

O primeiro objetivo era deliberadamente limitado: melhorar o meu próprio fluxo de design e desenvolvimento com as tecnologias web que já conhecia. A oportunidade a longo prazo era levar a mesma experiência a mais do que um sistema operativo.

## Processo e decisões

Comecei por explorar React Native para Windows e passei depois para Electron, para prototipar com React e chegar além de uma aplicação exclusiva para Windows. O Electron facilitou essa transição, mas incluir um motor de navegador completo parecia desproporcionado para um pequeno utilitário de cores.

Mais tarde, migrei a aplicação desktop para Tauri. A interface continua a usar React, Vite e Fluent UI, enquanto o Tauri produz uma aplicação nativa mais leve ao recorrer ao motor web de cada sistema operativo, em vez de incluir um navegador completo em cada versão.

A versão atual já não depende de um executável personalizado para Windows. Usa controlos de cor nativos da Web e a funcionalidade EyeDropper quando o navegador ou motor web subjacente permite recolher cores em qualquer ponto do sistema. Manter essa fronteira na camada web apoia a direção multiplataforma sem assumir que todos os ambientes oferecem um comportamento idêntico.

## Contraste e acessibilidade

O pacote `get-contrast` calcula o rácio entre as cores de primeiro plano e de fundo. Traduzo esse valor numa escala rápida de cinco estrelas e apresento também resultados WCAG AA e AAA explícitos para texto normal e grande, para que o resumo visual nunca substitua os critérios subjacentes.

O acesso por teclado, o foco visível e o suporte para tecnologias de apoio fizeram parte da interface desde o início. Testei a experiência desktop com NVDA, Narrador do Windows e VoiceOver, e verifiquei a interface móvel com TalkBack. Playwright e axe-core acrescentam testes de integração e verificações automáticas de acessibilidade.

## Resultado

O WinPicker continua a ser um protótipo funcional e precisa de outra fase de desenvolvimento antes do primeiro lançamento público como executável. Planeio esse lançamento para mais tarde em 2026, tendo como objetivo imediato versões desktop multiplataforma e mantendo a interface web preparada para um suporte mais amplo de sistemas operativos.

## Aprendizagem

Uma aplicação multiplataforma não tem de incluir o mesmo ambiente pesado em todos os sistemas. Apoiar-me nas capacidades web nativas e manter a camada desktop substituível permitiu que uma pequena ferramenta para Windows evoluísse para uma direção de produto mais portátil.
