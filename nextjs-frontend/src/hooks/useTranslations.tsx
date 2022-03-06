import seTranslations from "../resources/locales/se.json";
import enTranslations from "../resources/locales/en.json";
import React, { useContext } from "react";

export type LocaleData = typeof seTranslations;
export type Locale = "se" | "en";
export const defaultLocale: Locale = "se";

export function isLocale(text: string): text is Locale {
  return (text as Locale) !== undefined;
}

export const TranslationContext =
  React.createContext<LocaleData>(seTranslations);

export const loadLocale = (locale: Locale): LocaleData => {
  switch (locale) {
    case "se":
      return seTranslations;
    case "en":
      return enTranslations;
  }
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
