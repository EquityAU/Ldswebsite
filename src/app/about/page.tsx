import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { SITE } from "@/lib/site";


export const metadata: Metadata = {
  title: "About",
  description: "Little Design Studio makes laser debossed velvet and vegan suede labels in Canberra, Australia.",
};


export default function AboutPage() {
  return (
    <InfoPage eyebrow="Our story" title="A small studio with a very precise laser" intro="Little Design Studio started on Etsy making custom labels, one order at a time, for makers who wanted their work to look finished.">
      <h2>From custom to pre-made</h2>
      <p>
        After more than a thousand five-star reviews and thousands of custom designs, the same phrases kept coming up. Handmade. Made with love. Made by Nan.
        So we made them ahead of time. Every label in this shop is cut and debossed in small batches, packed and ready to send the day you order.
      </p>

      <h2>How they are made</h2>
      <p>
        Designs are debossed into the fabric with a German-engineered industrial laser. There is no ink, no print and nothing to peel. The mark is part of the
        fabric, which is why our labels survive the washing machine and the dryer without losing their charm.
      </p>

      <h2>Two fabrics we stand behind</h2>
      <p>
        Our lux velvet has a plush pile that catches the light. Our vegan suede is a 100% eco-friendly ultra-suede from Italy with a matte, buttery face. Both sew
        easily by hand or on a home machine.
      </p>

      <h2>Still want something custom?</h2>
      <p>
        We never stopped. Bring your logo or wording to our <a href="/custom">custom labels</a> page, or find us on{" "}
        <a href={SITE.etsy} target="_blank" rel="noreferrer">
          Etsy
        </a>
        .
      </p>
    </InfoPage>
  );
}
