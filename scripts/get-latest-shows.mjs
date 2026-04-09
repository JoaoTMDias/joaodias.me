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

/**
 * Convert a string to a URL-friendly slug
 */
function createSlug(str) {
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
async function isDirectoryEmpty(dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    return files.length === 0;
  } catch (err) {
    if (err.code === 'ENOENT') return true; // Directory doesn't exist
    throw err;
  }
}

/**
 * Check if cache is still fresh
 */
function isCacheFresh(timestamp) {
  const age = Date.now() - new Date(timestamp).getTime();
  return age < CACHE_DURATION;
}

/**
 * Verify network connectivity
 */
async function verifyConnectivity() {
  try {
    const response = await fetch(RUC_URL, { method: 'HEAD', timeout: 5000 });
    return response.ok;
  } catch (err) {
    console.warn('Network connectivity check failed:', err.message);
    return false;
  }
}

/**
 * Crawl the RUC website to extract episode data
 */
async function crawlEpisodes() {
  console.log(`Crawling ${RUC_URL}...`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(RUC_URL, { waitUntil: 'networkidle' });

    // Extract JSON data embedded in the Next.js page
    const episodes = await page.evaluate(() => {
      // Find the Next.js __NEXT_DATA__ script tag
      const script = document.querySelector('script[id="__NEXT_DATA__"]');
      if (!script) return [];

      try {
        const data = JSON.parse(script.textContent);
        const props = data.props?.pageProps;

        if (!props || !props.results) return [];

        // Flatten the results array (it contains nested arrays for each day)
        const allResults = Array.isArray(props.results)
          ? props.results.flat()
          : [];

        // Extract episodes from results
        const episodes = allResults.map((item) => {
          const show = item.podcastFields?.programasDePodcast?.[0];
          const showSlug = show?.slug || 'unknown';

          return {
            show: showSlug,
            title: item.title || '',
            slug: item.slug ? `https://ruc.pt/${item.slug}` : '',
            published: item.date || new Date().toISOString(),
            summary: item.contentType?.node?.name === 'podcast'
              ? `Episódio de ${show?.title || 'podcast'}`
              : '',
            cover: {
              url: item.featuredImage?.node?.sourceUrl || '',
              width: item.featuredImage?.node?.width || '',
              height: item.featuredImage?.node?.height || '',
              alt: item.featuredImage?.node?.altText || ''
            }
          };
        }).filter(ep => ep.title && ep.slug); // Only include items with title and slug

        return episodes;
      } catch (err) {
        console.error('Error parsing Next.js data:', err.message);
        return [];
      }
    });

    console.log(`Found ${episodes.length} episodes`);
    return episodes;
  } finally {
    await browser.close();
  }
}

/**
 * Parse episode data and organize by show
 */
function parseEpisodes(episodes) {
  const shows = {};

  episodes.forEach((episode) => {
    const showSlug = episode.show;

    if (!shows[showSlug]) {
      shows[showSlug] = [];
    }

    shows[showSlug].push({
      show: showSlug,
      slug: episode.slug,
      title: episode.title,
      summary: episode.summary,
      published: episode.published,
      cover: {
        url: episode.cover.url,
        width: episode.cover.width ? parseInt(episode.cover.width, 10) : null,
        height: episode.cover.height ? parseInt(episode.cover.height, 10) : null,
        alt: episode.cover.alt || ''
      }
    });
  });

  return shows;
}

/**
 * Generate shows.json file
 */
async function generateShowsJson(episodesByShow) {
  const allEpisodes = Object.values(episodesByShow).flat();

  const showsData = {
    latestUpdate: new Date().toISOString(),
    count: allEpisodes.length,
    items: allEpisodes.sort((a, b) => new Date(b.published) - new Date(a.published))
  };

  // Ensure data directory exists
  await fs.mkdir(dataDir, { recursive: true });

  // Write shows.json
  await fs.writeFile(
    showsJsonPath,
    JSON.stringify(showsData, null, 2)
  );

  console.log(`Generated shows.json with ${allEpisodes.length} episodes`);
  return showsData;
}

/**
 * Generate markdown files for each episode
 */
async function generateMarkdownFiles(showsData) {
  let filesCreated = 0;

  for (const episode of showsData.items) {
    const showSlug = episode.show;
    const publishedDate = new Date(episode.published).toISOString().split('T')[0];
    const sanitizedTitle = createSlug(episode.title).substring(0, 50);
    const fileName = `${showSlug}_${publishedDate}_${sanitizedTitle}.md`;

    const showFolder = path.join(showsDir, showSlug);
    const filePath = path.join(showFolder, fileName);

    // Check if file already exists
    try {
      await fs.access(filePath);
      console.log(`Skipping ${fileName} (already exists)`);
      continue;
    } catch {
      // File doesn't exist, proceed with creation
    }

    // Create show folder if it doesn't exist
    await fs.mkdir(showFolder, { recursive: true });

    // Prepare frontmatter
    const frontmatter = `---
show: ${showSlug}
slug: ${episode.slug}
title: ${episode.title}
summary: >-
  ${episode.summary.split('\n').join('\n  ')}
published: ${episode.published}
coverURL: ${episode.cover.url}
coverWidth: ${episode.cover.width || ''}
coverHeight: ${episode.cover.height || ''}
coverAlt: ${episode.cover.alt}
---
`;

    await fs.writeFile(filePath, frontmatter);
    filesCreated++;
    console.log(`Created ${fileName}`);
  }

  console.log(`Generated ${filesCreated} markdown files`);
}

/**
 * Load existing shows.json
 */
async function loadExistingShows() {
  try {
    const data = await fs.readFile(showsJsonPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('Get Latest Shows - Starting...\n');

    // Step 1: Health check
    console.log('Step 1: Health Check');
    const showsDirEmpty = await isDirectoryEmpty(showsDir);

    if (showsDirEmpty) {
      console.log('Shows directory is empty or does not exist. Will fetch new content.\n');
    } else {
      console.log('Shows directory has content. Checking cache freshness.\n');

      // Step 2: Lookup process - check cache freshness
      const existingShows = await loadExistingShows();

      if (existingShows && isCacheFresh(existingShows.latestUpdate)) {
        const ageHours = (Date.now() - new Date(existingShows.latestUpdate).getTime()) / (60 * 60 * 1000);
        console.log(`✓ Cache is fresh (${ageHours.toFixed(1)} hours old). Skipping update.\n`);
        return;
      }

      console.log('Cache is stale. Fetching new content.\n');
    }

    // Step 3: Content Query Process - verify connectivity
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

    // Step 4: Crawl episodes
    console.log('Step 3: Crawling Episodes');
    const episodes = await crawlEpisodes();
    console.log();

    if (episodes.length === 0) {
      console.warn('No episodes found. Exiting.');
      process.exit(1);
    }

    // Step 5: Parse and organize episodes
    const episodesByShow = parseEpisodes(episodes);

    // Step 6: Generate shows.json
    console.log('Step 4: Generating Data Files');
    const showsData = await generateShowsJson(episodesByShow);
    console.log();

    // Step 7: Generate markdown files
    console.log('Step 5: Generating Markdown Files');
    await generateMarkdownFiles(showsData);

    console.log('\n✓ Successfully completed!');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
