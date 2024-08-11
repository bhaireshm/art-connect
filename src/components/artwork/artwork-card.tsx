"use client";

import { API } from "@/core";
import { useAppSelector, useUser } from "@/redux";
import type { Artwork } from "@/types";
import { ROUTES } from "@/utils/constants";
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
  const { selectUser, updateUserInfo } = useUser();
  const user = useAppSelector(selectUser);
  const { addToCart } = useCart();

  const handleAddToWishlist = async () => {
    // TODO: Check user before updating
    if (!user) {
      router.push(ROUTES.LOGIN.path);
      return;
    }
    if (user && artwork) {
      const updatedWishlist = [...(user?.wishlist || []), artwork.id];
      console.log(
        "file: artwork-card.tsx:41  handleAddToWishlist  updatedWishlist",
        updatedWishlist
      );
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
              <IconHeart size="18" color={theme.colors.red[6]} />
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
