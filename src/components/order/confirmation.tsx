"use client";

import { API } from "@/core";
import { ROUTES } from "@/utils/constants";
import { currencyFormatter, isEmpty } from "@bhaireshm/ez.js";
import { Button, Container, Grid, Group, Loader, Paper, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface OrderConfirmProps {
  orderId: string;
}

const OrderConfirm: React.FC<OrderConfirmProps> = ({ orderId }) => {
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/api/orders/${orderId}`);

        if (!isEmpty(res?.data)) setOrder(res?.data);
        else
          notifications.show({
            color: "red",
            autoClose: 5000,
            message: "Order not found",
          });
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (isLoading)
    return (
      <Group justify="center" my="lg">
        <Loader />
      </Group>
    );

  if (!order)
    return (
      <Group justify="center" py="xl">
        <Title>Order not found.</Title>
      </Group>
    );

  return (
    <Container my="md">
      <Paper shadow="xs" p="xl">
        <Stack align="center">
          <Title order={1}>Order Confirmed</Title>
          <Text size="xl" c="green">
            Thank you for your order!
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Text size="md" fw={500}>
                Order ID:
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="md">{order.id}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="md" fw={500}>
                Total:
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="md">{currencyFormatter(order.totalCost.toFixed(2))}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="md" fw={500}>
                Items:
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="md">{order.items.length}</Text>
            </Grid.Col>
          </Grid>
          <Group gap="md">
            <Button variant="light" onClick={() => router.push(ROUTES.DISCOVER.path)}>
              Continue Shopping
            </Button>
            <Button variant="light" onClick={() => router.push(ROUTES.ORDERS.path)}>
              View Orders
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
};

export default OrderConfirm;
