import { Avatar, Group, Stack, Text } from "@mantine/core";

interface ArtistInfoProps {
  artist: {
    name: string;
    bio: string;
    background: string;
  };
}

export function ArtistInfo({ artist }: Readonly<ArtistInfoProps>) {
  return (
    <Group mt="xl" align="flex-start">
      <Avatar size="xl" src={artist.background} alt={artist.name} />
      <Stack gap="xs">
        <Text size="lg" fw={700}>
          {artist.name}
        </Text>
        <Text size="sm">{artist.bio}</Text>
      </Stack>
    </Group>
  );
}
