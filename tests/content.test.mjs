import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { build } from '../scripts/build.mjs';
import { loadContent, root, types, validate } from '../scripts/content.mjs';

const source = loadContent();

test('all curated articles use valid metadata, availability and cited official sources', () => {
  assert.deepEqual(validate(source), []);
  for (const entry of source.entries) {
    for (const url of entry.meta.official_sources) {
      assert.ok(entry.body.includes(url), `${entry.route}: source must be visible in the article`);
    }
  }
});

test('validation rejects routing collisions, unofficial URLs and invalid delivery flags', () => {
  for (const [change, expected] of [
    [(data) => { data.entries[1].meta.id = data.entries[0].meta.id; }, /Duplicate id/],
    [(data) => { data.entries[0].meta.id = '../escape'; }, /id must match/],
    [(data) => { data.entries[0].meta.official_sources = ['http://news.microsoft.com/']; }, /Invalid HTTPS/],
    [(data) => { data.entries[0].meta.official_sources = ['https://news.microsoft.com.example.org/']; }, /Unapproved source/],
    [(data) => { data.entries[0].meta.deliveries = { llms: 'false' }; }, /Invalid deliveries/],
    [(data) => { data.entries[0].meta.tags = ['unregistered']; }, /Unknown or missing tags/],
    [(data) => { data.entries[0].meta.last_verified = '2026-02-30'; }, /Invalid last_verified/],
    [(data) => { data.entries[0].body = '## 概要\n\n## 参考リンク'; }, /Missing availability/],
  ]) {
    const data = structuredClone(source);
    change(data);
    assert.match(validate(data).join('\n'), expected);
  }
});

test('generation keeps site, llms, skill and JSON indexes aligned and removes stale articles', (t) => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'ignite-output-test-'));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  fs.cpSync(path.join(root, 'content'), path.join(base, 'content'), { recursive: true });
  const read = (file) => fs.readFileSync(path.join(base, file), 'utf8');
  const exists = (file) => fs.existsSync(path.join(base, file));
  const skill = `skills/${source.info.skill}`;
  const data = build(base);
  assert.ok(read('site/index.md').includes('[llms.txt](/llms.txt)'));
  const machineIndex = JSON.parse(read('site/public/.well-known/docs-index.json'));
  assert.equal(machineIndex.entries.length, data.entries.length);
  for (const entry of data.entries) {
    assert.ok(read(`site/${entry.route}.md`).includes(entry.meta.summary));
    if (entry.meta.id === 'session-catalog') {
      assert.match(read(`site/public/llms/${entry.route}/llms.txt`), /llms\/sessions\/brk\d+\/llms\.txt/);
    } else {
      assert.ok(read(`site/public/llms/${entry.route}/llms.txt`).includes(entry.body));
    }
    assert.ok(read(`${skill}/references/${entry.route}.md`).includes(entry.body));
    assert.ok(read('site/public/llms.txt').includes(`${data.info.site_url}llms/${entry.route}/llms.txt`));
    const record = machineIndex.entries.find((item) => item.id === entry.meta.id);
    assert.equal(record.url, `${data.info.site_url}${entry.route}.html`);
  }
  for (const { dir } of Object.values(types)) {
    const index = read(`${skill}/references/${dir}.md`);
    for (const match of index.matchAll(/\]\(([^)]+)\)/g)) {
      if (!match[1].startsWith('https:')) assert.ok(exists(`${skill}/references/${match[1]}`), match[1]);
    }
  }
  const first = data.entries[0];
  const original = read(`content/${first.route}.md`);
  fs.writeFileSync(path.join(base, `content/${first.route}.md`), original.replace(
    'content_type: announcement',
    'deliveries:\n  site: false\n  llms: false\n  skills: false\ncontent_type: announcement',
  ));
  build(base);
  assert.equal(exists(`site/${first.route}.md`), false);
  assert.equal(exists(`site/public/llms/${first.route}/llms.txt`), false);
  assert.equal(exists(`${skill}/references/${first.route}.md`), false);
  assert.equal(read('site/public/llms.txt').includes(`/llms/${first.route}/llms.txt`), false);
  const disabled = JSON.parse(read('site/public/.well-known/docs-index.json')).entries.find((item) => item.id === first.meta.id);
  assert.equal(disabled.url, undefined);
  assert.equal(disabled.llms, undefined);
  assert.equal(disabled.skill_reference, undefined);
  fs.unlinkSync(path.join(base, `content/${first.route}.md`));
  const second = data.entries[1];
  fs.unlinkSync(path.join(base, `content/${second.route}.md`));
  build(base);
  assert.equal(exists(`site/${second.route}.md`), false);
  assert.equal(exists(`site/public/llms/${second.route}/llms.txt`), false);
  assert.equal(exists(`${skill}/references/${second.route}.md`), false);
  assert.equal(JSON.parse(read('site/public/.well-known/docs-index.json')).entries.length, data.entries.length - 2);
});
