export interface EpisodeReference {
	programSlug: string;
	episodeSlug: string;
	published: string;
}

export interface Episode {
	show: string;
	title: string;
	slug: string;
	published: string;
	summary: string;
	cover: {
		url: string;
		width: number | null;
		height: number | null;
		alt: string;
		colors?: [string, string, string];
	};
}

function record(value: unknown): Record<string, unknown> | null {
	return value !== null && typeof value === "object" && !Array.isArray(value)
		? (value as Record<string, unknown>)
		: null;
}

function requiredString(value: unknown, field: string): string {
	if (typeof value !== "string" || value.trim() === "")
		throw new Error(`Invalid or missing ${field}`);
	return value;
}

function safeSlug(value: unknown, field: string): string {
	const slug = requiredString(value, field);
	if (!/^[\w-]+$/.test(slug)) throw new Error(`Invalid ${field}: ${slug}`);
	return slug;
}

export function parseBuildId(html: string): string {
	const match = html.match(/<script[^>]*id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i);
	if (!match) throw new Error("RUC page does not contain __NEXT_DATA__");
	let payload: unknown;
	try {
		payload = JSON.parse(match[1]);
	} catch {
		throw new Error("RUC __NEXT_DATA__ is not valid JSON");
	}
	return safeSlug(record(payload)?.buildId, "buildId");
}

export function buildAuthorDataUrl(baseUrl: string, buildId: string, authorSlug: string): string {
	return `${baseUrl}/_next/data/${encodeURIComponent(buildId)}/autor/${encodeURIComponent(authorSlug)}.json?slug=${encodeURIComponent(authorSlug)}`;
}

export function buildEpisodeDataUrl(
	baseUrl: string,
	buildId: string,
	reference: EpisodeReference,
): string {
	const program = encodeURIComponent(reference.programSlug);
	const episode = encodeURIComponent(reference.episodeSlug);
	return `${baseUrl}/_next/data/${encodeURIComponent(buildId)}/podcast/${program}/${episode}.json?slug=${program}&podcast=${episode}`;
}

export function parseAuthorPayload(payload: unknown): EpisodeReference[] {
	const results = record(record(payload)?.pageProps)?.results;
	if (!Array.isArray(results)) throw new Error("RUC author JSON is missing pageProps.results");
	const references = new Map<string, EpisodeReference>();
	for (const group of results) {
		if (!Array.isArray(group)) continue;
		for (const value of group) {
			const item = record(value);
			const programs = record(item?.podcastFields)?.programasDePodcast;
			if (!item || !Array.isArray(programs) || programs.length === 0) continue;
			const program = record(programs[0]);
			if (typeof item.slug !== "string" || typeof program?.slug !== "string") continue;
			const reference = {
				programSlug: safeSlug(program.slug, "program slug"),
				episodeSlug: safeSlug(item.slug, "episode slug"),
				published: requiredString(item.date, "episode date"),
			};
			if (Number.isNaN(new Date(reference.published).getTime())) {
				throw new Error(`Invalid episode date: ${reference.published}`);
			}
			references.set(`${reference.programSlug}/${reference.episodeSlug}`, reference);
		}
	}
	if (references.size === 0) throw new Error("RUC author JSON contains no podcast episodes");
	return [...references.values()];
}

function decodeExcerpt(value: unknown): string {
	if (typeof value !== "string") return "Sem descrição disponível.";
	return (
		value
			.replace(/<[^>]*>/g, " ")
			.replace(/&nbsp;/gi, " ")
			.replace(/&amp;/gi, "&")
			.replace(/&lt;/gi, "<")
			.replace(/&gt;/gi, ">")
			.replace(/&#39;|&apos;/gi, "'")
			.replace(/&quot;/gi, '"')
			.replace(/\s+/g, " ")
			.trim() || "Sem descrição disponível."
	);
}

function optionalDimension(value: unknown): number | null {
	const parsed = typeof value === "number" ? value : Number.parseInt(String(value ?? ""), 10);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function parseEpisodePayload(payload: unknown, expected: EpisodeReference): Episode {
	const pageProps = record(record(payload)?.pageProps);
	const podcast = record(pageProps?.podcast);
	if (!pageProps || !podcast) throw new Error("RUC episode JSON is missing pageProps.podcast");
	const show = safeSlug(pageProps.programSlug, "program slug");
	const slug = safeSlug(podcast.slug, "episode slug");
	if (show !== expected.programSlug || slug !== expected.episodeSlug) {
		throw new Error(
			`RUC episode identity mismatch: expected ${expected.programSlug}/${expected.episodeSlug}`,
		);
	}
	const published = requiredString(podcast.date, "published date");
	if (Number.isNaN(new Date(published).getTime()))
		throw new Error(`Invalid published date: ${published}`);
	const image = record(record(podcast.featuredImage)?.node);
	return {
		show,
		slug,
		title: requiredString(podcast.title, "episode title"),
		published,
		summary: decodeExcerpt(podcast.excerpt),
		cover: {
			url: typeof image?.sourceUrl === "string" ? image.sourceUrl : "",
			width: optionalDimension(image?.width),
			height: optionalDimension(image?.height),
			alt: typeof image?.altText === "string" ? image.altText : "",
		},
	};
}
