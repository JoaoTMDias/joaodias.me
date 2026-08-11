import type { Collection } from "tinacms";

export const BlogCollection: Collection = {
  name: "article",
  label: "Blog",
  path: "src/content/blog",
  ui: {
    filename: {
      readonly: true,
      slugify: (values) => {
        return (
          values.title
            ?.toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-") || "untitled"
        );
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      required: true,
      isTitle: true,
    },
    {
      type: "datetime",
      name: "pubDate",
      label: "Publication Date",
      required: true,
    },
    {
      type: "datetime",
      name: "updatedDate",
      label: "Last Updated Date",
      required: false,
    },
    {
      type: "string",
      name: "excerpt",
      label: "Excerpt",
      required: true,
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "category",
      label: "Category",
      required: true,
      options: [
        "accessibility",
        "frontend-engineering",
        "case-study",
        "tools-resources",
        "industry-advocacy",
      ],
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      required: false,
    },
    {
      type: "image",
      name: "featuredImage",
      label: "Featured Image",
      required: false,
    },
    {
      type: "number",
      name: "readingTime",
      label: "Reading Time (minutes)",
      required: false,
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      required: true,
      isBody: true,
    },
  ],
};
