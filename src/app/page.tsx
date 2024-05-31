"use client";

import styles from "@/assets/styles/page.module.css";
import { store } from "@/redux";
import { Button, Notification, Text } from "@mantine/core";

export default function Home() {
  const re = store();
  console.log(re);
  return (
    <main className={styles.main}>
      <Text>Hello from ArtConnect</Text>
      <Button>button</Button>
      <Notification title="We notify you that">
        You are now obligated to give a star to Mantine project on GitHub
      </Notification>
    </main>
  );
}

