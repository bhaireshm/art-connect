import { Container, SimpleGrid, Paper, Text } from "@mantine/core";

export function Features() {
  return (
    <Container>
      <SimpleGrid cols={3}>
        <Paper shadow="xs" p="md">
          <Text>Feature 1</Text>
          <Text>Some description for feature 1.</Text>
        </Paper>
        <Paper shadow="xs" p="md">
          <Text>Feature 2</Text>
          <Text>Some description for feature 2.</Text>
        </Paper>
        <Paper shadow="xs" p="md">
          <Text>Feature 3</Text>
          <Text>Some description for feature 3.</Text>
        </Paper>
      </SimpleGrid>
    </Container>
  );
}
