"use client";

import { ArtistInfo } from "@/components/artist";
import { RelatedArtworks } from "@/components/artwork";
import { fetchArtworks, fetchUserById, filterArtworks } from "@/redux";
import type { Artist, Artwork } from "@/types";
import { Badge, Container, Grid, Group, Image, Loader, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArtworkDetails() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState<Artwork>();
  const [artist, setArtist] = useState<Artist>();
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork["relatedArtworks"]>(
    artwork?.relatedArtworks ?? []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArtworkDetails = async () => {
      setIsLoading(true);
      try {
        const result = await fetchArtworks(Array.isArray(id) ? id[0] : id);
        setArtwork(result.data);

        if (result?.data?.artist) {
          const artistResult = await fetchUserById(result.data.artist);
          setArtist(artistResult.data);
        }

        // Fetch 3 related artworks
        const relatedArtworksResult = await filterArtworks(1, 3, { medium: result.data.medium });
        setRelatedArtworks(relatedArtworksResult?.data?.results);
      } catch (error) {
        console.error("Failed to fetch artwork details:", error);
      }
      setIsLoading(false);
    };

    if (id) loadArtworkDetails();
  }, [id]);

  if (isLoading)
    return (
      <Container>
        <Loader size="xl" style={{ display: "block", margin: "40px auto" }} />
      </Container>
    );

  if (!artwork)
    return (
      <Container>
        <Text>Artwork not found</Text>
      </Container>
    );

  return (
    <Container mt="md">
      <Grid>
        <Grid.Col span={8}>
          <Image
            src={artwork.images[0]}
            alt={artwork.title}
            radius="5"
            fallbackSrc="https://dummyimage.com/100x100/000/fff"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Text size="xl" fw={700}>
            {artwork.title}
          </Text>
          <Group gap="xs">
            <Badge color="blue">{artwork.medium}</Badge>
            <Badge color="green">₹{artwork.price}</Badge>
          </Group>
          <Text mt="md">{artwork.description}</Text>
          <Text mt="sm">
            Dimensions: {artwork.dimensions.height} x {artwork.dimensions.width} x
            {artwork.dimensions.depth}
          </Text>
          {artist && <ArtistInfo artwork={artwork} artist={artist} />}
        </Grid.Col>
        {/* TODO: Button to wishlist */}
      </Grid>
      {relatedArtworks?.length > 0 && typeof relatedArtworks === "object" && (
        <RelatedArtworks artworks={relatedArtworks} />
      )}
    </Container>
  );
}
