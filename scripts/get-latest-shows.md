# Get Latest Shows

A script that fetches the latest radio show episodes from https://ruc.pt/autor/joaotmdias and generates markdown files for content management. It includes a caching mechanism to minimize redundant requests.

## Health Check

Starting point: Determine whether to fetch fresh data or use cached content.

1. **Check if `src/content/shows` directory exists**
   - Does not exist → Execute Content Query Process
   - Exists but empty → Execute Content Query Process
   - Exists with content → Execute Lookup Process

## Lookup Process

Verify freshness of cached data using metadata from `shows.json`.

- **Less than 12 hours since last update** → Reuse existing files
- **12+ hours since last update** → Execute Content Query Process

## Content Query Process

### Prerequisites

Before fetching new content:

- Verify network connectivity (ping https://ruc.pt/autor/joaotmdias)
- If offline: Use fallback content (cached if available, otherwise show error message)
- If online: Proceed to Crawling Process

## Crawling Process

Use Playwright or Cheerio to scrape episode data from https://ruc.pt/autor/joaotmdias.

### Data to Extract

For each episode, collect:

- Show name
- Episode title
- Episode URL/slug
- Publication date (ISO 8601 format)
- Cover image (URL, width, height, alt text)
- Episode summary/description

### Output Format

Generate `shows.json` with this structure:

```json
{
  "latestUpdate": "2025-04-06T14:30:00Z",
  "count": 5,
  "items": [
    {
      "show": "mel-e-tal",
      "slug": "https://ruc.pt/podcast/mel-e-tal/01-de-dezembro-lancamentos-de-novembro-de-2025",
      "title": "01 de Dezembro, Lançamentos de Novembro de 2025",
      "summary": "Neste episódio, eu e o Ricardo dissecámos os melhores lançamentos no metal durante o décimo mês do ano",
      "published": "2025-11-03T00:00:00.000Z",
      "cover": {
        "url": "https://ruc.pt/podcast/mel-e-tal/mel-e-tal-03-nov-2025-post.webp",
        "width": 1200,
        "height": 630,
        "alt": "Mel e Tal - 03 de Novembro de 2025"
      }
    }
  ]
}
```

**Field specifications:**

- `latestUpdate`: ISO 8601 timestamp when the data was fetched
- `count`: Total number of episodes in the items array
- `show`: URL-friendly slug of the show name (lowercase, hyphens for spaces/special chars)
- `slug`: Full episode URL from ruc.pt
- `title`: Complete episode title as displayed
- `summary`: Episode description from the page (preserves formatting)
- `published`: ISO 8601 timestamp of publication
- `cover.width` & `cover.height`: Numeric values (not strings)
- `cover.alt`: Descriptive text; defaults to empty string if not available

## Content Generation

After fetching and storing data, generate individual markdown files for each episode.

### For Each Episode

1. **Create/use show folder**

   - Folder location: `src/content/shows/<show-slug>/`
   - Naming convention: Convert show name to slug (lowercase, replace accents, spaces → hyphens)
   - Example: "Mel e Tal" → `mel-e-tal`

2. **Create markdown file**

   - Naming: `<show-slug>_<published-date>_<sanitized-title>.md`
   - Example: `mel-e-tal_2025-11-03_01-de-dezembro.md`
   - Sanitize title: lowercase, remove accents, replace non-alphanumeric chars with hyphens

3. **File content (YAML frontmatter)**

```yaml
---
show: mel-e-tal
slug: https://ruc.pt/podcast/mel-e-tal/01-de-dezembro-lancamentos-de-novembro-de-2025
title: 01 de Dezembro, Lançamentos de Novembro de 2025
summary: >-
  Neste episódio, eu e o Ricardo dissecámos os melhores lançamentos no metal durante o décimo mês do ano
published: 2025-11-03T00:00:00Z
coverURL: https://ruc.pt/podcast/mel-e-tal/mel-e-tal-03-nov-2025-post.webp
coverWidth: 1200
coverHeight: 630
coverAlt: Mel e Tal - 03 de Novembro de 2025
---
```

### Notes

- If a file for the same episode already exists, skip (avoid duplicates)
- Use numeric values for `coverWidth` and `coverHeight`, not strings
- Preserve original markdown formatting in `summary` field
- Use `>-` for multi-line YAML strings to fold whitespace appropriately
