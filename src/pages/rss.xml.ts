import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import config from "../content/config/config.json";
import type { SiteConfig } from "../typings/config";
import { buildRssItems } from "../utils/rss";

const siteConfig = config as SiteConfig;
const LATEST_ARTICLES_LIMIT = 10;
const LATEST_SHOWS_LIMIT = 10;

export const GET: APIRoute = async ({ site }) => {
	if (!site) {
		throw new Error("RSS feed requires `site` to be defined in Astro config.");
	}

	const [posts, shows] = await Promise.all([getCollection("blog"), getCollection("shows")]);
	const items = buildRssItems(posts, shows, {
		articleLimit: LATEST_ARTICLES_LIMIT,
		showLimit: LATEST_SHOWS_LIMIT,
	});

	return rss({
		title: siteConfig.seo.title,
		description: `${siteConfig.seo.description}. Includes latest blog articles and radio broadcasts.`,
		site,
		items,
	});
};
