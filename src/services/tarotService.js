import { generateReading } from './aiService';
import { tarotDeck } from '../data/tarotCards'; // We will create this data file

/**
 * Draws 3 cards for a Spread (Past, Present, Future)
 */
export const drawTarotSpread = (count = 3) => {
  const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(card => ({
    ...card,
    isReversed: Math.random() < 0.2 // 20% chance of reversal
  }));
};

/**
 * Interprets the spread using AI
 */
export const interpretTarotSpread = async (cards, question, language) => {
  const cardNames = cards.map(c => 
    `${c.name} (${c.isReversed ? 'Reversed' : 'Upright'})`
  ).join(', ');

  const prompt = `
    The user asked: "${question}"
    
    The Tarot spread drawn is:
    1. Past/Foundation: ${cardNames.split(',')[0]}
    2. Present/Challenge: ${cardNames.split(',')[1]}
    3. Future/Advice: ${cardNames.split(',')[2]}

    Provide a cohesive reading connecting these cards to the question.
    Focus on guidance, hidden influences, and empowering advice.
    Do not just list card meanings; weave a story.
  `;

  return await generateReading(prompt, language);
};
