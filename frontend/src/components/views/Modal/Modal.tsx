import { useKeyPress } from "../../../hooks/useKeyPress";
import { Button } from "../../elements/Buttons/Buttons";

import styles from "./Modal.module.scss";

export interface ModalProps {
  title: string;
  content: string;
  confirmButton?: ModalButtonProps;
  declineButton?: ModalButtonProps;
  onClose?: () => void;
}

export interface ModalButtonProps {
  text: string;
  onClick: () => void;
}

const MODAL_BACKGROUND_ID = "modal_overlay_element";

const Modal = ({
  title,
  content,
  confirmButton,
  declineButton,
  onClose,
}: ModalProps) => {
  const escapePress = useKeyPress("Escape");
  if (escapePress && onClose) {
    onClose();
  }

  return (
    <div
      id={MODAL_BACKGROUND_ID}
      className={styles.pageCover}
      onMouseDown={(event) => {
        const element = event.target as Element;
        if (onClose && element.id === MODAL_BACKGROUND_ID) {
          onClose();
        }
      }}
    >
      <div className={`card ${styles.modalCard}`}>
        <h3>{title}</h3>
        <p className={"marginTopBig"}>{content}</p>
        <div className={`marginTopBig ${styles.modalActions}`}>
          {declineButton && (
            <Button
              variant="secondary"
              size="normal"
              onClick={declineButton.onClick}
            >
              {declineButton.text}
            </Button>
          )}
          {declineButton && confirmButton && <div className="space" />}
          {confirmButton && (
            <Button
              variant="primary"
              size="normal"
              onClick={confirmButton.onClick}
            >
              {confirmButton.text}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Ensure that the user can't interact with elements behind it.
export function trapTabKey(e: KeyboardEvent) {
  if (e.key !== "Tab") {
    return;
  }

  const modalRoot = document.querySelector(`#${MODAL_BACKGROUND_ID}`);
  if (!modalRoot) {
    // eslint-disable-next-line no-console
    console.error("Failed to find modal root!");
    return;
  }

  const FOCUSABLE_ELEMENTS: string = [
    "a[href]",
    "area[href]",
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
    "select:not([disabled]):not([aria-hidden])",
    "textarea:not([disabled]):not([aria-hidden])",
    "button:not([disabled]):not([aria-hidden])",
    "iframe",
    "object",
    "embed",
    "[contenteditable]",
    '[tabindex]:not([tabindex^="-"])',
  ].join(", ");

  const nodes: NodeListOf<HTMLElement> =
    modalRoot.querySelectorAll(FOCUSABLE_ELEMENTS);
  let focusableNodes = [];
  for (let i = 0; i < nodes.length; i++) {
    focusableNodes.push(nodes[i]);
  }

  if (focusableNodes.length === 0) return;

  focusableNodes = focusableNodes.filter((node) => {
    return node.offsetParent !== null;
  });

  // if disableFocus is true
  if (!modalRoot.contains(document.activeElement)) {
    focusableNodes[0].focus();
  } else {
    const focusedItemIndex = focusableNodes.indexOf(
      document.activeElement as HTMLElement
    );

    if (e.shiftKey && focusedItemIndex === 0) {
      focusableNodes[focusableNodes.length - 1].focus();
      e.preventDefault();
    }

    if (
      !e.shiftKey &&
      focusableNodes.length > 0 &&
      focusedItemIndex === focusableNodes.length - 1
    ) {
      focusableNodes[0].focus();
      e.preventDefault();
    }
  }
}

export default Modal;
