"use client";

import type { CartItemComponentProps } from "@/types";
import { ROUTES } from "@/utils/constants";
import { currencyFormatter } from "@bhaireshm/ez.js";
import { ActionIcon, Box, Card, CloseButton, Flex, Group, Image, Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
}: Readonly<CartItemComponentProps>) {
  const router = useRouter();
  return (
    <Card withBorder padding="sm" radius="md">
      <Card.Section>
        <Flex align="flex-start">
          <Image
            src={item.artwork?.images[0]}
            height={150}
            width={150}
            fallbackSrc="https://placeholder.com/150"
            alt={item.artwork.title}
          />
          <Box m="md" style={{ flex: 1 }}>
            <Flex justify="space-between" align="flex-start">
              <Box>
                <Text
                  fw={500}
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push(`${ROUTES.ARTWORKS.path}/${item.artwork.id}`)}
                >
                  {item.artwork.title}
                </Text>
                <Text size="sm" c="dimmed">
                  {item.artwork.description}
                </Text>
                {item.artwork?.artist?.name && (
                  <Text size="xs" c="dimmed">
                    Sold by: {item.artwork.artist.name}
                  </Text>
                )}
              </Box>
              <CloseButton onClick={onRemove} aria-label="Remove item" />
            </Flex>

            <Flex mt="md" justify="space-between" align="center">
              <Group gap="xs">
                <Group>
                  <ActionIcon size="xs" onClick={() => onUpdateQuantity(-1)}>
                    <IconMinus size={16} />
                  </ActionIcon>
                  <Text>{item.quantity}</Text>
                  <ActionIcon size="xs" onClick={() => onUpdateQuantity(1)}>
                    <IconPlus size={16} />
                  </ActionIcon>
                </Group>
              </Group>
              <Text fw={700}>{currencyFormatter(+item.artwork.price.toFixed(2))}</Text>
            </Flex>
          </Box>
        </Flex>
      </Card.Section>
    </Card>
  );
}
