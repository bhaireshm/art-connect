import "@/assets/styles/globals.css";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

import { theme } from "@/core";
import { StoreProvider } from "@/redux/store-provider";
import type { ReadOnlyProps } from "@/types";
import { PROJECT_NAME } from "@/utils/constants";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: PROJECT_NAME,
  description: "",
};

export default function RootLayout({ children }: ReadOnlyProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
        <link rel="manifest" href="favicon/site.webmanifest" />
        <ColorSchemeScript />
      </head>
      <body className={quicksand.className}>
        <StoreProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
