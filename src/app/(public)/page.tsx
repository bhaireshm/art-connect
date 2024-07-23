"use client";

import styles from "@/assets/styles/page.module.css";
import { ArtworkGrid } from "@/components/artwork-grid/artwork-grid";
import { Container, Text } from "@mantine/core";
import React from "react";

const mockArtworks = [
  {
    id: "1",
    title: "Sunset over the Ocean",
    description: "A beautiful painting of a sunset over the ocean.",
    dimensions: { height: 24, width: 36, depth: 1.5 },
    medium: "Oil on canvas",
    images: ["https://dummyimage.com/50x50/000/fff"],
    price: 1200,
    artist: "101",
    relatedArtworks: ["2", "3"],
  },
  {
    id: "2",
    title: "Mountain Landscape",
    description: "A serene mountain landscape with a lake in the foreground.",
    dimensions: { height: 18, width: 24, depth: 1 },
    medium: "Acrylic on canvas",
    images: ["https://dummyimage.com/50x50/000/fff"],
    price: 950,
    artist: "102",
    relatedArtworks: ["1", "3"],
  },
  {
    id: "3",
    title: "Abstract Composition",
    description: "A vibrant abstract composition with bold colors and shapes.",
    dimensions: { height: 30, width: 40, depth: 1.5 },
    medium: "Mixed media on canvas",
    images: ["https://dummyimage.com/50x50/000/fff"],
    price: 1500,
    artist: "103",
    relatedArtworks: ["1", "2"],
  },
];

export default function Home(): React.JSX.Element {
  return (
    <main className={styles.main}>
      <Container fluid py={6}>
        <Container>
          <Text
            fz="40"
            my={20}
            fw={900}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            Featured Artworks
          </Text>
          <ArtworkGrid artworks={mockArtworks} />
        </Container>
      </Container>
    </main>
  );
}
