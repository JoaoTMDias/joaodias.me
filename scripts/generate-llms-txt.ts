import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

type FrontmatterValue = string | number | boolean | null | string[];
type FrontmatterMap = Record<string, FrontmatterValue>;

type ContactLink = {
	title: string;
	link: string;
};

type SiteConfig = {
	seo?: {
		siteOwner?: string;
		description?: string;
	};
	contactLinks: ContactLink[];
};

type HomepageData = {
	hero?: {
		intro?: string;
	};
	about?: {
		intro?: string;
		skills?: {
			items?: string[];
		};
	};
};

type ExperienceEntry = {
	title: string;
	description: string;
	location: string;
	startDate: string;
	endDate: string;
	isCurrent: boolean;
};

type ExperienceData = {
	entries: ExperienceEntry[];
};

type SkillEntry = {
	skill: string;
};

type SkillsData = {
	entries: SkillEntry[];
};

type ServiceEntry = {
	category: string;
	label: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..");

const SITE_URL = "https://joaodias.me";

function readJson<T>(filePath: string): T {
	return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

function ensureDirectoryExists(filePath: string): void {
	const dir = path.dirname(filePath);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
}

function collectFilesRecursively(dirPath: string, extension = ".md"): string[] {
	const entries = fs.readdirSync(dirPath, { withFileTypes: true });
	const files: string[] = [];

	for (const entry of entries) {
		const fullPath = path.join(dirPath, entry.name);
		if (entry.isDirectory()) {
			files.push(...collectFilesRecursively(fullPath, extension));
		} else if (entry.isFile() && fullPath.endsWith(extension)) {
			files.push(fullPath);
		}
	}

	return files;
}

function stripQuotes(value: string): string {
	if (
		(value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
	) {
		return value.slice(1, -1).replace(/''/g, "'");
	}

	return value;
}

function parseScalar(rawValue: string): string | number | boolean | null {
	const value = rawValue.trim();

	if (value === "null") return null;
	if (value === "true") return true;
	if (value === "false") return false;
	if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);

	return stripQuotes(value);
}

function parseFrontmatter(markdownContent: string): FrontmatterMap {
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

function tryParseDate(value: unknown): Date | null {
	if (typeof value !== "string" || value.length === 0) return null;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value: unknown): string {
	const date = tryParseDate(value);
	if (!date) return "Unknown";
	return date.toISOString().slice(0, 10);
}

function safeOneLine(text: string, maxLength = 260): string {
	if (!text) return "";
	const normalized = text.replace(/\s+/g, " ").trim();
	if (normalized.length <= maxLength) return normalized;
	return `${normalized.slice(0, maxLength - 1).trim()}...`;
}

function toUrl(routePath: string): string {
	const cleanPath = routePath.startsWith("/") ? routePath : `/${routePath}`;
	return `${SITE_URL}${cleanPath}`;
}

function getGitCommitHash(): string {
	try {
		return execSync("git rev-parse --short HEAD", {
			encoding: "utf-8",
			stdio: ["ignore", "pipe", "ignore"],
		})
			.toString()
			.trim();
	} catch {
		return "unknown";
	}
}

function getServices(): ServiceEntry[] {
	const servicesFile = path.join(
		projectRoot,
		"src",
		"components",
		"expertise-and-services",
		"index.astro",
	);
	const content = fs.readFileSync(servicesFile, "utf-8");
	const matches = [
		...content.matchAll(
			/<jd-accordion-item\s+[\s\S]*?category="([^"]+)"\s+[\s\S]*?label="([^"]+)"/g,
		),
	];

	return matches.map((match) => ({
		category: match[1] ?? "",
		label: match[2] ?? "",
	}));
}

function buildLlmsContent(): string {
	const generatedAt = new Date().toISOString();
	const commitHash = getGitCommitHash();

	const siteConfig = readJson<SiteConfig>(
		path.join(projectRoot, "src", "content", "config", "config.json"),
	);
	const homepageData = readJson<HomepageData>(path.join(projectRoot, "src", "data", "index.json"));
	const experience = readJson<ExperienceData>(
		path.join(projectRoot, "src", "content", "experience", "index.json"),
	);
	const skills = readJson<SkillsData>(
		path.join(projectRoot, "src", "content", "skills", "index.json"),
	);

	const projects = collectFilesRecursively(path.join(projectRoot, "src", "content", "work"))
		.map((filePath) => parseFrontmatter(fs.readFileSync(filePath, "utf-8")))
		.filter((entry) => typeof entry.title === "string" && typeof entry.slug === "string")
		.sort(
			(a, b) => (tryParseDate(b.date)?.getTime() ?? 0) - (tryParseDate(a.date)?.getTime() ?? 0),
		);

	const blogPosts = collectFilesRecursively(path.join(projectRoot, "src", "content", "blog"))
		.map((filePath) => parseFrontmatter(fs.readFileSync(filePath, "utf-8")))
		.filter((entry) => typeof entry.title === "string" && typeof entry.slug === "string")
		.sort(
			(a, b) =>
				(tryParseDate(b.pubDate)?.getTime() ?? 0) - (tryParseDate(a.pubDate)?.getTime() ?? 0),
		);

	const shows = collectFilesRecursively(path.join(projectRoot, "src", "content", "shows"))
		.map((filePath) => parseFrontmatter(fs.readFileSync(filePath, "utf-8")))
		.filter((entry) => typeof entry.title === "string" && typeof entry.slug === "string")
		.sort(
			(a, b) =>
				(tryParseDate(b.published)?.getTime() ?? 0) - (tryParseDate(a.published)?.getTime() ?? 0),
		);

	const services = getServices();
	const profileIntro = safeOneLine(homepageData.hero?.intro || "");
	const aboutIntro = safeOneLine(homepageData.about?.intro || "");
	const skillHighlights = (homepageData.about?.skills?.items || []).join(", ");
	const seoDescription = siteConfig.seo?.description || "";

	const lines = [
		"# llms.txt",
		"",
		"## Site",
		`- Name: ${siteConfig.seo?.siteOwner || "Joao Dias"}`,
		`- Website: ${SITE_URL}`,
		`- Purpose: ${safeOneLine(seoDescription, 200)}`,
		"",
		"## Professional Summary",
		`- Headline: ${profileIntro}`,
		`- About: ${aboutIntro}`,
		"- Focus: Accessibility engineering, frontend architecture, design systems, quality and testing.",
		`- Resume PDF: ${toUrl("/resume-joao-dias.pdf")}`,
		"",
		"## Structured CV",
		...experience.entries.map(
			(item) =>
				`- ${item.startDate} -> ${item.endDate}: ${item.description} at ${item.title} (${item.location})${item.isCurrent ? " [current]" : ""}`,
		),
		"",
		"## Skills",
		`- Core stack: ${skillHighlights}`,
		`- Extended: ${skills.entries.map((entry) => entry.skill).join(", ")}`,
		"",
		"## Expertise and Services",
		...services.map((service) => `- ${service.category}: ${service.label}`),
		"",
		"## Selected Projects",
		...projects.map((project) => {
			const slug = typeof project.slug === "string" ? project.slug : "";
			const title = typeof project.title === "string" ? project.title : "Untitled project";
			const shortDescription =
				typeof project.shortDescription === "string" ? project.shortDescription : "";
			const descriptionRaw = typeof project.description === "string" ? project.description : "";
			const skillsRaw = Array.isArray(project.skills)
				? project.skills.filter((s): s is string => typeof s === "string")
				: [];
			const source = typeof project.sourceCode === "string" ? project.sourceCode : "n/a";
			const liveDemo = typeof project.liveDemo === "string" ? project.liveDemo : "n/a";
			const projectUrl = toUrl(`/work/${slug}`);
			const description = safeOneLine(shortDescription || descriptionRaw);
			const skillsList = skillsRaw.length > 0 ? skillsRaw.join(", ") : "n/a";

			return `- ${title} | URL: ${projectUrl} | Summary: ${description} | Skills: ${skillsList} | Source: ${source} | Demo: ${liveDemo}`;
		}),
		"",
		"## Latest Articles",
		...blogPosts.map((post) => {
			const slug = typeof post.slug === "string" ? post.slug : "";
			const title = typeof post.title === "string" ? post.title : "Untitled article";
			const excerptRaw = typeof post.excerpt === "string" ? post.excerpt : "";
			const category = typeof post.category === "string" ? post.category : "uncategorized";
			const date = formatDate(post.pubDate);
			const articleUrl = toUrl(`/blog/${slug}`);
			const excerpt = safeOneLine(excerptRaw);

			return `- ${title} | URL: ${articleUrl} | Date: ${date} | Category: ${category} | Excerpt: ${excerpt}`;
		}),
		"",
		"## Radio Broadcasts (Latest 6)",
		...shows.slice(0, 6).map((show) => {
			const title = typeof show.title === "string" ? show.title : "Untitled show";
			const showName = typeof show.show === "string" ? show.show : "unknown";
			const date = formatDate(show.published);
			const summary = safeOneLine(typeof show.summary === "string" ? show.summary : "");
			const referenceUrl = toUrl("/about#radio-broadcasts");

			return `- ${title} | Show: ${showName} | Date: ${date} | Summary: ${summary} | Reference: ${referenceUrl}`;
		}),
		"",
		"## Contact and Social Links",
		...siteConfig.contactLinks.map((link) => `- ${link.title}: ${link.link}`),
		"",
		"## Canonical Pages",
		`- Home: ${toUrl("/")}`,
		`- About: ${toUrl("/about")}`,
		`- Blog: ${toUrl("/blog")}`,
		`- Work (navigation): ${toUrl("/work")}`,
		`- Work projects: ${toUrl("/work")}`,
		`- Resume: ${toUrl("/resume-joao-dias.pdf")}`,
		`- llms.txt: ${toUrl("/llms.txt")}`,
		"",
		"## Generation",
		`- Generated at: ${generatedAt}`,
		`- Commit: ${commitHash}`,
		"- Language: English",
		"- Depth: Standard",
		"- Resume scope: Structured CV",
	];

	return `${lines.join("\n")}\n`;
}

try {
	const content = buildLlmsContent();
	const outputPath = path.join(projectRoot, "public", "llms.txt");
	ensureDirectoryExists(outputPath);
	fs.writeFileSync(outputPath, content, "utf-8");

	console.log("✓ llms.txt generated successfully");
	console.log(`  Output: ${outputPath}`);
} catch (error: unknown) {
	const message = error instanceof Error ? error.message : String(error);
	console.error("Error generating llms.txt:", message);
	process.exit(1);
}
