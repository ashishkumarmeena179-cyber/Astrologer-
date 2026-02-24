import { generateReading } from './aiService';

export const analyzeCompatibility = async (partner1, partner2, type = 'romantic', language) => {
  const prompt = `
    Analyze the ${type} compatibility between:
    Partner A: ${partner1.name} (${partner1.zodiac})
    Partner B: ${partner2.name} (${partner2.zodiac})
    
    Provide:
    1. Compatibility Score (1-100%) - Give a realistic estimate based on astrology.
    2. Strengths of the bond.
    3. Challenges to watch out for.
    4. Advice for harmony.
    
    Tone: Honest but constructive.
  `;

  return await generateReading(prompt, language);
};
