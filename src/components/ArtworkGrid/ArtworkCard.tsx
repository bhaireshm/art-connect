import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import Link from "next/link";

interface ArtworkCardProps {
  artwork: {
    _id: string;
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

      <Group mt="md" mb="xs">
        <Text fw={500}>{artwork.title}</Text>
        <Badge color="pink" variant="light">
          {artwork.medium}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {artwork.description.substring(0, 100)}...
      </Text>

      <Text fw={500} size="lg" mt="md">
        ${artwork.price}
      </Text>

      <Button
        component={Link}
        href={`/artworks/${artwork._id}`}
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
