"use client";

import styles from "@/assets/styles/page.module.css";
import { CustomCard } from "@/components/CustomCard/CustomCard";
import { store } from "@/redux";
import { Button, Flex } from "@mantine/core";
import { useState } from "react";
import { json } from "@/assets/data/Json";
import CardsCarousel from "@/components/CardsCarousel/CardsCarousel";
import '@mantine/carousel/styles.css';
export default function Home() {
  const [incrementAmount, setIncrementAmount] = useState(1);
  const incrementValue = Number(incrementAmount) || 0;
  const re = store();
  console.log(re);
  const data = json;

  return (
    <main className={styles.main}>
      {/* <JsonInput>{re.root}</JsonInput> */}
      <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
        p="md">
        {data.map((item) => {
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

      <Button
       
        onClick={() => {
           setIncrementAmount(+incrementAmount + 1);
           // c.increment(incrementAmount);
          }}>
        
        {incrementValue}
      
      </Button>
    </main>
  );
}

