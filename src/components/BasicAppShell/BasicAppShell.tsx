"use client";
// import { AppShell, Avatar, Burger, Group, Image } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import NextImage from "next/image";
// import img from "@/assets/image/logo.png";

// export default function BasicAppShell() {
//   const [opened, { toggle }] = useDisclosure();

//   return (
//     <AppShell
//       header={{ height: 60 }}
//       navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
//       padding="md">
//       <AppShell.Header display={"flex"} dir="row">
//         <Group h="100%" px="md">
//           <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
//           <Image component={NextImage} src={img} alt="My image" h={60} fit="contain" />
//           <Avatar radius="xl" />
//         </Group>
//       </AppShell.Header>
//     </AppShell>
//   );
// }

import { Autocomplete, Group, Burger, rem, Image, Avatar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import classes from "./BasicAppShell.module.css";
import NextImage from "next/image";
import img from "@/assets/image/logo.png";
const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export default function BasicAppShell() {
  const [opened, { toggle }] = useDisclosure(false);

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
            <Avatar radius="xl" />
          </Group>
        </Group>
      </div>
    </header>
  );
}

