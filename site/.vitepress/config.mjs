import { readFileSync } from 'node:fs';
import { defineConfig } from 'vitepress';

const info = JSON.parse(readFileSync(new URL('../../content/build-info.json', import.meta.url), 'utf8'));
const sidebar = JSON.parse(readFileSync(new URL('./nav.json', import.meta.url), 'utf8'));

export default defineConfig({
  lang: 'ja-JP',
  title: info.event,
  description: 'Microsoft Ignite 2026 の主要発表と基調講演を公式情報に基づいて日本語で整理',
  base: info.site_base,
  head: [
    ['script', {}, `(() => { const param = new URLSearchParams(window.location.search).get("scoutTheme"); const theme = param || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); document.documentElement.setAttribute("data-theme", theme); })();`],
  ],
  appearance: false,
  themeConfig: {
    nav: [
      { text: 'アナウンス', link: '/announcements/' },
      { text: 'セッション', link: '/sessions/' },
      { text: 'トピック', link: '/topics/' },
      { text: 'AI 向け', link: `${info.site_base}llms.txt` },
    ],
    sidebar,
    search: { provider: 'local' },
    outline: { label: 'このページ', level: [2, 3] },
    socialLinks: [{ icon: 'github', link: info.repository }],
    footer: { message: `非公式の日本語要約。確認日 ${info.last_verified}。仕様・条件は各記事の一次情報を確認してください。` },
  },
});
