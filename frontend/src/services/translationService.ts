import { getFromCache, saveToCache } from '../utils/cache';

const API_URL = import.meta.env.VITE_TRANSLATE_API;
console.log("[TranslationService] ✅ Using API_URL:", API_URL);

export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  if (!text || !targetLang || targetLang === 'en') return text;

  const cached = getFromCache(text, targetLang);
  if (cached) return cached;

  let retries = 2;

  while (retries > 0) {
    try {
      console.log(`[TranslationService] 🚀 Fetching translation for: "${text}" -> ${targetLang}`);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: targetLang,
          format: 'text',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[TranslationService] ❌ API error:', errorText);
        throw new Error(`Translation failed: ${errorText}`);
      }

      const data = await response.json();
      saveToCache(text, targetLang, data.translatedText);
      return data.translatedText;

    } catch (error) {
      console.error('[TranslationService] ❌ Fetch error:', error);
      retries--;
      if (retries === 0) throw error;

      console.log('[TranslationService] 🔄 Retrying translation after small delay...');
      await new Promise((res) => setTimeout(res, 1000)); // wait 1s and retry
    }
  }

  throw new Error('Translation failed after retries.');
}
