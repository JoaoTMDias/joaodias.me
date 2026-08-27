import { describe, expect, it } from "vitest";
import {
	buildAuthorDataUrl,
	buildEpisodeDataUrl,
	parseAuthorPayload,
	parseBuildId,
	parseEpisodePayload,
} from "./ruc-shows";

const reference = {
	programSlug: "roque-de-pai",
	episodeSlug: "episodio-1",
	published: "2026-08-20T12:00:00",
};

describe("RUC shows data", () => {
	it("discovers the build and constructs data URLs", () => {
		expect(parseBuildId('<script id="__NEXT_DATA__">{"buildId":"build-123"}</script>')).toBe(
			"build-123",
		);
		expect(buildAuthorDataUrl("https://ruc.pt", "build-123", "joaotmdias")).toBe(
			"https://ruc.pt/_next/data/build-123/autor/joaotmdias.json?slug=joaotmdias",
		);
		expect(buildEpisodeDataUrl("https://ruc.pt", "build-123", reference)).toContain(
			"/podcast/roque-de-pai/episodio-1.json?slug=roque-de-pai&podcast=episodio-1",
		);
	});

	it("rejects missing or malformed Next.js data", () => {
		expect(() => parseBuildId("<html></html>")).toThrow("does not contain __NEXT_DATA__");
		expect(() => parseBuildId('<script id="__NEXT_DATA__">{</script>')).toThrow(
			"is not valid JSON",
		);
	});

	it("extracts and deduplicates podcast references", () => {
		const item = {
			slug: "episodio-1",
			date: "2026-08-20T12:00:00",
			podcastFields: { programasDePodcast: [{ slug: "roque-de-pai" }] },
		};
		expect(parseAuthorPayload({ pageProps: { results: [[item], [item]] } })).toEqual([reference]);
		expect(() => parseAuthorPayload({ pageProps: { results: [] } })).toThrow(
			"contains no podcast episodes",
		);
	});

	it("normalizes a valid episode response", () => {
		const episode = parseEpisodePayload(
			{
				pageProps: {
					programSlug: "roque-de-pai",
					podcast: {
						title: "Episódio 1",
						slug: "episodio-1",
						date: "2026-08-20T12:00:00",
						excerpt: "<p>Descrição &amp; música.</p>",
						featuredImage: { node: { sourceUrl: "cover.jpg", width: "1200", height: 630 } },
					},
				},
			},
			reference,
		);
		expect(episode).toMatchObject({
			show: "roque-de-pai",
			slug: "episodio-1",
			summary: "Descrição & música.",
			cover: { width: 1200, height: 630 },
		});
	});

	it("rejects an episode identity mismatch", () => {
		const payload = {
			pageProps: {
				programSlug: "outro-programa",
				podcast: { title: "Título", slug: "episodio-1", date: "2026-08-20" },
			},
		};
		expect(() => parseEpisodePayload(payload, reference)).toThrow("identity mismatch");
	});
});
