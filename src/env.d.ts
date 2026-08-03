/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly LAST_FM_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace astroHTML.JSX {
	interface IntrinsicElements {
		"jd-accordion": {
			"allow-multiple"?: boolean | string;
			class?: string;
			id?: string;
			children?: any;
		};
		"jd-accordion-item": {
			category?: string;
			label: string;
			open?: boolean | string;
			"heading-level"?: number | string;
			class?: string;
			id?: string;
			children?: any;
		};
	}
}
