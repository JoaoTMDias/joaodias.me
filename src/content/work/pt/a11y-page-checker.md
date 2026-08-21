---
role: 'Designer de produto, arquiteto e engenheiro principal'
problem: 'As verificações de acessibilidade ficam frequentemente dispersas por scripts, extensões e relatórios difíceis de repetir ou partilhar.'
impact: 'O projeto disponibiliza o mesmo motor numa CLI, painel local, relatórios HTML e servidor MCP, isolando falhas por página.'
featuredOrder: 1
coverAlt: Logótipo do A11y Page Checker sobre uma vista desfocada do painel local de auditoria.
locale: pt
translationKey: a11y-page-checker
title: A11y Page Checker
date: 2026-07-16T00:00:00.000Z
shortDescription: 'Uma plataforma local para auditorias de acessibilidade repetíveis em URL, sitemaps e sites explorados.'
description: |
  Uma plataforma de auditoria de acessibilidade com várias interfaces, construída sobre um contrato de resultados tipado e estável.
sourceCode: 'https://github.com/JoaoTMDias/a11y-page-checker'
liveDemo: null
skills:
  - acessibilidade
  - playwright
  - axe-core
  - typescript
  - react
  - mcp
thumbnail: /work/a11y-page-checker/project-icon.svg
cover: /work/a11y-page-checker/project-cover.webp
galleryImages:
  - image: /work/a11y-page-checker/scan-setup.webp
    alt: Formulário do A11y Page Checker configurado para iniciar uma análise local de um sitemap.
    caption: 'Uma análise pode partir de uma exploração, sitemap ou plano Markdown e é executada apenas na máquina local.'
  - image: /work/a11y-page-checker/findings-list.webp
    alt: 'Análise de sitemap concluída, com resumo de progresso e lista de problemas de contraste de cor.'
    caption: O painel conserva o resultado global e apresenta os problemas encontrados em cada página.
  - image: /work/a11y-page-checker/finding-detail.webp
    alt: 'Problemas de acessibilidade expandidos, com orientação da regra, HTML afetado e detalhes de contraste.'
    caption: 'Cada problema mantém o contexto da regra, a página e o elemento afetado.'
  - image: /work/a11y-page-checker/html-report.webp
    alt: Relatório HTML de acessibilidade que resume problemas encontrados nas páginas analisadas.
    caption: O mesmo contrato de resultados normalizado produz um relatório HTML portátil.
  - image: /work/a11y-page-checker/cli-audit.webp
    alt: Terminal a executar a CLI do A11y Page Checker e a apresentar problemas em várias páginas.
    caption: 'A CLI usa o mesmo motor para fluxos locais, repetíveis e automatizados.'
themeBackground: '#144232'
themeForeground: '#C4EDDF'
---

## Contexto

Uma auditoria de acessibilidade precisa de mais do que uma pontuação. As equipas têm de definir alvos, repetir verificações, compreender cada problema e conservar resultados úteis quando uma página falha.

## Processo e decisões

Desenhei o produto em torno de um contrato `ScanResult` normalizado. A descoberta de URL, execução do axe e normalização pertencem ao pacote central; a CLI, o painel, o gerador de relatórios e o servidor MCP são adaptadores desse contrato.

O painel é deliberadamente local. Aceita ligações apenas em loopback, processa uma análise de cada vez e guarda o histórico em SQLite. Eventos de ciclo de vida tipados permitem que cada interface apresente o progresso sem ficar acoplada ao motor.

Os planos em Markdown tornam o âmbito legível por pessoas e ferramentas. Uma falha numa página fica registada nesse alvo sem cancelar trabalho independente.

## Acessibilidade e engenharia

O motor combina Playwright e axe-core, sem apresentar a automação como uma auditoria completa. Relatórios HTML determinísticos, JSON e estados de erro explícitos tornam os resultados reutilizáveis.

## Resultado

O projeto suporta URL explícitos, sitemaps e exploração na mesma origem através de API TypeScript, CLI, painel e ferramentas MCP. Continua em desenvolvimento enquanto a API pública estabiliza.

## Aprendizagem

As melhores ferramentas para equipas de desenvolvimento partem de um contrato pequeno e fiável, rodeado por interfaces substituíveis.
