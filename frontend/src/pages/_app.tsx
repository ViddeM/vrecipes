import "../resources/styles/globals.scss";
import "../resources/styles/source_sans_pro.scss";
import "../resources/styles/deja_vu_sans.scss";
// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";

import { useState } from "react";

import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import { Api } from "../api/Api";
import { Me } from "../api/Me";
import ErrorCard from "../components/elements/ErrorCard";
import ErrorHeader from "../components/views/ErrorHeader/ErrorHeader";
import Footer from "../components/views/Footer/Footer";
import Header from "../components/views/Header/Header";
import Modal, { ModalProps, trapTabKey } from "../components/views/Modal/Modal";
import { AuthContext } from "../hooks/useMe";
import { ModalContext } from "../hooks/useModal";
import {
  defaultLocale,
  isLocale,
  loadLocale,
  Locale,
  TranslationContext,
} from "../hooks/useTranslations";

// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false;

type MyAppProps = AppProps & {
  me?: Me;
  failedToReachBackend?: boolean;
  error?: boolean;
};

function MyApp({
  Component,
  pageProps,
  me,
  failedToReachBackend,
  error,
}: MyAppProps) {
  const { locale } = useRouter();
  let translationLocale: Locale = defaultLocale;
  if (locale && isLocale(locale)) {
    translationLocale = locale;
  }

  const [modalProps, setModalProps] = useState<ModalProps | undefined>(
    undefined
  );

  return (
    <TranslationContext.Provider value={loadLocale(translationLocale)}>
      <AuthContext.Provider value={{ me: me }}>
        <ModalContext.Provider
          value={{
            openModal: (props) =>
              setModalProps(handleOpenModalProps(props, setModalProps)),
          }}
        >
          <Head>
            <title>Vrecipes</title>
            <link rel="icon" href="/vrecipes_logo.png" />
          </Head>

          {modalProps && <Modal {...modalProps} />}

          <div
            aria-hidden={modalProps ? "true" : undefined}
            className="fullHeight"
          >
            {failedToReachBackend && <ErrorHeader />}
            <Header />
            <div className="fill">
              {error ? (
                <ErrorCard error={"errors.default"} />
              ) : (
                <Component {...pageProps} />
              )}
            </div>
            <Footer />
          </div>
        </ModalContext.Provider>
      </AuthContext.Provider>
    </TranslationContext.Provider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const ret = await App.getInitialProps(appContext);
  const { ctx } = appContext;

  const meResponse = await Api.user.getMe(
    ctx?.req?.headers?.cookie ?? undefined
  );
  if (meResponse.failedToReachBackend) {
    return {
      ...ret,
      failedToReachBackend: meResponse.failedToReachBackend,
      error: true,
    };
  }

  if (!meResponse.error) {
    // Since we do not require our users to be authorized we don't care if the me request fails.
    return {
      ...ret,
      me: meResponse.data,
    };
  }

  return {
    ...ret,
  };
};

// TODO: Move this to Modal.tsx
function handleOpenModalProps(
  props: ModalProps,
  setModalProps: (modalProps: ModalProps | undefined) => void
): ModalProps {
  document.body.style.overflow = "hidden";

  const closeOnEsc = ({ key }: KeyboardEvent) => {
    if (key === "Escape") {
      closeModal(props.onClose);
    }
  };

  const closeModal = (onClose: (() => void) | undefined) => {
    document.body.style.overflow = "auto";
    setModalProps(undefined);
    window.removeEventListener("keydown", closeOnEsc);
    window.removeEventListener("keydown", trapTabKey);

    if (onClose) {
      onClose();
    }
  };

  window.addEventListener("keydown", closeOnEsc);
  window.addEventListener("keydown", trapTabKey);

  return {
    ...props,
    onClose: () => {
      closeModal(props.onClose);
    },
    declineButton: props.declineButton
      ? {
          ...props.declineButton,
          onClick: () => {
            closeModal(props.declineButton?.onClick);
          },
        }
      : undefined,
    confirmButton: props.confirmButton
      ? {
          ...props.confirmButton,
          onClick: () => {
            closeModal(props.confirmButton?.onClick);
          },
        }
      : undefined,
  };
}

export default MyApp;
