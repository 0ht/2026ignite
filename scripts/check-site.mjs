import fs from 'node:fs';
import path from 'node:path';
import { loadContent, root } from './content.mjs';

const { info, entries } = loadContent();
const output = path.join(root, 'site/.vitepress/dist');
const files = fs.readdirSync(output, { recursive: true }).filter((file) => file.endsWith('.html'));
const errors = [];
for (const file of files) {
  const html = fs.readFileSync(path.join(output, file), 'utf8');
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href)) continue;
    const url = new URL(href, `https://preview.invalid${info.site_base}${file.replaceAll(path.sep, '/')}`);
    const route = decodeURIComponent(url.pathname);
    if (!route.startsWith(info.site_base)) { errors.push(`${file}: outside base: ${href}`); continue; }
    const relative = route.slice(info.site_base.length);
    const target = !relative || relative.endsWith('/') ? `${relative}index.html` : relative;
    if (!fs.existsSync(path.join(output, target))) errors.push(`${file}: missing ${href}`);
  }
}
const docs = JSON.parse(fs.readFileSync(path.join(output, '.well-known/docs-index.json'), 'utf8'));
if (docs.entries.length !== entries.length) errors.push('Machine index entry count differs from source');
for (const entry of docs.entries) {
  for (const url of [entry.url, entry.llms].filter(Boolean)) {
    const relative = new URL(url).pathname.slice(info.site_base.length);
    if (!fs.existsSync(path.join(output, relative))) errors.push(`Missing indexed output: ${url}`);
  }
}
if (errors.length) throw new Error(errors.join('\n'));
console.log(`Checked internal links and assets in ${files.length} HTML pages and ${docs.entries.length} index records.`);
