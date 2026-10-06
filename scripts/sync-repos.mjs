// Snapshot of public GitHub repos (stars, language, last push) used by src/data/projects.js.
// Run `npm run sync:repos` to refresh; the build itself never touches the network.
import { writeFileSync } from 'node:fs';

const user = process.env.GH_USER || 'iairu';
const headers = { 'User-Agent': 'iairu-com-sync', Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&type=owner`, { headers });
if (!res.ok) throw new Error(`GitHub API ${res.status}`);
const repos = (await res.json()).map((r) => ({
  name: r.name, url: r.html_url, stars: r.stargazers_count, language: r.language,
  fork: r.fork, archived: r.archived, pushed: r.pushed_at.slice(0, 10), created: r.created_at.slice(0, 10),
  description: r.description, homepage: r.homepage || null, topics: r.topics || [],
}));
repos.sort((a, b) => b.stars - a.stars || b.pushed.localeCompare(a.pushed));
writeFileSync(new URL('../src/data/repos.json', import.meta.url), JSON.stringify({ synced: new Date().toISOString().slice(0, 10), repos }, null, 1));
console.log(`wrote ${repos.length} repos`);
