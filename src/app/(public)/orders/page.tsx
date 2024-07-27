"use client";

import { Badge, Paper, Table, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading) return <Text>Loading orders...</Text>;

  return (
    <Paper p="md">
      <Title order={2} mb="md">
        Order History
      </Title>

      {orders.length === 0 ? (
        <Text>No orders found.</Text>
      ) : (
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
            {orders.map((order: any) => (
              <Table.Tr key={order.id}>
                <Table.Td>{order.id}</Table.Td>
                <Table.Td>{new Date(order.orderDate)?.toLocaleDateString()}</Table.Td>
                <Table.Td>${order.totalCost.toFixed(2)}</Table.Td>
                <Table.Td>
                  <Badge color={order.orderStatus === "Completed" ? "green" : "blue"}>
                    {order.orderStatus}
                  </Badge>
                </Table.Td>
                <Table.Td>{new Date(order.estimatedDeliveryDate)?.toLocaleDateString()}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Paper>
  );
}
