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
}

function Checkboxes({ items, onChange }: Props) {
  return (
    <div className="checkboxes-container">
      {items.map((item) => (
        <div className="checkbox-wrapper" key={item.value}>
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
