import type { Collection } from "tinacms";

export const SHOW_PROGRAMS = [
  { value: "mel-e-tal", label: "Mel & Tal" },
  { value: "bem-fresquinho", label: "Bem Fresquinho" },
  { value: "culturama", label: "Culturama" },
  { value: "discossao", label: "Discossão" },
  { value: "epica-balnear", label: "Épica Balnear" },
  { value: "jazzmatazz", label: "Jazzmatazz" },
  { value: "maison", label: "Maison" },
] as const;

export const RadioShowsCollection: Collection = {
  name: "show",
  label: "Radio Shows",
  path: "src/content/shows",
  fields: [
    {
      label: "Program",
      name: "program",
      type: "string",
      options: SHOW_PROGRAMS,
    },
    {
      type: "string",
      name: "title",
      label: "Title",
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Episode Description",
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
      type: "image",
      name: "image",
      label: "Image",
      required: false,
    },
    {
      type: "string",
      name: "externalUrl",
      label: "External URL",
      required: true,
    },
    {
      type: "rich-text",
      name: "notes",
      label: "Show Notes",
      required: false,
      isBody: true,
    },
  ],
};
