import { getFromCache, saveToCache } from '../utils/cache';

const API_URL = import.meta.env.VITE_TRANSLATE_API;

export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  if (!text || !targetLang || targetLang === 'en') return text;

  const cached = getFromCache(text, targetLang);
  if (cached) return cached;

  try {
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
      console.error('Translation API error:', errorText);
      throw new Error(`Translation failed: ${errorText}`);
    }

    const data = await response.json();
    saveToCache(text, targetLang, data.translatedText);
    return data.translatedText;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
