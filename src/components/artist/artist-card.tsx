import type { Artist } from "@/types";
import { isEmpty } from "@bhaireshm/ez.js";
import { Avatar, Badge, Button, Group, Paper, Text } from "@mantine/core";
import { IconPalette } from "@tabler/icons-react";
import Link from "next/link";

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: Readonly<ArtistCardProps>) {
  if (isEmpty(artist)) return <Text>Artist not found</Text>;

  const artworksCount = (artist.availableArtworks?.length || 0) + (artist?.gallery?.length || 0);

  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      {artworksCount === 0 && (
        <Group justify="flex-end">
          <Badge size="xs" variant="gradient" radius={2}>
            New Artist
          </Badge>
        </Group>
      )}
      <Avatar
        // artist.background ??
        src="https://xsgames.co/randomusers/avatar.php?g=pixel"
        size={120}
        radius={120}
        mx="auto"
        alt={artist.name}
      />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {artist.name}
      </Text>
      {artist?.background && (
        <Text ta="center" c="dimmed" fz="sm" truncate="end">
          {artist.background} • Art director
        </Text>
      )}
      <Text size="sm" c="dimmed" lineClamp={2} truncate="end">
        {artist.bio}
      </Text>
      <Group gap="xs" mt="xs" align="center" justify="center">
        {artworksCount > 0 && (
          <>
            <IconPalette size={16} />
            <Text size="sm" c="dimmed">
              {artworksCount} Artworks
            </Text>
          </>
        )}
      </Group>
      <Badge color="blue" size="sm" variant="light" mt="md">
        Mixed Media
        {/* artist.medium */}
      </Badge>
      <Button
        component={Link}
        href={`/artists/${artist.id}`}
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        View Profile
      </Button>
    </Paper>
  );
}
