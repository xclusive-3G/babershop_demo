// src/components/TestimonialsCarousel.jsx
import { TESTIMONIALS } from "../data";
import SectionLabel from "./SectionLabel";

function TestiCard({ item }) {
  return (
    <div
      className="flex-shrink-0 p-9 w-[340px]"
      style={{
        background: "#1e1e1e",
        borderTop: "3px solid #ef4444",
      }}
    >
      <div className="text-yellow-400 text-sm mb-4 tracking-wide">★★★★★</div>
      <p
        className="text-sm leading-7 mb-6 italic"
        style={{ color: "rgba(249,245,240,0.7)" }}
      >
        "{item.text}"
      </p>
      <div className="font-barlow-cond font-bold text-[0.8rem] tracking-[2px] uppercase text-cream">
        — {item.author}
      </div>
      <div
        className="font-barlow-cond text-[0.65rem] tracking-[2px] uppercase mt-1"
        style={{ color: "rgba(249,245,240,0.3)" }}
      >
        {item.service}
      </div>
    </div>
  );
}

export default function TestimonialsCarousel() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24 bg-ink overflow-hidden">
      <div className="px-6 md:px-16 text-center mb-16">
        <SectionLabel center>What They're Saying</SectionLabel>
        <h2 className="font-anton text-[clamp(2rem,4vw,3.5rem)] leading-none">
          CLIENT{" "}
          <em
            className="font-barlow-cond font-bold"
            style={{ fontStyle: "italic", color: "#d4c4a8" }}
          >
            REVIEWS
          </em>
        </h2>
      </div>

      <div className="overflow-hidden">
        <div className="testi-track gap-5 px-6">
          {doubled.map((item, i) => (
            <TestiCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
