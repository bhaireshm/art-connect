"use client";

import { createTheme } from "@mantine/core";
import { createContext } from "react";

type ThemeContextType = "light" | "dark";

export const ThemeContext = createContext<ThemeContextType>("light");

// https://coolors.co/visualizer/004381-002d56-5582ab-aac0d5-ffffff

export const theme = createTheme({
  defaultRadius: "sm",
  primaryShade: 9,
  colors: {
    blue: [
      "#FFFFFF",
      "#E3EAF1",
      "#C6D5E3",
      "#AAC0D5",
      "#8EABC7",
      "#7197B9",
      "#5582AB",
      "#396D9D",
      "#1C588F",
      "#004381",
      "#002d56",
    ],
  },
  fontFamily: "Teachers, open-sans",
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
  },
});
