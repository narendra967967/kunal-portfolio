// Reports gzipped JS/CSS sizes in dist/ against the performance budget in docs/PLAN.md.
// Run after a build: node scripts/size-report.mjs
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const dir = 'dist/_astro';
const rows = readdirSync(dir)
  .filter((f) => /\.(js|css)$/.test(f))
  .map((f) => {
    const buf = readFileSync(join(dir, f));
    return { file: f, raw: statSync(join(dir, f)).size, gz: gzipSync(buf).length };
  })
  .sort((a, b) => b.gz - a.gz);

const kb = (n) => (n / 1024).toFixed(1).padStart(7) + ' KB';
for (const r of rows) console.log(kb(r.gz), 'gz', kb(r.raw), 'raw ', r.file);
const js = rows.filter((r) => r.file.endsWith('.js')).reduce((n, r) => n + r.gz, 0);
const css = rows.filter((r) => r.file.endsWith('.css')).reduce((n, r) => n + r.gz, 0);
console.log(`\nAll JS (gz): ${kb(js)}  ·  budget: home ≤ 90 KB`);
console.log(`All CSS (gz): ${kb(css)}`);
