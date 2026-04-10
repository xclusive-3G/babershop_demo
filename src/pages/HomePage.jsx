// src/pages/HomePage.jsx
import { SERVICES } from "../data";
import Marquee from "../components/Marquee";
import StatsBar from "../components/StatsBar";
import ServiceCard from "../components/ServiceCard";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import VibeStrip from "../components/VibeStrip";
import ContactPanel from "../components/ContactPanel";
import SectionLabel from "../components/SectionLabel";

export default function HomePage({ setPage }) {
  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="bg-ink text-cream">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-ink">
        {/* stripe bg */}
        <div className="bg-stripes absolute inset-0 pointer-events-none" />

        {/* right panel */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[48%] hidden lg:block"
          style={{
            background: "#1e1e1e",
            clipPath: "polygon(16% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        />

        {/* emoji mosaic */}
        <div
          className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden lg:grid grid-cols-2 gap-2 w-[280px] h-[360px] opacity-85 z-10"
        >
          {[
            { e: "✂️", bg: "#2a2520" },
            { e: "💈", bg: "#252525" },
            { e: "🪒", bg: "#2a2520" },
            { e: "🧔", bg: "#1c1c1c" },
          ].map(({ e, bg }, i) => (
            <div
              key={i}
              className="flex items-center justify-center text-4xl rounded-sm"
              style={{ background: bg }}
            >
              {e}
            </div>
          ))}
        </div>

        {/* content */}
        <div className="relative z-20 px-6 md:px-16 max-w-2xl pt-24">
          <div className="animate-fade-up">
            <div
              className="font-barlow-cond text-xs font-bold tracking-[5px] uppercase text-red-500 mb-5 flex items-center gap-3"
            >
              Men's Haircuts & Grooming
              <span className="block w-12 h-0.5 bg-red-500" />
            </div>

            <h1
              className="font-anton leading-[0.9] tracking-wide mb-7"
              style={{ fontSize: "clamp(3.8rem,8vw,7.5rem)" }}
            >
              LEVEL
              <br />
              <span className="text-outline">UP</span>
              <br />
              <span className="text-red-500">YOUR</span>
              <br />
              LOOK
            </h1>
          </div>

          <p
            className="text-[1.05rem] leading-7 max-w-md mb-10 animate-fade-up-1"
            style={{ color: "rgba(249,245,240,0.6)" }}
          >
            Where great cuts meet cold drinks and good vibes. Walk in looking
            average. Walk out looking like a problem.
          </p>

          <div className="flex gap-4 flex-wrap animate-fade-up-2">
            <button
              onClick={() => navigate("book")}
              className="font-barlow-cond font-bold text-sm tracking-[2px] uppercase bg-red-500 hover:bg-red-600 text-white border-0 cursor-pointer px-10 py-4 transition-all duration-200 hover:-translate-y-0.5"
            >
              Book Appointment →
            </button>
            <button
              onClick={() => navigate("services")}
              className="font-barlow-cond font-semibold text-sm tracking-[2px] uppercase bg-transparent text-cream border cursor-pointer px-10 py-4 transition-colors duration-200 hover:border-white"
              style={{ borderColor: "rgba(249,245,240,0.25)" }}
            >
              Our Services
            </button>
          </div>
        </div>

        {/* bottom stats strip */}
        <div className="absolute bottom-10 left-6 md:left-16 flex gap-10 z-20 animate-fade-up-3">
          {[["15+","Years"],["4.9★","Rating"],["6K+","Clients"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-anton text-3xl text-red-500 leading-none mb-0.5">{n}</div>
              <div
                className="font-barlow-cond text-[0.65rem] tracking-[3px] uppercase"
                style={{ color: "rgba(249,245,240,0.4)" }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Marquee />
      <StatsBar />

      {/* ── SERVICES PREVIEW ── */}
      <section className="px-6 md:px-16 py-24 bg-ink">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-8">
          <div>
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="font-anton leading-none" style={{ fontSize: "clamp(2.2rem,4.5vw,3.8rem)" }}>
              KO{" "}
              <em className="font-barlow-cond font-bold" style={{ fontStyle: "italic", color: "#d4c4a8" }}>
                Services
              </em>
            </h2>
          </div>
          <div className="flex flex-col gap-3 md:text-right">
            <p
              className="text-[0.93rem] leading-7 max-w-sm"
              style={{ color: "rgba(249,245,240,0.55)" }}
            >
              No fuss, no frills — just sharp cuts, clean shaves, and grooming that makes you walk taller.
            </p>
            <button
              onClick={() => navigate("services")}
              className="font-barlow-cond font-bold text-xs tracking-[2px] uppercase text-red-400 hover:text-red-300 bg-transparent border-0 cursor-pointer p-0 self-start md:self-end transition-colors"
            >
              View All Services →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3px]">
          {SERVICES.map((s) => (
            <ServiceCard key={s.num} service={s} onClick={() => navigate("services")} />
          ))}
        </div>
      </section>

      {/* ── SPLIT: VIBE + CONTACT ── */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* left — vibe */}
        <div className="bg-red-500 px-8 md:px-14 py-20 flex flex-col justify-center">
          <div
            className="font-barlow-cond text-xs font-bold tracking-[5px] uppercase mb-3 flex items-center gap-3"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <span className="block w-8 h-0.5 bg-white/70" />
            The Chop Shop Difference
          </div>
          <h2
            className="font-anton leading-none text-white mb-5"
            style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)" }}
          >
            WHERE THE SPORTS BAR{" "}
            <em
              className="font-barlow-cond font-bold"
              style={{ fontStyle: "italic", color: "rgba(255,255,255,0.65)" }}
            >
              MEETS
            </em>{" "}
            THE CHAIR
          </h2>
          <p
            className="leading-7 mb-8 text-[0.95rem] max-w-md"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Come for the cut, stay for the vibes. Cold drinks, big screens, and
            barbers who know what they're doing. No pressure, no pretense.
          </p>
          <button
            onClick={() => navigate("book")}
            className="font-barlow-cond font-bold text-sm tracking-[2px] uppercase bg-cream text-ink border-0 cursor-pointer px-10 py-4 transition-opacity duration-200 hover:opacity-85 self-start"
          >
            Book Your Seat
          </button>
        </div>

        {/* right — contact */}
        <ContactPanel setPage={setPage} />
      </div>

      <TestimonialsCarousel />
      <VibeStrip />

      {/* ── CTA BANNER ── */}
      <div className="bg-red-500 py-16 text-center px-6">
        <div
          className="font-barlow-cond text-xs font-bold tracking-[5px] uppercase mb-3"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          Ready?
        </div>
        <h2
          className="font-anton leading-none text-white mb-8"
          style={{ fontSize: "clamp(2rem,5vw,4rem)" }}
        >
          ELEVATE YOUR{" "}
          <em
            className="font-barlow-cond font-bold"
            style={{ fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}
          >
            STYLE GAME
          </em>
        </h2>
        <button
          onClick={() => navigate("book")}
          className="font-barlow-cond font-bold text-sm tracking-[3px] uppercase bg-cream text-ink border-0 cursor-pointer px-12 py-4 transition-opacity duration-200 hover:opacity-85"
        >
          GET KNOCKED OUT →
        </button>
      </div>
    </div>
  );
}
