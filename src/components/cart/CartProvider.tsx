"use client";

import { useAuth } from "@/context/AuthProvider";
import { API } from "@/core";
import type { Artwork, CartContextType } from "@/types";
import { isEmpty } from "@bhaireshm/ez.js";
import { notifications } from "@mantine/notifications";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export function CartProvider({ children }: Readonly<React.PropsWithChildren>) {
  const [cart, setCart] = useState<CartContextType["cart"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      try {
        const response = await API.get(`/api/cart/${user?.id}`);
        if (!isEmpty(response?.data)) setCart(response.data?.items || []);
      } catch (error) {
        notifications.show({
          color: "red",
          autoClose: 5000,
          message: "Unable to load cart",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && !isEmpty(user)) loadCart();
  }, [user, isAuthenticated]);

  const contextValue = useMemo(() => {
    const addToCart = async (artwork: Artwork) => {
      if (!isAuthenticated) {
        notifications.show({
          color: "red",
          autoClose: 5000,
          message: "Please login to add items to your cart",
        });
        return;
      }

      try {
        const respone = await API.post(`/api/cart/${user?.id}/items`, {
          items: [{ artwork: artwork.id, quantity: 1 }],
          totalCost: cart.reduce(
            (total, item) => total + item.artwork.price * item.quantity,
            artwork.price
          ),
        });

        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.artwork.id === artwork.id);

          if (existingItem)
            return prevCart.map((item) =>
              item.artwork.id === artwork.id ? { ...item, quantity: item.quantity + 1 } : item
            );

          const cartItem = respone?.data?.items?.find((item: any) => item.artwork === artwork.id);
          return [
            ...prevCart,
            {
              id: cartItem.id ?? "",
              artwork,
              quantity: 1,
            },
          ];
        });

        notifications.show({
          color: "green",
          autoClose: 2000,
          message: "Item added to cart",
        });
      } catch ({ response, ...restErr }: any) {
        notifications.show({
          color: "red",
          autoClose: 5000,
          title: response?.name ?? "",
          message: response?.statusText ?? "Unable to add item to cart",
        });
      }
    };

    const removeFromCart = async (artworkId: string) => {
      try {
        const response = await API.delete(`/api/cart/${user?.id}/items/${artworkId}`);
        setCart(response?.data?.items ?? []);

        notifications.show({
          color: "green",
          autoClose: 2000,
          message: "Item removed from cart",
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
        notifications.show({
          color: "red",
          autoClose: 5000,
          message: "Unable to remove item from cart",
        });
      }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
      try {
        let cartItem: any = null;
        const updatedCart = cart.map((item) => {
          if (item?.id === itemId) {
            item = { ...item, quantity: item.quantity + quantity };
            cartItem = item;
          }

          return item;
        });

        const totalCost = cart.reduce(
          (total, item) => total + item.artwork.price * item.quantity,
          cartItem?.artwork?.price ?? 0
        );

        await API.post(`/api/cart/${user?.id}/items`, {
          items: [{ artwork: cartItem?.artwork?.id, quantity }],
          totalCost,
        });

        if (updatedCart.some((c) => c.quantity <= 0))
          setCart(updatedCart.filter((c) => c.quantity > 0));
        else setCart(updatedCart);

        notifications.show({
          color: "green",
          autoClose: 2000,
          message: "Cart updated",
        });
      } catch (error) {
        console.error("Error updating cart:", error);
        notifications.show({
          color: "red",
          autoClose: 5000,
          message: "Unable to update cart",
        });
      }
    };

    const clearCart = async () => {
      try {
        await API.delete(`/api/cart/${user?.id}/items`);

        setCart([]);

        notifications.show({
          color: "green",
          autoClose: 2000,
          message: "Cart cleared",
        });
      } catch (error) {
        console.error("Error clearing cart:", error);
        notifications.show({
          color: "red",
          autoClose: 5000,
          message: "Unable to clear cart",
        });
      }
    };

    const totalCost = cart.reduce((total, item) => total + item.artwork.price * item.quantity, 0);

    return {
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalCost,
      isLoading,
    };
  }, [cart, isAuthenticated, isLoading, user]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
