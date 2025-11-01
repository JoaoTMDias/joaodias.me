---
title: Paperboy
date: 2020-09-01
shortDescription: A progressive web app for a concept news reader.
description: To be properly informed these days is a very tedious task. Plus, all the information is spread across different websites, news sources and blogs. The paper days are gone, so now we have all these devices where we should be getting information easily and without any biased curation.
accessibilityConsiderations: |
  As a Progressive Web App focused on making information accessible, accessibility was fundamental to Paperboy's design:

  - **Semantic HTML structure** - Proper use of article, section, and navigation elements
  - **Keyboard navigation** - Full keyboard support for browsing articles and navigation
  - **Screen reader compatibility** - Proper ARIA labels and live regions for dynamic content updates
  - **Responsive design** - Works across all device sizes and screen orientations
  - **High contrast mode** - Support for system-level high contrast preferences
  - **Offline accessibility** - Service Worker caching ensures content is available even offline
  - **Focus management** - Proper focus handling when navigating between articles and sources
  - **Reduced motion support** - Respects user preferences for reduced motion

  The app was built with web standards that are accessible by default, ensuring that users with disabilities can access news content regardless of their assistive technology needs.
technicalApproach: |
  Built with:
  - **Gatsby** - Static site generation with React
  - **News API** - For fetching news articles from multiple sources
  - **Service Workers** - For offline functionality and caching
  - **Styled Components** - For component-scoped styling
  - **Cypress** - For end-to-end testing
  - **Jest** - For unit testing

  The PWA approach allows the app to work across all platforms and browsers, with offline support through Service Workers. The app uses fluid typography and responsive design to work well on any screen size.

  CSS features like scroll snapping were used to create a smooth, native-feeling scrolling experience while maintaining accessibility.
process: |
  The development process started with exploring native mobile development (Swift/Java) but quickly pivoted to web standards for better cross-platform support and accessibility.

  Service Workers were implemented to cache news articles for offline reading, ensuring content is accessible even without an internet connection. The Vibration API was experimented with for mobile feedback, but implemented in a way that respects user preferences.

  Testing was done with Cypress for end-to-end flows and Jest for unit tests. Accessibility testing was done with automated tools and manual keyboard navigation.
results: |
  Paperboy demonstrates that Progressive Web Apps can provide a native-like experience while maintaining the accessibility benefits of web standards. The project taught me a lot about PWA development, Service Workers, and building truly cross-platform applications.

  The app successfully showcases how web technologies can be used to create accessible, offline-capable applications that work across all devices and platforms.
sourceCode: https://github.com/joaotmdias/paperboy
liveDemo:
skills:
  - gatsby
  - news-api
  - cypress
  - service-workers
  - styled-components
thumbnail: /projects/paperboy/project-icon.jpg
cover: /projects/paperboy/project-cover.jpg
themeBackground: "#ffffff"
themeForeground: "#b12013"
---

## The Problem

Most people read their news from one, maybe two sources. Perhaps they get their daily info from Instagram or some other social network. In the realm of these Silicon-Valley types of companies, it's so easy to fall into that cycle of misinformation we all came to know, one way or another. Most times, online users only read what they think is the truth. It might be, but they never seek the 'real information' by comparing it from different sources.

This movement of false information spreading, fake news and bad journalism was (and still is) being fed by the lack of tools to compare news articles. In this era of click-bait articles, the newspapers are also to blame.

So I thought: 'This is so wrong. People should have access to an easy, free way to read news on their mobile phone, but at the same time, be allowed to choose from a wide variety of news outlets and also search for specific topics to see what all parts say about one thing'. To an old-internet-fart like me, that's what real democracy sounds like and the real purpose of the web.

Turns out that finding different perspectives on a topic it's an arduous task. We wander from site to site, skipping ads, clicking on cookies acceptance terms and the regular pay-to-access forms.

And I for one can understand why so many people choose to stay with only one or two sources of information: Because it's easier to manage our lives that way. Not the right one, but easier.

How about access on all platforms? Why can't someone start to read something on an iPhone and continue to read that on their Firefox browser on their desktop computer at home?

## The Solution

Once again, I thought to myself: 'I'm going to do something about this. Perhaps a side-project just to showcase that with little effort it is possible'.

One of the most important goals of the app was to get as quickly as possible to a place where you could read articles from your favourite news sources, without too much messing around with login forms, passwords and all sorts of permissions. Just free information and that's it.

Apple News, a service launched by the fruit company, is a way for people to read on their devices. Unfortunately, it is curated by Apple and isn't available to Android devices, only on Apple devices, and not even all of them.

Google News is another free tool but, as much as I like most of the things that the search-giant builds, it still lacks that feeling of open-ness and freedom of choice.

I wanted something that I could share with others, so that they could use for themselves, without business boundaries.

In the past, I've messed up a little bit with Swift and Java. I felt like I removed myself from the visual side of things whilst learning the basics of those two. Or maybe I just sucked at it, I don't know.

I think I like to write software with good-old toolkit of web standards: HTML, CSS and Javascript.

They are old, they are new. They are powerful, but easy to manage. They are accessible by default and always evolving.

So I went with the progressive webapp approach. Something that could be accessed in all browsers and could even be loaded up offline.

I chose Gatsby, styled components, Jest and Cypress. I experimented a bit with Service Workers, with the Vibration API, with - at the time - fresh CSS features, such as scroll snapping

One cool thing of doing layouts for a progressive Web app is that, while developing, you don't think about mobile Operating Systems, but rather the content presentation and how it looks good on an array of different screen sizes. You can experiment with fluid typography, with media queries, Service Workers, caching stuff for offline usage, etc.

Looking back, I think this was the side-project that taught more more about progressive web applications.

