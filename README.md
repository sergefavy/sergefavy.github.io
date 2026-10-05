# Portfolio de Rafelimanana Deraniaina

Site : **https://sergefavy.github.io/**

Dépôt : **https://github.com/sergefavy/sergefavy.github.io**

Projet complet, modifiable dans VS Code, Cursor, WebStorm ou un autre IDE. Site statique en JavaScript, HTML et CSS, sans dépendance npm ni serveur de données. Il présente neuf projets, le parcours et deux CV PDF.

## Ouvrir et démarrer

Prérequis : Git et Node.js **22 ou supérieur**. Vérifier avec `git --version` et `node --version`.

Pour récupérer le projet avec son historique :

```sh
git clone https://github.com/sergefavy/sergefavy.github.io.git
cd sergefavy.github.io
npm run setup
npm run dev
```

Ouvrir ce dossier dans votre IDE. Avec VS Code ou Cursor, le fichier `portfolio.code-workspace` ouvre le projet et ses tâches. Le site local est disponible sur **http://127.0.0.1:4173/**. Arrêter avec `Ctrl+C`. Les changements de sources sont reconstruits ; rafraîchir le navigateur pour les voir.

Le dossier livré contient déjà le dépôt Git. L’archive ZIP contient les sources et la configuration IDE ; utiliser le clone ci-dessus pour retrouver l’historique Git.

## Modifier les informations

Le point d’entrée est **[`src/data/content.mjs`](src/data/content.mjs)** : nom, présentation, contact, formation, compétences, projets, parcours et CV.

| Besoin | Fichier |
| --- | --- |
| Informations personnelles, projets, expériences, CV | `src/data/content.mjs` |
| Textes des sections et structure des pages | `src/components/page.mjs` |
| Couleurs, typographie, responsive | `src/styles/main.css` |
| Menu, filtres, thème, animations | `src/main.js` |
| Illustrations techniques SVG | `src/components/art.mjs` |
| Images, PDF et autres ressources | `public/` |
| Génération des pages et métadonnées | `scripts/build.mjs` |

Consulter le **[guide d’édition](documentation/MODIFIER-LE-SITE.md)** pour des exemples. Modifier les sources puis générer `docs/`, qui contient le site publié.

## Commandes

| Commande | Utilité |
| --- | --- |
| `npm run setup` | Activer les contrôles Git locaux |
| `npm run dev` | Construire, servir et reconstruire les sources modifiées |
| `npm run build` | Générer `dist/` |
| `npm run preview` | Construire puis servir le site local |
| `npm run check` | Vérifier un `dist/` déjà construit et les règles de commits |
| `npm run publish:prepare` | Construire, vérifier, puis générer `docs/` pour Pages |
| `npm run sync:github` | Actualiser les métadonnées publiques GitHub, facultatif |

Aucun `npm install` n’est nécessaire : les scripts utilisent les modules natifs de Node.js.

## Git et publication

Suivre **[CONTRIBUTING.md](CONTRIBUTING.md)**. Les nouveaux commits adoptent `type(scope): description`, par exemple `docs(guide): préciser la modification des CV`.

GitHub Pages sert la branche `main`, dossier `/docs`. Une modification poussée sur `main` peut donc être mise en ligne. Le contrôle `Qualité du portfolio` vérifie les nouveaux commits, les ressources et la cohérence du site généré sur chaque push et pull request. Il ne configure pas de protection de branche : privilégier les branches de travail et les pull requests.

## Documents du projet

- **[Récapitulatif complet](RECAPITULATIF.md)** : étapes réalisées, déploiements, fonctionnalités et limites.
- **[Modifier le site](documentation/MODIFIER-LE-SITE.md)** : édition manuelle et publication.
- **[Contribuer avec Git](CONTRIBUTING.md)** : branches, commits et vérifications.
- **[Brief Higgsfield](design/HIGGSFIELD-BRIEF.md)** : séquence envisagée ; aucune vidéo Higgsfield n’a été générée à la dernière tentative documentée.

Les illustrations actuelles sont conceptuelles. Les projets privés ont des présentations publiques autorisées ; leur code reste privé. Les deux CV et les coordonnées affichées sont des contenus publics : vérifier tout remplacement avant publication.
