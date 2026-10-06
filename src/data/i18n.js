// UI strings for both languages. Content (projects, bio) lives in its own data files.
export const LANGS = ['en', 'sk'];
export const LANG_NAMES = { en: 'English', sk: 'Slovenčina' };

export const ui = {
  en: {
    skip: 'Skip to content', menu: 'Menu', theme: 'Switch theme', language: 'Language',
    nav: { home: 'Home', projects: 'Projects', art: 'Art & 3D', docs: 'Docs', about: 'About', contact: 'Contact', sitemap: 'Sitemap' },
    breadcrumbs: 'Breadcrumbs',
    footer: {
      blurb: 'Prompt engineer and 3D artist turning code, electronics and 3D models into objects that really work.',
      sitemap: 'Sitemap', elsewhere: 'Elsewhere', contact: 'Contact', explore: 'Explore',
      rights: 'Text and images © Ondrej Špánik unless stated otherwise. Source code of projects stays under the licence of its own repository.',
      top: 'Back to top', repoSnap: 'GitHub numbers snapshot',
    },
    notFound: { title: 'Page not found', text: 'This page does not exist (any more). The old Sapper site had a lot of URLs; try the projects instead.', home: 'Back home', projects: 'Browse projects' },
    docNote: 'This document is written in English only.',
    docNoteSk: 'This document is written in Slovak only.',
  },
  sk: {
    skip: 'Preskočiť na obsah', menu: 'Menu', theme: 'Prepnúť tému', language: 'Jazyk',
    nav: { home: 'Domov', projects: 'Projekty', art: 'Umenie a 3D', docs: 'Dokumentácia', about: 'O mne', contact: 'Kontakt', sitemap: 'Mapa stránok' },
    breadcrumbs: 'Omrvinková navigácia',
    footer: {
      blurb: 'Prompt inžinier a 3D umelec, ktorý mení kód, elektroniku a 3D modely na objekty, ktoré naozaj fungujú.',
      sitemap: 'Mapa stránok', elsewhere: 'Inde', contact: 'Kontakt', explore: 'Prehľadávať',
      rights: 'Texty a obrázky © Ondrej Špánik, ak nie je uvedené inak. Zdrojové kódy projektov podliehajú licencii ich vlastného repozitára.',
      top: 'Späť hore', repoSnap: 'Stav GitHubu k dátumu',
    },
    notFound: { title: 'Stránka sa nenašla', text: 'Táto stránka neexistuje (už). Stará Sapper stránka mala veľa adries; skús radšej projekty.', home: 'Späť domov', projects: 'Prehľadať projekty' },
    docNote: 'Tento dokument je dostupný iba v angličtine.',
    docNoteSk: 'Tento dokument je dostupný iba po slovensky.',
  },
};

/** Pick the string for a language from a { en, sk } pair (falls back to English). */
export const tr = (v, lang) => (v && typeof v === 'object' ? v[lang] ?? v.en : v);
