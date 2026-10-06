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

// the comics pages are galleries and now live under /projects/comics/
export const docs = Object.entries(files).filter(([f]) => !/comics|komixy/.test(f)).map(parse).sort((a, b) => b.date.localeCompare(a.date));

// other documentation that is not markdown
export const staticDocs = [
  { title: { en: 'StrukShow developer docs', sk: 'Vývojárska dokumentácia StrukShow' }, desc: { en: 'Hierarchy, CockpitCMS, Svelte, performance, SEO and deployment of a complete website.', sk: 'Hierarchia, CockpitCMS, Svelte, výkon, SEO a nasadenie kompletného webu.' }, href: '/strukshow-docs/', tag: 'HTML' },
  { title: { en: 'PostgreSQL REST API (static demo)', sk: 'PostgreSQL REST API (statické demo)' }, desc: { en: 'Snapshot of the Django REST API responses.', sk: 'Snímka odpovedí Django REST API.' }, href: '/dbs/', tag: 'HTML' },
  { title: { en: 'Save the Princess: documentation', sk: 'Save the Princess: dokumentácia' }, desc: { en: 'Design and MVC description of the browser game (Slovak).', sk: 'Návrh a opis MVC prehliadačovej hry.' }, href: '/dl/save-the-princess.pdf', tag: 'PDF · SK' },
  { title: { en: 'Linux installation guide', sk: 'Inštalácia Linuxu' }, desc: { en: 'Step by step installation notes (Slovak).', sk: 'Postup inštalácie krok za krokom.' }, href: '/dl/linux-install.pdf', tag: 'PDF · SK' },
  { title: { en: 'Linux and HTTP', sk: 'Linux a HTTP' }, desc: { en: 'Notes on how HTTP works from the Linux side (Slovak).', sk: 'Poznámky o tom, ako funguje HTTP z pohľadu Linuxu.' }, href: '/dl/linux-http.pdf', tag: 'PDF · SK' },
  { title: { en: 'Linux commands cheat sheet', sk: 'Linux príkazy: tahák' }, desc: { en: 'One-page overview of everyday commands.', sk: 'Jednostránkový prehľad bežných príkazov.' }, href: '/dl/linux-prikazy.svg', tag: 'SVG' },
  { title: { en: 'Right to repair: presentation', sk: 'Právo na opravu: prezentácia' }, desc: { en: 'Slides arguing for repairable electronics.', sk: 'Prezentácia o oprave elektroniky.' }, href: '/dl/right-to-repair-prez.pdf', tag: 'PDF' },
  { title: { en: 'Seminar paper', sk: 'Seminárna práca' }, desc: { en: 'Written university seminar paper.', sk: 'Písaná seminárna práca z vysokej školy.' }, href: '/dl/seminarka.pdf', tag: 'PDF' },
  { title: { en: 'LELEK documentation (KNIFES)', sk: 'Dokumentácia LELEK (KNIFES)' }, desc: { en: 'Build log, board versions and project management of the wooden nightjar.', sk: 'Zápisník, verzie dosiek a riadenie projektu drevenej lelka.' }, href: 'https://knifes.nightjar.gift', tag: 'external' },
];
