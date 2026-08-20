---
locale: en
translationKey: one-year-of-eaa
title: One year into the European Accessibility Act
pubDate: 2026-07-28T17:40:11.883Z
updatedDate: 2026-08-20T00:00:00.000Z
excerpt: "A year after the European Accessibility Act began applying, product teams need repeatable ways to understand scope, remove barriers and show progress."
category: industry-advocacy
featuredImage: /blog/eaa-one-year-cover.webp
readingTime: 6
---

The European Accessibility Act did not create a single finish line for every digital product. It created requirements for defined products and services, national systems for enforcement and continuing responsibilities for organisations in scope.

[Directive (EU) 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj) has applied from 28 June 2025. One year on, the practical lesson is that accessibility must operate as a maintained product capability, not as a project organised around one date.

<figure class="article-visual">
  <figcaption>From adoption to the first year of application</figcaption>
  <ol class="article-timeline">
    <li><strong>17 April 2019</strong><br>The Directive is adopted.</li>
    <li><strong>28 June 2022</strong><br>Deadline for Member States to transpose it.</li>
    <li><strong>28 June 2025</strong><br>The applicable measures begin to operate.</li>
    <li><strong>28 June 2026</strong><br>One year of implementation and maintenance.</li>
  </ol>
</figure>

## Start with scope

The Directive covers selected products and services, including consumer computer systems, payment and certain self-service terminals, electronic communications, access to audiovisual services, elements of passenger transport, consumer banking, e-books and e-commerce.

Not every organisation is treated identically. The text includes transition provisions, an exemption for microenterprises providing services and a documented process for assessing fundamental alteration or disproportionate burden.

These are legal questions depending on the product, service, Member State and operating model. A generic website scan cannot answer them. Teams should document what they provide, which requirements apply and who owns the decision.

## The deadline began an operating period

Services in scope must be designed and provided according to the applicable requirements. Providers must also prepare information explaining how the service meets them and keep it available while the service operates.

Member States check compliance, follow complaints, verify remediation and define penalties in national law. Details therefore vary between countries within the shared European framework.

Products can regress after a successful audit. Releases, third-party components, content and design-system changes can reintroduce barriers. Conformity is not frozen on the date of a report.

## EAA, standards and WCAG

The Directive contains functional requirements and provides a route for referenced harmonised standards or technical specifications to create a presumption of conformity for what they cover.

[EN 301 549](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/) is a European ICT accessibility standard. Its web clauses incorporate WCAG requirements and it covers areas beyond ordinary web-content testing.

WCAG remains essential engineering guidance, but passing an automated WCAG scan is not a complete legal analysis. Automation does not determine scope, documentation, accessible support or whether an exception is justified.

A safer workflow is to determine scope with appropriate expertise, map requirements to journeys and components, use standards as engineering references, combine automated and manual testing, and keep evidence and remediation current.

<figure class="article-visual">
  <figcaption>How the legal and technical layers relate</figcaption>
  <ol class="article-standards">
    <li>European Accessibility Act requirements</li>
    <li>Referenced harmonised standards or technical specifications</li>
    <li>EN 301 549, whose web clauses incorporate WCAG requirements</li>
  </ol>
  <p>WCAG is essential for web implementation, but it does not by itself determine the Directive’s scope or cover every legal and product requirement.</p>
</figure>

## What teams should maintain

<figure class="article-visual">
  <figcaption>Accessibility is shared operational work</figcaption>
  <div class="article-actions">
    <section>
      <h3>Design</h3>
      <p>Define keyboard behaviour, focus, errors, reflow, targets, contrast and alternatives before implementation.</p>
    </section>
    <section>
      <h3>Engineering</h3>
      <p>Run fast checks in CI and retain manual keyboard and assistive-technology testing for relevant changes.</p>
    </section>
    <section>
      <h3>Product</h3>
      <p>Maintain an accessibility backlog with owners and connect public feedback to product triage.</p>
    </section>
    <section>
      <h3>Leadership and procurement</h3>
      <p>Fund remediation as product work and test third-party integrations in their real context.</p>
    </section>
  </div>
</figure>

Useful evidence includes a scope decision, critical journeys, automated results linked to builds, manual test notes, known issues and owners, component tests, feedback and accurate public accessibility information.

## The next year

The stronger question is not whether an organisation can claim a permanent label of compliance. It is whether it can discover barriers, prioritise them, fix them and demonstrate that the improvement survives future releases.

That capability produces clearer interfaces, more dependable components and products that work for more people.
