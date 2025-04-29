import { create } from "zustand";

interface LanguageState {
  currentLang: string;
  setLang: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  currentLang: localStorage.getItem("preferredLanguage") || "en",
  setLang: (lang) => {
    localStorage.setItem("preferredLanguage", lang);
    set({ currentLang: lang });
  },
}));
