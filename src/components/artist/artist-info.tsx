import React from "react";
import { Avatar, Group, Stack, Text, Button } from "@mantine/core";
import { IconHeart, IconShoppingCart } from "@tabler/icons-react";
import type { Artist, Artwork } from "@/types";

interface ArtistInfoProps {
  artist: Artist;
  artwork?: Artwork;
}

export function ArtistInfo({ artist, artwork }: Readonly<ArtistInfoProps>) {
  const handleAddToWishlist = () => {
    // Implement wishlist functionality
    console.log("Add to wishlist:", artwork?.id);
  };

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log("Add to cart:", artwork?.id);
  };

  return (
    <Stack mt="xl">
      <Group align="flex-start">
        <Avatar size="xl" src={artist.background} alt={artist.name} />
        <Stack gap="xs">
          <Text size="lg" fw={700}>
            {artist.name}
          </Text>
          <Text size="sm">{artist.bio}</Text>
        </Stack>
      </Group>
      <Group mt="md" justify="space-evenly">
        <Button leftSection={<IconHeart size={16} />} onClick={handleAddToWishlist}>
          Wishlist
        </Button>
        <Button leftSection={<IconShoppingCart size={16} />} onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Group>
    </Stack>
  );
}
