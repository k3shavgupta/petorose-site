// Merge website bundle data + catalogue PDF data into content/products.json (and related files).
import fs from 'fs';
import path from 'path';

const ROOT = process.argv[2];
const { arrays } = JSON.parse(fs.readFileSync('bundle-arrays.json', 'utf8'));
const pdf = JSON.parse(fs.readFileSync('pdf-products.json', 'utf8'));
const assets = JSON.parse(fs.readFileSync('asset-manifest.json', 'utf8'));
const SITE = 'https://petorosealcones.com/';

const ws = s => (s ?? '').replace(/\s+/g, ' ').trim();
const local = v => {
  if (!v) return null;
  if (typeof v === 'string') return assets[v]?.path ?? (v.startsWith('http') ? null : `BROKEN: ${v}`);
  if (v.asset) {
    if (v.asset.startsWith('inline/')) return assets[`webpack-inline-module:${v.asset.match(/module-(\d+)/)[1]}`]?.path;
    return assets[SITE + encodeURI(v.asset)]?.path;
  }
  return null;
};
const SITE_BADGES = {
  'gy4i7lump878c1yzkxdu.png': { foodGrade: null, kosher: null, gmo: false },
  'qerwn1cfznigehdemmvg.png': { foodGrade: true, kosher: true, gmo: false },
  'sghelk9uh5ljsxfsr014.png': { foodGrade: true, kosher: null, gmo: false },
};
// Minified variable names used for badge URLs, resolved from the bundle (e.g. xr="...qerwn1cfznigehdemmvg.png").
const BADGE_REFS = {
  xr: 'https://res.cloudinary.com/dwevw3pnz/image/upload/v1696659657/petrose%20files/qerwn1cfznigehdemmvg.png',
  Dr: 'https://res.cloudinary.com/dwevw3pnz/image/upload/v1696659657/petrose%20files/qerwn1cfznigehdemmvg.png',
  Er: 'https://res.cloudinary.com/dwevw3pnz/image/upload/v1696659657/petrose%20files/sghelk9uh5ljsxfsr014.png',
  Ur: 'https://res.cloudinary.com/dwevw3pnz/image/upload/v1696659657/petrose%20files/sghelk9uh5ljsxfsr014.png',
  wr: 'https://res.cloudinary.com/dwevw3pnz/image/upload/v1696659656/petrose%20files/gy4i7lump878c1yzkxdu.png',
  Mr: 'https://res.cloudinary.com/dwevw3pnz/image/upload/v1696659656/petrose%20files/gy4i7lump878c1yzkxdu.png',
};
function siteBadges(fg) {
  if (fg && typeof fg === 'object' && fg.ref) fg = BADGE_REFS[fg.ref];
  if (fg === '' || fg == null) return { shown: false };
  if (typeof fg === 'string' && fg.startsWith('..')) return { shown: false, brokenImage: fg };
  const key = path.basename(fg);
  return { shown: true, image: local(fg), ...SITE_BADGES[key] };
}

// Site: arrays kr (12) and Cr (27); Lr/Br are minifier duplicates (verified identical apart from variable names).
const site = [...arrays.find(a => a.name === 'kr').items, ...arrays.find(a => a.name === 'Cr').items];
const order = fs.readFileSync('pages/products.txt', 'utf8'); // products table: S.No / name / CAS
const siteSorted = [...site].sort((a, b) => order.indexOf('\n' + ws(a.title) + '\n') - order.indexOf('\n' + ws(b.title) + '\n'));

function pdfFields(p) {
  const segs = p.segments;
  const title = segs.filter(s => s.size === 24).map(s => s.text).join(' ');
  const alias = segs.filter(s => s.size === 14).map(s => s.text).join(' ');
  const ci = segs.findIndex(s => s.text === 'Chemical Name:');
  const pi = segs.findIndex(s => s.text === 'Physico Chemical Properties:');
  // Undo typesetting line-break hyphenation in prose ("Grape- fruit"); in chemical names a "- " is a real hyphen.
  const description = segs.slice(0, ci).filter(s => s.size === 11).map(s => s.text).join(' ').replace(/(\w)- ([a-z])/g, '$1$2');
  const chemicalName = ws(segs.slice(ci + 1, pi).map(s => s.text).join(' ')).replace(/- /g, '-');
  const cas = (p.leftColumnText.match(/CAS(?: no\.)?\s*[-:.]*\s*([\s\S]*?)(?:\n\s*FEMA|\n\s*\n|$)/) || [])[1];
  return {
    catalogueSNo: p.catalogueSNo, cataloguePage: p.printedPage, pdfPage: p.pdfPage,
    title: ws(title).replace(/- /g, '-'), alsoKnownAs: ws(alias) || null, description: ws(description),
    chemicalName, formula: p.formula, cas: ws(cas).replace(/,$/, '') || null,
    fema: p.fema, tenacity: p.tenacity, badges: p.badges,
  };
}

