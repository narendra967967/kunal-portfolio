// Builds the default social-share image (1200x630) used by LinkedIn, X, Slack and WhatsApp previews.
// Run: node scripts/generate-og.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const W = 1200, H = 630;
const out = 'public/og/default.png';
mkdirSync('public/og', { recursive: true });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const font = "'IBM Plex Sans', 'Segoe UI', Arial, sans-serif";
const mono = "'IBM Plex Mono', Consolas, monospace";

const metrics = [['20M+', 'MONTHLY USERS'], ['+35%', 'INP GAIN'], ['+25%', 'SPRINT VELOCITY'], ['8+', 'NPM PACKAGES']];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="bg" cx="0.85" cy="0.1" r="1.1"><stop offset="0" stop-color="#5B5C4E"/><stop offset="1" stop-color="#231F20"/></radialGradient>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#ffffff" stroke-opacity="0.06"/></pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <circle cx="955" cy="300" r="205" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-dasharray="6 8"/>
  <g font-family="${mono}" font-size="20" fill="#E6CB7C" letter-spacing="3"><text x="72" y="96">STAFF / LEAD SOFTWARE ENGINEER</text></g>
  <g font-family="${font}" fill="#ffffff" font-weight="700">
    <text x="72" y="190" font-size="64">Kunal Prakash</text>
  </g>
  <g font-family="${font}" fill="#F3F2E6" font-size="29" font-weight="500">
    <text x="72" y="244">I build high-performance web ecosystems</text>
    <text x="72" y="284">that scale to 20M+ monthly users, without</text>
    <text x="72" y="324">sacrificing velocity or reliability.</text>
  </g>
  ${metrics.map(([v, l], i) => `
    <g transform="translate(${72 + i * 172}, 372)">
      <rect width="156" height="104" rx="14" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.18"/>
      <text x="16" y="50" font-family="${font}" font-weight="700" font-size="30" fill="#ffffff">${esc(v)}</text>
      <text x="16" y="80" font-family="${mono}" font-size="13" letter-spacing="1" fill="#E6CB7C">${esc(l)}</text>
    </g>`).join('')}
  <g font-family="${font}" font-size="22" fill="#DEDCC6"><text x="72" y="560">Tech Lead at HT Digital Streams (Livemint) · Next.js · Micro Frontends</text></g>
</svg>`;

const disc = await sharp('src/assets/profile/portrait.png').resize(380, 380).toBuffer();

await sharp(Buffer.from(svg)).composite([{ input: disc, left: 765, top: 110 }]).png({ compressionLevel: 9 }).toFile(out);
console.log('wrote', out);
