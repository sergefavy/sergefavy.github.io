# Récapitulatif du portfolio

Document préparé le **5 octobre 2026** pour reprendre et maintenir le projet manuellement.

## Projet et accès

- Auteur : Rafelimanana Deraniaina.
- Site public : https://sergefavy.github.io/.
- Dépôt GitHub : https://github.com/sergefavy/sergefavy.github.io.
- Source : dossier racine de ce dépôt, ouvrable dans un IDE.
- Hébergement : GitHub Pages, branche `main`, dossier `/docs`.

## Étapes réalisées

### Construction initiale et sélection des contenus

Création d’un portfolio technique en français à partir de sources vérifiées. Sélection de sept réalisations : station météo STM32, réseau de neurones en C, compression d’images en C++, montre sous Zephyr, Sudoku, éditeur JavaFX et ZP MultiserviceAuto. Les fiches expliquent le contexte, les technologies, les éléments travaillés et les limites des sources.

Les présentations des projets privés ont été autorisées pour publication. Leur code reste privé et les identifiants de leurs dépôts ne sont pas publiés. Aucun score de performance ou faux résultat n’a été ajouté.

### Hébergement et passage à GitHub Pages

Une première version utilisait une adresse `chatgpt.site`. Pour disposer d’une adresse gratuite sans ce domaine, le portfolio a été publié sur GitHub Pages. L’ancienne version Sites a été mise en accès privé lors de cette migration ; elle n’a pas été supprimée. Cette mention décrit l’action effectuée à ce moment, sans nouveau contrôle de son état aujourd’hui.

La publication initiale GitHub ne comprenait pas de CV. Une demande ultérieure a rétabli le profil, le contact et les deux documents : **Systèmes embarqués / IoT** et **IA / Data / Computer Vision**. Les documents et les coordonnées actuellement affichés sont publics.

### Évolution visuelle inspirée d’Apple

Ajout de titres plus amples, d’espaces de lecture, de cartes arrondies, d’une galerie et d’illustrations SVG techniques originales. Aucun visuel Apple n’a été utilisé. Le site possède un thème clair et sombre ainsi qu’une présentation mobile.

### Présentation plus personnelle et structure actuelle

Accueil à la première personne, palette plus chaleureuse et pages dédiées :

| Route | Contenu |
| --- | --- |
| `/` | Présentation, narration de la station météo, galerie, profil, aperçu du parcours, CV et contact |
| `/projets/` | Catalogue de projets avec filtres et recherche |
| `/projets/<id>/` | Une fiche détaillée pour chaque réalisation |
| `/a-propos/` | Démarche, compétences, formation et expériences |
| `/cv/` | Les deux documents PDF |

L’accueil conserve les anciennes ancres principales, dont `#projets`, `#profil`, `#parcours`, `#competences`, `#cv` et `#contact`.

La narration de la station météo suit trois étapes : observer avec les capteurs, traiter sur STM32 et restituer sur écran ou carte SD. L’illustration évolue au défilement. Les sections disposent d’entrées sobres, d’un bouton d’arrêt et du respect de la préférence de mouvement réduit. Le contenu reste lisible sans animation.

### Tentative Higgsfield

Un brief a été rédigé pour un film conceptuel d’électronique. Lors de la dernière tentative, le plugin était installé, mais ses outils directs n’étaient pas exposés dans le chat. Un brouillon a été configuré dans l’interface web via WebMCP. Cette interface demandait une authentification et affichait **60 crédits**. Aucune génération ni dépense n’a été lancée. **Le site actuel ne contient aucune vidéo générée par Higgsfield** ; ses animations sont natives JavaScript/CSS/SVG. Voir `design/HIGGSFIELD-BRIEF.md`.

## Architecture technique

JavaScript en modules ES, HTML généré et CSS, avec Node.js 22 ou supérieur. Aucun framework ou paquet npm externe n’est requis.

- `src/data/content.mjs` centralise les informations éditoriales.
- `src/data/github.mjs` utilise un snapshot local des métadonnées publiques et un repli local.
- `src/components/page.mjs` génère les pages et leurs sections.
- `src/components/art.mjs` contient les illustrations conceptuelles.
- `src/main.js` gère le thème, le menu, les filtres, la copie d’email et les animations.
- `public/` contient les ressources, dont les deux PDF.
- `scripts/build.mjs` génère `dist/`, les pages, le sitemap et les métadonnées.
- `scripts/prepare-pages.mjs` prépare `docs/` pour Pages.

Le navigateur n’utilise aucun jeton GitHub et n’a pas besoin d’accéder à l’API GitHub pour afficher le portfolio.

## Historique des principales versions

| Commit | Résultat |
| --- | --- |
| `0a1a53f` | Première publication GitHub sans CV |
| `d88be87` | Profil, contact et deux CV rétablis |
| `0986ad5` | Refonte visuelle et galerie illustrée |
| `005a419` | Présentation personnelle, nouvelles pages et narration animée |

Ces références proviennent de l’historique Git du projet. Les commits antérieurs n’ont pas été renommés pour appliquer les nouvelles conventions.

## Vérifications déjà effectuées lors des publications

Construction et contrôles des pages, ancres, ressources, projets, CV, métadonnées, repli GitHub et absence de jeton côté navigateur. Vérification visuelle sur ordinateur et mobile, recherche, galerie, thème sombre et arrêt des animations. Les dernières pages déployées et les deux PDF avaient répondu HTTP 200 et correspondaient aux fichiers locaux. Ces contrôles décrivent les publications précédentes ; les nouvelles vérifications sont disponibles dans les sorties locales et les runs GitHub Actions.

## Livraison pour le développement manuel

Ajout d’un workspace IDE, de tâches VS Code/Cursor, d’une configuration de formatage et du choix Node.js 22. Ajout de `documentation/MODIFIER-LE-SITE.md` pour éditer les informations, projets, styles et PDF.

Ajout de `CONTRIBUTING.md`, de hooks Git locaux activables avec `npm run setup`, d’un validateur des nouveaux messages de commit et d’un workflow GitHub de qualité. La convention est `type(scope): description`, titre de 72 caractères maximum. La branche `main` contient le site publié ; le travail se fait de préférence sur des branches et pull requests. Les hooks ne constituent pas une protection distante de `main`.

Le dossier de travail contient l’historique Git. L’archive distribuée contient les sources, ressources, guides et configuration IDE ; pour récupérer l’historique et pousser des modifications, cloner le dépôt public.

## Reprise rapide

```sh
npm run setup
npm run dev
# Modifier src/data/content.mjs ou les autres sources.
npm run publish:prepare
```

Consulter le README pour l’ouverture du projet et `CONTRIBUTING.md` pour le workflow de publication.
