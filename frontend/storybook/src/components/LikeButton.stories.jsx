import React, { useState } from "react";
import { LikeButton } from "./LikeButton.jsx";

export default {
  title: "Components/LikeButton",
  component: LikeButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    liked: { control: "boolean" },
    label: { control: "text" },
    onToggle: { action: "toggled" },
  },
};

export const Default = {
  args: {
    liked: false,
    label: "Like",
  },
};

export const Liked = {
  args: {
    liked: true,
    label: "Like",
  },
};

export const Interactive = {
  render: () => {
    const [liked, setLiked] = React.useState(false);
    return <LikeButton liked={liked} onToggle={() => setLiked((v) => !v)} label="Like" />;
  },
};
