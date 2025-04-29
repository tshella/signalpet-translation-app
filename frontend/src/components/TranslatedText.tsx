import React, { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';

interface Props {
  text: string;
}

export default function TranslatedText({ text }: Props) {
  const { t } = useTranslation();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    t(text).then(setTranslated);
  }, [text]);

  return <span>{translated}</span>;
}