"use client";

import { createContext } from "react";
import { createTheme } from "@mantine/core";

type ThemeContextType = "light" | "dark";

export const ThemeContext = createContext<ThemeContextType>("light");

export const theme = createTheme({});
