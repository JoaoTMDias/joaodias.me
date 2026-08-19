import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import BlogSearch from "./BlogSearch";

const articles = [
	{
		id: "first-article",
		title: "Accessibility in design systems",
		excerpt: "A practical guide to accessible frontend interfaces.",
		category: "Accessibility",
		tags: ["a11y", "ui"],
		featuredImage: "/images/first.jpg",
		readingTime: 5,
		pubDateISO: "2024-01-01",
		pubDateLabel: "Jan 1, 2024",
	},
	{
		id: "second-article",
		title: "React patterns for resilient apps",
		excerpt: "Improving maintainability and quality in modern React apps.",
		category: "Engineering",
		tags: ["react", "architecture"],
		readingTime: 8,
		pubDateISO: "2024-02-01",
		pubDateLabel: "Feb 1, 2024",
	},
];

describe("BlogSearch", () => {
	afterEach(() => {
		cleanup();
	});

	beforeEach(() => {
		window.history.replaceState({}, "", "/blog");
	});

	it("shows all articles when there is no search query", () => {
		render(<BlogSearch articles={articles} />);

		expect(screen.getByText("2 articles")).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "Accessibility in design systems" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "React patterns for resilient apps" }),
		).toBeInTheDocument();
	});

	it("filters articles by matching title, excerpt, category and tags", async () => {
		const user = userEvent.setup();
		render(<BlogSearch articles={articles} />);

		await user.type(screen.getByRole("textbox", { name: /search articles/i }), "react");

		expect(screen.getByText("2 articles")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Search" }));

		expect(screen.getByText("1 article")).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "React patterns for resilient apps" }),
		).toBeInTheDocument();
		expect(
			screen.queryByRole("heading", { name: "Accessibility in design systems" }),
		).not.toBeInTheDocument();
		expect(window.location.search).toBe("?q=react");
	});

	it("shows the empty state when no results match", async () => {
		const user = userEvent.setup();
		render(<BlogSearch articles={articles} />);

		await user.type(screen.getByRole("textbox", { name: /search articles/i }), "zzzz");
		await user.click(screen.getByRole("button", { name: "Search" }));

		expect(screen.getByText("0 articles")).toBeInTheDocument();
		expect(screen.getByText(/No articles match your search/i)).toBeInTheDocument();
		expect(screen.getAllByRole("status")).toHaveLength(1);
	});

	it("clears the active search and removes it from the URL", async () => {
		const user = userEvent.setup();
		render(<BlogSearch articles={articles} />);

		await user.type(screen.getByRole("textbox", { name: /search articles/i }), "react");
		await user.click(screen.getByRole("button", { name: "Search" }));
		await user.click(screen.getByRole("button", { name: "Clear search" }));

		expect(screen.getByRole("textbox", { name: /search articles/i })).toHaveValue("");
		expect(screen.getByText("2 articles")).toBeInTheDocument();
		expect(screen.getByText("All articles")).toBeInTheDocument();
		expect(window.location.search).toBe("");
		expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
	});

	it("hydrates the search query from the URL", () => {
		window.history.replaceState({}, "", "/blog?q=accessibility");

		render(<BlogSearch articles={articles} />);

		expect(screen.getByRole("textbox", { name: /search articles/i })).toHaveValue("accessibility");
		expect(screen.getByText("1 article")).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "Accessibility in design systems" }),
		).toBeInTheDocument();
	});
});
