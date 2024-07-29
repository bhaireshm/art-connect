import { SimpleGrid } from "@mantine/core";
import { ArtworkCard } from "./artwork-card";

interface ArtworkGridProps {
  artworks: any[];
}

export function ArtworkGrid({ artworks }: Readonly<ArtworkGridProps>) {
  return (
    <SimpleGrid
      spacing="md"
      cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 4 }}
      verticalSpacing={{ base: "md", sm: "xl" }}
    >
      {artworks?.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </SimpleGrid>
  );
}
