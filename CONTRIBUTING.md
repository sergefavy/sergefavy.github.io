# Contribuer au portfolio

## Installation locale des règles

Après le clone, exécuter `npm run setup`. Cette commande active `.githooks` dans la configuration locale du dépôt. Les hooks versionnés sont aussi exécutables sur macOS/Linux ; Node.js 22 ou supérieur et Git sont requis. Une archive ZIP seule ne contient pas l’historique : utiliser un clone pour ce workflow.

## Branches

`main` contient la version publiée. Créer une branche par modification :

- `feat/nom-court` pour une nouvelle fonctionnalité ou un nouveau contenu.
- `fix/nom-court` pour une correction.
- `docs/nom-court` pour la documentation.
- `chore/nom-court` pour la maintenance.

Avant de commencer : `git switch main`, puis `git pull --ff-only`. Si Git signale des changements locaux, les enregistrer ou les mettre de côté avant de changer de branche. Éviter les réécritures de l’historique public et les push forcés sur `main`.

## Messages de commit

Les nouveaux commits suivent une convention inspirée de Conventional Commits :

```text
type(scope): description
```

Le scope est facultatif. Le titre est limité à **72 caractères**. Décrire une action précise ; utiliser le corps du commit pour expliquer le besoin si nécessaire.

| Type | Usage |
| --- | --- |
| `feat` | Nouvelle fonctionnalité ou contenu |
| `fix` | Correction |
| `docs` | Documentation |
| `style` | Présentation ou formatage |
| `refactor` | Réorganisation du code |
| `test` | Vérifications |
| `build` | Construction et génération |
| `ci` | Automatisation GitHub |
| `chore` | Maintenance |
| `perf` | Amélioration mesurée des performances |

Exemples : `feat(projets): ajouter une station météo`, `fix(menu): corriger la navigation mobile`, `docs(guide): expliquer la mise à jour des CV`.

Le hook `commit-msg` refuse les titres non conformes. Les commits de fusion et les réversions générées par Git sont acceptés. Le hook `pre-commit` contrôle les espaces et les marqueurs de conflit des modifications indexées. Les commits historiques restent inchangés ; la règle s’applique aux nouveaux commits.

## Avant une pull request

1. Faire une modification cohérente et limitée.
2. Exécuter `npm run publish:prepare` si les sources ou ressources changent.
3. Vérifier la présentation concernée dans l’aperçu local.
4. Inclure `docs/` généré dans le même commit que les changements du site.
5. Relire `git diff --cached` et `git status` avant de commiter.
6. Pousser la branche puis ouvrir une pull request vers `main`.

Le workflow **Qualité du portfolio** vérifie les nouveaux messages de commit, reconstruit le site, lance ses contrôles et compare `docs/` aux sources. Lors d’une fusion par squash, donner aussi au titre du commit final un format conforme.

## Publication et portée des contrôles

GitHub Pages publie `main:/docs`. Le workflow de qualité est un contrôle supplémentaire ; il ne bloque la fusion que si une protection de branche est configurée sur GitHub. Aucune protection distante n’est installée par les hooks. Préférer une pull request et attendre le succès du contrôle avant fusion.

## Informations et secrets

Publier uniquement des informations vérifiées et autorisées. Les présentations des projets privés n’incluent pas leur code ni leurs identifiants de dépôt. Ne jamais commiter de jeton, `.env`, clé API ou identifiant de connexion. Les ressources et PDF du site sont publics.
