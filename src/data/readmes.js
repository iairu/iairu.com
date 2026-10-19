// READMEs snapshotted from GitHub by `npm run readmes` (scripts/fetch-readmes.mjs), rendered to
// HTML at build time. Relative links and images are rewritten to absolute GitHub URLs so they
// resolve off-site. One markdown file per project id in ./readmes/.
import { marked } from 'marked';
import { byId } from './projects.js';
import meta from './readmes.json';

const files = import.meta.glob('./readmes/*.md', { query: '?raw', import: 'default', eager: true });

export const readmeSyncDate = meta.synced;

// Point relative paths at the repo: images to raw.githubusercontent.com, links to the repo tree.
function absolutise(html, repoUrl) {
  if (!repoUrl) return html;
  const base = repoUrl.replace(/\/+$/, '');
  const rawBase = base.replace('github.com', 'raw.githubusercontent.com');
  const fix = (url, img) => {
    if (/^(https?:)?\/\//i.test(url) || /^(#|mailto:|tel:|data:)/i.test(url)) return url;
    const path = url.replace(/^\.?\/+/, '');
    return img ? `${rawBase}/HEAD/${path}` : `${base}/blob/HEAD/${path}`;
  };
  return html
    .replace(/(<img\b[^>]*?\ssrc=)(["'])(.*?)\2/gi, (_, pre, q, u) => `${pre}${q}${fix(u, true)}${q}`)
    .replace(/(<a\b[^>]*?\shref=)(["'])(.*?)\2/gi, (_, pre, q, u) => `${pre}${q}${fix(u, false)}${q}`);
}

const rendered = Object.fromEntries(Object.entries(files).map(([path, raw]) => {
  const id = path.split('/').pop().replace(/\.md$/, '');
  return [id, absolutise(marked.parse(raw.replace(/^﻿/, '')), byId[id]?.repoUrl)];
}));

export const readmeFor = (id) => rendered[id] ?? null;
