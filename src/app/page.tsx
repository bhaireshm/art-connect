"use client";

import styles from "@/assets/styles/page.module.css";
import { ac_store } from "@/redux";
import { Button } from "@mantine/core";
import { useState } from "react";

export default function Home() {
  const [incrementAmount, setIncrementAmount] = useState(1);
  const incrementValue = Number(incrementAmount) || 0;
  const re = ac_store.getActions();
  const c = re.useCounter();
  // console.log();

  return (
    <main className={styles.main}>
      {/* <JsonInput>{re.root}</JsonInput> */}
      <Button onClick={() => {
         setIncrementAmount(+incrementAmount + 1);
         c.increment(incrementAmount);
      }}>{incrementValue}</Button>
    </main>
  );
}
