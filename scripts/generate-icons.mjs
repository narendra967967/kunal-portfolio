// Builds the favicon set: a KP monogram in the site's gold and charcoal. A photo isn't readable at 16px.
// Also writes public/profile-512.png, the portrait used in the JSON-LD Person image.
// Run: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const GOLD = '#DBBC62', CHARCOAL = '#231F20';
const font = "'Segoe UI', Arial, Helvetica, sans-serif";

// Small sizes drop the ring and use heavier, larger letters so they stay readable.
const monogram = (size, { square = false } = {}) => {
  const small = size <= 48;
  const bg = square
    ? `<rect width="512" height="512" fill="${CHARCOAL}"/>`
    : `<circle cx="256" cy="256" r="256" fill="${CHARCOAL}"/>`;
  const ring = small ? '' : `<circle cx="256" cy="256" r="222" fill="none" stroke="${GOLD}" stroke-width="16"/>`;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
    ${bg}${ring}
    <text x="256" y="${small ? 352 : 334}" text-anchor="middle" font-family="${font}" font-weight="700" font-size="${small ? 280 : 216}" letter-spacing="${small ? -14 : -4}" fill="${GOLD}">KP</text>
  </svg>`);
};

const render = (size, opts) => sharp(monogram(size, opts)).png({ compressionLevel: 9 }).toBuffer();

for (const [name, size] of [['favicon-16.png', 16], ['favicon-32.png', 32], ['favicon-48.png', 48], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  writeFileSync(`public/${name}`, await render(size));
}
writeFileSync('public/apple-touch-icon.png', await render(180, { square: true }));

// favicon.ico holding 16, 32 and 48 px PNGs.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => render(s)));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const at = 6 + 16 * i;
  header[at] = s; header[at + 1] = s;
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(pngs[i].length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += pngs[i].length;
});
writeFileSync('public/favicon.ico', Buffer.concat([header, ...pngs]));

await sharp('src/assets/profile/portrait.png').resize(512, 512).png({ compressionLevel: 9 }).toFile('public/profile-512.png');
console.log('wrote favicon set and profile-512.png');
