"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CART_STORAGE_KEY, isCartLine, lineKey, type CartLine, type CartLineInput } from "@/lib/cart";


interface CartContextValue {
  lines: CartLine[];
  hydrated: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (input: CartLineInput) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}


const CartContext = createContext<CartContextValue | null>(null);


function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed.filter(isCartLine) : [];
  } catch {
    return [];
  }
}


function writeStorage(lines: CartLine[]) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Storage can be unavailable in private browsing; the in-memory cart still works.
  }
}


export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLines(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(lines);
  }, [lines, hydrated]);

  const add = useCallback((input: CartLineInput) => {
    const key = lineKey(input);
    const qty = input.qty ?? 1;

    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);

      if (existing) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));

      return [...prev, { ...input, key, qty }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) => (qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l))));
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({ lines, hydrated, open, setOpen, add, setQty, remove, clear }),
    [lines, hydrated, open, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);

  if (!ctx) throw new Error("useCart must be used inside CartProvider");

  return ctx;
}
