import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { SITE } from "@/lib/site";


export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Little Design Studio about an order or a custom label.",
};


export default function ContactPage() {
  return (
    <InfoPage eyebrow="Say hello" title="Contact the studio" intro="Questions about an order, a colour match or a custom design? We usually reply within a business day.">
      <h2>Email</h2>
      <p>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>

      <h2>Etsy</h2>
      <p>
        You can also message us through our{" "}
        <a href={SITE.etsy} target="_blank" rel="noreferrer">
          Etsy shop
        </a>
        , where we have been a Star Seller since day one.
      </p>

      <h2>Studio</h2>
      <p>{SITE.location}. We are an online studio and do not have a shopfront, but every order is packed here by hand.</p>
    </InfoPage>
  );
}
