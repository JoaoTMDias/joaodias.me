import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it } from "vitest";
import "./jd-accordion-item.js";
import "./jd-accordion.js";

const flush = async (element: HTMLElement | null) => {
	if (!element) return;
	await (element as HTMLElement & { updateComplete?: Promise<unknown> }).updateComplete;
};

const createAccordion = async ({ allowMultiple = false } = {}) => {
	const accordion = document.createElement("jd-accordion") as HTMLElement & {
		allowMultiple: boolean;
	};

	if (allowMultiple) {
		accordion.setAttribute("allow-multiple", "");
	}

	const firstItem = document.createElement("jd-accordion-item") as HTMLElement & {
		label: string;
		open: boolean;
	};
	firstItem.label = "First item";

	const secondItem = document.createElement("jd-accordion-item") as HTMLElement & {
		label: string;
		open: boolean;
	};
	secondItem.label = "Second item";

	accordion.append(firstItem, secondItem);
	document.body.appendChild(accordion);

	await Promise.all([flush(accordion), flush(firstItem), flush(secondItem)]);

	return { accordion, firstItem, secondItem };
};

afterEach(() => {
	document.body.innerHTML = "";
});

describe("jd-accordion", () => {
	it("exposes the ARIA accordion pattern for each item", async () => {
		const { firstItem } = await createAccordion();
		const trigger = firstItem.shadowRoot?.querySelector("button");
		const panel = firstItem.shadowRoot?.querySelector('[role="region"]');

		expect(trigger).not.toBeNull();
		expect(panel).not.toBeNull();
		expect(trigger).toHaveAttribute("type", "button");
		expect(trigger).toHaveAttribute("aria-expanded", "false");
		expect(trigger).toHaveAttribute("aria-controls", panel?.id);
		expect(panel).toHaveAttribute("role", "region");
		expect(panel).toHaveAttribute("aria-labelledby", trigger?.id);
		expect(trigger).toHaveAccessibleName("First item");
		expect(panel).toHaveAttribute("hidden");
	});

	it("toggles the open state and updates the ARIA state when clicked", async () => {
		const { firstItem } = await createAccordion();
		const trigger = firstItem.shadowRoot?.querySelector("button");
		const panel = firstItem.shadowRoot?.querySelector('[role="region"]');

		trigger?.click();
		await flush(firstItem);

		expect(firstItem.open).toBe(true);
		expect(trigger).toHaveAttribute("aria-expanded", "true");
		expect(panel).not.toHaveAttribute("hidden");
		expect(panel).toHaveAttribute("aria-labelledby", trigger?.id);
	});

	it("keeps only one item open when multiple expansion is disabled", async () => {
		const { firstItem, secondItem } = await createAccordion();
		const secondTrigger = secondItem.shadowRoot?.querySelector("button");

		firstItem.open = true;
		await flush(firstItem);
		secondTrigger?.click();
		await Promise.all([flush(firstItem), flush(secondItem)]);

		expect(firstItem.open).toBe(false);
		expect(secondItem.open).toBe(true);
	});

	it("allows multiple items to remain open when allow-multiple is enabled", async () => {
		const { firstItem, secondItem } = await createAccordion({ allowMultiple: true });
		const firstTrigger = firstItem.shadowRoot?.querySelector("button");
		const secondTrigger = secondItem.shadowRoot?.querySelector("button");

		firstTrigger?.click();
		await flush(firstItem);
		secondTrigger?.click();
		await Promise.all([flush(firstItem), flush(secondItem)]);

		expect(firstItem.open).toBe(true);
		expect(secondItem.open).toBe(true);
	});

	it("moves focus according to the APG arrow key pattern", async () => {
		const { accordion, firstItem, secondItem } = await createAccordion();
		const firstTrigger = firstItem.shadowRoot?.querySelector("button") as HTMLButtonElement;
		const secondTrigger = secondItem.shadowRoot?.querySelector("button") as HTMLButtonElement;

		firstTrigger.focus();
		accordion.dispatchEvent(
			new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true, composed: true }),
		);

		expect(secondItem.shadowRoot?.activeElement).toBe(secondTrigger);
	});
});
