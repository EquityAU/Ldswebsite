"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";


export default function ClearCart() {
  const { hydrated, clear } = useCart();

  useEffect(() => {
    if (hydrated) clear();
  }, [hydrated, clear]);

  return null;
}
