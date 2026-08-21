---
locale: pt
translationKey: react-a11y-tools
title: "@jtmdias/react-a11y-tools"
date: 2022-08-01
shortDescription: Primitivas React testadas para padrões recorrentes de acessibilidade em sistemas de design, aplicações e sites.
description: Uma biblioteca de código aberto que transforma gestão de foco, navegação por teclado, anúncios e estrutura semântica em componentes e hooks React reutilizáveis.
role: Criador e responsável de manutenção da biblioteca
problem: Na Feedzai, as equipas encontravam repetidamente padrões complexos de acessibilidade, mas nem sempre tinham o conhecimento especializado ou o tempo necessário para os implementar de forma consistente.
impact: A biblioteca tornou-se uma base de acessibilidade do Escudo, o sistema de design interno da Feedzai, e continua a apoiar projetos pessoais e profissionais através da minha versão mantida.
featuredOrder: 2
sourceCode: https://github.com/JoaoTMDias/frontend/tree/main/packages/react-a11y-tools
liveDemo: https://www.npmjs.com/package/@jtmdias/react-a11y-tools
skills: [react, typescript, cypress-component-testing, vite, docusaurus]
thumbnail: /work/react-a11y-tools/project-icon.svg
cover: /work/react-a11y-tools/project-cover.jpg
themeBackground: "#FFC9CB"
themeForeground: "#1b1d1c"
---

## Contexto

Criei o React A11y Tools enquanto trabalhava na Feedzai, onde as equipas desenvolvem software para instituições financeiras e a acessibilidade não pode ser tratada como um acabamento. Em geral, os profissionais de engenharia queriam fazer o que estava certo, mas os padrões de interação complexos exigem conhecimento especializado e tempo que uma equipa nem sempre tem durante uma entrega.

Os mesmos desafios regressavam: gerir o foco em diálogos, implementar roving tabindex, anunciar mudanças de rota e preservar uma hierarquia de títulos com sentido. Equipas diferentes resolviam-nos de formas diferentes e, sob pressão, alguns padrões corriam o risco de ser simplificados ou ignorados.

## Processo e decisões

Transformei essas soluções recorrentes numa biblioteca dedicada de componentes e hooks React. As primitivas oferecem comportamento para gestão de foco, navegação por teclado, anúncios, links para saltar conteúdo e títulos semânticos, deixando o desenho visual a cargo do produto ou sistema de design que as utiliza.

A biblioteca foi desenhada com base nas orientações das WCAG 2.1 e nos padrões do WAI-ARIA Authoring Practices. Os testes de componentes e de integração com Cypress exercitam o comportamento num navegador real, incluindo a interação por teclado e verificações automáticas de acessibilidade.

A adoção dependia de mais do que uma API fiável. Criei documentação interativa com Docusaurus, exemplos funcionais e amostras de código, para que cada profissional pudesse compreender como usar uma primitiva e qual o problema de interação que esta resolvia.

## Resultado

A biblioteca foi rapidamente adotada na Feedzai e tornou-se uma base de acessibilidade do Escudo, o seu sistema de design interno. A reutilização dos mesmos padrões deu às equipas de produto um ponto de partida mais consistente e evitou que comportamentos de interação complexos ficassem espalhados por implementações pontuais.

Fui o único criador e responsável pela manutenção da biblioteca na Feedzai. Atualmente, mantenho a versão pública `@jtmdias/react-a11y-tools` e uso-a regularmente em projetos pessoais e profissionais. O pacote continua disponível no npm, com primitivas para anúncios de rotas e mensagens, gestão de foco, roving tabindex, testes sem rato, links para saltar conteúdo, títulos semânticos e descoberta de elementos navegáveis com Tab.

## Aprendizagem

A acessibilidade ganha escala quando o comportamento difícil é reutilizável, testado e documentado, sem retirar às equipas a responsabilidade pelo seu funcionamento no produto final.
