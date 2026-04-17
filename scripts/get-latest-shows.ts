import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const showsDir = path.join(projectRoot, 'src', 'content', 'shows');
const showsJsonPath = path.join(projectRoot, 'scripts', 'src', 'data', 'shows.json');
const dataDir = path.dirname(showsJsonPath);

const RUC_URL = 'https://ruc.pt/autor/joaotmdias';
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RawEpisodeCover {
  url: string;
  width: string;
  height: string;
  alt: string;
}

interface RawEpisode {
  show: string;
  title: string;
  slug: string;
  published: string;
  summary: string;
  cover: RawEpisodeCover;
}

interface EpisodeCover {
  url: string;
  width: number | null;
  height: number | null;
  alt: string;
}

interface Episode {
  show: string;
  title: string;
  slug: string;
  published: string;
  summary: string;
  cover: EpisodeCover;
}

interface ShowsData {
  latestUpdate: string;
  count: number;
  items: Episode[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Wrap a YAML string value in double quotes if it contains characters that
 * would otherwise break YAML parsing (e.g. ": " mapping indicators).
 */
function yamlString(value: string | null | undefined): string {
  if (value === null || value === undefined || value === '') return "''";
  const str = String(value);
  const YAML_SCALARS = /^(true|false|yes|no|on|off|null|~)$/i;
  if (YAML_SCALARS.test(str) || /: |^[&*!|>{'"#%@`]|[\n\r]/.test(str)) {
    return `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  return str;
}

/**
 * Convert a string to a URL-friendly slug
 */
function createSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD') // Decompose accents
    .replace(/[\u0300-\u036f]/g, '') // Remove accent marks
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Check if directory is empty
 */
async function isDirectoryEmpty(dirPath: string): Promise<boolean> {
  try {
    const files = await fs.readdir(dirPath);
    return files.length === 0;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return true;
    throw err;
  }
}

/**
 * Check if cache is still fresh
 */
function isCacheFresh(timestamp: string): boolean {
  const age = Date.now() - new Date(timestamp).getTime();
  return age < CACHE_DURATION;
}

/**
 * Verify network connectivity
 */
async function verifyConnectivity(): Promise<boolean> {
  try {
    await fetch(RUC_URL, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
    return true;
  } catch {
    console.warn('Network connectivity check failed');
    return false;
  }
}

// ---------------------------------------------------------------------------
// Core logic
// ---------------------------------------------------------------------------

/**
 * Crawl the RUC website to extract episode data
 */
async function crawlEpisodes(): Promise<RawEpisode[]> {
  console.log(`Crawling ${RUC_URL}...`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(RUC_URL, { waitUntil: 'networkidle', timeout: 20000 });

    // Step 1: extract episode URLs from __NEXT_DATA__ on the author page
    const episodeUrls = await page.evaluate((): string[] => {
      const script = document.querySelector<HTMLScriptElement>('script[id="__NEXT_DATA__"]');
      if (!script) return [];
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = JSON.parse(script.textContent ?? '') as any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allResults: any[] = Array.isArray(data.props?.pageProps?.results)
          ? data.props.pageProps.results.flat()
          : [];
        return allResults
          .filter((item) => item.slug && item.podcastFields?.programasDePodcast?.[0]?.slug)
          .map((item) => {
            const showSlug: string = item.podcastFields.programasDePodcast[0].slug;
            return `https://ruc.pt/podcast/${showSlug}/${item.slug}`;
          });
      } catch {
        return [];
      }
    });

    console.log(`Found ${episodeUrls.length} episode URLs`);

    // Step 2: visit each episode page in isolated contexts and extract all data from __NEXT_DATA__
    const CONCURRENCY = 5;
    const workerContexts = await Promise.all(
      Array.from({ length: CONCURRENCY }, () => browser.newContext())
    );
    const workerPages = await Promise.all(workerContexts.map((ctx) => ctx.newPage()));

    const fetchEpisode = async (url: string, workerPage: Awaited<ReturnType<typeof browser.newPage>>): Promise<RawEpisode | null> => {
      try {
        await workerPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        return await workerPage.evaluate((episodeUrl): RawEpisode | null => {
          const script = document.querySelector<HTMLScriptElement>('script[id="__NEXT_DATA__"]');
          if (!script) return null;
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = JSON.parse(script.textContent ?? '') as any;
            const podcast = data.props?.pageProps?.podcast;
            if (!podcast) return null;
            const showSlug: string = data.props?.pageProps?.programSlug || 'unknown';
            const rawExcerpt: string = podcast.excerpt ?? '';
            const rawText = rawExcerpt.replace(/<[^>]*>/gm, '').trim();
            const div = document.createElement('div');
            div.innerHTML = rawText;
            const decoded = div.textContent ?? rawText;
            return {
              show: showSlug,
              title: podcast.title || '',
              slug: podcast.slug || '',
              published: podcast.date || new Date().toISOString(),
              summary: decoded.trim(),
              cover: {
                url: podcast.featuredImage?.node?.sourceUrl || '',
                width: podcast.featuredImage?.node?.width || '',
                height: podcast.featuredImage?.node?.height || '',
                alt: podcast.featuredImage?.node?.altText || '',
              },
            };
          } catch {
            return null;
          }
        }, url);
      } catch {
        console.warn(`Could not fetch episode: ${url}`);
        return null;
      }
    };

    const episodes: RawEpisode[] = [];
    for (let i = 0; i < episodeUrls.length; i += CONCURRENCY) {
      const batch = episodeUrls.slice(i, i + CONCURRENCY);
      const results = await Promise.all(
        batch.map((url, idx) => fetchEpisode(url, workerPages[idx]))
      );
      episodes.push(...results.filter((ep): ep is RawEpisode => ep !== null));
      console.log(`Fetched episodes ${Math.min(i + CONCURRENCY, episodeUrls.length)}/${episodeUrls.length}`);
    }

    await Promise.all(workerContexts.map((ctx) => ctx.close()));

    console.log(`Successfully fetched ${episodes.length} episodes`);
    return episodes;
  } finally {
    await browser.close();
  }
}

