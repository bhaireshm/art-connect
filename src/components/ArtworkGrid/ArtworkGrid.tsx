import React from "react";
import { SimpleGrid } from "@mantine/core";
import { ArtworkCard } from "./ArtworkCard";

interface ArtworkGridProps {
  artworks: any[];
}

export function ArtworkGrid({ artworks }: Readonly<ArtworkGridProps>) {
  return (
    <SimpleGrid
      cols={4}
      spacing="lg"
      {...[
        { maxWidth: "md", cols: 3, spacing: "md" },
        { maxWidth: "sm", cols: 2, spacing: "sm" },
        { maxWidth: "xs", cols: 1, spacing: "sm" },
      ]}
    >
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork._id} artwork={artwork} />
      ))}
    </SimpleGrid>
  );
}
