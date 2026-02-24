import { generateReading } from './aiService';

export const getDailyHoroscope = async (sign, language) => {
  const today = new Date().toLocaleDateString();
  const storageKey = `horoscope_${sign}_${today}`;
  
  // 1. Check Local Cache (Don't waste AI tokens on same day requests)
  const cached = localStorage.getItem(storageKey);
  if (cached) return JSON.parse(cached);

  // 2. Generate New Reading
  const prompt = `
    Generate a Daily Horoscope for ${sign} for today (${today}).
    
    Sections:
    - ⚡ Overall Mood
    - ❤️ Love & Relationships
    - 💼 Career & Work
    - 🍀 Lucky Element/Number
    
    Tone: Mystical but practical. Short and sweet.
  `;

  const reading = await generateReading(prompt, language);
  
  // 3. Cache Result
  const result = {
    date: today,
    sign,
    reading,
  };
  
  localStorage.setItem(storageKey, JSON.stringify(result));
  return result;
};
