// src/components/Marquee.jsx
const ITEMS = [
  "Haircuts", "Beard Trims", "Hot Towel Shaves",
  "Scalp Massage", "Kids Cuts", "Walk-ins Welcome", "Book Online",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="bg-red-500 py-3.5 overflow-hidden whitespace-nowrap select-none">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-anton text-[0.88rem] tracking-[4px] uppercase text-white mx-7 inline-flex items-center gap-3"
          >
            {item}
            {i < doubled.length - 1 && (
              <span className="text-white/30 text-[0.4rem] leading-none">●</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
