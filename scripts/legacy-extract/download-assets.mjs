// Download every asset the old site references into public/assets, and write a URL -> local path manifest.
import fs from 'fs';
import path from 'path';

const ROOT = process.argv[2];
const OUT = path.join(ROOT, 'public/assets');
const SITE = 'https://petorosealcones.com/';
const { mods, arrays } = JSON.parse(fs.readFileSync('bundle-arrays.json', 'utf8'));
const css = fs.readFileSync('main.css', 'utf8');
const js = fs.readFileSync('main.js', 'utf8');

const slug = s => s.toLowerCase().replace(/%20/g, '-').replace(/[^a-z0-9.]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
const stripHash = f => f.replace(/\.[0-9a-f]{20}(\.\w+)$/, '$1');

const jobs = new Map(); // url -> relative dest
function add(url, dir, name) { if (!jobs.has(url)) jobs.set(url, path.join(dir, name)); }

const mediaFiles = new Set([...js.matchAll(/"static\/media\/([^"]+)"/g)].map(m => m[1]));
for (const m of css.matchAll(/static\/media\/([^)"']+)/g)) mediaFiles.add(m[1]);
for (const f of mediaFiles) {
  const ext = path.extname(f).toLowerCase();
  const dir = ext === '.pdf' ? (f.includes('PAPL') ? 'certificates' : 'docs') : ext === '.mp4' ? 'video' : ext === '.ttf' ? 'fonts' : 'img/site';
  add(SITE + 'static/media/' + encodeURI(f), dir, slug(stripHash(f)));
}
for (const m of js.matchAll(/https:\/\/res\.cloudinary\.com\/[^"]+/g)) add(m[0], 'img/cloudinary', slug(path.basename(m[0])));
for (const u of ['https://mygardenlife.com/wp-content/uploads/2022/12/2888_13-2.jpg',
  'https://5.imimg.com/data5/SELLER/Default/2023/8/339305591/XX/JQ/LH/54770746/anethole-essential-oil-500x500.jpg',
  'https://shop.perfumersapprentice.com/images/product/large/9290.jpg'])
  add(u, 'img/third-party-about', slug(new URL(u).host + '-' + path.basename(u)));
add('https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/383px-Flag_of_India.svg.png', 'img/site', 'flag-of-india.png');
for (const f of ['favicon.ico', 'logo192.png', 'logo512.png', 'manifest.json']) add(SITE + f, 'site-meta', f);

const manifest = {};
for (const [url, rel] of jobs) {
  const dest = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (content migration)' } });
  const type = r.headers.get('content-type') || '';
  const buf = Buffer.from(await r.arrayBuffer());
  if (!r.ok || type.startsWith('text/html')) { manifest[url] = { error: `${r.status} ${type}` }; console.log('FAIL', r.status, type, url); continue; }
  fs.writeFileSync(dest, buf);
  manifest[url] = { path: '/assets/' + rel.split(path.sep).join('/'), bytes: buf.length, type };
}
// Inline (base64) webpack images
for (const [id, p] of Object.entries(mods)) if (p.startsWith('inline/')) {
  const rel = path.join('img/site', `inline-module-${id}${path.extname(p)}`);
  fs.copyFileSync(p, path.join(OUT, rel));
  manifest[`webpack-inline-module:${id}`] = { path: '/assets/' + rel.split(path.sep).join('/'), bytes: fs.statSync(p).size };
}
fs.writeFileSync('asset-manifest.json', JSON.stringify(manifest, null, 2));
console.log('downloaded', Object.values(manifest).filter(v => v.path).length, 'failed', Object.values(manifest).filter(v => v.error).length);
