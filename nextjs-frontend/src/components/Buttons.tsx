import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Buttons.module.scss";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type ButtonVariant = {
  variant: "primary" | "secondary" | "opaque";
};

export type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariant & {
    classes?: string;
  };

// Not generally meant to be used directly.
const ButtonBase: FC<ButtonBaseProps> = ({ ...props }) => {
  let variant = styles[`button-${props.variant}`];

  return (
    <button
      className={`${styles.buttonBase} ${variant} ${
        props.classes ? props.classes : ""
      }`}
      {...props}
    />
  );
};

export type ButtonSize = {
  size: "small" | "normal" | "large";
};

export type ButtonProps = ButtonBaseProps & ButtonSize;

export const Button: FC<ButtonProps> = ({ ...props }) => {
  let size = styles[`button-size-${props.size}`];

  return <ButtonBase {...props} classes={size} />;
};

export type IconButtonProps = ButtonBaseProps & {
  icon: IconDefinition;
};

export const IconButton: FC<IconButtonProps> = ({ ...props }) => {
  return (
    <ButtonBase {...props} classes={styles.iconButton}>
      <FontAwesomeIcon icon={props.icon} className={styles.iconButtonIcon} />
    </ButtonBase>
  );
};
