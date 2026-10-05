import { execFileSync } from 'node:child_process';
import { validateCommit } from './validate-commit.mjs';
const range = process.argv[2];
if (!range || !/^[a-f0-9]{40}\.\.[a-f0-9]{40}$/.test(range)) {
  console.error('Fournir une plage de deux SHA complets : avant..après');
  process.exit(1);
}
const commits = execFileSync('git', ['log', '--format=%H%x00%s', range], { encoding: 'utf8' }).trim();
let failed = false;
for (const line of commits.split('\n').filter(Boolean)) {
  const [sha, subject] = line.split('\0');
  const error = validateCommit(subject);
  if (error) { console.error(`${sha.slice(0, 7)} : ${error}`); failed = true; }
}
if (failed) process.exitCode = 1;
else console.log('Les nouveaux commits respectent la convention.');
