import { chromium } from 'playwright-core';
import fs from 'fs';
const BASE = 'https://petorosealcones.com';
const browser = await chromium.launch({ executablePath: '/usr/local/bin/google-chrome', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const assets = new Set();
const queue = ['/', '/products', '/about', '/contact'], seen = new Set(), out = {};
fs.mkdirSync('pages', { recursive: true }); fs.mkdirSync('shots', { recursive: true });
while (queue.length) {
  const p = queue.shift(); if (seen.has(p)) continue; seen.add(p);
  const page = await ctx.newPage();
  page.on('response', r => { const u = r.url(); if (/\.(png|jpe?g|webp|svg|gif|mp4|webm|pdf|ico|avif)(\?|$)/i.test(u)) assets.add(u); });
  const resp = await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => null);
  await page.waitForTimeout(1500);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } });
  await page.waitForTimeout(1000);
  const data = await page.evaluate(() => ({
    title: document.title, url: location.href,
    meta: [...document.querySelectorAll('meta')].map(m => ({ name: m.name || m.getAttribute('property'), content: m.content })).filter(m => m.name),
    text: document.body.innerText,
    links: [...document.querySelectorAll('a')].map(a => ({ href: a.href, text: a.innerText.trim() })),
    imgs: [...document.querySelectorAll('img')].map(i => ({ src: i.currentSrc || i.src, alt: i.alt })),
    videos: [...document.querySelectorAll('video, video source, iframe')].map(v => ({ tag: v.tagName, src: v.src || v.currentSrc })),
    bgs: [...document.querySelectorAll('*')].map(e => getComputedStyle(e).backgroundImage).filter(b => b && b !== 'none'),
  }));
  data.status = resp ? resp.status() : null;
  const key = p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '__');
  out[p] = data;
  fs.writeFileSync(`pages/${key}.txt`, data.text);
  fs.writeFileSync(`pages/${key}.html`, await page.content());
  await page.screenshot({ path: `shots/${key}.png`, fullPage: true });
  for (const l of data.links) {
    try {
      const u = new URL(l.href);
      if (u.host.endsWith('petorosealcones.com') && !/\.(pdf|png|jpe?g)$/i.test(u.pathname)) {
        const q = u.pathname.replace(/\/$/, '') || '/';
        if (!seen.has(q)) queue.push(q);
      }
    } catch { }
  }
  for (const b of data.bgs) { const m = b.match(/url\("?(.*?)"?\)/); if (m) assets.add(m[1]); }
  for (const i of data.imgs) if (i.src) assets.add(i.src);
  for (const v of data.videos) if (v.src) assets.add(v.src);
  await page.close();
}
fs.writeFileSync('crawl.json', JSON.stringify(out, null, 2));
fs.writeFileSync('assets.txt', [...assets].join('\n'));
console.log('pages', [...seen]); console.log('assets', assets.size);
await browser.close();
