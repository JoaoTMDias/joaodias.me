---
slug: screen-reader-testing-a-developers-perspective
locale: en
translationKey: one-year-of-eaa
title: One Year of EAA
pubDate: 2025-07-28T17:40:11.883Z
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque lorem sit amet porttitor viverra. Curabitur posuere, lectus eu ullamcorper volutpat, felis eros venenatis massa, a scelerisque nisl felis eget odio. '
category: accessibility
featuredImage: /pexels-bertellifotografia-29509535.jpg
readingTime: 3
---

It has now been a year since the deadline related to the European Accessibility Act was met on June 28, 2025. Back then, the deadline was seen by many as the point after which all compliance requirements were fully in effect. In retrospect, one can see clearly now that the deadline represented not the end but rather the start of the enforcement period.

According to a recent report by accessibility consulting company Deque, close to 95% of the organizations remain in the "informal" or "not started" state regarding their digital accessibility maturity levels. The regulators and civil society organizations are speeding up the process of conducting automated website audits, exchanging cross-border complaints, and pursuing high-profile cases.

For everyone who works in the product space, here is the summary of what happened over the past year and its implications for the future of software development.

## 1. Enforcement Has Now Become Practical

Within the past year, there have been two distinct enforcement avenues that have made significant strides in Europe: regulation and lawsuits.

### The regulators are leaning towards scale

Not anymore are the national regulators idly awaiting the outcome of audits. In the Netherlands, the Dutch Authority for Consumers and Markets (ACM) conducted 100 audits on e-commerce, energy and telecom platforms, finding out that 61% of the companies did not adhere to the minimum accessibility requirements. Auditing is being carried out by German, Irish, Swedish and Polish regulators who hire around 70 full-time accessibility auditors.

The key here is that these authorities are now interconnected. The European Commission established a centralized database which allows regulators in other states to instantly see the complaints submitted in another country. This means that if you are reported for some accessibility issues in Ireland, then Sweden and Germany will know about it too.

### Legal precedent is being set through civil society law suits

In addition to governments, organizations working for people with disabilities are using a class-action like standing to directly sue companies.

* Carrefour: On June 4, 2026, a French court ruled that Carrefour must make its online service accessible within six months, including hefty daily penalties.
* The Government Sector: Organizations have also sued governmental infrastructure, for example, the French tax service impots.gouv.fr just before tax-filing season.

The significance is far from being restricted to France because when a tactic works in one country, advocacy organizations throughout the EU have a successful strategy they can use in their courts.

## 2. The Major Technical Mistake: Testing against the Wrong Standard

Another mistake that engineers make when trying to adhere to accessibility regulations in Europe is thinking that if they pass a general WCAG test, they are already compliant.

Under EAA, the correct standard is EN 301 549. Although EN 301 549 is all about WCAG, which includes its latest version of WCAG 2.1 AA (to be changed to WCAG 2.2 AA in 2026), it also includes some specific European standards which may not be included in a general WCAG test.

Also, the national standards of a country can be misleading. France’s national standard RGAA is known to require only 50% compliance, which is considered insufficient according to the European Commission. So if you rely only on local guidelines and legacy automatic checks, you might be accumulating technical debt unknowingly.

## 3. How This Impacts Your Backlog Right Now

No, your regulators are not expecting you to solve all problems immediately, but they would like to see you making progress. Being ready to present the plan for remediation is much more effective than being silent and risking a fine.

The following steps should be taken by different roles on the product team:

* For Designers & UX Leads: Consider accessibility a design constraint. Build accessibility properties into design system components such as focus indicator, touch target, dynamic text resizing, and contrast ratios.
* For Frontend Engineers: Upgrade your automated CI/CD testing suites (for example, axe-core) to the EN 301 549 requirements. Keep in mind that automated scans only identify about 30-40% of the accessibility problems—keyboard navigation, screen reader tests (for example, NVDA, VoiceOver) should become part of your "Definition of Done".
* For Product Managers: Make sure your public site contains a statement regarding accessibility and a convenient feedback submission mechanism. Also, make sure that feedback reaches your engineering triage process and not just customer support.

## The Way Forward

With one year of the EAA under our belt, accessibility is no longer just a cosmetic improvement or an afterthought in a legal document. Accessibility is an essential metric of quality and access to the market in Europe. Embedding accessibility in your day-to-day design and engineering processes will not only safeguard you from potential regulation, but make a better product for all users.
