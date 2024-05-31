"use client";

import { Autocomplete, Group, Burger, rem, Image, Avatar, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import classes from "./BasicAppShell.module.css";
import NextImage from "next/image";
import img from "@/assets/image/logo.png";
import { useRouter } from "next/navigation";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export default function BasicAppShell() {
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}>
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Image component={NextImage} src={img} alt="My image" h={60} fit="contain" />
        </Group>

        <Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            data={["React", "Angular", "Vue", "Next.js", "Riot.js", "Svelte", "Blitz.js"]}
            visibleFrom="xs"
          />
          <Group className={classes.links} visibleFrom="sm">
            <Button>Sign up</Button>
            <Button
              onClick={() => {
                router.push("/signin");
              }}>
              Sign in
            </Button>
            <Avatar radius="xl" />
          </Group>
        </Group>
      </div>
    </header>
  );
}

