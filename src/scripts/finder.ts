// Client-side portfolio finder: facets are OR within a group and AND across groups.
// State lives in the query string so a filtered view can be shared or bookmarked.
type Facet = 'field' | 'lang' | 'interest';
const FACETS: Facet[] = ['field', 'lang', 'interest'];

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

  const selected = (f: Facet) => [...root.querySelectorAll<HTMLInputElement>(`input[name=${f}]:checked`)].map((i) => i.value);
  const cardVals = (c: HTMLElement, f: Facet): string[] =>
    f === 'field' ? (c.dataset.fields ?? '').split(' ') : f === 'interest' ? (c.dataset.interests ?? '').split(' ') : [c.dataset.lang ?? ''];

  const passes = (c: HTMLElement, sel: Record<Facet, string[]>, text: string, skip?: Facet) => {
    for (const f of FACETS) {
      if (f === skip || !sel[f].length) continue;
      const v = cardVals(c, f);
      if (!sel[f].some((s) => v.includes(s))) return false;
    }
    if (starred.on && Number(c.dataset.stars) < 1) return false;
    return !text || text.split(/\s+/).every((w) => (c.dataset.search ?? '').includes(w));
  };

  const sorters: Record<string, (a: HTMLElement, b: HTMLElement) => number> = {
    stars: (a, b) => Number(b.dataset.stars) - Number(a.dataset.stars) || Number(b.dataset.year) - Number(a.dataset.year),
    new: (a, b) => Number(b.dataset.year) - Number(a.dataset.year) || Number(b.dataset.stars) - Number(a.dataset.stars),
    old: (a, b) => Number(a.dataset.year) - Number(b.dataset.year) || Number(b.dataset.stars) - Number(a.dataset.stars),
    name: (a, b) => (a.dataset.name ?? '').localeCompare(b.dataset.name ?? ''),
  };
  const original = cards.map((c) => c); // server order = stars desc, then newest

  function render(pushUrl = true) {
    const sel = { field: selected('field'), lang: selected('lang'), interest: selected('interest') };
    const text = q.value.trim().toLowerCase();
    const order = sortEl.value === 'stars' ? original : [...cards].sort(sorters[sortEl.value]);
    order.forEach((c, i) => { c.style.order = String(i); });
    let shown = 0;
    for (const c of cards) { const ok = passes(c, sel, text); c.hidden = !ok; if (ok) shown++; }

    // availability counts: how many results each option would give with the other groups applied
    for (const f of FACETS) {
      const counts = new Map<string, number>();
      for (const c of cards) if (passes(c, sel, text, f)) for (const v of cardVals(c, f)) if (v) counts.set(v, (counts.get(v) ?? 0) + 1);
      root.querySelectorAll<HTMLInputElement>(`input[name=${f}]`).forEach((i) => {
        const n = counts.get(i.value) ?? 0;
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
      if (starred.on) active.push(['★', null, 'starred']);
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
  sortEl.value = sorters[url.get('sort') ?? ''] ? url.get('sort')! : 'stars';
  apply(init);

  inputs.forEach((i) => i.addEventListener('change', () => render()));
  q.addEventListener('input', () => render());
  sortEl.addEventListener('change', () => render());
  root.querySelectorAll<HTMLElement>('[data-preset]').forEach((b) => b.addEventListener('click', () => { q.value = ''; apply(JSON.parse(b.dataset.preset!)); }));
  root.querySelector('[data-clear]')!.addEventListener('click', () => { q.value = ''; sortEl.value = 'stars'; apply({}); });
}
