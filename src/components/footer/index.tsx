"use client";

import Image from "next/image";
import { Box, Divider, Text, Grid, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Logo from "../../assets/image/artConnect.png";
import { IconBrandFacebook, IconBrandTwitter, IconBrandInstagram } from "@tabler/icons-react";
export default function Footer(): React.JSX.Element {
  const isMobile = useMediaQuery("(max-width: 755px)");
  const span = isMobile ? 12 : 4;
  const theme = useMantineTheme();

  return (
    <Box bg={theme.colors.blue[9]} px={isMobile ? 10 : 150} py={isMobile ? 10 : 100}>
      <Grid justify="center">
        <Grid.Col span={span}>
          <Image height={150} width={150} src={Logo} alt="logo" />
          <Text c={theme.colors.blue[1]} ff={theme.fontFamily} fs={theme.fontSizes.xl}>
            The New Creative Economy.
          </Text>
        </Grid.Col>
        <Grid.Col span={span}>
          <Text c={theme.colors.blue[1]} ff={theme.fontFamily} fs={theme.fontSizes.xl}>
            Menu
          </Text>
          <Text c={theme.colors.blue[1]} ff={theme.fontFamily} fs={theme.fontSizes.xl}>
            Discover
          </Text>
          <Text c={theme.colors.blue[1]} ff={theme.fontFamily} fs={theme.fontSizes.xl}>
            Create Item
          </Text>
          <Text c={theme.colors.blue[1]} ff={theme.fontFamily} fs={theme.fontSizes.xl}>
            About Us
          </Text>
        </Grid.Col>
        <Grid.Col span={span}>
          <Text c={theme.colors.blue[1]} ff={theme.fontFamily} fs={theme.fontSizes.xl}>
            About ArtConnect
          </Text>
          <Text c={theme.colors.blue[1]} ff={theme.fontFamily} fs={theme.fontSizes.xl}>
            Documentation
          </Text>
          <Text c={theme.colors.blue[1]} ff={theme.fontFamily} fs={theme.fontSizes.xl}>
            Contact Us
          </Text>
          <Box mt={10} style={{ display: "flex", gap: "10px" }}>
            <IconBrandFacebook stroke={2} color={theme.colors.blue[1]} />
            <IconBrandTwitter stroke={2} color={theme.colors.blue[1]} />
            <IconBrandInstagram stroke={2} color={theme.colors.blue[1]} />
          </Box>
        </Grid.Col>
      </Grid>
      <Divider my="lg" mt="lg" color={theme.colors.blue[1]} size="lg" />
    </Box>
  );
}
