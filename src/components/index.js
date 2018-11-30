/////////////////////
// GENERAL
/////////////////////

// Code Splitting
import asyncComponent from './hoc/asyncComponent';

/////////////////////
// LAYOUT
/////////////////////

import Layout from './layout';
import A11yPageTitle from './ui/page-title/a11ypagetitle.component';
import BackgroundAnimation from './background-animation/background-animation.component';
import ContentPage from './content-page/content-page.component';

// About page
import { LogoCarousel, LastPlayedSong, LastPlayedSongCard } from './about/index';

export { asyncComponent, Layout, A11yPageTitle, BackgroundAnimation, ContentPage, LogoCarousel, LastPlayedSong, LastPlayedSongCard };
