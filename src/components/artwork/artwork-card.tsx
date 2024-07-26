import type { Artwork } from "@/types";
import { isEmpty } from "@bhairesh/ez.js";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  CopyButton,
  Group,
  Image,
  rem,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconCheck, IconHeart, IconShare } from "@tabler/icons-react";
import Link from "next/link";

interface ArtworkCardProps {
  artwork: Artwork;
}

export function ArtworkCard({ artwork }: Readonly<ArtworkCardProps>) {
  const theme = useMantineTheme();
  if (isEmpty(artwork)) return null;

  return (
    <Card shadow="sm" padding="lg">
      <Card.Section>
        <Image
          height={160}
          alt={artwork.title}
          src={artwork.images[0]}
          fallbackSrc="https://dummyimage.com/10/000/fff"
        />
      </Card.Section>

      <Stack mt="md" mb="xs">
        <Text fw={500}>{artwork.title}</Text>
        <Badge color="pink" size="sm" variant="light">
          {artwork.medium}
        </Badge>
      </Stack>

      <Text size="sm" c="dimmed" w={200} truncate="end">
        {artwork.description}
      </Text>

      <Button
        component={Link}
        href={`/artworks/${artwork.id}`}
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        View Details
      </Button>

      <Card.Section p="sm">
        <Group justify="space-between" mx="md">
          <Text fw={500} size="lg">
            ₹{artwork.price}
          </Text>
          <Group gap={0}>
            <ActionIcon variant="subtle" color="gray">
              <IconHeart
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </ActionIcon>

            <CopyButton value={`${window.location.origin}/artworks/${artwork.id}`} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? "Copied" : "Share"} withArrow position="right">
                  <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                    {copied ? (
                      <IconCheck style={{ width: rem(16) }} />
                    ) : (
                      <IconShare
                        style={{ width: rem(20), height: rem(20) }}
                        color={theme.colors.blue[6]}
                        stroke={1.5}
                      />
                    )}
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
