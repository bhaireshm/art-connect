"use client";

import { Login } from "@/components";
import { useAuth } from "@/context/AuthProvider";
import { ROUTES } from "@/utils/constants";
import { Container, Group, Loader } from "@mantine/core";
import { useRouter } from "next/navigation";

function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push(ROUTES.HOME.path);
    return (
      <Group justify="center" my="lg">
        <Loader />
      </Group>
    );
  }

  return (
    <Container size="xs" px="xl">
      <Login />
    </Container>
  );
}

export default LoginPage;
