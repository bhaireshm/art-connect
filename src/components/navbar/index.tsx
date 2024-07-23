"use client";

import Login from "@/components/login/page";
import { useUser } from "@/redux";
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
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "../../assets/images/logo.png";
import classes from "./navbar.module.css";

interface CustomButtonProps {
  title: string;
  c?: string;
  bg?: string;
  radius?: number;
  onClick?: () => void;
}

function CustomButton({
  title,
  c,
  bg,
  radius,
  onClick,
}: Readonly<CustomButtonProps>): React.JSX.Element {
  const theme = useMantineTheme();
  return (
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
}

export function Navbar(): React.JSX.Element {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const router = useRouter();
  const theme = useMantineTheme();
  const { getUserInfo } = useUser();
  const user = getUserInfo();

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
        {["Discover", "CreateItem", "AboutUs"].map((item: any, index) => (
          <Box
            key={item.toString() + index}
            component="div"
            onClick={() => router.push(ROUTES[item?.toUpperCase()]?.path)}
            className={classes.link}
            ff={theme.fontFamily}
            fs={theme.fontSizes.xl}
          >
            {item}
          </Box>
        ))}
        <Divider my="sm" />
        <Group justify="center" grow pb="xl" px="md">
          <CustomButton
            title="Login"
            onClick={() => {
              closeDrawer();
              openModal();
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
        <Menu.Label>{user?.payload?.name}</Menu.Label>
        {[
          { icon: IconSettings, label: "Settings" },
          { icon: IconMessageCircle, label: "Messages" },
          { icon: IconPhoto, label: "Gallery" },
        ].map((item, index) => (
          <Menu.Item
            key={index}
            leftSection={<item.icon style={{ width: rem(14), height: rem(14) }} />}
            ff={theme.fontFamily}
            fs={theme.fontSizes.xl}
          >
            {item.label}
          </Menu.Item>
        ))}
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
    <Modal opened={modalOpened} onClose={closeModal} withCloseButton={false}>
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
            {["Discover", "CreateItem", "AboutUs"].map((item, index) => (
              <Box
                key={item.toString() + index}
                component="div"
                onClick={() => router.push(ROUTES[item?.toUpperCase()].path)}
                className={classes.link}
              >
                <Text ff={theme.fontFamily} fs={theme.fontSizes.xl}>
                  {item}
                </Text>
              </Box>
            ))}
          </Group>
          <Group visibleFrom="sm">
            <CustomButton title="Login" onClick={openModal} />
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
