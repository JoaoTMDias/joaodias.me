import * as z from "zod";

export const ContactLinkSchema = z.object({
  title: z.string(),
  accessibleLabel: z.string(),
  link: z.string(),
  icon: z.string().optional(),
  id: z.string().optional(),
});
export type ContactLink = z.infer<typeof ContactLinkSchema>;

export const CardSchema = z.object({
  width: z.string(),
  height: z.string(),
});
export type Card = z.infer<typeof CardSchema>;

export const SeoSchema = z.object({
  title: z.string(),
  description: z.string(),
  siteOwner: z.string(),
});
export type Seo = z.infer<typeof SeoSchema>;

export const SkipLinkSchema = z.object({
  target: z.string(),
  text: z.string(),
  as: z.string(),
});
export type SkipLink = z.infer<typeof SkipLinkSchema>;

export const MarqueeSchema = z.object({
  loading: z.string(),
  card: CardSchema,
  track: z.string(),
  artist: z.string(),
  album: z.string(),
});
export type Marquee = z.infer<typeof MarqueeSchema>;

export const FooterSchema = z.object({
  currentlyListeningTitle: z.string(),
  marquee: MarqueeSchema,
});
export type Footer = z.infer<typeof FooterSchema>;

export const SiteConfigSchema = z.object({
  seo: SeoSchema,
  copyright: z.string(),
  skipLinks: z.array(SkipLinkSchema),
  nav: z.array(ContactLinkSchema),
  contactLinks: z.array(ContactLinkSchema),
  footer: FooterSchema,
});
export type SiteConfig = z.infer<typeof SiteConfigSchema>;
