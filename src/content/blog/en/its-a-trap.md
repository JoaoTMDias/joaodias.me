---
locale: en
translationKey: its-a-trap
title: It's a trap!
pubDate: 2026-08-10T02:37:07.191Z
updatedDate: 2026-08-21T00:00:00.000Z
excerpt: "Keyboard access is incomplete when someone can enter a component but cannot leave it. Learn how WCAG 2.1.2 applies to dialogs, widgets and embedded content."
category: accessibility
featuredImage: /blog/keyboard-trap-cover.webp
featuredImageAlt: A focus indicator loops inside one interface component while the rest of the page remains out of reach.
readingTime: 6
---

Imagine entering a room and hearing the door lock behind you. A keyboard trap creates the equivalent experience in an interface: focus enters a component, but the person using the keyboard cannot move it out again.

For someone navigating without a pointing device, the rest of the page may become inaccessible. Refreshing the page, abandoning a task or leaving the site should never be the only way out.

## What WCAG requires

[WCAG 2.2 Success Criterion 2.1.2, No Keyboard Trap](https://www.w3.org/TR/WCAG22/#no-keyboard-trap), is a Level A requirement. When focus can enter a component, it must also be possible to move it away using only a keyboard interface.

If leaving requires more than unmodified arrow or Tab keys, or another standard way of exiting, the interface must explain how to leave. The [W3C guidance](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) also notes that a trap can interfere with the use of the entire page.

### Access and exit are complementary

Criterion 2.1.1 asks whether functionality can be operated through a keyboard. Criterion 2.1.2 asks whether someone can leave after entering. A calendar may respond correctly to the arrow keys while preventing Tab or Escape from returning to the form. A media player may expose every control but cycle focus inside itself forever.

<figure class="article-visual">
  <figcaption>A complete keyboard journey</figcaption>
  <ol class="article-flow">
    <li>Enter the component</li>
    <li>Operate every control</li>
    <li>Leave for the next focusable element</li>
  </ol>
  <p>A trap breaks the final step: focus returns to the component instead of continuing through the page.</p>
</figure>

## Who is affected

Keyboard traps can block people who use:

- a keyboard without a mouse;
- screen readers and keyboard commands;
- switch devices or sip-and-puff systems;
- voice software that maps commands to keystrokes.

They all need a predictable way to enter, operate and leave each part of an interface.

## Managing focus is not creating a trap

A modal dialog will usually keep focus within it while it is open. It becomes a trap when it cannot be closed with the keyboard, the close action cannot receive focus or focus returns to the dialog after a valid attempt to leave.

A well-managed modal moves focus to an appropriate element, makes the underlying page inert, provides a reachable close action, supports Escape where appropriate and returns focus to a logical place.

The native `<dialog>` element and `.showModal()` provide useful browser behaviour, but they do not remove the need to choose sensible initial focus and test the complete interaction.

<figure class="article-visual">
  <figcaption>Managed focus and a keyboard trap are not the same</figcaption>
  <div class="article-comparison">
    <section>
      <h3>Managed modal focus</h3>
      <p>Focus moves into the dialog, reaches every action, Escape or the close button dismisses it, and focus returns to the trigger.</p>
    </section>
    <section>
      <h3>Keyboard trap</h3>
      <p>Focus enters and cycles, but no reachable action or documented keyboard command lets the user close or leave the component.</p>
    </section>
  </div>
</figure>

## Common failure patterns

### Embedded content captures focus

Media players, editors and third-party widgets may handle Tab or the arrow keys internally. Test the actual integration. If there is no reliable exit, reconfigure or replace the component, or isolate it with clear instructions.

### Composite widgets enter a loop

Menus, grids, comboboxes and date pickers often use arrow keys internally and Tab to leave. Follow the relevant [ARIA Authoring Practices Guide patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) and keep navigation within the widget separate from navigation through the page.

### Event handlers prevent an exit

A global `keydown` handler that calls `preventDefault()` too broadly can swallow Tab or Escape. Cancel native key behaviour only when a complete, tested alternative is available.

### The exit cannot receive focus

A close button may be visible while missing from the focus order or hidden from assistive technologies. Visual inspection is not enough: the control must be reachable, have an accessible name and work.

## A practical test

<figure class="article-visual">
  <figcaption>Keyboard test checklist</figcaption>
  <ol class="article-checklist">
    <li>Put the mouse aside and move forwards and backwards with Tab and Shift+Tab.</li>
    <li>Operate controls with Enter, Space and arrow keys where the interaction expects them.</li>
    <li>Open dialogs, menus, date pickers, media players and embedded widgets.</li>
    <li>Try every visible or documented way to close and leave each component.</li>
    <li>Confirm that focus remains visible and returns to a logical place.</li>
    <li>Repeat at different viewport sizes and, where relevant, with a screen reader.</li>
  </ol>
</figure>

Automated checks find some errors, but they cannot prove that every state provides a meaningful exit. This criterion requires manual interaction.

## A useful mental model

Do not ask only, “Can I reach this with a keyboard?” Ask three questions: can I enter, can I operate and can I leave?

When all three answers are predictable, keyboard access becomes part of interaction design rather than a late-stage check.
