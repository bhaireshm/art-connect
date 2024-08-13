"use client";

import Logo from "@/assets/images/logo.png";
import classes from "@/assets/styles/navbar.module.css";
import { useAuth } from "@/context";
import { ROUTES, SCHEMA_NAMES } from "@/utils/constants";
import { titleCase } from "@bhairesh/ez.js";
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
import { IconGardenCart, IconHeart, IconLogout, IconPalette, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Login from "./auth/Login";
import { useCart } from "./cart";

export function Navbar(): React.JSX.Element {
  const theme = useMantineTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();
  const { cart } = useCart();

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [modalOpened, { open: openLoginModal, close: closeLoginModal }] = useDisclosure(false);

  const navList: { label: string; path: string; requiresAuth?: boolean }[] = [
    ROUTES.DISCOVER,
    ROUTES.ARTIST,
    user?.type === SCHEMA_NAMES.ARTIST ? ROUTES.CREATE : { label: "", path: "" },
    ROUTES.ABOUTUS,
    ROUTES.CONTACT,
  ].filter((n) => n.path !== "");

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
        {navList.map((item) => (
          <Box
            key={item.path}
            component="div"
            onClick={() => router.push(item.path)}
            className={classes.link}
            ff={theme.fontFamily}
            fs={theme.fontSizes.xl}
          >
            {item.label}
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
          src={null}
          // src="https://xsgames.co/randomusers/avatar.php?g=pixel"
          alt={titleCase(user?.profile?.firstName ?? user?.username ?? "")}
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{titleCase(user?.profile?.firstName ?? user?.username ?? "")}</Menu.Label>
        <Menu.Item
          leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
          component={Link}
          href={`${ROUTES.PROFILE.path}/${user?.id}`}
        >
          Profile
        </Menu.Item>
        {user?.type === "Artists" && (
          <Menu.Item
            leftSection={<IconPalette style={{ width: rem(14), height: rem(14) }} />}
            component={Link}
            href={`${ROUTES.ARTWORKS.path}?artist=${user?.id}`}
          >
            My Artworks
          </Menu.Item>
        )}
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
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Image height={100} width={100} src={Logo} alt="logo" />
          </Box>
          <Group h="100%" gap={20} visibleFrom="sm">
            {navList.map((item) => (
              <Box
                key={item.path}
                component="div"
                onClick={() => router.push(item.path)}
                className={classes.link}
              >
                <Text ff={theme.fontFamily} fs={theme.fontSizes.xl}>
                  {item.label}
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
                  if (pathname !== ROUTES.LOGIN.path) openLoginModal();
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
