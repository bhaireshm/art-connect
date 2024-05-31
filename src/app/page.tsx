"use client";

import styles from "@/assets/styles/page.module.css";
import { CustomCard } from "@/components/customCard/CustomCard";
import { store } from "@/redux";
import { Button, Notification, Flex } from "@mantine/core";
import { json } from "@/assets/data/Json";
import CardsCarousel from "@/components/cardsCarousel/CardsCarousel";
import "@mantine/carousel/styles.css";
export default function Home() {
  const re = store();
  console.log(re);
  const data = json;

  return (
    <main className={styles.main}>
      <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
        p="md">
        {data?.map((item) => {
          return (
            <CustomCard
              key={item?.id}
              title={item?.title}
              image={item?.image}
              price={item?.price}
              isFavorite={item?.isFavorite}
              rating={item?.rating}
              description={item?.description}
            />
          );
        })}
      </Flex>
      <CardsCarousel />
    </main>
  );
}

