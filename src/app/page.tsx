"use client";

import { useState } from "react";
import { Button } from "@mantine/core";

export default function Home() {
  const [incrementAmount, setIncrementAmount] = useState(1);
  const incrementValue = Number(incrementAmount) || 0;

  return (
    <main>
      <Button
        onClick={() => {
          setIncrementAmount(+incrementAmount + 1);
        }}>
        {incrementValue}
      </Button>
    </main>
  );
}
