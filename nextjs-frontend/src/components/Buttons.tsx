import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Buttons.module.scss";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type ButtonVariant = {
  variant: "primary" | "secondary" | "opaque" | "outlined";
};

export type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariant;

// Not generally meant to be used directly.
const ButtonBase: FC<ButtonBaseProps> = ({ variant, className, ...props }) => {
  let variantStyle = styles[`button-${variant}`];

  return (
    <button
      {...props}
      className={`${className ? className : ""} ${
        styles.buttonBase
      } ${variantStyle}`}
    />
  );
};

export type ButtonSize = {
  size: "small" | "normal" | "large";
};

export type ButtonProps = ButtonBaseProps & ButtonSize;

export const Button: FC<ButtonProps> = ({ size, className, ...props }) => {
  let sizeStyle = styles[`button-size-${size}`];

  return (
    <ButtonBase
      {...props}
      className={`${sizeStyle} ${className ? className : ""}`}
    />
  );
};

export type IconButtonProps = ButtonBaseProps & {
  icon: IconDefinition;
};

export const IconButton: FC<IconButtonProps> = ({
  icon,
  className,
  ...props
}) => {
  return (
    <ButtonBase
      {...props}
      className={`${styles.iconButton} ${className ? className : ""}`}
    >
      <FontAwesomeIcon icon={icon} className={styles.iconButtonIcon} />
    </ButtonBase>
  );
};
