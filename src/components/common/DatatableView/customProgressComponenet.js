import React from "react";

const CustomProgressComponenet = ({ darkTheme }) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        width: "100%",
        background: darkTheme ? "#444" : "white",
        color: darkTheme ? "white" : "black",
      }}
    >
      Loading...
    </div>
  );
};

export default CustomProgressComponenet;
