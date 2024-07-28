"use client";

import Logo from "@/assets/images/logo.png";
import classes from "@/assets/styles/navbar.module.css";
import { useAppSelector, useUser } from "@/redux";
import { ROUTES } from "@/utils/constants";
import {
  ActionIcon,
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
import { IconGardenCart, IconHeart, IconLogout, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import Login from "./Login";

export function Navbar(): React.JSX.Element {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [modalOpened, { open: openLoginModal, close: closeLoginModal }] = useDisclosure(false);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useMantineTheme();
  const { selectUser, logout, selectIsAuthenticated } = useUser();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { cart } = useCart();

  const navList = [
    "Discover",
    "Artist",
    isAuthenticated ? "Create" : "",
    "AboutUs",
    "Contact",
  ].filter((n) => n);

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
        {navList.map((item: any, index) => (
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
          <Button
            variant="gradient"
            onClick={() => {
              closeDrawer();
              openLoginModal();
            }}
          >
            Login
          </Button>
        </Group>
      </ScrollArea>
    </Drawer>
  );

  const CustomMenu = (
    <Menu shadow="md" trigger="hover" openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Avatar
          // src={user?.avatar}
          src="https://xsgames.co/randomusers/avatar.php?g=pixel"
          alt={user?.username}
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{user?.username}</Menu.Label>
        <Menu.Item
          leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
          component={Link}
          href={`${ROUTES.PROFILE.path}/${user?.id}`}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => {
            logout();
            router.push(ROUTES.HOME.path);
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
  const CustomModal = (
    <Modal opened={modalOpened} onClose={closeLoginModal} withCloseButton={false}>
      <Login
        onSuccess={() => {
          closeLoginModal();
          closeDrawer();
        }}
      />
    </Modal>
  );

  return (
    <Box>
      <header className={classes.header} style={{ backgroundColor: theme.colors.blue[1] }}>
        <Group justify="space-around" align="center" h="100%">
          <Box
            h="100%"
            component="div"
            onClick={() => router.push(ROUTES.HOME.path)}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Image height={100} width={100} src={Logo} alt="logo" />
          </Box>
          <Group h="100%" gap={20} visibleFrom="sm">
            {navList.map((item, index) => (
              <Box
                key={item.toString() + index}
                component="div"
                onClick={() => router.push(ROUTES[item?.toUpperCase()].path)}
                className={classes.link}
              >
                <Text ff={theme.fontFamily} fs={theme.fontSizes.xl}>
                  {ROUTES[item?.toUpperCase()].label}
                </Text>
              </Box>
            ))}
          </Group>
          <Group visibleFrom="sm">
            {isAuthenticated ? (
              <>
                <ActionIcon
                  variant="transparent"
                  color="gray"
                  onClick={async () => {
                    router.push(ROUTES.WISHLIST.path);
                  }}
                >
                  <IconHeart stroke={2} color={theme.colors.blue[9]} />
                </ActionIcon>
                <ActionIcon
                  variant="transparent"
                  color="gray"
                  onClick={() => router.push(ROUTES.CART.path)}
                >
                  <Indicator
                    inline
                    processing
                    size={16}
                    offset={7}
                    position="bottom-end"
                    color={theme.colors.blue[7]}
                    withBorder
                    label={cart.length} // get the cart count
                  >
                    <IconGardenCart stroke={2} color={theme.colors.blue[9]} />
                  </Indicator>
                </ActionIcon>
                {CustomMenu}
              </>
            ) : (
              <Button
                variant="gradient"
                onClick={() => {
                  if (pathname !== "/login") openLoginModal();
                }}
              >
                Login
              </Button>
            )}
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>
      {CustomDrawer}
      {CustomModal}
    </Box>
  );
}
