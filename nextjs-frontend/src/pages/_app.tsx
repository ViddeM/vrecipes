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
import { AuthContext } from "../hooks/useMe";
import { Me } from "../api/Me";
import { Api } from "../api/Api";
import { useEffect, useState } from "react";
import Modal, { ModalProps } from "../components/Modal";
import { ModalContext } from "../hooks/useModal";

// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  let translationLocale: Locale = defaultLocale;
  if (locale && isLocale(locale)) {
    translationLocale = locale;
  }

  const [me, setMe] = useState<Me | undefined>(undefined);

  useEffect(() => {
    Api.user.getMe().then((response) => {
      if (response.data) {
        setMe(response.data);
      }
    });
  }, []);

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

          <div aria-hidden={modalProps ? "true" : undefined}>
            <Header />
            <Component {...pageProps} />
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

  const closeOnEsc = (event: KeyboardEvent) => {
    console.log("KEY EVVENT ", event);

    if (event.code === "Escape") {
      event.stopPropagation();
      closeModal(() => {});
    }
  };

  const closeModal = (onClose: (() => void) | undefined) => {
    document.body.style.overflow = "auto";
    setModalProps(undefined);
    document.removeEventListener("keypress", closeOnEsc);

    if (onClose) {
      onClose();
    }
  };

  document.addEventListener("keypress", closeOnEsc);

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
