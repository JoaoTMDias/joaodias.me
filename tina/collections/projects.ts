import type { Collection } from "tinacms";

export const ProjectsCollection: Collection = {
  name: "project",
  label: "Projects",
  path: "src/content/projects",
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
      name: "date",
      label: "Date",
      required: true,
    },
    {
      type: "string",
      name: "shortDescription",
      label: "Short Description",
      required: true,
    },
    {
      type: "rich-text",
      name: "description",
      label: "Full Description",
      required: true,
    },
    {
      type: "string",
      name: "sourceCode",
      label: "Source Code URL",
      required: false,
    },
    {
      type: "string",
      name: "liveDemo",
      label: "Live Demo URL",
      required: false,
    },
    {
      type: "string",
      name: "skills",
      label: "Skills",
      list: true,
      required: true,
    },
    {
      type: "image",
      name: "thumbnail",
      label: "Thumbnail Image",
      required: true,
    },
    {
      type: "image",
      name: "cover",
      label: "Cover Image",
      required: false,
    },
    {
      type: "image",
      name: "galleryImages",
      label: "Gallery Images",
      list: true,
      required: false,
    },
    {
      type: "string",
      name: "themeBackground",
      label: "Theme Background Color",
      required: false,
    },
    {
      type: "string",
      name: "themeForeground",
      label: "Theme Foreground Color",
      required: false,
    },
    {
      type: "rich-text",
      name: "body",
      label: "Project Article Content",
      required: false,
      isBody: true,
    },
  ],
};
