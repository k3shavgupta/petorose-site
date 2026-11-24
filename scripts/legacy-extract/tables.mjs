// Render markdown tables for INVENTORY.md from content/products.json.
import fs from 'fs';
const P = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const esc = s => String(s ?? '—').replace(/\|/g, '\\|');
const yn = v => (v === true ? '✓' : v === false ? '✗' : '–');
let out = '';

out += '| # | Product | Slug | Also known as | CAS | FEMA | Tenacity | Cat. page | Food / Kosher / GMO (catalogue) |\n|---|---|---|---|---|---|---|---|---|\n';
for (const p of P) out += `| ${p.catalogue.sNo} | ${esc(p.name)} | \`${p.slug}\` | ${esc(p.alsoKnownAs)} | ${esc(p.cas)} | ${esc(p.fema)} | ${esc(p.tenacity)} | ${p.catalogue.page} | ${yn(p.compliance.foodGrade)} ${yn(p.compliance.kosher)} ${yn(p.compliance.gmo)} |\n`;

out += '\n\n<!-- SPEC -->\n\n| Product | Field | Website | Catalogue (Apr 2025) | Used in products.json |\n|---|---|---|---|---|\n';
for (const p of P) for (const d of p.discrepancies) {
  if (d.field === 'description' || d.field.startsWith('compliance')) continue;
  const used = { name: p.name, alsoKnownAs: p.alsoKnownAs, chemicalName: p.chemicalName, formula: p.formula, cas: p.cas, fema: p.fema, tenacity: p.tenacity }[d.field];
  out += `| ${esc(p.name)} | ${d.field} | ${esc(d.site)} | ${esc(d.catalogue)} | ${esc(used)} |\n`;
}

out += '\n\n<!-- BADGES -->\n\n| Product | Website badge (Food / Kosher / GMO) | Catalogue (Food / Kosher / GMO) | Certificate listings |\n|---|---|---|---|\n';
for (const p of P) {
  const s = p.sources.site.badges;
  const site = s.shown ? `${yn(s.foodGrade)} ${yn(s.kosher)} ${yn(s.gmo)}` : s.brokenImage ? `broken image (${s.brokenImage})` : 'none shown';
  const c = p.compliance;
  if (!c.needsConfirmation && !p.certificateListings) continue;
  const certs = p.certificateListings ? Object.entries(p.certificateListings).map(([k, v]) => `${k}: ${v}`).join('; ') : '—';
  out += `| ${esc(p.name)} | ${site} | ${yn(c.foodGrade)} ${yn(c.kosher)} ${yn(c.gmo)} | ${esc(certs)} |\n`;
}

out += '\n\n<!-- DESC -->\n\n';
for (const p of P) for (const d of p.discrepancies.filter(d => d.field === 'description')) {
  out += `- **${p.name}**\n  - Website: “${d.site}”\n  - Catalogue: “${d.catalogue}”\n`;
}
fs.writeFileSync(process.argv[3], out);
if (process.argv[4]) {
  const [product, rest1] = out.split('\n\n<!-- SPEC -->\n\n');
  const [spec, rest2] = rest1.split('\n\n<!-- BADGES -->\n\n');
  const [badges, desc] = rest2.split('\n\n<!-- DESC -->\n\n');
  const tpl = fs.readFileSync(process.argv[4], 'utf8');
  fs.writeFileSync(process.argv[5], tpl.replace('{{PRODUCT_TABLE}}', product.trim()).replace('{{SPEC_TABLE}}', spec.trim())
    .replace('{{BADGE_TABLE}}', badges.trim()).replace('{{DESC_LIST}}', desc.trim()));
}
