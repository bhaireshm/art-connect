"use client";

import styles from "@/assets/styles/page.module.css";

import { objectToQueryParams } from "@bhairesh/ez.js";
import { Container, Loader, Space, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";

import { RelatedArtists } from "@/components/artist";
import { ArtworkGrid } from "@/components/artwork";
import { FeaturesCards } from "@/components/Features";
import Hero from "@/components/Hero";
import { API, filterArtworks } from "@/redux";

export default function Home(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [featuredArtists, setFeaturedArtists] = useState([]);

  const fetchFeaturedArtists = () => {
    const searchFilter = { page: 1, limit: 6 };
    API(`/api/artists/filter?${objectToQueryParams(searchFilter)}`)
      .then((r) => r.json())
      .then((d) => {
        console.log("file: page.tsx:25  .then  d", d);
        setFeaturedArtists(d.data.results);
      });
  };

  useEffect(() => {
    fetchFeaturedArtists();

    filterArtworks(1, 8)
      .then((result) => {
        console.log("file: page.tsx:55  loadFeaturedArtworks  data", result);
        setIsLoading(false);
        setFeaturedArtworks(result?.data?.results);
      })
      .catch((error) => {
        console.error("Failed to fetch featured artworks:", error);
      });
  }, []);

  return (
    <main className={styles.main}>
      <Container fluid py={10} ta="center">
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

        {featuredArtists?.length === 0 && isLoading ? (
          <Loader />
        ) : (
          <RelatedArtists artists={featuredArtists} />
        )}
        <Space h="xl" />

        {/* Top artworks */}
        {/* <Space h="xl" />
        <TopArtworks /> */}

        <FeaturesCards />
        {/* Call to Action */}
        {/* <Space h="xl" />
        <CallToAction /> */}
      </Container>
    </main>
  );
}
