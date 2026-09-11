import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";


export const metadata: Metadata = {
  title: "FAQ & care guide",
  description: "Answers about sizing, sewing, washing and shipping for Little Design Studio labels.",
};


const faqs = [
  {
    id: "which-size",
    q: "Which size should I choose?",
    a: "Slim and Classic rectangles (46 – 50 mm wide) suit most garments, beanies and bags. Standard and Large rectangles give a phrase and an icon room to breathe on quilts and blankets. Mini squares and circles are ideal for cuffs, collars and size tags. Every product page has a relative-size preview toggle so you can compare.",
  },
  {
    id: "velvet-or-suede",
    q: "Velvet or vegan suede?",
    a: "Velvet is plush and a little more luxurious, and the deboss reads as a soft sheen. Vegan suede is flatter, matte and slightly thinner, so it sits very neatly on lighter fabrics. Both wash and dry the same way.",
  },
  {
    id: "sewing",
    q: "How do I attach a label?",
    a: "Hand stitch or machine sew around the edge with a matching or contrasting thread. Neither fabric frays, so there is no need to fold the edges under. Fold-over labels are caught in a seam with the fold facing out.",
  },
  {
    id: "care",
    q: "Can I wash them?",
    a: "Yes. Both fabrics are machine washable on a cold, gentle cycle and can be tumble dried on low. The design is debossed rather than printed, so it will not peel or fade. To refresh velvet after washing, hold it near steam and brush the pile lightly.",
  },
  {
    id: "colours",
    q: "Will the colour match the preview?",
    a: "Previews are renderings, not photographs. Screens vary, and real velvet is richer and deeper than any screen can show. If you are matching a specific yarn or fabric, get in touch and we can send a swatch photo.",
  },
  {
    id: "mixed-packs",
    q: "Can I mix colours or designs in one pack?",
    a: "Each pack is one design in one colour so we can keep prices low and ship the same day. To mix, add several packs of 10 to your cart. Orders over $60 ship free within Australia.",
  },
  {
    id: "custom",
    q: "Can I get my own logo or name?",
    a: "Absolutely. Custom labels are our specialty. Head to the custom labels page to send us your artwork or wording.",
  },
  {
    id: "international",
    q: "Do you ship internationally?",
    a: "Yes, with tracking. International shipping is a flat $14.95 AUD and typically takes 10 – 21 business days depending on destination.",
  },
];


export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <InfoPage eyebrow="Help" title="Questions, answered" intro="Everything makers ask us before their first order, plus how to look after your labels.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.id} id={f.id} className="group rounded-card border border-line bg-white p-5 open:shadow-card">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-ink">
              {f.q}
              <span className="text-ink-muted transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3">{f.a}</p>
          </details>
        ))}
      </div>
    </InfoPage>
  );
}
