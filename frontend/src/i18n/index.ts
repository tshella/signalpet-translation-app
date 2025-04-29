import { useState, useEffect } from 'react';
import { translateText } from '../services/translationService';

/**
 * Hook-based translation function for dynamic content.
 */
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
      return text;
    }
  };

  return { t, language, setLanguage };
}

/**
 * DOM-level translation for static HTML using translate="yes".
 */
export async function changeLanguage(lang: string): Promise<void> {
  const elements = document.querySelectorAll<HTMLElement>("[translate='yes']");

  for (const el of elements) {
    const original = el.innerText;
    const translated = await translateText(original, lang);
    el.innerText = translated;
  }

  localStorage.setItem('preferredLanguage', lang);
}
