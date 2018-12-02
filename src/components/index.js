/////////////////////
// GENERAL
/////////////////////
import { siteMetadata as config } from '../../gatsby-config';
import Branding from './general/branding/branding.component';
import { Form, TextInput, TextareaInput } from './general/forms/index';
import asyncComponent from './hoc/asyncComponent';
import Meta from './general/meta/meta.component';

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
import A11yPageTitle from './ui/page-title/a11ypagetitle.component';
import BackgroundAnimation from './background-animation/background-animation.component';
import ContentPage from './content-page/content-page.component';
import MainContent from './general/main-content/main-content.component';
import { LogoCarousel, LastPlayedSong, LastPlayedSongCard } from './about/index';

export {
  Layout,
  Header,
  Footer,
  A11yPageTitle,
  BackgroundAnimation,
  ContentPage,
  MainContent,
  LogoCarousel,
  LastPlayedSong,
  LastPlayedSongCard,
};

/////////////////////
// ABOUT
/////////////////////
import { VerticalTimeline, VerticalTimelineElement } from './ui/vertical-timeline/index';

export { VerticalTimeline, VerticalTimelineElement };

/////////////////////
// BLOBS
/////////////////////
import { BlobOne, BlobTwo, BlobThree, BlobFour } from './ui/blobs/index';
export { BlobOne, BlobTwo, BlobThree, BlobFour };

/////////////////////
// PORTFOLIO PROJECT
/////////////////////
import PortfolioItem from './project/item/portfolioitem.component';

export { PortfolioItem };
