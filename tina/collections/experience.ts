import type { Collection } from "tinacms";

export const ExperienceCollection: Collection = {
	name: "experience",
	label: "Experience",
	path: "src/content/experience",
	format: "json",
	ui: {
		filename: {
			readonly: false,
			slugify: (values) => {
				const company = values.title?.toLowerCase().replace(/\s+/g, "-") || "";
				const year = values.startDate || "";
				return `${company}-${year}`;
			},
		},
	},
	fields: [
		{
			name: "title",
			label: "Company/Organization Name",
			type: "string",
			required: true,
		},
		{
			name: "description",
			label: "Job Title/Role",
			type: "string",
			required: true,
			ui: {
				component: "textarea",
			},
		},
		{
			name: "location",
			label: "Location",
			type: "string",
			required: true,
		},
		{
			name: "startDate",
			label: "Start Year",
			type: "string",
			required: true,
		},
		{
			name: "endDate",
			label: "End Year",
			type: "string",
			description: "Leave empty if current position",
		},
		{
			name: "isCurrent",
			label: "Is Current Position?",
			type: "boolean",
		},
		{
			name: "order",
			label: "Display Order",
			type: "number",
			required: true,
			description: "Lower numbers appear first",
		},
	],
};

