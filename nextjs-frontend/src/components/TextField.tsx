import { FC, InputHTMLAttributes, useCallback } from "react";
import styles from "./TextField.module.scss";

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  postfixText?: string;
  inputClassName?: string;
  responsive?: boolean;
  focus?: boolean;
};

const TextField: FC<TextFieldProps> = ({
  postfixText,
  className,
  inputClassName,
  required,
  responsive,
  focus,
  ...props
}) => {
  const responsiveClass = responsive ? styles.responsive : "";

  const refFn = useCallback(
    (element: HTMLInputElement) => (element && focus ? element.focus() : null),
    [focus]
  );

  return (
    <div
      className={`${className} ${styles.textFieldContainer} ${responsiveClass}`}
    >
      <input
        className={`${styles.textFieldBase} ${inputClassName} `}
        {...props}
        required={required}
        ref={refFn}
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
