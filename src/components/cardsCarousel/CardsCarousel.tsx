"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Carousel } from "@mantine/carousel";
import { Paper, Text, Button, useMantineTheme, rem, Box, ActionIcon, Divider } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useHover } from "@mantine/hooks";
import { CONSTANTS, ROUTES } from "@/utils/constants";
import classes from "./cardsCarousel.module.css";

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

const data = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Best forests to visit in North America",
    isFav: false,
    category: "nature",
    price: 100,
    units: "$",
    artist: "Samantha",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Hawaii beaches review: better than you think",
    isFav: false,
    category: "beach",
    price: 100,
    units: "$",
    artist: "John",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Mountains at night: 12 best locations to enjoy the view",
    isFav: false,
    category: "nature",
    price: 100,
    units: "$",
    artist: "Sarah",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Aurora in Norway: when to visit for best experience",
    isFav: false,
    category: "nature",
    price: 100,
    units: "$",
    artist: "Jane",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Best places to visit this winter",
    isFav: false,
    category: "tourism",
    price: 100,
    units: "$",
    artist: "Max",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Active volcanos reviews: travel at your own risk",
    isFav: false,
    category: "nature",
    price: 10,
    units: "$",
    artist: "Lisa",
  },
];

export function CardsCarousel(): JSX.Element {
  const router = useRouter();
  const theme = useMantineTheme();
  const [renderData, setRenderData] = useState(data);
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
          shadow="md"
          p="xl"
          radius="md"
          style={{ backgroundImage: `url(${image})` }}
          className={classes.cart}
          ref={ref}
          h={300}>
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
                router.push(ROUTES.CART);
              }}>
              {`${units}${price}`}
            </Button>
            <Button
              variant={theme.colors?.blue[0]}
              color="dark"
              radius={50}
              onClick={() => {
                router.push(ROUTES.CART);
              }}>
              {CONSTANTS.ADD_TO_CART}
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
      slidesToScroll={1}>
      {slides}
    </Carousel>
  );
}
