// Long-form write-ups (markdown in src/content/docs) plus other documentation hosted as static files.
import { marked } from 'marked';

const files = import.meta.glob('../content/docs/*.md', { query: '?raw', import: 'default', eager: true });

function parse([path, raw]) {
  const file = path.split('/').pop();
  const src = raw.replace(/^﻿/, '');
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta = {};
  for (const line of (m ? m[1] : '').split(/\r?\n/)) {
    const k = line.match(/^(\w+):\s*(.*)$/);
    if (k) meta[k[1]] = k[2].trim();
  }
  const [, lang, slug] = file.match(/^([a-z]{2})_(.+)\.md$/);
  return { slug, lang, title: meta.title, desc: meta.desc || '', date: (meta.date || '').slice(0, 10), tags: (meta.tags || '').split(/\s*,\s*/).filter(Boolean), html: marked.parse(m ? m[2] : src) };
}

// Slugs whose original was written in English; every other write-up was originally Slovak.
// Each write-up exists in both languages (the other one translated), and each site lists only its own.
const ORIGINAL_EN = new Set(['iptables-portforward']);
const all = Object.entries(files).map(parse).sort((a, b) => b.date.localeCompare(a.date));
export const docsFor = (lang) => all.filter((d) => d.lang === lang).map((d) => ({ ...d, translated: ORIGINAL_EN.has(d.slug) ? lang !== 'en' : lang !== 'sk' }));

// Other documentation that is not markdown. `lang` is the language the file is written in;
// each site lists only the files in its own language.
const S = [
  { lang: 'sk', title: 'Vývojárska dokumentácia StrukShow', desc: 'Hierarchia, CockpitCMS, Svelte, výkon, SEO a nasadenie kompletného webu.', href: '/strukshow-docs/', tag: 'HTML' },
  { lang: 'en', title: 'PostgreSQL REST API (static demo)', desc: 'Snapshot of the Django REST API responses.', href: '/dbs/', tag: 'HTML' },
  { lang: 'sk', title: 'Save the Princess: dokumentácia', desc: 'Návrh a opis MVC prehliadačovej hry.', href: '/dl/save-the-princess.pdf', tag: 'PDF' },
  { lang: 'sk', title: 'Inštalácia Linuxu', desc: 'Distribúcie, snapshoty, partície a inštalácia Debianu krok za krokom.', href: '/dl/linux-install.pdf', tag: 'PDF' },
  { lang: 'sk', title: 'Linux a HTTP', desc: 'Inštalácia Apache a WordPress: adresy, stránky a konfigurácia.', href: '/dl/linux-http.pdf', tag: 'PDF' },
  { lang: 'sk', title: 'Linux príkazy: tahák', desc: 'Jednostránkový prehľad bežných príkazov.', href: '/dl/linux-prikazy.svg', tag: 'SVG' },
  { lang: 'sk', title: 'Seminárna práca', desc: 'Písaná seminárna práca z FIIT STU.', href: '/dl/seminarka.pdf', tag: 'PDF' },
  { lang: 'en', title: 'NightJar.Gift documentation (KNIFES)', desc: 'Build log, board versions and project management of the wooden nightjar.', href: 'https://knifes.nightjar.gift', tag: 'external' },
];
export const staticDocsFor = (lang) => S.filter((d) => d.lang === lang);
