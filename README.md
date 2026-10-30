# Kunal Prakash · Portfolio

Personal portfolio website of a Staff / Lead Software Engineer. Built with [Astro](https://astro.build), fully static.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `http://localhost:4321/` |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run check` | Type and template checks |
| `npm run check:seo` | After a build: titles, descriptions, one `<h1>`, canonical, JSON-LD and internal links on every page |
| `npm run size` | After a build: gzipped JS/CSS sizes against the performance budget |
| `npm run og` | Regenerate the social share image `public/og/default.png` |
| `npm run icons` | Regenerate the favicon set and `public/profile-512.png` |

### Resume PDF

The download is `public/Kunal-Prakash-Resume.pdf`, a print of the web `/resume/` page, whose text lives in `src/data/resume.ts`.
To update it, replace that file (or add a new one and change `resumePdfFile` in `src/data/resume.ts`).

## Where things live

| Path | Contents |
|---|---|
| `src/data/profile.ts` | **Single source of truth**: every fact, number, role, skill and tool |
| `src/content/work/*.md` | Case studies |
| `src/components/` | Page sections: Hero, Dashboard, Toolkit, Pipeline, ReleaseHistory, ContactCTA ... |
| `src/styles/global.css` | Design tokens (light default, dark via `data-mode`) and shared styles |
| `src/scripts/` | `site.ts` (theme, menu, filters, tabs, copy), `motion.ts` (GSAP, home only), `estate.ts` (network canvas) |
| `src/pages/*.ts` | `robots.txt`, `llms.txt`, `llms-full.txt`, `resume.json` and the Markdown twin of every page |
| `src/assets/profile/` | Profile photo (optimised at build time) |
| `public/` | Favicons, web manifest, OG image, resume PDF |

## Hosting and deploy

Not set up yet: `.github/workflows/deploy.yml` is paused until the domain and server path are chosen.
