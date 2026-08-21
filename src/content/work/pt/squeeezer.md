---
locale: pt
translationKey: squeeezer
title: Squeeezer
date: 2026-08-20T00:00:00.000Z
shortDescription: Uma PWA centrada na privacidade que comprime imagens, SVG, PDF e vídeos MP4 inteiramente no navegador.
description: Um compressor de ficheiros que utiliza Web Workers e WebAssembly para manter o processamento exigente fluido e os ficheiros pessoais no dispositivo de quem o utiliza.
role: Designer de produto, arquiteto e engenheiro
problem: Os limites de tamanho dos ficheiros levavam as pessoas a recorrer a ferramentas online duvidosas, mesmo quando as imagens e os documentos eram pessoais ou confidenciais.
impact: O Squeeezer oferece uma interface bilingue e instalável para comprimir formatos comuns sem contas, uploads ou backend.
sourceCode: https://github.com/JoaoTMDias/Squeeezer
liveDemo: https://squeeezer.netlify.app/
skills:
  - react
  - typescript
  - vite
  - pwa
  - web-workers
  - webassembly
  - ffmpeg
  - playwright
thumbnail: /work/squeeezer/project-icon.svg
cover: /work/squeeezer/project-cover.webp
coverAlt: Logótipo do Squeeezer sobre uma vista desfocada da interface de compressão de ficheiros no navegador.
galleryImages:
  - image: /work/squeeezer/empty-dropzone.webp
    alt: Aplicação Squeeezer no desktop com uma área vazia para largar ficheiros e os formatos suportados.
    caption: Os ficheiros podem ser largados na interface ou escolhidos com o seletor nativo, permanecendo no navegador durante todo o processamento.
    width: 1179
    height: 732
  - image: /work/squeeezer/compression-controls.webp
    alt: Controlos de compressão do Squeeezer com predefinições e opções de otimização SVG.
    caption: Os controlos opcionais equilibram o tamanho e a qualidade do resultado, preservando por predefinição os metadados e a informação de acessibilidade dos SVG.
    width: 1147
    height: 682
  - image: /work/squeeezer/completed-results.webp
    alt: Fila do Squeeezer com quatro ficheiros concluídos, os tamanhos comprimidos e as percentagens poupadas.
    caption: Cada resultado mantém o seu progresso, a comparação de tamanhos e a ação para descarregar numa única fila de processamento.
    width: 1140
    height: 658
  - image: /work/squeeezer/portuguese-view.webp
    alt: Interface do Squeeezer em português europeu com o seletor de idioma aberto.
    caption: Toda a interface está disponível em inglês e português europeu, incluindo mensagens de estado e formatação de números localizadas.
    width: 1186
    height: 711
  - image: /work/squeeezer/pwa-installation.webp
    alt: Janela do navegador para instalar o Squeeezer como aplicação web progressiva.
    caption: O Squeeezer pode ser instalado a partir de um navegador compatível, mantendo a mesma arquitetura local e sem backend.
    width: 1066
    height: 737
themeBackground: "#38BDF8"
themeForeground: "#0F172A"
---

## Contexto

O Squeeezer nasceu de um problema próximo de casa. O meu pai pedia-me regularmente para comprimir imagens e PDF, enquanto a minha mulher, que é advogada, encontrava muitas vezes limites de tamanho rígidos em formulários jurídicos. As ferramentas online disponíveis pediam-lhes, quase sempre, que enviassem ficheiros pessoais para um servidor desconhecido antes de receberem uma versão mais pequena.

Queria uma resposta mais simples: abrir uma aplicação web, escolher um ficheiro e comprimi-lo sem que alguma vez saísse do dispositivo. O resultado tinha de servir tarefas quotidianas e continuar a ser útil para profissionais de desenvolvimento e design que otimizam imagens ou recursos SVG.

## Processo e decisões

Desenhei o Squeeezer como uma aplicação web progressiva porque queria testar até onde a plataforma web moderna podia levar um produto computacionalmente exigente. Não requer conta, backend ou wrapper de desktop. Depois de carregado, o navegador fornece a interface, o acesso local aos ficheiros, o ambiente de processamento e o resultado para descarregar.

A compressão de JPEG, PNG e WebP utiliza codecs jSquash orientados para o navegador. Os ficheiros SVG são validados antes e depois da otimização com SVGO, com controlos para preservar metadados e informação de acessibilidade. O processamento de PDF remove metadados e reestrutura os documentos com fluxos de objetos compactos, evitando deliberadamente a rasterização de imagens com perda. A compressão de MP4 executa FFmpeg compilado para WebAssembly diretamente no navegador.

Reunir estes motores foi o principal desafio de engenharia. Cada um tem requisitos diferentes de carregamento, memória e formato de saída, e o processamento de vídeo pode ser particularmente exigente. Coloquei o trabalho num Web Worker dedicado para que a descodificação, compressão e transcodificação não bloqueiem a interface. Os objetos `ArrayBuffer` de entrada e saída são transferidos entre threads em vez de copiados, e os URL Blob temporários são revogados quando os resultados saem da fila.

## Produto e acessibilidade

A interface aceita drag and drop ou o seletor de ficheiros nativo, inclui controlos opcionais de qualidade e dimensões, progresso por ficheiro, comparação de tamanhos e ficheiros prontos a descarregar. Está disponível em inglês e português europeu e pode ser instalada como PWA.

O progresso e a conclusão da compressão são anunciados através de uma região `aria-live`. A interface inclui links para saltar blocos de conteúdo, foco visível, controlos semânticos e alternativas com movimento reduzido. Testei toda a experiência manualmente com teclado e NVDA, em conjunto com testes de componentes, verificações automáticas de acessibilidade e testes Playwright do fluxo de compressão em produção.

A privacidade é uma restrição arquitetural, não uma promessa acrescentada à interface. Os bytes dos ficheiros permanecem no navegador, os recursos dos codecs são servidos com a aplicação e não existe qualquer endpoint de upload ou sistema de análise a receber o conteúdo.

## Resultado

Lancei a primeira versão estável do Squeeezer a 20 de agosto de 2026. A aplicação comprime ficheiros JPEG, PNG, WebP, SVG, PDF e MP4 através de uma única fila responsiva, apresentando o tamanho original, o resultado comprimido e a percentagem poupada antes do download.

Os próximos passos passam por levar a aplicação para um domínio próprio e aperfeiçoar a experiência de gestão de ficheiros. Estou também a investigar se os navegadores podem substituir de forma segura um ficheiro de origem selecionado; se a plataforma não oferecer essa capacidade de forma consistente, poderá ser uma razão para explorar um pequeno wrapper nativo, como o Tauri.

## Aprendizagem

O WebAssembly torna possíveis ferramentas ambiciosas no navegador, mas a tecnologia, por si só, não é o produto. Os Workers, a gestão de memória, a transparência sobre as limitações de cada formato e uma fronteira clara de privacidade são o que transforma vários codecs poderosos em algo em que as pessoas podem confiar para tratar os seus ficheiros.
