---
locale: pt
translationKey: its-a-trap
title: "É uma armadilha!"
pubDate: 2026-08-10T02:37:07.191Z
updatedDate: 2026-08-20T00:00:00.000Z
excerpt: "O acesso por teclado não está completo quando uma pessoa consegue entrar num componente mas não consegue sair. Saiba como o critério WCAG 2.1.2 se aplica a diálogos, widgets e conteúdo incorporado."
category: accessibility
featuredImage: /its-a-trap.jpeg
readingTime: 6
---

Imagina entrar numa sala e ouvir a porta a trancar-se atrás de ti. Uma armadilha de teclado cria o equivalente numa interface: o foco entra num componente, mas a pessoa que usa o teclado não o consegue retirar de lá.

Para quem navega sem um dispositivo apontador, o resto da página pode ficar inacessível. Atualizar a página, abandonar uma tarefa ou sair do site nunca deveria ser a única forma de escapar.

## O que exigem as WCAG

O [Critério de Sucesso 2.1.2 das WCAG 2.2, Sem Bloqueio do Teclado](https://www.w3.org/TR/WCAG22/#no-keyboard-trap), é um requisito de nível A. Quando o foco consegue entrar num componente, também deve ser possível afastá-lo usando apenas uma interface de teclado.

Se a saída exigir algo além das setas sem modificadores, Tab ou outro método habitual, a interface tem de explicar como sair. A [explicação do W3C](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) acrescenta que uma armadilha pode interferir com a página inteira.

### Acesso e saída são complementares

O Critério 2.1.1 pergunta se a funcionalidade pode ser operada através de teclado. O Critério 2.1.2 pergunta se a pessoa consegue sair depois de entrar. Um calendário pode responder corretamente às setas e impedir que Tab ou Escape regressem ao formulário. Um leitor multimédia pode expor todos os controlos e repetir o foco internamente para sempre.

## Quem é afetado

As armadilhas podem bloquear pessoas que utilizam:

- teclado sem rato;
- leitores de ecrã e comandos de teclado;
- dispositivos de comutação ou sistemas sip-and-puff;
- software de voz que associa comandos a teclas;
- fluxos temporariamente dependentes do teclado.

A necessidade comum é uma forma previsível de entrar, operar e sair de cada parte da interface.

## Gerir o foco não é criar uma armadilha

Um diálogo modal mantém normalmente o foco dentro de si enquanto está aberto. Torna-se uma armadilha quando não pode ser fechado por teclado, a ação de fechar não recebe foco ou o foco regressa ao interior depois de uma tentativa válida de saída.

Um modal bem gerido move o foco para um elemento adequado, retira a página inativa da ordem de foco, oferece uma ação de fechar, suporta Escape quando apropriado e devolve o foco a um ponto lógico.

O elemento HTML `<dialog>` e `.showModal()` oferecem comportamento útil do navegador, mas não eliminam a necessidade de escolher o foco inicial e testar a interação completa.

## Padrões comuns de falha

### Conteúdo incorporado captura o foco

Leitores multimédia, editores e widgets de terceiros podem tratar Tab ou as setas internamente. Testa a integração real. Se não existir uma saída fiável, reconfigura, substitui ou isola o componente com instruções claras.

### Widgets compostos entram em ciclo

Menus, grelhas, comboboxes e seletores de data usam frequentemente setas internamente e Tab para sair. Segue os padrões relevantes do [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/) e separa a navegação interna da navegação da página.

### Event handlers anulam a saída

Um handler global de `keydown` que chama `preventDefault()` de forma demasiado abrangente pode engolir Tab ou Escape. Cancela uma tecla nativa apenas quando existe uma alternativa completa e testada.

### A saída existe mas não recebe foco

Um botão de fechar pode estar visível e ter sido removido da ordem de foco ou escondido das tecnologias de apoio. A inspeção visual não basta: o controlo tem de ser alcançável, ter nome e funcionar.

## Um teste prático

1. Afasta o rato e começa no início da página.
2. Avança e recua com Tab e Shift+Tab.
3. Opera controlos com Enter, Espaço e as setas quando esperado.
4. Abre diálogos, menus, seletores, leitores e widgets incorporados.
5. Experimenta todas as formas documentadas de sair.
6. Confirma que o foco continua visível e regressa a um ponto lógico.
7. Repete em diferentes tamanhos de ecrã.
8. Inclui testes com leitor de ecrã quando a semântica ou os anúncios influenciam a interação.

As verificações automáticas encontram alguns erros, mas não provam que todos os estados têm uma saída com sentido. Este critério exige interação manual.

## O modelo mental útil

Não perguntes apenas: “Consigo chegar aqui com um teclado?” Faz três perguntas: consigo entrar, consigo operar e consigo sair?

Quando as três respostas são previsíveis, o acesso por teclado torna-se parte do design de interação, em vez de uma verificação tardia.
