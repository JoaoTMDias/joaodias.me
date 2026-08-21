---
locale: pt
translationKey: google-chat-formatter
title: Google Chat Formatter
date: 2022-01-01
shortDescription: Uma extensão que permitia criar texto formatado para o Google Chat.
description: Uma interface compacta e acessível para preparar texto formatado antes de o colar no Google Chat.
role: Designer de produto e engenheiro frontend
problem: O Google Chat não tinha controlos de texto formatado e injetar uma interface no seu contenteditable instável seria frágil.
impact: O popup acessível resolveu a necessidade durante vários meses, até o Google lançar o seu próprio editor.
sourceCode: https://github.com/JoaoTMDias/g-chat-format-bar
liveDemo: null
skills: [preact, vite, cypress, chromium]
thumbnail: /work/g-chat-format-bar/project-icon.svg
cover: /work/g-chat-format-bar/project-cover.jpg
galleryImages:
  - image: /work/g-chat-format-bar/project-1.jpg
    alt: Experiência do editor de conteúdo formatado
  - image: /work/g-chat-format-bar/project-2.jpg
    alt: Interface da extensão Google Chat Formatter
  - image: /work/g-chat-format-bar/project-3.jpg
    alt: Barra de formatação e editor de texto
themeBackground: "#69f0ae"
themeForeground: "#0f1729"
---

## Contexto e processo

A primeira hipótese foi inserir controlos junto ao campo do Google Chat. A aplicação usava um `contenteditable` sem identificadores estáveis, pelo que essa integração ficaria dependente de detalhes internos.

Optei por um popup independente em Preact. CSS Modules isolou estilos, Vite simplificou o build e os testes de componentes com Cypress validaram o comportamento num navegador real.

## Acessibilidade

A interface suportava teclado, nomes acessíveis, gestão de foco e temas claro e escuro. O objetivo não era imitar o Google Chat, mas oferecer um fluxo previsível para preparar texto.

## Resultado e aprendizagem

A extensão foi útil até o produto receber edição nativa. O projeto demonstrou que uma integração menos invasiva pode ser mais robusta e acessível do que manipular uma interface de terceiros.

