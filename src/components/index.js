// ///////////////////
// IMPORTS
// ///////////////////
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { BlobOne, BlobTwo, BlobThree, BlobFour } from "./hello/blobs/index";
import { CallToActionItem } from "./navigation/call-to-action/item";
import { CallToActionWrapper } from "./navigation/call-to-action/wrapper";
import { Form, TextInput, TextareaInput } from "./forms/index";
import { siteMetadata as config } from "../../gatsby-config";
import { VerticalTimeline, VerticalTimelineElement } from "./vertical-timeline/index";
import { SkipLink } from "./navigation/skip-link/index";

// ///////////////////
// LAZY LOADED
// ///////////////////
const A11yPageTitle = loadable(
	/* webpackChunkName: "a11ypagetitle" */ () => pMinDelay(import("./page-title/a11ypagetitle"), 16),
);

const Footer = loadable(/* webpackChunkName: "footer" */ () => pMinDelay(import("./navigation/footer/index"), 16));

// ///////////////////
// EXPORTS
// ///////////////////
export * from "./page-title/index";
export * from "./branding";
export * from "./full-page-hero";
export * from "./last-played-song/last-played-song";
export * from "./layout";
export * from "./main-content";
export * from "./content-page";
export * from "./logo-carousel/logo-carousel.component";
export * from "./navigation/bottom-navigation/index";
export * from "./navigation/social-navigation/index";
export * from "./skills-deck/index";
export {
	A11yPageTitle,
	BlobFour,
	BlobOne,
	BlobThree,
	BlobTwo,
	CallToActionItem,
	CallToActionWrapper,
	config,
	Form,
	Footer,
	SkipLink,
	TextareaInput,
	TextInput,
	VerticalTimeline,
	VerticalTimelineElement,
};
