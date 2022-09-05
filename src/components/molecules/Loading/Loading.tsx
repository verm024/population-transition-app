import React from "react";

// CSS
import "./Loading.css";

// Atom
import { Image } from "../../atom";

// Image
import Spinner from "../../../assets/spinner.gif";

function Loading() {
  return (
    <div className="loading-container">
      <Image src={Spinner} />
      <p className="loading-text">ちょっとお待ちください！</p>
    </div>
  );
}

export default Loading;
