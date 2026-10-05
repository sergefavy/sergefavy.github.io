// POINT D’ENTRÉE ÉDITORIAL : profil, liens, compétences, projets, parcours et CV.
// Les sources et les limites de chaque projet sont consignées dans docs/ANALYSE-GITHUB.md.
export const profile = {
  name: 'Rafelimanana Deraniaina',
  initials: 'RD',
  role: 'Systèmes embarqués · IoT · Développement logiciel',
  currentStudy: 'Master 2 Objets Connectés',
  studyLabel: 'Master 2 · Objets Connectés',
  headline: ['Bonjour,', 'moi c’est Deraniaina.'],
  introduction: 'Je suis étudiant en Master 2 Objets Connectés à Poitiers. Du capteur au logiciel, j’apprends à construire des systèmes qui observent, traitent et rendent les données utiles.',
  about: 'Du firmware d’une station météo à un réseau de neurones en C, mes projets explorent le lien entre informatique et systèmes physiques. Je m’intéresse à l’acquisition de données, aux architectures embarquées et aux algorithmes de traitement.',
  location: 'Poitiers, France',
  email: 'deraniaina.rafelimanana@gmail.com',
  github: 'https://github.com/sergefavy',
  linkedin: '',
  siteUrl: 'https://sergefavy.github.io', // Adresse publique GitHub Pages.
  seoDescription: 'Portfolio de Rafelimanana Deraniaina, étudiant en Master 2 Objets Connectés à Poitiers : STM32, Zephyr, IoT, C/C++, réseaux de neurones et développement logiciel.',
  opportunities: {
    active: true,
    types: ['Alternance', 'Stage', 'Emploi'],
    priority: 'Alternance',
    text: 'Je recherche une alternance en systèmes embarqués et IoT. Je suis également ouvert à des échanges autour de stages ou d’emplois en développement logiciel, IA embarquée, machine learning et computer vision.',
    domains: ['Systèmes embarqués', 'IoT', 'Développement logiciel', 'IA embarquée', 'Machine learning', 'Computer vision'],
  },
};

// Niveaux prudents, indicatifs et modifiables. Aucun niveau expert n’est affiché.
export const skills = [
  { title: 'Développement', icon: 'code', description: 'De l’algorithmique aux interfaces.', items: [
    ['C / C++', 'Intermédiaire'], ['Python', 'Bases'], ['Java / JavaFX', 'Intermédiaire'], ['PHP', 'Bases'], ['JavaScript / TypeScript', 'Intermédiaire'],
  ] },
  { title: 'Systèmes embarqués', icon: 'chip', description: 'Faire dialoguer logiciel et matériel.', items: [
    ['STM32 · CubeIDE · CubeMX', 'Intermédiaire'], ['Zephyr RTOS', 'Bases'], ['GPIO · ADC · Timers', 'Intermédiaire'], ['Capteurs · I2C · Interfaces matérielles', 'Intermédiaire'],
  ] },
  { title: 'IoT & données', icon: 'signal', description: 'Acquérir, traiter et transmettre.', items: [
    ['Acquisition de données', 'Intermédiaire'], ['Objets connectés', 'Intermédiaire'], ['Communications radio', 'Bases'], ['Stockage SD · CSV', 'Intermédiaire'],
  ] },
  { title: 'IA & traitement d’image', icon: 'nodes', description: 'Comprendre les algorithmes en profondeur.', items: [
    ['Réseaux de neurones', 'Intermédiaire'], ['Apprentissage supervisé', 'Bases'], ['DCT · Quantification', 'Intermédiaire'], ['ZigZag · Huffman', 'Bases'],
  ] },
  { title: 'Outils & méthodes', icon: 'terminal', description: 'Développer avec méthode.', items: [
    ['Git · GitHub', 'Intermédiaire'], ['Linux', 'Intermédiaire'], ['VS Code', 'Intermédiaire'], ['Architecture modulaire', 'Intermédiaire'],
  ] },
];

export const filters = ['Tous', 'Systèmes embarqués', 'IoT', 'Intelligence artificielle', 'Computer Vision', 'Python', 'C/C++', 'Java', 'Web'];

