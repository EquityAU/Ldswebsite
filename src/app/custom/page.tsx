import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import InfoPage from "@/components/InfoPage";
import { SITE } from "@/lib/site";
import { ButtonLink } from "@/components/ui";


export const metadata: Metadata = {
  title: "Custom labels",
  description: "Custom laser debossed velvet and vegan suede labels with your logo, name or wording.",
};


export default function CustomPage() {
  const subject = encodeURIComponent("Custom label enquiry");
  const bodyText = encodeURIComponent(
    "Hi Little Design Studio,\n\nI'd like a quote for custom labels.\n\nFabric (velvet / suede):\nSize & shape:\nColour:\nQuantity:\nWording or logo (attach artwork if you have it):\n\nThanks!",
  );

  return (
    <InfoPage eyebrow="Custom labels" title="Your logo, our laser" intro="Custom is where we started. Send us your artwork or wording and we will deboss it into velvet or vegan suede in any of our shapes and sizes.">
      <h2>What we need from you</h2>
      <ul>
        <li>Your logo as a vector file (SVG, AI, PDF) or a high resolution PNG. Plain wording is fine too, just tell us the font style you like.</li>
        <li>The fabric, shape, size and colour. Browse the pre-made shop for the options, or ask and we will recommend one.</li>
        <li>Quantity. Custom orders start at 25 labels, and 500+ labels qualify for substantial savings.</li>
      </ul>

      <h2>How it works</h2>
      <ul>
        <li>Email us with the details above and we will send a digital proof and quote within a business day.</li>
        <li>Approve the proof, pay the invoice, and we cut and deboss your labels within 3 – 5 business days.</li>
        <li>Labels ship tracked from Canberra, free within Australia over $60.</li>
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href={`mailto:${SITE.email}?subject=${subject}&body=${bodyText}`}>
          <Mail className="size-4" />
          Email a custom enquiry
        </ButtonLink>
        <ButtonLink href={SITE.etsy} variant="secondary" target="_blank" rel="noreferrer">
          Order custom on Etsy
          <ArrowUpRight className="size-4" />
        </ButtonLink>
      </div>
    </InfoPage>
  );
}
