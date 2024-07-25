import { Badge, Card, Container, Group, SimpleGrid, Text, Title } from "@mantine/core";
import { createStyles } from "@mantine/emotion";
import { IconCookie, IconGauge, IconUser } from "@tabler/icons-react";

const mockdata = [
  {
    title: "Extreme performance",
    description:
      "This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit",
    icon: IconGauge,
  },
  {
    title: "Privacy focused",
    description:
      "People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma",
    icon: IconUser,
  },
  {
    title: "No third parties",
    description:
      "They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves",
    icon: IconCookie,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fontSizes.sm]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: "\"\"",
      display: "block",
      backgroundColor: theme.black,
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `1px solid ${theme.colors.gray[1]}`,
  },

  cardTitle: {
    "&::after": {
      content: "\"\"",
      display: "block",
      backgroundColor: theme.primaryColor,
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}));

export function FeaturesCards() {
  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} p="xl">
      <feature.icon size={50} stroke={2} />
      <Text size="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));
  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          Best company ever
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Integrate effortlessly with any technology stack
      </Title>

      <Text color="dimmed" className={classes.description} ta="center" mt="md">
        Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
        hunger drives it to try biting a Steel-type Pokémon.
      </Text>

      <SimpleGrid cols={3} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
