import React from "react";
import { Container, Loader, SimpleGrid, Skeleton } from "@mantine/core";
import { ArtworkCard } from "./artwork-card";

interface ArtworkGridProps {
  artworks: any[];
}

export function ArtworkGrid({ artworks }: Readonly<ArtworkGridProps>) {
  return (
    <Container>
      <SimpleGrid cols={4} spacing="lg" verticalSpacing={{ base: "md", sm: "xl" }}>
        {artworks?.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
