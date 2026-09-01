---
locale: pt
translationKey: finally-were-fixing-headings
title: Finalmente! Vamos dar um jeito aos cabeçalhos!
pubDate: 2026-08-31T11:33:12.236Z
updatedDate: 2026-09-01T00:00:00.000Z
excerpt: 'Num sistema de componentes, o nível de um cabeçalho depende sempre do sítio onde o componente é usado. A spec de HTML começa finalmente a resolver o problema com headingoffset e headingreset. Mas, até o suporte chegar aos browsers, o contexto do React permite aplicar hoje a mesma ideia.'
category: accessibility
tags:
  - web-accessibility
  - a11y
  - react
  - design-systems
  - frontend
  - html
  - javascript
  - web-development
featuredImage: /blog/finally-were-fixing-headings.webp
featuredImageAlt: Diagrama de uma página com um H1, uma secção H2 e dois componentes com cabeçalhos H3, ligados através de headingoffset.
readingTime: 5
---

Sejamos honestos: quem já manteve um design system ou construiu uma biblioteca de componentes com alguma dimensão conhece este pequeno problema do desenvolvimento na web.

Criamos um `<Card>` ou um `<Modal>` bonito, modular e flexível. Tudo parece estar no sítio. Depois chega a auditoria de acessibilidade e alguém pergunta: *"Então, mas afinal, que nível de cabeçalho é que este título usa?"*

E instala-se aquele breve silêncio existencial.

É um `<h2>`? Um `<h3>`?

Depende de onde o componente for usado. Na raiz de um dashboard, provavelmente será um `<h2>`. Dentro de uma grelha, que por sua vez está num painel lateral... talvez seja um `<h5>`.

Normalmente, escolhemos uma de duas soluções, ambas más:

1. **Usar sempre um `<h2>`** e esperar que ninguém coloque o componente debaixo de um `<h3>`.
2. **Expor uma prop `level`** — por exemplo, `<Card headingLevel={3}>` — e obrigar quem usa o componente a seguir mentalmente toda a estrutura da página só para escolher um número.

É uma solução frágil e pouco prática para um ecossistema baseado em componentes. O componente controla o seu conteúdo, mas é a página que determina o lugar que esse conteúdo ocupa na hierarquia. Não faz sentido tentar resolver as duas coisas com uma tag fixa dentro do componente.

## A hierarquia importa

Os cabeçalhos não servem apenas para mostrar texto maior ou a negrito. Descrevem a organização da página. Quem usa um _screen reader_ pode saltar entre cabeçalhos ou abrir uma lista de todos eles para perceber rapidamente o que existe na página e como as diferentes secções se relacionam.

