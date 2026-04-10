// src/components/VibeStrip.jsx
const VIBES = [
  {
    emoji: "📺",
    title: "Sports on Every Screen",
    desc:
      "Catch the game while you sit in the chair. Big screens, the right channel, and an atmosphere that makes every visit worth coming back for.",
  },
  {
    emoji: "🍺",
    title: "Cold Drinks on the House",
    desc:
      "Complimentary drinks for VIP clients. Because what pairs better with a fresh cut than a cold one? The answer is nothing.",
  },
  {
    emoji: "✂️",
    title: "Master Barbers Only",
    desc:
      "Every barber at Chop Shop is certified, experienced, and passionate about their craft. No rookies on your head — ever.",
  },
];

export default function VibeStrip() {
  return (
    <div
      className="px-6 md:px-16 py-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0"
      style={{ background: "#2d2d2d" }}
    >
      {VIBES.map((v, i) => (
        <div
          key={v.title}
          className={`flex flex-col gap-4
            ${i > 0 ? "md:border-l md:pl-12" : ""}
            ${i < VIBES.length - 1 ? "pb-10 border-b md:pb-0 md:border-b-0" : ""}
          `}
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="text-4xl">{v.emoji}</div>
          <div className="font-barlow-cond font-bold text-[1.05rem] tracking-[2px] uppercase text-cream">
            {v.title}
          </div>
          <p className="text-[0.88rem] leading-7" style={{ color: "rgba(249,245,240,0.5)" }}>
            {v.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
