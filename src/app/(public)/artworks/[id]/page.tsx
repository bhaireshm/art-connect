"use client";

import { ArtistInfo } from "@/components/artist-info/artist-info";
import { RelatedArtworks } from "@/components/artwork-details/related-artworks";
import { Badge, Container, Grid, Group, Image, Text } from "@mantine/core";

const mockArtwork = {
  id: "1",
  title: "Sunset over the Ocean",
  description:
    "A beautiful painting of a sunset over the ocean, capturing the warm hues of the sky and the reflections on the water.",
  dimensions: { height: 24, width: 36, depth: 1.5 },
  medium: "Oil on canvas",
  images: ["https://dummyimage.com/150x150/000/fff"],
  price: 1200,
  artist: "101",
  relatedArtworks: [
    {
      id: "2",
      title: "Mountain Landscape",
      description: "A serene mountain landscape with a lake in the foreground.",
      dimensions: { height: 18, width: 24, depth: 1 },
      medium: "Acrylic on canvas",
      images: ["https://dummyimage.com/150x150/000/fff"],
      price: 950,
      artist: "102",
    },
    {
      id: "3",
      title: "Abstract Composition",
      description: "A vibrant abstract composition with bold colors and shapes.",
      dimensions: { height: 30, width: 40, depth: 1.5 },
      medium: "Mixed media on canvas",
      images: ["https://dummyimage.com/150x150/000/fff"],
      price: 1500,
      artist: "103",
    },
  ],
};

const mockArtist = {
  id: "101",
  name: "Jane Doe",
  bio: "Jane Doe is a contemporary artist known for her vibrant landscapes and seascapes.",
  background: "https://dummyimage.com/150x150/000/fff",
};

export default function ArtworkDetails() {
  return (
    <Container mt="md">
      <Grid>
        <Grid.Col span={8}>
          <Image src={mockArtwork.images[0]} alt={mockArtwork.title} radius="5" />
        </Grid.Col>
        <Grid.Col span={4}>
          <Text size="xl" fw={700}>
            {mockArtwork.title}
          </Text>
          <Group gap="xs">
            <Badge color="blue">{mockArtwork.medium}</Badge>
            <Badge color="green">${mockArtwork.price}</Badge>
          </Group>
          <Text mt="md">{mockArtwork.description}</Text>
          <Text mt="sm">
            Dimensions: {mockArtwork.dimensions.height} x {mockArtwork.dimensions.width} x
            {mockArtwork.dimensions.depth}
          </Text>
          <ArtistInfo artist={mockArtist} />
        </Grid.Col>
      </Grid>
      <RelatedArtworks artworks={mockArtwork.relatedArtworks} />
    </Container>
  );
}
