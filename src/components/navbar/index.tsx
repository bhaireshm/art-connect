"use client";

import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  Avatar,
  ScrollArea,
  rem,
  useMantineTheme,
  Input,
  Text,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconGardenCart, IconSearch } from "@tabler/icons-react";
import classes from "./navbar.module.css";
import Logo from "../../assets/image/artConnect.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CONSTANTS } from "@/utils/constants";

interface CustomButton {
  title: string;
  c?: string;
  bg?: string;
  radius?: number;
}

export function Navbar(): React.JSX.Element {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const theme = useMantineTheme();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 755px)");
  const isLogin = false;

  /**
   * The `CustomButton` function in TypeScript React renders a button with customizable text, color,
   * background, and border radius properties.
   * @param {CustomButton}  - The `CustomButton` component takes in the following parameters:
   * @returns A JSX element representing a custom button component with the specified title, color (c),
   * background color (bg), and border radius (radius) properties. If the color, background color, or
   * border radius are not provided, default values are used from the theme.
   */
  const CustomButton = ({ title, c, bg, radius }: CustomButton): JSX.Element => {
    return (
      <Button
        c={c || theme.colors.blue[1]}
        bg={bg || theme.colors.blue[9]}
        radius={radius || 50}
        ff={theme.fontFamily}
        fs={theme.fontSizes.xl}>
        {title}
      </Button>
    );
  };

  return (
    <Box>
      <header className={classes.header} style={{ backgroundColor: theme.colors.blue[1] }}>
        <Group justify="space-between" h="100%">
          <Box
            h="100%"
            component="div"
            onClick={() => router.push("/")}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Image height={100} width={100} src={Logo} alt="logo" />
            {/* <Divider orientation="vertical" h="85%" size="md" /> */}
          </Box>
          <Group h="100%" gap={20} visibleFrom="sm">
            <Box onClick={() => router.push("/discover")} className={classes.link} variant="link">
              <Text ff={theme.fontFamily} fs={theme.fontSizes.xl}>
                {CONSTANTS.DISCOVER}
              </Text>
            </Box>
            <Box component="div" onClick={() => router.push("/learn")} className={classes.link}>
              <Text ff={theme.fontFamily} fs={theme.fontSizes.xl}>
                {CONSTANTS.CREATEITEM}
              </Text>
            </Box>
            <Box component="div" onClick={() => router.push("/aboutus")} className={classes.link}>
              <Text ff={theme.fontFamily} fs={theme.fontSizes.xl}>
                {CONSTANTS.ABOUTUS}
              </Text>
            </Box>
          </Group>
          <Group visibleFrom="sm">
            <Input placeholder="Search" leftSection={<IconSearch size={16} />} radius={50} />
            <CustomButton title={isLogin ? CONSTANTS.SIGNUP : CONSTANTS.LOGIN} />
            {!isLogin && <CustomButton title={CONSTANTS.SIGNUP} />}
            <Box
              component="div"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <IconGardenCart stroke={2} color={theme.colors.blue[9]} />
              <Box component="div" className={classes.link}>
                <Text ff={theme.fontFamily} fs={theme.fontSizes.xl}>
                  {CONSTANTS.CART}
                </Text>
              </Box>
            </Box>
            <Avatar />
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}>
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Box
            component="div"
            onClick={() => router.push("/discover")}
            className={classes.link}
            ff={theme.fontFamily}
            fs={theme.fontSizes.xl}>
            {CONSTANTS.DISCOVER}
          </Box>
          <Box
            component="div"
            onClick={() => router.push("/createitem")}
            className={classes.link}
            ff={theme.fontFamily}
            fs={theme.fontSizes.xl}>
            {CONSTANTS.CREATEITEM}
          </Box>
          <Box
            component="div"
            onClick={() => router.push("/aboutus")}
            className={classes.link}
            ff={theme.fontFamily}
            fs={theme.fontSizes.xl}>
            {CONSTANTS.ABOUTUS}
          </Box>
          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <CustomButton title={isLogin ? CONSTANTS.SIGNUP : CONSTANTS.LOGIN} />
            <CustomButton title={CONSTANTS.SIGNUP} />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}