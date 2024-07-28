"use client";

import { API } from "@/core";
import { useAppSelector, useUser } from "@/redux";
import type { Artwork } from "@/types";
import { COOKIE } from "@/utils/constants";
import { notifications } from "@mantine/notifications";
import { getCookie } from "cookies-next";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface CartItem {
  artwork: Artwork;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (artworkId: string) => void;
  updateQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  totalCost: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectUser } = useUser();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector((state) => state.isAuthenticated);

  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      try {
        const token = getCookie(COOKIE.name);
        const response = await API.get(`/api/cart/${user?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.status === 200 && response.data.data) setCart(response.data.data);
      } catch (error) {
        console.error("Error loading cart:", error);
        notifications.show({
          color: "red",
          autoClose: 5000,
          message: "Unable to load cart",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && user) loadCart();
  }, [isAuthenticated, user]);

  const contextValue = useMemo(() => {
    const addToCart = async (artwork: Artwork) => {
      console.log("file: CartProvider.tsx:67  addToCart  artwork", artwork);
      // if (!isAuthenticated) {
      //   notifications.show({
      //     color: "red",
      //     autoClose: 5000,
      //     message: "Please login to add items to your cart",
      //   });
      //   return;
      // }

      try {
        await API.post(`/api/cart/${user?.id}/items`, {
          items: [{ artwork: artwork.id, quantity: 1 }],
          totalCost,
        });

        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.artwork.id === artwork.id);
          if (existingItem)
            return prevCart.map((item) =>
              item.artwork.id === artwork.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          return [...prevCart, { artwork, quantity: 1 }];
        });

        notifications.show({
          color: "green",
          autoClose: 2000,
          message: "Item added to cart",
        });
      } catch (error) {
        console.error("Error adding to cart:", error);
        notifications.show({
          color: "red",
          autoClose: 5000,
          message: "Unable to add item to cart",
        });
      }
    };

    const removeFromCart = async (artworkId: string) => {
      try {
        await API.delete(`/api/cart/${user?.id}/items/${artworkId}`);

        setCart((prevCart) => prevCart.filter((item) => item.artwork.id !== artworkId));

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

    const updateQuantity = async (artworkId: string, quantity: number) => {
      try {
        await API.post(`/api/cart/${user?.id}/items/${artworkId}`, { quantity });

        setCart((prevCart) =>
          prevCart.map((item) =>
            item.artwork.id === artworkId ? { ...item, quantity: Math.max(0, quantity) } : item
          )
        );

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
  }, [cart, isLoading, user?.id]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
