import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createCatalogMarkdown, createSessionMarkdown, refreshCatalog } from '../scripts/refresh-catalog.mjs';

const session = (overrides = {}) => ({
  sessionCode: 'BRK001',
  sessionInstanceId: 'session-instance-1',
  title: 'Catalog session',
  speakerNames: 'Example Speaker',
  startDateTime: '2026-11-18T18:00:00Z',
  endDateTime: '2026-11-18T18:45:00Z',
  deliveryTypes: [{ logicalValue: 'Online' }],
  audienceTypes: [{ logicalValue: 'Technical Decision Maker' }],
  topic: [{ displayValue: 'Cloud & AI' }],
  viewingOptions: [{ logicalValue: 'Will be recorded' }],
  ...overrides,
});

test('catalog snapshot filters by delivery and audience and links available assets', () => {
  const markdown = createCatalogMarkdown([
    session({
      onDemand: 'https://medius.microsoft.com/Embed/video-nc/example',
      downloadVideoLink: 'https://medius.microsoft.com/video/asset/HIGHMP4/example',
      captionFileLink: 'https://medius.microsoft.com/video/asset/Transcript/example',
      slideDeck: 'https://ignite.microsoft.com/slides.pdf',
      relatedResources: [{ label: 'Related article', link: 'https://learn.microsoft.com/example' }],
    }),
    session({ sessionCode: 'BRK002', viewingOptions: [{ logicalValue: 'Will not be recorded' }] }),
    session({ sessionCode: 'BRK003', audienceTypes: [{ logicalValue: 'Business Decision Maker' }] }),
    session({ sessionCode: 'BRK004', deliveryTypes: [{ logicalValue: 'In-person' }] }),
  ], '2026-11-20', { last_verified: '2026-11-19', sessions: { BRK001: '日本語の要点' } });

  assert.match(markdown, /2 枠（動画公開 1 件、スライド公開 1 件、関連資料あり 1 件、録画なし 1 件）/);
  assert.match(markdown, /\| BRK001 \|/);
  assert.match(markdown, /\| BRK002 \|/);
  assert.doesNotMatch(markdown, /BRK003|BRK004/);
  assert.match(markdown, /動画\]\(https:\/\/medius\.microsoft\.com\/Embed\/video-nc\/example\)/);
  assert.match(markdown, /MP4\]\(https:\/\/medius\.microsoft\.com\/video\/asset\/HIGHMP4\/example\)/);
  assert.match(markdown, /字幕\]\(https:\/\/medius\.microsoft\.com\/video\/asset\/Transcript\/example\)/);
  assert.match(markdown, /スライド\]\(https:\/\/ignite\.microsoft\.com\/slides\.pdf\)/);
  assert.match(markdown, /Related article\]\(https:\/\/learn\.microsoft\.com\/example\)/);
  assert.match(markdown, /録画なし/);
  assert.match(markdown, /2026-11-19 03:00–03:45 JST/);
  assert.match(markdown, /\]\(\.\/brk001\.md\)/);
  assert.match(markdown, /日本語の短い要点は 1 枠/);
  assert.match(markdown, /要点の確認日 2026-11-19/);
  assert.match(markdown, /日本語の要点/);
  assert.match(markdown, /要約未作成/);
});

test('catalog snapshot preserves separate schedule instances and requires a valid date', () => {
  const markdown = createCatalogMarkdown([
    session({ sessionInstanceId: 'first-instance', startDateTime: '2026-11-18T18:00:00Z' }),
    session({ sessionInstanceId: 'second-instance', startDateTime: '2026-11-19T18:00:00Z' }),
  ], '2026-11-20');

  assert.equal((markdown.match(/\| BRK001 \|/g) ?? []).length, 2);
  assert.equal((markdown.match(/\]\(\.\/brk001\.md\)/g) ?? []).length, 2);
  assert.match(markdown, /2026-11-19 03:00/);
  assert.match(markdown, /2026-11-20 03:00/);
  assert.throws(() => createCatalogMarkdown([], 'not-a-date'), /Invalid verification date/);
});

test('one session article combines its instances and preserves their media', () => {
  const article = createSessionMarkdown([
    session({ sessionInstanceId: 'first-instance', onDemand: 'https://medius.microsoft.com/video' }),
    session({ sessionInstanceId: 'second-instance', startDateTime: '2026-11-19T18:00:00Z', slideDeck: 'https://ignite.microsoft.com/slides.pdf' }),
  ], '2026-11-20', { last_verified: '2026-11-19', sessions: { BRK001: '日本語の要点' } });

  assert.match(article, /id: brk001/);
  assert.match(article, /日本語の要点/);
  assert.match(article, /要約確認日 2026-11-19/);
  assert.match(article, /first-instance/);
  assert.match(article, /second-instance/);
  assert.match(article, /動画\]\(https:\/\/medius\.microsoft\.com\/video\)/);
  assert.match(article, /スライド\]\(https:\/\/ignite\.microsoft\.com\/slides\.pdf\)/);
});

