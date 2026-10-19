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
    nav: { home: 'Domov', show: 'Show', gallery: 'Galéria', production: 'Video produkcia', booking: 'Booking', sitemap: 'Mapa stránok' },
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
    sitemap: {
      title: 'Mapa stránok',
      intro: 'Všetky stránky webu StrukShow v oboch jazykoch.',
      langs: 'Jazykové verzie',
    },
    form: {
      name: 'Meno',
      email: 'E-mail',
      phone: 'Telefón (nepovinné)',
      event: 'Typ a dátum podujatia (nepovinné)',
      message: 'Správa',
      namePh: 'Vaše meno',
      emailPh: 'vas@email.sk',
      phonePh: '+421 …',
      eventPh: 'napr. firemný večierok, 14. 12. 2026',
      messagePh: 'Napíšte nám o vašom podujatí…',
      send: 'Odoslať dopyt',
      sending: 'Odosielam…',
      success: 'Ďakujeme! Vaša správa bola odoslaná. Ozveme sa čo najskôr.',
      error: 'Správu sa nepodarilo odoslať. Napíšte nám prosím priamo na',
      subject: 'Nový dopyt zo StrukShow webu',
    },
  },
  en: {
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    bookNow: 'Book the show',
    nav: { home: 'Home', show: 'Show', gallery: 'Gallery', production: 'Video production', booking: 'Booking', sitemap: 'Sitemap' },
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
    sitemap: {
      title: 'Sitemap',
      intro: 'Every page of the StrukShow site, in both languages.',
      langs: 'Language versions',
    },
    form: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone (optional)',
      event: 'Event type & date (optional)',
      message: 'Message',
      namePh: 'Your name',
      emailPh: 'you@email.com',
      phonePh: '+421 …',
      eventPh: 'e.g. corporate party, 14 Dec 2026',
      messagePh: 'Tell us about your event…',
      send: 'Send enquiry',
      sending: 'Sending…',
      success: 'Thank you! Your message has been sent. We will get back to you shortly.',
      error: 'The message could not be sent. Please email us directly at',
      subject: 'New enquiry from the StrukShow site',
    },
  },
};

/** Pick the string for a language from a { sk, en } pair (falls back to Slovak, then English). */
export const tr = (v, lang) => (v && typeof v === 'object' ? v[lang] ?? v.sk ?? v.en : v);