As [orientações do W3C sobre cabeçalhos](https://www.w3.org/WAI/tutorials/page-structure/headings/) explicam com mais detalhe a importância desta estrutura para a navegação e orientação.

Por isso, um nível em falta ou fora do sítio não é apenas uma questão de estilo de código. Um cartão que renderiza sempre um `<h2>` pode parecer correto, mas achatar por completo uma secção na árvore de acessibilidade. Da mesma forma, um componente que usa sempre um `<h4>` cria um salto estranho quando aparece logo depois do `<h1>` da página.

No caso do CSS, já há muito tempo que conseguimos separar o aspeto visual de um cabeçalho do seu nível semântico. O que nos tem faltado é uma forma segura de separar a estrutura interna do componente da posição que ele ocupa na página.

## A miragem do Document Outline Algorithm

Durante mais de uma década, o HTML5 Document Outline Algorithm pareceu oferecer a solução perfeita: bastava envolver o conteúdo em elementos `<section>`, usar um `<h1>` em cada secção e deixar o browser calcular os níveis a partir da estrutura do documento.

Na prática, nunca aconteceu. Os browsers não implementaram este modelo de forma interoperável e útil para as tecnologias de apoio. Assim como assim, continuámos presos aos elementos estáticos `<h1>` até `<h6>` enquanto as aplicações e sites se tornavam cada vez mais dinâmicos e mais difíceis de representar numa hierarquia fixa.

Este contexto é importante porque a nova solução **não é** o regresso do [*Document Outline Algorithm*](https://www.tempertemper.net/blog/the-final-nail-in-the-html5-document-outline-coffin) com outro nome.

## Uma solução explícita no HTML

Num artigo escrito pelo Manuel Matuzović,
[*Context-aware headings in HTML*](https://www.matuzo.at/blog/2026/content-aware-headings), podemos encontrar uma excelente introdução a `headingoffset` e `headingreset`. E os dois novos atributos já fazem parte da [HTML Living Standard](https://html.spec.whatwg.org/dev/sections.html#heading-levels-and-offsets).

O atributo `headingoffset` permite aumentar o nível calculado de todos os cabeçalhos dentro de um elemento que funcione como _container_:

```html
<h1>Dashboard</h1>

<section headingoffset="1">
  <h1>Estatísticas</h1> <!-- Interpretado como nível 2 -->

  <div headingoffset="1">
    <h1>Utilizadores ativos por mês</h1> <!-- Interpretado como nível 3 -->
  </div>
</section>
```

Eu sei que parece estranho ler o HTML desta forma. A mim, pessoalmente, dá-me coçeira: o DOM continua a ter três elementos `<h1>`. O que muda é o nível calculado pelo browser e exposto na árvore de acessibilidade: 1, 2 e 3. Quando existem vários elementos com `headingoffset` aninhados, os respetivos valores são somados.

É precisamente isto que torna o atributo interessante para componentes reutilizáveis. O componente pode manter sempre a mesma estrutura interna, enquanto o elemento que o recebe define a profundidade a que essa estrutura começa.

Já o atributo _boolean_ `headingreset` permite interromper esse cálculo. Os valores de `headingoffset` encontrados acima do elemento deixam de ser considerados:

```html
<div headingoffset="2">
  <h1>Interpretado como nível 3</h1>

  <dialog headingreset>
    <h1>Interpretado como nível 1</h1>
  </dialog>
</div>
```

Os limites estão bem definidos. O valor de `headingoffset` tem de ser um número inteiro entre 0 e 8, e o nível final nunca pode ser superior a 9. Ainda assim, eu acho que ultrapassar os seis níveis representados por `<h1>` até `<h6>` exige cuidado e testes com os browsers e tecnologias usadas pelo público real que consome o produto X.

Se formos ler a explicação do Adrian Roselli no artigo [*headingoffset is Not the Document Outline Algorithm*](https://adrianroselli.com/2026/06/headingoffset-is-not-the-document-outline-algorithm.html), percebemos que o browser não passa a compreender automaticamente o nosso conteúdo. Continua a ser responsabilidade nossa decidir onde faz sentido aplicar um offset ou não.

O browser faz uma conta previsível, mas não toma uma decisão editorial por nós (acho que não queremos isso, honestamente). É exatamente esta diferença que torna a proposta útil: temos controlo explícito, sem depender de um algoritmo que tenta adivinhar a intenção do autor.

## O suporte inicial dos browsers

Uma funcionalidade fazer parte da spec de HTML não significa que esteja pronta para ser usada em produção em todos os browsers. As implementações demoram tempo a convergir, o suporte das tecnologias também varia e as primeiras versões podem ter bugs.

Antes de usar `headingoffset`, é importante inspecionar a árvore de acessibilidade e testar as combinações de browser e _screen reader_/tecnologias assistivas relevantes para um produto. Também temos de pensar no que acontece quando o atributo não é reconhecido: nesse caso, o browser vai acabar por expôr os níveis correspondentes às tags que estão realmente no DOM.

A [documentação de `headingoffset` na MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/headingoffset) descreve o comportamento deste atributo, a relação com o `headingreset` e `aria-level`, e mantém uma tabela de compatibilidade atualizada. À data de publicação, a funcionalidade continua marcada como experimental e ainda não faz parte sequer da Baseline.

Mas isto não significa que a funcionalidade não seja interessante! Pelo contrário: dá-nos uma direção clara para a plataforma e um modelo que já podemos aplicar nos nossos design systems, mesmo antes de podermos confiar na implementação nativa.

## Uma possível solução para os dias de hoje

Este foi precisamente um dos problemas que tentei resolver quando criei os componentes que lidam com cabeçalhos semânticos no pacote [`@jtmdias/react-a11y-tools`](https://www.npmjs.com/package/@jtmdias/react-a11y-tools). O [código-fonte está disponível no GitHub](https://github.com/JoaoTMDias/frontend/tree/main/packages/react-a11y-tools). [A documentação também está disponível.](https://joaotmdias.github.io/frontend/docs/react-a11y-tools/introduction)

Ao invés vez de obrigar cada componente a receber uma prop como `level={4}`, a biblioteca guarda em estado a profundidade atual no estado de um _React context_. O componente `<Heading>` renderiza o elemento `<h1>` até `<h6>` certo, enquanto `<Level>` aumenta um nível a todos os cabeçalhos dentro dele.

```tsx
import { Heading, Level } from "@jtmdias/react-a11y-tools";

function App() {
  return (
    <main>
      {/* Renderiza um <h1> */}
      <Heading>Visão geral do dashboard</Heading>

      <Level>
        <section>
          {/* Renderiza um <h2> */}
          <Heading>Resumo das estatísticas</Heading>

          <Level>
            <article>
              {/* Renderiza um <h3> */}
              <Heading>Utilizadores ativos por mês</Heading>
            </article>
          </Level>
        </section>
      </Level>
    </main>
  );
}
```

Existe aqui uma diferença importante em relação a `headingoffset`: esta solução altera a tag que é realmente renderizada no DOM. O resultado é HTML convencional, compreendido/suportado pelos browsers, sem obrigar os componentes reutilizáveis a conhecer o nível exato em que vão aparecer.

Num design system, a responsabilidade passa para o componente que envolve o conteúdo:

```tsx
function Card({ title, children }) {
  return (
    <article>
      <Heading>{title}</Heading>
      {children}
    </article>
  );
}

function CardGrid({ children }) {
  return <Level>{children}</Level>;
}
```

O `Card` não precisa de saber se está diretamente numa página, dentro de uma secção ou noutro componente. O elemento-pai define a profundidade: o cartão limita-se a descrever a sua própria estrutura.

Na prática, esta minha abordagem acaba por trazer várias vantagens:

- **Acaba com o prop drilling:** o `<Card>` renderiza `<Heading>Título</Heading>` sem precisar de conhecer o nível numérico exigido pela página.
- **Torna os _refactors_ mais seguros:** ao mover um painel para uma zona mais profunda da UI, os cabeçalhos acompanham a nova estrutura.
- **Simplifica as APIs:** os componentes que conhecem a estrutura definem os limites, e os restantes deixam de trocar números entre si.
- **Aproxima-nos do modelo nativo:** a organização através dos componentes que envolvem o conteúdo é semelhante à proposta de `headingoffset`.
- **Produz HTML mais fácil de testar:** podemos verificar diretamente os elementos renderizados e inspecioná-los com as ferramentas de acessibilidade atuais.

O contexto também não resolve tudo sozinho. Um `<Level>` continua a ter de ser colocado no sítio certo. A diferença é que essa decisão fica no componente que conhece a estrutura envolvente, em vez de se repetir em todos os componentes que apenas mostram conteúdo.

## O veredito

A web começa finalmente a resolver um problema que os autores de componentes contornam há anos. `headingoffset` e `headingreset` dão-nos controlo explícito sobre a profundidade dos cabeçalhos sem tentar deduzir a intenção do autor a partir da forma como o DOM se apresenta.

Não são o _Document Outline Algorithm_ e não eliminam a responsabilidade de criar uma hierarquia coerente. Mas, ainda assim, eu acho que oferecem uma base muito melhor para conteúdo reutilizável e componentes encapsulados.

Enquanto o suporte nativo amadurece, deixo aqui uma solução em React permite aplicar hoje a mesma ideia e continuar a produzir elementos `<h1>` até `<h6>` convencionais.
