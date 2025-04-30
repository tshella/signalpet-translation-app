import { translateText } from '../services/translationService';
import { useLanguageStore } from '../store/languageStore';

/**
 * Supported languages list
 */
const SUPPORTED_LANGUAGES = ['en', 'de', 'fr', 'es', 'pt'];

/**
 * Detects the user's browser language and normalizes it.
 * Falls back to 'en' if not supported.
 */
export function detectBrowserLanguage(): string {
  const browserLang = navigator.language.slice(0, 2);
  return SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : 'en';
}

/**
 * Hook for React components — returns async t()
 */
export function useTranslation() {
  const { currentLang } = useLanguageStore();

  const t = async (text: string): Promise<string> => {
    if (!text || currentLang === 'en') return text;
    try {
      return await translateText(text, currentLang);
    } catch {
      return text;
    }
  };

  return { t, language: currentLang };
}

/**
 * For static DOM content (e.g. span[translate="yes"])
 */
export async function changeLanguage(newLang: string): Promise<void> {
  const safeLang = SUPPORTED_LANGUAGES.includes(newLang) ? newLang : 'en';

  const elements = document.querySelectorAll<HTMLElement>('[translate="yes"]');
  for (const el of elements) {
    const original = el.dataset.original || el.innerText;
    try {
      const translated = await translateText(original, safeLang);
      el.innerText = translated;
      el.dataset.original = original;
    } catch {
      console.warn(`Failed to translate: "${original}"`);
    }
  }

  localStorage.setItem('preferredLanguage', safeLang);
}
