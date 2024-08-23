"use client";

import { OrderConfirmation } from "@/components";
import { Container } from "@mantine/core";
import { useParams } from "next/navigation";

function OrderConfirmationPage() {
  const { oid } = useParams();

  return (
    <Container size="xs" px="xl">
      <OrderConfirmation orderId={oid.toString()} />
    </Container>
  );
}

export default OrderConfirmationPage;
