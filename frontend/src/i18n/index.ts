import { useState, useEffect } from 'react';
import { translateText } from '../services/translationService';

export function useTranslation(defaultLang = 'en') {
  const [language, setLanguage] = useState(
    localStorage.getItem('preferredLanguage') || defaultLang
  );

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const t = async (text: string): Promise<string> => {
    try {
      return await translateText(text, language);
    } catch (e) {
      return text; // fallback
    }
  };

  return { t, language, setLanguage };
}