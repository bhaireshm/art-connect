"use client";

import styles from "@/assets/styles/page.module.css";
import { ArtworkGrid } from "@/components/ArtworkGrid/ArtworkGrid";
import { Container, Title } from "@mantine/core";
import React from "react";

const mockArtworks = [
  {
    _id: "1",
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
    _id: "2",
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
    _id: "3",
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
      <Container fluid py={10}>
        <Container>
          <Title order={1} style={{ marginBottom: 20, marginTop: 20 }}>
            Featured Artworks
          </Title>
          <ArtworkGrid artworks={mockArtworks} />
        </Container>
      </Container>
    </main>
  );
}
