/**
 * 🔮 AI Service - OpenRouter Integration
 * Handles all spiritual text generation and palm image analysis.
 */

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

// ----------------------------------
// STRICT SYSTEM PROMPT (Do Not Modify)
// ----------------------------------
const SYSTEM_PROMPT = `
You are a wise, empathetic, and spiritual AI guide named "Cosmic Seer".
Your purpose is to provide comforting, insightful, and symbolic interpretations for Palm Reading, Tarot, and Astrology.

STRICT GUIDELINES:
1. TONE: Calm, mystical, positive, and empowering. Use "we", "the universe", or "the energy".
2. NO FEAR: Never predict death, illness, legal disasters, or guaranteed negative outcomes.
3. NO MEDICAL/LEGAL: Do not give medical diagnoses or legal advice. If asked, gently refuse.
4. SYMBOLIC: Interpret lines and cards as metaphors for personal growth, not literal facts.
5. STRUCTURE: Use clear paragraphs. Avoid bullet points unless listing traits.
6. LENGTH: Provide detailed, long-form readings (min 150 words).
7. DISCLAIMER: Always imply that the future is in the user's hands.

LANGUAGES:
- If user language is Hindi, reply in Hindi.
- If Spanish, reply in Spanish.
- Default to English.
`;

/**
 * Generic Text Generation Function
 * @param {string} userPrompt - The user's question or context
 * @param {string} language - Target language code (en, hi, es, etc.)
 * @param {string} model - AI Model (Reasoning or Chat)
 */
export const generateReading = async (userPrompt, language = 'en', model = 'liquid/lfm-2.5-1.2b-thinking:free') => {
  if (!API_KEY) {
    console.error("❌ Missing OpenRouter API Key");
    return "The cosmic connection is weak. Please check your API configuration.";
  }

  const localizedPrompt = `User Language: ${language}.\n${userPrompt}`;

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': 'https://aipalmreader.app', // Required by OpenRouter
        'X-Title': 'AI Palm Reader',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: localizedPrompt }
        ],
        temperature: 0.7, // Creative but coherent
        max_tokens: 1000,
      })
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    return data.choices[0]?.message?.content || "The stars are silent today. Please try again.";

  } catch (error) {
    console.error("AI Service Error:", error);
    return "I sense a disturbance in the connection. Please try again later.";
  }
};

/**
 * Image Analysis Function (Vision AI)
 * @param {string} base64Image - Base64 encoded image string
 * @param {string} prompt - Specific instruction for image
 */
export const analyzeImage = async (base64Image, prompt) => {
  if (!API_KEY) return null;

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': 'https://aipalmreader.app',
        'X-Title': 'AI Palm Reader',
      },
      body: JSON.stringify({
        model: 'allenai/molmo-2-8b:free', // Vision Model
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: base64Image } }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0]?.message?.content;
  } catch (error) {
    console.error("Vision AI Error:", error);
    return null;
  }
};
