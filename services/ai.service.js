const fs = require('fs');
const path = require('path');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');

/**
 * Get AI text response using Google Gemini 1.5
 */
exports.askAI = async (prompt, userLevel, courseContext = null) => {
  const systemPrompt = `Tu es un Professeur IA sur SchoolNet. Réponds clairement en français.`;
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt + "\n\n" + prompt }] }] })
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Pas de réponse.";
  } catch (error) {
    return "Erreur de connexion IA.";
  }
};

/**
 * Text to Speech (Version ultra-robuste)
 */
exports.textToSpeech = async (text, voiceName = "fr-FR-HenriNeural") => {
  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const tempDirName = `tts_temp_${Date.now()}`;
    const tempDirPath = path.join(uploadsDir, tempDirName);
    fs.mkdirSync(tempDirPath, { recursive: true });

    const pureText = text.replace(/[*#_`~\"]/g, '').substring(0, 4000);
    
    // On génère dans le dossier temporaire
    await tts.toFile(tempDirPath, pureText);

    // On cherche le fichier généré (souvent audio.mp3 ou similaire)
    const files = fs.readdirSync(tempDirPath);
    const audioFile = files.find(f => f.endsWith('.mp3') || f.endsWith('.wav'));
    
    if (!audioFile) throw new Error("Aucun fichier audio généré.");

    const finalFileName = `${tempDirName}.mp3`;
    const finalPath = path.join(uploadsDir, finalFileName);
    
    fs.renameSync(path.join(tempDirPath, audioFile), finalPath);
    
    // Nettoyage du dossier temporaire
    fs.rmSync(tempDirPath, { recursive: true, force: true });

    return finalFileName;
  } catch (error) {
    console.error("ERREUR CRITIQUE TTS:", error);
    throw error;
  }
};
