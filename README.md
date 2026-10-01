# Portfolio de Rafelimanana Deraniaina

Portfolio public : https://sergefavy.github.io

Systèmes embarqués, IoT, développement logiciel, IA et traitement d’image. Site statique avec sept fiches projet avec deux CV PDF : systèmes embarqués / IoT et IA / Data / Computer Vision.

## Modifier et publier

Node.js 22 ou supérieur, aucune dépendance npm.

1. Modifier `src/data/content.mjs`, les styles ou les ressources de `public/`.
2. Exécuter `npm run publish:prepare` : génération, vérifications puis préparation de `docs/`.
3. Commiter les sources et `docs/` sur `main`. GitHub Pages publie depuis `main`, dossier `/docs`.

Aperçu local : `npm run dev`.

`docs/` contient uniquement le site publié. Ne pas y placer de documentation interne.
