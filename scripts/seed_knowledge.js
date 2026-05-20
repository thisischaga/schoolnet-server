const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:21017/schoolnet';

const KNOWLEDGE_DATA = {
  "ECO101C": `
    SUPPORT DE COURS OFFICIEL : MICROÉCONOMIE (S1)
    
    1. THÉORIE DU CONSOMMATEUR
    Le consommateur est supposé rationnel. Il cherche à atteindre la courbe d'indifférence la plus élevée possible compte tenu de sa droite de budget.
    Le point d'équilibre est atteint au point de tangence entre la courbe d'indifférence et la contrainte budgétaire, là où le Taux Marginal de Substitution (TMS) est égal au rapport des prix (Px/Py).
    
    2. ÉLASTICITÉ ET DEMANDE
    L'élasticité-prix directe est généralement négative. Si |e| > 1, la demande est élastique. Si |e| < 1, elle est inélastique.
    Une élasticité croisée positive indique des biens substituables (ex: Beurre et Margarine).
    
    3. THÉORIE DE LA PRODUCTION
    Fonction de production Q = f(K, L). 
    Court terme : Un seul facteur varie (souvent L).
    Long terme : Tous les facteurs sont variables. On utilise les isoquantes et les isocoûts pour trouver l'équilibre du producteur.
    
    4. STRUCTURES DE MARCHÉ
    Concurrence Pure et Parfaite (CPP) : 5 conditions (Atomicité, Homogénéité, Fluidité, Transparence, Mobilité). En CPP, le profit est maximisé quand P = Cm (Coût Marginal).
    Monopole : Un seul offreur. Le profit est maximum quand Rm = Cm. Le prix est fixé au-dessus du coût marginal, générant une perte sèche pour la société.
  `
};

async function seedKnowledge() {
  try {
    await mongoose.connect(MONGODB_URI );
    console.log("Connected to MongoDB for Knowledge Seeding...");

    for (const code in KNOWLEDGE_DATA) {
      const result = await Course.findOneAndUpdate(
        { code: code },
        { knowledgeBase: KNOWLEDGE_DATA[code] },
        { new: true }
      );

      if (result) {
        console.log(`✅ Knowledge Base updated for course: ${code} (${result.title})`);
      } else {
        console.log(`⚠️ Course with code ${code} not found. Knowledge not added.`);
      }
    }

    console.log("Seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
}

seedKnowledge();
