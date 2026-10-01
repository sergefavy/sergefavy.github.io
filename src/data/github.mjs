import { readFile } from 'node:fs/promises';
import { projects as curated } from './content.mjs';
let snapshot = {};
try { snapshot = JSON.parse(await readFile(new URL('./github-snapshot.json', import.meta.url), 'utf8')); } catch {}
// Une panne, un snapshot absent ou incomplet conserve les informations locales.
export const projects = curated.map(project => {
  const metadata = snapshot.repositories?.[project.repository];
  const parsed = metadata?.pushedAt && new Date(metadata.pushedAt);
  const valid = parsed && !Number.isNaN(parsed.valueOf());
  return { ...project, updatedAt: valid ? metadata.pushedAt : project.updatedAt };
});
