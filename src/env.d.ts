/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly LAST_FM_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
