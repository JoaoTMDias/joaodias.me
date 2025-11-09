import { defineConfig } from "tinacms";
import {
  ArticlesCollection,
  BioCollection,
  ExperienceCollection,
  GlobalConfigCollection,
  ProjectsCollection,
  RadioShowsCollection,
} from "./collections";

// Your hosting provider likely exposes this as an environment variable
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
      ArticlesCollection,
      BioCollection,
      ExperienceCollection,
      ProjectsCollection,
      RadioShowsCollection,
    ],
  },
});
