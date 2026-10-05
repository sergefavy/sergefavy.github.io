import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCommit } from './validate-commit.mjs';

test('Les commits documentés et les descriptions françaises sont acceptés', () => {
  for (const message of ['feat(projets): ajouter une réalisation', 'fix: corriger le menu mobile', 'docs(guide): préciser les CV\n\nExplication de la modification.', 'refactor!: réorganiser les routes']) {
    assert.equal(validateCommit(message), null);
  }
});
test('Les titres vagues, types inconnus et titres trop longs sont refusés', () => {
  for (const message of ['', 'mise à jour', 'update: changer le texte', 'feat: ', `docs: ${'a'.repeat(73)}`]) assert.ok(validateCommit(message));
});
test('Les commits Git de fusion et de réversion restent possibles', () => {
  assert.equal(validateCommit('Merge branch "main"'), null);
  assert.equal(validateCommit('Revert "feat: ajouter un projet"'), null);
});
