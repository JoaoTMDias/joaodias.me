import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import config from "../../content/config/pt/config.json";
import { contentUrl } from "../../i18n";
export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error("RSS feed requires site");
	const posts = (await getCollection("blog"))
		.filter((post) => post.data.locale === "pt")
		.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
	return rss({
		title: config.seo.title,
		description: config.seo.description,
		site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.excerpt,
			pubDate: post.data.pubDate,
			link: contentUrl("pt", "blog", post.id),
		})),
	});
};
