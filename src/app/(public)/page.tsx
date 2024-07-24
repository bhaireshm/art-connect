"use client";

import styles from "@/assets/styles/page.module.css";
import { ArtworkGrid } from "@/components/artwork-grid/artwork-grid";
import Hero from "@/components/Hero";
import { filterArtworks } from "@/redux";
import { Container, Loader, Space, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";

export default function Home(): React.JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const [featuredArtworks, setFeaturedArtworks] = useState([]);

  useEffect(() => {
    filterArtworks(1, 8)
      .then((result) => {
        console.log("file: page.tsx:55  loadFeaturedArtworks  data", result);
        setLoading(false);
        setFeaturedArtworks(result?.data?.results);
      })
      .catch((error) => {
        console.error("Failed to fetch featured artworks:", error);
      });
  }, []);

  return (
    <main className={styles.main}>
      <Container fluid py={10} ta={"center"}>
        {/* Hero Section */}
        <Hero />

        {/* Artwork Grid Section */}
        <Text
          fz="40"
          my={20}
          fw={900}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Featured Artworks
        </Text>
        {featuredArtworks?.length === 0 && isLoading ? (
          <Loader />
        ) : (
          <ArtworkGrid artworks={featuredArtworks} />
        )}
        <Space h="xl" />

        {/* Top artworks */}
        {/* <Space h="xl" />
        <TopArtworks /> */}

        {/* Call to Action */}
        {/* <Space h="xl" />
        <CallToAction /> */}
      </Container>
    </main>
  );
}
