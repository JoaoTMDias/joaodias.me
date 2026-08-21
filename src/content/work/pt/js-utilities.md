---
locale: pt
translationKey: js-utilities
title: "@jtmdias/js-utilities"
date: 2023-01-01
shortDescription: Funções JavaScript e hooks React focados, partilhados entre produtos web sem dependências generalistas.
description: Um pacote tipado e compatível com tree shaking que substitui auxiliares copiados e dependências usadas para uma única função por utilitários testados.
role: Criador e responsável de manutenção da biblioteca
problem: As equipas da Feedzai copiavam repetidamente os mesmos auxiliares ou instalavam bibliotecas como lodash e react-use para usar apenas uma ou duas funções.
impact: O pacote partilhado reduziu a duplicação e o tamanho dos bundles de produção nos produtos da Feedzai, enquanto a versão que mantenho apoia o meu trabalho de código aberto.
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

Comecei o JS Utilities na Feedzai depois de encontrar as mesmas pequenas funções copiadas entre produtos. Noutros casos, as equipas instalavam pacotes generalistas como lodash ou react-use para obter um ou dois auxiliares, acrescentando mais código e outra dependência para resolver um problema limitado.

Cada função era simples. A implementação repetida, as correções inconsistentes e o custo acumulado nos bundles não eram. Queria uma única biblioteca testada que as equipas pudessem adotar seletivamente, sem a transformar noutro framework de utilitários demasiado grande.

## Processo e decisões

Construí a biblioteca a partir de padrões já usados em produção. Inclui pequenos auxiliares de teste como `random` e `draw`; verificações de tipo como `isNil`, `isEmpty` e `isPromise`; utilitários para arrays e objetos; abstrações para armazenamento no navegador e cookies; e hooks React como `useAutoId`, `useConstant`, `usePrevious`, `useMount` e `useIntersection`.

O pacote publica versões ESM e CommonJS com as respetivas declarações TypeScript. O CommonJS manteve a compatibilidade com ferramentas antigas da Feedzai, enquanto ESM e `sideEffects: false` permitem que os bundlers modernos removam código não utilizado.

Os hooks React vivem numa exportação `./hooks` separada. Assim, quem usa JavaScript sem React pode importar funções como `classNames`, `chunk` ou `getValue` sem incluir código específico de React no bundle.

O limite de 11 kB partiu do tamanho total do bundle da versão 1.0.0. Transformei esse valor inicial num limite automático, para impedir que novas conveniências se transformassem silenciosamente em peso desnecessário. Os testes de componentes com Cypress exercitam as funções e os hooks num navegador.

A minha versão vive no monorepo frontend partilhado porque o React A11y Tools depende dela e porque os pacotes podem partilhar a infraestrutura de build, testes, documentação e publicação, em vez de repetirem essa configuração em repositórios separados.

## Resultado

O pacote original `@feedzai/js-utilities` é usado nos principais produtos da Feedzai, incluindo Case Manager, Pulse, Genome, RiskOps Studio, SAR Manager e o sistema de design Escudo. A substituição de auxiliares copiados e dependências generalistas maiores reduziu a duplicação e o tamanho dos bundles de produção nesse conjunto de produtos.

Continuo a manter e publicar `@jtmdias/js-utilities` no npm. Uso-o diariamente nos meus projetos, onde fornece a mesma base focada aos restantes pacotes do monorepo.

## Aprendizagem

Uma biblioteca de utilitários partilhada continua a ser útil quando cada adição justifica o seu lugar. Pontos de entrada separados, consumidores reais e um limite fixo de tamanho impedem que a conveniência se transforme noutra fonte de peso nas dependências.
