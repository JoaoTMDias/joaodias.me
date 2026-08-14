export type FrontmatterValue = string | number | boolean | null | string[];
export type FrontmatterMap = Record<string, FrontmatterValue>;

const CACHE_DURATION = 12 * 60 * 60 * 1000;

export function stripQuotes(value: string): string {
	if (
		(value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
	) {
		return value.slice(1, -1).replace(/''/g, "'");
	}

	return value;
}

export function parseScalar(rawValue: string): string | number | boolean | null {
	const value = rawValue.trim();

	if (value === "null") return null;
	if (value === "true") return true;
	if (value === "false") return false;
	if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);

	return stripQuotes(value);
}

export function parseFrontmatter(markdownContent: string): FrontmatterMap {
	const match = markdownContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
	if (!match) return {};

	const frontmatter: FrontmatterMap = {};
	const lines = match[1].split(/\r?\n/);

	for (let index = 0; index < lines.length; index += 1) {
		const keyMatch = lines[index]?.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
		if (!keyMatch) continue;

		const key = keyMatch[1];
		const rawValue = keyMatch[2] ?? "";

		if (rawValue === "" || rawValue === "|" || rawValue === ">" || rawValue === ">-") {
			const collected: Array<{ type: "array" | "text"; value: string }> = [];
			let lookahead = index + 1;

			while (lookahead < lines.length) {
				const nextLine = lines[lookahead] ?? "";
				if (/^[a-zA-Z0-9_]+:\s*/.test(nextLine)) break;

				if (/^\s*-\s+/.test(nextLine)) {
					collected.push({ type: "array", value: nextLine.replace(/^\s*-\s+/, "") });
				} else if (/^\s+/.test(nextLine)) {
					collected.push({ type: "text", value: nextLine.trim() });
				} else if (nextLine.trim() === "") {
					collected.push({ type: "text", value: "" });
				} else {
					break;
				}

				lookahead += 1;
			}

			if (collected.length > 0 && collected.every((entry) => entry.type === "array")) {
				frontmatter[key] = collected
					.map((entry) => stripQuotes(entry.value.trim()))
					.filter(Boolean);
			} else {
				frontmatter[key] = collected
					.map((entry) => entry.value)
					.join(" ")
					.replace(/\s+/g, " ")
					.trim();
			}

			index = lookahead - 1;
			continue;
		}

		frontmatter[key] = parseScalar(rawValue);
	}

	return frontmatter;
}

export function safeOneLine(text: string, maxLength = 260): string {
	if (!text) return "";
	const normalized = text.replace(/\s+/g, " ").trim();
	if (normalized.length <= maxLength) return normalized;
	return `${normalized.slice(0, maxLength - 1).trim()}...`;
}

export function yamlString(value: string | null | undefined): string {
	if (value === null || value === undefined || value === "") return "''";
	const str = String(value);
	const YAML_SCALARS = /^(true|false|yes|no|on|off|null|~)$/i;
	if (YAML_SCALARS.test(str) || /: |^[&*!|>{'"#%@`]|[\n\r]/.test(str)) {
		return `"${str.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
	}
	return str;
}

export function createSlug(str: string): string {
	return str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim()
		.replace(/^-+|-+$/g, "");
}
export function tryParseDate(value: unknown): Date | null {
	if (typeof value !== "string" || value.length === 0) return null;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(value: unknown): string {
	const date = tryParseDate(value);
	if (!date) return "Unknown";
	return date.toISOString().slice(0, 10);
}

export function toUrl(siteUrl: string, routePath: string): string {
	const cleanPath = routePath.startsWith("/") ? routePath : `/${routePath}`;
	return `${siteUrl}${cleanPath}`;
}
export function isCacheFresh(timestamp: string): boolean {
	const age = Date.now() - new Date(timestamp).getTime();
	return age < CACHE_DURATION;
}
