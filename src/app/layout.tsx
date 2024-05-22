import "@/assets/styles/globals.css";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { theme } from "@/core";
import { StoreProvider } from "@/redux/store-provider";
import type { ReadOnlyProps } from "@/types";
import { PROJECT_NAME } from "@/utils/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: PROJECT_NAME,
  description: "",
};

export default function RootLayout({ children }: ReadOnlyProps) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <StoreProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
