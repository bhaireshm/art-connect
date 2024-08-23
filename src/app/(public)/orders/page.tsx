"use client";

import { API } from "@/core";
import { currencyFormatter } from "@bhaireshm/ez.js";
import { Badge, Container, Loader, Paper, Table, Title } from "@mantine/core";
import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // TODO: Get user's orders
        const response = await API.get("/api/orders");
        if (response?.data?.length) setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading)
    return (
      <Container>
        <Loader size="xl" style={{ display: "block", margin: "40px auto" }} />
      </Container>
    );

  return (
    <Paper p="xl">
      <Title order={2} mb="md">
        Order History
      </Title>

      {orders.length === 0 && <Container>No orders found.</Container>}

      {orders.length && (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Order ID</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Total Cost</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Estimated Delivery</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {orders?.map((order: any) => (
              <Table.Tr key={order.id}>
                <Table.Td>{order.id}</Table.Td>
                <Table.Td>{new Date(order.orderDate)?.toLocaleDateString()}</Table.Td>
                <Table.Td>{currencyFormatter(order.totalCost.toFixed(2))}</Table.Td>
                <Table.Td>
                  <Badge color={order.orderStatus === "Completed" ? "green" : "blue"}>
                    {order.orderStatus ?? "Pending"}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  {
                    new Date().toLocaleDateString() // order?.estimatedDeliveryDate
                  }
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Paper>
  );
}
