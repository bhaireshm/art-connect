"use client";

import { UpdatePassword as ResetPassword } from "@/components";
import { Container } from "@mantine/core";

function ResetPasswordPage() {
  return (
    <Container size="xs" px="xl">
      <ResetPassword resetMode />
    </Container>
  );
}

export default ResetPasswordPage;
