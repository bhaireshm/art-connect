"use client";

import { useAuth } from "@/context";
import { API } from "@/core";
import { ROUTES } from "@/utils/constants";
import { currencyFormatter } from "@bhaireshm/ez.js";
import { Button, Container, Divider, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CartItem from "./CartItem";
import { useCart } from "./CartProvider";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalCost, isLoading, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    try {
      const res = await API.post(`/api/cart/${user?.id}/checkout`, {
        shippingAddress: { ...user?.profile?.address },
        billingAddress: { ...user?.profile?.address },
      });
      // console.log("handleCheckout res", res);

      if (res.status === 201) {
        clearCart();
        router.push(`${ROUTES.ORDERS.path}/${res.data.order.id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

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
          <Button size="sm" variant="light" loading={isCheckoutLoading} onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
          <Text size="xl" fw={700}>
            Total: {currencyFormatter(+totalCost.toFixed(2))}
          </Text>
        </Group>
      </Stack>
    </Container>
  );
}
