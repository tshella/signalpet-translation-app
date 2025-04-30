import { useLanguageStore } from "../store/languageStore";
import { translateText } from "../services/translationService";

export function useTranslation() {
  const currentLang = useLanguageStore((state) => state.currentLang);

  const t = async (text: string): Promise<string> => {
    if (!text || currentLang === "en") return text;
    try {
      return await translateText(text, currentLang);
    } catch (err) {
      console.warn(`Translation failed for "${text}" to "${currentLang}"`, err);
      return text;
    }
  };

  return {
    t,
    language: currentLang,
  };
}
