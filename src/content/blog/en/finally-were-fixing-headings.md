---
locale: en
translationKey: finally-were-fixing-headings
title: Finally! We're fixing headings!
pubDate: 2026-08-31T11:33:12.236Z
updatedDate: 2026-09-01T00:00:00.000Z
excerpt: 'In a component system, a heading level always depends on where the component is used. The HTML spec is finally addressing the problem with headingoffset and headingreset. Until browser support arrives, React context lets us apply the same idea today.'
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
featuredImageAlt: Diagram of a page with an H1, an H2 section, and two components with H3 headings connected through headingoffset.
readingTime: 5
---

Let’s be honest: anyone who has maintained a design system or built a component library
of any real size knows this small problem in web development.

We build a beautiful, modular, flexible `<Card>` or `<Modal>`. Everything seems to be
in the right place. Then comes the accessibility audit, and someone asks: *"Wait, what
heading level is this title actually using?"*

Cue the quiet existential dread.

Is it an `<h2>`? An `<h3>`?

It depends on where the component is used. At the root of a dashboard, it will probably
be an `<h2>`. Inside a grid, which is itself inside a side panel... maybe an `<h5>`?

We usually choose one of two solutions, both bad:

1. **Always use an `<h2>`** and hope nobody places the component beneath an `<h3>`.
2. **Expose a `level` prop**—for example, `<Card headingLevel={3}>`—and force anyone
   using the component to mentally follow the entire page structure just to choose a
   number.

It is a fragile, impractical solution for a component-based ecosystem. The component
controls its content, but the page determines where that content sits in the hierarchy.
Trying to solve both with a hardcoded tag inside the component does not make sense.

## The hierarchy matters

