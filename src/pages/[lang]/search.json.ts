// Full-text search index for the Ctrl/Cmd+K palette: one JSON per language, fetched on first open.
// Each entry carries the title, a stable kind (`kt`, for grouping and icons), the visible kind label,
// the url, an optional subtitle, a keyword blob (`s`, matched but never shown) and body text (`b`,
// matched and used to build the snippet that shows where a query word was found).
import { LANGS, ui } from '../../data/i18n.js';
import { nav, fields, interests } from '../../data/site.js';
import { projects } from '../../data/projects.js';
import { docsFor, staticDocsFor, CATEGORIES } from '../../data/docs.js';
import { tr, lhref } from '../../data/util.js';

export const getStaticPaths = () => LANGS.map((lang) => ({ params: { lang } }));

// Strip the marked-rendered HTML down to readable plain text for indexing and snippets.
const ENT: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'", nbsp: ' ' };
const strip = (html: string) =>
  html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(p|h[1-6]|li|blockquote|pre|tr|div)>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&([a-z#0-9]+);/gi, (m, e) => ENT[e.toLowerCase()] ?? m)
    .replace(/\s+/g, ' ')
    .trim();

type Item = { t: string; kt: 'page' | 'project' | 'doc'; k: string; u: string; d?: string; s?: string; b?: string };

export function GET({ params }: { params: { lang: string } }) {
  const lang = params.lang;
  const T = ui[lang].nav;
  const label = (en: string, sk: string) => (lang === 'sk' ? sk : en);
  // short, searchable blurbs for the handful of pages that have no body of their own
  const pageHint: Record<string, string> = {
    projects: label('Portfolio of software, hardware, AI and design work.', 'Portfólio softvérových, hardvérových, AI a dizajnových prác.'),
    art: label('3D models, animation and illustration.', '3D modely, animácia a ilustrácia.'),
    docs: label('Guides, logs, research and recipes.', 'Návody, zápisky, výskum a recepty.'),
    about: label('Who I am, what I do and how I work.', 'Kto som, čo robím a ako pracujem.'),
    contact: label('Get in touch: email and social links.', 'Ozvi sa: email a odkazy na siete.'),
  };

  const items: Item[] = [
    { t: T.home, kt: 'page', k: label('Page', 'Stránka'), u: lhref(lang), s: label('home start landing', 'domov úvod začiatok') },
    ...nav.map((n) => ({ t: T[n.key], kt: 'page' as const, k: label('Page', 'Stránka'), u: lhref(lang, n.path), d: pageHint[n.key], s: pageHint[n.key] ?? '' })),
    { t: T.sitemap, kt: 'page', k: label('Page', 'Stránka'), u: lhref(lang, 'sitemap/'), s: label('all pages index', 'všetky stránky index') },

    ...projects.map((p) => ({
      t: tr(p.title, lang),
      kt: 'project' as const,
      k: label('Project', 'Projekt'),
      u: lhref(lang, `projects/${p.id}/`),
      d: tr(p.tag, lang),
      b: tr(p.desc, lang),
      s: [
        p.language,
        ...(p.tools ?? []),
        ...p.fields.map((f: string) => tr(fields[f]?.label, lang)),
        ...p.interests.map((i: string) => tr(interests[i]?.label, lang)),
      ]
        .filter(Boolean)
        .join(' '),
    })),

    ...docsFor(lang).map((d) => {
      const cat = tr(CATEGORIES[d.category], lang) || '';
      return {
        t: d.title,
        kt: 'doc' as const,
        k: label('Doc', 'Dokument'),
        u: lhref(lang, `docs/${d.slug}/`),
        d: d.desc || cat,
        s: [...d.tags, cat].filter(Boolean).join(' '),
        b: strip(d.html).slice(0, 4000),
      };
    }),

    ...staticDocsFor(lang).map((d) => ({ t: d.title, kt: 'doc' as const, k: label('Doc', 'Dokument'), u: d.href, d: d.desc, s: d.tag })),
  ];

  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
}
