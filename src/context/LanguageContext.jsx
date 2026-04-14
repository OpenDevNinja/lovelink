import { createContext, useContext, useState } from 'react';
import { translations } from '../data';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lovelink-lang') || 'fr';
    }
    return 'fr';
  });

  const t = (key) => translations[lang]?.[key] || translations.en?.[key] || key;

  const toggleLang = () => {
    const next = lang === 'en' ? 'fr' : 'en';
    setLang(next);
    localStorage.setItem('lovelink-lang', next);
  };

  const setLanguage = (l) => {
    setLang(l);
    localStorage.setItem('lovelink-lang', l);
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
