import { Button, Container, Group, Text } from "@mantine/core";
import Link from "next/link";

function Hero() {
  // const theme = useMantineTheme();
  return (
    <Container>
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        {/* <TextInput
          my="md"
          size="lg"
          radius="xl"
          placeholder="Search questions"
          rightSectionWidth={42}
          leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
          rightSection={
            <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
              <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          }
        /> */}
        <Text
          fz="50"
          my={20}
          fw={900}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Discover Unique Artworks
        </Text>
        <Text size="xl" mt="lg" mb="xl">
          Explore a curated collection of original artworks, drawings, and more.
        </Text>
        <Group justify="center">
          <Button component={Link} href="/artworks" size="md" variant="filled">
            Explore Artworks
          </Button>
          <Button component={Link} href="/artists" size="md" variant="outline">
            Meet Our Artists
          </Button>
        </Group>
      </div>
    </Container>
  );
}

export default Hero;