/**
 * Parse raw episode data, normalising cover dimensions to numbers
 */
function parseEpisodes(episodes: RawEpisode[]): Episode[] {
  return episodes.map((episode) => ({
    show: episode.show,
    slug: episode.slug,
    title: episode.title,
    summary: episode.summary || 'Sem descrição disponível.', // Simple fallback
    published: episode.published,
    cover: {
      url: episode.cover.url,
      width: episode.cover.width ? parseInt(episode.cover.width, 10) : null,
      height: episode.cover.height ? parseInt(episode.cover.height, 10) : null,
      alt: episode.cover.alt || ''
    }
  }));
}

/**
 * Generate shows.json file
 */
async function generateShowsJson(episodes: Episode[]): Promise<ShowsData> {
  const showsData: ShowsData = {
    latestUpdate: new Date().toISOString(),
    count: episodes.length,
    items: episodes
      .slice()
      .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
  };

  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(showsJsonPath, JSON.stringify(showsData, null, 2));

  console.log(`Generated shows.json with ${episodes.length} episodes`);
  return showsData;
}

/**
 * Generate markdown files for each episode
 */
async function generateMarkdownFiles(showsData: ShowsData): Promise<void> {
  const CONCURRENCY = 10;

  const writeEpisode = async (episode: Episode): Promise<boolean> => {
    const showSlug = episode.show;

    if (!/^[\w-]+$/.test(showSlug)) {
      throw new Error(`Invalid show slug: ${showSlug}`);
    }

    const publishedDate = new Date(episode.published).toISOString().split('T')[0];
    const sanitizedTitle = createSlug(episode.title).substring(0, 50);
    const fileName = `${showSlug}_${publishedDate}_${sanitizedTitle}.md`;

    const showFolder = path.join(showsDir, showSlug);
    const filePath = path.join(showFolder, fileName);

    try {
      await fs.access(filePath);
      console.log(`Skipping ${fileName} (already exists)`);
      return false;
    } catch {
      // File doesn't exist, proceed with creation
    }

    await fs.mkdir(showFolder, { recursive: true });

    const frontmatter = `---
show: ${showSlug}
slug: ${episode.slug}
title: ${yamlString(episode.title)}
summary: >-
  ${episode.summary.split('\n').join('\n  ')}
published: ${episode.published}
coverURL: ${episode.cover.url}
coverWidth: ${episode.cover.width ?? ''}
coverHeight: ${episode.cover.height ?? ''}
coverAlt: ${yamlString(episode.cover.alt)}
---
`;

    await fs.writeFile(filePath, frontmatter);
    console.log(`Created ${fileName}`);
    return true;
  };

  let filesCreated = 0;
  for (let i = 0; i < showsData.items.length; i += CONCURRENCY) {
    const batch = showsData.items.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map(writeEpisode));
    filesCreated += results.filter(Boolean).length;
  }

  console.log(`Generated ${filesCreated} markdown files`);
}

/**
 * Load existing shows.json
 */
async function loadExistingShows(): Promise<ShowsData | null> {
  try {
    const data = await fs.readFile(showsJsonPath, 'utf-8');
    return JSON.parse(data) as ShowsData;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  try {
    console.log('Get Latest Shows - Starting...\n');

    // Step 1: Health check
    console.log('Step 1: Health Check');
    const showsDirEmpty = await isDirectoryEmpty(showsDir);

    if (showsDirEmpty) {
      console.log('Shows directory is empty or does not exist. Will fetch new content.\n');
    } else {
      console.log('Shows directory has content. Checking cache freshness.\n');

      const existingShows = await loadExistingShows();

      if (existingShows && isCacheFresh(existingShows.latestUpdate)) {
        const ageHours =
          (Date.now() - new Date(existingShows.latestUpdate).getTime()) / (60 * 60 * 1000);
        console.log(`✓ Cache is fresh (${ageHours.toFixed(1)} hours old). Skipping update.\n`);
        return;
      }

      console.log('Cache is stale. Fetching new content.\n');
    }

    // Step 2: Verify connectivity
    console.log('Step 2: Verifying Network Connectivity');
    const isOnline = await verifyConnectivity();

    if (!isOnline) {
      const existingShows = await loadExistingShows();
      if (existingShows) {
        console.log('⚠ Offline. Using cached content.\n');
        await generateMarkdownFiles(existingShows);
        return;
      } else {
        console.error('✗ Offline and no cached content available.');
        process.exit(1);
      }
    }

    console.log('✓ Online. Proceeding with crawl.\n');

    // Step 3: Crawl episodes
    console.log('Step 3: Crawling Episodes');
    const rawEpisodes = await crawlEpisodes();
    console.log();

    if (rawEpisodes.length === 0) {
      console.warn('No episodes found. Exiting.');
      process.exit(1);
    }

    // Step 4: Generate data files
    const parsedEpisodes = parseEpisodes(rawEpisodes);
    console.log('Step 4: Generating Data Files');
    const showsData = await generateShowsJson(parsedEpisodes);
    console.log();

    // Step 5: Generate markdown files
    console.log('Step 5: Generating Markdown Files');
    await generateMarkdownFiles(showsData);

    console.log('\n✓ Successfully completed!');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
