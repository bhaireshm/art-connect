import { Card, Image, Text, Badge, Button, Group, ActionIcon } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
export function CustomCard(props: any) {
  const { title, image, price, isFavorite, rating, description } = props;
  return (
    <Card shadow="sm" radius="md" withBorder w={"20rem"}>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="sm" mb="xs">
        <Text fw={500} w={"50%"} truncate="end">
          {title}
        </Text>
        <ActionIcon size="l" variant="primary" aria-label="Danger variant">
          <IconHeart />
        </ActionIcon>
      </Group>
      <Group justify="space-between" mt="sm" mb="xs">
        <Text fw={500}>{price}</Text>
        <Badge color="pink">{rating}</Badge>
      </Group>

      <Text size="sm" c="dimmed" w={"50%"} truncate="end">
        {description}
      </Text>

      <Group justify="space-between" mt="md" mb="xs" wrap="wrap">
        <Button color="blue" mt="md" radius="md">
          Add to cart
        </Button>
        <Button color="blue" mt="md" radius="md">
          Buy now
        </Button>
      </Group>
    </Card>
  );
}
