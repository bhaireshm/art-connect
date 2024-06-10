"use client";

import React from "react";
import Image from "next/image";
import styles from "@/assets/styles/page.module.css";
import { Box, Container, Grid, Text, useMantineTheme } from "@mantine/core";
import Art from "@/assets/image/Art.svg";
import { CardsCarousel } from "@/components/cardsCarousel/CardsCarousel";
import "@mantine/carousel/styles.css";

export default function Home(): React.JSX.Element {
  const theme = useMantineTheme();

  const span = 12;
  return (
    <main className={styles.main}>
      <Container fluid py={10}>
        <Grid justify="center" px={200}>
          <Grid.Col
            span={span}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 50 }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "50%",
                flexWrap: "wrap",
              }}>
              <Text c={theme.colors.blue[9]} ff={theme.fontFamily} fs={theme.fontSizes.xl} fw={800}>
                The New Creative Economy.
              </Text>
              <Text c={theme.colors.blue[9]} ff={theme.fontFamily} fs={theme.fontSizes.xl}>
                Share your creations with the world
              </Text>
              <Text c={theme.colors.blue[9]} ff={theme.fontFamily} fs={theme.fontSizes.xl}>
                Collect and sell digital art, powered by the best online tools.
              </Text>
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "50%",
              }}>
              <Image src={Art} alt="art" width={800} />
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
      <Box py={30} px={20}>
        <Text
          ff={theme.fontFamily}
          fs={theme.fontSizes.xl}
          c={theme.colors.blue[9]}
          fw={800}
          py={10}>
          Hot bid
        </Text>
        <CardsCarousel />
      </Box>
    </main>
  );
}
