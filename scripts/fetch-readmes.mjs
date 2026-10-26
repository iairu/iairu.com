// Snapshot of the README of every project that links a GitHub repo. Rendered on the project
// page by src/data/readmes.js. Run `npm run readmes` to refresh; the build never touches the network.
//   node scripts/fetch-readmes.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from 'node:fs';

const root = new URL('../', import.meta.url);
// projects.js imports JSON data files; inline them so it can load as a plain module here.
const tmp = new URL('scripts/.projects.tmp.mjs', root);
writeFileSync(tmp, readFileSync(new URL('src/data/projects.js', root), 'utf8')
  .replace(/import (\w+) from '\.\/([\w-]+)\.json';/g, (_, name, file) => `const ${name} = JSON.parse(${JSON.stringify(readFileSync(new URL(`src/data/${file}.json`, root), 'utf8'))});`));
const { projects } = await import(tmp.href);
rmSync(tmp);

const headers = { 'User-Agent': 'iairu-com-sync', Accept: 'application/vnd.github.raw+json' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const dir = new URL('src/data/readmes/', root);
mkdirSync(dir, { recursive: true });

const kept = new Set();
let ok = 0, missing = 0;
for (const p of projects.filter((x) => x.repoUrl)) {
  const repo = p.repoUrl.split('/').slice(-2).join('/');
  const res = await fetch(`https://api.github.com/repos/${repo}/readme`, { headers });
  if (res.status === 404) { console.log('no readme', p.id); missing++; continue; }
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${repo} (rate limit? set GITHUB_TOKEN)`);
  const md = (await res.text()).replace(/\r\n/g, '\n').trim();
  if (!md) { console.log('empty readme', p.id); missing++; continue; }
  writeFileSync(new URL(`${p.id}.md`, dir), md + '\n');
  kept.add(`${p.id}.md`);
  ok++;
  console.log('readme', p.id, `${md.length} B`);
}
// Drop stale snapshots for projects that no longer link a repo or lost their README.
for (const f of readdirSync(dir)) if (f.endsWith('.md') && !kept.has(f)) { rmSync(new URL(f, dir)); console.log('removed stale', f); }

writeFileSync(new URL('src/data/readmes.json', root), JSON.stringify({ synced: new Date().toISOString().slice(0, 10) }, null, 1) + '\n');
console.log(`wrote ${ok} readmes, ${missing} without one`);
