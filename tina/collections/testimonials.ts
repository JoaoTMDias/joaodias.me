import type { Collection } from "tinacms";

export const TestimonialsCollection: Collection = {
	name: "testimonials",
	label: "Peer Feedback / Testimonials",
	path: "src/content/testimonials",
	format: "md",
	ui: {
		filename: {
			readonly: false,
			slugify: (values) => {
				return values.name?.toLowerCase().replace(/\s+/g, "-") || "testimonial";
			},
		},
	},
	fields: [
		{
			name: "name",
			label: "Person Name",
			type: "string",
			required: true,
			isTitle: true,
		},
		{
			name: "role",
			label: "Role & Company",
			type: "string",
			required: true,
		},
		{
			name: "avatarUrl",
			label: "Avatar Image Path",
			type: "image",
			required: true,
		},
		{
			name: "testimonial",
			label: "Testimonial Content",
			type: "string",
			required: true,
			ui: {
				component: "textarea",
			},
		},
		{
			name: "order",
			label: "Sort Order",
			type: "number",
		},
		{
			name: "avatarColors",
			label: "Extracted Avatar Colors",
			type: "string",
			list: true,
			description: "Auto-generated extracted palette colors (3 hex codes)",
		},
	],
};
