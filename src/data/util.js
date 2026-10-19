import { tr } from './i18n.js';

/** Build a localized, trailing-slash path: lhref('sk', 'produkcia/') -> '/sk/produkcia/'. */
export const lhref = (lang, path = '') => `/${lang}/${path}`;

/** Localized path plus optional hash for in-page sections. */
export const lhash = (lang, path = '', hash = '') => `/${lang}/${path}${hash ? `#${hash}` : ''}`;

export const isExternal = (href) => /^https?:/.test(href);

export { tr };
