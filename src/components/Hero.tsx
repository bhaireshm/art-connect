import { Button, Container, Group, Text, Title } from "@mantine/core";
import Link from "next/link";

function Hero() {
  return (
    <Container>
      <div style={{ textAlign: "center", padding: "60px 0" }}>
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
          <Button component={Link} href="/search" size="md" variant="filled">
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
