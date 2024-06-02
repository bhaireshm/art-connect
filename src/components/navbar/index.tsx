"use client";

import Image from "next/image";
import { AppShell, Box, Burger, Button, Group, Input, Text, Avatar, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import Logo from "../../assets/image/logo.png";

export function Navbar() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell layout="alt" header={{ height: 60 }} padding="md">
      <AppShell.Header px="md">
        <Box
          h="100%"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Image height={70} width={70} src={Logo} alt="logo" />
          </Group>
          <Group h="100%" px="md">
            {/** Add aditional items */}
            <Input placeholder="Search" leftSection={<IconSearch size={16} />} radius={50} />
            <Button variant="outline" radius={50}>
              Login
            </Button>
            <Avatar />
          </Group>
        </Box>
      </AppShell.Header>
    </AppShell>
  );
}
