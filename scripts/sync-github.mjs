import { readFile, writeFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/data/content.mjs';
const defaultFile = fileURLToPath(new URL('../src/data/github-snapshot.json', import.meta.url));
export async function syncMetadata({ fetcher = fetch, token = process.env.GITHUB_TOKEN, outputFile = defaultFile } = {}) {
  let previous = { repositories: {} };
  try { previous = JSON.parse(await readFile(outputFile, 'utf8')); } catch {}
  const repositories = { ...previous.repositories };
  const selected = [...new Map(projects.filter(p => p.repository).map(p => [p.repository, p])).values()];
  let refreshed = 0, failed = 0;
  for (const project of selected) {
    if (project.visibility === 'private' && !token) continue;
    try {
      const response = await fetcher(`https://api.github.com/repos/${project.repository}`, {
        headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error('Dépôt temporairement inaccessible');
      const data = await response.json();
      if (data.full_name !== project.repository || !data.pushed_at || Number.isNaN(Date.parse(data.pushed_at))) throw new Error('Métadonnées invalides');
      // Liste explicite de champs : ni jeton, ni URL signée, ni contenu privé brut.
      repositories[project.repository] = { pushedAt: data.pushed_at, language: data.language || '', visibility: data.private ? 'private' : 'public', topics: Array.isArray(data.topics) ? data.topics : [] };
      refreshed++;
    } catch { failed++; }
  }
  if (refreshed) {
    const next = { checkedAt: new Date().toISOString(), repositories };
    await writeFile(`${outputFile}.tmp`, `${JSON.stringify(next, null, 2)}\n`);
    await rename(`${outputFile}.tmp`, outputFile);
  }
  return { refreshed, failed, preserved: !refreshed };
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = await syncMetadata();
  console.log(result.refreshed ? `${result.refreshed} dépôt(s) actualisé(s).` : 'Données locales conservées. Le portfolio reste disponible.');
  if (result.failed) console.log('Certains dépôts n’ont pas pu être actualisés. Leurs données précédentes sont conservées.');
}
