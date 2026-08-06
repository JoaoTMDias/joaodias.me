import type { Collection } from "tinacms";

export const SkillsCollection: Collection = {
	name: "skills",
	label: "Skills",
	path: "src/content/skills",
	format: "json",
	ui: {
		allowedActions: {
			create: false,
			delete: false,
		},
		filename: {
			readonly: true,
			slugify: () => "index",
		},
	},
	fields: [
		{
			name: "entries",
			label: "Skill Entries",
			type: "object",
			list: true,
			ui: {
				itemProps: (item) => ({
					label: item?.skill ? `${item.skill} (${item.url ?? ""})` : "Untitled",
				}),
			},
			fields: [
				{
					name: "skill",
					label: "Skill Name",
					type: "string",
					required: true,
				},
				{
					name: "url",
					label: "Skill URL",
					type: "string",
					required: false,
				},
			],
		},
	],
};

