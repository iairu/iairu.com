// Search index for the Ctrl/Cmd+K palette: one small JSON per language, fetched on first open.
import { LANGS, ui } from '../../data/i18n.js';
import { nav } from '../../data/site.js';
import { projects } from '../../data/projects.js';
import { docsFor, staticDocsFor } from '../../data/docs.js';
import { tr, lhref } from '../../data/util.js';

export const getStaticPaths = () => LANGS.map((lang) => ({ params: { lang } }));

export function GET({ params }: { params: { lang: string } }) {
  const lang = params.lang;
  const T = ui[lang].nav;
  const kind = (en: string, sk: string) => (lang === 'sk' ? sk : en);
  const items = [
    { t: T.home, k: kind('Page', 'Stránka'), u: lhref(lang), s: '' },
    ...nav.map((n) => ({ t: T[n.key], k: kind('Page', 'Stránka'), u: lhref(lang, n.path), s: '' })),
    { t: T.sitemap, k: kind('Page', 'Stránka'), u: lhref(lang, 'sitemap/'), s: '' },
    ...projects.map((p) => ({
      t: tr(p.title, lang), k: kind('Project', 'Projekt'), u: lhref(lang, `projects/${p.id}/`), d: tr(p.tag, lang),
      s: [tr(p.desc, lang), p.language, ...(p.tools ?? []), ...p.fields, ...p.interests].filter(Boolean).join(' '),
    })),
    ...docsFor(lang).map((d) => ({ t: d.title, k: kind('Doc', 'Dokument'), u: lhref(lang, `docs/${d.slug}/`), d: d.desc, s: d.tags.join(' ') })),
    ...staticDocsFor(lang).map((d) => ({ t: d.title, k: kind('Doc', 'Dokument'), u: d.href, d: d.desc, s: d.tag })),
  ];
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
}
