---
locale: pt
translationKey: winpicker
title: WinPicker
date: 2024-01-01T00:00:00.000Z
shortDescription: Um seletor de cores e verificador de contraste para Windows.
description: Uma aplicação Fluent UI que permite recolher cores do sistema, compará-las e consultar imediatamente o contraste WCAG.
role: Designer de produto e engenheiro frontend
problem: Profissionais de design e desenvolvimento em Windows precisavam de recolher cores e compreender rapidamente o respetivo contraste.
impact: O protótipo juntou seleção de cores ao nível do sistema e feedback imediato de contraste numa aplicação desktop.
featuredOrder: 4
sourceCode: https://github.com/JoaoTMDias/winpicker
liveDemo: null
skills: [react, vite, electron, fluent-ui, windows-11]
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

## Contexto e processo

Explorei inicialmente React Native para Windows, mas escolhi Electron para prototipar mais depressa com tecnologias web. Um executável externo recolhe a cor no sistema e comunica com a aplicação através dos processos do Electron.

## Acessibilidade e design

O Fluent UI aproximou a aplicação dos padrões do Windows e forneceu uma base para teclado, foco visível e modos de alto contraste. A interface apresenta rácios e estados de conformidade para texto normal e grande sem depender apenas da cor.

## Resultado e aprendizagem

O WinPicker tornou o contraste parte do momento de escolha da cor. O projeto mostrou como ferramentas pequenas podem incorporar acessibilidade diretamente no fluxo de design.