Headings are not just typography. They expose the structure of a page, and screen
reader users can navigate between them or open a list of headings to understand that
structure without reading every word first. The W3C's
[headings guidance](https://www.w3.org/WAI/tutorials/page-structure/headings/) covers
the role they play in navigation and orientation in more detail.

That makes a skipped or misleading level more than a code-style disagreement. A card
that always renders an `<h2>` may look perfectly correct while flattening a nested
section in the accessibility tree. A component that always renders an `<h4>` may be
equally confusing when it appears directly below the page's `<h1>`.

With CSS, we have long been able to separate a heading's appearance from its semantic
level. What we have been missing is a safe way to separate a component's internal
structure from its position on the page.

## The outline algorithm mirage

For over a decade, developers were told about the HTML5 Document Outline Algorithm.
The idea sounded magical: wrap components in `<section>` elements, use `<h1>` inside
each one, and let the browser calculate the hierarchy from the nesting.

Except that model never became a dependable part of the platform. Browsers did not
implement a usable, interoperable outline for authors and assistive technologies.
We were left with static `<h1>` through `<h6>` elements while websites and applications
became increasingly dynamic and harder to represent with a fixed hierarchy.

That history matters because the new solution is **not** the
[*Document Outline Algorithm*](https://www.tempertemper.net/blog/the-final-nail-in-the-html5-document-outline-coffin)
returning under another name.

## An explicit solution in HTML

In Manuel Matuzović's article,
[*Context-aware headings in HTML*](https://www.matuzo.at/blog/2026/content-aware-headings),
we can find an excellent introduction to `headingoffset` and `headingreset`. Both new
attributes are already defined in the
[HTML Living Standard](https://html.spec.whatwg.org/dev/sections.html#heading-levels-and-offsets).

The `headingoffset` attribute adds an explicit offset to the computed level of every
heading inside an element that acts as a container:

```html
<h1>Dashboard</h1>

<section headingoffset="1">
  <h1>Analytics</h1> <!-- Computed as heading level 2 -->

  <div headingoffset="1">
    <h1>Monthly active users</h1> <!-- Computed as heading level 3 -->
  </div>
</section>
```

I know this HTML looks strange. Personally, it makes me itch: the DOM still contains
three `<h1>` elements. What changes is the level calculated by the browser and exposed
in the accessibility tree: 1, 2, and 3. When several nested elements have a
`headingoffset`, their values are added together.

That is precisely what makes the attribute interesting for reusable components. A
component can keep the same internal structure, while the element receiving it defines
the depth at which that structure begins.

The boolean `headingreset` attribute lets us interrupt that calculation. Any
`headingoffset` values found above the element are no longer considered:

```html
<div headingoffset="2">
  <h1>Computed as level 3</h1>

  <dialog headingreset>
    <h1>Computed as level 1</h1>
  </dialog>
</div>
```

The limits are well defined. A `headingoffset` value must be an integer between 0 and
8, and the final level can never be greater than 9. Even so, I think going beyond the
six levels represented by `<h1>` through `<h6>` requires care and testing with the
browsers and technologies used by the product's actual audience.

As Adrian Roselli explains in
[*headingoffset is Not the Document Outline Algorithm*](https://adrianroselli.com/2026/06/headingoffset-is-not-the-document-outline-algorithm.html),
the browser does not suddenly understand our content. It is still our responsibility
to decide whether an offset makes sense in each case.

The browser performs a predictable calculation, but it does not make an editorial
decision for us—and honestly, I do not think we want it to. That difference is exactly
what makes the proposal useful: we remain in control without relying on an algorithm
that tries to guess the author's intent.

## Early browser support

Being part of the HTML Standard does not mean a feature is immediately safe to use
everywhere. Browser implementations and assistive-technology support take time to
converge, and early implementations may still contain bugs.

Before using `headingoffset` in production, check the accessibility tree and test the
result with the browser and screen-reader combinations that matter to your audience.
The fallback deserves attention too: a browser that ignores the attribute will expose
the literal heading tags from the DOM.

[MDN's `headingoffset` documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/headingoffset)
describes the attribute, its relationship with `headingreset` and `aria-level`, and
maintains an up-to-date compatibility table. At the time of writing, the feature is
still marked as experimental and is not even part of Baseline.

But that does not make the feature uninteresting. Quite the opposite: it gives the
platform a clear direction and gives us a model we can already apply in our design
systems, even before we can depend on the native implementation.

## One possible solution for today

This was precisely one of the problems I tried to solve when I built the semantic
heading components in
[`@jtmdias/react-a11y-tools`](https://www.npmjs.com/package/@jtmdias/react-a11y-tools).
The [source is available on GitHub](https://github.com/JoaoTMDias/frontend/tree/main/packages/react-a11y-tools),
and so is the [documentation](https://joaotmdias.github.io/frontend/docs/react-a11y-tools/introduction).

Instead of forcing every component to receive a prop such as `level={4}`, the library
stores the current depth in React context. `<Heading>` renders the appropriate
`<h1>` through `<h6>` element, while `<Level>` increases the level of every heading
inside it by one.

```tsx
import { Heading, Level } from "@jtmdias/react-a11y-tools";

function App() {
  return (
    <main>
      {/* Renders as an <h1> */}
      <Heading>Dashboard Overview</Heading>

      <Level>
        <section>
          {/* Renders as an <h2> */}
          <Heading>Analytics Summary</Heading>

          <Level>
            <article>
              {/* Renders as an <h3> */}
              <Heading>Monthly Active Users</Heading>
            </article>
          </Level>
        </section>
      </Level>
    </main>
  );
}
```

There is an important difference from `headingoffset`: this solution changes the tag
that is actually rendered in the DOM. The result is conventional HTML supported by
current browsers, without requiring reusable components to know the exact level at
which they will appear.

In a design system, responsibility moves to the component wrapping the content:

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

`Card` does not need to know whether it is directly on a page, inside a section, or
inside another component. The parent element defines the depth; the card only needs to
describe its own structure.

In practice, my approach brings several advantages:

- **Ends prop drilling:** `<Card>` renders `<Heading>Title</Heading>` without needing
  to know the numerical level required by the page.
- **Safer refactors:** move a panel deeper into the UI and its headings adapt to the
  new structure.
- **Simpler APIs:** the components that understand the structure define its boundaries,
  and the rest no longer need to pass numbers between them.
- **Closer to the native model:** organising content through wrapper components is
  similar to the model proposed by `headingoffset`.
- **HTML that is easier to test:** we can assert the rendered elements directly and
  inspect them with today's accessibility tools.

Context is not magic either. A `<Level>` still represents an author decision, and it
can still be placed incorrectly. The goal is to put that decision in the component
that knows the surrounding structure instead of repeating it in every leaf component.

## The verdict

The web is finally beginning to address a problem component authors have worked around
for years. `headingoffset` and `headingreset` give us explicit control over heading
depth without trying to infer the author's intent from the shape of the DOM.

They are not the *Document Outline Algorithm*, and they do not remove our responsibility
to create a coherent hierarchy. Even so, I think they provide a much better foundation
for reusable content and encapsulated components.

While native support matures, the React solution presented here lets us apply the same
idea today while continuing to produce conventional `<h1>` through `<h6>` elements.
