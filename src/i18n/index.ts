export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const htmlLang: Record<Locale, "en" | "pt-PT"> = { en: "en", pt: "pt-PT" };

export function isLocale(value: unknown): value is Locale {
	return locales.includes(value as Locale);
}
export function getLocale(value: unknown): Locale {
	return isLocale(value) ? value : defaultLocale;
}
export function localePath(locale: Locale, path = "/"): string {
	const normalized = path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;
	return locale === defaultLocale ? normalized || "/" : `/pt${normalized || "/"}`;
}
export function contentSlug(id: string): string {
	return id.replace(/^(en|pt)\//, "");
}
export function contentUrl(locale: Locale, section: "blog" | "work", id: string): string {
	return localePath(locale, `/${section}/${contentSlug(id)}`);
}
export function formatDate(
	date: Date,
	locale: Locale,
	options: Intl.DateTimeFormatOptions,
): string {
	return new Intl.DateTimeFormat(htmlLang[locale], options).format(date);
}
export type LocalizedEntry = {
	id: string;
	data: { locale: Locale; translationKey: string };
};
export function filterByLocale<T extends LocalizedEntry>(entries: T[], locale: Locale): T[] {
	return entries.filter((entry) => entry.data.locale === locale);
}
export function findCounterpart<T extends LocalizedEntry>(
	entries: T[],
	entry: T,
	locale: Locale,
): T | undefined {
	return entries.find(
		(candidate) =>
			candidate.data.locale === locale &&
			candidate.data.translationKey === entry.data.translationKey,
	);
}
