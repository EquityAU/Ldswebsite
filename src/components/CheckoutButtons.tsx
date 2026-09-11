"use client";

import { useEffect, useRef, useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import clsx from "clsx";
import type { CartLine } from "@/lib/cart";
import type { ShippingRegion } from "@/lib/checkout";
import { useCart } from "./CartProvider";
import { Button } from "./ui";


interface Props {
  lines: CartLine[];
  region: ShippingRegion;
}


type PaypalButtons = {
  Buttons: (options: {
    style?: Record<string, string | number | boolean>;
    createOrder: () => Promise<string>;
    onApprove: (data: { orderID: string }) => Promise<void>;
    onError?: (err: unknown) => void;
  }) => { render: (el: HTMLElement) => Promise<void>; close?: () => void };
};


declare global {
  interface Window {
    paypal?: PaypalButtons;
  }
}


async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };

  if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`);

  return data;
}


function usePaypalSdk(clientId: string | undefined): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!clientId) return;
    if (window.paypal) {
      setReady(true);

      return;
    }

    const existing = document.querySelector<HTMLScriptElement>("script[data-paypal-sdk]");
    const script = existing ?? document.createElement("script");

    if (!existing) {
      script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=AUD&intent=capture&components=buttons`;
      script.async = true;
      script.dataset.paypalSdk = "true";
      document.body.appendChild(script);
    }

    const onLoad = () => setReady(true);

    script.addEventListener("load", onLoad);

    return () => script.removeEventListener("load", onLoad);
  }, [clientId]);

  return ready;
}


export default function CheckoutButtons({ lines, region }: Props) {
  const { clear } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const paypalReady = usePaypalSdk(paypalClientId);
  const paypalHost = useRef<HTMLDivElement>(null);
  const latest = useRef({ lines, region });

  latest.current = { lines, region };

  async function startStripe() {
    setBusy(true);
    setError(null);

    try {
      const { url } = await postJson<{ url: string }>("/api/checkout/stripe", { lines, region });

      window.location.assign(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout");
      setBusy(false);
    }
  }

  useEffect(() => {
    const host = paypalHost.current;

    if (!paypalReady || !window.paypal || !host) return;

    host.innerHTML = "";

    const buttons = window.paypal.Buttons({
      style: { layout: "horizontal", color: "gold", shape: "pill", height: 48, tagline: false },
      createOrder: async () => {
        setError(null);

        const { id } = await postJson<{ id: string }>("/api/checkout/paypal/create", latest.current);

        return id;
      },
      onApprove: async ({ orderID }) => {
        const { id } = await postJson<{ id: string }>("/api/checkout/paypal/capture", { orderId: orderID, ...latest.current });

        clear();
        window.location.assign(`/checkout/success?provider=paypal&order=${encodeURIComponent(id)}`);
      },
      onError: (err) => setError(err instanceof Error ? err.message : "PayPal checkout failed"),
    });

    buttons.render(host).catch(() => setError("PayPal buttons could not be displayed"));

    return () => buttons.close?.();
  }, [paypalReady, clear]);

  return (
    <div className="space-y-3">
      <Button onClick={startStripe} disabled={busy || lines.length === 0} className="h-12 w-full text-base">
        {busy ? <Loader2 className="size-5 animate-spin" /> : <CreditCard className="size-5" />}
        Pay with card, Apple Pay or Google Pay
      </Button>

      <div className={clsx("min-h-12", !paypalClientId && "hidden")} ref={paypalHost} />

      {!paypalClientId && (
        <p className="text-center text-xs text-ink-muted">PayPal appears here once NEXT_PUBLIC_PAYPAL_CLIENT_ID is set.</p>
      )}

      {error && <p className="rounded-xl bg-clay-soft px-3 py-2 text-sm text-clay-dark">{error}</p>}

      <p className="text-center text-xs text-ink-muted">Apple Pay and Google Pay show automatically on supported devices at the card checkout.</p>
    </div>
  );
}
