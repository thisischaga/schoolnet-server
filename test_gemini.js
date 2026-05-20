const dotenv = require('dotenv');
dotenv.config();

async function testGemini() {
  console.log("Tentative de connexion à Google Gemini...");
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("ERREUR : Aucune clé GEMINI_API_KEY trouvée dans le fichier .env");
    return;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Dis 'Bonjour SchoolNet' si tu m'entends." }] }]
      })
    });

    const data = await response.json();
    if (data.candidates) {
      console.log("SUCCÈS ! Gemini a répondu :", data.candidates[0].content.parts[0].text);
    } else {
      console.error("ERREUR GEMINI :", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("ERREUR RÉSEAU :", error.message);
  }
}

testGemini();
