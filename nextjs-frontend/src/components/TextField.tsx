import { FC, InputHTMLAttributes } from "react";
import styles from "./TextField.module.scss";

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  postfixText?: string;
  inputClassName?: string;
};

const TextField: FC<TextFieldProps> = ({
  postfixText,
  className,
  inputClassName,
  required,
  ...props
}) => {
  return (
    <div className={`${className} ${styles.textFieldContainer}`}>
      <input
        className={`${styles.textFieldBase} ${inputClassName}`}
        {...props}
        required={required}
      />
      {postfixText && <span>{postfixText}</span>}
      {required && <span className={styles.requiredTextField}>*</span>}
    </div>
  );
};

export type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  textAreaClassName?: string;
};

export const TextArea: FC<TextAreaProps> = ({
  className,
  textAreaClassName,
  ...props
}) => {
  return (
    <div className={`${styles.textAreaContainer} ${className}`}>
      <textarea
        className={`${styles.textAreaBase} ${textAreaClassName}`}
        {...props}
      />
    </div>
  );
};

export default TextField;
