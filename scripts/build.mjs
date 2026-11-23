import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { assertValid, delivered, loadContent, root, types } from './content.mjs';

export function build(base = root) {
  const data = loadContent(base);
  assertValid(data);
  const { entries, info, topics, tags } = data;
  const siteEntries = entries.filter((entry) => delivered(entry, 'site'));
  const llmsEntries = entries.filter((entry) => delivered(entry, 'llms'));
  const skillEntries = entries.filter((entry) => delivered(entry, 'skills'));
  const skillRoot = `skills/${info.skill}`;
  const write = (file, text) => {
    const target = path.join(base, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, text, 'utf8');
  };
  const json = (file, value) => write(file, `${JSON.stringify(value, null, 2)}\n`);
  // Only remove files from explicitly generated content directories.
  const clearMarkdown = (directory) => {
    const target = path.join(base, directory);
    if (!fs.existsSync(target)) return;
    for (const file of fs.readdirSync(target)) {
      if (file.endsWith('.md')) fs.unlinkSync(path.join(target, file));
    }
  };
  for (const { dir } of Object.values(types)) {
    clearMarkdown(`site/${dir}`);
    clearMarkdown(`${skillRoot}/references/${dir}`);
    const llmsDir = path.join(base, 'site/public/llms', dir);
    if (fs.existsSync(llmsDir)) {
      for (const item of fs.readdirSync(llmsDir, { withFileTypes: true })) {
        if (item.isDirectory()) {
          const file = path.join(llmsDir, item.name, 'llms.txt');
          if (fs.existsSync(file)) fs.unlinkSync(file);
        }
      }
    }
  }
  clearMarkdown('site/topics');
  clearMarkdown('site/tags');
  const absolute = (entry) => `${info.site_url}${entry.route}.html`;
  const llmsUrl = (entry) => `${info.site_url}llms/${entry.route}/llms.txt`;
  const note = `コンテンツの最新確認日 ${info.last_verified}。各記事の確認日と発表時点の提供状況を確認してください。導入時は公式情報で対象地域、ライセンス、参加条件を確認してください。`;
  const content = (entry) => {
    const { meta, body } = entry;
    return `# ${meta.title}\n\n${meta.summary}\n\n確認日 ${meta.last_verified}\n\n${body}\n`;
  };
  const list = (items, link) => items.map((entry) => `- [${entry.meta.title}](${link(entry)}) ${entry.meta.summary}`).join('\n');
  for (const entry of siteEntries) {
    write(`site/${entry.route}.md`, `---\ntitle: ${JSON.stringify(entry.meta.title)}\ndescription: ${JSON.stringify(entry.meta.summary)}\n---\n\n${content(entry)}`);
  }
  for (const entry of llmsEntries) write(`site/public/llms/${entry.route}/llms.txt`, content(entry));
  for (const entry of skillEntries) write(`${skillRoot}/references/${entry.route}.md`, content(entry));
  const nav = [];
  for (const [type, { dir, name }] of Object.entries(types)) {
    const items = siteEntries.filter((entry) => entry.type === type);
    write(`site/${dir}/index.md`, `# ${name}一覧\n\n${items.length} 件。${note}\n\n${list(items, (entry) => `/${entry.route}`)}\n`);
    write(`${skillRoot}/references/${dir}.md`, `# ${name}一覧\n\n${list(skillEntries.filter((entry) => entry.type === type), (entry) => `${entry.route}.md`)}\n`);
    nav.push({ text: name, link: `/${dir}/`, items: items.map((entry) => ({ text: entry.meta.title, link: `/${entry.route}` })) });
  }
  for (const [directory, definitions, matches] of [
    ['topics', topics, (entry, slug) => entry.meta.topic === slug],
    ['tags', tags, (entry, slug) => entry.meta.tags.includes(slug)],
  ]) {
    write(`site/${directory}/index.md`, `# ${directory === 'topics' ? 'トピック' : 'タグ'}一覧\n\n${definitions.map((item) => `- [${item.name}](/${directory}/${item.slug})`).join('\n')}\n`);
    for (const item of definitions) {
      write(`site/${directory}/${item.slug}.md`, `# ${item.name}\n\n${list(siteEntries.filter((entry) => matches(entry, item.slug)), (entry) => `/${entry.route}`)}\n`);
    }
  }
  const count = (type) => siteEntries.filter((entry) => entry.type === type).length;
  const overview = `Microsoft Ignite 2026 は ${info.dates.start} から ${info.dates.end} に ${info.location} で開催。\n\n${info.scope}\n\n${note}`;
  write('site/index.md', `# ${info.event}\n\n${overview}\n\n## 注目する変化\n\nCopilot は会話から業務の実行へ、Microsoft IQ は組織の知識と手順の再利用へ進んでいます。Foundry の評価・最適化と Agent 365 の管理を組み合わせ、エージェントを本番で継続運用するための発表が中心です。\n\n## コンテンツを読む\n\n- [アナウンス](/announcements/) ${count('announcement')} 件\n- [セッション](/sessions/) ${count('session')} 件\n- [参考資料](/resources/) ${count('resource')} 件\n- [トピック別](/topics/)・[タグ別](/tags/)\n\n## AI エージェントで読む\n\n[llms.txt](/llms.txt) を情報源として指定するか、[リポジトリ](${info.repository}) の \`skills/${info.skill}/SKILL.md\` を使用してください。\n\n## 一次情報\n\n[Book of News](${info.urls.book_of_news}) と [公式基調講演録](${info.urls.keynote}) を起点に、各記事に根拠を記載しています。公式資料間で提供状況に差がある項目は記事内で明記しています。\n\n## このサイトについて\n\n[openjny/msbuild-2026](https://github.com/openjny/msbuild-2026) の配信形式を参考に、Ignite の一次情報から独自に要約しています。Microsoft の非公式キュレーションです。公開設定と手順は [README](${info.repository}#readme) を参照してください。\n`);
  json('site/.vitepress/nav.json', nav);
  write('site/public/llms.txt', `# ${info.event}\n\n> 日本語の非公式キュレーション。${info.scope}\n\n${note}\n\nGA、Preview、Private Preview、Frontier、提供予定を区別してください。セッション一覧は記載したカタログ条件に基づくスナップショットです。動画の内容要約や字幕全文は未収録です。各詳細記事の一次情報を引用し、記事にない仕様や価格を補完しないでください。\n\n## 公式情報\n\n- [Book of News](${info.urls.book_of_news})\n- [公式基調講演録](${info.urls.keynote})\n\n${Object.entries(types).map(([type, { name }]) => `## ${name}\n\n${list(llmsEntries.filter((entry) => entry.type === type), llmsUrl)}`).join('\n\n')}\n`);
  write(`${skillRoot}/SKILL.md`, `---\nname: ${info.skill}\ndescription: Microsoft Ignite 2026 の発表、基調講演、セッションカタログの動画・資料リンクを公式情報に基づいて調べる。Use for Ignite 2026, 2026ignite, Microsoft Ignite の新機能やトレンド調査。\n---\n\n# ${info.event} Info Hub\n\n${overview}\n\n## 調査手順\n\n1. 質問に対応する索引から関連記事を選び、詳細ファイルを読む。セッション検索では、カタログ記事のフィルター条件も確認する。\n2. 提供状況・注意点と確認日を確認し、GA と各種プレビュー、将来予定を分けて回答する。\n3. 回答には記事内の公式 URL を添える。実機検証と資料に基づく要約を区別する。\n4. 収録内容で裏付けられない点は追加確認事項として明示する。最新仕様や価格、カタログ条件外のセッション情報を推測しない。\n\n## コンテンツインデックス\n\n${Object.entries(types).map(([type, { dir, name }]) => `- [${name}一覧](references/${dir}.md) ${skillEntries.filter((entry) => entry.type === type).length} 件`).join('\n')}\n\n## 公式情報\n\n- [Book of News](${info.urls.book_of_news})\n- [基調講演録](${info.urls.keynote})\n`);
  json('plugin.json', {
    name: info.skill,
    version: '0.1.0',
    description: 'Microsoft Ignite 2026 の公式発表と基調講演の日本語キュレーション',
    skills: [`./${skillRoot}`],
  });
  json('site/public/.well-known/build-info.json', info);
  json('site/public/.well-known/docs-index.json', {
    event: info.event,
    last_verified: info.last_verified,
    entries: entries.map((entry) => ({
      id: entry.meta.id, title: entry.meta.title, summary: entry.meta.summary,
      content_type: entry.type, topic: entry.meta.topic, tags: entry.meta.tags,
      official_sources: entry.meta.official_sources, last_verified: entry.meta.last_verified,
      ...(delivered(entry, 'site') ? { url: absolute(entry) } : {}),
      ...(delivered(entry, 'llms') ? { llms: llmsUrl(entry) } : {}),
      ...(delivered(entry, 'skills') ? { skill_reference: `${skillRoot}/references/${entry.route}.md` } : {}),
    })),
  });
  return data;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const data = build();
  console.log(`Generated site, llms.txt, skill and indexes from ${data.entries.length} entries.`);
}
