"use client";

import Image from "next/image";
import { Text, Container, ActionIcon, Group, rem, useMantineTheme, Box } from "@mantine/core";
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from "@tabler/icons-react";
import classes from "./Footer.module.css";
import Logo from "../../assets/images/logo.png";

export function FooterLinks() {
  const theme = useMantineTheme();

  return (
    <footer className={classes.footer} style={{ backgroundColor: theme.colors.blue[9] }}>
      <Container
        className={classes.inner}
        fluid
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={classes.logo}>
          <Image height={150} width={150} src={Logo} alt="logo" />
        </div>
      </Container>
      <Container className={classes.afterFooter} fluid>
        <Box>
          <Text size="xs" c={theme.colors.blue[0]} className={classes.description}>
            Build fully functional accessible web applications faster than ever
          </Text>
          <Group gap={0} className={classes.social} justify="center" wrap="nowrap">
            <ActionIcon size="lg" color={theme.colors.blue[0]} variant="subtle">
              <IconBrandTwitter style={{ width: rem(25), height: rem(25) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color={theme.colors.blue[0]} variant="subtle">
              <IconBrandYoutube style={{ width: rem(25), height: rem(25) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color={theme.colors.blue[0]} variant="subtle">
              <IconBrandInstagram style={{ width: rem(25), height: rem(25) }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Box>
      </Container>
    </footer>
  );
}
