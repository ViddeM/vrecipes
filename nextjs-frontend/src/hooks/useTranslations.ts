import seTranslations from "../resources/locales/se.json";
import enTranslations from "../resources/locales/en.json";
import commonTranslations from "../resources/locales/common.json";
import React, { useContext } from "react";

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
  let localeSpecificData = loadLocaleSpecificData(locale);
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
  let localData = useContext(TranslationContext);
  return {
    t: localData,
    translate: (toTranslate: string) => {
      try {
        let translation = recLookup(localData, toTranslate);
        if (translation) {
          return translation;
        }
      } catch (error) {
        console.log("Failed to lookup translation", error);
      }

      return toTranslate;
    },
  };
};

// TODO: This is uggly...
function recLookup(obj: object, path: string): string {
  let parts = path.split(".");
  if (parts.length == 1) {
    // @ts-ignore
    return obj[parts[0]];
  }
  // @ts-ignore
  return recLookup(obj[parts[0]], parts.slice(1).join("."));
}
