"use client";

import { ArtworkCard } from "@/components";
import { API } from "@/core";
import type { Artist, Artwork } from "@/types";
import { isEmpty } from "@bhaireshm/ez.js";
import {
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Loader,
  Paper,
  Text,
  Title,
} from "@mantine/core";
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
        const artistResponse = await API.get(`/api/artists/${id}`);
        if (isEmpty(artistResponse.data)) throw new Error("Failed to fetch artist details");
        setArtist(artistResponse.data);

        const artworksResponse = await API.get(`/api/artworks/filter?page=1&limit=8&artist=${id}`);
        if (isEmpty(artworksResponse.data)) throw new Error("Failed to fetch artist's artworks");
        setArtworks(artworksResponse.data.results);
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
      <Paper p="xl" mb="xl">
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

      <Divider />

      <Title order={2} my="lg">
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
