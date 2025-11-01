import { defineConfig } from "tinacms";

export default defineConfig({
	branch: "master",
	clientId: process.env.TINA_PUBLIC_CLIENT_ID || "",
	token: process.env.TINA_TOKEN || "",
	build: {
		outputFolder: "admin",
		publicFolder: "public",
	},
	media: {
		tina: {
			mediaRoot: "",
			publicFolder: "public",
		},
	},
	schema: {
		collections: [
			{
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
			},
			{
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
						type: "rich-text",
						name: "accessibilityConsiderations",
						label: "Accessibility Considerations",
						required: true,
					},
					{
						type: "rich-text",
						name: "technicalApproach",
						label: "Technical Approach",
						required: true,
					},
					{
						type: "rich-text",
						name: "process",
						label: "Process",
						required: false,
					},
					{
						type: "rich-text",
						name: "results",
						label: "Results & Impact",
						required: false,
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
				],
			},
		],
	},
});

