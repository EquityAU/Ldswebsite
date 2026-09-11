import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { SHIPPING } from "@/data/taxonomy";
import { money } from "@/lib/pricing";


export const metadata: Metadata = {
  title: "Shipping & returns",
  description: "Dispatch times, shipping rates and our returns policy.",
};


export default function ShippingPage() {
  return (
    <InfoPage eyebrow="Help" title="Shipping & returns" intro="Pre-made labels leave our Canberra studio within one to two business days of your order.">
      <h2>Australia</h2>
      <ul>
        <li>
          Tracked shipping is {money(SHIPPING.domesticCents)}, or free on orders over {money(SHIPPING.freeThresholdCents)}.
        </li>
        <li>Delivery usually takes {SHIPPING.domesticEta} with Australia Post.</li>
      </ul>

      <h2>International</h2>
      <ul>
        <li>Tracked international shipping is a flat {money(SHIPPING.internationalCents)} AUD.</li>
        <li>Delivery usually takes {SHIPPING.internationalEta}. Any import duties are the responsibility of the recipient.</li>
      </ul>

      <h2>Returns</h2>
      <p>
        If your labels arrive damaged or are not what you ordered, email us within 14 days with a photo and we will replace them or refund you, no fuss. Because
        each pack is cut to order in small batches, we cannot accept change-of-mind returns on opened packs.
      </p>

      <h2>Something else?</h2>
      <p>
        We are a small studio and we reply quickly. <a href="/contact">Get in touch</a>.
      </p>
    </InfoPage>
  );
}
