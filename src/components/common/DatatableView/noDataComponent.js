import React from 'react'

const NoDataComponent = ({ darkTheme, customMessage }) => {
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
      {customMessage || "There are no records to display"}
    </div>
  )
}

export default NoDataComponent