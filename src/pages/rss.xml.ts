import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import config from "../content/config/config.json";
import type { SiteConfig } from "../typings/config";

const siteConfig = config as SiteConfig;
const LATEST_ARTICLES_LIMIT = 10;
const LATEST_SHOWS_LIMIT = 10;

export const GET: APIRoute = async ({ site }) => {
	if (!site) {
		throw new Error("RSS feed requires `site` to be defined in Astro config.");
	}

	const [posts, shows] = await Promise.all([getCollection("blog"), getCollection("shows")]);

	const latestArticles = posts
		.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
		.slice(0, LATEST_ARTICLES_LIMIT)
		.map((post) => ({
			title: `[Article] ${post.data.title}`,
			description: post.data.excerpt,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
		}));

	const latestShows = shows
		.sort((a, b) => b.data.published.getTime() - a.data.published.getTime())
		.slice(0, LATEST_SHOWS_LIMIT)
		.map((show) => ({
			title: `[Radio show] ${show.data.title}`,
			description: show.data.summary,
			pubDate: show.data.published,
			link: `https://ruc.pt/podcast/${show.data.show}/${show.data.slug}`,
		}));

	const items = [...latestArticles, ...latestShows].sort(
		(a, b) => b.pubDate.getTime() - a.pubDate.getTime(),
	);

	return rss({
		title: siteConfig.seo.title,
		description: `${siteConfig.seo.description}. Includes latest blog articles and radio broadcasts.`,
		site,
		items,
	});
};
