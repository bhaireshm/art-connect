"use client";

import { Button, Group, Loader, Stack, Table, Text, Title } from "@mantine/core";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import React from "react";
import { useCart } from "./CartProvider";

export default function Cart() {
  // https://claude.ai/chat/b4066e19-07b3-4b57-b3d2-cdce9659f733
  // https://chatgpt.com/c/bc9e5d1c-4fa9-4a88-9ef0-7da8e233468b
  const { cart, removeFromCart, updateQuantity, totalCost, isLoading } = useCart();

  if (isLoading)
    return (
      <Group justify="center">
        <Loader />
        <Text>Loading cart...</Text>
      </Group>
    );

  if (cart.length === 0)
    return (
      <Group justify="center">
        <Title>Your cart is empty.</Title>
      </Group>
    );

  return (
    <Stack>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Artwork</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Total</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {cart.map((item) => (
            <Table.Tr key={item.artwork.id}>
              <Table.Td>{item.artwork.title}</Table.Td>
              <Table.Td>${item.artwork.price.toFixed(2)}</Table.Td>
              <Table.Td>
                <Group>
                  <Button
                    size="xs"
                    onClick={() => updateQuantity(item.artwork.id, item.quantity - 1)}
                  >
                    <IconMinus size={16} />
                  </Button>
                  <Text>{item.quantity}</Text>
                  <Button
                    size="xs"
                    onClick={() => updateQuantity(item.artwork.id, item.quantity + 1)}
                  >
                    <IconPlus size={16} />
                  </Button>
                </Group>
              </Table.Td>
              <Table.Td>${(item.artwork.price * item.quantity).toFixed(2)}</Table.Td>
              <Table.Td>
                <Button color="red" onClick={() => removeFromCart(item.artwork.id)}>
                  <IconTrash size={16} />
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Group justify="space-between">
        <Text size="xl" fw={700}>
          Total: ₹{totalCost.toFixed(2)}
        </Text>
        <Button size="lg">Proceed to Checkout</Button>
      </Group>
    </Stack>
  );
}
