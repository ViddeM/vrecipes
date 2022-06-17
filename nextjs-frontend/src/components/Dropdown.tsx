import { FC, InputHTMLAttributes } from "react";
import styles from "./Dropdown.module.scss";

export type SelectOption = {
  display: string;
  value: string;
};

export type DropdownVariant = {
  variant: "opaque" | "outlined";
};

export type DropdownSize = {
  size: "normal" | "auto";
};

export type SelectProps = InputHTMLAttributes<HTMLSelectElement> &
  DropdownVariant &
  DropdownSize & {
    options: SelectOption[];
    onUpdate: (value: string) => void;
    defaultValue?: string;
  };

const Dropdown: FC<SelectProps> = ({
  options,
  onUpdate,
  defaultValue,
  size,
  variant,
  ...props
}) => {
  let variantStyle = styles[`dropdown-variant-${variant}`];
  let sizeStyle = styles[`dropdown-size-${size}`];

  return (
    <select
      {...props}
      onChange={(e) => onUpdate(e.target.value)}
      className={`${styles.dropdownBase} ${variantStyle} ${sizeStyle}`}
      defaultValue={defaultValue}
    >
      {options.map(({ display, value }) => (
        <option key={value} value={value} className={styles.dropdownOptionBase}>
          {display}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
