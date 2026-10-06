// Generates a 960x540 thumbnail for every project that has no picture of its own
// (public/img/thumbs/<id>.jpg). Each one is a stylised "workbench" scene: a code window in the
// project's language next to a motif for its area of interest. Deterministic: same input, same image.
//
// Needs Playwright (not a project dependency):  npm i --no-save playwright && npx playwright install chromium
//   node scripts/make-thumbs.mjs [id ...]      (no ids = all projects without an image)
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { chromium } from 'playwright';

const root = new URL('../', import.meta.url);
const tmp = new URL('scripts/.projects.tmp.mjs', root);
writeFileSync(tmp, readFileSync(new URL('src/data/projects.js', root), 'utf8')
  .replace(/import snapshot from '\.\/repos\.json';/, `const snapshot = JSON.parse(${JSON.stringify(readFileSync(new URL('src/data/repos.json', root), 'utf8'))});`));
const { projects } = await import(tmp.href);
rmSync(tmp);

const COLOR = { cyan: '#3fe0d0', copper: '#ff9a52', pink: '#ff74b8', violet: '#b199ff', lime: '#bde75e', amber: '#ffcf5a' };
const FIELD_COLOR = { ai: 'violet', software: 'cyan', hardware: 'copper', art3d: 'pink', design: 'lime', systems: 'amber' };
const FIELD_LABEL = { ai: 'AI', software: 'SOFTWARE', hardware: 'ELECTRONICS', art3d: '3D', design: 'DESIGN', systems: 'SYSTEMS' };
const MOTIF = { web: 'browser', automation: 'keys', maker: 'circuit', visual: 'mesh', brand: 'mesh', data: 'neural', infra: 'network', games: 'grid', audio: 'wave', learning: 'mesh' };

const font = (p) => readFileSync(new URL(`node_modules/${p}`, root)).toString('base64');
const FONTS = `
@font-face{font-family:B;src:url(data:font/woff2;base64,${font('@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2')});font-weight:200 800;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC}
@font-face{font-family:B;src:url(data:font/woff2;base64,${font('@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-ext-wght-normal.woff2')});font-weight:200 800;unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:M;src:url(data:font/woff2;base64,${font('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2')})}
@font-face{font-family:M;font-weight:500;src:url(data:font/woff2;base64,${font('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2')})}`;

function rng(seed) { let h = 1779033703 ^ seed.length; for (const c of seed) { h = Math.imul(h ^ c.charCodeAt(0), 3432918353); h = (h << 13) | (h >>> 19); } return () => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; }; }

