import type { Collection } from "tinacms";
import IconComponent from "../components/IconComponent";

export const GlobalConfigCollection: Collection = {
  name: "config",
  label: "Global Config",
  path: "src/content/config",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      name: "seo",
      label: "General site config",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Site title for SEO",
          type: "string",
          required: true,
        },
        {
          name: "description",
          label: "Site description for SEO",
          type: "string",
          required: true,
        },
        {
          name: "siteOwner",
          label: "Your Name, Company Name (Used in the footer",
          required: true,
          type: "string",
          ui: {
            defaultValue: "Your name here",
          },
        },
        // Add more settings here...
      ],
    },
    {
      name: "copyright",
      label: "Copyright Text",
      type: "string",
      required: true,
      ui: {
        component: "textarea",
      },
    },
    {
      name: "skipLinks",
      label: "Skip Links (Accessibility)",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item.text,
          };
        },
      },
      fields: [
        {
          name: "target",
          label: "Target ID",
          type: "string",
          required: true,
        },
        {
          name: "text",
          label: "Link Text",
          type: "string",
          required: true,
        },
        {
          name: "as",
          label: "Element Type",
          type: "string",
          options: ["link", "button"],
        },
      ],
    },
    {
      name: "nav",
      label: "Site Navigation Menu (Reorder, Add, Remove)",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item.title,
          };
        },
      },
      fields: [
        {
          name: "title",
          label: "Title of Nav Item",
          type: "string",
          required: true,
        },
        {
          name: "accessibleLabel",
          label: "Accessible Label of Nav Item",
          type: "string",
          required: true,
        },
        {
          name: "link",
          label: "Path of the Nav Item",
          type: "string",
          required: true,
        },
      ],
    },
    {
      name: "contactLinks",
      label: "Contact Links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item.title,
          };
        },
      },
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "accessibleLabel",
          label: "Accessible Label",
          type: "string",
        },
        {
          name: "link",
          label: "Link",
          type: "string",
        },
        {
          name: "icon",
          label: "Icon",
          type: "string",
          ui: {
            //@ts-expect-error
            component: IconComponent,
          },
        },
      ],
    },
    {
      name: "footer",
      label: "Footer Settings",
      type: "object",
      fields: [
        {
          name: "currentlyListeningTitle",
          label: "Currently Listening Section Title",
          type: "string",
          required: true,
        },
        {
          name: "marquee",
          label: "Marquee Settings",
          type: "object",
          fields: [
            {
              name: "loading",
              label: "Loading Text",
              type: "string",
              required: true,
            },
            {
              name: "card",
              label: "Card Dimensions",
              type: "object",
              fields: [
                {
                  name: "width",
                  label: "Width",
                  type: "string",
                  required: true,
                },
                {
                  name: "height",
                  label: "Height",
                  type: "string",
                  required: true,
                },
              ],
            },
            {
              name: "track",
              label: "Track Link Suffix Text",
              type: "string",
              required: true,
            },
            {
              name: "artist",
              label: "Artist Prefix Text",
              type: "string",
              required: true,
            },
            {
              name: "album",
              label: "Album Text",
              type: "string",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
