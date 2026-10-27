# Arohi Nair — Field Notes

Static portfolio prototype. No dependencies or build step.

## Local preview

```sh
cd /Users/arohinair/Documents/Projects/landingpage
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000/ and refresh after edits. Stop with Ctrl+C.

## Content and code

- `index.html`: introduction, research, education, personal interests, metadata.
- `assets/js/portfolio/content.js`: original project destinations, six experience entries, Yale and MSU coursework.
- `assets/css/portfolio/style.css`: responsive Field Notes styling.
- `assets/js/portfolio/site.js`: portfolio content rendering.
- `assets/js/portfolio/angle-core.mjs`: programmatic geometry, generation, validation, and scoring.
- `assets/js/portfolio/angle-game.js`: Arc game UI and session state.

Checks: `node tests/angle.test.mjs`, `node tests/angle-ui.test.mjs`, and `python3 tests/check_preservation.py`.

## Arc

Independent angle game inspired by Angledle (https://angledle.com/how-to-play/). The reference uses integer angles 1–359, six attempts, temperature feedback, and higher/lower hints. Arc retains the two rays and marked angle, but follows the requested immediate-reveal format: one guess, answer and absolute error revealed, then unlimited new rounds. No daily mode, question bank, external service, or browser storage.

The clockwise arc identifies which of the two possible angles to estimate, including reflex angles. Both the orientation and angle are generated afresh; consecutive answers cannot repeat. A dashed ray shows the visitor's guess after submission. Score = max(0, round(100 × (1 − absolute error / 180))). Error is not circular: a 359° angle and a 1° angle have different marked arcs. Cumulative score lasts for the page session and resets on refresh.

The numeric angle is not included in the diagram's accessible description until reveal. The game relies on visual geometry; controls, feedback, and round progression support keyboard and screen-reader navigation.

## Privacy and publication

The MSU early coursework contains individual course grades on the transcript's numeric scale. No private transcript or résumé file is included. The CS & Economics thesis uses only the owner-approved high-level description; no proposal, internal notes, results, or private implementation materials are included.

All six original project links are retained. External destination availability can depend on permissions. Unused legacy template pages, scripts, styles, and images have been removed from the current site; their complete originals remain in the preservation tag.

Prepare changes locally on `fix/post-deployment-audit`. No push, merge, deployment, or CNAME/DNS/Pages changes without explicit approval.

## Personal and product updates

Edit `personal.book`, `personal.trip`, and `building` in `assets/js/portfolio/content.js` to update the reading/trip features and College Space copy. Supply photo dimensions and descriptive alt text when replacing an image. `images/guatemala-volcano.jpeg` is the owner-provided original photograph, displayed in a centered square frame using CSS; the original file is unchanged. `images/college-space-preview.png` is a screenshot of the unauthenticated public development homepage, containing no account or private data.

College Space is deliberately not linked: the repository is private, and the supplied Vercel URL is a development preview rather than an approved production destination. Public preview copy is the basis of the portfolio description: parking/storage near campuses, Ann Arbor catalog, demo listings, and no bookings or payments in that preview. Owner approval of the destination is needed before adding a public link. The other repository was inspected read-only and not changed.

Relevant past coursework appears in collapsed details; current coursework is omitted. Older projects have `displayTitle` for the summary while preserving `title` as the full formal title inside the expanded panel. Thesis illustrations are original conceptual diagrams, not research figures or evidence of results.

## Original website preservation

The original site is preserved only in Git history through the `pre-redesign` tag at `371e770fa7a5fa41cc9315b6eaf338368078abbb`. It is not hosted at a second website URL. See [recovery instructions](archive/README.md). Run `python3 tests/check_preservation.py` to verify recoverability.
