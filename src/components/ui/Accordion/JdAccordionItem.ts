import { html, LitElement, type PropertyValues } from "lit";
import { accordionStyles } from "./accordionStyles.js";

let nextUniqueId = 0;

export class JdAccordionItemToggleEvent extends Event {
	static readonly eventName = "jd-accordion-item-toggle";

	constructor(public readonly open: boolean) {
		super(JdAccordionItemToggleEvent.eventName, {
			bubbles: true,
			composed: true,
		});
	}
}

export class JdAccordionItem extends LitElement {
	static override styles = accordionStyles;

	static override properties = {
		category: { type: String },
		label: { type: String },
		open: { type: Boolean, reflect: true },
		headingLevel: { type: Number, attribute: "heading-level" },
	};

	category = "";
	label = "";
	// @ts-expect-error - property accessor override
	override open = false;
	headingLevel = 3;

	private readonly instanceId = `jd-accordion-item-${++nextUniqueId}`;

	get buttonId(): string {
		return `${this.id || this.instanceId}-button`;
	}

	get panelId(): string {
		return `${this.id || this.instanceId}-panel`;
	}

	focusTrigger(): void {
		const button = this.shadowRoot?.querySelector<HTMLButtonElement>("button");
		button?.focus();
	}

	private handleTriggerClick(): void {
		this.open = !this.open;
		this.dispatchEvent(new JdAccordionItemToggleEvent(this.open));
	}

	override updated(changedProperties: PropertyValues): void {
		super.updated(changedProperties);
	}

	private renderHeadingTrigger(content: ReturnType<typeof html>) {
		const level = Math.max(1, Math.min(6, this.headingLevel));
		switch (level) {
			case 1:
				return html`<h1 class="accordion-header">${content}</h1>`;
			case 2:
				return html`<h2 class="accordion-header">${content}</h2>`;
			case 4:
				return html`<h4 class="accordion-header">${content}</h4>`;
			case 5:
				return html`<h5 class="accordion-header">${content}</h5>`;
			case 6:
				return html`<h6 class="accordion-header">${content}</h6>`;
			default:
				return html`<h3 class="accordion-header">${content}</h3>`;
		}
	}

	override render() {
		const buttonContent = html`
      <button
        id=${this.buttonId}
        type="button"
        class="accordion-trigger"
        aria-expanded=${this.open ? "true" : "false"}
        aria-controls=${this.panelId}
        @click=${this.handleTriggerClick}
      >
        <span class="accordion-trigger-content">
          ${this.category ? html`<span class="accordion-category">${this.category}</span>` : ""}
          <span class="accordion-label">${this.label}</span>
        </span>
        <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
      </button>
    `;

		return html`
      <div class="accordion-item">
        ${this.renderHeadingTrigger(buttonContent)}
        <div
          id=${this.panelId}
          class="accordion-panel"
          role="region"
          aria-labelledby=${this.buttonId}
          ?open=${this.open}
          ?hidden=${!this.open}
        >
          <div class="accordion-panel-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
	}
}

if (!customElements.get("jd-accordion-item")) {
	customElements.define("jd-accordion-item", JdAccordionItem);
}

declare global {
	interface HTMLElementTagNameMap {
		"jd-accordion-item": JdAccordionItem;
	}
}
