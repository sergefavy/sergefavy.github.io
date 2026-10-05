# Modifier manuellement le portfolio

## 1. Démarrer dans un IDE

Ouvrir le dossier racine ou `portfolio.code-workspace`. Lancer `npm run dev` dans le terminal intégré, puis ouvrir http://127.0.0.1:4173/. Les tâches « Portfolio » sont aussi disponibles dans VS Code/Cursor via **Terminal → Exécuter la tâche**.

## 2. Modifier la présentation et le contact

Dans `src/data/content.mjs`, modifier les valeurs de l’objet `profile` :

```js
headline: ['Bonjour,', 'moi c’est Deraniaina.'],
introduction: 'Votre présentation vérifiée.',
location: 'Poitiers, France',
email: 'votre-adresse@example.com',
```

Conserver les virgules, guillemets et crochets. Pour une apostrophe dans une chaîne entourée d’apostrophes, écrire `\'` ou entourer le texte de guillemets doubles. Une valeur vide masque certains liens, par exemple `linkedin: ''`.

Les paragraphes de sections, les titres de pages et la narration de la station météo sont dans `src/components/page.mjs`. Le contenu principal reste centralisé dans `content.mjs` ; les textes éditoriaux de ce fichier de composants peuvent aussi être modifiés manuellement.

## 3. Modifier ou ajouter un projet

Chaque objet de `projects` contient `id`, `title`, `summary`, `description`, `tags`, `filters`, `highlights`, `note`, `visibility` et les liens disponibles. Copier un objet existant, puis remplacer ses informations.

- Choisir un `id` unique en minuscules avec tirets, par exemple `capteur-connecte`. Il devient l’URL `/projets/capteur-connecte/`.
- Utiliser `visibility: 'public'`, `'private'` ou `'unpublished'` selon l’accès réel au code.
- Renseigner `github` uniquement avec un vrai lien public. Pour un projet privé, garder `repository`, `github` et `updatedAt` vides.
- Choisir les filtres dans la liste `filters` exportée. Ajouter un nouveau filtre à cette liste si nécessaire.
- Placer une vraie image dans `public/images/`, puis indiquer `image: '/images/nom.png'`, `imageAlt` et `imageCaption`.
- Sans visuel spécifique, l’illustration générique de `art.mjs` est utilisée. Ajouter un cas dans ce fichier pour un dessin dédié.

Les pages, fiches et sitemap sont générés automatiquement à partir de ces objets. `src/data/github.mjs` complète certains champs du dépôt public depuis `github-snapshot.json` : langue et date peuvent provenir de ce snapshot. Ne pas modifier les PDF ou le HTML généré pour changer ces données. `npm run sync:github` est facultatif ; le site fonctionne avec ses données locales.

## 4. Modifier les compétences et le parcours

Modifier les tableaux `skills` et `experiences` dans `content.mjs`. Les niveaux sont indicatifs : conserver une formulation mesurée et des informations vérifiées. Ces tableaux alimentent la page `/a-propos/`.

## 5. Remplacer les deux CV

Remplacer les PDF dans :

- `public/cv/cv-systemes-embarques.pdf`
- `public/cv/cv-ia.pdf`

Conserver ces noms pour garder les liens existants. Pour un nouveau nom, modifier aussi `resumes[].path` dans `content.mjs`, avec un chemin commençant par `/cv/`. Un chemin vide masque le CV. Le générateur vérifie la signature PDF ; vérifier aussi visuellement son contenu. Les CV publiés sont accessibles à tous.

## 6. Modifier le design et les animations

Les styles sont dans `src/styles/main.css`, avec variantes mobile et sombre. Les animations de sections et de narration sont dans `src/main.js`. Conserver le bouton d’arrêt et le respect de `prefers-reduced-motion`. Ne pas masquer un texte indispensable en attendant une animation.

Une vidéo Higgsfield éventuelle doit être ajoutée comme une nouvelle ressource après génération et validation. Le brief est dans `design/HIGGSFIELD-BRIEF.md` ; il ne constitue pas une vidéo déjà disponible.

## 7. Préparer et publier

```sh
git switch -c feat/actualiser-profil
# Modifier les fichiers dans votre IDE.
npm run publish:prepare
git status --short
git add src public docs
git commit -m "feat(profil): actualiser la présentation"
git push -u origin feat/actualiser-profil
```

Ouvrir une pull request vers `main` sur GitHub. Après les contrôles, fusionner pour publier. Si seuls des fichiers de documentation changent, indexer leurs chemins à la place de `src public docs`.

La reconstruction copie `public/` et les sources dans `dist/`, puis remplace `docs/`. Toute modification directe de `docs/` est donc perdue à la prochaine génération. Après déploiement, ouvrir le site public et vérifier les pages concernées ainsi que les liens PDF.

## Problèmes courants

- **Port 4173 occupé** : arrêter l’autre aperçu ou utiliser `PORT=4174 npm run dev` dans un terminal macOS/Linux.
- **Erreur de syntaxe** : vérifier la ligne indiquée par Node.js, notamment guillemets et virgules.
- **Ancienne version visible** : rafraîchir le navigateur et vérifier le déploiement GitHub Pages.
- **Commit refusé** : lire le message du contrôle ; respecter le format décrit dans `CONTRIBUTING.md`.
- **GitHub indisponible** : les informations locales permettent au site de fonctionner sans appel GitHub dans le navigateur.
