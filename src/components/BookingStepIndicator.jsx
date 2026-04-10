// src/components/BookingStepIndicator.jsx
const STEP_LABELS = [
  "Your Details",
  "Pick a Service",
  "Choose Staff",
  "Date & Time",
  "Confirm",
];

function StepDot({ n, current }) {
  const done   = current > n;
  const active = current === n;
  return (
    <div
      className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-barlow-cond font-bold text-sm transition-all duration-300 flex-shrink-0
        ${done   ? "bg-red-500 text-white"
        : active ? "bg-red-500 text-white ring-4 ring-red-500/30"
                 : "bg-grey-2 text-white/30"}`}
    >
      {done ? "✓" : n}
    </div>
  );
}

export default function BookingStepIndicator({ step }) {
  return (
    <div
      className="px-6 md:px-16 py-6 border-b"
      style={{ background: "#0d0d0d", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-center gap-0">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1;
          return (
            <div key={n} className="flex items-center">
              <StepDot n={n} current={step} />
              {i < STEP_LABELS.length - 1 && (
                <div
                  className="h-0.5 w-6 md:w-12 mx-1 transition-all duration-500"
                  style={{ background: step > n ? "#ef4444" : "#2d2d2d" }}
                />
              )}
            </div>
          );
        })}

        {/* label block */}
        <div className="ml-4 hidden sm:block">
          <div
            className="font-barlow-cond font-bold text-[0.62rem] tracking-[3px] uppercase"
            style={{ color: "rgba(249,245,240,0.35)" }}
          >
            Step {step} of {STEP_LABELS.length}
          </div>
          <div className="font-barlow-cond font-bold text-[0.82rem] tracking-wide uppercase text-cream">
            {STEP_LABELS[step - 1]}
          </div>
        </div>
      </div>

      {/* mobile label */}
      <div className="sm:hidden mt-2">
        <span
          className="font-barlow-cond font-bold text-[0.75rem] tracking-[2px] uppercase text-cream"
        >
          Step {step} / {STEP_LABELS.length} — {STEP_LABELS[step - 1]}
        </span>
      </div>
    </div>
  );
}
