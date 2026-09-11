import { Leaf, Package, Star, WashingMachine } from "lucide-react";
import { Container } from "./ui";


const points = [
  { icon: Package, title: "Ships in 1 – 2 days", body: "Pre-made and packed in Canberra" },
  { icon: WashingMachine, title: "Machine & dryer safe", body: "Permanent laser debossing" },
  { icon: Leaf, title: "Eco-friendly suede", body: "100% vegan ultra-suede from Italy" },
  { icon: Star, title: "1,000+ five-star reviews", body: "Etsy Star Seller since day one" },
];


export default function TrustBar() {
  return (
    <section className="border-y border-line bg-white/60">
      <Container className="grid grid-cols-2 gap-6 py-6 md:grid-cols-4">
        {points.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sand text-clay">
              <Icon className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-ink-muted">{body}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
