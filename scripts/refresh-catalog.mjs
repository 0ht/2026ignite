import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { root } from './content.mjs';

const catalogUrl = 'https://ignite.microsoft.com/en-US/sessions?liveAndUpcoming=0&filter=deliveryTypes%2FlogicalValue%3EOnline&filter=audienceTypes%2FlogicalValue%3ETechnical+Decision+Maker';
const apiUrl = 'https://ignite.microsoft.com/api/session/all/en-US';
const matchesCatalogFilters = (session) => session.deliveryTypes?.some((item) => item.logicalValue === 'Online')
  && session.audienceTypes?.some((item) => item.logicalValue === 'Technical Decision Maker');

const tableText = (value) => String(value ?? '').replace(/[\u200B\uFEFF]/g, '').replaceAll('|', '\\|').replace(/\s+/g, ' ').trim();
const markdownUrl = (value) => String(value).replaceAll('(', '%28').replaceAll(')', '%29');
const link = (label, value) => {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    const text = tableText(label).replace(/([\\[\]])/g, '\\$1');
    return `[${text}](${markdownUrl(url.toString())})`;
  } catch {
    return null;
  }
};

function formatTime(value) {
  if (!value) return '';
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(value));
  const part = (type) => parts.find((item) => item.type === type)?.value ?? '';
  return `${part('year')}-${part('month')}-${part('day')} ${part('hour')}:${part('minute')}`;
}

function mediaLinks(session) {
  const links = [];
  if (session.onDemand) links.push(link('動画', session.onDemand));
  if (session.downloadVideoLink) links.push(link('MP4', session.downloadVideoLink));
  if (session.captionFileLink) links.push(link('字幕', session.captionFileLink));
  const validLinks = links.filter(Boolean);
  if (!validLinks.length) {
    if (session.viewingOptions?.some((item) => item.logicalValue === 'Will be recorded')) return '録画予定';
    if (session.viewingOptions?.some((item) => item.logicalValue === 'Will not be recorded')) return '録画なし';
    return '未掲載';
  }
  return validLinks.join(' / ');
}

function materialLinks(session) {
  const links = [];
  if (session.slideDeck) links.push(link('スライド', session.slideDeck));
  for (const resource of session.relatedResources ?? []) {
    if (resource.link) links.push(link(resource.label || resource.category || '関連資料', resource.link));
  }
  const validLinks = links.filter(Boolean);
  return validLinks.length ? validLinks.join(' / ') : '—';
}

export function createCatalogMarkdown(sessions, verifiedAt) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(verifiedAt)
    || !Number.isFinite(Date.parse(verifiedAt))
    || new Date(verifiedAt).toISOString().slice(0, 10) !== verifiedAt) {
    throw new Error(`Invalid verification date: ${verifiedAt}`);
  }
  const matches = sessions.filter(matchesCatalogFilters)
    .sort((a, b) => String(a.startDateTime ?? '').localeCompare(String(b.startDateTime ?? ''))
      || String(a.sessionCode ?? '').localeCompare(String(b.sessionCode ?? '')));
  const videoCount = matches.filter((session) => Boolean(session.onDemand)).length;
  const slideCount = matches.filter((session) => Boolean(session.slideDeck)).length;
  const resourceCount = matches.filter((session) => session.relatedResources?.some((resource) => resource.link)).length;
  const noRecordingCount = matches.filter((session) => !session.onDemand
    && session.viewingOptions?.some((item) => item.logicalValue === 'Will not be recorded')).length;
  const lines = matches.map((session) => {
    const detailUrl = `https://ignite.microsoft.com/en-US/sessions/${session.sessionInstanceId}?source=sessions`;
    const start = formatTime(session.startDateTime);
    const end = formatTime(session.endDateTime);
    const dateTime = start ? `${start}${end ? `–${end.slice(-5)}` : ''} JST` : '日時未掲載';
    const topics = (session.topic ?? []).map((item) => item.displayValue).filter(Boolean).join('・') || '—';
    return `| ${tableText(session.sessionCode)} | ${link(session.title, detailUrl)} | ${dateTime} | ${tableText(session.speakerNames || '—')} | ${tableText(topics)} | ${mediaLinks(session)} | ${materialLinks(session)} |`;
  });
  return `---
id: session-catalog
title: Microsoft Ignite 2026 セッションカタログ（Online・Technical Decision Maker）
summary: 公式カタログの Online・Technical Decision Maker 条件に合うセッションを一覧化し、録画、スライド、関連資料へのリンクを掲載します。
content_type: session
topic: sessions
tags: [catalog, agents]
last_verified: "${verifiedAt}"
official_sources:
  - "${catalogUrl}"
  - "${apiUrl}"
---

## 概要

Microsoft 公式セッションカタログから、配信形式 \`Online\` と対象者 \`Technical Decision Maker\` の両方に該当するセッション枠を収録しています。ライブ・開催予定とオンデマンドを含み、同じセッションコードの複数枠は開催日時ごとに掲載します。

${matches.length} 枠（動画公開 ${videoCount} 件、スライド公開 ${slideCount} 件、関連資料あり ${resourceCount} 件、録画なし ${noRecordingCount} 件）。確認日 ${verifiedAt} 時点のカタログ情報です。録画予定は公開済み動画と区別しています。

## セッション一覧

| コード | セッション | 開始日時（JST） | 登壇者 | トピック | 動画 | 資料 |
| --- | --- | --- | --- | --- | --- | --- |
${lines.join('\n')}

## 参考リンク

- [Microsoft Ignite セッションカタログ（Online・Technical Decision Maker）](${catalogUrl})
- [公式セッションカタログデータ](${apiUrl})
`;
}

export async function refreshCatalog({ base = root, fetcher = fetch, verifiedAt = new Date().toISOString().slice(0, 10) } = {}) {
  const response = await fetcher(apiUrl, { headers: { accept: 'application/json' } });
  if (!response.ok) throw new Error(`Session catalog request failed: HTTP ${response.status}`);
  const sessions = await response.json();
  if (!Array.isArray(sessions)) throw new Error('Session catalog response was not an array');
  const count = sessions.filter(matchesCatalogFilters).length;
  if (!count) throw new Error('No sessions matched the requested catalog filters');
  const markdown = createCatalogMarkdown(sessions, verifiedAt);
  fs.writeFileSync(path.join(base, 'content/sessions/session-catalog.md'), markdown, 'utf8');
  const infoPath = path.join(base, 'content/build-info.json');
  const info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
  if (verifiedAt > info.last_verified) {
    info.last_verified = verifiedAt;
    fs.writeFileSync(infoPath, `${JSON.stringify(info, null, 2)}\n`, 'utf8');
  }
  return { count, verifiedAt };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const result = await refreshCatalog();
  console.log(`Imported ${result.count} Online / Technical Decision Maker session entries (verified ${result.verifiedAt}).`);
}
