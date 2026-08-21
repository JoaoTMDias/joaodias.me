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

Quando criei esta extensão, o Google Chat não tinha controlos de texto formatado. A primeira hipótese foi inserir uma barra junto ao editor, mas a interface usava um elemento `contenteditable` sem identificadores estáveis. Essa solução ficaria dependente de detalhes internos que a Google poderia alterar a qualquer momento.

Optei por um popup independente. As pessoas podiam preparar o texto numa interface previsível e colar o resultado no Google Chat, sem que a extensão manipulasse uma página de terceiros.

O Preact manteve a interface pequena e um modelo de componentes familiar. CSS Modules isolou os estilos, Vite tratou do build e os testes de componentes com Cypress exercitaram o editor num navegador real, em vez de num DOM simulado.

O popup suportava teclado, nomes acessíveis, gestão de foco e temas claro e escuro. Estes comportamentos faziam parte dos testes de componentes, juntamente com verificações automáticas através do axe-core.

## Resultado

A extensão cumpriu o seu propósito durante vários meses. Quando a Google introduziu o seu próprio editor de formatação, deixou de ser necessária — um fim natural para uma ferramenta criada em resposta a uma lacuna temporária do produto.

## Aprendizagem

Uma integração menos invasiva pode ser mais resistente do que outra que interfere profundamente com uma interface fora do nosso controlo. Por vezes, ter sucesso também significa reconhecer que uma solução temporária já cumpriu o seu papel.
