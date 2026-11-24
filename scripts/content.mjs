import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const root = path.resolve(import.meta.dirname, '..');
export const types = {
  announcement: { dir: 'announcements', name: 'アナウンス' },
  session: { dir: 'sessions', name: 'セッション' },
  resource: { dir: 'resources', name: '参考資料' },
};

export function loadContent(base = root) {
  const json = (file) => JSON.parse(fs.readFileSync(path.join(base, 'content', file), 'utf8'));
  const entries = [];
  for (const [type, { dir }] of Object.entries(types)) {
    const directory = path.join(base, 'content', dir);
    if (!fs.existsSync(directory)) continue;
    for (const file of fs.readdirSync(directory).sort()) {
      if (!file.endsWith('.md')) continue;
      const { data, content } = matter(fs.readFileSync(path.join(directory, file), 'utf8'));
      entries.push({ meta: data, body: content.trim(), type, file, route: `${dir}/${file.slice(0, -3)}` });
    }
  }
  return {
    info: json('build-info.json'),
    topics: json('topics.json'),
    tags: json('tags.json'),
    domains: json('allowed-domains.json'),
    entries,
  };
}

export function delivered(entry, target) {
  return entry.meta.deliveries?.[target] ?? true;
}

export function validate(data) {
  const errors = [];
  const { entries, topics, tags, domains, info } = data;
  const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  const validDate = (value) => typeof value === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && Number.isFinite(Date.parse(value))
    && new Date(value).toISOString().slice(0, 10) === value;
  for (const [label, definitions] of [['topics', topics], ['tags', tags]]) {
    const seen = new Set();
    for (const item of definitions) {
      if (!slug.test(item.slug) || !item.name || seen.has(item.slug)) errors.push(`${label}: invalid or duplicate definition`);
      seen.add(item.slug);
    }
  }
  if (!validDate(info.last_verified) || !validDate(info.dates?.start)
    || !validDate(info.dates?.end) || info.dates.start > info.dates.end) errors.push('Invalid event dates');
  if (!/^\/(?:[a-z0-9-]+\/)*$/.test(info.site_base)) errors.push('Invalid site_base');
  if (!slug.test(info.skill)) errors.push('Invalid skill name');
  const secure = (value) => {
    try { return new URL(value).protocol === 'https:'; } catch { return false; }
  };
  if (!secure(info.site_url) || !info.site_url.endsWith(info.site_base)
    || !secure(info.repository)) errors.push('Invalid publication URLs');
  if (!entries.length) errors.push('No content entries');
  const ids = new Set();
  for (const entry of entries) {
    const { meta, body, file, type, route } = entry;
    const fail = (message) => errors.push(`${route}: ${message}`);
    for (const key of ['id', 'title', 'summary', 'topic']) {
      if (typeof meta[key] !== 'string' || !meta[key].trim() || /[\r\n]/.test(meta[key])) fail(`Invalid ${key}`);
    }
    if (!slug.test(meta.id) || `${meta.id}.md` !== file) fail('id must match filename and be kebab-case');
    if (ids.has(meta.id)) fail('Duplicate id');
    ids.add(meta.id);
    if (meta.content_type !== type) fail('content_type must match directory');
    if (!topics.some((topic) => topic.slug === meta.topic)) fail('Unknown topic');
    if (!Array.isArray(meta.tags) || !meta.tags.length
      || meta.tags.some((tag) => !tags.some((definition) => definition.slug === tag))) fail('Unknown or missing tags');
    if (!validDate(meta.last_verified) || meta.last_verified > info.last_verified) fail('Invalid last_verified');
    if (!Array.isArray(meta.official_sources) || !meta.official_sources.length) fail('Missing official_sources');
    else for (const source of meta.official_sources) {
      if (!secure(source)) { fail(`Invalid HTTPS source: ${source}`); continue; }
      if (!domains.includes(new URL(source).hostname)) fail(`Unapproved source domain: ${source}`);
    }
    if (meta.deliveries !== undefined && (!meta.deliveries || typeof meta.deliveries !== 'object'
      || Array.isArray(meta.deliveries)
      || Object.entries(meta.deliveries).some(([key, value]) => !['site', 'llms', 'skills'].includes(key) || typeof value !== 'boolean'))) {
      fail('Invalid deliveries');
    }
    for (const heading of ['概要', '参考リンク']) {
      if (!body.includes(`## ${heading}`)) fail(`Missing section: ${heading}`);
    }
    if (type === 'announcement' && !body.includes('## 提供状況・注意点')) fail('Missing availability section');
  }
  return errors;
}

export function assertValid(data) {
  const errors = validate(data);
  if (errors.length) throw new Error(errors.join('\n'));
}
