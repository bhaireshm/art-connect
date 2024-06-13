"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Carousel } from "@mantine/carousel";
import { Paper, Text, Button, useMantineTheme, rem, Box, ActionIcon, Divider } from "@mantine/core";
import { IconGardenCart, IconHeart } from "@tabler/icons-react";
import { useHover } from "@mantine/hooks";
import { ROUTES } from "@/utils/constants";
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
}

export function CardsCarousel({ cardsItems }: Readonly<{ cardsItems: CartProps[] }>): JSX.Element {
  const router = useRouter();
  const theme = useMantineTheme();
  const [renderData, setRenderData] = useState(cardsItems);
  const toggleFavorite = (cardId: number): void => {
    setRenderData((prevData) =>
      prevData.map((card) => (card.id === cardId ? { ...card, isFav: !card.isFav } : card)),
    );
  };
  function Card({
    id,
    image,
    artist,
    category,
    isFav,
    units,
    price,
  }: Readonly<CartProps>): JSX.Element {
    const { hovered, ref } = useHover();
    return (
      <Box>
        <Paper
          ref={ref}
          shadow="md"
          p="xl"
          radius="md"
          className={classes.card}
          style={{
            backgroundImage: `url(${image})`,
          }}>
          {hovered && (
            <Box
              component="div"
              w="100%"
              style={{ display: "flex", justifyContent: "space-between" }}>
              <Text className={classes.category} size="xs">
                {category}
              </Text>
              <ActionIcon
                variant={isFav ? "filled" : "default"}
                color={isFav ? "red" : theme.colors?.blue[0]}
                size={40}
                aria-label="ActionIcon with size as a number"
                radius={50}>
                <IconHeart
                  style={{ width: rem(25), height: rem(25) }}
                  onClick={() => toggleFavorite(id)}
                />
              </ActionIcon>
            </Box>
          )}
        </Paper>
        <Divider my="lg" size="sm" />
        <Box
          w="100%"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: rem(10),
          }}>
          <Box>
            <Text size="lg">{category}</Text>
            <Text size="sm">{artist}</Text>
          </Box>
          <Box
            style={{
              display: "flex",
              gap: rem(10),
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}>
            <Button
              radius={50}
              variant="outline"
              onClick={() => {
                router.push(ROUTES.CART.path);
              }}>
              {`${units}${price}`}
            </Button>
            <Button
              variant={theme.colors?.blue[0]}
              color="dark"
              radius={50}
              onClick={() => {
                router.push(ROUTES.CART.path);
              }}>
              <IconGardenCart stroke={2} color={theme.colors.blue[0]} />
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
  const slides = renderData?.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: "20%", sm: "20%" }}
      slideGap={{ base: rem(2), sm: "xl" }}
      align="start"
      slidesToScroll={1}
      // controlsOffset={rem(-300)} // not working Need to check
      // loop  // not working Need to check
    >
      {slides}
    </Carousel>
  );
}
