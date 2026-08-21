---
role: 'Designer de produto, arquiteto e engenheiro principal'
problem: 'Durante uma grande atualização do site da Feedzai, a equipa não tinha uma forma repetível de executar verificações básicas de acessibilidade em todas as páginas e acompanhar regressões entre versões.'
impact: 'As auditorias repetíveis ajudaram a equipa a reduzir as violações de acessibilidade no site publicado, enquanto o projeto evoluiu para uma plataforma reutilizável em fluxos locais, de CI e assistidos por IA.'
coverAlt: Logótipo do A11y Page Checker sobre uma vista desfocada do painel local de auditoria.
locale: pt
translationKey: a11y-page-checker
title: A11y Page Checker
date: 2026-01-16T00:00:00.000Z
shortDescription: 'Uma plataforma local para auditorias de acessibilidade repetíveis em URL, sitemaps, sites explorados e planos de teste.'
description: |
  Uma plataforma de auditoria com Playwright e axe-core, composta por CLI, painel local, relatórios portáteis e ferramentas para agentes de IA.
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

A ideia surgiu durante uma grande atualização do site da Feedzai. Não tínhamos uma forma automatizada e repetível de executar verificações básicas de acessibilidade em todas as páginas, comparar versões ou confirmar que uma correção resistia à publicação seguinte.

Os testes manuais continuavam a ser essenciais, mas as extensões de navegador e os scripts pontuais não se adaptavam bem a uma publicação com muitas páginas. Comecei a combinar Playwright e axe-core para executar as mesmas verificações localmente ou em CI e produzir relatórios JSON e HTML mais fáceis de comparar e partilhar.

## Processo e decisões

A primeira versão lia o `sitemap.xml` e auditava cada URL. Mais tarde, acrescentei listas explícitas de URL e exploração na mesma origem, tornando o motor útil para sites e aplicações de página única cujas rotas nem sempre aparecem num sitemap.

À medida que o projeto cresceu, dividi-o em pacotes especializados. A descoberta de URL, a execução do Playwright e do axe e a normalização dos resultados pertencem ao motor central. Um contrato `ScanResult` estável e tipado serve depois vários adaptadores substituíveis: a CLI, o gerador de relatórios HTML, o painel local e o servidor MCP.

O painel é deliberadamente local. Aceita ligações apenas em loopback, coloca as análises em fila e guarda o histórico em SQLite. Eventos de ciclo de vida tipados permitem que cada interface apresente o progresso sem ficar acoplada ao motor.

Os planos em Markdown tornam o âmbito de uma auditoria legível por pessoas e ferramentas. Já permitem definir alvos e validar metadados de interação; a execução dessas ações de uma história de utilizador continua a ser aperfeiçoada. Também introduzi cedo o pacote MCP, para que agentes de IA pudessem executar as mesmas auditorias através de uma interface de ferramentas definida, em vez de dependerem de uma integração separada.

## Acessibilidade e engenharia

As verificações automáticas não conseguem demonstrar que um produto é acessível. Por isso, os relatórios apresentam os problemas encontrados pelo axe-core, em vez de uma pontuação genérica ou uma declaração de conformidade. HTML determinístico e protegido, JSON legível por máquinas e estados de erro explícitos tornam os resultados úteis em fluxos locais e automatizados.

Cada URL tentado conserva o seu próprio resultado. Se uma página não carregar ou não puder ser analisada, a ferramenta regista a falha e continua com os restantes alvos independentes, em vez de descartar toda a auditoria.

## Resultado

As auditorias originais ajudaram a equipa da Feedzai a reduzir as violações de acessibilidade, deixando o site publicado com bastante menos problemas do que a primeira versão.

Atualmente, o A11y Page Checker suporta URL individuais, sitemaps e exploração na mesma origem através de uma API TypeScript, CLI, painel local, relatórios JSON e HTML e ferramentas MCP. Destina-se a profissionais de desenvolvimento web, engenharia de sistemas de design e equipas de produto que precisam de auditorias repetíveis em fluxos locais, pipelines de CI ou ferramentas assistidas por IA. O projeto continua em desenvolvimento enquanto estabilizo a API pública e expando os planos de análise baseados em interações.

## Aprendizagem

Uma verificação pontual torna-se muito mais valiosa quando uma equipa consegue repeti-la, comparar o resultado e integrá-la na forma como já trabalha.
