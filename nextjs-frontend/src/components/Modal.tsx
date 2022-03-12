import styles from "./Modal.module.scss";
import { Button } from "./Buttons";

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
  return (
    <div
      id={MODAL_BACKGROUND_ID}
      className={styles.pageCover}
      onMouseDown={(event) => {
        // @ts-ignore
        if (onClose && event.target.id === MODAL_BACKGROUND_ID) {
          onClose();
        }
      }}
    >
      <div className={`card ${styles.modalCard}`}>
        <h3>{title}</h3>
        <p className={"marginTop"}>{content}</p>
        <div className={`marginTop ${styles.modalActions}`}>
          {declineButton && (
            <Button
              variant="secondary"
              size="normal"
              onClick={declineButton.onClick}
            >
              {declineButton.text}
            </Button>
          )}
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

export default Modal;
