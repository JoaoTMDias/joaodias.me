import type { CollectionEntry } from "astro:content";
import type { Locale } from "../i18n";

const AUTHOR = {
	"@type": "Person",
	name: "João Dias",
	url: "https://joaodias.me/about/",
};

function absoluteUrl(value: string, site: URL) {
	return new URL(value, site).href;
}

export function getArticleStructuredData(
	article: CollectionEntry<"blog">,
	url: string,
	locale: Locale,
	site: URL,
) {
	const pageUrl = absoluteUrl(url, site);
	const image = article.data.featuredImage
		? absoluteUrl(article.data.featuredImage, site)
		: absoluteUrl("/open-graph-picture.jpg", site);

	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: article.data.title,
		description: article.data.excerpt,
		image,
		datePublished: article.data.pubDate.toISOString(),
		dateModified: (article.data.updatedDate ?? article.data.pubDate).toISOString(),
		author: AUTHOR,
		mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
		url: pageUrl,
		inLanguage: locale === "pt" ? "pt-PT" : "en",
		articleSection: article.data.category,
		keywords: article.data.tags ?? [],
	};
}

export function getProjectStructuredData(
	project: CollectionEntry<"projects">,
	url: string,
	locale: Locale,
	site: URL,
) {
	const relatedUrls = [project.data.liveDemo, project.data.sourceCode].filter(
		(value): value is string => Boolean(value),
	);

	return {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: project.data.title,
		description: project.data.shortDescription,
		abstract: project.data.description,
		dateCreated: project.data.date.toISOString(),
		creator: AUTHOR,
		url: absoluteUrl(url, site),
		inLanguage: locale === "pt" ? "pt-PT" : "en",
		image: absoluteUrl(project.data.cover ?? project.data.thumbnail, site),
		keywords: project.data.skills,
		...(relatedUrls.length > 0 ? { sameAs: relatedUrls } : {}),
	};
}
