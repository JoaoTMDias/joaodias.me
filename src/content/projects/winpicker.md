---
title: WinPicker
date: 2022-01-01
shortDescription: A colour picker for Windows 11
description: I created a Fluent UI app for Windows 11 and used React, Electron and its Node API. This little piece of software enables web developers and designers to pick foreground and background colours and get an instant preview of its contrast ratio.
accessibilityConsiderations: |
  WinPicker was built with accessibility as a core requirement from the start. The application uses Microsoft's Fluent UI components which follow WCAG 2.1 AA guidelines and provide built-in keyboard navigation support.

  Key accessibility features implemented:
  - Full keyboard navigation throughout the application
  - High contrast mode support following Windows 11 design guidelines
  - Screen reader compatibility through proper ARIA labels and semantic HTML
  - Focus management with visible focus indicators
  - Color contrast ratio calculations displayed prominently (AA and AAA levels for both large and regular text)
  - The color picker interface itself is accessible, allowing users to select colors using keyboard shortcuts

  The app specifically helps developers and designers create accessible color combinations by providing real-time contrast ratio feedback and WCAG compliance indicators.
technicalApproach: |
  WinPicker was built using:
  - **React** for the user interface components
  - **Vite** for fast bundling and development experience
  - **Electron** for creating a native Windows application
  - **Fluent UI (@fluentui/react)** for native Windows 11 look and feel

  The color picker functionality uses an external .exe file that communicates with the Electron app through Node's ipcMain and ipcRenderer processes. This allows the app to access system-level color picker APIs while maintaining a web-based UI.

  The contrast ratio calculation follows WCAG guidelines and provides immediate feedback with a 5-star rating system and pass/fail indicators for AA and AAA compliance levels.
process: |
  The development process started with exploring React Native for Windows, but quickly pivoted to Electron for faster prototyping and better web development experience.

  Accessibility considerations were integrated from the initial design phase, ensuring that all Fluent UI components were properly configured for screen readers and keyboard navigation. The color contrast calculation feature was designed to be the primary focus of the application, making it easy for developers to quickly assess accessibility compliance.

  Testing was done with Windows Narrator and NVDA to ensure proper screen reader compatibility.
results: |
  WinPicker successfully fills the gap for Windows developers who need a native, accessible color picker tool. The application has been well-received by the development community and serves as a practical example of building accessible desktop applications using web technologies.

  The project demonstrates how accessibility can be integrated into the development workflow from the start, rather than being an afterthought.
sourceCode: https://github.com/JoaoTMDias/winpicker
liveDemo:
skills:
  - react
  - vitejs
  - electron
  - fluent-ui
  - windows-11
thumbnail: /projects/winpicker/project-icon.svg
cover: /projects/winpicker/winpicker-cover.jpeg
themeBackground: "#003C6D"
themeForeground: "#FFCACA"
---

## The Problem

I'm not a fanboy of any OS ecosystem. I've used all of them: from MacOS to several Linux distros, to several Windows versions as well.

At least for me, these are just tools, right?

Before my latest switch to Windows 11, I used to work every day with a little app for macOS called Pika. It enabled me to quickly pick two colours, get an instant contrast ratio score and let me know which WCAG levels it passed and which ones it failed. It was simple, did the job and had a native look and feel.

When switching to Windows, I went to the Microsoft Store and looked up the same type of app. There were some results, sure, but I didn't find any that did the same, with the same ease of use and native look and feel. I felt a little dissapointed.

On the browser-side, there are dozens of Chrome and Firefox extensions, but nothing really 'good' for the desktop and its user interface design guidelines.

Basically, I was searching for a small and specially dedicated app for web accessibility development and design.

If it was a good idea for me and it did the job, maybe it could also be good for others.

## The Solution

As usual, if the need exists but nothing is serving that, I pull up my 'coding sleeves' and do the work myself.

I've used React Native in the past, and I thought I could follow the same path and develop a native app for the operating system using React Native for Windows.

But, at the same time, I know my ways around a web application, how to make it accessible, and I wanted to prototype fast.

And besides, I've always wanted to try out building a native app with Electron JS and use its Node API to communicate between system-level APIs and the user interface (at the time, the Eyedropper API isn't correctly supported in Electron for Windows)

So I went with React and used Vite for bundling everything together. I find Vite to be super-duper easy to configure and freaking-fast!

I honestly dread every time I have to touch a webpack config file at work...All those loaders and plugin configurations. I mean, I still do it at work, but it's something that isn't as pleasurable as simple config files like the ones from Rollup or Vite.

As for the user interface, I build a couple of my own components, but mainly I used the ones made by Microsoft for the @fluentui/react package. It gives me the native look I want for the application so that users can feel at home with the interface.

Finally, the features of the app are all built around getting as much relevant information as fast as possible so when choosing two colours, you have a 5-star rating as well as a check/failed score for AA and AAA levels for large and regular font sizes.

The colour picker is an external .exe file that I load up using Node and Electron's ipcMain process. Once the colour is picked, I then make its results available to the UI using the ipcRenderer process.

