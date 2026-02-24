import { generateReading } from './aiService';

export const getDailyGuidance = async (userProfile, language) => {
  const prompt = `
    Provide a "Daily Spiritual Guidance" for a user named ${userProfile.name}.
    Zodiac: ${userProfile.zodiacSign}.
    
    Focus on:
    - Today's Energy Focus (e.g., Creative, Rest, Action)
    - One thing to Embrace
    - One thing to Avoid
    - A short affirmation
  `;

  return await generateReading(prompt, language);
};
