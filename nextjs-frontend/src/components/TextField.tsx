import { FC, InputHTMLAttributes } from "react";
import styles from "./TextField.module.scss";

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

const TextField: FC<TextFieldProps> = ({ className, ...props }) => {
  return (
    <input className={`${styles.textFieldBase} ${className}`} {...props} />
  );
};

export default TextField;
