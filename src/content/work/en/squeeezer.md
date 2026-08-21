---
locale: en
translationKey: squeeezer
title: Squeeezer
slug: squeeezer
date: 2026-08-20T00:00:00.000Z
shortDescription: A privacy-first PWA that compresses images, SVGs, PDFs and MP4 videos entirely in the browser.
description: A browser-only file compressor that uses Web Workers and WebAssembly to keep demanding processing responsive and personal files on the user's device.
role: Product designer, architect and engineer
problem: Everyday file-size limits pushed people towards questionable upload-based tools, even when their images and documents were personal or sensitive.
impact: Squeeezer provides one installable, bilingual interface for compressing common file formats without accounts, uploads or a backend.
sourceCode: https://github.com/JoaoTMDias/Squeeezer
liveDemo: https://squeeezer.netlify.app/
skills:
  - react
  - typescript
  - vite
  - pwa
  - web-workers
  - webassembly
  - ffmpeg
  - playwright
thumbnail: /work/squeeezer/project-icon.svg
cover: /work/squeeezer/project-cover.webp
coverAlt: Squeeezer logo over a blurred view of the browser-based file compression interface.
galleryImages:
  - image: /work/squeeezer/empty-dropzone.webp
    alt: Squeeezer desktop application with an empty dropzone and its supported file formats.
    caption: Files can be dropped onto the interface or selected with the native picker, and remain in the browser throughout processing.
    width: 1179
    height: 732
  - image: /work/squeeezer/compression-controls.webp
    alt: Squeeezer compression controls showing presets and SVG optimization options.
    caption: Optional controls balance output size and quality while preserving SVG metadata and accessibility information by default.
    width: 1147
    height: 682
  - image: /work/squeeezer/completed-results.webp
    alt: Squeeezer queue with four completed files, their compressed sizes and percentage savings.
    caption: Each result retains its own progress, size comparison and download action within a single processing queue.
    width: 1140
    height: 658
  - image: /work/squeeezer/portuguese-view.webp
    alt: Squeeezer interface in European Portuguese with the language selector open.
    caption: The complete interface is available in English and European Portuguese, with localized status messages and number formatting.
    width: 1186
    height: 711
  - image: /work/squeeezer/pwa-installation.webp
    alt: Browser installation prompt for adding Squeeezer as a progressive web application.
    caption: Squeeezer can be installed from a supported browser while retaining the same local, backend-free architecture.
    width: 1066
    height: 737
themeBackground: "#0F172A"
themeForeground: "#38BDF8"
---

## Context

Squeeezer began with a problem close to home. My father regularly asked me to compress images and PDFs, while my wife, who is a lawyer, often encountered strict upload limits on legal forms. The available online tools usually asked them to send personal files to an unfamiliar server before getting a smaller version back.

I wanted a simpler answer: open a web app, choose a file and compress it without that file ever leaving the device. The result needed to work for everyday tasks while remaining useful to developers and designers optimizing images or SVG assets.

## Process and decisions

I designed Squeeezer as a progressive web app because I wanted to test how far the modern web platform could carry a computationally demanding product. It requires no account, backend or desktop wrapper. Once loaded, the browser provides the interface, local file access, processing environment and downloadable result.

JPEG, PNG and WebP compression use browser-focused jSquash codecs. SVG files are validated before and after SVGO optimization, with controls for preserving metadata and accessibility information. PDF processing removes metadata and rewrites document structure with compact object streams, while deliberately avoiding lossy image rasterization. MP4 compression runs FFmpeg compiled to WebAssembly directly in the browser.

Bringing those engines together was the central engineering challenge. Each has different loading, memory and output requirements, and video processing can be especially demanding. I moved the work into a dedicated Web Worker so decoding, compression and transcoding do not block the interface. Input and output `ArrayBuffer` objects are transferred between threads instead of copied, and temporary Blob URLs are revoked when results leave the queue.

## Product and accessibility

The interface supports drag and drop or a native file picker, optional quality and dimension controls, per-file progress, size comparisons and direct downloads. It is available in English and European Portuguese and can be installed as a PWA.

Compression progress and completion are announced through an `aria-live` region. The interface provides skip links, visible focus, semantic controls and reduced-motion alternatives. I tested the complete experience manually with a keyboard and NVDA, alongside component tests, automated accessibility checks and Playwright coverage of the production compression workflow.

Privacy is an architectural constraint rather than a promise added to the interface. File bytes stay in the browser, codec assets are served with the application, and there is no upload endpoint or analytics pipeline receiving the content.

## Result

I launched the first stable version of Squeeezer on 20 August 2026. It compresses JPEG, PNG, WebP, SVG, PDF and MP4 files through one responsive queue, showing the original size, compressed result and percentage saved before download.

The next steps are moving the app to its own domain and refining the file-handling experience. I am also investigating whether browsers can safely support overwriting a selected source file; if the platform cannot provide that capability consistently, it may become a reason to explore a small native wrapper such as Tauri.

## Learning

WebAssembly makes ambitious browser tools possible, but the technology alone is not the product. Workers, memory ownership, honest format limitations and a clear privacy boundary are what turn several powerful codecs into something people can trust with their files.
