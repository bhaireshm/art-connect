"use client";

import Image from "next/image";
import { Text, Container, ActionIcon, Group, rem, useMantineTheme } from "@mantine/core";
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from "@tabler/icons-react";
import classes from "./Footer.module.css";
import Logo from "../../assets/image/artConnect.png";

const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
];

export function FooterLinks() {
  const theme = useMantineTheme();
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
        c={theme.colors.blue[0]}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title} c={theme.colors.blue[0]}>
          {group.title}
        </Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer} style={{ backgroundColor: theme.colors.blue[9] }}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Image height={150} width={150} src={Logo} alt="logo" />
          <Text size="xs" c={theme.colors.blue[0]} className={classes.description}>
            Build fully functional accessible web applications faster than ever
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color={theme.colors.blue[0]} variant="subtle">
            <IconBrandTwitter style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color={theme.colors.blue[0]} variant="subtle">
            <IconBrandYoutube style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color={theme.colors.blue[0]} variant="subtle">
            <IconBrandInstagram style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
