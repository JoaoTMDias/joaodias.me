import { html, LitElement } from "lit";
import { accordionStyles } from "./accordionStyles.js";
import { JdAccordionItem, JdAccordionItemToggleEvent } from "./JdAccordionItem.js";

export class JdAccordion extends LitElement {
	static override styles = accordionStyles;

	static override properties = {
		allowMultiple: { type: Boolean, attribute: "allow-multiple" },
	};

	allowMultiple = false;

	private get items(): JdAccordionItem[] {
		const slot = this.shadowRoot?.querySelector("slot");
		if (!slot) return [];
		const assigned = slot.assignedElements({ flatten: true });
		return assigned.filter(
			(el): el is JdAccordionItem =>
				el instanceof JdAccordionItem || el.tagName.toLowerCase() === "jd-accordion-item",
		);
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener(
			JdAccordionItemToggleEvent.eventName,
			this.handleItemToggle as EventListener,
		);
		this.addEventListener("keydown", this.handleKeyDown as EventListener);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener(
			JdAccordionItemToggleEvent.eventName,
			this.handleItemToggle as EventListener,
		);
		this.removeEventListener("keydown", this.handleKeyDown as EventListener);
	}

	private handleItemToggle = (event: JdAccordionItemToggleEvent): void => {
		if (this.allowMultiple) return;

		const targetItem = event.target as JdAccordionItem;
		if (!targetItem || !event.open) return;

		// Close other accordion items when single-expand mode is active
		this.items.forEach((item) => {
			if (item !== targetItem && item.open) {
				item.open = false;
			}
		});
	};

	private handleKeyDown = (event: KeyboardEvent): void => {
		const items = this.items;
		if (items.length === 0) return;

		const activeElement = document.activeElement as HTMLElement | null;
		const currentIndex = items.findIndex((item) => {
			const itemActiveElement = item.shadowRoot?.activeElement as HTMLElement | null;
			return (
				item === activeElement ||
				itemActiveElement === activeElement ||
				(itemActiveElement && item.shadowRoot?.contains(activeElement as Node)) ||
				item.contains(activeElement as Node)
			);
		});

		if (currentIndex === -1) return;

		let targetIndex = -1;

		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				targetIndex = (currentIndex + 1) % items.length;
				break;
			case "ArrowUp":
				event.preventDefault();
				targetIndex = (currentIndex - 1 + items.length) % items.length;
				break;
			case "Home":
				event.preventDefault();
				targetIndex = 0;
				break;
			case "End":
				event.preventDefault();
				targetIndex = items.length - 1;
				break;
		}

		if (targetIndex !== -1 && items[targetIndex]) {
			items[targetIndex].focusTrigger();
		}
	};

	override render() {
		return html`
      <div class="accordion" role="presentation">
        <slot></slot>
      </div>
    `;
	}
}
if (!customElements.get("jd-accordion")) {
	customElements.define("jd-accordion", JdAccordion);
}
declare global {
	interface HTMLElementTagNameMap {
		"jd-accordion": JdAccordion;
	}
}
