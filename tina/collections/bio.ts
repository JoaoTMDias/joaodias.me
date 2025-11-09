import type { Collection } from "tinacms";

export const BioCollection: Collection = {
	name: "bio",
	label: "Bio",
	path: "src/content/bio",
	format: "json",
	ui: {
		allowedActions: {
			create: false,
			delete: false,
		},
	},
	fields: [
		{
			name: "title",
			label: "Section Title",
			type: "string",
			required: true,
		},
		{
			name: "mainTitle",
			label: "Main Heading",
			type: "string",
			required: true,
			ui: {
				component: "textarea",
			},
		},
		{
			name: "description",
			label: "Description Paragraphs",
			type: "string",
			required: true,
			list: true,
			ui: {
				component: "textarea",
			},
		},
		{
			name: "picture",
			label: "Bio Picture",
			type: "object",
			fields: [
				{
					name: "src",
					label: "Image Source",
					type: "image",
					required: true,
				},
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
				{
					name: "alt",
					label: "Alt Text",
					type: "string",
					required: true,
					ui: {
						component: "textarea",
					},
				},
			],
		},
	],
};

