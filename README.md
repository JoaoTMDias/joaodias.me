# joaodias.me

My personal website built with Astro and React.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server (with TinaCMS)
npm run dev

# Start development server (Astro only)
npm start

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

This project uses Playwright for end-to-end testing with accessibility checks via axe-core.

```bash
# Run Playwright tests (headless)
npm test

# Run Playwright tests with UI
npm run test:ui

# Run Playwright tests (headless, explicit)
npm run test:headless

# Open Playwright test UI (alias for test:ui)
npm run test:open
```

## 📝 Scripts

### Development

- `npm run dev` - Start development server with TinaCMS
- `npm start` - Start Astro development server only
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality

- `npm run lint` - Lint code with Biome (auto-fix)
- `npm run format` - Format code with Biome
- `npm run typecheck` - Type check TypeScript without emitting files

### Testing

- `npm test` - Run Playwright end-to-end tests (headless)
- `npm run test:ui` - Run Playwright tests with UI
- `npm run test:headless` - Run Playwright tests (headless, explicit)
- `npm run test:open` - Open Playwright test UI (alias for test:ui)

## 🛠️ Tech Stack

### Core

- [Astro](https://astro.build) - Static site generator
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [React](https://react.dev) - UI components

### Styling

- [SASS](https://sass-lang.com/) - CSS preprocessing

### Content Management

- [TinaCMS](https://tina.io/) - Git-based CMS

### Code Quality

- [Biome](https://biomejs.dev/) - Linting and formatting
- [Playwright](https://playwright.dev) - End-to-end testing
- [axe-core](https://github.com/dequelabs/axe-core) - Accessibility testing

### Build & Deploy

- [Astro Sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) - Sitemap generation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
