export type FeedEntry = {
	title: string;
	description: string;
	pubDate: Date;
	link: string;
};

type ArticleLike = {
	id: string;
	data: {
		title: string;
		excerpt: string;
		pubDate: Date;
	};
};

type ShowLike = {
	data: {
		title: string;
		summary: string;
		published: Date;
		show: string;
		slug: string;
	};
};

export function buildRssItems(
	posts: ArticleLike[],
	shows: ShowLike[],
	limits = { articleLimit: 10, showLimit: 10 },
): FeedEntry[] {
	const latestArticles = posts
		.slice()
		.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
		.slice(0, limits.articleLimit)
		.map((post) => ({
			title: `[Article] ${post.data.title}`,
			description: post.data.excerpt,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
		}));

	const latestShows = shows
		.slice()
		.sort((a, b) => b.data.published.getTime() - a.data.published.getTime())
		.slice(0, limits.showLimit)
		.map((show) => ({
			title: `[Radio show] ${show.data.title}`,
			description: show.data.summary,
			pubDate: show.data.published,
			link: `https://ruc.pt/podcast/${show.data.show}/${show.data.slug}`,
		}));

	return [...latestArticles, ...latestShows].sort(
		(a, b) => b.pubDate.getTime() - a.pubDate.getTime(),
	);
}