export const projects = [
  {
    id: 'station-meteo', title: 'Station météo embarquée', category: 'Systèmes embarqués',
    summary: 'Acquérir, traiter, afficher et enregistrer des données environnementales sur STM32.',
    description: 'Projet universitaire réalisé en équipe sur STM32F746G-Discovery. Une architecture événementielle coordonne les capteurs, l’écran tactile et l’enregistrement sur carte SD.',
    tags: ['STM32', 'C', 'I2C', 'ADC', 'CubeIDE'], filters: ['Systèmes embarqués', 'IoT', 'C/C++'],
    language: 'C', icon: 'chip', featured: true, repository: 'sergefavy/Weather-Sation', visibility: 'public',
    github: 'https://github.com/sergefavy/Weather-Sation', demo: '', updatedAt: '2025-12-23T20:49:57Z', status: 'Projet universitaire',
    image: '/images/weather-flow.png', imageAlt: 'Diagramme réel de navigation entre les pages de l’interface de la station météo, issu du dépôt Weather-Sation.', imageCaption: 'Document du projet · flux de l’interface',
    highlights: ['Acquisition de température, humidité, pression, vent et pluie.', 'Ordonnancement par timer et gestion du bus I2C avec une machine à états.', 'Affichage LCD tactile, historique des mesures et export CSV sur carte SD.'],
    note: 'Projet réalisé en équipe. Les fonctionnalités décrites proviennent du README et du code ; aucune mesure de performance n’est revendiquée.',
    sources: ['README.md', 'Core/Src/main.c', 'Doc/flux_affichage.png'],
  },
  {
    id: 'reseau-neurones', title: 'Réseau de neurones en C', category: 'Intelligence artificielle',
    summary: 'Explorer l’apprentissage supervisé avec un réseau feedforward et une interface SDL2.',
    description: 'Implémentation modulaire d’un réseau de neurones, avec propagation avant, rétropropagation et interface graphique permettant de configurer le réseau.',
    tags: ['C', 'SDL2', 'Rétropropagation'], filters: ['Intelligence artificielle', 'C/C++'],
    language: 'C', icon: 'nodes', repository: '', visibility: 'private', github: '', demo: '', updatedAt: '', status: 'Projet universitaire',
    highlights: ['Structures dédiées aux couches et aux neurones.', 'Modules de propagation avant et de rétropropagation.', 'Interface SDL2, génération de données en spirale et sauvegarde du réseau.'],
    note: 'Travail en équipe. Le dépôt est privé ; aucun score de précision ni résultat de benchmark n’est présenté.',
    sources: ['src/neural_network/neural_network.h', 'src/interface/interface.c', 'src/main.c'],
  },
  {
    id: 'compression-images', title: 'Compression d’images en C++', category: 'Traitement d’image',
    summary: 'Comprendre les étapes d’un compresseur inspiré de JPEG, du bloc de pixels à sa reconstruction.',
    description: 'Projet de compression pédagogique d’images en niveaux de gris, DCT/IDCT, quantification et reconstruction de blocs 8 × 8.',
    tags: ['C++17', 'DCT', 'CMake', 'ZigZag'], filters: ['C/C++'],
    language: 'C++', icon: 'matrix', repository: '', repositoryPath: 'Proc/C++/PROJET', visibility: 'private', github: '', demo: '', updatedAt: '', status: 'Prototype pédagogique',
    highlights: ['DCT/IDCT et quantification sur des blocs 8 × 8.', 'Lecture et écriture PGM, menu de démonstration et reconstruction.', 'Modules ZigZag et Huffman présents dans le code.'],
    note: 'Le README indique que le traitement d’images complètes et le codage entropique restent en développement. Le projet n’est pas présenté comme un encodeur JPEG standard complet.',
    sources: ['Proc/C++/PROJET/README.md', 'Proc/C++/PROJET/src/main.cpp', 'Proc/C++/PROJET/include/huffman.h'],
  },
  {
    id: 'montre-zephyr', title: 'Montre connectée sous Zephyr', category: 'Systèmes embarqués',
    summary: 'Développer une application embarquée, intégrer des capteurs et mettre en œuvre des communications radio.',
    description: 'Projet universitaire décrit dans mon CV systèmes embarqués : développement sous Zephyr RTOS, utilisation d’un BSP et intégration de capteurs.',
    tags: ['Zephyr RTOS', 'Capteurs', 'Radio'], filters: ['Systèmes embarqués', 'IoT'],
    language: '', icon: 'watch', repository: '', visibility: 'unpublished', github: '', demo: '', updatedAt: '', status: 'Projet universitaire',
    highlights: ['Application embarquée sous Zephyr RTOS.', 'Utilisation du BSP avec Square Studio.', 'Intégration de capteurs, communications radio et travail avec Git.'],
    note: 'Informations issues du CV existant. Le dépôt Zephyr accessible contient des supports de cours, pas le code de cette montre ; aucun lien vers ce dépôt n’est présenté comme une réalisation.',
    sources: ['CV systèmes embarqués / IoT'],
  },
  {
    id: 'sudoku', title: 'Sudoku & résolution algorithmique', category: 'Développement logiciel',
    summary: 'Modéliser une grille, vérifier ses contraintes et appliquer des règles de résolution en C.',
    description: 'Projet de Licence 3. Le dépôt accessible contient le cœur algorithmique du Sudoku, la gestion des candidats et un affichage en console.',
    tags: ['C', 'Algorithmique', 'Contraintes'], filters: ['C/C++'],
    language: 'C', icon: 'grid', repository: '', visibility: 'private', github: '', demo: '', updatedAt: '', status: 'Projet universitaire',
    highlights: ['Représentation des grilles et des candidats à l’aide de masques binaires.', 'Vérification des cellules, des lignes et des zones.', 'Application de règles de résolution et organisation en modules C.'],
    note: 'Le CV mentionne une version graphique SDL réalisée en équipe. Le dépôt analysé ne contient pas cette interface : la carte décrit exclusivement son cœur algorithmique.',
    sources: ['sudoku.h', 'sudoku.c', 'graphical.c', 'makefile'],
  },
  {
    id: 'editeur-java', title: 'Éditeur de niveaux en Java', category: 'Développement logiciel',
    summary: 'Concevoir une interface pour créer et organiser les cartes d’un jeu.',
    description: 'Projet Gauntlet : éditeur de niveaux avec interface JavaFX, contrôleurs Java et vue FXML. Il permet de créer des cartes destinées au jeu.',
    tags: ['Java', 'JavaFX', 'FXML'], filters: ['Java'],
    language: 'Java', icon: 'layout', repository: '', visibility: 'private', github: '', demo: '', updatedAt: '', status: 'Projet universitaire',
    highlights: ['Interface JavaFX et vue FXML.', 'Organisation des contrôleurs et de la liste des niveaux.', 'Gestion des éléments à placer dans les cartes.'],
    note: 'Les sprites sont des ressources du jeu, pas des captures de l’éditeur. Aucune fausse capture n’est utilisée.',
    sources: ['README.md', 'src/Views/LevelEditor.fxml', 'src/Controller/EditorMain.java'],
  },
  {
    id: 'zp-multiservice', title: 'ZP MultiserviceAuto', category: 'Web',
    summary: 'Un site vitrine et un catalogue de produits, avec une interface d’administration.',
    description: 'Application web React et TypeScript documentée dans le dépôt, avec navigation, catalogue de produits et services Firebase pour les données et l’authentification.',
    tags: ['React', 'TypeScript', 'Firebase', 'Vite'], filters: ['Web'],
    language: 'TypeScript', icon: 'layout', repository: '', visibility: 'private', github: '', demo: '', updatedAt: '', status: 'Projet web',
    highlights: ['Composants React et navigation entre les pages.', 'Catalogue, fiches produits et interface d’administration.', 'Firebase Firestore et authentification.'],
    note: 'La démonstration indiquée par le dépôt renvoyait une erreur 404 lors de la vérification du 30 septembre 2026 ; le lien est masqué.',
    sources: ['documentation.md', 'package.json', 'src/pages/ProductsPage.tsx'],
  },
];

