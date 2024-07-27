"use client";

import { Button, Container, Group, Text, Title } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandMedium,
  IconBrandNpm,
} from "@tabler/icons-react";

export default function Contact() {
  return (
    <Container my="lg">
      <Title order={1} ta="center" my="lg">
        Contact Us
      </Title>

      <Title order={2} my="lg">
        Get in Touch
      </Title>
      <Text>Email: bhairesh97@gmail.com</Text>
      <Text>Phone: +91 8553963618</Text>
      <Text>Address: Bengaluru, Karnataka 560061</Text>

      <Title order={2} my="lg">
        Follow Me on
      </Title>
      <Group>
        <Button
          component="a"
          href="https://www.linkedin.com/in/bhaireshm/"
          target="_blank"
          variant="gradient"
          leftSection={<IconBrandLinkedin style={{ width: "1rem", height: "1rem" }} />}
        >
          LinkedIn
        </Button>
        <Button
          component="a"
          href="https://github.com/bhaireshm/"
          target="_blank"
          variant="gradient"
          leftSection={<IconBrandGithub style={{ width: "1rem", height: "1rem" }} />}
        >
          Github
        </Button>
        <Button
          component="a"
          href="https://bhaireshm.medium.com/"
          target="_blank"
          variant="gradient"
          leftSection={<IconBrandMedium style={{ width: "1rem", height: "1rem" }} />}
        >
          Medium
        </Button>
        <Button
          component="a"
          href="https://www.npmjs.com/~bhaireshm"
          target="_blank"
          variant="gradient"
          leftSection={<IconBrandNpm style={{ width: "1rem", height: "1rem" }} />}
        >
          NPM
        </Button>
      </Group>

      <Title order={2} my="lg">
        Support
      </Title>
      <Text>
        For any support inquiries or technical issues, please reach out to our support team at
        bhairesh97@gmail.com. We are committed to providing prompt and helpful assistance to ensure
        your experience on our platform is smooth and enjoyable.
      </Text>

      <Title order={2} my="lg">
        Feedback
      </Title>
      <Text>
        Your feedback is invaluable to us. If you have any suggestions or comments on how we can
        improve our platform, please let us know at bhairesh97@gmail.com
      </Text>
    </Container>
  );
}
