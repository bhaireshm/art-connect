"use client";

import { useState } from "react";
import { Carousel } from "@mantine/carousel";
import { rem } from "@mantine/core";
import Card from "./Cards";

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

export function CardsCarousel({ cardsItems }: any): JSX.Element {
  const [renderData, setRenderData] = useState(cardsItems?.card_details);
  const toggleFavorite = (cardId: number): void => {
    setRenderData((prevData: CartProps[]) =>
      prevData.map((card) => (card.id === cardId ? { ...card, isFav: !card.isFav } : card))
    );
  };

  const slides = renderData?.map((item: CartProps) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} toggleFavorite={toggleFavorite} title={cardsItems.title} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: "100%", sm: "20%" }}
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
