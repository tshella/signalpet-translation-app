import { useState, useEffect } from "react";

const languages = [
  { code: "en", label: "🇺🇸 English" },
  { code: "es", label: "🇪🇸 Español" },
  { code: "fr", label: "🇫🇷 Français" },
  { code: "de", label: "🇩🇪 Deutsch" },
  { code: "pt", label: "🇵🇹 Português" }
];

interface LanguageSelectorProps {
  currentLang: string;
  onChange: (lang: string) => void;
}

export default function LanguageSelector({ currentLang, onChange }: LanguageSelectorProps) {
  const [selected, setSelected] = useState(currentLang);

  useEffect(() => {
    setSelected(currentLang);
  }, [currentLang]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelected(lang);
    onChange(lang);
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        padding: "0.5rem",
        fontSize: "0.875rem",
        borderRadius: "0.5rem",
        border: "1px solid #ccc",
        background: "#fff"
      }}
    >
      {languages.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
