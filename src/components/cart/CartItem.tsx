import type { CartItemProps } from "@/types";
import { ActionIcon, Box, Card, CloseButton, Flex, Group, Image, Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

export default function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  return (
    <Card withBorder padding="sm" radius="md">
      <Card.Section>
        <Flex align="flex-start">
          <Image
            src={item.artwork.images[0] || "https://placeholder.com/150"}
            height={150}
            width={150}
            alt={item.artwork.title}
          />
          <Box m="md" style={{ flex: 1 }}>
            <Flex justify="space-between" align="flex-start">
              <Box>
                <Text fw={500}>{item.artwork.title}</Text>
                <Text size="sm" c="dimmed">
                  {item.artwork.description}
                </Text>
                <Text size="xs" c="dimmed">
                  Sold by: {item.artwork.artist.name}
                </Text>
              </Box>
              <CloseButton onClick={onRemove} aria-label="Remove item" />
            </Flex>

            <Flex mt="md" justify="space-between" align="center">
              <Group gap="xs">
                <Group>
                  <ActionIcon size="xs" onClick={() => onUpdateQuantity(item.quantity - 1)}>
                    <IconMinus size={16} />
                  </ActionIcon>
                  <Text>{item.quantity}</Text>
                  <ActionIcon size="xs" onClick={() => onUpdateQuantity(item.quantity + 1)}>
                    <IconPlus size={16} />
                  </ActionIcon>
                </Group>
              </Group>
              <Box>
                <Text fw={700}>₹{item.artwork.price.toFixed(2)}</Text>
                {/* {item.artwork.price && (
                  <Flex align="center">
                    <Text size="sm" style={{ textDecoration: "line-through" }} c="dimmed" mr={5}>
                      ₹{item.artwork.price.toFixed(2)}
                    </Text>
                    <Badge color="pink">
                      {(
                        ((item.artwork.originalPrice - item.artwork.price) /
                          item.artwork.originalPrice) *
                        100
                      ).toFixed(0)}
                      % OFF
                    </Badge>
                  </Flex>
                )} */}
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Card.Section>
    </Card>
  );
}
