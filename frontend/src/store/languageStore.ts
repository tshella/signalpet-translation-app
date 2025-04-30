import { create } from 'zustand';
import { detectBrowserLanguage } from '../i18n';

interface LanguageState {
  currentLang: string;
  setLang: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  currentLang: localStorage.getItem('preferredLanguage') || detectBrowserLanguage(),
  setLang: (lang) => {
    localStorage.setItem('preferredLanguage', lang);
    set({ currentLang: lang });
  },
}));
