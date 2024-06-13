"use client";

import { Box, Button, Group, Text, rem, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/constants";
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
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <Box py={30} px={20} m={30}>
      <Group justify="space-between" align="center">
        <Text
          ff={theme.fontFamily}
          fs={theme.fontSizes.xl}
          c={theme.colors.blue[9]}
          fw={800}
          py={10}>
          {categoryList?.title}
        </Text>
        <Button
          m={rem(10)}
          radius={50}
          variant="outline"
          onClick={() => {
            router.push(ROUTES.CATEGOIES.path);
          }}>
          See More
        </Button>
      </Group>
      <CardsCarousel cardsItems={categoryList?.card_details} />
    </Box>
  );
}
