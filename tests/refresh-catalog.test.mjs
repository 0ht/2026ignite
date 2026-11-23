import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createCatalogMarkdown, refreshCatalog } from '../scripts/refresh-catalog.mjs';

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
  ], '2026-11-20');

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
});

test('catalog snapshot preserves separate schedule instances and requires a valid date', () => {
  const markdown = createCatalogMarkdown([
    session({ sessionInstanceId: 'first-instance', startDateTime: '2026-11-18T18:00:00Z' }),
    session({ sessionInstanceId: 'second-instance', startDateTime: '2026-11-19T18:00:00Z' }),
  ], '2026-11-20');

  assert.equal((markdown.match(/\| BRK001 \|/g) ?? []).length, 2);
  assert.match(markdown, /first-instance/);
  assert.match(markdown, /second-instance/);
  assert.throws(() => createCatalogMarkdown([], 'not-a-date'), /Invalid verification date/);
});

test('refresh stores the catalog snapshot and advances the shared verification date', async (t) => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'ignite-catalog-test-'));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  fs.mkdirSync(path.join(base, 'content/sessions'), { recursive: true });
  fs.writeFileSync(path.join(base, 'content/build-info.json'), JSON.stringify({ last_verified: '2026-11-20' }));
  const result = await refreshCatalog({
    base,
    verifiedAt: '2026-11-21',
    fetcher: async () => ({ ok: true, json: async () => [session()] }),
  });

  assert.equal(result.count, 1);
  assert.match(fs.readFileSync(path.join(base, 'content/sessions/session-catalog.md'), 'utf8'), /BRK001/);
  assert.equal(JSON.parse(fs.readFileSync(path.join(base, 'content/build-info.json'), 'utf8')).last_verified, '2026-11-21');
});
