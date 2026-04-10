// src/components/SectionLabel.jsx
export default function SectionLabel({ children, center = false, light = false }) {
  return (
    <div
      className={`font-barlow-cond text-xs font-bold tracking-[5px] uppercase mb-3 flex items-center gap-3
        ${center ? "justify-center" : ""}
        ${light ? "text-white/70" : "text-red-500"}`}
    >
      <span
        className={`block w-8 h-0.5 flex-shrink-0 ${light ? "bg-white/70" : "bg-red-500"}`}
      />
      {children}
    </div>
  );
}
