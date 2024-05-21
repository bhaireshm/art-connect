"use client";

import styles from "@/assets/styles/page.module.css";
import { store } from "@/redux";
import { Button } from "@mantine/core";
import { useState } from "react";

export default function Home() {
  const [incrementAmount, setIncrementAmount] = useState(1);
  const incrementValue = Number(incrementAmount) || 0;
  const re = store();
  console.log(re);

  return (
    <main className={styles.main}>
      {/* <JsonInput>{re.root}</JsonInput> */}
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
