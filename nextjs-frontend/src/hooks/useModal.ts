import React, { useContext } from "react";

import { ModalProps } from "../components/views/Modal/Modal";

export interface ModalContext {
  openModal: (props: ModalProps) => void;
}

export const ModalContext = React.createContext<ModalContext>({
  openModal: () => {
    // eslint-disable-next-line no-console
    console.error("Modal has not been properly initialized");
  },
});

export const useModal = (): ModalContext => {
  const { openModal } = useContext(ModalContext);

  return {
    openModal: openModal,
  };
};
