import styles from "./Checkbox.module.scss";
import { InputHTMLAttributes } from "react";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  checked: boolean;
  setChecked: (val: boolean) => void;
};

const Checkbox = ({ checked, setChecked, ...props }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      className={styles.checkbox}
      checked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
      }}
      {...props}
    />
  );
};

export default Checkbox;
