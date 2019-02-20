/////////////////////
// GENERAL
/////////////////////
import asyncComponent from './hoc/asyncComponent';
import { siteMetadata as config } from '../../gatsby-config';
const Branding = asyncComponent(() => {
  return import('./general/branding/branding.component');
});
const Meta = asyncComponent(() => {
  return import('./general/meta/meta.component');
});
import { Form, TextInput, TextareaInput } from './general/forms/index';

export { config, Branding, Form, TextInput, TextareaInput, asyncComponent, Meta };

/////////////////////
// LAYOUT
/////////////////////
const Layout = asyncComponent(() => {
  return import('./layout.component');
});
const Header = asyncComponent(() => {
  return import(`./navigation/header/index`);
});
const BottomNavigation = asyncComponent(() => {
  return import(`./navigation/bottom-navigation/bottom-navigation.component`);
});
const Footer = asyncComponent(() => {
  return import(`./navigation/footer/index`);
});

const SocialNavigation = asyncComponent(() => {
  return import(`./navigation/social-navigation/social-navigation.component`);
});

import SkipLink from './navigation/skip-link/skip-link.component';

import { CallToActionItem, CallToActionWrapper } from './navigation/call-to-action/index';

const A11yPageTitle = asyncComponent(() => {
  return import('./ui/page-title/a11ypagetitle.component');
});
const PageTitle = asyncComponent(() => {
  return import('./ui/page-title/page-title.component');
});
const ContentPage = asyncComponent(() => {
  return import('./content-page/content-page.component');
});
const MainContent = asyncComponent(() => {
  return import('./general/main-content/main-content.component');
});

export * from './about/index';

export {
  Layout,
  Header,
  BottomNavigation,
  Footer,
  SocialNavigation,
  SkipLink,
  CallToActionItem,
  CallToActionWrapper,
  A11yPageTitle,
  PageTitle,
  ContentPage,
  MainContent,
};

/////////////////////
// HOME
/////////////////////

const HomePageHero = asyncComponent(() => {
  return import(`./ui/full-page-hero/full-page-hero.component`);
});

export { HomePageHero };

/////////////////////
// ABOUT
/////////////////////
import { VerticalTimeline, VerticalTimelineElement } from './ui/vertical-timeline/index';
export { VerticalTimeline, VerticalTimelineElement };

/////////////////////
// BLOBS
/////////////////////
const HelloAnimation = asyncComponent(() => {
  return import(`./hello/hello-animation.component`);
});
const HelloAnimationBlob = asyncComponent(() => {
  return import(`./hello/hello-animation-blob/hello-animation-blob.component`);
});
import { BlobOne, BlobTwo, BlobThree, BlobFour } from './ui/blobs/index';
export { HelloAnimation, HelloAnimationBlob, BlobOne, BlobTwo, BlobThree, BlobFour };

/////////////////////
// PORTFOLIO PROJECT
/////////////////////
const PortfolioItem = asyncComponent(() => {
  return import(`./project/item/portfolioitem.component`);
});

export { PortfolioItem };
