"use client";

import { useEffect, useState } from "react";
import type { Artist } from "@/types";
import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Loader,
  Text,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function ArtistsListingPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchArtists = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/artists");
        if (!response.ok) throw new Error("Failed to fetch artists");
        const data = await response.json();
        setArtists(data.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtists();
  }, []);

  return (
    <Container mb="md">
      <Group justify="space-around" mb="xl">
        <Text
          fz="40"
          my={20}
          fw={900}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Artists
        </Text>
        <TextInput
          placeholder="Search artists"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          leftSection={<IconSearch size={14} />}
        />
      </Group>
      {isLoading ? (
        <Loader size="xl" style={{ display: "block", margin: "40px auto" }} />
      ) : (
        <Grid>
          {artists
            ?.filter((artist) => artist?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
            ?.map((artist) => (
              <Grid.Col key={artist.id} span={{ xs: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image
                      // src={artist.background}
                      height={160}
                      alt={artist.name}
                      fallbackSrc="https://picsum.photos/200/300"
                    />
                  </Card.Section>
                  <Group justify="space-around" mt="md" mb="xs">
                    <Text fw={500}>{artist.name}</Text>
                  </Group>
                  <Text size="sm" c="dimmed" lineClamp={2}>
                    {artist.bio}
                  </Text>
                  <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                    View Profile
                  </Button>
                </Card>
              </Grid.Col>
            ))}
        </Grid>
      )}
    </Container>
  );
}
