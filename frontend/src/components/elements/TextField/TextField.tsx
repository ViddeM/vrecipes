import {
  FC,
  InputHTMLAttributes,
  MutableRefObject,
  useEffect,
  useRef,
} from "react";

import styles from "./TextField.module.scss";

export type TextFieldVariant = {
  variant: "outlined" | "opaque";
};

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  postfixText?: string;
  inputClassName?: string;
  responsive?: boolean;
  focus?: boolean;
  externalRef?: MutableRefObject<HTMLInputElement | null>;
} & TextFieldVariant;

const TextField: FC<TextFieldProps> = ({
  postfixText,
  className,
  inputClassName,
  required,
  responsive,
  focus,
  externalRef,
  variant,
  ...props
}) => {
  const responsiveClass = responsive ? styles.responsive : "";
  const inputRef = useRef<HTMLInputElement | null>(null);
  const variantStyle = styles[`textfield-${variant}`];

  useEffect(() => {
    if (focus) {
      inputRef.current?.focus();
    }
  }, [focus]);

  return (
    <div
      className={`${className} ${styles.textFieldContainer} ${responsiveClass} ${variantStyle}`}
    >
      <input
        className={`${styles.textFieldBase} ${inputClassName}`}
        {...props}
        required={required}
        ref={(node) => {
          inputRef.current = node;
          if (externalRef) {
            externalRef.current = node;
          }
        }}
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
