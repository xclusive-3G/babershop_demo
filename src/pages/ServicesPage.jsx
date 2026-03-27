// src/pages/ServicesPage.jsx
import { SERVICES } from "../data";
import ServiceCard from "../components/ServiceCard";
import PageHero from "../components/PageHero";
import SectionLabel from "../components/SectionLabel";

const ADD_ONS = [
  { icon: "🧖", name: "Scalp Massage",      price: "+$12", desc: "10-min relaxing scalp massage with hot oil treatment." },
  { icon: "🧴", name: "Beard Oil Treatment",price: "+$8",  desc: "Premium conditioning oil applied to beard and skin." },
  { icon: "🧣", name: "Hot Towel Wrap",     price: "+$6",  desc: "Steamed towel wrap for pores and pre-shave prep." },
  { icon: "🎨", name: "Grey Coverage",      price: "+$20", desc: "Touch up grey roots with natural-look color." },
  { icon: "👁️", name: "Brow Clean Up",      price: "+$10", desc: "Shape and clean up brows for a sharper look." },
  { icon: "💆", name: "Neck & Shoulder",    price: "+$15", desc: "Neck and shoulder tension massage, post-cut." },
];

export default function ServicesPage({ setPage }) {
  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="bg-ink text-cream">
      <PageHero
        label="What We Offer"
        title="ALL"
        titleAccent="SERVICES"
        subtitle="Every service is performed by a certified barber who takes their craft seriously. No rushing, no shortcuts — just great work."
      />

      {/* Main Services */}
      <section className="px-6 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3px] mb-3">
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.num}
              service={s}
              onClick={() => navigate("book")}
            />
          ))}
        </div>
        <p
          className="font-barlow-cond text-[0.72rem] tracking-[2px] uppercase mt-4"
          style={{ color: "rgba(249,245,240,0.3)" }}
        >
          * Click any service to book an appointment
        </p>
      </section>

      {/* Add-Ons */}
      <section
        className="px-6 md:px-16 py-20"
        style={{ background: "#0d0d0d" }}
      >
        <div className="mb-14">
          <SectionLabel>Enhance Your Visit</SectionLabel>
          <h2
            className="font-anton leading-none"
            style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}
          >
            ADD-ONS &{" "}
            <em
              className="font-barlow-cond font-bold"
              style={{ fontStyle: "italic", color: "#d4c4a8" }}
            >
              EXTRAS
            </em>
          </h2>
          <p
            className="mt-3 text-[0.93rem] leading-7 max-w-lg"
            style={{ color: "rgba(249,245,240,0.5)" }}
          >
            Upgrade any service with one of our premium add-ons. Ask your barber at the time of your appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[3px]">
          {ADD_ONS.map((a) => (
            <div
              key={a.name}
              className="p-8 transition-colors duration-200 cursor-default"
              style={{ background: "#1e1e1e" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#242424")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1e1e1e")}
            >
              <div className="text-3xl mb-4">{a.icon}</div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-barlow-cond font-bold text-base tracking-wide uppercase text-cream">
                  {a.name}
                </span>
                <span className="font-anton text-lg text-red-400">{a.price}</span>
              </div>
              <p
                className="text-[0.84rem] leading-6"
                style={{ color: "rgba(249,245,240,0.45)" }}
              >
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing note + CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          className="px-8 md:px-14 py-16 flex flex-col justify-center"
          style={{ background: "#1e1e1e" }}
        >
          <SectionLabel>Good to Know</SectionLabel>
          <h3
            className="font-anton leading-none mb-6"
            style={{ fontSize: "clamp(1.6rem,3vw,2.5rem)" }}
          >
            PRICING &{" "}
            <em
              className="font-barlow-cond font-bold"
              style={{ fontStyle: "italic", color: "#d4c4a8" }}
            >
              POLICY
            </em>
          </h3>
          <ul className="space-y-3">
            {[
              "Prices shown are starting rates and may vary by hair length or complexity.",
              "Walk-ins are welcome but appointments are always prioritized.",
              "A card is required to hold your booking — no charge until services are complete.",
              "Cancellations must be made at least 2 hours in advance to avoid a fee.",
              "We accept cash, all major cards, and contactless payments.",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-red-500 mt-0.5 flex-shrink-0 font-bold">—</span>
                <span
                  className="text-[0.88rem] leading-6"
                  style={{ color: "rgba(249,245,240,0.6)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-500 px-8 md:px-14 py-16 flex flex-col justify-center">
          <div
            className="font-barlow-cond text-xs font-bold tracking-[5px] uppercase mb-3 flex items-center gap-3"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <span className="block w-8 h-0.5 bg-white/70" />
            Ready to Book?
          </div>
          <h3
            className="font-anton leading-none text-white mb-5"
            style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)" }}
          >
            PICK YOUR{" "}
            <em
              className="font-barlow-cond font-bold"
              style={{ fontStyle: "italic", color: "rgba(255,255,255,0.65)" }}
            >
              SERVICE
            </em>{" "}
            AND LET'S GO
          </h3>
          <p className="leading-7 mb-8 text-[0.95rem]" style={{ color: "rgba(255,255,255,0.8)" }}>
            Our online booking takes less than 2 minutes. Pick your service, choose your barber, lock in your time — done.
          </p>
          <button
            onClick={() => navigate("book")}
            className="font-barlow-cond font-bold text-sm tracking-[2px] uppercase bg-cream text-ink border-0 cursor-pointer px-10 py-4 transition-opacity duration-200 hover:opacity-85 self-start"
          >
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}
