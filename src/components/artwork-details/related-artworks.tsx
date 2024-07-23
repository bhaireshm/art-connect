import { SimpleGrid, Text } from "@mantine/core";
import { ArtworkCard } from "../artwork-grid/artwork-card";

interface RelatedArtworksProps {
  artworks: any[];
}

export function RelatedArtworks({ artworks }: Readonly<RelatedArtworksProps>) {
  return (
    <>
      <Text size="xl" fw={700} mt="xl" mb="md">
        Related Artworks
      </Text>
      <SimpleGrid cols={3} spacing="lg">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </SimpleGrid>
    </>
  );
}
