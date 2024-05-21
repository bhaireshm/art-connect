import "@/assets/styles/globals.css";
import "@mantine/core/styles.css";

import { theme } from "@/core";
import type { ReadOnlyProps } from "@/types";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreProvider } from "@/redux/store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Art Connect",
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
