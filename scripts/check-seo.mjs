// Post-build SEO checks for every HTML page in dist/: one <h1>, title/description length, canonical,
// valid JSON-LD, and internal links that resolve to a built file.
// Run after a build: node scripts/check-seo.mjs
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BASE = (process.env.BASE_PATH ?? '/').replace(/\/$/, '');
const pages = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push(p);
  }
})('dist');

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
let problems = 0;
const warn = (page, msg) => { problems++; console.log(`✗ ${page}: ${msg}`); };

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const page = file.replace(/\\/g, '/').replace('dist', '') || '/';
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (!title) warn(page, 'missing <title>'); else if (title.length > 65) warn(page, `title ${title.length} chars: ${title}`);
  if (!desc) warn(page, 'missing description'); else if (desc.length > 160) warn(page, `description ${desc.length} chars`);
  if (h1s !== 1) warn(page, `${h1s} <h1> elements`);
  if (!/<link rel="canonical"/.test(html)) warn(page, 'missing canonical');
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { warn(page, `invalid JSON-LD: ${e.message}`); }
  }
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const url = m[1];
    if (!url.startsWith(BASE)) { warn(page, `link without base path: ${url}`); continue; }
    const rel = url.slice(BASE.length) || '/';
    const target = join('dist', rel);
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    if (!ok) warn(page, `broken link: ${url}`);
  }
  console.log(`✓ ${page.padEnd(44)} ${String(title.length).padStart(3)}ch title · ${String(desc.length).padStart(3)}ch desc · h1×${h1s}`);
}
console.log(problems ? `\n${problems} problem(s)` : '\nAll SEO checks passed');
process.exit(problems ? 1 : 0);