// Informations recoupées avec le CV local fourni lors d’un travail précédent.
// Une période de formation n’implique pas que le diplôme a été obtenu.
export const experiences = [
  { period: 'Depuis 2026', title: 'Master 2 TSI · Objets Connectés', organization: 'Université de Poitiers', kind: 'Formation', status: 'En cours', description: 'Systèmes embarqués, objets connectés et développement logiciel.', technologies: ['Embarqué', 'IoT'] },
  { period: 'Avril — juin 2026', title: 'Stage · Camp ELENA', organization: 'Nouvelle-Aquitaine', kind: 'Expérience', description: 'Développement d’une simulation de drone et participation au Camp ELENA.', technologies: [] },
  { period: '2025 — 2026', title: 'Master 1 TSI · Objets Connectés', organization: 'Université de Poitiers', kind: 'Formation', description: 'Projets universitaires autour des microcontrôleurs, des capteurs et du traitement d’image.', technologies: ['STM32', 'C++'] },
  { period: '2021 — 2024', title: 'Licence Informatique', organization: 'UFR SFA · Université de Poitiers', kind: 'Formation', description: 'Programmation, algorithmique et projets de développement en équipe.', technologies: ['C', 'Java'] },
  { period: 'Avril — juillet 2023', title: 'Stage · Développement 3D', organization: 'UFR SFA · Poitiers', kind: 'Expérience', description: 'Développement d’une application de visualisation 3D en JavaFX.', technologies: ['JavaFX'] },
];

// Un chemin vide masque le téléchargement, sans fabriquer de document.
export const resumes = [
  { title: 'Systèmes embarqués / IoT', description: 'Microcontrôleurs, capteurs, firmware et systèmes connectés.', path: '/cv/cv-systemes-embarques.pdf', primary: true },
  { title: 'Informatique générale', description: '', path: '' },
  { title: 'IA / Data / Computer Vision', description: 'Intelligence artificielle, apprentissage supervisé et traitement d’image.', path: '/cv/cv-ia.pdf' },
  { title: 'Développement logiciel', description: '', path: '' },
];

// Emplacements non publiés : activer seulement avec preuves et informations suffisantes.
export const unpublished = {
  visionProject: { title: '', repository: '', summary: '', tags: [] },
  additionalSkills: ['PWM', 'YOLO', 'OpenCV', 'PyCharm', 'Docker', 'Télémétrie', 'Systèmes distribués'],
};
