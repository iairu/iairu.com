// UI strings for both languages. Slovak is the primary audience, English the international one.
// Page content (bio, testimonials, stats) lives in content.js; this file is only the chrome.
export const LANGS = ['sk', 'en'];
export const LANG_NAMES = { sk: 'Slovenčina', en: 'English' };

export const ui = {
  sk: {
    skip: 'Preskočiť na obsah',
    menu: 'Menu',
    close: 'Zavrieť',
    language: 'Jazyk',
    bookNow: 'Rezervovať show',
    nav: { home: 'Domov', show: 'Show', gallery: 'Galéria', production: 'Video produkcia', booking: 'Booking' },
    footer: {
      tagline: 'Moderná kúzelnícka show pre firemné eventy, galavečery a exkluzívne podujatia.',
      navTitle: 'Navigácia',
      followTitle: 'Sledujte',
      contactTitle: 'Kontakt',
      rights: 'Všetky práva vyhradené.',
      credits: 'Ikony v procese: smashicons.com.',
      top: 'Späť hore',
    },
    notFound: {
      title: 'Stránka sa nenašla',
      text: 'Táto stránka neexistuje. Vráťte sa domov a pozrite si show.',
      home: 'Späť domov',
    },
    galleryHint: 'Kliknutím zväčšíte',
  },
  en: {
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    bookNow: 'Book the show',
    nav: { home: 'Home', show: 'Show', gallery: 'Gallery', production: 'Video production', booking: 'Booking' },
    footer: {
      tagline: 'A modern magic show for corporate events, galas and exclusive occasions.',
      navTitle: 'Navigation',
      followTitle: 'Follow',
      contactTitle: 'Contact',
      rights: 'All rights reserved.',
      credits: 'Process icons: smashicons.com.',
      top: 'Back to top',
    },
    notFound: {
      title: 'Page not found',
      text: 'This page does not exist. Head back home and watch the show.',
      home: 'Back home',
    },
    galleryHint: 'Click to enlarge',
  },
};

/** Pick the string for a language from a { sk, en } pair (falls back to Slovak, then English). */
export const tr = (v, lang) => (v && typeof v === 'object' ? v[lang] ?? v.sk ?? v.en : v);
