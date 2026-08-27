import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { createSlug, parseFrontmatter, yamlString } from "./src/logic";
import {
	buildAuthorDataUrl,
	buildEpisodeDataUrl,
	type Episode,
	type EpisodeReference,
	parseAuthorPayload,
	parseBuildId,
	parseEpisodePayload,
} from "./src/ruc-shows";

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const showsDir = path.join(projectRoot, "src", "content", "shows");
const RUC_URL = "https://ruc.pt";
const AUTHOR_SLUG = "joaotmdias";
const REQUEST_ATTEMPTS = 3;
const EPISODE_CONCURRENCY = 5;

async function request(url: string, responseType: "json" | "text"): Promise<unknown> {
	let lastError: unknown;
	for (let attempt = 1; attempt <= REQUEST_ATTEMPTS; attempt += 1) {
		try {
			const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
			if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
			return responseType === "json" ? await response.json() : await response.text();
		} catch (error) {
			lastError = error;
			if (attempt < REQUEST_ATTEMPTS) {
				console.warn(`Request failed (${attempt}/${REQUEST_ATTEMPTS}): ${url}`);
				await new Promise((resolve) => setTimeout(resolve, attempt * 500));
			}
		}
	}
	throw new Error(`Request failed after ${REQUEST_ATTEMPTS} attempts: ${url}`, {
		cause: lastError,
	});
}

async function listMarkdownFiles(directory: string): Promise<string[]> {
	try {
		const entries = await fs.readdir(directory, { withFileTypes: true });
		return (
			await Promise.all(
				entries.map((entry) => {
					const entryPath = path.join(directory, entry.name);
					if (entry.isDirectory()) return listMarkdownFiles(entryPath);
					return entry.isFile() && entry.name.endsWith(".md") ? [entryPath] : [];
				}),
			)
		).flat();
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
		throw error;
	}
}

interface ExistingEpisodes {
	slugs: Set<string>;
	latestPublished: number | null;
}

async function getExistingEpisodes(): Promise<ExistingEpisodes> {
	const files = await listMarkdownFiles(showsDir);
	const contents = await Promise.all(files.map((file) => fs.readFile(file, "utf8")));
	const entries = contents.map(parseFrontmatter);
	const slugs = entries
		.map((entry) => entry.slug)
		.filter((slug): slug is string => typeof slug === "string" && slug.length > 0);
	const dates = entries
		.map((entry) => new Date(String(entry.published ?? "")).getTime())
		.filter(Number.isFinite);
	return {
		slugs: new Set(slugs),
		latestPublished: dates.length > 0 ? Math.max(...dates) : null,
	};
}

async function extractImagePalette(
	imageUrl: string,
): Promise<[string, string, string] | undefined> {
	if (!imageUrl) return undefined;
	try {
		const response = await fetch(imageUrl, { signal: AbortSignal.timeout(8_000) });
		if (!response.ok) return undefined;
		const { data, info } = await sharp(Buffer.from(await response.arrayBuffer()))
			.resize(64, 64, { fit: "cover" })
			.removeAlpha()
			.raw()
			.toBuffer({ resolveWithObject: true });
		const counts = new Map<string, number>();
		for (let y = 0; y < info.height; y += 2) {
			for (let x = 0; x < info.width; x += 2) {
				const index = (y * info.width + x) * 3;
				const key = [data[index], data[index + 1], data[index + 2]]
					.map((value) => Math.floor(value / 32) * 32)
					.join(",");
				counts.set(key, (counts.get(key) ?? 0) + 1);
			}
		}
		const colors = [...counts.entries()]
			.sort((a, b) => b[1] - a[1])
			.map(
				([key]) =>
					`#${key
						.split(",")
						.map(Number)
						.map((value) => value.toString(16).padStart(2, "0"))
						.join("")}`,
			)
			.filter((color, index, all) => all.indexOf(color) === index);
		if (colors.length === 0) return undefined;
		return [colors[0], colors[1] ?? colors[0], colors[2] ?? colors[1] ?? colors[0]];
	} catch (error) {
		console.warn(`Could not extract palette for ${imageUrl}:`, error);
		return undefined;
	}
}

async function fetchNewEpisodes(
	buildId: string,
	references: EpisodeReference[],
	existing: ExistingEpisodes,
): Promise<Episode[]> {
	const pending = references.filter(
		(reference) =>
			!existing.slugs.has(reference.episodeSlug) &&
			(existing.latestPublished === null ||
				new Date(reference.published).getTime() > existing.latestPublished),
	);
	console.log(`Found ${references.length} episodes; ${pending.length} are new.`);
	const episodes: Episode[] = [];
	for (let index = 0; index < pending.length; index += EPISODE_CONCURRENCY) {
		const batch = pending.slice(index, index + EPISODE_CONCURRENCY);
		const results = await Promise.all(
			batch.map(async (reference) =>
				parseEpisodePayload(
					await request(buildEpisodeDataUrl(RUC_URL, buildId, reference), "json"),
					reference,
				),
			),
		);
		episodes.push(...results);
	}
	return Promise.all(
		episodes.map(async (episode) => ({
			...episode,
			cover: { ...episode.cover, colors: await extractImagePalette(episode.cover.url) },
		})),
	);
}

function episodeFile(episode: Episode): { filePath: string; content: string } {
	const publishedDate = new Date(episode.published).toISOString().slice(0, 10);
	const titleSlug = createSlug(episode.title).slice(0, 50);
	const translationKey = `${episode.show}_${publishedDate}_${titleSlug}`;
	return {
		filePath: path.join(showsDir, episode.show, `${translationKey}.md`),
		content: `---
locale: pt
translationKey: ${translationKey}
show: ${episode.show}
slug: ${episode.slug}
title: ${yamlString(episode.title)}
summary: >-
  ${episode.summary}
published: ${episode.published}
coverURL: ${episode.cover.url}
coverWidth: ${episode.cover.width ?? ""}
coverHeight: ${episode.cover.height ?? ""}
coverAlt: ${yamlString(episode.cover.alt)}
coverColors: ${episode.cover.colors ? JSON.stringify(episode.cover.colors) : "[]"}
---
`,
	};
}

async function main(): Promise<void> {
	console.log("Get Latest Shows - Starting...\n");
	const html = (await request(`${RUC_URL}/autor/${AUTHOR_SLUG}`, "text")) as string;
	const buildId = parseBuildId(html);
	const authorPayload = await request(buildAuthorDataUrl(RUC_URL, buildId, AUTHOR_SLUG), "json");
	const references = parseAuthorPayload(authorPayload);
	const episodes = await fetchNewEpisodes(buildId, references, await getExistingEpisodes());

	// Complete all remote work and validation before changing tracked files.
	const files = episodes.map(episodeFile);
	for (const file of files) {
		await fs.mkdir(path.dirname(file.filePath), { recursive: true });
		await fs.writeFile(file.filePath, file.content);
		console.log(`Created ${path.basename(file.filePath)}`);
	}
	console.log(`\nSuccessfully completed. Generated ${files.length} new episode(s).`);
}

main().catch((error) => {
	console.error("Get Latest Shows failed:", error);
	process.exitCode = 1;
});
