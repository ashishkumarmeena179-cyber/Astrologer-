const HISTORY_KEY = 'reading_history';

export const saveReadingToHistory = (type, data) => {
  const history = getReadingHistory();
  
  const newEntry = {
    id: Date.now(),
    type, // 'palm', 'tarot', 'horoscope'
    date: new Date().toISOString(),
    data, // The full reading result
  };
  
  // Keep only last 20 readings
  const updated = [newEntry, ...history].slice(0, 20);
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return newEntry;
};

export const getReadingHistory = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};
