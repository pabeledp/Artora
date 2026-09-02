'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ArtWork } from './art-data';

export interface CartItem {
  art: ArtWork;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (art: ArtWork) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalBDT: number;
  totalUSD: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  totalCount: 0,
  totalBDT: 0,
  totalUSD: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('artora_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem('artora_cart', JSON.stringify(newItems));
  };

  const addItem = (art: ArtWork) => {
    const existing = items.find((item) => item.art.id === art.id);
    if (existing) {
      setIsCartOpen(true);
      return;
    }
    const updated = [...items, { art, quantity: 1 }];
    saveCart(updated);
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.art.id !== id);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalBDT = items.reduce((sum, item) => sum + item.art.priceBDT * item.quantity, 0);
  const totalUSD = items.reduce((sum, item) => sum + item.art.priceUSD * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        totalCount,
        totalBDT,
        totalUSD,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
