import { isNumber, isString, wait } from "@jtmdias/js-utilities";
import { Page } from "@playwright/test";

interface RouteHandler {
	url: string | RegExp;
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD" | "CONNECT" | "TRACE";
	status?: number;
	response?: any;
	fixture?: string;
	headers?: Record<string, string>;
	delay?: number;
}

class NetworkHandlers {
	private page: Page;
	private interceptors: RouteHandler[] = [];

	constructor(page: Page) {
		this.page = page;
	}

	/**
	 * Intercepts network requests matching the specified criteria
	 *
	 * @example
	 * ```ts
	 * await intercept('https://api.example.com/data', {
	 *  status: 200,
	 *  response: { data: 'Hello, World!' }
	 * });
	 *
	 * @param urlOrHandler - URL pattern or route handler configuration
	 * @param handler - Optional handler configuration when URL is provided separately
	 */
	async intercept(
		urlOrHandler: string | RegExp | RouteHandler,
		handler?: Omit<RouteHandler, "url">,
	): Promise<void> {
		const routeHandler: RouteHandler =
			isString(urlOrHandler) || urlOrHandler instanceof RegExp
				? { url: urlOrHandler, ...handler }
				: urlOrHandler;

		this.interceptors.push(routeHandler);

		await this.page.route(routeHandler.url, async (route) => {
			const request = route.request();

			// Skip if method doesn't match
			if (routeHandler.method && request.method() !== routeHandler.method) {
				return route.continue();
			}

			// Apply delay if specified
			if (isNumber(routeHandler.delay)) {
				await wait(routeHandler.delay);
			}

			// Handle fixture if provided
			if (isString(routeHandler.fixture)) {
				return route.fulfill({
					status: routeHandler.status ?? 200,
					path: routeHandler.fixture,
					headers: { "Content-Type": "application/json", ...routeHandler.headers },
				});
			}

			// Handle direct response
			if (routeHandler.response !== undefined) {
				return route.fulfill({
					status: routeHandler.status || 200,
					body:
						typeof routeHandler.response === "string"
							? routeHandler.response
							: JSON.stringify(routeHandler.response),
					headers: {
						"Content-Type": "application/json",
						...routeHandler.headers,
					},
				});
			}

			// Continue with the request if no mock is specified
			return route.continue();
		});
	}

	/**
	 * Clears all interceptors
	 */
	async clear(): Promise<void> {
		this.interceptors = [];
		await this.page.unroute("**/*");
	}
}

export default NetworkHandlers;
