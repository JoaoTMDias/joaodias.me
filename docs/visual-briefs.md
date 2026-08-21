# Visual briefs for articles and case studies

Use the visual language of joaodias.me: tactile editorial texture, warm neutrals, black ink, restrained yellow accents, generous negative space and clear geometric forms. Generate at 3:2, at least 1800 × 1200 px, without embedded words, letters, UI labels or decorative text. Export the selected result to WebP after review.

## It's a Trap

### Cover — `public/blog/keyboard-trap-cover.webp`

Placement: article card and article header. Purpose: communicate keyboard focus becoming trapped without showing a literal prison.

Gemini prompt: “Editorial digital illustration for a web accessibility article. A luminous keyboard-focus ring follows a clean path through abstract interface controls, then loops tightly around one component while an open route remains visible outside. Warm paper texture, black ink, muted cream and one vivid yellow accent, sophisticated design-engineering magazine style, strong negative space, no text, no letters, no logos, no screenshots, 3:2 landscape.”

Alt EN: “A focus indicator loops inside one interface component while the rest of the page remains out of reach.”
Alt PT: “Um indicador de foco fica em ciclo dentro de um componente, deixando o resto da página fora de alcance.”

### Focus route diagram

Placement: after the comparison between WCAG 2.1.1 and 2.1.2. Prefer an accessible HTML/SVG diagram rather than a generated image. Show a linear route through controls, with entry and exit explicitly represented in surrounding text.

### Correct focus management versus trap

Placement: after the modal-dialog explanation. Create as HTML/CSS with two labelled examples so the labels remain real text.

### Keyboard test checklist

Placement: before the testing section. Create as a semantic HTML checklist; no raster image is needed.

## One Year of the EAA

### Cover — `public/blog/eaa-one-year-cover.webp`

Placement: article card and header.

Gemini prompt: “Editorial illustration about the first year after a major European accessibility law began applying. Interlocking pathways connect digital services, products and people with different access needs across an abstract map of Europe. Warm tactile paper texture, black ink, muted cream, deep blue and a restrained yellow accent, contemporary design-engineering publication, no flags, no text, no letters, no logos, 3:2 landscape.”

Alt EN: “Connected digital pathways spread across an abstract map of Europe and converge on accessible products and services.”
Alt PT: “Percursos digitais ligados atravessam um mapa abstrato da Europa e convergem em produtos e serviços acessíveis.”

### Timeline, standards relationship and team actions

Build these as semantic HTML: an ordered timeline; a nested relationship diagram linking the EAA, harmonised standards and WCAG; and a three-column action matrix for Design, Engineering and Product. Provide equivalent prose immediately before or after each visual.

## Case-study covers

Use one system across A11y Page Checker, JS Utilities and Merge Coverage: abstract interface fragments and technical artefacts rendered as tactile editorial compositions. Raider already has representative product imagery. Never fabricate product screenshots; generated covers must be visibly illustrative.

Suggested filenames:

- `public/work/a11y-page-checker/project-cover.webp`
- `public/work/js-utilities/project-cover.webp`
- `public/work/merge-coverage/project-cover.webp`

For each prompt, describe the real product mechanism (audit paths and findings; reusable typed building blocks; test reports merging into one output), retain the same palette and request no text or logos.

