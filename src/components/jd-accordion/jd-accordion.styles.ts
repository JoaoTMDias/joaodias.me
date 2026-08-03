import { css } from "lit";

export const accordionStyles = css`
  :host {
    --jd-accordion-border-color: var(--services-border-color, var(--text-color-faded));
    --jd-accordion-focus-ring: var(--services-focus-ring, var(--link-active-color));
    --jd-accordion-text-color: var(--services-text-color, var(--text-color));
    --jd-accordion-heading-color: var(--services-heading-color, var(--heading-color));
    --jd-accordion-category-color: var(--services-category-color, var(--text-color-faded));
    --jd-accordion-bg-hover: var(--services-bg-hover, var(--background-color-faded));
    --jd-accordion-transition-duration: var(--motion-duration-base, 250ms);
    --jd-accordion-transition-ease: var(--motion-ease-standard, cubic-bezier(0.4, 0, 0.2, 1));
    --jd-accordion-category-size: var(--services-category-size, var(--font-size-sm, 0.75rem));
    --jd-accordion-label-size: var(--services-label-size, var(--font-size-base, 1rem));

    display: block;
    width: 100%;
  }

  /* jd-accordion container */
  .accordion {
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
  }

  /* jd-accordion-item */
  :host(jd-accordion-item) {
    display: block;
    border-bottom: 2px solid var(--jd-accordion-border-color);
  }

  :host(jd-accordion-item:last-of-type) {
    border-bottom: none;
  }

  .accordion-item {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .accordion-header {
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }

  .accordion-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: var(--space-xl);
    padding: var(--space-base, 1rem) 0;
    background: transparent;
    border: none;
    color: var(--jd-accordion-text-color);
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    gap: var(--space-base, 1rem);
    border-radius: var(--space-xxs, 0.25rem);
  }

  .accordion-trigger:hover,
  .accordion-trigger:focus-visible {
    background-color: var(--jd-accordion-bg-hover);
  }

  .accordion-trigger:focus-visible {
    outline: 2px solid var(--jd-accordion-focus-ring);
    outline-offset: var(--space-xs, 0.5rem);
  }

  .accordion-trigger-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs, 0.25rem);
    flex: 1;
  }

  .accordion-category {
    font-family: var(--heading-font-family, inherit);
    font-style: italic;
    font-size: var(--jd-accordion-category-size);
    letter-spacing: 0.05em;
    color: var(--jd-accordion-category-color);
    margin: 0;
    font-weight: 500;
  }

  .accordion-label {
    font-size: var(--jd-accordion-label-size);
    font-weight: 600;
    color: var(--jd-accordion-heading-color);
    margin: 0;
    line-height: 1.4;
  }

  .accordion-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--space-md, 1.5rem);
    height: var(--space-md, 1.5rem);
    flex-shrink: 0;
    border-radius: 50%;
    background-color: var(--jd-accordion-bg-hover);
    color: var(--jd-accordion-text-color);
  }

  :host([open]) .accordion-icon {
    transform: rotate(45deg);
    background-color: var(--jd-accordion-text-color);
    color: var(--background-color, #ffffff);
  }

  .accordion-panel {
    display: grid;
    grid-template-rows: 0fr;
    visibility: hidden;
    overflow: hidden;
  }

  .accordion-panel[open] {
    grid-template-rows: 1fr;
    visibility: visible;
    padding-bottom: var(--space-md, 1.5rem);
  }

  .accordion-panel-content {
    min-height: 0;
    color: var(--jd-accordion-text-color);
    line-height: 1.6;
  }


  @media (prefers-reduced-motion: no-preference) {
    .accordion-trigger {
      transition: background-color var(--jd-accordion-transition-duration) var(--jd-accordion-transition-ease),
                  color var(--jd-accordion-transition-duration) var(--jd-accordion-transition-ease);
    }

    .accordion-icon {
      transition: transform var(--jd-accordion-transition-duration) var(--jd-accordion-transition-ease);
    }

    .accordion-panel {
      transition: grid-template-rows var(--jd-accordion-transition-duration) var(--jd-accordion-transition-ease),
                  padding var(--jd-accordion-transition-duration) var(--jd-accordion-transition-ease);
    }
  }
`;
