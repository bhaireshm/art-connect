"use client";

import { createContext } from "react";
import { ActionIcon, createTheme } from "@mantine/core";
import classes from "@/components/CustomCard/Card.module.css";
type ThemeContextType = "light" | "dark";

export const ThemeContext = createContext<ThemeContextType>("light");

export const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: classes,
    }),
  },
});

