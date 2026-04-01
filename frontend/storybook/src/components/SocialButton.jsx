import React from "react";
import "./SocialButton.css";

export function SocialButton({
  label,
  href,
  icon,
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`social-button${className ? ` ${className}` : ""}`}
      {...props}
    >
      <span className="social-button__icon">{icon}</span>
      <span className="social-button__label">{label}</span>
    </a>
  );
}
