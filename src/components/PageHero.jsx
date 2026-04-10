// src/components/PageHero.jsx
import SectionLabel from "./SectionLabel";

export default function PageHero({ label, title, titleAccent, subtitle, children }) {
  return (
    <div
      className="relative px-6 md:px-16 py-20 overflow-hidden"
      style={{ background: "#1e1e1e" }}
    >
      {/* diagonal stripes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(255,255,255,0.015) 60px, rgba(255,255,255,0.015) 62px)",
        }}
      />
      <div className="relative z-10">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="font-anton leading-none mb-4" style={{ fontSize: "clamp(2.6rem,6vw,5.5rem)" }}>
          {title}{" "}
          {titleAccent && (
            <em
              className="font-barlow-cond font-bold"
              style={{ fontStyle: "italic", color: "#d4c4a8" }}
            >
              {titleAccent}
            </em>
          )}
        </h1>
        {subtitle && (
          <p
            className="text-[0.95rem] leading-7 max-w-lg mt-2"
            style={{ color: "rgba(249,245,240,0.55)" }}
          >
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
