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
import Layout from './layout.component';
const Header = asyncComponent(() => {
  return import(`./navigation/header/index`);
});
const Footer = asyncComponent(() => {
  return import(`./navigation/footer/index`);
});
const A11yPageTitle = asyncComponent(() => {
  return import('./ui/page-title/a11ypagetitle.component');
});

const PageTitle = asyncComponent(() => {
  return import('./ui/page-title/page-title.component');
});
import ContentPage from './content-page/content-page.component';
import MainContent from './general/main-content/main-content.component';
import { LogoCarousel, LastPlayedSong, LastPlayedSongCard } from './about/index';

export {
  Layout,
  Header,
  Footer,
  A11yPageTitle,
  PageTitle,
  ContentPage,
  MainContent,
  LogoCarousel,
  LastPlayedSong,
  LastPlayedSongCard,
};

/////////////////////
// HOME
/////////////////////

const HomePageHero = asyncComponent(() => {
  return import(`./ui/full-page-hero/full-page-hero.component.jsx`);
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
import HelloAnimation from './hello/hello-animation.component';
import HelloAnimationBlob from './hello/hello-animation-blob/hello-animation-blob.component';
import { BlobOne, BlobTwo, BlobThree, BlobFour } from './ui/blobs/index';
export { HelloAnimation, HelloAnimationBlob, BlobOne, BlobTwo, BlobThree, BlobFour };

/////////////////////
// PORTFOLIO PROJECT
/////////////////////
const PortfolioItem = asyncComponent(() => {
  return import(`./project/item/portfolioitem.component`);
});

export { PortfolioItem };
