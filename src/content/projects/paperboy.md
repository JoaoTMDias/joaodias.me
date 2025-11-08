---
title: Paperboy
slug: paperboy
date: 2020-09-01T00:00:00.000Z
shortDescription: A progressive web app for a concept news reader.
description: >
  To be properly informed these days is a very tedious task. Plus, all the
  information is spread across different websites, news sources and blogs. The
  paper days are gone, so now we have all these devices where we should be
  getting information easily and without any biased curation.
accessibilityConsiderations: >
  As a Progressive Web App focused on making information accessible,
  accessibility was fundamental to Paperboy's design:


  * **Semantic HTML structure** - Proper use of article, section, and navigation
  elements

  * **Keyboard navigation** - Full keyboard support for browsing articles and
  navigation

  * **Screen reader compatibility** - Proper ARIA labels and live regions for
  dynamic content updates

  * **Responsive design** - Works across all device sizes and screen
  orientations

  * **High contrast mode** - Support for system-level high contrast preferences

  * **Offline accessibility** - Service Worker caching ensures content is
  available even offline

  * **Focus management** - Proper focus handling when navigating between
  articles and sources

  * **Reduced motion support** - Respects user preferences for reduced motion


  The app was built with web standards that are accessible by default, ensuring
  that users with disabilities can access news content regardless of their
  assistive technology needs.
technicalApproach: >
  Built with:


  * **Gatsby** - Static site generation with React

  * **News API** - For fetching news articles from multiple sources

  * **Service Workers** - For offline functionality and caching

  * **Styled Components** - For component-scoped styling

  * **Cypress** - For end-to-end testing

  * **Jest** - For unit testing


  The PWA approach allows the app to work across all platforms and browsers,
  with offline support through Service Workers. The app uses fluid typography
  and responsive design to work well on any screen size.


  CSS features like scroll snapping were used to create a smooth, native-feeling
  scrolling experience while maintaining accessibility.
process: >
  The development process started with exploring native mobile development
  (Swift/Java) but quickly pivoted to web standards for better cross-platform
  support and accessibility.


  Service Workers were implemented to cache news articles for offline reading,
  ensuring content is accessible even without an internet connection. The
  Vibration API was experimented with for mobile feedback, but implemented in a
  way that respects user preferences.


  Testing was done with Cypress for end-to-end flows and Jest for unit tests.
  Accessibility testing was done with automated tools and manual keyboard
  navigation.
results: >
  Paperboy demonstrates that Progressive Web Apps can provide a native-like
  experience while maintaining the accessibility benefits of web standards. The
  project taught me a lot about PWA development, Service Workers, and building
  truly cross-platform applications.


  The app successfully showcases how web technologies can be used to create
  accessible, offline-capable applications that work across all devices and
  platforms.
sourceCode: 'https://github.com/joaotmdias/paperboy'
liveDemo: null
skills:
  - gatsby
  - news-api
  - cypress
  - service-workers
  - styled-components
thumbnail: /projects/paperboy/project-icon.jpg
cover: /projects/paperboy/project-cover.jpg
galleryImages:
  - /projects/paperboy/project-1.jpg
themeBackground: '#ffffff'
themeForeground: '#b12013'
---

