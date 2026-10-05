import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export function validateCommit(message) {
  const subject = message.split(/\r?\n/)[0];
  if (/^(Merge |Revert ")/.test(subject)) return null;
  if (!/^(feat|fix|docs|style|refactor|test|build|ci|chore|perf)(\([a-z0-9-]+\))?!?: \S.+$/.test(subject)) {
    return 'Format attendu : type(scope): description. Exemple : docs(guide): expliquer la modification des projets';
  }
  if (subject.length > 72) return 'Le titre du commit doit contenir au maximum 72 caractères.';
  return null;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (!process.argv[2]) {
    console.error('Usage : node scripts/validate-commit.mjs chemin-du-message');
    process.exitCode = 1;
  } else {
    const error = validateCommit(await readFile(process.argv[2], 'utf8'));
    if (error) { console.error(error); process.exitCode = 1; }
  }
}
