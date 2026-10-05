import { chmod } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { projectRoot } from './build.mjs';
if (Number(process.versions.node.split('.')[0]) < 22) {
  console.error('Node.js 22 ou supérieur est requis.');
  process.exit(1);
}
for (const hook of ['commit-msg', 'pre-commit']) {
  await chmod(`${projectRoot}.githooks/${hook}`, 0o755);
}
execFileSync('git', ['config', '--local', 'core.hooksPath', '.githooks'], { cwd: projectRoot });
console.log('Règles Git activées pour ce dépôt. Aucun réglage global modifié.');
