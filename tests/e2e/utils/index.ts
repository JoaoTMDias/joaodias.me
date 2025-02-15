import { test as base, expect as baseExpect } from "@playwright/test";
import { NetworkHandlers } from "./fixtures";

// Create the fixture
const test = base.extend<{ networkHandlers: NetworkHandlers }>({
	networkHandlers: async ({ page }, use) => {
		const handlers = new NetworkHandlers(page);
		await use(handlers);
		await handlers.clear();
	},
});

export { test, NetworkHandlers, baseExpect as expect };
