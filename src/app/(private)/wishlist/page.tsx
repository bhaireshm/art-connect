"use client";

import { Wishlist } from "@/components";
import { ROUTES } from "@/utils/constants";
import { Group, Loader } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthProvider";

export default function WishlistPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push(ROUTES.HOME.path);
    return (
      <Group justify="center" my="lg">
        <Loader />
      </Group>
    );
  }

  return <Wishlist />;
}
