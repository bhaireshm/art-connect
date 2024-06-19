"use client";

import React from "react";
import { Button, Container, Grid, Text, rem, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { artCategories } from "@/assets/json-data/art-catagories";
import { CategoiesSection } from "@/components/catagoies-section/CategoiesSection";
import { ROUTES } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { IconGardenCart } from "@tabler/icons-react";

const Items = ({
  params: { items },
  searchParams,
}: {
  params: { items: string };
  searchParams: { [key: string]: string };
}) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const router = useRouter();

  const span = mobile ? 12 : 6;

  // TODO: Need to call with API by Categories and Id
  const categoiesItem = artCategories
    ?.filter((cat) => cat?.title === items)[0]
    .card_details?.filter(
      (item) => item.category === searchParams.category && item.id === +searchParams.id
    )[0];
  return (
    <>
      <Container fluid py={10}>
        <Grid justify="center" px={mobile ? rem(50) : rem(200)} py={rem(50)}>
          <Grid.Col
            span={span}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Image
              src={categoiesItem.image}
              alt="art"
              width={500}
              height={500}
              style={{
                objectFit: "cover",
                borderRadius: rem(20),
              }}
            />
          </Grid.Col>
          <Grid.Col
            span={span}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              // backgroundColor: theme.colors.blue[3],
              gap: rem(20),
            }}
          >
            <Text c={theme.colors.blue[9]} ff={theme.fontFamily} fs={theme.fontSizes.xl} fw={800}>
              {categoiesItem?.category?.toUpperCase()}
            </Text>
            <Button
              radius={50}
              variant="outline"
              onClick={() => {
                router.push(ROUTES.CART.path);
              }}
            >
              {`${categoiesItem?.units}${categoiesItem?.price}`}
            </Button>
            <Text c={theme.colors.blue[9]} ff={theme.fontFamily} fs={theme.fontSizes.xl} fw={800}>
              {categoiesItem?.title}
            </Text>
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
          </Grid.Col>
        </Grid>
        {artCategories?.map((catagoiesItem) => (
          <CategoiesSection categoryList={catagoiesItem} key={catagoiesItem.id} />
        ))}
      </Container>
    </>
  );
};

export default Items;
