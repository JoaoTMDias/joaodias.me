---
locale: en
translationKey: its-a-trap
title: It's a trap!
pubDate: 2026-08-10T02:37:07.191Z
updatedDate: 2026-08-09T23:00:00.000Z
excerpt: 'Keyboard navigation involves going from one website feature to another through the use of buttons like Tab and the arrows. If an interactive element, for instance, a modal, a video player, and even a custom date picker, locks focus inside itself without providing an escape point, then the rest of the website is inaccessible. According to WCAG 2.1.2 (No Keyboard Trap), every website feature that allows focus should provide an option to exit that feature using only the keyboard.'
category: accessibility
featuredImage: /blog/keyboard-trap-cover.webp
readingTime: 4
---

Imagine being in a room where the door locks upon entering from inside. Similarly, imagine the helplessness that users will feel when they accidentally step into a keyboard trap on your website—a user enters into an interactive element but has no way of escaping it.

Web accessibility relies on keyboard navigation to some extent. It is here where you find everything you need to know about WCAG 2.1.2 (No Keyboard Trap): what it is, its importance, how to avoid certain mistakes, and even its solution.

## No Keyboard Traps

An accessible site has to meet the non-negotiable standards set by WCAG 2.1.2, a **Level A** criterion known as **No Keyboard Trap**. The rule is straightforward: once keyboard focus enters a component, the user should be able to exit it with the keyboard alone. There are some allowances for when an unorthodox key combination is needed to get out, something other than the usual `Tab`, arrow or `Escape` keys; in such cases, the onus is on the page to provide clear directions to the user on how to do so.

## WCAG 2.1.2 is an extension of 2.1.1

One can think of these two as complementary standards:

* **WCAG 2.1.1 (Keyboard)** is about the ability to *reach and operate* all functions with a keyboard.
* **WCAG 2.1.2 (No Keyboard Trap)** makes sure that if one has entered a component, there is always a way to *exit*.

<figure class="article-visual">
  <figcaption>A complete keyboard journey</figcaption>
  <ol class="article-flow">
    <li>Enter the component</li>
    <li>Operate every control</li>
    <li>Leave for the next focusable element</li>
  </ol>
  <p>A trap breaks the final step: focus returns to the component instead of continuing through the page.</p>
</figure>

## A case of hidden friction in UX

For those who rely on a keyboard, navigation is a matter of moving through a page in sequence. But when focus is held captive by a component, the remainder of the site is effectively put out of reach. The user is then forced to make a choice: either hit refresh or simply walk away from the site.

### Who is affected?

* Keyboard only users navigating without using a mouse.
* Users of screen readers who use keyboard shortcuts to understand elements in the interface.
* Switch and sip-and-puff device users navigating hardware configured to perform actions using key presses.
* Speech command users sending voice commands mapped to specific keystrokes.

## Focus Management vs. Focus Trap

Please note that maintaining the focus within an open modal dialog box is focus management and not a focus trap.

* Correct Focus Trap: The focus cycles within an open modal until the dialog box is closed by pressing the Escape key or clicking the visible “Close” button.
* Incorrect (Focus Trap): The focus is trapped within the modal; the Escape key doesn’t work, and the “close” button can’t be accessed using the Tab key.

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

## 5 Common Keyboard Trap Failures

| **Failure**                    | **Description**                                                                                                                                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Unescapable Modals**      | Focus enters a pop-up dialog, but `Escape` doesn't close it and the close button isn't keyboard-accessible.                                    |
| **2. Greedy Embedded Widgets** | Third-party media players, chat widgets, or iframe ads grab focus and keep cycling internally without ever returning focus to the parent page. |
| **3. Custom Date Pickers**     | Tabbing into a calendar control loops through dates endlessly with no way to press `Escape` or tab past to the next input field.               |
| **4. Infinite Focus Loops**    | Pressing `Tab` continuously cycles through a navigation menu or media carousel without ever moving down to main content.                       |
| **5. Secret Exit Keys**        | Leaving a component requires an obscure key combo (e.g., `Ctrl` + `Alt` + `M`), but no instructions are provided on-screen.                    |

## Best Practices and Practical Solutions

### Make use of Native HTML Modals

The native `<dialog>` element and `.showModal()` provide useful browser behaviour, including making the rest of the document inert and supporting cancellation with `Escape`. They do not remove the need to choose sensible initial focus, provide a clear close action, restore focus logically and test the complete interaction with keyboard and assistive technology.

### Put third-party scripts to the test

Before a launch, any embedded tools such as iframes, video players or chat widgets need to be put through their paces. Should a script from an outside vendor prove to be swallowing focus, the settings ought to be reconfigured. If that is not enough, look for a compliant replacement or ask the vendor for a patch.

### Adhere to ARIA Guidelines

In developing complicated custom controls like date picker or dropdown menu, use the ARIA Authoring Practices Guide (APG) for key behaviors that should be implemented. Ensure that your control works with actual assistive technology once you have developed it.

### Instruction for nonstandard keys

If an application needs a special key combination for the user to get out of it, provide textual instructions on the screen for the same (like “Press Ctrl + Alt + M to exit”). Yet the most important thing is to make sure that the standard Tab navigation still works.

## Testing Your Website in 3 Simple Steps

<figure class="article-visual">
  <figcaption>Keyboard test checklist</figcaption>
  <ol class="article-checklist">
    <li>Put the mouse aside and move forwards and backwards with Tab and Shift+Tab.</li>
    <li>Operate controls with Enter, Space and arrow keys where the interaction expects them.</li>
    <li>Open dialogs, menus, date pickers, media players and embedded widgets.</li>
    <li>Try every visible or documented way to close and leave each component.</li>
    <li>Confirm that focus remains visible and returns to a logical place.</li>
  </ol>
</figure>

And then everyone else will be able to do the same!
