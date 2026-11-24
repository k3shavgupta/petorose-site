// Extract data arrays (products, SEO landing pages, etc.) from the old site's webpack bundle.
import fs from 'fs';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

const src = fs.readFileSync('main.js', 'utf8');
const mods = {};
for (const m of src.matchAll(/(\d+):function\(e,t,n\)\{"use strict";e\.exports=n\.p\+"([^"]+)"/g)) mods[m[1]] = m[2];
// Small images inlined by webpack as data URIs: write them out as files.
fs.mkdirSync('inline', { recursive: true });
for (const m of src.matchAll(/(\d+):function\(e\)\{"use strict";e\.exports="data:image\/(\w+)(?:\+xml)?;base64,([^"]+)"/g)) {
  const file = `inline/module-${m[1]}.${m[2] === 'svg' ? 'svg' : m[2]}`;
  fs.writeFileSync(file, Buffer.from(m[3], 'base64'));
  mods[m[1]] = file;
}

const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script' });
const decls = {};
walk.full(ast, node => {
  if (node.type === 'VariableDeclarator' && node.id.type === 'Identifier' && node.init) {
    (decls[node.id.name] ||= []).push(node.init);
  }
});

function ev(node, depth = 0) {
  if (!node) return null;
  switch (node.type) {
    case 'Literal': return node.value;
    case 'TemplateLiteral': return node.quasis.map((q, i) => q.value.cooked + (node.expressions[i] ? ev(node.expressions[i], depth) : '')).join('');
    case 'ArrayExpression': return node.elements.map(e => ev(e, depth));
    case 'ObjectExpression': {
      const o = {};
      for (const p of node.properties) {
        if (p.type !== 'Property') continue;
        const k = p.key.type === 'Identifier' ? p.key.name : p.key.value;
        o[k] = ev(p.value, depth);
      }
      return o;
    }
    case 'CallExpression':
      if (node.callee.type === 'Identifier' && node.arguments.length === 1 && node.arguments[0].type === 'Literal') {
        const id = String(node.arguments[0].value);
        return mods[id] ? { asset: mods[id] } : { module: id };
      }
      return { unevaluated: src.slice(node.start, Math.min(node.end, node.start + 200)) };
    case 'Identifier': {
      const d = decls[node.name];
      if (d && d.length === 1 && depth < 3) {
        const v = ev(d[0], depth + 1);
        if (v && typeof v === 'object' && v.unevaluated) return { ref: node.name };
        return v;
      }
      return { ref: node.name, ambiguous: d ? d.length : 0 };
    }
    case 'BinaryExpression':
      if (node.operator === '+') return String(ev(node.left, depth)) + String(ev(node.right, depth));
      return { unevaluated: src.slice(node.start, node.end) };
    case 'UnaryExpression':
      if (node.operator === '!' && node.argument.type === 'Literal') return !node.argument.value;
      return { unevaluated: src.slice(node.start, node.end) };
    default:
      return { unevaluated: src.slice(node.start, Math.min(node.end, node.start + 200)) };
  }
}

const arrays = [];
walk.full(ast, node => {
  if (node.type === 'ArrayExpression' && node.elements.length > 0 && node.elements.every(e => e && e.type === 'ObjectExpression')) {
    const keys = new Set(node.elements.flatMap(e => e.properties.map(p => p.key && (p.key.name || p.key.value))));
    if (keys.has('link') || keys.has('caseNo') || keys.has('title') || keys.has('question') || keys.has('name')) {
      let name = null;
      for (const [k, v] of Object.entries(decls)) if (v.includes(node)) name = k;
      arrays.push({ name, start: node.start, keys: [...keys], count: node.elements.length, items: ev(node) });
    }
  }
});
fs.writeFileSync('bundle-arrays.json', JSON.stringify({ mods, arrays }, null, 2));
for (const a of arrays) console.log(a.name, a.start, a.count, a.keys.join(','));