// CAS check digit: sum of digits (right to left, excluding the check digit) weighted 1,2,3... mod 10.
function casValid(c) {
  const m = /^(\d{2,7})-(\d{2})-(\d)$/.exec(c);
  if (!m) return false;
  const digits = (m[1] + m[2]).split('').reverse();
  return digits.reduce((s, d, i) => s + Number(d) * (i + 1), 0) % 10 === Number(m[3]);
}
const casList = c => String(c ?? '').split(/\s*\/\s*/).map(x => x.replace(/^[-\s]+/, '').trim()).filter(Boolean);

// Products named on the Kosher (valid through 2024-07-31) and Halal (valid until 2025-08-08) certificate copies,
// matched by name or by chemical identity. "probable" = same chemical by CAS/chemical name, different trade name.
const CERT_LISTINGS = {
  anethole: { kosher: 'Anethole', halal: 'Anethole' },
  celerytone: { kosher: 'Celery Ketone', halal: 'Celery Ketone (Celerytone)' },
  'chavibetol-50': { kosher: 'Chavibetol', halal: 'Chavibetol' },
  chavicol: { halal: 'Chavicol' },
  laval: { kosher: '2-Isopropyl-5-Methyl-Hexenal (probable: same chemical as Laval, CAS 35158-25-9)', halal: 'Methyl Isopropy Hexenal (Laval)' },
  grecazine: { kosher: '2-Propenyl Para Cymene (probable: matches Grecazine chemical name)' },
  'methyl-3-nonenoate': { kosher: 'Methyl-3-Nonenoate', halal: 'Methyl - 3 - Nonenoate' },
  'para-propyl-phenol': { kosher: 'Para Propylphenol' },
  'phenyl-ethyl-propionate': { kosher: 'Phenyl Ethyl Propionate', halal: 'Phenyl Ethyl Propionate' },
  vanilathon: { halal: 'Methyl Guaiacol (Vanilathon)' },
  'whiskey-91': { halal: 'Methyl Octalactone (probable: Whiskey 91 is whiskey lactone, 5-butyl-4-methyloxolan-2-one)' },
};
// Product remarks spoken in the feature video (content/source/video-transcript.txt), verbatim.
const VIDEO_NOTES = {
  'chavibetol-50': { note: 'A key component of Betel leaf oil, with a spicy note. It can be a crucial ingredient for Betel fragrances and flavours.', applications: 'Betel fragrances and flavours' },
  'ethyl-isocaproate': { note: 'A not-too-strong balanced fruity aroma. It is a volatile ester.', applications: null },
  'para-propyl-phenol': { note: 'A medicinal phenolic odour profile that is leathery, smoky, perfect for oud fragrances.', applications: 'Oud fragrances' },
};
// Where the two sources disagree only because one has an evident typo, use the other source's spelling (both recorded).
const PREFER_SITE = { anethole: ['chemicalName', 'alsoKnownAs'], orrisnitrile: ['name'] };

