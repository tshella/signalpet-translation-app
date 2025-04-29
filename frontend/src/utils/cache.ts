
export function getFromCache(text: string, lang: string): string | null {
  return localStorage.getItem(`${lang}:${text}`);
}

export function saveToCache(text: string, lang: string, translated: string) {
  localStorage.setItem(`${lang}:${text}`, translated);
}
