import React, { createContext, useContext, useState } from 'react';
import translations from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('EN');

  const t = (key) => {
    // If key exists and translation exists for current language, return it.
    // Otherwise fallback to EN, then to the key itself.
    if (translations[key]) {
      return translations[key][currentLang] || translations[key]['EN'] || key;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
