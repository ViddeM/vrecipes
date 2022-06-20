import "../resources/styles/globals.scss";
import "../resources/styles/source_sans_pro.scss";
import "../resources/styles/deja_vu_sans.scss";
// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";

import { useEffect, useState } from "react";

import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import { Api } from "../api/Api";
import { Me } from "../api/Me";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal, { ModalProps, trapTabKey } from "../components/Modal";
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

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  let translationLocale: Locale = defaultLocale;
  if (locale && isLocale(locale)) {
    translationLocale = locale;
  }

  const [me, setMe] = useState<Me | undefined>(undefined);
  const [initializedMe, setInitializedMe] = useState<boolean>(false);

  useEffect(() => {
    Api.user
      .getMe()
      .then((response) => {
        if (response.data) {
          setMe(response.data);
        }
      })
      .finally(() => {
        setInitializedMe(true);
      });
  }, []);

  const [modalProps, setModalProps] = useState<ModalProps | undefined>(
    undefined
  );

  return (
    <TranslationContext.Provider value={loadLocale(translationLocale)}>
      <AuthContext.Provider value={{ me: me, initialized: initializedMe }}>
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
            <Header />
            <div className="fill">
              <Component {...pageProps} />
            </div>
            <Footer />
          </div>
        </ModalContext.Provider>
      </AuthContext.Provider>
    </TranslationContext.Provider>
  );
}

const ESC_KEY = 27;

// TODO: Move this to Modal.tsx
function handleOpenModalProps(
  props: ModalProps,
  setModalProps: (modalProps: ModalProps | undefined) => void
): ModalProps {
  document.body.style.overflow = "hidden";

  const closeOnEsc = ({ key }: KeyboardEvent) => {
    if (key === "Escape") {
      closeModal(() => {});
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
