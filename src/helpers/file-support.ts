/**
 * Detects WEBP Support with JavaScript
 *
 * @returns {Promise<boolean>}
 */
export async function supportsWebp(): Promise<boolean> {
	if (!self.createImageBitmap) return false;

	const webpData: string = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
	const blob = await fetch(webpData).then(response => response.blob());
	return createImageBitmap(blob).then(
		() => true,
		() => false,
	);
}
