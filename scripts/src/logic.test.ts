import { describe, expect, it } from "vitest";
import { createSlug, isCacheFresh, parseFrontmatter, safeOneLine, yamlString } from "./logic";

describe("script logic helpers", () => {
	it("parses frontmatter scalars and arrays correctly", () => {
		const parsed = parseFrontmatter(`---
title: "Example project"
slug: sample-project
featured: true
skills:
  - React
  - TypeScript
summary: |
  A long summary
  with a second line
---
body`);

		expect(parsed.title).toBe("Example project");
		expect(parsed.slug).toBe("sample-project");
		expect(parsed.featured).toBe(true);
		expect(parsed.skills).toEqual(["React", "TypeScript"]);
		expect(parsed.summary).toBe("A long summary with a second line");
	});

	it("normalizes text and escapes YAML values safely", () => {
		expect(safeOneLine("  Hello   world\n again  ", 30)).toBe("Hello world again");
		expect(yamlString("hello: world")).toBe('"hello: world"');
		expect(createSlug("São João's project!")).toBe("sao-joaos-project");
		expect(isCacheFresh(new Date(Date.now() - 10 * 60 * 1000).toISOString())).toBe(true);
		expect(isCacheFresh(new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString())).toBe(false);
	});
});
