import type { Collection } from "tinacms";

export const ArticlesCollection: Collection = {
  name: "article",
  label: "Articles",
  path: "src/content/articles",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      required: true,
    },
    {
      type: "string",
      name: "slug",
      label: "Slug",
      required: true,
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
