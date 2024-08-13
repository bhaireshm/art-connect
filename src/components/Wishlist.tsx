"use client";

import { useAuth } from "@/context";
import { API } from "@/core";
import type { Artwork } from "@/types";
import { ROUTES } from "@/utils/constants";
import {
  ActionIcon,
  Card,
  Container,
  Divider,
  Group,
  Image,
  SimpleGrid,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconHeartX, IconShoppingCartPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "./cart";

export default function Wishlist() {
  const { user, updateUserInfo } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();

  const removeFromWishlist = async (artworkId: string) => {
    if (user?.id)
      try {
        const response = await API.delete(`/api/wishlist/${user.id}`, {
          params: { artworkId },
        });

        if (response?.data?.wishlist?.length) updateUserInfo({ wishlist: response.data.wishlist });
      } catch (error) {
        console.error("Error removing artwork from wishlist:", error);
      }
  };

  const handleAddToCart = (artwork: Artwork) => {
    addToCart(artwork);
    removeFromWishlist(artwork.id);
  };

  const fetchWishlishedArtworks = async (uid: string) => {
    const result = await API(`api/wishlist/${uid}`);
    return result.data;
  };

  useEffect(() => {
    if (!user?.id) return;
    fetchWishlishedArtworks(user.id)
      .then((userdata) => {
        updateUserInfo({ wishlist: userdata.wishlist });
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user)
      fetchWishlishedArtworks(user.id)
        .then((userdata) => {
          updateUserInfo({ wishlist: userdata.wishlist });
        })
        .catch((error) => {
          console.error("Error fetching wishlist:", error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user?.wishlist?.length === 0)
    return (
      <Group justify="center" py="xl">
        <Title>Your wishlist is empty.</Title>
      </Group>
    );

  return (
    <Container my="lg">
      <SimpleGrid cols={3} spacing="md">
        {user?.wishlist?.map((artwork: Artwork | string) =>
          typeof artwork === "string" ? null : (
            <Card key={artwork?.id} shadow="sm" padding="lg">
              <Card.Section>
                <Image src={artwork?.images[0]} height={160} alt={artwork.title} />
              </Card.Section>
              <Text
                fw={500}
                mt="md"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  router.push(`${ROUTES.ARTWORKS.path}/${artwork.id}`);
                }}
              >
                {artwork.title}
              </Text>
              <Text size="sm" c="dimmed">
                ${artwork.price.toFixed(2)}
              </Text>

              <Divider my="xs" />

              <Group justify="space-between">
                <Tooltip label="Add to cart" withArrow position="right">
                  <ActionIcon variant="light" onClick={() => handleAddToCart(artwork)}>
                    <IconShoppingCartPlus size="18" />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Remove from wishlist" withArrow position="left">
                  <ActionIcon
                    onClick={() => removeFromWishlist(artwork.id)}
                    variant="light"
                    color="red"
                  >
                    <IconHeartX size="18" />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Card>
          )
        )}
      </SimpleGrid>
    </Container>
  );
}
