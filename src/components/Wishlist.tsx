"use client";

import { API } from "@/core";
import { useAppSelector } from "@/redux";
import { useUser } from "@/redux/slices/user.slice";
import type { Artwork } from "@/types";
import { API_BASE_URL } from "@/utils/constants";
import { Button, Card, Container, Image, SimpleGrid, Text } from "@mantine/core";
import { useEffect } from "react";
import { useCart } from "./cart";

export default function Wishlist() {
  const { selectUser, updateUserInfo } = useUser();
  const user = useAppSelector(selectUser);
  const { addToCart } = useCart();

  const removeFromWishlist = (artworkId: string) => {
    if (user?.wishlist) {
      const updatedWishlist = user.wishlist.filter((id) => id !== artworkId);
      updateUserInfo({ wishlist: updatedWishlist });
    }
  };

  const handleAddToCart = (artwork: Artwork) => {
    addToCart(artwork);
    removeFromWishlist(artwork.id);
  };

  const fetchWishlishedArtworks = async (uid: string) => {
    const data = await API(`${API_BASE_URL}/wishlist/${uid}`);
    console.log("file: Wishlist.tsx:32  fetchWishlishedArtworks  data", data);
    return data.data;
  };

  useEffect(() => {
    if (user)
      fetchWishlishedArtworks(user.id)
        .then((users) => {
          console.log("file: Wishlist.tsx:38  .then  users", users);
          updateUserInfo({ wishlist: users.wishlist });
        })
        .catch((error) => {
          console.error("Error fetching wishlist:", error);
        });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container my="lg">
      <SimpleGrid cols={3} spacing="md">
        {user?.wishlist?.map((artwork) =>
          typeof artwork === "string" ? null : (
            <Card key={artwork.id} shadow="sm" padding="lg">
              <Card.Section>
                <Image src={artwork?.images[0]} height={160} alt={artwork.title} />
              </Card.Section>
              <Text fw={500} mt="md">
                {artwork.title}
              </Text>
              <Text size="sm" c="dimmed">
                ${artwork.price.toFixed(2)}
              </Text>
              <Button onClick={() => handleAddToCart(artwork)} fullWidth mt="md">
                Add to Cart
              </Button>
              <Button
                onClick={() => removeFromWishlist(artwork.id)}
                variant="light"
                color="red"
                fullWidth
                mt="xs"
              >
                Remove from Wishlist
              </Button>
            </Card>
          )
        )}
      </SimpleGrid>
    </Container>
  );
}
