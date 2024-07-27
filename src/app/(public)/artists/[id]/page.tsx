"use client";

import { ArtworkCard } from "@/components/artwork";
import type { Artist, Artwork } from "@/types";
import { Button, Container, Grid, Group, Image, Loader, Paper, Text, Title } from "@mantine/core";
import { IconPalette, IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArtistDetailsPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState<Artist>();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      setIsLoading(true);
      try {
        const artistResponse = await fetch(`/api/artists/${id}`);
        const artworksResponse = await fetch(`/api/artworks?artist=${id}`);

        if (!artistResponse.ok || !artworksResponse.ok)
          throw new Error("Failed to fetch artist details or artworks");

        const artistData = await artistResponse.json();
        const artworksData = await artworksResponse.json();

        setArtist(artistData.data);
        setArtworks(artworksData.data);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchArtistDetails();
  }, [id]);

  if (isLoading) return <Loader size="xl" style={{ display: "block", margin: "40px auto" }} />;

  if (!artist) return <Text>Artist not found</Text>;

  return (
    <Container size="xl" py="xl">
      <Paper shadow="xs" p="xl" mb="xl">
        <Grid>
          <Grid.Col span={{ xs: 12, md: 4 }}>
            <Image
              src={artist.background}
              fallbackSrc="https://xsgames.co/randomusers/avatar.php?g=pixel"
              alt={artist.name}
              radius="md"
              height={300}
              fit="cover"
            />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, md: 8 }}>
            <Title order={1} mb="md">
              {artist.name}
            </Title>
            <Group gap="xs" mb="md">
              <IconPalette size={20} />
              <Text>Mixed Media</Text>
              {/* artist.primaryMedium ||  */}
            </Group>
            <Text mb="xl">{artist.bio}</Text>
            <Button
              component={Link}
              href={`/artworks?artist=${artist.id}`}
              leftSection={<IconShoppingCart size={20} />}
              color="blue"
            >
              View Available Artworks
            </Button>
          </Grid.Col>
        </Grid>
      </Paper>

      <Title order={2} mb="xl">
        Gallery
      </Title>
      <Grid>
        {artworks?.map((artwork) => (
          <Grid.Col key={artwork.id} span={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ArtworkCard artwork={artwork} />
          </Grid.Col>
        ))}
      </Grid>

      {artworks.length === 0 && (
        <Text ta="center" mt="xl">
          No artworks available for this artist.
        </Text>
      )}
    </Container>
  );
}
