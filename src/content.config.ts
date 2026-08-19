import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const richTextNodeSchema: z.ZodType<{
	type?: string;
	text?: string;
	url?: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strike?: boolean;
	children?: Array<unknown>;
}> = z.lazy(() =>
	z.object({
		type: z.string().optional(),
		text: z.string().optional(),
		url: z.string().optional(),
		bold: z.boolean().optional(),
		italic: z.boolean().optional(),
		underline: z.boolean().optional(),
		strike: z.boolean().optional(),
		children: z.array(richTextNodeSchema).optional(),
	}),
);

const richTextRootSchema = z.object({
	type: z.literal("root"),
	children: z.array(richTextNodeSchema),
});

const blogCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
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
	loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		shortDescription: z.string(),
		description: z.string(),
		sourceCode: z
			.union([z.string(), z.null()])
			.optional()
			.transform((val) => (!val || val === "" ? undefined : val)),
		liveDemo: z
			.union([z.string(), z.null()])
			.optional()
			.transform((val) => (!val || val === "" ? undefined : val)),
		skills: z.array(z.string()),
		thumbnail: z.string(),
		cover: z.string().optional(),
		galleryImages: z
			.array(
				z.object({
					image: z.string(),
					alt: z.string(),
					caption: z.string().optional(),
				}),
			)
			.optional(),
		themeBackground: z.string().optional(),
		themeForeground: z.string().optional(),
	}),
});

const configCollection = defineCollection({
	loader: glob({ pattern: "*.json", base: "./src/content/config" }),
	schema: z.object({
		seo: z.object({
			title: z.string(),
			description: z.string(),
			siteOwner: z.string(),
		}),
		copyright: z.string(),
		skipLinks: z.array(
			z.object({
				target: z.string(),
				text: z.string(),
				as: z.enum(["link", "button"]).optional(),
			}),
		),
		nav: z.array(
			z.object({
				title: z.string(),
				link: z.string(),
			}),
		),
		contactLinks: z.array(
			z.object({
				title: z.string(),
				accessibleLabel: z.string(),
				link: z.string(),
				icon: z.string(),
			}),
		),
		footer: z.object({
			currentlyListeningTitle: z.string(),
			player: z.object({
				loading: z.string(),
				card: z.object({
					width: z.string(),
					height: z.string(),
				}),
				track: z.string(),
				artist: z.string(),
				album: z.string(),
			}),
		}),
	}),
});

const bioCollection = defineCollection({
	loader: glob({ pattern: "*.json", base: "./src/content/bio" }),
	schema: z.object({
		title: z.string(),
		mainTitle: z.string(),
		description: z.union([z.string(), richTextRootSchema]),
		picture: z.object({
			src: z.string(),
			width: z.string(),
			height: z.string(),
			alt: z.string(),
		}),
	}),
});

const experienceCollection = defineCollection({
	loader: glob({ pattern: "index.json", base: "./src/content/experience" }),
	schema: z.object({
		entries: z.array(
			z.object({
				title: z.string(),
				description: z.string(),
				location: z.string(),
				startDate: z.string(),
				endDate: z.string().optional(),
				isCurrent: z.boolean().default(false),
			}),
		),
	}),
});

const skillCollection = defineCollection({
	loader: glob({ pattern: "index.json", base: "./src/content/skills" }),
	schema: z.object({
		entries: z.array(
			z.object({
				skill: z.string(),
				url: z.string().optional(),
			}),
		),
	}),
});

const showsCollection = defineCollection({
	loader: glob({
		pattern: "**/*.md",
		base: "./src/content/shows",
		generateId: ({ entry }) => entry.replace(/\.md$/, ""),
	}),
	schema: z.object({
		show: z.string(),
		slug: z.string(),
		title: z.string(),
		summary: z.string(),
		published: z.coerce.date(),
		coverURL: z.string(),
		coverWidth: z
			.union([z.number(), z.string(), z.null()])
			.optional()
			.transform((v) => (typeof v === "number" ? v : v ? parseInt(v, 10) : null)),
		coverHeight: z
			.union([z.number(), z.string(), z.null()])
			.optional()
			.transform((v) => (typeof v === "number" ? v : v ? parseInt(v, 10) : null)),
		coverAlt: z.string(),
		coverColors: z
			.union([z.array(z.string()), z.string()])
			.optional()
			.transform((val) => {
				if (!val) return undefined;
				if (Array.isArray(val)) return val;
				try {
					return JSON.parse(val) as string[];
				} catch {
					return undefined;
				}
			}),
	}),
});

const testimonialsCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
	schema: z.object({
		name: z.string(),
		role: z.string(),
		avatarUrl: z.string(),
		testimonial: z.string(),
		order: z.number().optional().default(99),
		avatarColors: z
			.union([z.array(z.string()), z.string()])
			.optional()
			.transform((val) => {
				if (!val) return undefined;
				if (Array.isArray(val)) return val;
				try {
					return JSON.parse(val) as string[];
				} catch {
					return undefined;
				}
			}),
	}),
});

export const collections = {
	blog: blogCollection,
	projects: projectsCollection,
	shows: showsCollection,
	config: configCollection,
	bio: bioCollection,
	experience: experienceCollection,
	skills: skillCollection,
	testimonials: testimonialsCollection,
};
