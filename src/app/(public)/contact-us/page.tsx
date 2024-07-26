"use client";

import { Container, Title, Text, Group, Button } from "@mantine/core";

export default function Contact() {
  return (
    <Container my="lg">
      <Title order={1} ta="center" my="lg">
        Contact Us
      </Title>

      <Title order={2} my="lg">
        Get in Touch
      </Title>
      <Text>Email: support@ourartplatform.com</Text>
      <Text>Phone: +1 (123) 456-7890</Text>
      <Text>Address: 123 Art Street, Creativity City, Artland, 12345</Text>

      <Title order={2} my="lg">
        Follow Us
      </Title>
      <Group>
        <Button
          component="a"
          href="https://facebook.com/ourartplatform"
          target="_blank"
          variant="outline"
        >
          Facebook
        </Button>
        <Button
          component="a"
          href="https://instagram.com/ourartplatform"
          target="_blank"
          variant="outline"
        >
          Instagram
        </Button>
        <Button
          component="a"
          href="https://twitter.com/ourartplatform"
          target="_blank"
          variant="outline"
        >
          Twitter
        </Button>
      </Group>

      <Title order={2} my="lg">
        Support
      </Title>
      <Text>
        For any support inquiries or technical issues, please reach out to our support team at
        support@ourartplatform.com. We are committed to providing prompt and helpful assistance to
        ensure your experience on our platform is smooth and enjoyable.
      </Text>

      <Title order={2} my="lg">
        Feedback
      </Title>
      <Text>
        Your feedback is invaluable to us. If you have any suggestions or comments on how we can
        improve our platform, please let us know at feedback@ourartplatform.com.
      </Text>
    </Container>
  );
}