const norm = s => ws(String(s ?? '')).toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/\s*-\s*/g, '-');
const products = [];
const discrepancies = [];
siteSorted.forEach((s, i) => {
  const p = pdfFields(pdf.products[i]);
  const siteRec = {
    title: ws(s.title), url: `${SITE}product/${s.link}`, subTitle: ws(s.subTitle) || null, about: ws(s.about),
    chemicalName: ws(s.chemicalName) || null, formula: ws(s.formula) || null, cas: ws(s.caseNo) || null,
    fema: ws(s.FEMA) || null, tenacity: ws(s.TENACITYHour) || null, badges: siteBadges(s.foodGradeUrl),
    image: local(s.img), structureImage: local(s.chemicalUrl),
  };
  const diffs = [];
  const cmp = (field, a, b, n = norm) => { if (n(a) !== n(b)) diffs.push({ field, site: a ?? null, catalogue: b ?? null }); };
  cmp('name', siteRec.title, p.title);
  if (siteRec.subTitle !== siteRec.title || p.alsoKnownAs) cmp('alsoKnownAs', siteRec.subTitle === siteRec.title ? null : siteRec.subTitle, p.alsoKnownAs, x => norm(x).replace(/\s*\/\s*/g, '/'));
  cmp('description', siteRec.about, p.description);
  cmp('chemicalName', siteRec.chemicalName, p.chemicalName, x => norm(x).replace(/\s+/g, ''));
  cmp('formula', siteRec.formula, p.formula);
  cmp('cas', siteRec.cas, p.cas, x => casList(x).join('/'));
  cmp('fema', siteRec.fema, p.fema);
  cmp('tenacity', siteRec.tenacity, p.tenacity, x => norm(x).replace(/\s*hours$/, '').replace(/\s+/g, ''));
  for (const k of ['foodGrade', 'kosher', 'gmo']) {
    const a = siteRec.badges[k] ?? null, b = p.badges[k];
    if (a !== b) diffs.push({ field: `compliance.${k}`, site: siteRec.badges.shown ? a : 'not shown', catalogue: b });
  }
  const pref = PREFER_SITE[s.link] || [];
  const pick = (field, a, b) => (pref.includes(field) ? a ?? b : b ?? a) ?? null; // default: catalogue (April 2025), else website
  const name = pick('name', siteRec.title, p.title);
  const aka = pick('alsoKnownAs', siteRec.subTitle, p.alsoKnownAs);
  const cas = pick('cas', siteRec.cas, p.cas);
  const casIssues = casList(cas).filter(c => !casValid(c));
  products.push({
    slug: s.link,
    name,
    alsoKnownAs: aka && norm(aka) !== norm(name) ? aka : null,
    description: pick('description', siteRec.about, p.description || null),
    chemicalName: pick('chemicalName', siteRec.chemicalName, p.chemicalName),
    formula: pick('formula', siteRec.formula, p.formula),
    cas,
    fema: pick('fema', siteRec.fema, p.fema),
    tenacity: pick('tenacity', siteRec.tenacity, p.tenacity),
    compliance: { ...p.badges, source: 'catalogue', needsConfirmation: diffs.some(d => d.field.startsWith('compliance')) },
    certificateListings: CERT_LISTINGS[s.link] ?? null,
    odourProfile: 'TODO: not stated separately in any source (see description)',
    applications: VIDEO_NOTES[s.link]?.applications ? `${VIDEO_NOTES[s.link].applications} (source: feature video). TODO: full list` : 'TODO: not stated in any source',
    purity: 'TODO: not stated in any source',
    packaging: 'TODO: not stated in any source',
    videoNote: VIDEO_NOTES[s.link]?.note ?? null,
    images: { product: siteRec.image, structure: siteRec.structureImage },
    catalogue: { sNo: p.catalogueSNo, page: p.cataloguePage, pdfPage: p.pdfPage },
    source: 'site',
    foundIn: VIDEO_NOTES[s.link] ? ['site', 'pdf', 'video'] : ['site', 'pdf'],
    flags: casIssues.length ? [`CAS number fails check-digit validation: ${casIssues.join(', ')}`] : [],
    sources: { site: siteRec, pdf: p },
    discrepancies: diffs,
  });
  for (const d of diffs) discrepancies.push({ product: siteRec.title, ...d });
});

const seo = arrays.filter(a => !a.name).flatMap(a => a.items).map(x => ({
  path: `/product/${x.link}`, rendersProduct: 'anethole', titleTag: ws(x.titleTag), metaDescription: ws(x.description), keywords: ws(x.keyword),
}));

fs.mkdirSync(path.join(ROOT, 'content'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'content/products.json'), JSON.stringify(products, null, 2) + '\n');
fs.writeFileSync(path.join(ROOT, 'content/seo-landing-pages.json'), JSON.stringify(seo, null, 2) + '\n');
fs.writeFileSync('discrepancies.json', JSON.stringify(discrepancies, null, 2));
console.log('products', products.length, 'seo', seo.length, 'discrepancies', discrepancies.length);
const byField = {};
for (const d of discrepancies) byField[d.field] = (byField[d.field] || 0) + 1;
console.log(byField);
for (const p of products) if (p.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 6) !== p.sources.site.title.toLowerCase().replace(/[^a-z]/g, '').slice(0, 6)) console.log('NAME MISMATCH', p.name, p.sources.site.title);
for (const p of products) if (!p.images.product || !p.images.structure || String(p.images.structure).startsWith('BROKEN')) console.log('IMG', p.slug, p.images);
for (const p of products) if (p.flags.length) console.log('FLAG', p.slug, p.flags);
