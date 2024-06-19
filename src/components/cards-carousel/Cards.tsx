import { ActionIcon, Box, Button, Divider, Paper, Text, rem, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconGardenCart, IconHeart } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/constants";
import Link from "next/link";
import classes from "./CardsCarousel.module.css";

interface CartProps {
  id: number;
  image: string;
  title: string;
  category: string;
  isFav: boolean;
  artist: string;
  units: string;
  price: number;
  toggleFavorite: (id: number) => void;
}
export default function Card({
  id,
  image,
  artist,
  category,
  isFav,
  units,
  price,
  title,
  toggleFavorite,
}: Readonly<CartProps>): JSX.Element {
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  const router = useRouter();
  return (
    <Box>
      <Link
        href={{
          pathname: `/item/${title}`,
          query: {
            category: `${category}`,
            id: `${id}`,
          },
        }}
      >
        <Paper
          ref={ref}
          shadow="md"
          p="xl"
          radius="md"
          className={classes.card}
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          {hovered && (
            <Box
              component="div"
              w="100%"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text className={classes.category} size="xs">
                {category}
              </Text>
              <ActionIcon
                variant={isFav ? "filled" : "default"}
                color={isFav ? "red" : theme.colors?.blue[0]}
                size={40}
                aria-label="ActionIcon with size as a number"
                radius={50}
              >
                <IconHeart
                  style={{ width: rem(25), height: rem(25) }}
                  onClick={() => toggleFavorite(id)}
                />
              </ActionIcon>
            </Box>
          )}
        </Paper>
      </Link>
      <Divider my="lg" size="sm" />
      <Box
        w="100%"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: rem(10),
        }}
      >
        <Box>
          <Text size="sm">{category}</Text>
          <Text size="sm">{artist}</Text>
        </Box>
        <Box
          style={{
            display: "flex",
            gap: rem(10),
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Button
            radius={50}
            variant="outline"
            onClick={() => {
              router.push(ROUTES.CART.path);
            }}
          >
            {`${units}${price}`}
          </Button>
          <Button
            variant={theme.colors?.blue[0]}
            color="dark"
            radius={50}
            onClick={() => {
              router.push(ROUTES.CART.path);
            }}
          >
            <IconGardenCart stroke={2} color={theme.colors.blue[0]} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
