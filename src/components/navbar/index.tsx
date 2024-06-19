"use client";

import { ROUTES } from "@/utils/constants";
import {
  Avatar,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Indicator,
  Input,
  Menu,
  Modal,
  ScrollArea,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconGardenCart,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Login from "@/components/login/page";
import Logo from "../../assets/image/artConnect.png";
import classes from "./navbar.module.css";

interface CustomButton {
  title: string;
  c?: string;
  bg?: string;
  radius?: number;
  onClick?: () => void;
}

export function Navbar(): React.JSX.Element {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const router = useRouter();

  /**
   * The `CustomButton` function in TypeScript React renders a button with customizable text, color,
   * background, and border radius properties.
   * @param {CustomButton}  - The `CustomButton` component takes in the following parameters:
   * @returns A JSX element representing a custom button component with the specified title, color (c),
   * background color (bg), and border radius (radius) properties. If the color, background color, or
   * border radius are not provided, default values are used from the theme.
   */
  const CustomButton = ({ title, c, bg, radius, onClick }: CustomButton): JSX.Element => (
    <Button
      c={c ?? theme.colors.blue[1]}
      bg={bg ?? theme.colors.blue[9]}
      radius={radius ?? 50}
      ff={theme.fontFamily}
      fs={theme.fontSizes.xl}
      onClick={onClick}
    >
      {title}
    </Button>
  );
  const CustomDrawer = (
    <Drawer
      opened={drawerOpened}
      onClose={closeDrawer}
      size="100%"
      padding="md"
      hiddenFrom="sm"
      zIndex={1000000}
    >
      <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
        <Box
          component="div"
          onClick={() => router.push(ROUTES.DISCOVER.path)}
          className={classes.link}
          ff={theme.fontFamily}
          fs={theme.fontSizes.xl}
        >
          Discover
        </Box>
        <Box
          component="div"
          onClick={() => router.push(ROUTES.CREATEITEM.path)}
          className={classes.link}
          ff={theme.fontFamily}
          fs={theme.fontSizes.xl}
        >
          CreateItem
        </Box>
        <Box
          component="div"
          onClick={() => router.push(ROUTES.ABOUTUS.path)}
          className={classes.link}
          ff={theme.fontFamily}
          fs={theme.fontSizes.xl}
        >
          AboutUs
        </Box>
        <Divider my="sm" />
        <Group justify="center" grow pb="xl" px="md">
          <CustomButton
            title="Login"
            onClick={() => {
              closeDrawer();
              open();
            }}
          />
        </Group>
      </ScrollArea>
    </Drawer>
  );
  const CustomMenu = (
    <Menu shadow="md" trigger="hover" openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Avatar />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Jayanta Garu</Menu.Label> {/* Replace with login user's name */}
        <Menu.Item
          leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
          ff={theme.fontFamily}
          fs={theme.fontSizes.xl}
        >
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}
          ff={theme.fontFamily}
          fs={theme.fontSizes.xl}
        >
          Messages
        </Menu.Item>
        <Menu.Item
          leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}
          ff={theme.fontFamily}
          fs={theme.fontSizes.xl}
        >
          Gallery
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
  const CustomModal = (
    <Modal opened={opened} onClose={close} withCloseButton={false}>
      <Login />
    </Modal>
  );
  return (
    <Box>
      <header className={classes.header} style={{ backgroundColor: theme.colors.blue[1] }}>
        <Group justify="space-between" h="100%">
          <Box
            h="100%"
            component="div"
            onClick={() => router.push(ROUTES.HOME.path)}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Image height={100} width={100} src={Logo} alt="logo" />
          </Box>
          <Group h="100%" gap={20} visibleFrom="sm">
            <Box
              onClick={() => router.push(ROUTES.DISCOVER.path)}
              className={classes.link}
              variant="link"
            >
              <Text ff={theme.fontFamily} fs={theme.fontSizes.xl}>
                Discover
              </Text>
            </Box>
            <Box component="div" onClick={() => router.push("/learn")} className={classes.link}>
              <Text ff={theme.fontFamily} fs={theme.fontSizes.xl}>
                CreateItem
              </Text>
            </Box>
            <Box
              component="div"
              onClick={() => router.push(ROUTES.ABOUTUS.path)}
              className={classes.link}
            >
              <Text ff={theme.fontFamily} fs={theme.fontSizes.xl}>
                AboutUs
              </Text>
            </Box>
          </Group>
          <Group visibleFrom="sm">
            <Input placeholder="Search" leftSection={<IconSearch size={16} />} radius={50} />
            <CustomButton title="Login" onClick={open} />
            <Box
              component="div"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Indicator
                inline
                processing
                size={16}
                offset={7}
                position="bottom-end"
                color={theme.colors.blue[7]}
                withBorder
                label={2}
              >
                <IconGardenCart
                  stroke={2}
                  color={theme.colors.blue[9]}
                  onClick={() => router.push(ROUTES.CART.path)}
                />
              </Indicator>
            </Box>
            {CustomMenu}
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>
      {CustomDrawer}
      {CustomModal}
    </Box>
  );
}
