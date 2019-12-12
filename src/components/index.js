// ///////////////////
// IMPORTS
// ///////////////////
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { BlobOne, BlobTwo, BlobThree, BlobFour } from "./blobs/index";
import { CallToActionItem } from "./navigation/call-to-action/call-to-action-item.component";
import { CallToActionWrapper } from "./navigation/call-to-action/call-to-action-wrapper.component";
import { Form, TextInput, TextareaInput } from "./forms/index";
import { siteMetadata as config } from "../../gatsby-config";
import { VerticalTimeline, VerticalTimelineElement } from "./vertical-timeline/index";
import SkipLink from "./navigation/skip-link/index";

// ///////////////////
// LAZY LOADED
// ///////////////////
const Meta = loadable(() => pMinDelay(import("./meta"), 200));

const A11yPageTitle = loadable(() => pMinDelay(import("./page-title/a11ypagetitle"), 200));

const PageTitle = loadable(() => pMinDelay(import("./page-title/page-title"), 200));

const ContentPage = loadable(() => pMinDelay(import("./content-page"), 200));

const MainContent = loadable(() => pMinDelay(import("./main-content/main-content.component"), 200));

const HelloAnimation = loadable(() => pMinDelay(import("./hello"), 200));

const HelloAnimationBlob = loadable(() => pMinDelay(import("./hello/hello-animation-blob"), 200));

// ///////////////////
// EXPORTS
// ///////////////////
export * from "./branding";
export * from "./full-page-hero/full-page-hero";
export * from "./last-played-song/last-played-song-card";
export * from "./last-played-song/last-played-song";
export * from "./layout";
export * from "./logo-carousel/logo-carousel.component";
export * from "./navigation/bottom-navigation/bottom-navigation.component";
export * from "./navigation/footer/index";
export * from "./navigation/header";
export * from "./navigation/social-navigation/social-navigation.component";
export * from "./skills-deck";
export {
	A11yPageTitle,
	BlobFour,
	BlobOne,
	BlobThree,
	BlobTwo,
	CallToActionItem,
	CallToActionWrapper,
	config,
	ContentPage,
	Form,
	HelloAnimation,
	HelloAnimationBlob,
	MainContent,
	Meta,
	PageTitle,
	SkipLink,
	TextareaInput,
	TextInput,
	VerticalTimeline,
	VerticalTimelineElement,
};
