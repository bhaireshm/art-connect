"use client";

import { Box, Divider, Text, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function Footer() {
  const isMobile = useMediaQuery("(max-width: 755px)");
  const span = isMobile ? 12 : 4;
  return (
    <Box
      bg="#1a10b1"
      px={150}
      py={100}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <Text c="white">Footer Footer Footer</Text>
      <Text c="white">Footer</Text>
      <Divider my="md" bg="white" color="white" size="xl" />
    </Box>
  );
}

