import {ButtonHTMLAttributes, FC} from "react";
import styles from "./Buttons.module.scss"

export type ButtonVariant = {
  variant: 'primary' | 'secondary'
};

export type ButtonSize = {
  size: 'small' | 'normal' | 'large';
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariant & ButtonSize;

const Button: FC<ButtonProps> = ({...props}) => {
  return (
    <button className={`${styles.buttonBase} ${styles.buttonNormal} ${styles.buttonPrimary}`} {...props}/>
  )
}

export default Button;