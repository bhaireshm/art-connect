"use client";

import Login from "@/components/login/page";
import { useAppSelector, useUser } from "@/redux";
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
import { IconGardenCart, IconLogout, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
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
  const [modalOpened, { open: openLoginModal, close: closeLoginModal }] = useDisclosure(false);
  const router = useRouter();
  const theme = useMantineTheme();
  const navList = ["Discover", "Artist", "Create", "AboutUs", "Contact"];

  const { selectUser, logout, selectIsAuthenticated } = useUser();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

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
          <CustomButton
            title="Login"
            onClick={() => {
              closeDrawer();
              openLoginModal();
            }}
          />
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
        onSuccess={(userInfo) => {
          console.log("file: index.tsx:146  Navbar  userInfo", userInfo);
          closeLoginModal();
          closeDrawer();
        }}
      />
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
              </>
            ) : (
              <CustomButton title="Login" onClick={openLoginModal} />
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
