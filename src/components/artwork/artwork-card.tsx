"use client";

import { useAuth } from "@/context";
import { API } from "@/core";
import type { Artwork } from "@/types";
import {
  ActionIcon,
  Badge,
  Card,
  CopyButton,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconCheck, IconHeart, IconShare, IconShoppingCartPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useCart } from "../cart";

interface ArtworkCardProps {
  artwork: Artwork;
}

export function ArtworkCard({ artwork }: Readonly<ArtworkCardProps>) {
  const theme = useMantineTheme();
  const router = useRouter();
  const { user, updateUserInfo } = useAuth();
  const { addToCart } = useCart();

  const handleAddToWishlist = async () => {
    if (user && artwork) {
      const updatedWishlist = [...(user?.wishlist || []), artwork.id];
      updateUserInfo({ wishlist: updatedWishlist });

      await API(`/api/users/${user.id}`, {
        method: "PUT",
        data: { wishlist: updatedWishlist },
      });
    }
  };

  return (
    <Card
      shadow="sm"
      radius="sm"
      padding="md"
      style={{ cursor: "pointer" }}
      onClick={() => {
        router.push(`/artworks/${artwork.id}`);
      }}
    >
      <Card.Section>
        <Image
          height={160}
          alt={artwork.title}
          src={artwork.images[0]}
          fallbackSrc="https://dummyimage.com/10/000/fff"
        />
      </Card.Section>

      <Stack my="sm" align="flex-start" justify="space-around" gap="xs">
        <Text fw={500}>{artwork.title}</Text>
        <Text size="sm" c="dimmed" ta="left" w={200} truncate="end" title={artwork.description}>
          {artwork.description}
        </Text>
        <Badge color="pink" size="xs" radius="xs" variant="light">
          {artwork.medium}
        </Badge>
      </Stack>

      <Divider />
      <Card.Section p="xs">
        <Group justify="space-between" mx="sm">
          <Text fw={500} size="md">
            ₹{artwork.price}
          </Text>
          <Group gap={0}>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(artwork);
              }}
            >
              <IconShoppingCartPlus size="18" color={theme.colors.blue[6]} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToWishlist();
              }}
            >
              <IconHeart
                size="18"
                // fill={user?.wishlist?.includes(artwork.id) ? theme.colors.red[6] : "none"}
                color={theme.colors.red[6]}
              />
            </ActionIcon>

            <CopyButton value={`${window.location.origin}/artworks/${artwork.id}`} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? "Copied" : "Share"} withArrow position="right">
                  <ActionIcon
                    color={copied ? "teal" : "gray"}
                    variant="subtle"
                    onClick={(e) => {
                      e.stopPropagation();
                      copy();
                    }}
                  >
                    {copied ? <IconCheck /> : <IconShare size="18" color={theme.colors.blue[6]} />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
