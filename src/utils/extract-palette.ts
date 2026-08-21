import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * Extract 3 main colors from an image file (local path or remote URL) using sharp.
 */
export async function extractImagePalette(imagePathOrUrl: string): Promise<string[] | null> {
	if (!imagePathOrUrl) return null;

	try {
		let buf: Buffer;

		if (imagePathOrUrl.startsWith("http://") || imagePathOrUrl.startsWith("https://")) {
			const res = await fetch(imagePathOrUrl);
			if (!res.ok) return null;
			buf = Buffer.from(await res.arrayBuffer());
		} else {
			// Local path relative to public or root
			const cleanedPath = imagePathOrUrl.replace(/^\//, "");
			const absolutePath = path.resolve(process.cwd(), "public", cleanedPath);
			buf = await fs.readFile(absolutePath);
		}

		const { data, info } = await sharp(buf)
			.resize(64, 64, { fit: "cover" })
			.removeAlpha()
			.raw()
			.toBuffer({ resolveWithObject: true });

		const colorCounts = new Map<string, number>();

		for (let y = 0; y < info.height; y += 2) {
			for (let x = 0; x < info.width; x += 2) {
				const idx = (y * info.width + x) * info.channels;
				const r = data[idx];
				const g = data[idx + 1];
				const b = data[idx + 2];

				// Ignore near-white background pixels and near-black pixels
				const max = Math.max(r, g, b);
				const min = Math.min(r, g, b);
				if ((min > 220 && max > 230) || max < 25) continue;

				const qr = Math.floor(r / 32) * 32;
				const qg = Math.floor(g / 32) * 32;
				const qb = Math.floor(b / 32) * 32;

				const key = `${qr},${qg},${qb}`;
				colorCounts.set(key, (colorCounts.get(key) || 0) + 1);
			}
		}

		const sorted = Array.from(colorCounts.entries()).sort((a, b) => b[1] - a[1]);

		const hexes = sorted.map(([rgbStr]) => {
			const [r, g, b] = rgbStr.split(",").map(Number);
			const toHex = (n: number) => n.toString(16).padStart(2, "0");
			return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
		});

		if (hexes.length === 0) return null;

		const c1 = hexes[0];
		const c2 = hexes.find((h) => h !== c1) || c1;
		const c3 = hexes.find((h) => h !== c1 && h !== c2) || c2;

		return [c1, c2, c3];
	} catch (err) {
		console.warn(`Could not extract palette for ${imagePathOrUrl}:`, err);
		return null;
	}
}
