import { defineCollection, z } from "astro:content";
import { SHOW_PROGRAMS } from "../../tina/collections/radio-shows";

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
    galleryImages: z.array(z.object({
      image: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })).optional(),
    themeBackground: z.string().optional(),
    themeForeground: z.string().optional(),
  }),
});

const showsCollection = defineCollection({
  type: "content",
  schema: z.object({
    program: z.enum(SHOW_PROGRAMS.map((program) => program.value)),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    externalUrl: z.string().url(),
    notes: z.string().optional(),
  }),
});

const configCollection = defineCollection({
  type: "data",
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
      })
    ),
    nav: z.array(
      z.object({
        title: z.string(),
        accessibleLabel: z.string(),
        link: z.string(),
      })
    ),
    contactLinks: z.array(
      z.object({
        title: z.string(),
        accessibleLabel: z.string(),
        link: z.string().url(),
        icon: z.string(),
      })
    ),
    footer: z.object({
      currentlyListeningTitle: z.string(),
      marquee: z.object({
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
  type: "data",
  schema: z.object({
    title: z.string(),
    mainTitle: z.string(),
    description: z.array(z.string()),
    picture: z.object({
      src: z.string(),
      width: z.string(),
      height: z.string(),
      alt: z.string(),
    }),
  }),
});

const experienceCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    isCurrent: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = {
  articles: articlesCollection,
  projects: projectsCollection,
  shows: showsCollection,
  config: configCollection,
  bio: bioCollection,
  experience: experienceCollection,
};
