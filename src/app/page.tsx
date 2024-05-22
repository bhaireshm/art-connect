"use client";

import styles from "@/assets/styles/page.module.css";
import { store } from "@/redux";
import { Text } from "@mantine/core";

export default function Home() {
  const re = store();
  console.log(re);

  return (
    <main className={styles.main}>
      <Text>Hello from ArtConnect</Text>
    </main>
  );
}
