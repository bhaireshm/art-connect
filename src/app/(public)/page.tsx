"use client";

import { objectToQueryParams } from "@bhairesh/ez.js";
import { Container, Loader, Space, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";

import { ArtworkGrid, FeaturesCards, Hero, RelatedArtists } from "@/components";
import { API } from "@/core";
import { API_BASE_URL } from "@/utils/constants";

export default function Home(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [featuredArtists, setFeaturedArtists] = useState([]);

  const fetchFeaturedArtists = () => {
    const searchFilter = { page: 1, limit: 6 };
    API(`/api/artists/filter?${objectToQueryParams(searchFilter)}`).then((d) => {
      setFeaturedArtists(d.data.results);
    });
  };

  const filterArtworks = async (page: number, limit: number, filter = {}) => {
    const searchFilter = { page, limit, ...filter };
    const data = await API(`${API_BASE_URL}/artworks/filter?${objectToQueryParams(searchFilter)}`);
    return data;
  };

  useEffect(() => {
    fetchFeaturedArtists();

    filterArtworks(1, 8)
      .then((result) => {
        setIsLoading(false);
        setFeaturedArtworks(result?.data?.results);
      })
      .catch((error) => {
        console.error("Failed to fetch featured artworks:", error);
      });
  }, []);

  return (
    <Container py={10} ta="center">
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
  );
}
