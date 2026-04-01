import React from "react";
import { SocialButton } from "./SocialButton.jsx";

const InstagramIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="40" height="40" rx="12" stroke="white" strokeWidth="3" />
    <circle cx="24" cy="24" r="10" stroke="white" strokeWidth="3" />
    <circle cx="36" cy="12" r="3" fill="white" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="40" height="40" rx="4" stroke="white" strokeWidth="3" />
    <path d="M14 20V34" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <circle cx="14" cy="14" r="3" fill="white" />
    <path
      d="M22 34V26C22 22.6863 24.6863 20 28 20C31.3137 20 34 22.6863 34 26V34"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path d="M22 20V34" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export default {
  title: "Components/SocialButton",
  component: SocialButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    href: { control: "text" },
  },
};

const defaultStyle = {
  width: "400px",
  height: "69px",
  padding: "20px 40px",
};

export const Default = {
  args: {
    label: "Instagram",
    href: "#",
    icon: <InstagramIcon />,
    style: defaultStyle,
  },
};

export const Linkedin = {
  args: {
    label: "Linkedin",
    href: "#",
    icon: <LinkedinIcon />,
    style: defaultStyle,
  },
};

export const AllSocials = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <SocialButton label="Instagram" href="#" icon={<InstagramIcon />} style={defaultStyle} />
      <SocialButton label="Linkedin" href="#" icon={<LinkedinIcon />} style={defaultStyle} />
    </div>
  ),
};
