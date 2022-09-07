import React from "react";

// Atom
import { Checkbox } from "../../atom";

// CSS
import "./Checkboxes.css";

interface Item {
  checked?: boolean;
  label: string;
  value: string;
}

interface Props {
  items: Item[];
  onChange(value: string): void;
  "cy-name"?: string;
}

function Checkboxes({ items, onChange, ...rest }: Props) {
  return (
    <div
      className="checkboxes-container"
      data-cy={`checkboxes-container-${rest["cy-name"]}`}
    >
      {items.map((item) => (
        <div
          className="checkbox-wrapper"
          key={item.value}
          data-cy={`checkbox-wrapper-${rest["cy-name"]}-${item.value}`}
        >
          <Checkbox
            checked={item.checked}
            label={item.label}
            onChange={onChange}
            value={item.value}
          />
        </div>
      ))}
    </div>
  );
}

export default Checkboxes;
