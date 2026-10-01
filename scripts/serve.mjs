import http from 'node:http';
import { stat, readFile, watch } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { projectRoot } from './build.mjs';
const dev = process.argv.includes('--watch');
async function rebuild() { const { build } = await import(`${pathToFileURL(`${projectRoot}scripts/build.mjs`)}?t=${Date.now()}`); await build(); }
await rebuild();
const out = resolve(projectRoot, 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.pdf': 'application/pdf', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = resolve(out, `.${pathname}`);
    if (file !== out && !file.startsWith(`${out}${sep}`)) { response.writeHead(403); return response.end(); }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const data = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch { response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); response.end('<h1>Page introuvable</h1><a href="/">Revenir au portfolio</a>'); }
});
const port = Number(process.env.PORT || 4173);
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
if (dev) {
  let timer;
  // A fresh process avoids stale ESM imports when content or components change.
  const { spawn } = await import('node:child_process');
  for (const folder of ['src', 'public']) (async () => {
    for await (const _ of watch(resolve(projectRoot, folder), { recursive: true })) {
      clearTimeout(timer); timer = setTimeout(() => { spawn(process.execPath, ['scripts/build.mjs'], { cwd: projectRoot, stdio: 'inherit' }); }, 150);
    }
  })().catch(error => console.error(error.message));
}
