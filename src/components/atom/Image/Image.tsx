import React from "react";

interface Props {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}

function Image({
  src,
  alt = "image",
  width = "100px",
  height = "100px",
}: Props) {
  return <img src={src} alt={alt} style={{ width, height }} />;
}

export default Image;
