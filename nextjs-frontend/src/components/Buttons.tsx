import {ButtonHTMLAttributes, FC} from "react";
import styles from "./Buttons.module.scss"

export type ButtonVariant = {
    variant: 'primary'
};

export type ButtonSize = {
    size: 'small' | 'normal' | 'large';
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariant & ButtonSize;

const Button: FC<ButtonProps> = ({...props}) => {
    let variant = styles[`button-${props.variant}`];
    let size = styles[`button-size-${props.size}`];

    return (
        <button
            className={`${styles.buttonBase} ${size} ${variant}`} {...props}/>
    )
}

export default Button;