import { FC, InputHTMLAttributes } from "react";
import styles from "./Dropdown.module.scss";

export type SelectOption = {
  display: string;
  value: string;
};

export type SelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
  onUpdate: (value: string) => void;
  defaultValue?: string;
};

const Dropdown: FC<SelectProps> = ({
  options,
  onUpdate,
  defaultValue,
  ...props
}) => {
  return (
    <select
      {...props}
      onChange={(e) => onUpdate(e.target.value)}
      className={styles.dropdownBase}
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
