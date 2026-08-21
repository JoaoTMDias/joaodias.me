---
locale: pt
translationKey: its-a-trap
title: "É uma armadilha!"
pubDate: 2026-08-10T02:37:07.191Z
updatedDate: 2026-08-21T00:00:00.000Z
excerpt: "O acesso por teclado não está completo quando uma pessoa consegue entrar num componente mas não consegue sair. Saiba como o critério WCAG 2.1.2 se aplica a diálogos, widgets e conteúdo incorporado."
category: accessibility
featuredImage: /blog/keyboard-trap-cover.webp
featuredImageAlt: Um indicador de foco fica em ciclo dentro de um componente, deixando o resto da página fora de alcance.
readingTime: 6
---

Imagina entrar numa sala e ouvir a porta a trancar-se atrás de ti. Uma armadilha de teclado cria o equivalente numa interface: o foco entra num componente, mas a pessoa que usa o teclado não o consegue retirar de lá.

Para quem navega sem um dispositivo apontador, o resto da página pode ficar inacessível. Atualizar a página, abandonar uma tarefa ou sair do site nunca deveria ser a única forma de escapar.

## O que exigem as WCAG

O [Critério de Sucesso 2.1.2 das WCAG 2.2, Sem Bloqueio do Teclado](https://www.w3.org/TR/WCAG22/#no-keyboard-trap) é um requisito de nível A. Quando o foco consegue entrar num componente, também deve ser possível retirá-lo usando apenas uma interface de teclado.

Se a saída exigir algo além das setas sem modificadores, Tab ou outro método habitual, a interface tem de explicar como sair. A [explicação do W3C](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) acrescenta que uma armadilha pode interferir com a página inteira.

### Acesso e saída são complementares

O Critério 2.1.1 pergunta se a funcionalidade pode ser operada através de teclado. O Critério 2.1.2 pergunta se a pessoa consegue sair depois de entrar. Um calendário pode responder corretamente às setas e impedir que Tab ou Escape regressem ao formulário. Um leitor multimédia pode expor todos os controlos e repetir o foco internamente para sempre.

<figure class="article-visual">
  <figcaption>Um percurso de teclado completo</figcaption>
  <ol class="article-flow">
    <li>Entrar no componente</li>
    <li>Operar todos os controlos</li>
    <li>Sair para o elemento focável seguinte</li>
  </ol>
  <p>Uma armadilha interrompe o último passo: o foco regressa ao componente em vez de continuar pela página.</p>
</figure>

## Quem é afetado

As armadilhas podem bloquear pessoas que utilizam:

- teclado sem rato;
- leitores de ecrã e comandos de teclado;
- dispositivos de comutação ou sistemas sip-and-puff;
- software de voz que associa comandos a teclas.

A necessidade comum é uma forma previsível de entrar, operar e sair de cada parte da interface.

## Gerir o foco não é criar uma armadilha

Um diálogo modal mantém normalmente o foco dentro de si enquanto está aberto. Torna-se uma armadilha quando não pode ser fechado por teclado, a ação de fechar não recebe foco ou o foco regressa ao interior depois de uma tentativa válida de saída.

Um modal bem gerido move o foco para um elemento adequado, torna inerte o conteúdo subjacente, oferece uma ação de fechar, suporta Escape quando apropriado e devolve o foco a um ponto lógico.

O elemento HTML `<dialog>` e `.showModal()` oferecem comportamento útil do navegador, mas não eliminam a necessidade de escolher o foco inicial e testar a interação completa.

<figure class="article-visual">
  <figcaption>Gerir o foco e criar uma armadilha não são a mesma coisa</figcaption>
  <div class="article-comparison">
    <section>
      <h3>Foco modal bem gerido</h3>
      <p>O foco entra no diálogo, alcança todas as ações, Escape ou o botão de fechar encerram-no e o foco regressa ao elemento que o abriu.</p>
    </section>
    <section>
      <h3>Armadilha de teclado</h3>
      <p>O foco entra e circula, mas nenhuma ação alcançável ou comando documentado permite fechar ou abandonar o componente.</p>
    </section>
  </div>
</figure>

## Padrões comuns de falha

### Conteúdo incorporado captura o foco

Leitores multimédia, editores e widgets de terceiros podem tratar Tab ou as setas internamente. Testa a integração real. Se não existir uma saída fiável, reconfigura, substitui ou isola o componente com instruções claras.

### Widgets compostos entram em ciclo

Menus, grelhas, comboboxes e seletores de data usam frequentemente setas internamente e Tab para sair. Segue os padrões relevantes do [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/) e separa a navegação interna da navegação da página.

### Gestores de eventos anulam a saída

Um handler global de `keydown` que chama `preventDefault()` de forma demasiado abrangente pode engolir Tab ou Escape. Cancela uma tecla nativa apenas quando existe uma alternativa completa e testada.

### A saída existe mas não recebe foco

Um botão de fechar pode estar visível e ter sido removido da ordem de foco ou escondido das tecnologias de apoio. A inspeção visual não basta: o controlo tem de ser alcançável, ter nome e funcionar.

## Um teste prático

<figure class="article-visual">
  <figcaption>Checklist de teste por teclado</figcaption>
  <ol class="article-checklist">
    <li>Afasta o rato e avança e recua com Tab e Shift+Tab.</li>
    <li>Opera controlos com Enter, Espaço e as setas quando esperado.</li>
    <li>Abre diálogos, menus, seletores, leitores e widgets incorporados.</li>
    <li>Experimenta todas as formas visíveis ou documentadas de fechar e sair.</li>
    <li>Confirma que o foco continua visível e regressa a um ponto lógico.</li>
    <li>Repete em diferentes tamanhos de ecrã e, quando relevante, com leitor de ecrã.</li>
  </ol>
</figure>

As verificações automáticas encontram alguns erros, mas não provam que todos os estados têm uma saída com sentido. Este critério exige interação manual.

## O modelo mental útil

Não perguntes apenas: “Consigo chegar aqui com um teclado?” Faz três perguntas: consigo entrar, consigo operar e consigo sair?

Quando as três respostas são previsíveis, o acesso por teclado torna-se parte do design de interação, em vez de uma verificação tardia.