const CODE = {
  C: ['#include <stdio.h>', '', 'int main(int argc, char **argv) {', '  for (int i = 1; i < argc; i++) {', '    printf("%s\\n", argv[i]);', '  }', '  return 0;', '}'],
  'C++': ['#include <vector>', 'template <typename T>', 'struct Node {', '  T value;', '  std::vector<Node*> next;', '};', 'void update(float dt) {', '  pos += vel * dt;', '}'],
  'C#': ['public class Startup {', '  public void Configure(IApplicationBuilder app) {', '    app.UseRouting();', '    app.UseEndpoints(e => {', '      e.MapControllers();', '    });', '  }', '}'],
  Python: ['import numpy as np', '', 'def fit(points, k=3):', '    centers = points[:k].copy()', '    for _ in range(50):', '        d = np.linalg.norm(points[:, None] - centers, axis=2)', '        centers = np.array([points[d.argmin(1) == i].mean(0) for i in range(k)])', '    return centers'],
  'Python (notebook)': ['import dspy', '', 'class RAG(dspy.Module):', '    def __init__(self):', '        self.retrieve = dspy.Retrieve(k=3)', '        self.answer = dspy.ChainOfThought("context, question -> answer")', '    def forward(self, question):', '        return self.answer(context=self.retrieve(question).passages, question=question)'],
  JavaScript: ['const app = document.querySelector("#app");', '', 'async function load(url) {', '  const res = await fetch(url);', '  if (!res.ok) throw new Error(res.status);', '  return res.json();', '}', 'load("/api/items").then(render);'],
  TypeScript: ['export default {', '  name: "Ask Gemini",', '  actions: [{', '    code: async (input: Input) => {', '      const reply = await ask(input.text);', '      popclip.pasteText(reply);', '    },', '  }],', '};'],
  Svelte: ['<script>', '  let todos = [];', '  $: open = todos.filter((t) => !t.done);', '</script>', '', '{#each open as t (t.id)}', '  <li on:click={() => (t.done = true)}>{t.text}</li>', '{/each}'],
  Java: ['public class CoffeeMachine {', '  private int water = 400, milk = 540, beans = 120;', '  void make(Drink d) {', '    if (water < d.water) { System.out.println("Sorry, not enough water!"); return; }', '    water -= d.water;', '  }', '}'],
  PHP: ['<?php', 'Route::get("/cats/{cat}", function (Cat $cat) {', '    return view("cats.show", [', '        "cat" => $cat,', '        "coi" => $cat->inbreeding(),', '    ]);', '});'],
  Shell: ['#!/bin/sh', 'set -eu', 'APP="$1"', 'DEST="$HOME/Applications/${APP}.app"', 'mkdir -p "$DEST/Contents/MacOS"', 'printf "%s\\n" "open -a Safari" > "$DEST/run"', 'chmod +x "$DEST/run"'],
  Assembly: ['.model small', '.stack 100h', '.data', '  buf db 128 dup(?)', '.code', 'main proc', '  mov ax, @data', '  mov ds, ax', '  mov ah, 3Fh', '  int 21h', 'main endp'],
  AutoHotkey: ['#NoEnv', '#SingleInstance Force', '^!p::', '  WinGet, id, ID, A', '  WinMove, ahk_id %id%,, 0, 0, 1920, 1080', '  Send, {F5}', 'return'],
  Swift: ['struct NewsView: View {', '  @StateObject var model = NewsModel()', '  var body: some View {', '    List(model.items) { item in', '      Text(item.title)', '    }.task { await model.load() }', '  }', '}'],
  Astro: ['---', 'import Base from "../layouts/Base.astro";', 'const { lang } = Astro.params;', '---', '<Base lang={lang} title="Projects">', '  <h1>Where the mesh meets the circuit</h1>', '</Base>'],
  HTML: ['<!doctype html>', '<html lang="en">', '<head><title>Docs</title></head>', '<body>', '  <main id="app">', '    <h1>Hello, world</h1>', '  </main>', '</body>'],
};
const EXT = { C: 'c', 'C++': 'cpp', 'C#': 'cs', Python: 'py', 'Python (notebook)': 'ipynb', JavaScript: 'js', TypeScript: 'ts', Svelte: 'svelte', Java: 'java', PHP: 'php', Shell: 'sh', Assembly: 'asm', AutoHotkey: 'ahk', Swift: 'swift', Astro: 'astro', HTML: 'html' };
const KW = 'import|from|def|class|return|for|in|if|else|const|let|var|async|await|function|export|default|struct|template|typename|public|private|void|int|float|char|static|new|throw|mov|proc|endp|include|using|set|each|then|use|try|extends|self|None|True|False';
const TOKEN = new RegExp(`("[^"]*"|'[^']*')|(\\b\\d+\\b)|(\\b(?:${KW})\\b)`, 'g');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function hl(line) {
  const m = line.match(/^(\s*)(\/\/.*|#(?!include).*|;.*|--.*)$/);
  if (m) return `${esc(m[1])}<i class="c">${esc(m[2])}</i>`;
  let out = '', last = 0;
  for (const t of line.matchAll(TOKEN)) {
    out += esc(line.slice(last, t.index)) + `<i class="${t[1] ? 's' : t[2] ? 'n' : 'k'}">${esc(t[0])}</i>`;
    last = t.index + t[0].length;
  }
  return out + esc(line.slice(last));
}

// ---- motifs (SVG, 400 x 400) ----
function motif(kind, color, r) {
  const o = [];
  const R = (a, b) => a + (b - a) * r();
  if (kind === 'mesh') {
    const pts = Array.from({ length: 26 }, () => { const a = R(0, 6.283), d = 40 + 150 * Math.sqrt(r()); return [200 + Math.cos(a) * d, 200 + Math.sin(a) * d * .85]; });
    pts.forEach((p, i) => pts.map((q, j) => [j, Math.hypot(p[0] - q[0], p[1] - q[1])]).sort((a, b) => a[1] - b[1]).slice(1, 4).forEach(([j]) => { if (j > i) o.push(`<line x1="${p[0]}" y1="${p[1]}" x2="${pts[j][0]}" y2="${pts[j][1]}" stroke="${color}" stroke-opacity=".55" stroke-width="1.4"/>`); }));
    pts.forEach(([x, y]) => o.push(`<circle cx="${x}" cy="${y}" r="3.2" fill="#0a0f14" stroke="${color}" stroke-width="1.6"/>`));
  } else if (kind === 'circuit') {
    for (let n = 0; n < 9; n++) {
      let x = Math.round(R(40, 360) / 20) * 20, y = Math.round(R(40, 360) / 20) * 20; const d = [`M${x} ${y}`];
      for (let k = 0; k < 4; k++) { const dx = [20, 40, 60, -40, -60][Math.floor(R(0, 5))], dy = [0, 40, -40, 60, -60][Math.floor(R(0, 5))]; x = Math.max(20, Math.min(380, x + dx)); y = Math.max(20, Math.min(380, y + (k % 2 ? dy : 0))); d.push(`L${x} ${y}`); }
      o.push(`<path d="${d.join(' ')}" fill="none" stroke="${color}" stroke-width="5" stroke-linejoin="round" stroke-opacity=".85"/>`, `<circle cx="${x}" cy="${y}" r="11" fill="${color}"/><circle cx="${x}" cy="${y}" r="4.5" fill="#0a0f14"/>`);
    }
    o.push(`<rect x="150" y="150" width="100" height="100" rx="4" fill="#0a0f14" stroke="${color}" stroke-width="3"/>`);
    for (let i = 0; i < 6; i++) o.push(`<rect x="${158 + i * 15}" y="140" width="8" height="10" fill="${color}"/><rect x="${158 + i * 15}" y="250" width="8" height="10" fill="${color}"/>`);
  } else if (kind === 'network') {
    const ns = Array.from({ length: 11 }, () => [R(40, 360), R(40, 360)]);
    ns.forEach((p, i) => { const j = Math.floor(R(0, ns.length)); if (j !== i) o.push(`<line x1="${p[0]}" y1="${p[1]}" x2="${ns[j][0]}" y2="${ns[j][1]}" stroke="${color}" stroke-opacity=".5" stroke-width="2" stroke-dasharray="${i % 3 ? '0' : '6 6'}"/>`); });
    ns.forEach(([x, y], i) => o.push(i % 4 === 0 ? `<rect x="${x - 15}" y="${y - 11}" width="30" height="22" fill="#0a0f14" stroke="${color}" stroke-width="2.4"/><line x1="${x - 9}" y1="${y}" x2="${x + 9}" y2="${y}" stroke="${color}" stroke-width="2"/>` : `<circle cx="${x}" cy="${y}" r="8" fill="#0a0f14" stroke="${color}" stroke-width="2.4"/>`));
  } else if (kind === 'neural') {
    const L = [4, 6, 6, 3]; const cols = L.map((n, i) => Array.from({ length: n }, (_, k) => [60 + i * 93, 200 + (k - (n - 1) / 2) * 52]));
    cols.forEach((c, i) => i && c.forEach((p) => cols[i - 1].forEach((q) => o.push(`<line x1="${q[0]}" y1="${q[1]}" x2="${p[0]}" y2="${p[1]}" stroke="${color}" stroke-opacity="${R(.08, .4).toFixed(2)}" stroke-width="1.2"/>`))));
    cols.flat().forEach(([x, y]) => o.push(`<circle cx="${x}" cy="${y}" r="9" fill="#0a0f14" stroke="${color}" stroke-width="2.2"/><circle cx="${x}" cy="${y}" r="${R(1, 5).toFixed(1)}" fill="${color}"/>`));
  } else if (kind === 'browser') {
    o.push(`<rect x="30" y="70" width="340" height="260" fill="#0a0f14" stroke="${color}" stroke-width="2.4"/><line x1="30" y1="104" x2="370" y2="104" stroke="${color}" stroke-width="2"/>`);
    [0, 1, 2].forEach((i) => o.push(`<circle cx="${50 + i * 18}" cy="87" r="5" fill="${color}" fill-opacity="${1 - i * .3}"/>`));
    o.push(`<rect x="130" y="79" width="220" height="16" fill="${color}" fill-opacity=".14"/>`);
    for (let i = 0; i < 5; i++) { const x = 48 + (i % 2) * 165, y = 124 + Math.floor(i / 2) * 66, w = i === 4 ? 320 : 150; o.push(`<rect x="${x}" y="${y}" width="${w}" height="${R(36, 56).toFixed(0)}" fill="${color}" fill-opacity="${R(.1, .3).toFixed(2)}" stroke="${color}" stroke-opacity=".5"/>`); }
  } else if (kind === 'keys') {
    for (let y = 0; y < 4; y++) for (let x = 0; x < 5; x++) { const on = r() < .22; o.push(`<rect x="${42 + x * 66}" y="${80 + y * 66}" width="56" height="56" rx="6" fill="${on ? color : '#0a0f14'}" fill-opacity="${on ? .9 : 1}" stroke="${color}" stroke-width="2.2"/>`); if (on) o.push(`<rect x="${52 + x * 66}" y="${100 + y * 66}" width="36" height="6" fill="#0a0f14" opacity=".6"/>`); }
  } else if (kind === 'grid') {
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { const h = r() < .3 ? R(10, 34) : 0, cx = 200 + (x - y) * 28, cy = 120 + (x + y) * 16 - h; o.push(`<path d="M${cx} ${cy - 16} L${cx + 28} ${cy} L${cx} ${cy + 16} L${cx - 28} ${cy} Z" fill="${h ? color : '#0a0f14'}" fill-opacity="${h ? .55 : 1}" stroke="${color}" stroke-width="1.4"/>`); }
  } else if (kind === 'wave') {
    for (let i = 0; i < 40; i++) { const h = 20 + Math.abs(Math.sin(i * .35 + R(0, .8))) * 150 * (1 - Math.abs(i - 20) / 28); o.push(`<rect x="${24 + i * 9}" y="${200 - h / 2}" width="5" height="${h}" fill="${color}" fill-opacity="${R(.5, 1).toFixed(2)}"/>`); }
  }
  return o.join('');
}

function art(id, r) {
  const R = (a, b) => a + (b - a) * r();
  if (id === 'painting-costume') {
    const pal = ['#c8553d', '#e8a33d', '#2f6f8f', '#7a3b69', '#e9e2cf', '#3b5d3a'];
    let s = `<rect width="960" height="540" fill="#1a1612"/>`;
    for (let i = 0; i < 90; i++) { const x = R(-40, 1000), y = R(-20, 560), w = R(120, 360), a = R(-.5, .5); s += `<path d="M${x} ${y} q ${w / 2} ${R(-70, 70)} ${w} ${R(-30, 30)}" transform="rotate(${a * 40} ${x} ${y})" stroke="${pal[Math.floor(R(0, pal.length))]}" stroke-opacity="${R(.25, .8).toFixed(2)}" stroke-width="${R(14, 46).toFixed(0)}" stroke-linecap="round" fill="none"/>`; }
    s += `<ellipse cx="660" cy="270" rx="120" ry="160" fill="#1a1612" fill-opacity=".35"/>`;
    return s;
  }
  let s = `<rect width="960" height="540" fill="#0b0d12"/>`;
  for (let i = 0; i < 4; i++) {
    const x = 60 + i * 225, y = 120 + (i % 2) * 40;
    s += `<g transform="translate(${x} ${y})"><rect width="190" height="270" fill="#12151d" stroke="#ff74b8" stroke-opacity="${.9 - i * .2}" stroke-width="2.4"/>`;
    s += `<circle cx="${R(50, 140).toFixed(0)}" cy="${R(80, 140).toFixed(0)}" r="${R(22, 44).toFixed(0)}" fill="#ff74b8" fill-opacity="${.55 - i * .1}"/><path d="M0 270 L${R(30, 80).toFixed(0)} ${R(160, 220).toFixed(0)} L${R(100, 150).toFixed(0)} ${R(180, 230).toFixed(0)} L190 270 Z" fill="#b199ff" fill-opacity="${.5 - i * .08}"/>`;
    for (let k = 0; k < 6; k++) s += `<rect x="-10" y="${k * 48 + 8}" width="8" height="26" fill="#0b0d12" stroke="#ff74b8" stroke-opacity=".5"/><rect x="192" y="${k * 48 + 8}" width="8" height="26" fill="#0b0d12" stroke="#ff74b8" stroke-opacity=".5"/>`;
    s += `</g>`;
  }
  return s;
}

function html(p) {
  const r = rng(p.id);
  const c0 = COLOR[FIELD_COLOR[p.fields[0]]], c1 = COLOR[FIELD_COLOR[p.fields[1] ?? p.fields[0]]];
  const title = typeof p.title === 'object' ? p.title.en : p.title;
  const tag = typeof p.tag === 'object' ? p.tag.en : p.tag;
  const artOnly = p.id === 'painting-costume' || p.id === 'secret-animation';
  const lang = p.language && CODE[p.language] ? p.language : null;
  const code = lang ? CODE[lang] : null;
  const file = `${(p.repoUrl ? p.repoUrl.split('/').pop() : p.id).toLowerCase()}/main.${EXT[lang] ?? 'txt'}`;
  const kind = MOTIF[p.interests[0]] ?? 'mesh';
  const chips = p.fields.slice(0, 3).map((f) => `<b style="color:${COLOR[FIELD_COLOR[f]]};border-color:${COLOR[FIELD_COLOR[f]]}99">${FIELD_LABEL[f]}</b>`).join('') + (p.language ? `<b style="color:#ffcf5a;border-color:#ffcf5a99">● ${esc(p.language.toUpperCase())}</b>` : '');
  const stars = p.stars ? `<span class="st">★ ${p.stars}</span>` : '';
  const body = artOnly
    ? `<svg class="art" viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice">${art(p.id, r)}</svg><div class="shade"></div>`
    : `<div class="glow" style="background:radial-gradient(520px 420px at 78% 42%,${c0}33,transparent 70%),radial-gradient(420px 360px at 12% 100%,${c1}26,transparent 70%)"></div>
       <div class="win"><div class="bar"><i></i><i></i><i></i><span>${esc(file)}</span></div><pre>${(code ?? []).map((l, i) => `<u>${i + 1}</u>${hl(l)}`).join('\n')}</pre></div>
       <svg class="motif" viewBox="0 0 400 400">${motif(kind, c0, r)}</svg>`;
  return `<!doctype html><meta charset=utf-8><style>${FONTS}
*{box-sizing:border-box;margin:0}body{width:960px;height:540px;overflow:hidden;background:#0a0f14;position:relative;font-family:B,sans-serif;color:#e9eff3}
body::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgb(120 190 220/.08) 1px,transparent 1px),linear-gradient(90deg,rgb(120 190 220/.08) 1px,transparent 1px);background-size:40px 40px}
.glow{position:absolute;inset:0}.art{position:absolute;inset:0;width:100%;height:100%}.shade{position:absolute;inset:0;background:linear-gradient(0deg,#0a0f14ee 0,transparent 55%)}
.win{position:absolute;left:44px;top:40px;width:520px;background:#0d141bf0;border:1px solid #35505f;border-top:3px solid ${c0};box-shadow:0 20px 50px -20px #000}
.bar{display:flex;gap:7px;align-items:center;padding:9px 12px;border-bottom:1px solid #243542;font:400 12px M}.bar i{width:9px;height:9px;border-radius:50%;background:#35505f}.bar span{margin-left:10px;color:#9fb1bd}
pre{font:400 14.5px/1.62 M;padding:14px 16px 16px 8px;color:#cfdbe3;white-space:pre;overflow:hidden}u{display:inline-block;width:2.4em;text-align:right;margin-right:1.1em;color:#4a6272;text-decoration:none}
i.k{color:#ff74b8;font-style:normal}i.s{color:#bde75e;font-style:normal}i.n{color:#ffcf5a;font-style:normal}i.c{color:#5d7889;font-style:normal}
.motif{position:absolute;right:20px;top:40px;width:380px;height:380px;opacity:.95}
.cap{position:absolute;left:44px;right:44px;bottom:34px;display:flex;flex-direction:column;gap:8px}
h1{font:700 52px/1 B;letter-spacing:-.03em}.tag{font:500 18px M;color:${c0}}
.chips{display:flex;gap:8px;align-items:center;margin-top:4px}.chips b{font:500 12px M;letter-spacing:.08em;border:1px solid;padding:5px 9px}.st{font:500 15px M;color:#ffcf5a;margin-left:6px}
.corner{position:absolute;right:20px;bottom:20px;font:400 12px M;color:#5d7889}
</style>${body}<div class="cap"><div class="tag">${esc(tag)}</div><h1>${esc(title)}</h1><div class="chips">${chips}${stars}</div></div><div class="corner">iairu.com · ${p.year}</div>`;
}

const only = process.argv.slice(2);
const todo = projects.filter((p) => (only.length ? only.includes(p.id) : p.image.startsWith('/img/thumbs/')));
mkdirSync(new URL('public/img/thumbs/', root), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
for (const p of todo) {
  await page.setContent(html(p), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: new URL(`public/img/thumbs/${p.id}.jpg`, root).pathname, type: 'jpeg', quality: 84 });
  console.log('thumb', p.id);
}
await browser.close();
