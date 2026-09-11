"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import { cartCount } from "@/lib/cart";


export default function CartButton() {
  const { lines, hydrated, setOpen } = useCart();
  const count = hydrated ? cartCount(lines) : 0;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="relative flex size-10 items-center justify-center rounded-full hover:bg-sand"
      aria-label={`Open cart, ${count} items`}
    >
      <ShoppingBag className="size-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-clay text-[11px] font-semibold text-cream">
          {count}
        </span>
      )}
    </button>
  );
}
