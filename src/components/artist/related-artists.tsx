import type { Artist } from "@/types";
import { Container, SimpleGrid, Text } from "@mantine/core";
import { ArtistCard } from "./artist-card";

interface RelatedArtworksProps {
  artists: Artist[];
}

export function RelatedArtists({ artists }: Readonly<RelatedArtworksProps>) {
  return (
    <Container>
      <Text size="xl" fw={700} mt="xl" mb="md">
        Related Artist
      </Text>
      <SimpleGrid cols={3} spacing="lg">
        {artists?.map((artist: Artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
