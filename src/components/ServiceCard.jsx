// src/components/ServiceCard.jsx
export default function ServiceCard({ service, onClick, selected = false }) {
  const { num, icon, title, desc, price, tag, duration } = service;

  return (
    <div
      className="service-card p-8 md:p-10 group"
      onClick={onClick}
      style={selected ? { backgroundColor: "#2a1a1a", outline: "2px solid #ef4444" } : {}}
    >
      {/* Ghost number */}
      <div
        className="absolute top-4 right-5 font-anton leading-none pointer-events-none select-none"
        style={{ fontSize: "4.5rem", color: "rgba(255,255,255,0.035)" }}
      >
        {num}
      </div>

      <div className="text-3xl mb-5">{icon}</div>

      <div className="font-barlow-cond font-bold text-lg tracking-wide uppercase mb-3 text-cream">
        {title}
      </div>

      <p className="text-sm leading-7 mb-7" style={{ color: "rgba(249,245,240,0.5)" }}>
        {desc}
      </p>

      <div className="flex items-end justify-between">
        <div>
          <span className="font-anton text-[2.2rem] tracking-wide text-cream">{price}</span>
          <span
            className="font-barlow-cond text-[0.78rem] text-red-400 font-semibold ml-2 tracking-[2px] align-super"
          >
            {tag}
          </span>
        </div>
        <div
          className="font-barlow-cond text-[0.7rem] tracking-[2px] uppercase"
          style={{ color: "rgba(249,245,240,0.3)" }}
        >
          {duration}
        </div>
      </div>

      {selected && (
        <div className="absolute top-4 left-10 font-barlow-cond text-[0.62rem] tracking-[3px] uppercase text-red-400 font-bold">
          ✓ Selected
        </div>
      )}
    </div>
  );
}
