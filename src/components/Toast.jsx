// src/components/Toast.jsx
export default function Toast({ msg, show, type = "default" }) {
  const borderColor = type === "success" ? "#22c55e" : type === "error" ? "#ef4444" : "#ef4444";

  return (
    <div
      className="fixed bottom-8 right-6 z-[999] px-6 py-3.5 font-barlow-cond font-bold text-sm tracking-wide transition-all duration-300 pointer-events-none"
      style={{
        background: "#f9f5f0",
        color: "#111010",
        borderLeft: `4px solid ${borderColor}`,
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(16px)",
        maxWidth: "320px",
        boxShadow: show ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
      }}
    >
      {msg}
    </div>
  );
}
