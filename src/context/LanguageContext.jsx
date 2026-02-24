import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n'; // We will create this index file next

const LanguageContext = createContext();

const STORAGE_KEY = 'palm_reader_lang';

export const LanguageProvider = ({ children }) => {
  // 1. Initialize State (Default to English or saved preference)
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || 'en';
  });

  // 2. Persist Selection
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  // 3. Translation Function (t)
  // Usage: t('home.title') -> returns string
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Fallback to English if key missing in selected language
        let fallback = translations['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk]) {
            fallback = fallback[fk];
          } else {
            return key; // Return key if not found anywhere
          }
        }
        return fallback;
      }
    }
    return value;
  };

  const value = {
    language,
    setLanguage,
    t,
    availableLanguages: [
      { code: 'en', name: 'English', native: 'English' },
      { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
      { code: 'es', name: 'Spanish', native: 'Español' },
      { code: 'fr', name: 'French', native: 'Français' },
      { code: 'it', name: 'Italian', native: 'Italiano' },
      { code: 'ko', name: 'Korean', native: '한국어' },
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
