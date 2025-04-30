import React, { useEffect, useState } from "react";
import { useTranslation } from "../i18n/useTranslation";
import toast from "react-hot-toast";

interface TranslatedTextProps {
  text?: string;
  children?: React.ReactNode;
  tag?: keyof JSX.IntrinsicElements;
}

const translationCache = new Map<string, string>();

export default function TranslatedText({ text, children, tag = "span" }: TranslatedTextProps) {
  const { t, language } = useTranslation();
  const source = text ?? (typeof children === "string" ? children : "");
  const [translated, setTranslated] = useState(source);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (source) {
      const cacheKey = `${language}:${source}`;
      const cached = translationCache.get(cacheKey);

      if (cached) {
        setTranslated(cached);
      } else {
        setLoading(true);
        t(source)
          .then((res) => {
            if (isMounted) {
              translationCache.set(cacheKey, res);
              setTranslated(res);
            }
          })
          .catch((err) => {
            console.error("Translation failed:", err);
            if (isMounted) {
              toast.error("Failed to translate. Using original.");
              setTranslated(source);
            }
          })
          .finally(() => {
            if (isMounted) setLoading(false);
          });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [source, t, language]);

  const Component = tag;

  return (
    <Component
      style={{
        opacity: loading ? 0.5 : 1,
        transition: "opacity 0.3s ease-in-out",
        fontStyle: loading ? "italic" : "inherit",
      }}
    >
      {translated}
    </Component>
  );
}
