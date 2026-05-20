const mongoose = require('mongoose');
const Course = require('../models/Course');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const finalCourse = {
  title: "Principe de base à la microéconomie",
  code: "ECO 101c",
  major: "Économie & Gestion",
  faculty: "FASEG",
  semester: 1,
  level: "université",
  content: "Cours complet du Semestre 1 - Université de Lomé.",
  description: "Introduction aux principes fondamentaux de la microéconomie. Pr. COUCHORO & Dr. AGUEY.",
  chapters: [
    {
      title: "Chapitre I : INTRODUCTION GÉNÉRALE",
      content: `# INTRODUCTION GÉNÉRALE\n\n**ECO 101c : Equilibre partiel en microéconomie**\n\n### 1. Science économique\nLa science qui étudie le comportement de l’homme face à la rareté des ressources est qualifiée d’économique. Elle étudie le comportement humain comme une relation entre des besoins multiples et des moyens rares ayant d’autres usages.\n\n### 2. Le paradigme néo-classique\nTout agent économique poursuit uniquement un **intérêt personnel** qu’il essaie de maximiser ou d’optimiser.\n\n**Caractéristiques :**\n- Individus et entreprises ont des pouvoirs négligeables sur le marché.\n- Système économique libre de toute distorsion.\n- Décisions rationnelles basées sur les informations disponibles.\n\n**Objectifs :**\n- Consommateur : Maximiser l’utilité.\n- Entreprise : Maximiser le profit.\n- Gouvernement : Maximiser le bien-être social.`
    },
    {
      title: "Chapitre II : THÉORIE DU CONSOMMATEUR",
      content: `# Théorie du consommateur\n\n### 1. Hypothèses de base\n- **Complétude** : Comparaison et classement des paniers.\n- **Transitivité** : Cohérence des choix.\n- **Non-satiété** : Plus est préféré à moins.\n\n### 2. Utilité marginale (Um)\nC'est l’utilité additionnelle obtenue par une unité supplémentaire. Elle est décroissante.\n> **\`Umₓ = ∂U / ∂x\`**\n\n### 3. Courbe d'indifférence\nLieu des points où l'utilité est constante. Elle a une pente négative et deux courbes ne se coupent jamais.`
    },
    {
      title: "Chapitre III : TMS ET BUDGET",
      content: `# TMS et Contrainte Budgétaire\n\n### 1. Taux marginal de substitution (TMS)\nQuantité de bien qu’il faut sacrifier pour rester sur la même courbe d’indifférence.\n> **\`TMS = Um₁ / Um₂\`**\n\n### 2. Contrainte budgétaire\nLe revenu fixe R limite la consommation :\n> **\`R = x₁P₁ + x₂P₂\`**\nLa pente est le prix relatif P₁/P₂.`
    },
    {
      title: "Chapitre IV : ÉQUILIBRE DU CONSOMMATEUR",
      content: `# L'Équilibre du Consommateur\n\n### 1. Maximisation\nOn cherche le panier qui maximise U sous contrainte de R.\nÀ l'équilibre :\n> **\`Um₁ / P₁ = Um₂ / P₂ = λ\`**\n\nLe TMS est égal au rapport des prix au point de tangence.`
    },
    {
      title: "Chapitre V : EFFETS SLUTSKY ET BIENS",
      content: `# Effets de Prix et Classification\n\n### 1. Équation de Slutsky\n**Effet Total = Effet Substitution + Effet Revenu**\n\n### 2. Nature des Biens\n- **Bien normal** : Demande augmente avec le revenu.\n- **Bien inférieur** : Demande baisse quand le revenu augmente.\n- **Bien de Giffen** : Demande augmente quand le prix augmente.`
    },
    {
      title: "Chapitre VI : ÉLASTICITÉS",
      content: `# Analyse des Élasticités\n\n### 1. Élasticité-prix (eₚ)\nSensibilité de la demande au prix.\n> **\`eₚ = (ΔQ/Q) / (ΔP/P)\`**\n\n### 2. Élasticité-revenu (eᵣ)\n- **Luxe** : eᵣ > 1.\n- **Nécessité** : 0 < eᵣ < 1.`
    },
    {
      title: "Chapitre VII : THÉORIE DU PRODUCTEUR",
      content: `# Théorie du Producteur\n\n### 1. Productivités\n- **Moyenne (PM)** = q / L.\n- **Marginale (Pm)** = ∂q / ∂L.\n\n### 2. Phases de production\nLa **Zone de rationalité** est la Phase II, où la productivité marginale est positive mais décroissante.`
    },
    {
      title: "Chapitre VIII : RENDEMENTS ET COÛTS",
      content: `# Rendements et Coûts\n\n### 1. Rendements d'échelle\nConstants, croissants ou décroissants selon l'évolution de la production face aux inputs.\n\n### 2. Coûts\n- **Coût Marginal (Cm)** : dCT / dq.\n- **Seuil de rentabilité** : Cm = CM.`
    },
    {
      title: "Chapitre IX : CONCURRENCE PURE ET PARFAITE",
      content: `# La CPP\n\nMarché parfait : Atomicité, Homogénéité, Transparence, Fluidité.\n**Équilibre de Long Terme** :\n> **\`P = Cm = CM minimum\`**\nLe profit économique est nul.`
    },
    {
      title: "Chapitre X : MONOPOLE ET OLIGOPOLE",
      content: `# Marchés Imparfaits\n\n### 1. Monopole\nUn seul vendeur. Maximise quand :\n> **\`Rm = Cm\`**\n\n### 2. Oligopole\nPetit nombre de vendeurs. Modèles : Cournot, Stackelberg, Bertrand.`
    }
  ]
};

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('NETTOYAGE RADICAL...');
    await Course.deleteMany({ $or: [{ title: /Micro/i }, { code: /ECO/i }] });
    const newCourse = new Course(finalCourse);
    await newCourse.save();
    console.log('✅ SEUL COURS : Principe de base à la microéconomie (ECO 101c)');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDB();
