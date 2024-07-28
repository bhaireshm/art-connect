"use client";

import { useAppSelector } from "@/redux";
import { useUser } from "@/redux/slices/user.slice";
import type { Artwork } from "@/types";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

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

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const response = await axios.get(`/api/cart/${user.id}`);
          if (response.data.status === 201 && response.data.data) setCart(response.data.data);
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
      }
    };

    loadCart();
  }, [user]);

  const addToCart = (artwork: Artwork) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.artwork.id === artwork.id);
      if (existingItem)
        return prevCart.map((item) =>
          item.artwork.id === artwork.id ? { ...item, quantity: item.quantity + 1 } : item
        );

      return [...prevCart, { artwork, quantity: 1 }];
    });
  };

  const removeFromCart = (artworkId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.artwork.id !== artworkId));
  };

  const updateQuantity = (artworkId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.artwork.id === artworkId ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCost = cart.reduce((total, item) => total + item.artwork.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCost,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
