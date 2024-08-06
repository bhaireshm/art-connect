"use client";

import { UpdatePassword as ForgotPassword } from "@/components";
import { Container } from "@mantine/core";

function ForgotPasswordPage() {
  return (
    <Container size="xs" px="xl">
      <ForgotPassword resetMode={false} />
    </Container>
  );
}

export default ForgotPasswordPage;
