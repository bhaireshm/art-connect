import type { Artist } from "@/types";
import { Container, SimpleGrid, Text } from "@mantine/core";
import { ArtistCard } from "./artist-card";

interface RelatedArtworksProps {
  artists: Artist[];
}

export function RelatedArtists({ artists }: Readonly<RelatedArtworksProps>) {
  return (
    <Container>
      <Text
        fz="40"
        my={20}
        fw={900}
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
      >
        Featured Artists
      </Text>
      <SimpleGrid
        spacing="md"
        cols={{ base: 1, xs: 2, sm: 3, md: 3, lg: 3 }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {artists?.map((artist: Artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
