import "../resources/styles/globals.scss";
import "../resources/styles/source_sans_pro.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  defaultLocale,
  isLocale,
  loadLocale,
  Locale,
  TranslationContext,
} from "../hooks/useTranslations";
import { useRouter } from "next/router";
import Header from "../components/Header";
// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  let translationLocale: Locale = defaultLocale;
  if (locale && isLocale(locale)) {
    translationLocale = locale;
  }

  return (
    <TranslationContext.Provider value={loadLocale(translationLocale)}>
      <Head>
        <title>Vrecipes</title>
        <link rel="icon" href="/vrecipes_logo.png" />
      </Head>

      <Header />
      <Component {...pageProps} />
    </TranslationContext.Provider>
  );
}

export default MyApp;
