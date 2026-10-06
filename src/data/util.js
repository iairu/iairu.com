import { tr } from './i18n.js';
export const lhref = (lang, path = '') => `/${lang}/${path}`;
/** Resolve link hrefs from project data: "doc:slug" becomes the docs page in the current language. */
export const resolveHref = (href, lang) => (href.startsWith('doc:') ? lhref(lang, `docs/${href.slice(4)}/`) : href);
export const isExternal = (href) => /^https?:/.test(href);
export const fmtStars = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));
export { tr };
