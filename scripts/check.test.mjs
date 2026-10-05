import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat, mkdtemp, writeFile, rm, cp } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { projects, resumes, profile } from '../src/data/content.mjs';
import { projectRoot } from './build.mjs';
import { syncMetadata } from './sync-github.mjs';
const out = join(projectRoot, 'dist');
async function walk(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => entry.isDirectory() ? walk(join(folder, entry.name)) : [join(folder, entry.name)]));
  return files.flat();
}
test('Toutes les pages, ressources et ancres internes sont accessibles', async () => {
  const htmlFiles = (await walk(out)).filter(path => path.endsWith('.html'));
  assert.equal(htmlFiles.length, projects.length + 5);
  for (const path of htmlFiles) {
    const html = await readFile(path, 'utf8');
    assert.equal((html.match(/<h1\b/g) || []).length, 1, path);
    assert.match(html, /<html lang="fr">/);
    assert.match(html, /property="og:title"/);
    assert.match(html, /name="description"/);
    for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (!raw.startsWith('/') && !raw.startsWith('#')) continue;
      const url = new URL(raw.replace(/&amp;/g, '&'), 'https://test.local');
      const localPath = join(out, url.pathname);
      const info = await stat(localPath);
      const target = info.isDirectory() ? join(localPath, 'index.html') : localPath;
      const data = await readFile(target);
      if (url.hash) assert.match(data.toString(), new RegExp(`id="${url.hash.slice(1)}"`), `${path}: ${raw}`);
    }
  }
});
test('Le portfolio et les fiches contiennent tous les projets retenus', async () => {
  const home = await readFile(join(out, 'index.html'), 'utf8');
  assert.equal((home.match(/class="project-card /g) || []).length, projects.length);
  for (const id of ['projets', 'profil', 'competences', 'parcours', 'cv', 'contact']) assert.ok(home.includes(`id="${id}"`));
  for (const project of projects) {
    const html = await readFile(join(out, 'projets', project.id, 'index.html'), 'utf8');
    assert.ok(html.includes(project.title.replace(/&/g, '&amp;')));
    if (project.visibility !== 'public') assert.ok(!html.includes(`href="https://github.com/${project.repository}"`));
  }
});
test('Seuls les CV réellement disponibles sont proposés', async () => {
  const home = await readFile(join(out, 'index.html'), 'utf8');
  assert.equal((home.match(/download>/g) || []).length, resumes.filter(cv => cv.path).length);
  for (const cv of resumes.filter(cv => cv.path)) assert.equal((await readFile(join(out, cv.path))).subarray(0, 5).toString(), '%PDF-');
});
test('Métadonnées et sitemap utilisent le domaine configuré', async () => {
  const sitemap = await readFile(join(out, 'sitemap.xml'), 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, projects.length + 4);
  assert.ok(sitemap.includes(profile.siteUrl));
  const home = await readFile(join(out, 'index.html'), 'utf8');
  assert.ok(home.includes(`rel="canonical" href="${profile.siteUrl}/"`));
});
test('Une panne GitHub conserve exactement le snapshot existant', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'portfolio-offline-'));
  try {
    const file = join(dir, 'snapshot.json');
    const data = JSON.stringify({ repositories: { 'sergefavy/Weather-Sation': { pushedAt: '2025-12-23T20:49:57Z' } } });
    await writeFile(file, data);
    const result = await syncMetadata({ outputFile: file, fetcher: async () => { throw new Error('Network unavailable'); } });
    assert.ok(result.preserved);
    assert.equal(await readFile(file, 'utf8'), data);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
test('Un snapshot absent ou invalide conserve les sept projets locaux', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'portfolio-fallback-'));
  try {
    await cp(join(projectRoot, 'src/data/content.mjs'), join(dir, 'content.mjs'));
    await cp(join(projectRoot, 'src/data/github.mjs'), join(dir, 'github.mjs'));
    await writeFile(join(dir, 'github-snapshot.json'), '{invalid');
    const data = await import(pathToFileURL(join(dir, 'github.mjs')));
    assert.equal(data.projects.length, projects.length);
    assert.deepEqual(data.projects.map(p => p.updatedAt), projects.map(p => p.updatedAt));
  } finally { await rm(dir, { recursive: true, force: true }); }
});
test('La synchronisation n’écrit aucun jeton ni champ sensible', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'portfolio-sync-'));
  try {
    const file = join(dir, 'snapshot.json');
    const fakeToken = 'test-token-never-store';
    await syncMetadata({ token: fakeToken, outputFile: file, fetcher: async url => ({ ok: true, json: async () => ({ full_name: url.split('/repos/')[1], pushed_at: '2026-09-30T12:00:00Z', language: 'C', private: false, topics: [], token: fakeToken, download_url: 'https://example.test/?token=secret' }) }) });
    const saved = await readFile(file, 'utf8');
    assert.ok(!saved.includes(fakeToken));
    assert.ok(!saved.includes('download_url'));
    assert.equal(Object.keys(JSON.parse(saved).repositories).length, projects.filter(p => p.repository).length);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
test('Le navigateur ne reçoit aucun jeton ni accès GitHub obligatoire', async () => {
  for (const file of (await walk(out)).filter(path => /\.(js|html|json)$/.test(path))) {
    const text = await readFile(file, 'utf8');
    assert.ok(!/GITHUB_TOKEN|Bearer\s|ghp_|github_pat_|api\.github\.com|token=ATKH/.test(text), file);
  }
});

test('Les pages de navigation ont un titre, une URL canonique et un état actif propres', async () => {
  for (const slug of ['projets', 'a-propos', 'cv']) {
    const html = await readFile(join(out, slug, 'index.html'), 'utf8');
    assert.ok(html.includes(`rel="canonical" href="${profile.siteUrl}/${slug}/"`));
    assert.ok(html.includes(`href="/${slug}/" aria-current="page"`));
  }
});
