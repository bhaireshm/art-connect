import type { Artwork } from "@/types";
import { Group, SimpleGrid, Text } from "@mantine/core";
import { ArtworkCard } from "./artwork-card";

interface RelatedArtworksProps {
  artworks: Artwork[];
}

export function RelatedArtworks({ artworks }: Readonly<RelatedArtworksProps>) {
  if (artworks?.length === 0)
    return (
      <Group justify="center" py="xl">
        <Text fz="lg" c="dimmed" ta="center">
          No related artworks found
        </Text>
      </Group>
    );

  return (
    <>
      <Text size="xl" fw={700} mt="xl" mb="md">
        Related Artworks
      </Text>
      <SimpleGrid cols={3} spacing="lg">
        {artworks?.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </SimpleGrid>
    </>
  );
}
