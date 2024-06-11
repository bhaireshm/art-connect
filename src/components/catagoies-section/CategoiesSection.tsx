"use client";

import { Box, Text, useMantineTheme } from "@mantine/core";
import { CardsCarousel } from "../cards-carousel/CardsCarousel";

interface Cardimage {
  id: number;
  image: string;
  title: string;
  category: string;
  isFav: boolean;
  artist: string;
  units: string;
  price: number;
}
interface CategoiesSectionProps {
  title: string;
  id: number;
  card_details: Array<Cardimage>;
}
export function CategoiesSection({
  categoryList,
}: Readonly<{ categoryList: CategoiesSectionProps }>) {
  const theme = useMantineTheme();
  return (
    <Box py={30} px={20}>
      <Text ff={theme.fontFamily} fs={theme.fontSizes.xl} c={theme.colors.blue[9]} fw={800} py={10}>
        {categoryList?.title}
      </Text>
      <CardsCarousel cardsItems={categoryList?.card_details} />
    </Box>
  );
}
