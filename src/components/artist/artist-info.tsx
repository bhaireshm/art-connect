"use client";

import { useAppSelector, useUser } from "@/redux";
import type { Artist, Artwork } from "@/types";
import { Avatar, Button, Group, Stack, Text } from "@mantine/core";
import { IconHeart, IconShoppingCart } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface ArtistInfoProps {
  artist: Artist;
  artwork?: Artwork;
}

export function ArtistInfo({ artist, artwork }: Readonly<ArtistInfoProps>) {
  const { selectUser, updateUserInfo } = useUser();
  const user = useAppSelector(selectUser);
  const router = useRouter();

  const handleAddToWishlist = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    console.log("file: artist-info.tsx:25  handleAddToWishlist  artwork", artwork);
    if (artwork) {
      const updatedWishlist = [...(user?.wishlist || []), artwork.id];
      updateUserInfo({ wishlist: updatedWishlist });
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (artwork) router.push("/cart");
    // Note: Actual cart functionality will be implemented in a separate CartProvider
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
