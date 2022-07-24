import { ButtonHTMLAttributes, FC } from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Buttons.module.scss";

export type ButtonVariant = {
  variant: "primary" | "secondary" | "opaque" | "outlined";
};

export type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariant;

// Not generally meant to be used directly.
const ButtonBase: FC<ButtonBaseProps> = ({ variant, className, ...props }) => {
  const variantStyle = styles[`button-${variant}`];

  return (
    <button
      {...props}
      className={`${className} ${styles.buttonBase} ${variantStyle} `}
    />
  );
};

export type ButtonSize = {
  size: "tiny" | "small" | "normal" | "large";
};

export type ButtonProps = ButtonBaseProps & ButtonSize;

export const Button: FC<ButtonProps> = ({ size, className, ...props }) => {
  const sizeStyle = styles[`button-size-${size}`];

  return <ButtonBase {...props} className={`${className} ${sizeStyle}`} />;
};

export type IconButtonProps = ButtonBaseProps &
  ButtonSize & {
    iconColor?: string;
    icon: IconProp;
  };

export const IconButton: FC<IconButtonProps> = ({
  icon,
  size,
  className,
  iconColor,
  ...props
}) => {
  const sizeStyle = styles[`iconButtonSize-${size}`];
  const color = iconColor ? iconColor : "black";

  return (
    <ButtonBase
      {...props}
      className={`${styles.iconButton} ${className} ${sizeStyle}`}
    >
      <FontAwesomeIcon
        icon={icon}
        className={styles.iconButtonIcon}
        style={{ color: color }}
      />
    </ButtonBase>
  );
};
