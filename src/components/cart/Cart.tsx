"use client";

import { Button, Container, Divider, Group, Loader, Stack, Text, Title } from "@mantine/core";
import CartItem from "./CartItem";
import { useCart } from "./CartProvider";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalCost, isLoading, clearCart } = useCart();

  if (isLoading)
    return (
      <Group justify="center" my="lg">
        <Loader />
      </Group>
    );

  if (cart.length === 0)
    return (
      <Group justify="center" py="xl">
        <Title>Your cart is empty.</Title>
      </Group>
    );

  return (
    <Container my="md">
      <Stack>
        <Group justify="flex-end">
          <Button variant="transparent" component="text" size="xs" onClick={clearCart}>
            Clear Cart
          </Button>
        </Group>
        {cart.map((item) => (
          <CartItem
            key={item.artwork.id + item.id}
            item={item}
            onRemove={() => removeFromCart(item.id)}
            onUpdateQuantity={(newQuantity) => updateQuantity(item.id, newQuantity)}
          />
        ))}
        <Divider />
        <Group justify="space-between">
          <Button size="sm" variant="light">
            Proceed to Checkout
          </Button>
          <Text size="xl" fw={700}>
            Total: ₹{totalCost.toFixed(2)}
          </Text>
        </Group>
      </Stack>
    </Container>
  );
}
