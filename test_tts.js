const OpenAI = require('openai');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  console.log("Tentative de génération audio avec OpenAI...");
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "onyx",
      input: "Bonjour, je suis votre professeur virtuel. Est-ce que vous m'entendez ?",
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const testFile = path.join(__dirname, 'test_voice.mp3');
    await fs.promises.writeFile(testFile, buffer);
    console.log("Succès ! Fichier généré : " + testFile);
  } catch (error) {
    console.error("ERREUR OPENAI TTS :", error.message);
    if (error.response) {
      console.error("Détails :", error.response.data);
    }
  }
}

main();
