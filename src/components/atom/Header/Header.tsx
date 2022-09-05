import React from "react";

// CSS
import "./Header.css";

interface Props {
  children: React.ReactNode;
  height?: string;
  width?: string;
  sticky?: boolean;
  background?: string;
}

function Header({
  children,
  height = "64px",
  width = "100%",
  sticky = false,
  background = "red",
}: Props) {
  return (
    <div
      className="header"
      style={{
        backgroundColor: background,
        height,
        width,
        position: sticky ? "fixed" : "relative",
      }}
    >
      {children}
    </div>
  );
}

export default Header;
