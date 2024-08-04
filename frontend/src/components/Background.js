import React from "react";
import backgroundImage from "../static/background.png";

export default function Background({ children }) {
  const style = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  return <div style={style}>{children}</div>;
}
