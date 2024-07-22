"use client";

import { Box, Group, Text, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { CardsCarousel } from "../cards-carousel/CardsCarousel";
import classes from "./CategoriesSection.module.css";

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
    <Box py={30} px={20} m={30}>
      <Group justify="space-between" align="center">
        <Text
          ff={theme.fontFamily}
          fs={theme.fontSizes.xl}
          c={theme.colors.blue[9]}
          fw={800}
          py={10}
        >
          {categoryList?.title.toUpperCase()}
        </Text>
        <Link href={`/categories/${categoryList?.title}`} className={classes.link}>
          See More
        </Link>
      </Group>
      <CardsCarousel cardsItems={categoryList} />
    </Box>
  );
}
