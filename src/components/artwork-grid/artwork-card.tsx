import { Badge, Button, Card, Image, Stack, Text } from "@mantine/core";
import Link from "next/link";

interface ArtworkCardProps {
  artwork: {
    id: string;
    title: string;
    description: string;
    medium: string;
    images: string[];
    price: number;
  };
}

export function ArtworkCard({ artwork }: Readonly<ArtworkCardProps>) {
  return (
    <Card shadow="sm" padding="lg">
      <Card.Section>
        <Image src={artwork.images[0]} height={160} alt={artwork.title} />
      </Card.Section>

      <Stack mt="md" mb="xs">
        <Text fw={500}>{artwork.title}</Text>
        <Badge color="pink" size="sm" variant="light">
          {artwork.medium}
        </Badge>
      </Stack>

      <Text size="sm" c="dimmed" w={200} truncate="end">
        {artwork.description}
      </Text>

      <Text fw={500} size="lg" mt="md">
        ${artwork.price}
      </Text>

      <Button
        component={Link}
        href={`/artworks/${artwork.id}`}
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        View Details
      </Button>
    </Card>
  );
}
