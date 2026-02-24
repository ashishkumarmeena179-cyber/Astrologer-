import { analyzeImage, generateReading } from './aiService';

export const analyzePalm = async (imageFile, handSide, language) => {
  // 1. Convert File to Base64
  const base64Image = await convertToBase64(imageFile);

  // 2. Step 1: Vision Analysis (Detect Lines)
  // We ask the Vision model to just DESCRIBE what it sees physically.
  const visionPrompt = `
    Analyze this ${handSide} hand palm image.
    Identify the visibility, length, and depth of:
    1. Heart Line
    2. Head Line
    3. Life Line
    4. Fate Line (if visible)
    
    Output strictly in this JSON format:
    {
      "heart_line": "description",
      "head_line": "description",
      "life_line": "description",
      "fate_line": "description or null"
    }
  `;

  let visionResult;
  try {
    const rawVision = await analyzeImage(base64Image, visionPrompt);
    // Attempt to parse JSON, fallback to raw text if model chats too much
    try {
      visionResult = JSON.parse(rawVision);
    } catch {
      visionResult = { raw: rawVision }; // Fallback
    }
  } catch (err) {
    console.error("Vision Step Failed", err);
    return { error: "Could not see the palm lines clearly." };
  }

  // 3. Step 2: Interpretation (Text Generation)
  // We send the Vision description to the Text model for spiritual meaning.
  const interpretationPrompt = `
    Based on this visual analysis of a ${handSide} hand:
    ${JSON.stringify(visionResult)}

    Provide a spiritual Palm Reading.
    Structure the response with these sections:
    - 💖 Heart Line (Emotional Energy)
    - 🧠 Head Line (Intellectual Style)
    - 🌱 Life Line (Vitality & Grounding)
    - ✨ Fate Line (Career Path - if visible)
    - 🔮 Overall Spiritual Summary
    
    Keep the tone mystical, encouraging, and kind.
  `;

  const finalReading = await generateReading(interpretationPrompt, language);

  return {
    rawImage: base64Image,
    visionData: visionResult,
    reading: finalReading,
    timestamp: new Date().toISOString(),
  };
};

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
