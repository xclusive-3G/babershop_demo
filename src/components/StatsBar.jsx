// src/components/StatsBar.jsx
import { STATS } from "../data";

export default function StatsBar() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          className="py-10 px-8 text-center"
          style={{
            borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}
        >
          <div className="font-anton text-5xl text-red-500 leading-none mb-2">
            {stat.num}
          </div>
          <div
            className="font-barlow-cond text-[0.72rem] tracking-[3px] uppercase"
            style={{ color: "rgba(249,245,240,0.4)" }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
