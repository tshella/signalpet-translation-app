import React, { useEffect, useState } from "react";
import { useTranslation } from "../i18n/useTranslation";

interface TranslatedTextProps {
  text?: string;
  children?: React.ReactNode;
  tag?: keyof JSX.IntrinsicElements;
}

export default function TranslatedText({
  text,
  children,
  tag = "span"
}: TranslatedTextProps) {
  const { t } = useTranslation();
  const source = text ?? (typeof children === "string" ? children : "");

  const [translated, setTranslated] = useState(source);

  useEffect(() => {
    let isMounted = true;

    if (source) {
      t(source).then((res) => {
        if (isMounted) setTranslated(res);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [source, t]);

  const Component = tag;

  return <Component>{translated}</Component>;
}
