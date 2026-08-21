import { describe, expect, it } from "vitest";
import { buildRssItems } from "./rss";

describe("buildRssItems", () => {
	it("sorts and combines latest articles and shows by publication date", () => {
		const olderArticle = {
			id: "older-article",
			data: {
				title: "Older Article",
				excerpt: "Older excerpt",
				pubDate: new Date("2024-01-01T00:00:00.000Z"),
			},
		};

		const newerArticle = {
			id: "newer-article",
			data: {
				title: "Newer Article",
				excerpt: "Newer excerpt",
				pubDate: new Date("2024-02-01T00:00:00.000Z"),
			},
		};

		const oldShow = {
			data: {
				title: "Old show",
				summary: "Old summary",
				published: new Date("2024-01-15T00:00:00.000Z"),
				show: "old-show",
				slug: "old-show-slug",
			},
		};

		const newShow = {
			data: {
				title: "New show",
				summary: "New summary",
				published: new Date("2024-03-01T00:00:00.000Z"),
				show: "new-show",
				slug: "new-show-slug",
			},
		};

		const items = buildRssItems([olderArticle, newerArticle], [oldShow, newShow]);

		expect(items).toHaveLength(4);
		expect(items[0].title).toBe("[Radio show] New show");
		expect(items[0].link).toBe("https://ruc.pt/podcast/new-show/new-show-slug");
		expect(items[1].title).toBe("[Article] Newer Article");
		expect(items[2].title).toBe("[Radio show] Old show");
		expect(items[3].title).toBe("[Article] Older Article");
	});

	it("respects the configured item limits", () => {
		const posts = Array.from({ length: 12 }, (_, index) => ({
			id: `post-${index}`,
			data: {
				title: `Post ${index}`,
				excerpt: `Excerpt ${index}`,
				pubDate: new Date(Date.UTC(2024, 0, index + 1)),
			},
		}));

		const shows = Array.from({ length: 12 }, (_, index) => ({
			data: {
				title: `Show ${index}`,
				summary: `Summary ${index}`,
				published: new Date(Date.UTC(2024, 0, index + 1)),
				show: `show-${index}`,
				slug: `slug-${index}`,
			},
		}));

		const items = buildRssItems(posts, shows, { articleLimit: 5, showLimit: 3 });

		expect(items.filter((item) => item.title.startsWith("[Article]"))).toHaveLength(5);
		expect(items.filter((item) => item.title.startsWith("[Radio show]"))).toHaveLength(3);
	});
});
