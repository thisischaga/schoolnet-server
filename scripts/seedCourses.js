const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');

dotenv.config();

const troncCommunL1 = [
  // Semestre 1
  { code: "CPT100C", title: "Comptabilité de base", credits: 5, nature: "Fondamentale", semester: 1 },
  { code: "ECO100C", title: "Introduction à l’économie", credits: 4, nature: "Fondamentale", semester: 1 },
  { code: "ECO101C", title: "Principes de base de la microéconomie", credits: 5, nature: "Fondamentale", semester: 1 },
  { code: "ECO102C", title: "Principes de base de la macroéconomie", credits: 5, nature: "Fondamentale", semester: 1 },
  { code: "ECO103C", title: "Analyse mathématique", credits: 5, nature: "Fondamentale", semester: 1 },
  { code: "ECO104C", title: "Statistique descriptive", credits: 4, nature: "Fondamentale", semester: 1 },
  { code: "ECO205C", title: "Histoire des faits économiques et sociaux", credits: 3, nature: "Fondamentale", semester: 1 },
  
  // Semestre 2
  { code: "CPT200C", title: "Comptabilité des opérations courantes", credits: 6, nature: "Approfondissement", semester: 2 },
  { code: "ECO201C", title: "Equilibre partiel en microéconomie", credits: 6, nature: "Approfondissement", semester: 2 },
  { code: "ECO202C", title: "Modèles de base de la macroéconomie", credits: 6, nature: "Approfondissement", semester: 2 },
  { code: "ECO203C", title: "Algèbre linéaire", credits: 6, nature: "Approfondissement", semester: 2 },
  { code: "ECO204C", title: "Séries chronologiques de base", credits: 6, nature: "Approfondissement", semester: 2 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/schoolnet');
    console.log('Database connected!');

    await Course.deleteMany({});
    console.log('Catalogue vidé.');

    const insertBuffer = troncCommunL1.map(module => {
      let courseData = {
        title: module.title,
        code: module.code,
        description: `Unité d'enseignement ${module.nature} - ${module.credits} Crédits. Programme Tronc Commun L1 FASEG.`,
        level: 'université',
        faculty: 'FASEG',
        major: 'tronc_commun',
        semester: module.semester,
        content: `Bienvenue dans le cours de ${module.title}. Ce module de Licence 1 est fondamental pour votre parcours à la FASEG.`,
        chapters: [
          { title: "Chapitre 1: Introduction", content: "Introduction aux concepts de base." },
          { title: "Chapitre 2: Développement", content: "Approfondissement des notions clés." },
          { title: "Chapitre 3: Conclusion & Exercices", content: "Résumé et applications pratiques." }
        ],
        quiz: []
      };

      // Attacher les quiz selon le code du module
      if (module.code === 'CPT100C') {
        courseData.quiz = [
          {
            question: "Quelle est la formule du résultat net ?",
            options: ["Produits + Charges", "Produits - Charges", "Actif - Passif", "Capitaux Propres + Dettes"],
            correctAnswer: "Produits - Charges"
          },
          {
            question: "La partie double signifie que :",
            options: ["Chaque opération s'enregistre deux fois à l'actif", "Le total Débit est égal au total Crédit", "Le total de la balance est le double du journal"],
            correctAnswer: "Le total Débit est égal au total Crédit"
          },
          {
            question: "La classe 5 dans le plan des comptes SYSCOHADA représente :",
            options: ["Les stocks", "Les comptes de tiers", "Les comptes de trésorerie"],
            correctAnswer: "Les comptes de trésorerie"
          }
        ];
      } else if (module.code === 'ECO101C') {
        courseData.quiz = [
          {
            question: "À l'équilibre du consommateur, la tangence entre la courbe d'indifférence et la contrainte budgétaire implique :",
            options: ["TMS = P1 / P2", "Um1 = Um2", "TMS = R / P1", "Um1 / P2 = Um2 / P1"],
            correctAnswer: "TMS = P1 / P2"
          },
          {
            question: "Un bien de Giffen est un bien inférieur pour lequel :",
            options: ["La demande diminue quand le prix augmente", "La demande augmente quand le prix augmente", "La demande est insensible au prix"],
            correctAnswer: "La demande augmente quand le prix augmente"
          },
          {
            question: "La zone de rationalité du producteur est la zone où :",
            options: ["Pm_L > PM_L", "Pm_L < PM_L et Pm_L > 0", "Pm_L < 0"],
            correctAnswer: "Pm_L < PM_L et Pm_L > 0"
          }
        ];
      } else if (module.code === 'ECO102C') {
        courseData.quiz = [
          {
            question: "Selon la loi de Say :",
            options: ["L'offre crée sa propre demande", "La demande crée son offre", "L'intérêt est déterminé par la monnaie"],
            correctAnswer: "L'offre crée sa propre demande"
          },
          {
            question: "La courbe LM représente l'équilibre sur le :",
            options: ["Marché des biens", "Marché du travail", "Marché de la monnaie"],
            correctAnswer: "Marché de la monnaie"
          },
          {
            question: "Dans le modèle IS-LM, l'effet d'éviction désigne :",
            options: ["Une hausse des impôts réduisant l'investissement", "Une hausse de la dépense publique évinçant l'investissement privé via une hausse du taux d'intérêt", "L'expulsion des banques étrangères"],
            correctAnswer: "Une hausse de la dépense publique évinçant l'investissement privé via une hausse du taux d'intérêt"
          }
        ];
      } else if (module.code === 'CPT200C') {
        courseData.quiz = [
          {
            question: "Sur une facture DOIT, quel montant est enregistré en comptabilité ?",
            options: ["Le brut de la facture", "Le net commercial", "Le net à payer TTC"],
            correctAnswer: "Le net commercial"
          },
          {
            question: "Le compte 4452 correspond à :",
            options: ["État, TVA facturée", "État, TVA récupérable", "État, TVA due"],
            correctAnswer: "État, TVA récupérable"
          },
          {
            question: "La consignation d'emballage chez le client s'enregistre au débit de quel compte ?",
            options: ["4094 Créances pour emballages", "4194 Dettes pour emballages", "6082 ERNI"],
            correctAnswer: "4094 Créances pour emballages"
          }
        ];
      } else if (module.code === 'ECO204C') {
        courseData.quiz = [
          {
            question: "Si le coefficient de Pearson (r) est de -0.9, on dit que :",
            options: ["Il n'y a pas de corrélation", "Il y a une corrélation positive forte", "Il y a une corrélation négative forte"],
            correctAnswer: "Il y a une corrélation négative forte"
          },
          {
            question: "Dans le modèle additif de décomposition des séries chronologiques, l'équation est :",
            options: ["X = T * S * E", "X = T + S + E", "X = T / S - E"],
            correctAnswer: "X = T + S + E"
          }
        ];
      } else {
        courseData.quiz = [
          {
            question: `Quelle est la finalité de l'étude du cours : ${module.title} ?`,
            options: ["Comprendre les bases théoriques", "Appliquer les outils en entreprise", "Valider les crédits FASEG", "Toutes les réponses ci-dessus"],
            correctAnswer: "Toutes les réponses ci-dessus"
          }
        ];
      }

      if (module.code === 'ECO101C') {
        courseData.content = "Ce cours présente les concepts fondamentaux de la microéconomie. Enseignants : Pr. COUCHORO & Dr. AGUEY.";
        courseData.chapters = [
          {
            title: "Chapitre I : INTRODUCTION",
            content: `# Introduction à la Microéconomie\n\n**Science économique**\nLa science qui étudie le comportement de l'homme face à la rareté des ressources est qualifiée d'économique.\nLa science économique étudie le comportement humain comme une relation entre des besoins multiples et des moyens rares ayant d'autres usages.\nC'est donc la science du choix, le choix que fait l'agent économique confronté à la rareté des ressources face à des besoins illimités.\n\n**Le paradigme néo-classique**\nSelon le paradigme néo-classique, tout agent économique ou individu (consommateur, producteur) poursuit uniquement un intérêt personnel qu'il essaie de maximiser ou d'optimiser.\n\nLes caractéristiques du paradigme :\n- Individus et entreprises ont des pouvoirs négligeables sur le marché.\n- Le système économique est libre de toute distorsion.\n- Les agents économiques ne subissent aucun effet externe.\n- Les agents prennent des décisions rationnelles basées sur toutes les informations disponibles.\n\n**Objectifs :**\n- Consommateur : Maximiser l'utilité sous contrainte de ressources.\n- Entreprise : Maximiser le profit sous contrainte de coûts.\n- Gouvernement : Maximiser le bien-être social sous contrainte de budget.\n\n**Théorie économique**\nUne théorie est une explication du monde réel basée sur des propositions logiques. Elle a trois caractéristiques : les postulats, les conditions de test, et les prédictions.\n\n**Microéconomie vs Macroéconomie**\nLa microéconomie analyse le comportement des petites unités (ménages, entreprises). La macroéconomie s'intéresse aux agrégats (PIB, inflation).`
          },
          {
            title: "Chapitre II : THÉORIE DU CONSOMMATEUR",
            content: `# Théorie du consommateur : Préférences et Utilité\n\n**Hypothèses de base sur les préférences :**\n1. **Complétude** : Le consommateur peut comparer et classer tous les paniers possibles.\n2. **Transitivité** : Si A est préféré à B, et B à C, alors A est préféré à C.\n3. **Non-satiété** : Plus est toujours préféré à moins.\n\n**Convexité des préférences**\nLes combinaisons intermédiaires sont préférées aux extrêmes.\n\n**L'utilité marginale (Um)**\nL'utilité marginale d'un bien est l'utilité additionnelle obtenue suite à la consommation d'une unité supplémentaire.\n> \`Um_x = ∂U / ∂x\`\nL'utilité marginale est **décroissante**.\n\n**La courbe d'indifférence**\nLieu géométrique des points où l'utilité est constante. Propriétés : Pente négative, deux courbes ne se coupent jamais.\n\n**Taux Marginal de Substitution (TMS)**\nQuantité d'un bien à sacrifier pour obtenir une unité de l'autre bien tout en gardant la même utilité.\n> \`TMS = Um_1 / Um_2\`\n\n**Contrainte budgétaire & Équilibre**\nL'équation du budget : \`R = x1*P1 + x2*P2\`\nÀ l'équilibre, l'utilité marginale par unité monétaire est la même pour tous les biens : \n> \`Um1 / P1 = Um2 / P2\``
          },
          {
            title: "Chapitre III : EFFETS ET CLASSIFICATION DES BIENS",
            content: `# Effet de Substitution et Effet de Revenu\n\nLa variation du prix d'un bien a deux effets décomposés par l'équation de Slutsky :\n**Effet Total = Effet de Substitution + Effet de Revenu**\n\n- **Effet de Substitution** : Toujours négatif (prix et quantité en sens inverse).\n- **Effet de Revenu** : Dépend de la nature du bien.\n\n**Classification des biens :**\n- **Bien normal** : L'effet de revenu renforce l'effet de substitution (Effet total négatif).\n- **Bien inférieur** : L'effet de revenu est positif.\n- **Bien de Giffen** : Un bien inférieur où l'effet de revenu surpasse l'effet de substitution (l'effet total devient positif : la demande augmente quand le prix augmente).\n\n**Interactions entre les biens :**\n- **Substituts** : Satisfont le même besoin.\n- **Complémentaires** : Consommés ensemble.\n\n**Comportements sociaux :**\n- **Effet d'imitation** : Consommer parce que les autres consomment.\n- **Effet Veblen (Snobisme)** : Consommer pour marquer une classe sociale.`
          },
          {
            title: "Chapitre IV : DEMANDE ET ÉLASTICITÉS",
            content: `# Demande et Élasticités d'un bien\n\nLa demande de marché est la somme horizontale des demandes individuelles.\n\n**Élasticité-prix de la demande (ep)**\nSensibilité de la quantité demandée aux variations du prix.\n> \`ep = (ΔQ / Q) / (ΔP / P)\`\n- **Élastique** : |ep| > 1\n- **Inélastique** : |ep| < 1\n\n**Relation avec la Recette Marginale (Rm)**\n> \`Rm = P(1 + 1/ep)\`\n\n**Élasticités croisées (exy)**\nSensibilité de X face au prix de Y.\n- Substituts : exy > 0\n- Complémentaires : exy < 0\n- Indépendants : exy = 0\n\n**Élasticité-revenu (eR)**\n- Bien de luxe : eR > 1\n- Bien de 1ère nécessité : 0 < eR < 1\n\n**Surplus du Consommateur**\nGain net retiré de l'achat d'un bien à un prix donné.`
          },
          {
            title: "Chapitre V : THÉORIE DU PRODUCTEUR (PRODUCTIVITÉ)",
            content: `# Productivité et Taux Marginal de Substitution Technique\n\nL'entreprise transforme les inputs (Capital K, Travail L) en outputs (q).\n> \`q = f(L, K)\`\n\n**Productivités :**\n- **Moyenne (PM)** = q / L\n- **Marginale (Pm)** = ∂q / ∂L\n\n**Les 3 phases de la production :**\n- **Zone I** : Pm > PM.\n- **Zone II** : Pm < PM et Pm > 0. C'est la zone de rationalité du producteur.\n- **Zone III** : Pm < 0. Le producteur ne produit jamais ici.\n\n**Isoquant et TMST**\nL'isoquant regroupe les combinaisons d'inputs donnant la même production.\nLe **TMST** (Taux Marginal de Substitution Technique) mesure la pente de l'isoquant.\n> \`TMST = Pm_L / Pm_K\``
          },
          {
            title: "Chapitre VI : ÉLASTICITÉ ET RENDEMENT",
            content: `# Minimisation des Coûts et Rendements d'Échelle\n\n**Équilibre du producteur**\nObjectif : Minimiser le coût \`C = wL + rK\` sous contrainte de production.\nÀ l'équilibre :\n> \`Pm_L / w = Pm_K / r\`\n\n**Élasticité de substitution (σ)**\nMesure la facilité à substituer un input à un autre.\n- Substituts parfaits : σ = ∞\n- Compléments parfaits (Leontief) : σ = 0\n\n**Rendements à l'échelle :**\n- **Constants** : La production évolue proportionnellement aux inputs.\n- **Croissants** : La production évolue plus que proportionnellement.\n- **Décroissants** : La production évolue moins que proportionnellement.\n\n**Fonctions de production classiques :**\n1. Linéaire : Substituts parfaits.\n2. Leontief : Compléments parfaits.\n3. Cobb-Douglas : Substituabilité modérée.\n4. C.E.S : Élasticité de substitution constante.`
          },
          {
            title: "Chapitre VII : COÛTS ET PROFIT",
            content: `# Les Coûts et la Maximisation du Profit\n\n**Différents types de coûts :**\n- **Coût comptable** : Somme dépensée.\n- **Coût d'opportunité** : Valeur du meilleur usage alternatif.\n- **Coût fixe (CF)** : Indépendant de la production.\n- **Coût variable (CV)** : Varie avec la production.\n\n**Coût Marginal (Cm) et Coût Moyen (CM)**\nLe Cm coupe le CM et le CVM à leur minimum. L'intersection entre Cm et CM est le seuil de rentabilité.\n\n**Maximisation du Profit (π)**\n> \`π = Recette Totale - Coût Total\`\nCondition de premier ordre :\n> \`Prix (P) = Coût Marginal (Cm)\`\n\n**Fonction d'offre de l'entreprise**\nÀ court terme, la courbe d'offre correspond à la portion de la courbe de Cm située au-dessus du Coût Variable Moyen (CVM).`
          },
          {
            title: "Chapitre VIII : LA CONCURRENCE PURE ET PARFAITE",
            content: `# La Concurrence Pure et Parfaite (CPP)\n\nLe marché parfaitement concurrentiel repose sur 4 hypothèses :\n1. **Atomicité** : Grand nombre d'acheteurs et de vendeurs (pouvoir de marché nul).\n2. **Homogénéité** : Produits identiques.\n3. **Transparence** : Information parfaite sur les prix et les produits.\n4. **Fluidité** : Libre entrée et sortie du marché.\n\n**Équilibre à Court Terme**\nL'entreprise maximise son profit là où \`P = Cm\`.\n\n**Équilibre à Long Terme**\nDe nouvelles entreprises entrent si le profit est positif, poussant le prix à la baisse.\nÀ long terme, le profit économique est nul :\n> \`P = Cm = CM minimum\``
          },
          {
            title: "Chapitre IX : LE MONOPOLE",
            content: `# Le Monopole\n\nUn seul vendeur contrôle complètement une industrie.\n\n**Recette Marginale (Rm) et Maximisation**\nContrairement à la CPP, la Recette Marginale du monopoleur est toujours inférieure au prix (\`Rm < P\`).\nLe monopoleur maximise son profit lorsque :\n> \`Rm = Cm\`\nLe prix sera ensuite lu sur la courbe de demande, au-dessus du Cm.\n\n**Monopole Discriminant**\nLe monopoleur peut vendre sur deux marchés à des prix différents.\nLe prix sera plus bas sur le marché où l'élasticité de la demande est la plus forte.\nCondition d'équilibre : \`Rm1 = Rm2 = Cm\`.\n\n**Monopole avec plusieurs firmes (Cartel)**\nL'entreprise alloue sa production de façon à égaliser les coûts marginaux : \`Cm1 = Cm2 = Rm\`. L'établissement avec le coût le plus faible produit plus.`
          },
          {
            title: "Chapitre X : CONCURRENCE MONOPOLISTIQUE ET OLIGOPOLE",
            content: `# Marchés Imparfaits : Concurrence Monopolistique et Oligopole\n\n**Concurrence Monopolistique**\nGrand nombre d'entreprises, libre entrée, mais les **produits sont différenciés** (marque, qualité, design).\nÀ court terme : Comportement de monopole (\`Rm = Cm\`).\nÀ long terme : L'entrée de nouveaux concurrents ramène le profit à zéro (P = CM), mais l'entreprise ne produit pas au minimum de son coût moyen.\n\n**Oligopole**\nPetit nombre de vendeurs dont les décisions s'influencent mutuellement (interactions stratégiques).\n\n1. **Modèle de Stackelberg (Leader en quantité)**\nLe leader choisit sa production en premier, en anticipant la réaction du suiveur. Le suiveur s'adapte.\n\n2. **Modèle de Cournot (Jeu simultané en quantité)**\n chaque entreprise choisit sa production en considérant celle de l'autre comme donnée. L'équilibre se trouve à l'intersection des fonctions de réaction.\n\n3. **Modèle de Bertrand (Jeu simultané en prix)**\nLes entreprises se font concurrence par les prix. Le résultat tend vers la concurrence parfaite (\`P = Cm\`).\n\n4. **Collusion (Cartel)**\nLes entreprises s'entendent pour agir comme un monopole unique et se partager le marché.`
          }
        ];
      }

      if (module.code === 'CPT200C') {
        courseData.content = "Ce cours permet de comprendre et d'enregistrer les opérations courantes de l'entreprise (facturation, TVA, règlements, personnel). Enseignants : Mme KOUEVI Tsotso & M. EDORH Didy.";
        courseData.chapters = [
          {
            title: "Chapitre 1 : LES DOCUMENTS RELATIFS AUX ACHATS ET VENTES",
            content: `# Documents relatifs aux Achats et Ventes\n\nLa réalisation des opérations d'achat et de vente suit un processus logique matérialisé par des documents écrits.\n\n### 1. Appel d'offre\nL'entreprise s'adresse à plusieurs fournisseurs pour connaître les meilleures conditions avant de commander.\n\n### 2. La commande (Bon de commande)\nDocument par lequel le client manifeste sa volonté d'acheter des marchandises à des conditions précises.\n\n### 3. La livraison / La réception\n- **Bon de livraison** : Établi par le fournisseur attestant la livraison.\n- **Bon de réception** : Signé par le client attestant la réception conforme.\n\n### 4. La facturation\n- **Facture DOIT** : Constate la créance du fournisseur sur le client suite à une vente.\n- **Facture AVOIR** : Constate une diminution de la dette du client (retour de marchandises, réductions).\n- **Facture Pro-forma** : Établie "pour la forme", souvent pour des demandes de financement.`
          },
          {
            title: "Chapitre 2 : LA TAXE SUR LA VALEUR AJOUTÉE (TVA)",
            content: `# La Taxe sur la Valeur Ajoutée (TVA)\n\n### Comptabilisation (Schéma classique)\n\n**Achat de marchandises (TVA déductible) :**\n| Débit | Crédit | Compte | Libellé | Montant |\n| :--- | :--- | :--- | :--- | :--- |\n| 601 | | Achats de marchandises | HT | X |\n| 4452 | | État, TVA récupérable | TVA | Y |\n| | 401 | Fournisseur | TTC | Z |\n\n**Vente de marchandises (TVA collectée) :**\n| Débit | Crédit | Compte | Libellé | Montant |\n| :--- | :--- | :--- | :--- | :--- |\n| 411 | | Client | TTC | Z |\n| | 701 | Ventes de marchandises | HT | X |\n| | 4431 | État, TVA facturée | TVA | Y |\n\n### Liquidation de la TVA (Fin de mois)\n| Débit | Crédit | Compte | Libellé | Montant |\n| :--- | :--- | :--- | :--- | :--- |\n| 4431 | | État, TVA facturée | Solde | X |\n| | 4452 | État, TVA récupérable | Solde | Y |\n| | 4441 | État, TVA due | À verser | Z |`
          },
          {
            title: "Chapitre 3 : LES OPÉRATIONS D'ACHAT ET DE VENTE",
            content: `# Enregistrement des Achats et Ventes\n\n### Inventaire Permanent (Chez le client)\n| Débit | Crédit | Compte | Libellé | Montant |\n| :--- | :--- | :--- | :--- | :--- |\n| 31 | | Marchandises | Entrée stock | CA |\n| | 6031 | Var. de stocks | | CA |\n| 601 | | Achats de m/ses | Facture | HT |\n| 4452 | | État, TVA récup. | | TVA |\n| | 401 | Fournisseur | | TTC |\n\n**Réductions Commerciales (Cascade) :**\n1. **Rabais** : Pour défaut de qualité ou retard.\n2. **Remise** : Pour importance de la commande ou qualité du client.\n3. **Ristourne** : Calculée sur le volume global des affaires sur une période.\n\n*Note : Sur une facture DOIT, seul le Net Commercial est enregistré.*\n\n**Réduction Financière :**\n- **Escompte** : Accordé pour paiement anticipé. Enregistré en 773 (Client) ou 673 (Fournisseur).`
          },
          {
            title: "Chapitre 4 : LES FRAIS DE TRANSPORT",
            content: `# Comptabilisation des Frais de Transport\n\n### 1. Port payé par le fournisseur à la charge du client\nLe fournisseur paie le transporteur et récupère le montant sur le client.\n- Fournisseur : Utilise le compte **7071** (Port facturé).\n- Client : Utilise le compte **60152** (Transport sur achats).\n\n### 2. Port payé par le client à la charge du fournisseur\nLe client paie et déduit le montant de sa dette envers le fournisseur.\n- Client : Compte **613** (Transport pour compte de tiers).\n- Fournisseur : Compte **612** (Transport sur vente).`
          },
          {
            title: "Chapitre 5 : LES EMBALLAGES COMMERCIAUX",
            content: `# Les Emballages Commerciaux\n\n### 1. Catégories d'emballages\n- **Emballages perdus (6081)** : Non récupérés, vendus avec la marchandise.\n- **ERNI (6082)** : Emballages Récupérables Non Identifiables (bouteilles, caisses) pouvant être consignés.\n\n### 2. La Consignation\nC'est le prêt d'emballages contre dépôt d'une somme d'argent.\n- **Chez le client** : Débit du compte **4094** (Créance pour emballages).\n- **Chez le fournisseur** : Crédit du compte **4194** (Dette pour emballages).\n\n### 3. La Déconsignation\n- Au prix de consignation : Annulation simple.\n- À un prix inférieur (Pénalité) : La différence constitue un **Mali** pour le client (6224) et un **Boni** pour le fournisseur (7074).`
          },
          {
            title: "Chapitre 6 : LES MODES DE RÈGLEMENT ET EFFETS DE COMMERCE",
            content: `# Modes de Règlement et Effets de Commerce\n\n### 1. Moyens de paiement classiques\n- Espèces (57), Chèques (513/521), Virements, Cartes bancaires (515), Monnaies électroniques (55 - TMoney, Flooz).\n\n### 2. Les Effets de Commerce (Traite / Billet à ordre)\nCe sont des titres négociables représentatifs d'une créance.\n- **Lettre de Change (Traite)** : Créée par le tireur (fournisseur).\n- **Billet à ordre** : Créé par le souscripteur (client).\n\n### 3. Opérations sur effets\n- **Encaissement** : Remise à la banque pour paiement à l'échéance.\n- **Escompte** : Vente de l'effet à la banque avant l'échéance contre des agios.\n- **Endossement** : Utilisation de l'effet pour payer un autre fournisseur.\n- **Impayés** : Si le client ne paie pas à l'échéance, l'effet revient avec des frais de protêt.`
          },
          {
            title: "Chapitre 7 : LES CHARGES DE PERSONNEL",
            content: `# Les Charges de Personnel\n\nEnregistrement comptable de la paie et des charges sociales/fiscales.\n\n### 1. Composantes du salaire\n- **Salaire de base** + Heures supplémentaires + Primes = **Salaire Brut**.\n- **Salaire Net** = Salaire Brut - Retenues (CNSS, IRPP, TCS).\n\n### 2. Les Retenues (Togo)\n- **CNSS (Part ouvrière)** : 4% de la base imposable.\n- **IRPP** : Impôt sur le revenu selon barème.\n- **TCS** : Taxe Complémentaire sur Salaire (125F ou 250F/mois).\n\n### 3. Charges Patronales\n- **Sociales (CNSS)** : 17,5%.\n- **Fiscales** : 3%.\n\n### 4. Schéma de comptabilisation\n1. Enregistrement du Salaire Brut (661).\n2. Enregistrement des retenues (42, 43, 44).\n3. Enregistrement des charges patronales (664).\n4. Paiement des salaires (421 vers 521).`
          }
        ]
      };

      if (module.code === 'ECO204C') {
        courseData.content = "Cette UE aborde l'étude des liaisons statistiques, l'analyse des séries chronologiques et le calcul des indices statistiques. Enseignants : A.K. ETOUDJI & M. AYELIM.";
        courseData.chapters = [
          {
            title: "Chapitre 1 (S1-2) : CORRÉLATION LINÉAIRE DE PEARSON",
            content: `# Étude de la dépendance entre variables quantitatives\n\n## 1. La Covariance\nMesure de la variation conjointe de deux variables X et Y :\n> \`Cov(X,Y) = (1/n) × Σ(xi - X̄)(yi - Ȳ) = XȲ - X̄Ȳ\`\n\n## 2. Le Coefficient de Pearson (r)\n> \`r = Cov(X,Y) / (σX × σY)\`\n\n| Valeur de r | Interprétation |\n| :--- | :--- |\n| r ≈ 0 | Pas de corrélation linéaire |\n| r ≈ 1 | Corrélation positive forte |\n| r ≈ -1 | Corrélation négative forte |\n\n## 3. Test de validité (seuil 5%)\nAvant d'interpréter r, vérifier :\n> \`|r| × √(n-2) / √(1 - r²) ≥ 2,6\`\n\n## Exemple résolu : Revenu vs Consommation (n=10)\n\n| N° | R | C | R² | C² | RC |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| 1 | 30 | 20 | 900 | 400 | 600 |\n| 2 | 44 | 28 | 1936 | 784 | 1232 |\n| 10 | 60 | 35 | 3600 | 1225 | 2100 |\n| **Total** | **438** | **275** | **20432** | **7767** | **12511** |\n\nRésultat : **R̄ = 43,8 ; C̄ = 27,5 ; r = 0,92** → Corrélation forte et valide.`
          },
          {
            title: "Chapitre 1 (S2-3) : RÉGRESSION ET CORRÉLATION DE SPEARMAN",
            content: `# Régression Linéaire Simple & Spearman\n\n## A. Régression Linéaire (Méthode MCO)\nDroite d'équation : **ŷ = ax + b**\n\n| Paramètre | Formule |\n| :--- | :--- |\n| Pente a | \`a = Cov(X,Y) / Var(X)\` |\n| Constante b | \`b = Ȳ - a × X̄\` |\n\n**Interprétations :**\n- **a** = variation moyenne de Y quand X augmente d'1 unité\n- **b** = valeur de Y quand X = 0\n\n## B. Méthode de Mayer\n1. Ordonner les données par X croissant puis diviser en 2 groupes\n2. Calculer les points moyens P1(x̄₁, ȳ₁) et P2(x̄₂, ȳ₂)\n3. **a = (ȳ₂ - ȳ₁) / (x̄₂ - x̄₁)** ; **b = ȳ₁ - a×x̄₁**\n\n## C. Coefficient de Spearman (ρ)\nPour données ordinales ou non-normales :\n> \`ρ = 1 - (6 × Σdᵢ²) / (n³ - n)\` avec **dᵢ = rg(xᵢ) - rg(yᵢ)**\n\n### Tableau de calcul Spearman :\n| N° | Xi | Yi | rg(X) | rg(Y) | d | d² |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| 1 | 30 | 50 | 10 | 10 | 0 | 0 |\n| 2 | 31 | 55 | 9 | 8 | 1 | 1 |\n| 10 | 38 | 150 | 2 | 1 | 1 | 1 |\n| **Total** | | | | | | **10** |\n\nRésultat : **ρ = 0,94**`
          },
          {
            title: "Chapitre 1 (S4-5) : KHI-DEUX ET ANOVA",
            content: `# Variables Qualitatives et Mixtes\n\n## A. Test du Khi-Deux (2 variables qualitatives)\n\n**Effectif théorique :** n*ᵢⱼ = (nᵢ. × n.ⱼ) / n\n\n**Khi-deux calculé :**\n> \`χ² = Σ (O - T)² / T\`\n\n| Degré de liberté | ddl = (m₁ - 1)(m₂ - 1) |\n| :--- | :--- |\n| Seuil | 5% (1 - α = 95%) |\n| Décision | χ²calc > χ²table → Relation significative |\n\n**Intensité :** C = √(χ² / (χ² + n))\n\n| Valeur de C | Interprétation |\n| :--- | :--- |\n| > 0,8 | Très forte |\n| 0,5 – 0,8 | Forte |\n| 0,2 – 0,5 | Moyenne |\n| < 0,2 | Faible |\n\n## B. ANOVA (1 var. qualitative + 1 var. quantitative)\n\n| Composante | Formule |\n| :--- | :--- |\n| Vintra | (1/n) × Σ nₖ × V(Yₖ) |\n| Vinter | (1/n) × Σ nₖ × (Ȳₖ - Ȳ)² |\n| Statistique F | [Vinter/(K-1)] / [Vintra/(n-K)] |\n\nSi F > F-table → Y dépend de X.`
          },
          {
            title: "Chapitre 2 (S6-8) : LES SÉRIES CHRONOLOGIQUES",
            content: `# Trend et Variations Saisonnières\n\n## 1. Modèles de décomposition\n\n| Modèle | Formule | Graphique |\n| :--- | :--- | :--- |\n| **Additif** | Xₜ = Tₜ + Sₜ + εₜ | Bande de variation constante |\n| **Multiplicatif** | Xₜ = Tₜ × Sₜ × εₜ | Variations qui s'amplifient |\n\n## 2. Détermination du Trend\n\n**MCO :** Résoudre le système normales pour trouver a et b de Tₜ = at + b\n\n**Moyennes Mobiles :** ordre p = période de la série\n- Trimestrielle → p = 4\n- Mensuelle → p = 12\n\n## 3. Coefficients Saisonniers (Méthode rapports au trend)\n\n| Étape | Modèle Multiplicatif | Modèle Additif |\n| :--- | :--- | :--- |\n| Variation brute | Sₜ = Xₜ / Tₜ | Sₜ = Xₜ - Tₜ |\n| Sⱼ | Moyenne par saison j | Moyenne par saison j |\n| Vérification | ΣSⱼ = nb saisons | ΣSⱼ = 0 |\n| Série CVS | CVS = Xₜ / S'ⱼ | CVS = Xₜ - S'ⱼ |\n\n### Exemple (Activité 7 - modèle additif) :\n| t | Xₜ | Tₜ | Sₜ = Xₜ - Tₜ |\n| :--- | :--- | :--- | :--- |\n| 1 | 415 | 385 | +29,6 |\n| 2 | 550 | 394 | +156 |\n| 3 | 340 | 403 | -63 |\n| 4 | 220 | 412 | -192 |`
          },
          {
            title: "Chapitre 3 (S9-10) : LES INDICES STATISTIQUES",
            content: `# Indices Simples et Synthétiques\n\n## 1. Indice Élémentaire\n> \`Iₜ/₀ = (Xₜ / X₀) × 100\`\n\n| Propriété | Formule |\n| :--- | :--- |\n| Réversibilité | Iₜ/₀ × I₀/ₜ = 10 000 |\n| Circularité | Iₜ/₀ = (Iₜ/ₜ' × Iₜ'/₀) / 100 |\n\n## 2. Coefficient Budgétaire\n> \`βⱼₜ = (Pⱼₜ × qⱼₜ) / Σ(Pᵢₜ × qᵢₜ)\` = part du bien j dans la dépense\n\n## 3. Indices Synthétiques\n\n| Indice | Formule Prix | Formule Quantité |\n| :--- | :--- | :--- |\n| **Laspeyres** | Σ(Pₜ×Q₀) / Σ(P₀×Q₀) × 100 | Σ(P₀×Qₜ) / Σ(P₀×Q₀) × 100 |\n| **Paasche** | Σ(Pₜ×Qₜ) / Σ(P₀×Qₜ) × 100 | Σ(Pₜ×Qₜ) / Σ(Pₜ×Q₀) × 100 |\n| **Fisher** | √(Laspeyres × Paasche) | √(Laspeyres × Paasche) |\n| **Valeurs** | Σ(Pₜ×Qₜ) / Σ(P₀×Q₀) × 100 | = L(P) × P(Q) |\n\n**Choix :** Laspeyres = plus simple (besoin des prix courants seulement). Paasche = plus précis (besoin prix + quantités courantes). À réviser tous les 6-8 ans.`
          }
        ];
      }

      if (module.code === 'ECO202C') {
        courseData.content = "Ce cours analyse les mécanismes de détermination des variables macroéconomiques (production, prix, emploi, taux d'intérêt) dans les modèles classique, keynésien et IS-LM. Enseignants : Prof. A. Amadou & Dr D. Djahini-Afawoubo.";
        courseData.chapters = [
          {
            title: "Chapitre 1 : L'ÉQUILIBRE NÉOCLASSIQUE (Prix flexibles)",
            content: `# L'approche Classique/Néoclassique\n\n## Hypothèse centrale\nLes **prix sont parfaitement flexibles** → équilibre automatique et instantané sur tous les marchés.\n\n## 1. Marché du Travail\n\n| Acteur | Comportement | Variable clé |\n| :--- | :--- | :--- |\n| **Entreprises (Ld)** | Demande décroissante | Salaire réel (wr) |\n| **Ménages (Lo)** | Offre croissante | Salaire réel (wr) |\n| **Équilibre** | Ld = Lo → plein emploi | wr* = PmL |\n\n**Types de chômage reconnus :**\n\n| Type | Cause | Nature |\n| :--- | :--- | :--- |\n| Volontaire | Salaire de réservation > wr marché | Choix rationnel |\n| Frictionnel | Imperfection de l'information | Temporaire |\n| Structurel | Inadaptation offre/demande de qualifications | Transition |\n| Classique | Rigidités institutionnelles (SMIG, syndicats) | Involontaire |\n\n> Le **taux de chômage naturel** = frictionnel + structurel + classique.\n\n## 2. Marché des Biens (Loi de Say)\n> *"L'offre crée sa propre demande"* — Jean-Baptiste Say (1803)\n\n- S = S(i) → **épargne croissante avec i**\n- I = I(i) → **investissement décroissant avec i**\n- Flexibilité du taux d'intérêt garantit S(i) = I(i)\n- **Offre globale** : droite verticale à Ype (PIB de plein emploi)\n\n## 3. Marché Monétaire (Théorie Quantitative)\n> **M̄ × V̄ = P × Ype**\n\n- V = constante (habitudes de paiement)\n- Y = Ype (fixe)\n- Donc : ΔM → ΔP proportionnel → **la monnaie est neutre**\n\n## 4. Résumé comparatif\n\n| Variable | Déterminant |\n| :--- | :--- |\n| Emploi / Production | Marché du travail (concurrence parfaite) |\n| Taux d'intérêt | Équilibre S = I |\n| Niveau des prix | Théorie quantitative de la monnaie |\n| Politique économique | **Inutile** (marchés auto-régulateurs) |`
          },
          {
            title: "Chapitre 2 : L'ÉQUILIBRE KEYNÉSIEN (Prix rigides)",
            content: `# L'approche Keynésienne\n\n## Hypothèse centrale\nLes **prix sont rigides à court terme** → ajustement par les **quantités**, pas par les prix.\n\n## 1. Fonctions de base\n\n| Composante | Formule | Déterminant |\n| :--- | :--- | :--- |\n| Consommation | C = C₀ + cY (0 < c < 1) | Revenu (Y) |\n| Épargne | S = sY - C₀ ; s = 1 - c | Revenu (Y) |\n| Investissement | I = I₀ + bi (b < 0) | Taux d'intérêt (i) |\n| Importations | M = mY (0 < m < 1) | Revenu (Y) |\n\n> **c** = propension marginale à consommer ; **s** = propension marginale à épargner\n\n## 2. Équilibre du Marché des Biens\n\n**Demande Globale :** DG = C₀ + cY + I + G + X - mY\n\n**Multiplicateur :** k = 1 / (s + m)\n\n> Un équilibre peut exister **avec du chômage** (équilibre de sous-emploi) car c'est la **demande effective** qui détermine la production.\n\n## 3. Marché Monétaire Keynésien\n\n**Demande de monnaie = L1 (transactions) + L2 (spéculation)**\n\n| Motif | Formule | Dépend de |\n| :--- | :--- | :--- |\n| Transaction + Précaution (L1) | L1 = gY | Revenu Y |\n| Spéculation (L2) | L2 = hi (h < 0) | Taux d'intérêt i |\n| **Total** | Md/P = gY + hi | Y et i |\n\n> **Trappe à liquidité** : à i très faible, tous préfèrent la liquidité → politique monétaire inefficace.\n\n## 4. Marché du Travail Keynésien\n\n| | Néoclassique | Keynésien |\n| :--- | :--- | :--- |\n| Offre de travail | Fonction de wr (réel) | Fonction de w (nominal) |\n| Salaire | Parfaitement flexible | **Rigide à la baisse** |\n| Chômage | Volontaire | **Involontaire** (insuffisance de demande) |\n| Remède | Baisser les salaires | **Stimuler la demande globale** |`
          },
          {
            title: "Chapitre 3 : LE MODÈLE IS-LM",
            content: `# Modèle IS-LM (John Hicks, 1937)\n\nSynthèse de l'équilibre simultané sur le **marché des biens (IS)** et le **marché monétaire (LM)**.\n\n## 1. La Courbe IS (marché des biens)\n\n> **IS est décroissante** : quand i augmente → I diminue → Y diminue\n\n**Équation :** i = (s/b)×Y - DA/b (avec DA = demande autonome)\n\n| Pente IS | Condition | Signification |\n| :--- | :--- | :--- |\n| **Forte** | s élevé, b faible | i a peu d'effet sur Y |\n| **Faible** | s faible, b élevé | i a beaucoup d'effet sur Y |\n\n**IS se déplace vers la droite si :** ↑G, ↓T, ↑exportations, ↑C₀\n\n## 2. La Courbe LM (marché monétaire)\n\n> **LM est croissante** : quand Y augmente → L1 augmente → i augmente\n\n**Équation :** i = (M̄/P)/h - (g/h)×Y\n\n| Zone LM | Comportement | Politique monétaire |\n| :--- | :--- | :--- |\n| Trappe à liquidité | LM horizontale | Inefficace |\n| Zone normale | LM croissante | Partiellement efficace |\n| Zone classique | LM verticale | Très efficace |\n\n**LM se déplace vers la droite si :** ↑M (offre de monnaie)\n\n## 3. Efficacité des politiques\n\n| Politique | Keynésien | Néoclassique |\n| :--- | :--- | :--- |\n| **Budgétaire** | Efficace (multiplicateur) | Inefficace (effet d'éviction) |\n| **Monétaire** | Complémentaire | Neutre (→ ↑P seulement) |\n| **Policy mix** | Optimal (IS+LM) | Sans effet réel |\n\n> **Effet d'éviction** (néoclassique) : ↑G → ↑i → ↓I privé → effet net nul sur Y.\n\n## 4. Conditions d'efficacité\n\n**Politique budgétaire efficace si :**\n- Multiplicateur élevé (c fort, m faible)\n- Demande de monnaie peu élastique à Y\n- Investissement peu sensible à i\n\n**Politique monétaire efficace si :**\n- Demande de monnaie peu élastique à i\n- Investissement très sensible à i\n- Multiplicateur élevé`
          },
          {
            title: "Chapitre 4 : OFFRE GLOBALE, DEMANDE GLOBALE ET COURBE DE PHILLIPS",
            content: `# Offre et Demande Globales, Inflation et Chômage\n\n## 1. La Courbe de Demande Globale (DG)\n\nLieu des couples (Y, P) réalisant l'équilibre IS-LM simultané.\n\n> **DG est décroissante** → quand P baisse, Y augmente (via 3 effets)\n\n| Effet | Mécanisme | Impact |\n| :--- | :--- | :--- |\n| **Keynes** | ↓P → ↑M/P → ↓i → ↑I → ↑Y | LM vers droite |\n| **Richesse** | ↓P → ↑richesse réelle → ↑C | IS vers droite |\n| **Taux de change** | ↓P → ↑compétitivité → ↑(X-M) | IS vers droite |\n\n**DG se déplace vers la droite si :** ↑G, ↓T, ↑M, ↑exportations\n\n## 2. Les Courbes d'Offre Globale (OG)\n\n| École | Forme de OG | Hypothèse |\n| :--- | :--- | :--- |\n| **Classique** | Verticale à Ype | Prix parfaitement flexibles |\n| **Keynésienne** | Horizontale (puis montante) | Prix rigides, sous-emploi |\n| **Monétariste** | Verticale à LT, croissante à CT | Anticipations adaptatives |\n| **Anticipations rationnelles** | Verticale même à CT | Agents anticipent parfaitement |\n\n## 3. La Courbe de Phillips\n\n> **Relation inverse** entre inflation (π) et chômage (U)\n\n| Vision | Courbe de Phillips | Interprétation |\n| :--- | :--- | :--- |\n| **Keynésienne** | Stable, décroissante | Dilemme inflation/chômage |\n| **Monétariste** | Décroissante à CT, verticale à LT | Chômage naturel (UN) |\n| **Anticipations rationnelles** | Verticale même à CT | Aucun arbitrage possible |\n\n> **Stagflation (années 70)** : inflation + chômage simultanés → invalidation de la courbe stable.\n\n## 4. Ajustements aux chocs\n\n| Type de choc | Choc de demande | Choc d'offre |\n| :--- | :--- | :--- |\n| **Exemple** | ↑G ou ↑M | ↑ prix pétrole |\n| **Effet** | ↑Y et ↑P (court terme) | ↓Y et ↑P (stagflation) |\n| **Ajustement néoclassique** | Rapide via ↑P | Via ↓salaires |\n| **Ajustement keynésien** | Via politique budgétaire | Difficile, douloureux |`
          }
        ];
      }

      if (module.code === 'ECO201C') {
        courseData.content = "Ce cours analyse les comportements des consommateurs et des producteurs ainsi que l'organisation des marchés dans une perspective néoclassique. Enseignants : COUCHORO & AGUEY.";
        courseData.chapters = [
          {
            title: "Chapitre 1 : THÉORIE DU CONSOMMATEUR — Utilité et Équilibre",
            content: `# Théorie du Consommateur\n\n## 1. Hypothèses sur les préférences\n\n| Hypothèse | Définition |\n| :--- | :--- |\n| **Complétude** | Le consommateur peut classer tous les paniers possibles |\n| **Transitivité** | Si A ≻ B et B ≻ C alors A ≻ C |\n| **Non-satiété** | Plus est toujours préféré à moins |\n| **Convexité** | Toute combinaison intermédiaire est préférée aux extrêmes |\n\n## 2. Utilité Marginale\n> Umxᵢ = ∂U(x₁,x₂) / ∂xᵢ\n\n- L'utilité marginale est **décroissante** : plus on consomme, moins chaque unité supplémentaire apporte d'utilité.\n\n## 3. Taux Marginal de Substitution (TMS)\n> TMS₁,₂ = Umx₁ / Umx₂\n\n- TMS décroissant le long de la courbe d'indifférence\n- En valeur absolue, TMS = rapport des utilités marginales\n\n## 4. Contrainte Budgétaire\n> R = x₁P₁ + x₂P₂\n\n| Changement | Effet sur la droite budgétaire |\n| :--- | :--- |\n| ↑ Revenu R | Déplacement parallèle vers l'extérieur |\n| ↑ Prix P₁ | Rotation autour de l'ordonnée à l'origine |\n| ↑ Prix P₂ | Rotation autour de l'abscisse à l'origine |\n\n## 5. Équilibre du Consommateur\n> TMS = P₁/P₂ (tangence CI et droite budgétaire)\n\n**Condition d'optimum (n biens) :**\n\n| Bien i | Condition |\n| :--- | :--- |\n| Tout bien i,j | Umᵢ/Pᵢ = Umⱼ/Pⱼ = λ (utilité marginale de la monnaie) |\n\n## TD — Questions types\n1. Vrai/Faux : La fonction Cobb-Douglas représente des compléments parfaits. *(Faux — elle représente des substituts imparfaits, σ=1)*\n2. Vrai/Faux : TMS est décroissant en valeur absolue le long de la CI. *(Vrai)*\n3. Vrai/Faux : Demande élastique → prix varient plus vite que quantités. *(Faux — c'est l'inverse : |ep|>1 signifie %ΔQ > %ΔP)*`
          },
          {
            title: "Chapitre 2 : EFFETS PRIX, REVENU ET ÉLASTICITÉS",
            content: `# Décomposition de Slutsky et Élasticités\n\n## 1. Équation de Slutsky\n> ∂x₁/∂P₁ = (∂x₁/∂P₁)|U₀ - x₁ × (∂x₁/∂R)\n\n| Terme | Nom | Signe |\n| :--- | :--- | :--- |\n| Effet total | Variation totale de la demande | Généralement négatif |\n| Effet substitution | Remplace un bien par l'autre, U constant | Toujours négatif |\n| Effet revenu | Variation du pouvoir d'achat | Dépend du type de bien |\n\n## 2. Classification des biens\n\n| Type de bien | Effet revenu | Effet total |\n| :--- | :--- | :--- |\n| **Normal** | Négatif (er > 0) | Négatif |\n| **Inférieur** | Positif (er < 0) | Ambigu |\n| **Giffen** | Positif et > ES | **Positif** (courbe remontante) |\n\n## 3. Élasticités\n\n| Élasticité | Formule | Interprétation |\n| :--- | :--- | :--- |\n| **Prix** (ep) | (%ΔQ) / (%ΔP) | Toujours ≤ 0 |\n| **Croisée** (exy) | (%ΔQx) / (%ΔPy) | > 0 : substituts ; < 0 : complémentaires |\n| **Revenu** (eR) | (%ΔQ) / (%ΔR) | > 1 : luxe ; 0<eR<1 : nécessité ; < 0 : inférieur |\n\n**Demande élastique :** |ep| > 1 → %ΔQ > %ΔP\n\n**Demande inélastique :** |ep| < 1 → %ΔQ < %ΔP\n\n## 4. Définition de Hicks-Allen\n\n| Relation | Condition Slutsky |\n| :--- | :--- |\n| Substituts | ∂x₁/∂P₂|U₀ > 0 |\n| Complémentaires | ∂x₁/∂P₂|U₀ < 0 |\n| Indépendants | ∂x₁/∂P₂|U₀ = 0 |\n\n> La définition Hicks-Allen garantit la **symétrie** : si x₁ substitue x₂, alors x₂ substitue x₁.`
          },
          {
            title: "Chapitre 3 : THÉORIE DU PRODUCTEUR — Coûts et Profit",
            content: `# Théorie du Producteur\n\n## 1. Notions de Productivité\n\n**Fonction de production :** q = f(L, K)\n\n| Concept | Formule | Propriété |\n| :--- | :--- | :--- |\n| **Productivité Marginale** | PmL = ∂q/∂L | Décroissante |\n| **Productivité Moyenne** | PML = q/L | Coupée au max par Pm |\n| **TMST** | -dK/dL = PmL/PmK | Décroissant |\n\n**3 Zones de production :**\n\n| Zone | Condition | Rationalité |\n| :--- | :--- | :--- |\n| I | PmL > PML | Irrationnelle (Pm trop élevée) |\n| II | 0 < PmL < PML | **Rationnelle** (production optimale) |\n| III | PmL < 0 | Irrationnelle (facteur en excès) |\n\n## 2. Rendements à l'Échelle\n\n| Rendement | Condition | Degré d'homogénéité |\n| :--- | :--- | :--- |\n| **Constant** | f(mL,mK) = m·f(L,K) | r = 1 |\n| **Croissant** | f(mL,mK) > m·f(L,K) | r > 1 |\n| **Décroissant** | f(mL,mK) < m·f(L,K) | r < 1 |\n\n## 3. Fonctions de Production Classiques\n\n| Type | Formule | σ | Rendements |\n| :--- | :--- | :--- | :--- |\n| **Linéaire** | q = aK + bL | ∞ | Constant, substituts parfaits |\n| **Leontief** | q = min(K,L) | 0 | Compléments parfaits |\n| **Cobb-Douglas** | q = AKᵅLᵝ | 1 | α+β ≷ 1 |\n| **CES** | q = A[δK⁻ρ + (1-δ)L⁻ρ]⁻ᵛ/ρ | 1/(1+ρ) | v ≷ 1 |\n\n## 4. Équilibre du Producteur (minimisation des coûts)\n> TMST = w/r (tangence isoquant et isocoût)\n\n**PmL/PmK = w/r**\n\n## 5. Structure des Coûts\n\n| Coût | Formule | Propriété |\n| :--- | :--- | :--- |\n| **Marginal (Cm)** | dCT/dq | Cm coupe CM à son minimum |\n| **Moyen (CM)** | CT/q | Seuil de rentabilité = Cm ∩ CM |\n| **Variable moyen (CVM)** | CV/q | Seuil de fermeture = Cm ∩ CVM |\n\n## 6. Maximisation du Profit\n> Condition 1er ordre : Rm(q) = Cm(q) → P = Cm (concurrence parfaite)\n\n> Condition 2ème ordre : Cm croissant (rendements décroissants)\n\n**Théorème d'Euler :** En rendements constants, la rémunération des facteurs à leur Pm épuise exactement la production : **q = PmL·L + PmK·K → profit nul.**`
          },
          {
            title: "Chapitre 4 : MARCHÉS — Concurrence Parfaite et Monopole",
            content: `# Organisation des Marchés\n\n## 1. Tableau des structures de marché\n\n| Structure | Nb vendeurs | Bien | Pouvoir marché |\n| :--- | :--- | :--- | :--- |\n| **Conc. parfaite** | ∞ | Homogène | Nul (price-taker) |\n| **Conc. monopolistique** | Nombreux | Différencié | Faible |\n| **Oligopole** | Peu | Homo./Différencié | Fort |\n| **Monopole** | 1 | Unique | Total |\n\n## 2. Concurrence Pure et Parfaite (CPP)\n\n**Conditions :** atomicité, homogénéité, transparence, fluidité\n\n| Horizon | Condition d'équilibre | Profit |\n| :--- | :--- | :--- |\n| **Court terme** | P = Cm (au-dessus CVM) | Possible |\n| **Long terme** | P = Cm = CM (minimum) | Nul |\n\n> **Offre CT** = portion du Cm au-dessus de CVM. Si P < min(CVM) → q = 0 (seuil de fermeture)\n\n## 3. Le Monopole\n\n**Recette Marginale :** Rm = P × (1 + 1/ep)\n\n| Condition | Rm | Décision |\n| :--- | :--- | :--- |\n| |ep| > 1 | Rm > 0 | RT croît |\n| |ep| = 1 | Rm = 0 | RT maximum |\n| |ep| < 1 | Rm < 0 | RT décroît (zone irrationnelle) |\n\n> Le monopoleur produit toujours dans la zone **|ep| > 1**\n\n**Équilibre :** Rm = Cm → prix monopole > coût marginal\n\n**Marge brute :** (P - Cm)/P = -1/ep\n\n### Monopole discriminant (2 marchés)\n> Rm₁ = Rm₂ = Cm\n\n| Marché | Prix | Élasticité |\n| :--- | :--- | :--- |\n| Marché 1 | P₁ élevé | |ep₁| faible |\n| Marché 2 | P₂ faible | |ep₂| forte |\n\n> Le prix est **plus bas sur le marché où la demande est la plus élastique.**\n\n## 4. Concurrence Monopolistique\n\n| Horizon | Équilibre | Profit |\n| :--- | :--- | :--- |\n| **Court terme** | Rm = Cm (comme monopole) | Positif possible |\n| **Long terme** | Tangence CM et droite de demande | **Nul** (entrées) |\n\n> À LT : pas de production au minimum de CM → **excès de capacité** par rapport à la CPP.`
          },
          {
            title: "Chapitre 5 : L'OLIGOPOLE — Cournot, Stackelberg, Bertrand",
            content: `# Modèles d'Oligopole\n\n## Présentation comparative\n\n| Modèle | Variable stratégique | Type de jeu | Résultat |\n| :--- | :--- | :--- | :--- |\n| **Cournot** | Quantités | Simultané | Équilibre entre mono et CPP |\n| **Stackelberg** | Quantités | Séquentiel (leader/suiveur) | Leader produit plus |\n| **Bertrand** | Prix | Simultané | P = Cm (comme CPP) |\n| **Cartel/Collusion** | Quantités | Coopératif | Comme monopole |\n\n## 1. Modèle de Cournot (jeu simultané en quantités)\n\n- Chaque firme maximise son profit en prenant la quantité de l'autre comme **donnée**\n- Les **fonctions de réaction** indiquent q₁ = f(q₂) et q₂ = g(q₁)\n- **Équilibre de Nash** : intersection des fonctions de réaction\n\n**Avec n firmes :**\n> (P - Cm) / P = sᵢ / |ep|\n\noù sᵢ = qᵢ/Q est la part de marché de la firme i.\n\n## 2. Modèle de Stackelberg (leadership en quantités)\n\n| Acteur | Stratégie | Avantage |\n| :--- | :--- | :--- |\n| **Leader** | Anticipe la réaction du suiveur et maximise π₁ | Produit plus, réalise plus de profit |\n| **Suiveur** | Prend q₁ comme donné, maximise π₂ | Produit moins |\n\n> Le **premier mover advantage** : être leader en quantité est toujours avantageux.\n\n## 3. Modèle de Bertrand (jeu simultané en prix)\n\n- Chaque firme fixe son prix en prenant le prix de l'autre comme donné\n- Résultat : **P₁ = P₂ = Cm** (paradoxe de Bertrand)\n- Avec seulement 2 firmes, on obtient le résultat de CPP\n\n## 4. Collusion / Cartel\n\n- Les firmes s'entendent et se comportent **comme un monopole**\n- La production est partagée selon les quotas : **Cm₁ = Cm₂ = Rm**\n- La firme à Cm le plus faible obtient le quota le plus élevé\n\n## TD — Exercice type résolu\n**U(x,y) = x²y** ; Px=1, Py=3, R=90\n\n| Équilibre initial | Après ΔPx=+1 | Effet |\n| :--- | :--- | :--- |\n| A(30, 20) | B(18,9; 25,4) | Effet total |\n| | C(15, 20) | Effet de substitution |\n| | B - C | Effet revenu |\n\n→ Bien **normal** (ES < 0, ER < 0, ET < 0)`
          }
        ];
      }

      if (module.code === 'ECO203C') {
        courseData.content = "Ce cours couvre l'algèbre linéaire appliquée à l'économie : espaces vectoriels, matrices, déterminants, systèmes linéaires, applications linéaires, valeurs propres et modèle de Leontief.";
        courseData.chapters = [
          {
            title: "Chapitre 1 : ESPACES VECTORIELS — Définitions et Sous-espaces",
            content: `# Espaces Vectoriels\n\n## 1. Définition (K-espace vectoriel)\nSoit K un corps commutatif et E un ensemble muni d'une loi + et d'une loi externe •.\nE est un **K-espace vectoriel** si pour u, v, w ∈ E et λ, μ ∈ K :\n\n| Propriété | Formule |\n| :--- | :--- |\n| Associativité | (u + v) + w = u + (v + w) |\n| Commutativité | u + v = v + u |\n| Élément neutre | ∃ 0 : u + 0 = u |\n| Opposé | ∃ -u : u + (-u) = 0 |\n| Distributivité 1 | λ(u + v) = λu + λv |\n| Distributivité 2 | (λ + μ)u = λu + μu |\n| Associativité externe | (λμ)u = λ(μu) |\n| Unité | 1·u = u |\n\n**Exemples :** ℝⁿ, ℝ[x] (polynômes), Mₙₚ(ℝ) (matrices) sont des ℝ-espaces vectoriels.\n\n## 2. Sous-espace Vectoriel (SEV)\nF ⊂ E non vide est un SEV si et seulement si :\n> ∀ u, v ∈ F, ∀ λ ∈ K : **λu + v ∈ F** (stable pour les deux lois)\n\n**Remarque :** 0 appartient à tout SEV.\n\n## 3. Familles de Vecteurs\n\n| Notion | Définition |\n| :--- | :--- |\n| **Combinaison linéaire** | α₁u₁ + α₂u₂ + ... + αₚuₚ |\n| **Famille libre** | α₁u₁ + ... = 0 ⟹ tous αᵢ = 0 |\n| **Famille liée** | ∃ αᵢ ≠ 0 tels que Σαᵢuᵢ = 0 |\n| **Famille génératrice** | Tout v ∈ E s'écrit comme CL des uᵢ |\n\n> **Propriétés :** Toute sous-famille d'une famille libre est libre. Toute sur-famille d'une famille liée est liée. Toute famille contenant 0 est liée.\n\n## 4. Base, Dimension, Rang\n\n| Concept | Définition |\n| :--- | :--- |\n| **Base** | Famille à la fois **libre ET génératrice** |\n| **Dimension** | Nombre de vecteurs dans toute base (noté dim E) |\n| **Rang d'une famille** | dim du sous-espace engendré par cette famille |\n\n> **Théorème :** dim(F + G) = dim F + dim G - dim(F ∩ G)\n\n> **Somme directe :** E = F ⊕ G si F ∩ G = {0} → tout vecteur s'écrit **uniquement** comme f + g.`
          },
          {
            title: "Chapitre 2 : CALCUL MATRICIEL — Opérations et Types de Matrices",
            content: `# Calcul Matriciel\n\n## 1. Définitions\n\nUne matrice A de dimension (m×n) est un tableau rectangulaire à m lignes et n colonnes :\n> A = (aᵢⱼ) où aᵢⱼ est l'élément à la ligne i, colonne j\n\n## 2. Types de Matrices Carrées\n\n| Type | Condition | Notation |\n| :--- | :--- | :--- |\n| **Symétrique** | aᵢⱼ = aⱼᵢ | ᵗA = A |\n| **Antisymétrique** | aᵢⱼ = -aⱼᵢ | ᵗA = -A |\n| **Diagonale** | aᵢⱼ = 0 si i ≠ j | diag(d₁,...,dₙ) |\n| **Scalaire** | Diagonale avec d₁ = d₂ = ... | kI |\n| **Identité** | Diagonale avec tous dᵢ = 1 | Iₙ |\n| **Triangulaire sup.** | aᵢⱼ = 0 si i > j | — |\n| **Triangulaire inf.** | aᵢⱼ = 0 si i < j | — |\n\n> **Trace :** tr(A) = Σaᵢᵢ (somme des éléments diagonaux)\n\n## 3. Opérations\n\n| Opération | Condition | Résultat |\n| :--- | :--- | :--- |\n| **Somme A + B** | Même dimension | (aᵢⱼ + bᵢⱼ) |\n| **Produit kA** | Toujours défini | (k·aᵢⱼ) |\n| **Produit AB** | nb col(A) = nb lig(B) | cᵢⱼ = Σ aᵢₖ·bₖⱼ |\n| **Transposée ᵗA** | Toujours défini | (aⱼᵢ) |\n\n**Propriétés du produit :**\n- **Non commutatif** : AB ≠ BA en général\n- ᵗ(AB) = ᵗB · ᵗA\n- det(AB) = det(A) · det(B)\n\n## 4. Déterminants\n\n**Ordre 2 :** det(A) = a₁₁a₂₂ - a₁₂a₂₁\n\n**Ordre 3 :** Règle de Sarrus ou développement par cofacteurs :\n> Cᵢⱼ = (-1)^(i+j) · Mᵢⱼ (cofacteur = mineur avec signe)\n\n> det(A) = Σⱼ aᵢⱼ · Cᵢⱼ (développement selon ligne i)\n\n**Propriétés clés :**\n\n| Opération | Effet sur det |\n| :--- | :--- |\n| Permutation de 2 lignes | Change le signe |\n| Multiplier une ligne par k | Multiplie det par k |\n| Ajouter CL d'autres lignes | **Pas de changement** |\n| Ligne nulle ou liée | det = 0 |\n| A diagonale/triangulaire | det = produit des aᵢᵢ |`
          },
          {
            title: "Chapitre 3 : RANG, INVERSE ET SYSTÈMES LINÉAIRES",
            content: `# Rang, Matrice Inverse et Systèmes Linéaires\n\n## 1. Rang d'une matrice\n> **Rang(A)** = ordre maximal des mineurs non nuls de A\n\n**Méthode :** Échelonner A par opérations élémentaires → compter les lignes non nulles.\n\n**Forme échelon réduit :** chaque ligne non nulle commence par 1 (élément remarquable), seul non-nul de sa colonne.\n\n## 2. Matrice Inverse\n\n**Condition :** A est inversible ⟺ det(A) ≠ 0\n\n**Méthode 1 — Cofacteurs :**\n> A⁻¹ = (1/det A) · ᵗAc\nAvec Ac = matrice des cofacteurs.\n\n**Méthode 2 — Gauss-Jordan :**\nÉchelonner (A | I) → obtenir (I | A⁻¹)\n\n**Propriétés :**\n\n| Propriété | Formule |\n| :--- | :--- |\n| (AB)⁻¹ | B⁻¹ · A⁻¹ |\n| (ᵗA)⁻¹ | ᵗ(A⁻¹) |\n| det(A⁻¹) | 1 / det(A) |\n\n## 3. Systèmes Linéaires AX = B\n\n**Existence des solutions :**\n\n| Condition | Nombre de solutions |\n| :--- | :--- |\n| rang(A) ≠ rang(A\\|B) | **Aucune** |\n| rang(A) = rang(A\\|B) = n | **Une seule** |\n| rang(A) = rang(A\\|B) < n | **Infinité** |\n\n**Méthode de Gauss-Jordan :** Échelonner (A\\|B) jusqu'à la forme réduite.\n\n**Méthode de Cramer** (si det A ≠ 0) :\n> xᵢ = det(Aᵢ) / det(A)\n\noù Aᵢ est la matrice A avec la i-ème colonne remplacée par B.\n\n## 4. Exemple résolu — Système de Cramer\n\n| Système | Solution |\n| :--- | :--- |\n| 3x - 2y + 2z = -2 | x = ? |\n| x - 3y + z = 5 | y = ? |\n| -x + y + z = -1 | z = ? |\n\nCalculer det(A), det(Ax), det(Ay), det(Az) puis appliquer les formules.`
          },
          {
            title: "Chapitre 4 : APPLICATIONS LINÉAIRES ET DIAGONALISATION",
            content: `# Applications Linéaires, Valeurs Propres et Diagonalisation\n\n## 1. Application Linéaire f : E → F\n\n**Définition :** f est linéaire si :\n> f(λx + μy) = λf(x) + μf(y)\n\n| Cas particulier | Nom |\n| :--- | :--- |\n| E = F | Endomorphisme |\n| f injective | Monomorphisme |\n| f surjective | Épimorphisme |\n| f bijective | Isomorphisme (si E=F : automorphisme) |\n\n## 2. Noyau et Image\n\n| Notion | Définition | Propriété |\n| :--- | :--- | :--- |\n| **Ker(f)** | {x ∈ E : f(x) = 0} | SEV de E |\n| **Im(f)** | {f(x) : x ∈ E} | SEV de F |\n\n> **Théorème de la dimension :** dim E = dim Ker(f) + rang(f)\n\n| Propriété | Condition |\n| :--- | :--- |\n| f injective | Ker(f) = {0} |\n| f surjective | Im(f) = F |\n| f bijective (si dim E = dim F) | f injective ⟺ f surjective |\n\n## 3. Changement de Base\n\n**Matrice de passage P** de B₁ à B₂ : colonnes = composantes des vecteurs de B₂ dans B₁.\n\n> Vb₁ = P · Vb₂ ; Vb₂ = P⁻¹ · Vb₁\n\n**Changement de matrice d'un endomorphisme :**\n> B = P⁻¹ · A · P (A et B semblables)\n\n## 4. Valeurs Propres et Diagonalisation\n\n**Équation caractéristique :** det(A - λI) = 0\n\n**Vecteur propre** associé à λ : résoudre (A - λI)X = 0\n\n| Résultat | Condition |\n| :--- | :--- |\n| **Diagonalisable** | n vecteurs propres linéairement indépendants |\n| D = P⁻¹AP | D diagonale, P = matrice des vecteurs propres |\n| **Aⁿ = P·Dⁿ·P⁻¹** | Dⁿ = diag(λ₁ⁿ,...,λₙⁿ) |\n\n> **Théorème de Cayley-Hamilton :** Toute matrice vérifie son équation caractéristique P_A(A) = 0.`
          },
          {
            title: "Chapitre 5 : MODÈLE DE LEONTIEF ET OPTIMISATION",
            content: `# Applications Économiques de l'Algèbre Linéaire\n\n## 1. Modèle Entrées-Sorties de Leontief\n\n**TES (Tableau Entrées-Sorties) :**\n\n| De \\ Vers | Sec.1 | Sec.2 | Sec.3 | Conso. Finale | Total fourni |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **Sec.1** | x₁₁ | x₁₂ | x₁₃ | C₁ | X₁ |\n| **Sec.2** | x₂₁ | x₂₂ | x₂₃ | C₂ | X₂ |\n| **Sec.3** | x₃₁ | x₃₂ | x₃₃ | C₃ | X₃ |\n| **Val. Ajoutée** | V₁ | V₂ | V₃ | | |\n| **Total produit** | X₁ | X₂ | X₃ | | |\n\n**Coefficient technique :** aᵢⱼ = xᵢⱼ / Xⱼ\n\n**Équilibre :** X = AX + C → **(I - A)X = C** → **X = (I - A)⁻¹ · C**\n\n> (I - A) doit être inversible (det ≠ 0) pour que la solution existe.\n\n## 2. Optimisation de fonctions multivariables\n\n**Condition nécessaire (point critique) :**\n> ∂f/∂x = 0 ET ∂f/∂y = 0\n\n**Condition suffisante — Matrice Hessienne :**\n\n| Cas | det H | Signe de f″ₓₓ | Nature |\n| :--- | :--- | :--- | :--- |\n| Minimum | **> 0** | > 0 | Minimum local |\n| Maximum | **> 0** | < 0 | Maximum local |\n| Point selle | **< 0** | — | Pas d'extremum |\n\n**Optimisation sous contrainte — Lagrangien :**\n> ℒ(x, y, λ) = f(x, y) + λ·g(x, y)\n\nRésoudre : ∂ℒ/∂x = 0 ; ∂ℒ/∂y = 0 ; ∂ℒ/∂λ = 0\n\n## 3. QCM — Vrai ou Faux types examen\n\n| Affirmation | Réponse |\n| :--- | :--- |\n| Une matrice scalaire est diagonale | **Vrai** |\n| ᵗA = -A ⟹ A symétrique | **Faux** (antisymétrique) |\n| Si AB défini alors ᵗA·ᵗB défini | **Faux** (c'est ᵗB·ᵗA) |\n| Si AB = 0 alors A = 0 ou B = 0 | **Faux** (diviseurs de zéro) |\n| rang(A) = rang(ᵗA) | **Vrai** |`
          }
        ];
      }

      if (module.code === 'CPT100C') {
        courseData.content = "Ce cours initie les étudiants aux fondements de la comptabilité générale selon le SYSCOHADA révisé : historique, principes, plan des comptes, analyse des flux, partie double, états financiers.";
        courseData.chapters = [
          {
            title: "Séance 1 : Généralités — Historique et Rôle de la Comptabilité",
            content: `# Généralités sur la Comptabilité\n\n## 1. Historique\n\n| Période | Événement clé |\n| :--- | :--- |\n| Antiquité | Naissance de la comptabilité |\n| 14ème siècle | Développement avec la partie double |\n| 1494 | Ouvrage de LUCA PACIOLI |\n| 1947 / 1957 / 1982 | Plans français successifs |\n| 1974 | Plan OCAM en Afrique |\n| 1er jan. 1998 | SYSCOA (UEMOA) |\n| 1er jan. 2001 | SYSCOHADA (personnes physiques et morales) |\n| 26 jan. 2017 | Adoption AUDCIF à Brazzaville |\n| 1er jan. 2018 | Entrée en vigueur SYSCOHADA révisé |\n\n## 2. Définition\n> La comptabilité est un **système d'organisation de l'information financière** qui permet de saisir, classer, enregistrer des données chiffrées et de fournir un ensemble d'informations conformes aux besoins des utilisateurs.\n\n## 3. Rôle de la comptabilité\n\n| Rôle | Description |\n| :--- | :--- |\n| **Outil de contrôle interne** | Enregistre toutes les opérations économiques |\n| **Outil de contrôle externe** | Fournit l'information pertinente aux partenaires |\n| **Outil de gestion** | Constitue la base de données du décideur |\n\n## 4. Systèmes de présentation des états financiers\n\n| Système | Entités concernées |\n| :--- | :--- |\n| **Système Normal** | Secteur industriel (tous CA) + entités à CA élevé |\n| **Système Minimal de Trésorerie** | Négoce < 60M F ; Artisanat < 40M F ; Services < 30M F |`
          },
          {
            title: "Séance 2 : Référentiel OHADA, Cadre Conceptuel et Organisation Comptable",
            content: `# Référentiel OHADA et Organisation Comptable\n\n## 1. Composantes du référentiel OHADA\n\n| Document | Pages | Contenu |\n| :--- | :--- | :--- |\n| AUDCIF + SYSCOHADA | 1 204 | Acte uniforme (art. 1–113) + Plan comptable |\n| Guide d'application SYSCOHADA | 437 | 4 parties, 142 cas |\n| Guide d'application IFRS | 212 | Application normes IFRS |\n\n## 2. Cadre Conceptuel\n> Le cadre conceptuel est un **système cohérent d'objectifs et de principes** fondamentaux qui guide l'élaboration des normes comptables.\n\n**Utilisateurs des états financiers :**\n- Dirigeants et organes de contrôle\n- Fournisseurs de capitaux (banques, investisseurs)\n- État et institutions publiques\n- Fournisseurs, clients, salariés, public\n\n**Champ d'application :** Toutes entités soumises aux actes uniformes OHADA.\n\n**Entités exclues :**\n- Entités à but non lucratif\n- Entités d'Intérêt Public (EIP) : sociétés cotées, banques, assurances\n\n## 3. Organisation Comptable — Conditions requises\n\n| Condition | Obligation |\n| :--- | :--- |\n| Langue et monnaie | Langue officielle, monnaie légale |\n| Technique | Partie double obligatoire |\n| Pièces justificatives | Datées, classées, conservées |\n| Enregistrement | Chronologique, sans blanc ni rature |\n| Inventaire | Contrôle périodique des biens et dettes |\n| Clôture | États financiers dans les 4 mois après clôture |`
          },
          {
            title: "Séance 3 : Les Postulats Comptables du SYSCOHADA",
            content: `# Les Postulats Comptables\n> Les postulats sont des **principes acceptés sans démonstration**, cohérents avec les objectifs du modèle comptable.\n\n## Les 5 Postulats du SYSCOHADA\n\n| # | Postulat | Principe clé |\n| :--- | :--- | :--- |\n| 1 | **Entité** | Séparation du patrimoine de l'entité et de ses propriétaires |\n| 2 | **Comptabilité d'engagement** | Opérations enregistrées à leur survenance (pas à l'encaissement) |\n| 3 | **Spécialisation des exercices** | Chaque exercice est indépendant ; rattacher produits et charges à l'exercice concerné |\n| 4 | **Permanence des méthodes** | Mêmes méthodes d'une période à l'autre |\n| 5 | **Prééminence de la réalité économique** | Enregistrer selon la substance économique, pas la forme juridique |\n\n## Changements affectant la permanence des méthodes\n\n| Type | Traitement |\n| :--- | :--- |\n| **Changement de méthode** | Information dans les notes annexes + effet rétrospectif |\n| **Changement d'estimation** | Effet sur l'exercice en cours et futurs seulement |\n| **Correction d'erreur (exercice en cours)** | Correction avant arrêté des comptes (écriture négative) |\n| **Correction d'erreur (exercice antérieur)** | Ajustement des capitaux propres d'ouverture si significatif |\n\n## Applications du postulat de prééminence économique\n- Actifs avec **réserve de propriété** → inscrit à l'actif\n- Biens en **location-acquisition (crédit-bail)** → inscrit à l'actif du preneur\n- Effets remis à **l'escompte** non encore échus → maintenus à l'actif\n- **Personnel facturé** par d'autres entités → comptabilisé en charges de personnel`
          },
          {
            title: "Séance 4 & 5 : Conventions Comptables et Qualités de l'Information",
            content: `# Conventions Comptables et Qualités de l'Information\n\n## Les 5 Conventions du SYSCOHADA\n\n| Convention | Principe |\n| :--- | :--- |\n| **Coût historique** | Biens comptabilisés à leur valeur d'entrée (acquisition, production ou valeur actuelle si gratuit) |\n| **Prudence** | Ne pas surévaluer actifs/produits ; ne pas sous-évaluer passifs/charges |\n| **Régularité et transparence** | Conformité aux règles ; présentation claire et loyale ; non-compensation |\n| **Correspondance bilan clôture/ouverture** | Bilan d'ouverture = bilan de clôture de l'exercice précédent |\n| **Importance significative** | Toute information influençant le jugement des utilisateurs doit être fournie |\n\n**Seuil de signification :** un poste est significatif si ≥ 5-10% du total bilan, ou ≥ 10% du bénéfice net.\n\n## Caractéristiques qualitatives de l'information financière\n\n| Catégorie | Caractéristique | Définition |\n| :--- | :--- | :--- |\n| **Essentielles** | Pertinence | Valeur prédictive + valeur de confirmation |\n| **Essentielles** | Fidélité | Représentation complète, exempte d'erreurs significatives |\n| **Auxiliaires** | Comparabilité | Permet de relever similitudes et différences |\n| **Auxiliaires** | Vérifiabilité | Divers observateurs arrivent au même consensus |\n| **Auxiliaires** | Rapidité | Information accessible avant de perdre son utilité |\n| **Auxiliaires** | Compréhensibilité | Classée, définie, présentée de façon claire |\n\n> **Contrainte :** Équilibre avantages-coûts — l'information doit procurer un intérêt supérieur à son coût de production.`
          },
          {
            title: "Séance 6 & 7 : Le Plan des Comptes SYSCOHADA",
            content: `# Le Plan des Comptes SYSCOHADA\n\n## Répartition des classes\n\n| Classe | Intitulé | Nature |\n| :--- | :--- | :--- |\n| **Classe 1** | Ressources durables | Bilan — Passif |\n| **Classe 2** | Actif immobilisé | Bilan — Actif |\n| **Classe 3** | Stocks | Bilan — Actif |\n| **Classe 4** | Comptes de tiers | Bilan — Actif/Passif |\n| **Classe 5** | Trésorerie | Bilan — Actif/Passif |\n| **Classe 6** | Charges des AO | Gestion |\n| **Classe 7** | Produits des AO | Gestion |\n| **Classe 8** | Autres charges/produits HAO | Gestion |\n| **Classe 9** | Comptabilité analytique | CAGE |\n\n## Exemples de comptes par classe\n\n| Classe | Compte | Intitulé |\n| :--- | :--- | :--- |\n| 1 | 101 | Capital social |\n| 1 | 161 | Emprunts obligataires |\n| 2 | 211 | Frais de développement |\n| 2 | 245 | Matériel de transport |\n| 3 | 31 | Marchandises |\n| 4 | 401 | Fournisseurs |\n| 4 | 411 | Clients |\n| 5 | 52 | Banques |\n| 5 | 57 | Caisse |\n| 6 | 601 | Achats de marchandises |\n| 7 | 701 | Ventes de marchandises |\n\n## Nomenclature et constantes\n\n| Chiffre | Position | Signification |\n| :--- | :--- | :--- |\n| **8** | 2ème position | Amortissement (ex: 2845 = amort. matériel 245) |\n| **9** | 2ème position | Provision/Dépréciation (ex: 29, 39, 49…) |\n| **9** | 3ème/4ème position | Solde inversé (ex: 409 = Fournisseurs débiteurs) |\n\n**Parallélisme charges/produits :**\n| Charges (impaires) | Produits (paires) |\n| :--- | :--- |\n| 601 Achats marchandises | 701 Ventes marchandises |\n| 81 Valeurs comptables cessions | 82 Produits cessions |`
          },
          {
            title: "Séance 8 : Notion de Flux, Emplois et Ressources",
            content: `# Flux, Emplois et Ressources\n\n## 1. Types de flux\n\n| Type de flux | Description | Exemple |\n| :--- | :--- | :--- |\n| **Flux réels (biens)** | Mouvement de marchandises | Achat/vente de marchandises |\n| **Flux de services** | Services acquis par l'entité | Transport, téléphone, personnel |\n| **Flux financiers** | Contrepartie monétaire | Paiement achats, encaissement ventes |\n\n## 2. Principe de la double écriture\n> Pour toute opération : **Flux entrants = Flux sortants**\n\n| Flux | Rôle comptable | Côté du compte |\n| :--- | :--- | :--- |\n| Flux entrant | **Emploi** = Affectation = Destination | **DÉBIT** |\n| Flux sortant | **Ressource** = Origine | **CRÉDIT** |\n\n## 3. Exemples d'analyse Emplois/Ressources\n\n| Opération | Emploi (Débit) | Ressource (Crédit) |\n| :--- | :--- | :--- |\n| Versement 100 000 F au fournisseur en espèces | Fournisseur 100 000 | Caisse 100 000 |\n| Achat à crédit de matières 298 500 F | Achat matières 298 500 | Fournisseurs 298 500 |\n| Versement 350 000 F d'espèces en banque | Banque 350 000 | Caisse 350 000 |`
          },
          {
            title: "Séance 9 : La Comptabilité en Partie Double",
            content: `# La Comptabilité en Partie Double\n\n## 1. Le compte et la partie double\n> Toute opération est enregistrée **deux fois** : une fois au débit d'un compte, une fois au crédit d'un autre.\n> À tout moment : **Σ Débits = Σ Crédits**\n\n## 2. Fonctionnement des comptes\n\n| Type de compte | Augmentation | Diminution |\n| :--- | :--- | :--- |\n| **Actif** | Débit (gauche) | Crédit (droite) |\n| **Passif** | Crédit (droite) | Débit (gauche) |\n| **Charges** | Débit (gauche) | Crédit (droite) |\n| **Produits** | Crédit (droite) | Débit (gauche) |\n\n## 3. Terminologie comptable\n\n| Terme | Définition |\n| :--- | :--- |\n| **Imputation** | Inscription d'une somme au débit ou crédit d'un compte |\n| **Ouvrir un compte** | Intituler et y inscrire un avoir initial |\n| **Débiter** | Porter une somme au débit |\n| **Créditer** | Porter une somme au crédit |\n| **Solde débiteur** | Total débit > Total crédit |\n| **Solde créditeur** | Total crédit > Total débit |\n| **Compte soldé** | Total débit = Total crédit |\n\n## 4. Le Journal\nDocument **obligatoire** — tenu **chronologiquement**, sans blanc ni rature, coté et paraphé.\n\n**Format d'une écriture :**\n\n| Date | N° Compte | Libellé | Débit | Crédit |\n| :--- | :--- | :--- | :--- | :--- |\n| 02/09 | 57 Caisse | Alimentation caisse (chèque N°…) | 275 000 | |\n| | 52 Banque | | | 275 000 |`
          },
          {
            title: "Séance 10 : Journal, Grand Livre et Balance",
            content: `# Journal, Grand Livre et Balance\n\n## 1. Le Journal\nEnregistrement **chronologique** de toutes les opérations.\nStructure : marge de pointage | N° compte | Date + libellé | Débit | Crédit\n\n## 2. Le Grand Livre\nEnsemble de **tous les comptes** de l'entreprise. Les écritures du journal y sont reportées compte par compte.\n\n**Exemple — Compte 57 Caisse (tracé classique) :**\n\n| Date | Libellé | Montant | Date | Libellé | Montant |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| 01/09 | Avoir initial | 100 000 | 10/09 | Achat timbres | 8 500 |\n| 02/09 | Alimentation caisse | 275 000 | 14/09 | Règlement Sakibou | 150 000 |\n| 06/09 | Vente produits finis | 190 000 | 18/09 | Achat matières | 82 950 |\n| 23/09 | Règlement Boukpessi | 345 000 | 26/09 | Loyer entrepôt | 100 000 |\n| 27/09 | Ventes m/ses + prdts | 395 000 | 30/09 | Dépôt en banque | 270 300 |\n| | | | | **Solde débiteur** | **693 250** |\n| **Total** | | **1 305 000** | **Total** | | **1 305 000** |\n\n## 3. La Balance\nÉtat récapitulatif de tous les comptes à une date donnée.\n\n**Vérifications obligatoires :**\n- Total débits = Total crédits\n- Total soldes débiteurs = Total soldes créditeurs\n- Total journal = Total balance\n\n**Structure d'une balance à 6 colonnes :**\n\n| N° Compte | Intitulé | Solde début | | Mouvements | | Solde fin | |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| | | Déb. | Créd. | Débit | Crédit | Déb. | Créd. |\n| 10 | Capital | | 1 200 000 | | | | 1 200 000 |\n| 57 | Caisse | 100 000 | | 1 205 000 | 611 750 | 693 250 | |\n| 52 | Banque | 700 000 | | 270 300 | 275 000 | 695 300 | |`
          },
          {
            title: "Séance 11 : Le Bilan — Actif, Passif et Fonctions",
            content: `# Le Bilan\n> Le Bilan décrit la **situation patrimoniale de l'entité à une date donnée** (emplois à gauche, ressources à droite).\n\n## Structure fonctionnelle du Bilan SYSCOHADA\n\n| ACTIF (Emplois) | PASSIF (Ressources) |\n| :--- | :--- |\n| **Actif immobilisé** (Emplois stables) | **Ressources stables** (CAPRORA + DEFIRA) |\n| Immobilisations incorporelles | Capitaux propres |\n| Immobilisations corporelles | Dettes financières |\n| Immobilisations financières | |\n| **Actif circulant** | **Passif circulant** |\n| Actif circulant HAO | Passif circulant HAO |\n| Stocks | Dettes fournisseurs |\n| Créances clients | Dettes fiscales et sociales |\n| **Trésorerie-Actif** | **Trésorerie-Passif** |\n| Banques, caisse, titres placement | Crédits de trésorerie, découverts |\n\n## Capitaux Propres = CAPRORA\n> Capital + Primes + Écarts de réévaluation + Réserves + Report à nouveau ± Résultat + Subventions d'investissement\n\n## Dettes Financières = DEFIRA\n- Emprunts et dettes assimilées\n- Dettes de location-acquisition (crédit-bail)\n- Provisions pour risques et charges\n\n## Un actif est reconnu si l'entité :\n1. A le pouvoir d'obtenir les avantages économiques\n2. A la capacité de décider de son utilisation\n3. Assume l'essentiel des risques`
          },
          {
            title: "Séance 12 : Compte de Résultat, Tableau de Flux et Notes Annexes",
            content: `# États Financiers : Compte de Résultat, Flux de Trésorerie et Notes\n\n## 1. Le Compte de Résultat\n\n> **Résultat Net = Produits − Charges** (ou Actif − Passif en termes patrimoniaux)\n\n| Éléments | Classe | Exemples |\n| :--- | :--- | :--- |\n| **Charges des AO** | 6 | Achats, transport, personnel, amortissements |\n| **Charges HAO** | 8 (impaires) | Valeur comptable des cessions, dotations HAO |\n| **Produits des AO** | 7 | Ventes, subventions d'exploitation, revenus financiers |\n| **Produits HAO** | 8 (paires) | Produits des cessions, subventions d'équilibre |\n\n## 2. Tableau des Flux de Trésorerie\n\n| Activité | Nature | Exemples |\n| :--- | :--- | :--- |\n| **Opérationnelle** | Principales activités génératrices de produits | Encaissements clients, paiements fournisseurs |\n| **Investissement** | Acquisition/sortie d'actifs long terme | Achat/vente d'immobilisations |\n| **Financement** | Changements dans capital et emprunts | Émission d'actions, remboursements d'emprunts, dividendes |\n\n> Objectif : expliquer la **variation de la trésorerie** entre deux dates.\n\n## 3. Notes Annexes\nÉlément obligatoire et intégral des états financiers. Elles comprennent :\n- Déclaration de conformité au SYSCOHADA\n- Règles et méthodes comptables adoptées\n- Compléments sur le Bilan, CR et Tableau de flux\n- Informations environnementales et sociétales (secteur industriel/minier)\n\n## 4. Résumé — Les 4 États Financiers du Système Normal\n\n| État | Objectif |\n| :--- | :--- |\n| **Bilan** | Photographie du patrimoine à une date |\n| **Compte de résultat** | Mesure de la performance sur une période |\n| **Tableau de flux de trésorerie** | Explication de la variation de trésorerie |\n| **Notes annexes** | Informations complémentaires pour image fidèle |`
          }
        ];
      }

      return courseData;
    });

    await Course.insertMany(insertBuffer);
    console.log(`✅ ${insertBuffer.length} modules du Tronc Commun L1 FASEG installés !`);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();

