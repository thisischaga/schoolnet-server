const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/schoolnet';

const L1_ECONOMIE_COURSES = [
  // SEMESTRE 1
  {
    title: 'Comptabilité de base',
    code: 'CPT100C',
    level: 'université',
    faculty: 'FASEG',
    major: 'Sciences Économiques',
    semester: 1,
    content: 'La comptabilité de base est le fondement de la gestion d\'entreprise.',
    description: 'Introduction aux principes comptables fondamentaux et à la structure du bilan.',
    chapters: [
      { 
        title: '1. Introduction à la comptabilité', 
        content: 'La comptabilité est un système d\'organisation de l\'information financière permettant de saisir, classer, enregistrer des données de base chiffrées et présenter des états financiers qui reflètent une image fidèle du patrimoine, de la situation financière et du résultat de l\'entité à la date de clôture. Ses rôles sont multiples : preuve juridique, aide à la gestion, information pour les tiers (banques, État).' 
      },
      { 
        title: '2. Le Bilan : Miroir de l\'entreprise', 
        content: 'Le bilan est un document de synthèse qui décrit à une date donnée la situation patrimoniale de l\'entité. Il se compose de l\'Actif (Emplois) et du Passif (Ressources). \n\nACTIF : \n- Actif immobilisé (biens durables : bâtiments, machines).\n- Actif circulant (stocks, créances clients, trésorerie).\n\nPASSIF : \n- Capitaux propres (capital, réserves).\n- Dettes (emprunts, dettes fournisseurs).\n\nÉquilibre fondamental : ACTIF = PASSIF.' 
      },
      { 
        title: '3. Le Compte de Résultat', 
        content: 'Le compte de résultat regroupe les Produits (revenus) et les Charges (dépenses) de l\'exercice. Il permet de dégager le bénéfice ou la perte. \n\nLes charges (classe 6) appauvrissent l\'entreprise (achats de marchandises, salaires).\nLes produits (classe 7) enrichissent l\'entreprise (ventes de produits finis).\n\nRésultat = Produits - Charges.' 
      }
    ]
  },
  {
    title: 'Introduction à l’économie',
    code: 'ECO100C',
    level: 'université',
    faculty: 'FASEG',
    major: 'Sciences Économiques',
    semester: 1,
    content: 'L\'économie étudie comment les individus et les sociétés utilisent des ressources rares.',
    description: 'Concepts de base de l\'économie, besoins, rareté et circuits économiques.',
    chapters: [
      { 
        title: '1. L\'objet de la science économique', 
        content: 'L\'économie est la science qui étudie la manière dont les hommes s\'organisent pour lutter contre la rareté. Le problème économique naît de la confrontation entre des besoins illimités et des ressources limitées. Il faut donc faire des choix (arbitrages) pour maximiser la satisfaction.' 
      },
      { 
        title: '2. Les agents économiques', 
        content: 'On distingue généralement cinq types d\'agents : \n1. Les Ménages (fonction : consommation).\n2. Les Sociétés Non Financières (fonction : production marchande).\n3. Les Administrations Publiques (fonction : production non marchande et redistribution).\n4. Les Institutions de Crédit (fonction : financement).\n5. Le Reste du Monde (échanges extérieurs).' 
      },
      { 
        title: '3. Le circuit économique', 
        content: 'Le circuit économique est une représentation simplifiée de l\'activité économique. Il montre les relations (flux réels et monétaires) entre les agents. Par exemple, les ménages fournissent du travail aux entreprises et reçoivent en échange un salaire (flux monétaire).' 
      }
    ]
  },
  {
    title: 'Principes de base de la microéconomie',
    code: 'ECO101C',
    level: 'université',
    faculty: 'FASEG',
    major: 'Sciences Économiques',
    semester: 1,
    content: 'La microéconomie analyse les comportements individuels des agents.',
    description: 'Étude du comportement individuel des consommateurs et des producteurs.',
    chapters: [
      { 
        title: '1. Théorie du consommateur', 
        content: 'Le consommateur cherche à maximiser son utilité sous contrainte budgétaire. L\'utilité marginale est le supplément de satisfaction apporté par la consommation d\'une unité supplémentaire d\'un bien. Elle est généralement décroissante.' 
      },
      { 
        title: '2. La demande du marché', 
        content: 'La demande est une fonction décroissante du prix. Plus le prix est élevé, moins la quantité demandée est importante (sauf pour certains biens de luxe ou de première nécessité). L\'élasticité-prix mesure la sensibilité de la demande aux variations de prix.' 
      }
    ]
  }
];

const seedEcoL1 = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connecté pour l\'ajout des cours détaillés');

    await Course.deleteMany({ faculty: 'FASEG', semester: 1 });
    
    await Course.insertMany(L1_ECONOMIE_COURSES);
    console.log(`Succès: ${L1_ECONOMIE_COURSES.length} cours détaillés ajoutés.`);
    
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedEcoL1();
