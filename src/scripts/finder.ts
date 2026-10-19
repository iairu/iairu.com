// Client-side portfolio finder: facets are OR within a group and AND across groups.
// Filtering runs against a precomputed index (membership per facet value and each sort order),
// baked in at deploy time, so a click resolves by set lookup instead of re-scanning the DOM.
// State lives in the query string so a filtered view can be shared or bookmarked.
type Facet = 'field' | 'lang' | 'interest';
const FACETS: Facet[] = ['field', 'lang', 'interest'];
type IdList = Record<string, string[]>;
interface FinderIndex { order: Record<string, string[]>; field: IdList; lang: IdList; interest: IdList; starred: string[]; }

export function initFinder(root: HTMLElement) {
  const q = root.querySelector<HTMLInputElement>('[data-q]')!;
  const sortEl = root.querySelector<HTMLSelectElement>('[data-sort]')!;
  const list = root.querySelector<HTMLElement>('[data-list]')!;
  const cards = [...list.querySelectorAll<HTMLElement>('.card')];
  const status = root.querySelector<HTMLElement>('[data-status]')!;
  const remark = root.querySelector<HTMLElement>('[data-remark]')!;
  const empty = root.querySelector<HTMLElement>('[data-empty]')!;
  const tryBox = root.querySelector<HTMLElement>('[data-try]')!;
  const S = root.dataset;
  const inputs = root.querySelectorAll<HTMLInputElement>('input[type=checkbox]');
  const starred = { on: false };

  const index: FinderIndex = JSON.parse(root.dataset.index!);
  const cardById = new Map<string, HTMLElement>(cards.map((c) => [c.dataset.id!, c]));
  const allIds = index.order.stars;
  const allSet = new Set(allIds);

  const selected = (f: Facet) => [...root.querySelectorAll<HTMLInputElement>(`input[name=${f}]:checked`)].map((i) => i.value);
  const intersect = (a: Set<string>, b: Set<string>) => {
    const [small, large] = a.size < b.size ? [a, b] : [b, a];
    const r = new Set<string>();
    for (const x of small) if (large.has(x)) r.add(x);
    return r;
  };
  const union = (f: Facet, vals: string[]) => {
    const u = new Set<string>();
    for (const v of vals) for (const id of index[f][v] ?? []) u.add(id);
    return u;
  };

  // The set of project ids that pass every active filter, optionally ignoring one facet (for counts).
  function matching(sel: Record<Facet, string[]>, text: string, skip?: Facet): Set<string> {
    let set: Set<string> | null = null;
    for (const f of FACETS) {
      if (f === skip || !sel[f].length) continue;
      set = set ? intersect(set, union(f, sel[f])) : union(f, sel[f]);
    }
    if (starred.on) set = set ? intersect(set, new Set(index.starred)) : new Set(index.starred);
    if (text) {
      const words = text.split(/\s+/);
      const out = new Set<string>();
      for (const id of set ?? allSet) { const s = cardById.get(id)?.dataset.search ?? ''; if (words.every((w) => s.includes(w))) out.add(id); }
      set = out;
    }
    return set ?? allSet;
  }

  // Grid order only changes when the sort does, so filtering never triggers a reflow from re-ordering.
  let appliedSort = '';
  function applyOrder(sort: string) {
    if (sort === appliedSort) return;
    (index.order[sort] ?? index.order.stars).forEach((id, i) => { const c = cardById.get(id); if (c) c.style.order = String(i); });
    appliedSort = sort;
  }

  function render(pushUrl = true) {
    const sel = { field: selected('field'), lang: selected('lang'), interest: selected('interest') };
    const text = q.value.trim().toLowerCase();
    applyOrder(sortEl.value);
    const show = matching(sel, text);
    let shown = 0;
    for (const c of cards) { const ok = show.has(c.dataset.id!); c.hidden = !ok; if (ok) shown++; }

    // availability counts: how many results each option would give with the other groups applied
    for (const f of FACETS) {
      const base = matching(sel, text, f);
      root.querySelectorAll<HTMLInputElement>(`input[name=${f}]`).forEach((i) => {
        let n = 0; for (const id of index[f][i.value] ?? []) if (base.has(id)) n++;
        const label = i.closest('.chip')!;
        label.querySelector('i')!.textContent = String(n);
        label.classList.toggle('dim', n === 0 && !i.checked);
      });
    }

    status.textContent = S.sCount!.replace('{n}', String(shown)).replace('{t}', S.all!);
    const notes: string[] = [];
    if (sel.lang.length) notes.push(S.sLangHide!);
    if (sortEl.value === 'stars') notes.push(S.sStars!);
    remark.textContent = notes.join(' ');
    remark.hidden = !notes.length;

    empty.hidden = shown > 0;
    if (!shown) {
      tryBox.replaceChildren();
      const active: [string, HTMLInputElement | null, string][] = [];
      root.querySelectorAll<HTMLInputElement>('input:checked').forEach((i) => active.push([i.closest('.chip')!.querySelector('span')!.textContent!, i, '']));
      if (text) active.push([`“${q.value.trim()}”`, null, 'q']);
      if (starred.on) active.push([root.dataset.sStarred || 'starred', null, 'starred']);
      for (const [label, input, kind] of active) {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'chip on'; b.textContent = `× ${label}`;
        b.onclick = () => { if (input) input.checked = false; else if (kind === 'q') q.value = ''; else starred.on = false; render(); };
        tryBox.append(b);
      }
    }
    if (pushUrl) {
      const p = new URLSearchParams();
      for (const f of FACETS) if (sel[f].length) p.set(f, sel[f].join(','));
      if (text) p.set('q', q.value.trim());
      if (starred.on) p.set('starred', '1');
      if (sortEl.value !== 'stars') p.set('sort', sortEl.value);
      const qs = p.toString();
      history.replaceState(null, '', location.pathname + (qs ? `?${qs}` : '') + location.hash);
    }
  }

  function apply(set: { field?: string[]; lang?: string[]; interest?: string[]; starred?: boolean }) {
    inputs.forEach((i) => { i.checked = false; });
    starred.on = !!set.starred;
    for (const f of FACETS) for (const v of set[f] ?? []) {
      const i = root.querySelector<HTMLInputElement>(`input[name=${f}][value="${CSS.escape(v)}"]`);
      if (i) i.checked = true;
    }
    render();
  }

  // restore from URL
  const url = new URLSearchParams(location.search);
  const init: any = { starred: url.get('starred') === '1' };
  for (const f of FACETS) init[f] = (url.get(f) ?? '').split(',').filter(Boolean);
  q.value = url.get('q') ?? '';
  sortEl.value = index.order[url.get('sort') ?? ''] ? url.get('sort')! : 'stars';
  apply(init);

  inputs.forEach((i) => i.addEventListener('change', () => render()));
  q.addEventListener('input', () => render());
  sortEl.addEventListener('change', () => render());
  root.querySelectorAll<HTMLElement>('[data-preset]').forEach((b) => b.addEventListener('click', () => { q.value = ''; apply(JSON.parse(b.dataset.preset!)); }));
  root.querySelector('[data-clear]')!.addEventListener('click', () => { q.value = ''; sortEl.value = 'stars'; apply({}); });
}
