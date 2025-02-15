import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginAstro from 'eslint-plugin-astro';

/** @type {import('eslint').Linter.Config[]} */
const ESLINT_CONFIG = [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {
    files: ["**/*.{astro}"],
    rules: {
      "react/no-unknown-property": "off",
      "react/jsx-key": "off",
    },
  },
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  ...eslintPluginAstro.configs.recommended,
];

export default ESLINT_CONFIG;
