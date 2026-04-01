import React from "react";

const variantStyles = {
  primary: {
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
  },
  secondary: {
    backgroundColor: "transparent",
    color: "#0070f3",
    border: "1px solid #0070f3",
  },
};

export function Button({ variant = "primary", children, onClick, ...props }) {
  const style = {
    padding: "0.5rem 1.25rem",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "opacity 0.2s",
    ...variantStyles[variant],
  };

  return (
    <button style={style} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
