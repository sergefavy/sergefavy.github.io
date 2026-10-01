import { mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { profile, resumes } from '../src/data/content.mjs';
import { projects } from '../src/data/github.mjs';
import { escape as e } from '../src/utils/html.mjs';
import { home, detail, notFound } from '../src/components/page.mjs';
export const projectRoot = fileURLToPath(new URL('../', import.meta.url));
export function document(body, title = `${profile.name} — Systèmes embarqués & IoT`, description = profile.seoDescription, path = '/') {
  const origin = profile.siteUrl?.replace(/\/$/, '') || '';
  const url = origin ? `${origin}${path}` : '';
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${e(title)}</title><meta name="description" content="${e(description)}"><meta name="author" content="${e(profile.name)}"><meta name="theme-color" content="#2f50d5"><meta property="og:type" content="website"><meta property="og:locale" content="fr_FR"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}">${url ? `<meta property="og:url" content="${e(url)}"><link rel="canonical" href="${e(url)}">` : ''}<meta name="twitter:card" content="summary"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="stylesheet" href="/assets/main.css"><script src="/assets-theme.js"></script><script src="/assets/main.js" defer></script></head><body>${body}</body></html>`;
}
export async function build() {
  for (const cv of resumes.filter(c => c.path)) {
    const data = await readFile(`${projectRoot}public${cv.path}`);
    if (!data.subarray(0, 5).equals(Buffer.from('%PDF-'))) throw new Error(`Le CV ${cv.path} n’est pas un PDF valide.`);
  }
  const out = `${projectRoot}dist`;
  await rm(out, { recursive: true, force: true });
  await mkdir(`${out}/assets`, { recursive: true });
  await cp(`${projectRoot}public`, out, { recursive: true });
  await cp(`${projectRoot}src/styles/main.css`, `${out}/assets/main.css`);
  await cp(`${projectRoot}src/main.js`, `${out}/assets/main.js`);
  await writeFile(`${out}/index.html`, document(home()));
  for (const p of projects) {
    await mkdir(`${out}/projets/${p.id}`, { recursive: true });
    await writeFile(`${out}/projets/${p.id}/index.html`, document(detail(p), `${p.title} — ${profile.name}`, p.summary, `/projets/${p.id}/`));
  }
  await writeFile(`${out}/404.html`, document(notFound(), `Page introuvable — ${profile.name}`));
  const paths = ['/', ...projects.map(p => `/projets/${p.id}/`)];
  const origin = profile.siteUrl?.replace(/\/$/, '');
  await writeFile(`${out}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${origin ? paths.map(path => `<url><loc>${e(origin + path)}</loc></url>`).join('') : ''}</urlset>`);
  await writeFile(`${out}/robots.txt`, `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`);
  await writeFile(`${out}/_headers`, '/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n');
  console.log('Portfolio construit dans dist/.');
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
