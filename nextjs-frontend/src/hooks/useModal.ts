import React, { useContext } from "react";

import { ModalProps } from "../components/Modal";

export interface ModalContext {
  openModal: (props: ModalProps) => void;
}

export const ModalContext = React.createContext<ModalContext>({
  openModal: (_) => {},
});

export const useModal = (): ModalContext => {
  const { openModal } = useContext(ModalContext);

  return {
    openModal: openModal,
  };
};
