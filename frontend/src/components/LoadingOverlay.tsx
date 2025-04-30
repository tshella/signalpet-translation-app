import React from "react";

const overlayStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  backdropFilter: "blur(2px)",
};

const spinnerStyles: React.CSSProperties = {
  width: "3rem",
  height: "3rem",
  border: "5px solid #ccc",
  borderTop: "5px solid #064c60",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const LoadingOverlay = () => {
  return (
    <div style={overlayStyles}>
      <div style={spinnerStyles} />
    </div>
  );
};

export default LoadingOverlay;
