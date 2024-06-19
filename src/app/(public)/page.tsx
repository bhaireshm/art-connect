"use client";

import React from "react";
import styles from "@/assets/styles/page.module.css";
import Image from "next/image";
import { Container, Grid, Text, rem, useMantineTheme } from "@mantine/core";
import Art from "@/assets/image/Art.svg";
import { CategoiesSection } from "@/components/catagoies-section/CategoiesSection";
import { artCategories } from "@/assets/json-data/art-catagories";
import { useMediaQuery } from "@mantine/hooks";

export default function Home(): React.JSX.Element {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const span = mobile ? 12 : 6;
  return (
    <main className={styles.main}>
      <Container fluid py={10}>
        <Grid justify="center" px={mobile ? rem(50) : rem(200)}>
          <Grid.Col
            span={span}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text c={theme.colors.blue[9]} ff={theme.fontFamily} fs={theme.fontSizes.xl} fw={800}>
              The New Creative Economy.
            </Text>
            <Text c={theme.colors.blue[9]} ff={theme.fontFamily} fs={theme.fontSizes.xl}>
              Share your creations with the world
            </Text>
            <Text c={theme.colors.blue[9]} ff={theme.fontFamily} fs={theme.fontSizes.xl}>
              Collect and sell digital art, powered by the best online tools.
            </Text>
          </Grid.Col>
          <Grid.Col
            span={span}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Image src={Art} alt="art" width={800} height={500} />
          </Grid.Col>
        </Grid>
      </Container>
      {artCategories?.map((catagoiesItem) => (
        <CategoiesSection categoryList={catagoiesItem} key={catagoiesItem.id} />
      ))}
    </main>
  );
}
