import type { Artwork } from "@/types";
import { isEmpty } from "@bhairesh/ez.js";
import { Badge, Button, Card, Image, Stack, Text } from "@mantine/core";
import Link from "next/link";

interface ArtworkCardProps {
  artwork: Artwork;
}

export function ArtworkCard({ artwork }: Readonly<ArtworkCardProps>) {
  if (isEmpty(artwork)) return null;

  return (
    <Card shadow="sm" padding="lg">
      <Card.Section>
        <Image
          height={160}
          alt={artwork.title}
          src={artwork.images[0]}
          fallbackSrc="https://dummyimage.com/10/000/fff"
        />
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
        ₹{artwork.price}
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
