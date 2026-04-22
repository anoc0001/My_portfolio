# Copilot Instructions for My_portfolio

This repo is a static portfolio site built with pure HTML, CSS, and JavaScript. There is no Node.js build process, package manager, or test harness in the repository.

## What this project is

- A multi-page personal portfolio website with pages such as `index.html`, `about.html`, `resume.html`, and project landing pages like `graphics.html`.
- Styling is centralized in `style.css` and separate CSS files for page-specific layouts like `floralshop.css`, `flower-catalog.css`, and `giftofchoice.css`.
- JavaScript is mostly in `script.js`, which handles page interactions, animations, and the project modal on `index.html`.

## Key patterns and conventions

- `index.html` contains the main hero section, project cards, and a modal for project details.
- `script.js` is the single source of dynamic behavior for the homepage:
  - `changeWord()` updates the dynamic hero text.
  - mobile nav toggling is attached to `#mobile-menu` and `#nav-menu`.
  - GSAP + ScrollTrigger drive scroll-based animations for `.quote`, `.playful-title`, and `.work-with-me-container`.
  - Project modal data is stored in the `projectData` object and displayed through `openProject(projectId)`.
- The modal is controlled with `projectModal`, `openProject()`, `closeModal()`, and a click-outside listener.
- The page uses both absolute and relative image paths, e.g. `/images/Untitled (600 x 800 px) (2).jpg` and `./images/ux.jpg`; maintain correct path semantics when editing pages.

## Important files

- `index.html` — homepage layout, navigation, hero, project cards, contact section.
- `script.js` — interactive behavior, animations, modal logic, and `window.openProject`/`window.closeModal` globals.
- `style.css` — main theme styling, layout, responsive rules, and page-level design language.
- `README.md` — project description is intentionally minimal.

## What to preserve

- Keep the static HTML/CSS/JS approach; avoid introducing unnecessary build tools unless adding a new workflow is explicitly requested.
- Preserve the existing page structure and file naming conventions.
- Do not assume React, Vue, or any framework is used.

## Suggested agent workflow

1. Read `index.html`, `script.js`, and `style.css` first.
2. Confirm page-specific styles in `floralshop.css`, `flower-catalog.css`, `giftofchoice.css`, and other individual CSS files before editing those page layouts.
3. For new interactive behavior, add it to `script.js` and ensure query selectors match the IDs/classes used in the HTML.
4. When editing image references, check whether paths should be absolute (`/images/...`) or relative (`./images/...`).

## No build or test commands

- There is no build script, `package.json`, or automated test suite.
- The primary development workflow is browser-based preview of static files.
- For debugging, use browser DevTools and the console messages already present in `script.js`.

If any part of this project structure is unclear, let me know and I can refine the guidance further.
