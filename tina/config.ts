import { defineConfig } from "tinacms";
import {
	BioCollection,
	BlogCollection,
	ExperienceCollection,
	GlobalConfigCollection,
	SkillsCollection,
	TestimonialsCollection,
	WorkCollection,
} from "./collections";

const branch =
	process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

export default defineConfig({
	branch,
	clientId: process.env.PUBLIC_TINA_CLIENT_ID,
	token: process.env.TINA_TOKEN,

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
			GlobalConfigCollection,
			BlogCollection,
			BioCollection,
			ExperienceCollection,
			WorkCollection,
			SkillsCollection,
			TestimonialsCollection,
		],
	},
});
