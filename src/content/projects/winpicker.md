---
title: WinPicker
slug: winpicker
date: 2022-01-01T00:00:00.000Z
shortDescription: A colour picker for Windows 11
description: >
  I created a Fluent UI app for Windows 11 and used React, Electron and its Node
  API. This little piece of software enables web developers and designers to
  pick foreground and background colours and get an instant preview of its
  contrast ratio.
sourceCode: "https://github.com/JoaoTMDias/winpicker"
liveDemo: null
skills:
  - react
  - vitejs
  - electron
  - fluent-ui
  - windows-11
thumbnail: /projects/winpicker/project-icon.svg
cover: /projects/winpicker/winpicker-cover.jpeg
galleryImages:
  - /projects/winpicker/winpicker-1.png
  - /projects/winpicker/winpicker-2.png
  - /projects/winpicker/winpicker-3.jpg
themeBackground: "#003C6D"
themeForeground: "#FFCACA"
---

## Accessibility Considerations

Despite being a fun, playful website with easter eggs, accessibility was not compromised. The site was built with:

- Semantic HTML structure throughout
- Proper heading hierarchy
- Keyboard navigation support for all interactive elements
- Screen reader compatibility - easter eggs were implemented in a way that doesn't interfere with assistive technologies
- High contrast text and background colors for readability
- Accessible forms and navigation

The easter eggs (fart sounds) were implemented in a way that doesn't break the user experience for those using assistive technologies. The site maintains WCAG 2.1 AA compliance while still delivering an engaging, fun experience.

## Technical Approach

WinPicker was built using:

- **React** for the user interface components
- **Vite** for fast bundling and development experience
- **Electron** for creating a native Windows application
- **Fluent UI** (@fluentui/react) for native Windows 11 look and feel

The color picker functionality uses an external .exe file that communicates with the Electron app through Node's ipcMain and ipcRenderer processes. This allows the app to access system-level color picker APIs while maintaining a web-based UI.

The contrast ratio calculation follows WCAG guidelines and provides immediate feedback with a 5-star rating system and pass/fail indicators for AA and AAA compliance levels.

## Process

The development process started with exploring React Native for Windows, but quickly pivoted to Electron for faster prototyping and better web development experience.

Accessibility considerations were integrated from the initial design phase, ensuring that all Fluent UI components were properly configured for screen readers and keyboard navigation. The color contrast calculation feature was designed to be the primary focus of the application, making it easy for developers to quickly assess accessibility compliance.

Testing was done with Windows Narrator and NVDA to ensure proper screen reader compatibility.

## Results & Impact

WinPicker successfully fills the gap for Windows developers who need a native, accessible color picker tool. The application serves as a practical example of building accessible desktop applications using web technologies.

The project demonstrates how accessibility can be integrated into the development workflow from the start, rather than being an afterthought.
