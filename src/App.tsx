import React, { useState } from "react";

// Atom
import { Checkboxes } from "./components/molecules";

function App() {
  const [items, setItems] = useState([
    { label: "Hello", value: "Hello", checked: false },
    { label: "Hello2", value: "Hello2", checked: false },
    { label: "Hello3", value: "Hello3", checked: false },
    { label: "Hello3", value: "Hello3", checked: false },
    { label: "Hello3", value: "Hello3", checked: false },
    { label: "Hello3", value: "Hello3", checked: false },
    { label: "Hello3", value: "Hello3", checked: false },
    { label: "Hello3", value: "Hello3", checked: false },
    { label: "Hello3", value: "Hello3", checked: false },
    { label: "Hello3", value: "Hello3", checked: false },
    { label: "Hello3", value: "Hello3", checked: false },
    { label: "Hello3", value: "Hello3", checked: false },
  ]);

  const handleChangeCheckbox = (value: string) => {
    setItems((prevItems) => {
      return prevItems.map((prevItem) =>
        prevItem.value === value
          ? { ...prevItem, checked: !prevItem.checked }
          : prevItem
      );
    });
  };

  return (
    <div className="App">
      <Checkboxes items={items} onChange={handleChangeCheckbox} />
    </div>
  );
}

export default App;
