import { defineCollection, z } from "astro:content";

const articlesCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		excerpt: z.string(),
		category: z.enum([
			"accessibility",
			"frontend-engineering",
			"case-study",
			"tools-resources",
			"industry-advocacy",
		]),
		tags: z.array(z.string()).optional(),
		featuredImage: z.string().optional(),
		readingTime: z.number().optional(),
	}),
});

const projectsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		shortDescription: z.string(),
		description: z.string(),
		accessibilityConsiderations: z.string(),
		technicalApproach: z.string(),
		process: z.string().optional(),
		results: z.string().optional(),
		sourceCode: z
			.union([z.string().url(), z.literal(""), z.null()])
			.optional()
			.transform((val) => (!val || val === "" ? undefined : val)),
		liveDemo: z
			.union([z.string().url(), z.literal(""), z.null()])
			.optional()
			.transform((val) => (!val || val === "" ? undefined : val)),
		skills: z.array(z.string()),
		thumbnail: z.string(),
		cover: z.string().optional(),
		themeBackground: z.string().optional(),
		themeForeground: z.string().optional(),
	}),
});

export const collections = {
	articles: articlesCollection,
	projects: projectsCollection,
};
