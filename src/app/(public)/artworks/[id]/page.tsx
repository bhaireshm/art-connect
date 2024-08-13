"use client";

import { ArtistInfo, RelatedArtworks, useCart } from "@/components";
import { useAuth } from "@/context/AuthProvider";
import { API } from "@/core";
import type { Artwork } from "@/types";
import { API_BASE_URL } from "@/utils/constants";
import { objectToQueryParams } from "@bhairesh/ez.js";
import { Badge, Button, Container, Divider, Grid, Group, Image, Loader, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconHeart, IconShoppingCart } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArtworkDetails() {
  const { id } = useParams();
  const { user, updateUserInfo, isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [artwork, setArtwork] = useState<Artwork>();
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork["relatedArtworks"]>(
    artwork?.relatedArtworks ?? []
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchArtworks = async (aid = "") => {
    const data = await API(`${API_BASE_URL}/artworks/${aid}`);
    return data;
  };

  const filterArtworks = async (page: number, limit: number, filter = {}) => {
    const searchFilter = { page, limit, ...filter };
    const data = await API(`${API_BASE_URL}/artworks/filter?${objectToQueryParams(searchFilter)}`);
    return data;
  };

  const checkIsAuthenticated = () => {
    try {
      if (!isAuthenticated) throw new Error("Please login to add items to your cart");
      if (!user) throw new Error("User information not found");
      if (!artwork) throw new Error("Artwork information not found");
      return true;
    } catch (error: any) {
      notifications.show({
        color: "red",
        autoClose: 5000,
        message: error.message,
      });
      return false;
    }
  };

  const handleAddToWishlist = async () => {
    checkIsAuthenticated();
    if (!artwork) return;
    if (!user) return;

    try {
      const updatedWishlist = [...[...(user.wishlist ?? [])], artwork.id];

      await API(`/api/users/${user?.id}`, {
        method: "PUT",
        data: { wishlist: updatedWishlist },
      });

      updateUserInfo({ wishlist: updatedWishlist });
    } catch (error) {
      console.log("handleAddToWishlist", error);
    }
  };

  const handleAddToCart = () => {
    checkIsAuthenticated();
    if (artwork) addToCart(artwork);
  };

  useEffect(() => {
    const loadArtworkDetails = async () => {
      setIsLoading(true);
      try {
        const result = await fetchArtworks(Array.isArray(id) ? id[0] : id);
        if (result.data.length) {
          setArtwork(result.data[0]);

          // Fetch only 3 related artworks
          const relatedArtworksResult = await filterArtworks(1, 3, {
            medium: result.data[0].medium,
          });
          setRelatedArtworks(relatedArtworksResult?.data?.results);
        }
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
      <Container py="md">
        <Text ta="center" c="red" size="xl" fw="600">
          Artwork not found
        </Text>
      </Container>
    );

  return (
    <Container my="md">
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
          <Badge color="green">₹{artwork.price}</Badge>
          <Text mt="md">{artwork.description}</Text>
          <Text mt="sm">
            Dimensions: {artwork.dimensions.height} x {artwork.dimensions.width} x
            {artwork.dimensions.depth}
          </Text>
          <Group gap="xs" my="md">
            <Badge color="blue">{artwork.medium}</Badge>
          </Group>

          {/* Show buttons If its not logged in user's artwork */}
          {user?.id !== artwork.artist.id && (
            <Group mt="md" justify="flex-start">
              <Button
                variant="light"
                leftSection={
                  <IconHeart
                    size={16}
                    fill={user?.wishlist?.includes(artwork.id) ? "none" : "red"}
                  />
                }
                onClick={handleAddToWishlist}
              >
                Wishlist
                {/* {user?.wishlist?.includes(artwork.id) ? "Wishlist" : "Remove from Wishlist"} */}
              </Button>
              <Button
                variant="light"
                leftSection={<IconShoppingCart size={16} />}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Group>
          )}

          {/* Artist Info */}
          <Divider my="md" />
          <ArtistInfo artist={artwork.artist} />
        </Grid.Col>
      </Grid>
      {relatedArtworks?.length > 0 && typeof relatedArtworks === "object" && (
        <RelatedArtworks artworks={relatedArtworks} />
      )}
    </Container>
  );
}
