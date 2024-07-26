"use client";

import { Container, List, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export default function About() {
  return (
    <Container my="lg">
      <Title order={1} ta="center" my="lg">
        About Us
      </Title>
      <Text>
        Welcome to our innovative online art marketplace, a comprehensive platform designed to
        facilitate the sale and promotion of artworks. Our mission is to bridge the gap between
        artists and art enthusiasts, providing a seamless and secure digital space for showcasing
        and purchasing unique pieces of art.
      </Text>

      <Title order={2} my="lg">
        Our Vision
      </Title>
      <Text>
        We aim to empower artists by giving them a personalized space to exhibit their portfolios,
        connect with a broader audience, and streamline the art-selling process. By combining an
        intuitive user experience with robust e-commerce capabilities, we offer a dynamic
        marketplace for both artists and collectors.
      </Text>

      <Title order={2} my="lg">
        What We Offer
      </Title>
      <List
        spacing="sm"
        size="md"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCheck size={16} />
          </ThemeIcon>
        }
      >
        <List.Item>
          Personalized Artist Profiles: Artists can create accounts and manage their profiles,
          showcasing their biographies and portfolios.
        </List.Item>
        <List.Item>
          Comprehensive Gallery: Upload and display artwork with detailed information, including
          descriptions and pricing.
        </List.Item>
        <List.Item>
          E-commerce Functionality: A dedicated page for available artworks with secure online
          purchasing options.
        </List.Item>
        <List.Item>
          Search and Filtering: Robust capabilities to help users discover and explore artworks
          based on various criteria, such as artist, style, or price range.
        </List.Item>
        <List.Item>
          Secure Transactions: A reliable payment gateway ensures a safe and convenient transaction
          experience for buyers.
        </List.Item>
      </List>

      <Title order={2} my="lg">
        Technologies We Use
      </Title>
      <Text>
        Our platform is built using modern technologies to ensure a high-quality user experience:
      </Text>
      <List
        spacing="sm"
        size="md"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCheck size={16} />
          </ThemeIcon>
        }
      >
        <List.Item>Frontend: NextJS for the React framework</List.Item>
        <List.Item>State Management: Redux Toolkit</List.Item>
        <List.Item>
          Database: MongoDB with Mongoose, with alternatives like Sequelize/Supabase
        </List.Item>
        <List.Item>Version Control: Git</List.Item>
        <List.Item>API Testing: Postman</List.Item>
        <List.Item>Deployment: GitHub Pages</List.Item>
      </List>

      <Title order={2} my="lg">
        Our Commitment
      </Title>
      <Text>
        We are committed to adhering to best practices in web development, including responsiveness,
        accessibility, and performance optimization. Our goal is to continuously improve and scale
        our platform to accommodate a growing user base and an expanding catalog of artworks.
      </Text>

      <Title order={2} my="lg">
        Join Us
      </Title>
      <Text>
        Whether you are an artist looking to showcase your work or a collector seeking unique
        pieces, our platform offers the tools and features to meet your needs. Join us in
        revolutionizing the online art marketplace and connecting with the vibrant world of art.
      </Text>
    </Container>
  );
}
