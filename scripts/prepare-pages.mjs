import { cp, rm, writeFile } from 'node:fs/promises';
import { projectRoot } from './build.mjs';
await rm(`${projectRoot}docs`, { recursive: true, force: true });
await cp(`${projectRoot}dist`, `${projectRoot}docs`, { recursive: true });
await rm(`${projectRoot}docs/_headers`, { force: true });
await writeFile(`${projectRoot}docs/.nojekyll`, '');
console.log('Site GitHub Pages préparé dans docs/.');
