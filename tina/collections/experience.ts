import type { Collection } from "tinacms";

export const ExperienceCollection: Collection = {
	name: "experience",
	label: "Experience",
	path: "src/content/experience",
	format: "json",
	ui: {
		allowedActions: {
			create: false,
			delete: false,
		},
		filename: {
			readonly: false,
			slugify: () => "index",
		},
	},
	fields: [
		{ type: "string", name: "locale", label: "Locale", required: true, options: ["en", "pt"] },
		{
			type: "string",
			name: "translationKey",
			label: "Translation key",
			required: true,
			description: "Stable identifier shared by translations",
		},
		{
			name: "entries",
			label: "Experience Entries",
			type: "object",
			list: true,
			ui: {
				itemProps: (item) => ({
					label: item?.title ? `${item.title} (${item.startDate ?? ""})` : "Untitled",
				}),
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
			],
		},
	],
};
