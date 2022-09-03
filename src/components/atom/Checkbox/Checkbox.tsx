import React from "react";

// CSS
import "./Checkbox.css";

interface Props {
  checked?: boolean;
  label: string;
  onChange(value: string): void;
  value: string;
}

function Checkbox({ checked = false, label, onChange, value }: Props) {
  return (
    <>
      <input
        type="checkbox"
        checked={checked}
        value={value}
        onChange={() => onChange(value)}
      />
      <label>{label}</label>
    </>
  );
}

export default Checkbox;
