import React, { useContext } from "react";

import commonTranslations from "../resources/locales/common.json";
import enTranslations from "../resources/locales/en.json";
import seTranslations from "../resources/locales/se.json";

export type LocaleSpecificData = typeof seTranslations;
export type LocaleCommonData = typeof commonTranslations;

export type LocaleData = LocaleSpecificData & LocaleCommonData;

export type Locale = "se" | "en";
export const defaultLocale: Locale = "se";

export function isLocale(text: string): text is Locale {
  return (text as Locale) !== undefined;
}

export const TranslationContext = React.createContext<LocaleData>({
  ...seTranslations,
  ...commonTranslations,
});

const loadLocaleSpecificData = (locale: Locale): LocaleSpecificData => {
  switch (locale) {
    case "se":
      return seTranslations;
    case "en":
      return enTranslations;
  }
};

export const loadLocale = (locale: Locale): LocaleData => {
  const localeSpecificData = loadLocaleSpecificData(locale);
  return {
    ...localeSpecificData,
    ...commonTranslations,
  };
};

export interface Translations {
  t: LocaleData;
  translate: (toTranslate: string) => string;
}

export const useTranslations = () => {
  const localData = useContext(TranslationContext);
  return {
    t: localData,
    translate: (toTranslate: string) => {
      try {
        const translation = recLookup(localData, toTranslate);
        if (translation) {
          return translation;
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to lookup translation", error);
      }

      return toTranslate;
    },
  };
};

// TODO: This is uggly...
function recLookup(obj: object, path: string): string {
  const parts = path.split(".");

  // @ts-ignore
  const firstPart = obj[parts[0]];
  if (parts.length == 1) {
    return firstPart;
  }
  return recLookup(firstPart, parts.slice(1).join("."));
}