test('refresh stores the catalog snapshot and advances the shared verification date', async (t) => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'ignite-catalog-test-'));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  fs.mkdirSync(path.join(base, 'content/sessions'), { recursive: true });
  fs.writeFileSync(path.join(base, 'content/build-info.json'), JSON.stringify({ last_verified: '2026-11-20' }));
  fs.writeFileSync(path.join(base, 'content/session-summaries.json'), JSON.stringify({
    last_verified: '2026-11-20', sessions: { BRK001: '既存の要約' },
  }));
  const result = await refreshCatalog({
    base,
    verifiedAt: '2026-11-21',
    fetcher: async () => ({ ok: true, json: async () => [session()] }),
  });

  assert.equal(result.count, 1);
  assert.match(fs.readFileSync(path.join(base, 'content/sessions/session-catalog.md'), 'utf8'), /BRK001/);
  assert.match(fs.readFileSync(path.join(base, 'content/sessions/session-catalog.md'), 'utf8'), /既存の要約/);
  assert.match(fs.readFileSync(path.join(base, 'content/sessions/brk001.md'), 'utf8'), /既存の要約/);
  assert.equal(JSON.parse(fs.readFileSync(path.join(base, 'content/build-info.json'), 'utf8')).last_verified, '2026-11-21');
});

test('refresh refuses to overwrite a manually maintained session article', async (t) => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'ignite-catalog-manual-test-'));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  fs.mkdirSync(path.join(base, 'content/sessions'), { recursive: true });
  fs.writeFileSync(path.join(base, 'content/session-summaries.json'), JSON.stringify({
    last_verified: '2026-11-20', sessions: { BRK001: '要約' },
  }));
  const manual = path.join(base, 'content/sessions/brk001.md');
  fs.writeFileSync(manual, '手書きの記事');
  await assert.rejects(refreshCatalog({
    base,
    verifiedAt: '2026-11-21',
    fetcher: async () => ({ ok: true, json: async () => [session()] }),
  }), /Refusing to overwrite manually maintained session/);
  assert.equal(fs.readFileSync(manual, 'utf8'), '手書きの記事');
});

test('refresh protects edits to generated articles', async (t) => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'ignite-catalog-edit-test-'));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  fs.mkdirSync(path.join(base, 'content/sessions'), { recursive: true });
  fs.writeFileSync(path.join(base, 'content/build-info.json'), JSON.stringify({ last_verified: '2026-11-20' }));
  fs.writeFileSync(path.join(base, 'content/session-summaries.json'), JSON.stringify({
    last_verified: '2026-11-20', sessions: { BRK001: '要約' },
  }));
  const options = { base, verifiedAt: '2026-11-21', fetcher: async () => ({ ok: true, json: async () => [session()] }) };
  await refreshCatalog(options);
  const article = path.join(base, 'content/sessions/brk001.md');
  fs.appendFileSync(article, '\n追加した内容\n');
  await assert.rejects(refreshCatalog(options), /Refusing to overwrite manually maintained session/);
  assert.match(fs.readFileSync(article, 'utf8'), /追加した内容/);
});

test('refresh preserves explicitly curated session articles', async (t) => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'ignite-catalog-curated-test-'));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  fs.mkdirSync(path.join(base, 'content/sessions'), { recursive: true });
  fs.writeFileSync(path.join(base, 'content/build-info.json'), JSON.stringify({ last_verified: '2026-11-20' }));
  fs.writeFileSync(path.join(base, 'content/session-summaries.json'), JSON.stringify({
    last_verified: '2026-11-20', sessions: { BRK001: '要約' },
  }));
  const article = path.join(base, 'content/sessions/brk001.md');
  const manual = '<!-- Manually curated session; catalog refresh keeps this article. -->\n手書きの分析\n';
  fs.writeFileSync(article, manual);
  await refreshCatalog({
    base,
    verifiedAt: '2026-11-21',
    fetcher: async () => ({ ok: true, json: async () => [session()] }),
  });
  assert.equal(fs.readFileSync(article, 'utf8'), manual);
  assert.match(fs.readFileSync(path.join(base, 'content/sessions/session-catalog.md'), 'utf8'), /BRK001/);
});
