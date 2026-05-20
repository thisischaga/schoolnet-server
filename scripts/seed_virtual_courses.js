const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/schoolnet';

const COURSES_DATA = [
  // ================= PRIMAIRE =================
  {
    title: 'Mathématiques Magiques',
    description: 'Découvrir les chiffres et les opérations de base en s\'amusant.',
    level: 'primaire',
    code: 'PRI-MAT-01',
    content: 'Les bases des mathématiques pour les enfants du primaire.',
    duration: '20h',
    chapters: [
      { title: 'Découverte des Nombres (1 à 100)', content: '1) Différencier les unités, dizaines et centaines.\n2) Savoir compter de 1 à 100 sans ordre défini.\n3) Repérer le nombre qui vient avant ou après.', duration: '2h' },
      { title: 'L\'Addition Magique', content: '1) Qu\'est-ce que l\'addition (ajouter)\n2) Le symbole [+]\n3) Les tables d\'addition simples (1 à 5)\n4) Résoudre un problème: "Combien ça fait en tout ?"', duration: '3h' },
      { title: 'La Soustraction, comment enlever', content: '1) Qu\'est-ce que la soustraction (enlever)\n2) Le symbole [-]\n3) Méthode de calcul sur les doigts\n4) Problèmes simples de retrait', duration: '3h' },
      { title: 'Initiation à la Géométrie', content: '1) Reconnaître un Carré (4 côtés égaux)\n2) Reconnaître un Triangle (3 côtés)\n3) Reconnaître un Cercle (tout rond)\n4) Dessiner ces formes à main levée', duration: '3h' }
    ]
  },
  {
    title: 'Lecture et Aventures',
    description: 'Apprendre à lire et écrire à travers de belles histoires.',
    level: 'primaire',
    code: 'PRI-FRA-01',
    content: 'Connaissance de l\'alphabet et construction de mots.',
    duration: '25h',
    chapters: [
      { title: 'L\'Alphabet Enchanté', content: '1) Les 6 voyelles magiques (A,E,I,O,U,Y)\n2) Les consonnes importantes\n3) Reconnaître les lettres en majuscules et minuscules', duration: '2h' },
      { title: 'Mes Premières Syllabes', content: '1) Comment coller une consonne et une voyelle (BA, BE, BI...)\n2) Lire des mots de 2 syllabes (MOTO, PAPA)\n3) Exercices de lecture à voix haute', duration: '4h' },
      { title: 'Lire ma Première Histoire', content: '1) Comprendre l\'ordre d\'une phrase (Sujet + Verbe)\n2) La majuscule et le point\n3) Lecture accompagnée d\'un conte simple', duration: '5h' },
      { title: 'Les Petites Dictées', content: '1) Écouter un mot et le découper en sons\n2) Tracer les lettres sans tricher\n3) Correction et conseils', duration: '4h' }
    ]
  },
  {
    title: 'Le Monde qui nous Entoure',
    description: 'Première approche des sciences de la nature et biologie.',
    level: 'primaire',
    code: 'PRI-SCI-01',
    content: 'Découverte de l\'environnement, la faune et la flore.',
    duration: '15h',
    chapters: [
      { title: 'Le Corps Humain', content: '1) La Tête, le Tronc, les Membres\n2) À quoi servent les 5 sens ?\n3) L\'importance de bien manger et dormir', duration: '3h' },
      { title: 'Les Animaux et leurs Habitats', content: '1) Les animaux domestiques vs sauvages\n2) Que mangent-ils ? (Carnivore, Herbivore)\n3) Où dorment-ils ? (Nid, terrier, étable)', duration: '3h' },
      { title: 'La Magie de l\'Eau', content: '1) Les 3 états de l\'eau : solide, liquide, gaz\n2) De la pluie aux rivières (Le cycle naturel)\n3) Pourquoi faut-il économiser l\'eau ?', duration: '2h' },
      { title: 'Les Plantes et les Arbres', content: '1) Les racines, la tige et les feuilles\n2) De quoi une plante a-t-elle besoin pour pousser ? (Soleil, eau)\n3) Les fruits et les légumes', duration: '3h' }
    ]
  },

  // ================= COLLÈGE =================
  {
    title: 'Algèbre et Équations Fondamentales',
    description: 'Maitriser les théorèmes et calculs essentiels du collège.',
    level: 'collège',
    code: 'COL-MAT-01',
    content: 'Géométrie, fractions, et équations du premier et second degré.',
    duration: '30h',
    chapters: [
      { title: 'Le Théorème de Pythagore', content: '1) Définir un triangle rectangle et l\'hypoténuse\n2) Formule : a² + b² = c²\n3) Calculer une longueur manquante\n4) La réciproque du théorème', duration: '4h' },
      { title: 'Théorème de Thalès', content: '1) Configuration des triangles (droites parallèles)\n2) Égalité des rapports (Proportionnalité)\n3) Réciproque et contraposée', duration: '4h' },
      { title: 'Les Équations à une Inconnue', content: '1) Définition de "x"\n2) Méthode de la balance : ax + b = c\n3) Vérifier son résultat\n4) Mise en équation d\'un problème textuel', duration: '5h' },
      { title: 'Fractions et Nombres Relatifs', content: '1) Addition et soustraction avec dénominateur commun\n2) Multiplication et division de fractions\n3) La règle des signes pour les nombres relatifs (- x - = +)', duration: '4h' }
    ]
  },
  {
    title: 'Français : L\'Art de l\'Argumentation',
    description: 'De la grammaire à l\'expression écrite complexe.',
    level: 'collège',
    code: 'COL-FRA-01',
    content: 'Maîtrise de la langue française.',
    duration: '25h',
    chapters: [
      { title: 'La Grammaire de Phrase', content: '1) Différencier proposition principale et subordonnée\n2) Le pronom relatif (qui, que, quoi, dont, où)\n3) Valeurs des temps (Présent, Imparfait, Passé Simple)', duration: '4h' },
      { title: 'Le Récit et le Point de Vue', content: '1) Point de vue omniscient (le narrateur sait tout)\n2) Point de vue interne (à travers les yeux d\'un personnage)\n3) Point de vue externe (comme une caméra)', duration: '4h' },
      { title: 'La Poésie et les Figures de Style', content: '1) Repérer les rimes et les strophes (Quatrain, Tercet)\n2) Analyser la Comparaison et la Métaphore\n3) L\'Hyperbole et l\'Oxymore', duration: '5h' },
      { title: 'Rédiger une Argumentation', content: '1) Définir l\'introduction (amener le sujet)\n2) Développer une Thèse, un Argument et un Exemple (TAE)\n3) Conclure de manière efficace', duration: '6h' }
    ]
  },
  {
    title: 'Physique-Chimie : La Matière',
    description: 'Atomes, molécules et forces de l\'univers.',
    level: 'collège',
    code: 'COL-PHY-01',
    content: 'Physique et chimie de base.',
    duration: '20h',
    chapters: [
      { title: 'L\'Atome et la Molécule', content: '1) Symbole atomique (C, O, H, N...)\n2) Protons, Neutrons, Électrons\n3) Constitution des molécules d\'eau et de dioxyde de carbone', duration: '4h' },
      { title: 'Loi de l\'Électricité (Ohm)', content: '1) Tension (U) vs Intensité (I)\n2) Le rôle de la résistance (R)\n3) La formule de la loi d\'Ohm (U = R x I)', duration: '4h' },
      { title: 'Les Acides et les Bases', content: '1) L\'échelle de pH (0 à 14)\n2) Les ions H+ et HO-\n3) C\'est quoi une réaction acide-base ?', duration: '3h' },
      { title: 'La Force de Gravité', content: '1) Différence entre Masse (kg) et Poids (Newton)\n2) La relation P = m x g\n3) L\'attraction terrestre', duration: '4h' }
    ]
  },

  // ================= LYCÉE =================
  {
    title: 'Mathématiques : Préparation au BAC',
    description: 'Programme intensif de Mathématiques pour la terminale.',
    level: 'lycée',
    code: 'LYC-MAT-BAC',
    content: 'Analyse, probabilités, suites et matrices.',
    duration: '40h',
    chapters: [
      { title: 'Les Suites Numériques', content: '1) Suites arithmétiques vs géométriques\n2) Raisonnement par récurrence (Initialisation, Hérédité)\n3) Calcul de limites d\'une suite', duration: '6h' },
      { title: 'Croissance et Dérivées', content: '1) Définition du Taux d\'Accroissement\n2) Calculer des dérivées (x², 1/x, u*v)\n3) Déduire les variations d\'une fonction (Tableau de signes)', duration: '5h' },
      { title: 'Fonctions Exponentielles et Logarithmes', content: '1) Caractéristiques fondamentales de e^x\n2) Propriétés analytiques de ln(x)\n3) Résolution d\'équations avec exponentielle', duration: '6h' },
      { title: 'Probabilités Conditionnelles', content: '1) Formule de Bayes et indépendance P(A ∩ B)\n2) L\'arbre pondéré\n3) La loi Binomiale et espérance mathématique', duration: '5h' },
      { title: 'Intégration et Primitives', content: '1) Trouver les primitives usuelles\n2) Intégrale vue comme le calcul de l\'aire sous la courbe\n3) Intégration par parties', duration: '5h' }
    ]
  },
  {
    title: 'Philosophie : La Pensée Critique',
    description: 'Préparation à la dissertation philosophique.',
    level: 'lycée',
    code: 'LYC-PHI-BAC',
    content: 'Étude des grands concepts philosophiques.',
    duration: '35h',
    chapters: [
      { title: 'La Conscience et l\'Inconscient', content: '1) Descartes et le Cogito (Je pense donc je suis)\n2) Kant : le sujet transcendantal\n3) Freud et la théorie de l\'Inconscient', duration: '5h' },
      { title: 'La Liberté et le Devoir', content: '1) Spinoza : le déterminisme (L\'illusion du libre arbitre)\n2) Kant : l\'impératif catégorique et le devoir moral\n3) Sartre : la condamnation à être libre', duration: '5h' },
      { title: 'L\'État et la Justice', content: '1) Rousseau et le Contrat Social\n2) Hobbes vs Locke : l\'état de nature\n3) La justice réparatrice ou distributive', duration: '6h' },
      { title: 'Méthodologie de la Dissertation', content: '1) Analyser le sujet (Pièges et présupposés)\n2) Concevoir une problématique forte\n3) Plan dialectique (Thèse/Antithèse/Synthèse)', duration: '6h' }
    ]
  },
  {
    title: 'Numérique et Informatique (NSI)',
    description: 'Algorithmique avancée et bases de programmation en Python.',
    level: 'lycée',
    code: 'LYC-NSI-01',
    content: 'Bases de l\'informatique.',
    duration: '30h',
    chapters: [
      { title: 'Les Types de Variables', content: '1) Stocker en machine (int, float, string)\n2) Tableaux (Listes en Python)\n3) Dictionnaires et clés', duration: '5h' },
      { title: 'Algorithmique (Boucles et Fonctions)', content: '1) Créer sa propre fonction (def)\n2) La boucle FOR (nombre précis d\'itération)\n3) La boucle WHILE (jusqu\'à une condition)\n4) Notions de complexité', duration: '6h' },
      { title: 'Gestion des Réseaux', content: '1) Modèle OSI vs TCP/IP\n2) C\'est quoi une adresse MAC/IP ?\n3) Le système des requêtes HTTP (serveurs / clients)', duration: '4h' },
      { title: 'Introduction à l\'A.I', content: '1) Qu\'est ce qu\'un réseau neuronal artificiel\n2) Différence entre Machine Learning et Code classique\n3) Les enjeux éthiques de l\'IA', duration: '4h' }
    ]
  },

  // ================= UNIVERSITÉ (FASEG) =================
  {
    title: 'Macroéconomie Avancée',
    description: 'Modélisation des économies à grande échelle.',
    level: 'université',
    major: 'Sciences Économiques',
    code: 'UNI-MAC-01',
    content: 'Le modèle IS-LM, croissance de solow, politique monétaire.',
    duration: '40h',
    chapters: [
      { title: 'Modèle IS-LM', content: '1) Équilibre du marché des biens (IS)\n2) Équilibre monétaire (LM)\n3) Les déplacements des courbes et impact sur les taux\n4) Effet d\'éviction', duration: '6h' },
      { title: 'Inflation et Chômage (Courbe de Phillips)', content: '1) Formulation originelle de Phillips\n2) La critique monétariste (Anticipations de Friedman)\n3) Stagflation et choc pétrolier', duration: '5h' },
      { title: 'Le Modèle de Croissance de Solow', content: '1) Fonction de production Cobb-Douglas à grande échelle\n2) Différence entre accumulation du capital et État stationnaire\n3) Le progrès technique comme moteur endogène', duration: '7h' },
      { title: 'Les Politiques Budgétaires et Monétaires', content: '1) Politique expansive vs restrictive\n2) Outils des Banques Centrales (Taux directeurs)\n3) Analyse sur l\'économie d\'un pays en voie de développement', duration: '6h' }
    ]
  },
  {
    title: 'Microéconomie Quantitative',
    description: 'Comprendre les décisions des agents économiques.',
    level: 'université',
    major: 'Sciences Économiques',
    code: 'UNI-MIC-01',
    content: 'Théorie du consommateur, du producteur et les marchés.',
    duration: '40h',
    chapters: [
      { title: 'La Théorie du Consommateur', content: '1) Les préférences (Courbes d\'indifférences)\n2) Maximiser l\'utilité sous contrainte budgétaire (Lagrangien)\n3) Élasticité Prix direct, croisé, et Revenu', duration: '6h' },
      { title: 'La Théorie du Producteur', content: '1) Maximiser le profit sur le court et long terme\n2) Fonction de coût total, moyen, et marginal\n3) Rendements d\'échelles croissants ou décroissants', duration: '6h' },
      { title: 'Concurrence Pure et Parfaite', content: '1) Les 5 conditions du marché CPP\n2) La règle Prix = Coût Marginal\n3) Le surplus du consommateur et du producteur', duration: '5h' },
      { title: 'Les Monopoles et Oligopoles', content: '1) D\'où vient le monopole ?\n2) Conséquences sociales (Tarification abusive)\n3) Oligopole : Cournot, Bertrand et Théorie des jeux', duration: '6h' }
    ]
  },
  {
    title: 'Comptabilité et Finance d\'Entreprise',
    description: 'Gérer la comptabilité et l\'analyse financière.',
    level: 'université',
    major: 'Gestion de la filière',
    code: 'UNI-CCA-01',
    content: 'Bilan comptable et analyse de la rentabilité.',
    duration: '45h',
    chapters: [
      { title: 'Bilan et Compte de Résultat', content: '1) Structure Actif/Passif (Emplois/Ressources)\n2) Le mécanisme du Compte de Résultat (Charges/Produits)\n3) Passer les écritures au Journal', duration: '6h' },
      { title: 'Analyse Financière (SIG et BFR)', content: '1) Soldes Intermédiaires de Gestion (Valeur Ajoutée, EBE...)\n2) Calculer sa Capacité d\'Autofinancement (CAF)\n3) Fonds de Roulement et Besoin de Fonds de Roulement (BFR)', duration: '7h' },
      { title: 'Mathématiques Financières', content: '1) Taux réels et nominaux\n2) Valeur Actuelle Nette (VAN) d\'un projet\n3) Le Taux de Rentabilité Interne (TRI)', duration: '6h' },
      { title: 'Le Contrôle de Gestion', content: '1) La notion de Centre de Coûts\n2) Différence entre Coût complet et Coût variable (Direct Costing)\n3) Établir le seuil de rentabilité', duration: '5h' }
    ]
  },

  // ================= PRO / IUT =================
  {
    title: 'Création d\'Entreprise & Management',
    description: 'Concevoir un business model et gérer des équipes.',
    level: 'pro',
    major: 'Management',
    code: 'PRO-ENT-01',
    content: 'Créer de la valeur, rédiger un business plan.',
    duration: '35h',
    chapters: [
      { title: 'Le Business Model Canvas', content: '1) Cible clientèle et Proposition de Valeur unique\n2) Structurer ses Revenus vs Coûts\n3) Partenariats stratégiques vitaux', duration: '5h' },
      { title: 'L\'Étude de Marché', content: '1) Définir la demande réelle\n2) Mener une analyse SWOT\n3) Positionnement marketing et prix', duration: '6h' },
      { title: 'Élaborer un Business Plan Financier', content: '1) Rédiger un compte de résultat prévisionnel (3 ans)\n2) Gérer les investissements de départ et dotation\n3) Le plan de financement pour les banques', duration: '7h' },
      { title: 'Les Styles de Leadership', content: '1) Management autocratique vs participatif\n2) Gérer les conflits dans son équipe\n3) Mettre en place des KPI de motivation', duration: '5h' }
    ]
  },
  {
    title: 'Développement Web Full-Stack',
    description: 'Formation professionnelle sur React.js et Node.js.',
    level: 'pro',
    major: 'Informatique',
    code: 'PRO-DEV-01',
    content: 'Devenir développeur web professionnel.',
    duration: '60h',
    chapters: [
      { title: 'HTML5, CSS3, et Design System', content: '1) Éléments sémantiques HTML et balises SEO\n2) Variables CSS et Grilles avec Flexbox / Grid\n3) C\'est quoi un composant UI et un Design System ?', duration: '8h' },
      { title: 'Javascript et Programmation Asynchrone', content: '1) Comprendre l\'Event Loop de V8\n2) Fetch API et gestion d\'erreurs HTTP\n3) La manipulation du DOM Native', duration: '10h' },
      { title: 'Créer une UI avec React.js', content: '1) Le fonctionnement du JSX et du Virtual DOM\n2) UseState et architecture d\'états\n3) UseEffect pour récupérer des données d\'une API tierce', duration: '12h' },
      { title: 'Backend en Node.js & Base de Données', content: '1) Démarrer un serveur Express\n2) Routes POST, GET, PUT sécurisées via JWT\n3) Schémas et requêtes via Mongoose (MongoDB)', duration: '15h' }
    ]
  }
];

const seedCourses = async () => {
  try {
    console.log('Connexion à MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connecté à la BD.');

    console.log('Suppression des anciens cours...');
    await Course.deleteMany({});

    console.log('Insertion de la base de cours pour les Écoles Virtuelles...');
    await Course.insertMany(COURSES_DATA);

    console.log(`Succès: ${COURSES_DATA.length} modules de cours créés avec succès !`);
    
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors du seed :', error);
    process.exit(1);
  }
};

seedCourses();
