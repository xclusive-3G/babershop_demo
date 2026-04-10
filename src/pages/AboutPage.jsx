// src/pages/AboutPage.jsx
import SectionLabel from "../components/SectionLabel";
import PageHero from "../components/PageHero";
import TestimonialsCarousel from "../components/TestimonialsCarousel";

const TEAM = [
  {
    name: "Marcus",
    role: "Head Barber",
    specialty: "Fades & Tapers",
    years: "12 yrs",
    emoji: "✂️",
    bio: "Marcus has been cutting hair since he was 16. His fades are so clean they've been described as surgical. Specializes in textured hair and skin fades.",
  },
  {
    name: "Diego",
    role: "Senior Barber",
    specialty: "Classic Cuts",
    years: "8 yrs",
    emoji: "💈",
    bio: "Diego is a student of the classics — pompadours, side parts, and everything your grandfather wished he could still get. Precision is his religion.",
  },
  {
    name: "Tyrell",
    role: "Grooming Specialist",
    specialty: "Beard & Razor",
    years: "6 yrs",
    emoji: "🪒",
    bio: "If it involves a straight razor or a beard, Tyrell is your guy. His hot towel shaves have a cult following. Clients schedule weeks in advance.",
  },
  {
    name: "Kai",
    role: "Barber",
    specialty: "Modern Styles",
    years: "4 yrs",
    emoji: "🧔",
    bio: "Kai brings the freshest modern techniques to Chop Shop. Drop fades, disconnected undercuts, textured crops — Kai stays ahead of the trends.",
  },
];

const VALUES = [
  { icon: "🎯", title: "Precision First", desc: "Every cut is deliberate. We don't rush, we don't wing it — we listen, we plan, then we execute." },
  { icon: "🤝", title: "Everyone Welcome", desc: "Our services are available to all regardless of race, gender, or background. Everyone deserves to feel sharp." },
  { icon: "🏆", title: "Always Improving", desc: "Our barbers train continuously. New techniques, new styles, new tools — we invest in staying excellent." },
  { icon: "🍺", title: "Good Vibes Only", desc: "We built a space that feels like a sports bar and a barbershop had a baby — because why shouldn't getting a haircut be fun?" },
];

export default function AboutPage({ setPage }) {
  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="bg-ink text-cream">
      <PageHero
        label="Our Story"
        title="ABOUT"
        titleAccent="CHOP SHOP"
        subtitle="We started in 2009 with one chair, one barber, and a belief that a great haircut should be the highlight of your week — not just a checkbox."
      />

      {/* ── Origin Story ── */}
      <section className="px-6 md:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel>Est. 2009</SectionLabel>
          <h2
            className="font-anton leading-none mb-6"
            style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}
          >
            WHERE IT ALL{" "}
            <em className="font-barlow-cond font-bold" style={{ fontStyle: "italic", color: "#d4c4a8" }}>
              STARTED
            </em>
          </h2>
          <div className="space-y-4 text-[0.95rem] leading-7" style={{ color: "rgba(249,245,240,0.65)" }}>
            <p>
              Chop Shop opened in 2009 in a tiny street-level unit on King Street with a single barber chair, a TV showing the game, and a cooler full of cold drinks. The idea was simple: make getting a haircut feel like something worth looking forward to.
            </p>
            <p>
              Word spread fast. Within two years we expanded to four chairs and hired our first team of master barbers. By 2015, Chop Shop had a waitlist.
            </p>
            <p>
              Today we serve thousands of clients every year, but the philosophy hasn't changed: show up, do great work, make people feel good, and always have the game on.
            </p>
          </div>
        </div>

        {/* stats tiles */}
        <div className="grid grid-cols-2 gap-[3px]">
          {[
            { num: "2009", label: "Founded" },
            { num: "4",    label: "Barbers" },
            { num: "6K+",  label: "Clients" },
            { num: "4.9★", label: "Rating" },
          ].map((s) => (
            <div
              key={s.label}
              className="p-10 text-center"
              style={{ background: "#1e1e1e" }}
            >
              <div className="font-anton text-[2.8rem] text-red-500 leading-none mb-2">{s.num}</div>
              <div
                className="font-barlow-cond text-[0.72rem] tracking-[3px] uppercase"
                style={{ color: "rgba(249,245,240,0.4)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="px-6 md:px-16 py-20" style={{ background: "#0d0d0d" }}>
        <SectionLabel>What We Stand For</SectionLabel>
        <h2
          className="font-anton leading-none mb-12"
          style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}
        >
          OUR{" "}
          <em className="font-barlow-cond font-bold" style={{ fontStyle: "italic", color: "#d4c4a8" }}>
            VALUES
          </em>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[3px]">
          {VALUES.map((v) => (
            <div key={v.title} className="p-10" style={{ background: "#1e1e1e" }}>
              <div className="text-3xl mb-4">{v.icon}</div>
              <div className="font-barlow-cond font-bold text-base tracking-wide uppercase text-cream mb-3">
                {v.title}
              </div>
              <p className="text-[0.88rem] leading-7" style={{ color: "rgba(249,245,240,0.5)" }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="px-6 md:px-16 py-20 bg-ink">
        <SectionLabel>The Crew</SectionLabel>
        <h2
          className="font-anton leading-none mb-12"
          style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}
        >
          MEET THE{" "}
          <em className="font-barlow-cond font-bold" style={{ fontStyle: "italic", color: "#d4c4a8" }}>
            BARBERS
          </em>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[3px]">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="p-8 group cursor-pointer transition-colors duration-200"
              style={{ background: "#1e1e1e" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#242424")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1e1e1e")}
            >
              {/* avatar */}
              <div
                className="w-16 h-16 flex items-center justify-center text-3xl rounded-full mb-5"
                style={{ background: "#2d2d2d" }}
              >
                {member.emoji}
              </div>

              <div className="font-barlow-cond font-bold text-[0.62rem] tracking-[3px] uppercase text-red-400 mb-1">
                {member.role} · {member.years}
              </div>
              <div className="font-anton text-xl tracking-wide text-cream mb-1">{member.name}</div>
              <div
                className="font-barlow-cond font-semibold text-[0.72rem] tracking-[2px] uppercase mb-4"
                style={{ color: "rgba(249,245,240,0.35)" }}
              >
                {member.specialty}
              </div>
              <p
                className="text-[0.84rem] leading-6"
                style={{ color: "rgba(249,245,240,0.5)" }}
              >
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <TestimonialsCarousel />

      {/* CTA */}
      <div className="bg-red-500 py-16 text-center px-6">
        <h2
          className="font-anton leading-none text-white mb-6"
          style={{ fontSize: "clamp(2rem,5vw,4rem)" }}
        >
          COME EXPERIENCE IT{" "}
          <em className="font-barlow-cond font-bold" style={{ fontStyle: "italic", color: "rgba(255,255,255,0.65)" }}>
            YOURSELF
          </em>
        </h2>
        <button
          onClick={() => navigate("book")}
          className="font-barlow-cond font-bold text-sm tracking-[3px] uppercase bg-cream text-ink border-0 cursor-pointer px-12 py-4 transition-opacity duration-200 hover:opacity-85"
        >
          BOOK NOW →
        </button>
      </div>
    </div>
  );
}
