// src/components/BookingCalendar.jsx
// Matches Knockouts booking UI: dual-month calendar + week strip + time tabs
import { useState, useMemo } from "react";
import { HOURS } from "../data";

// ─── Deterministic booking engine ────────────────────────────────────────────
// Simulates real bookings. In production replace with API calls.
// Returns a Set of "YYYY-MM-DD|HH:MM" strings that are taken.
function buildBookedSlots() {
  const slots = new Set();
  const today = new Date();

  // Mark full days as booked (no slots available)
  const fullyBookedDays = new Set();
  for (let i = 1; i < 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dom = d.getDate();
    if (dom % 13 === 0 || dom % 17 === 5) {
      fullyBookedDays.add(toDateStr(d));
    }
  }

  // Mark individual time slots as booked
  for (let i = 0; i < 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === 0) continue;
    const ds = toDateStr(d);
    if (fullyBookedDays.has(ds)) {
      // Mark every slot
      ALL_TIMES.forEach((t) => slots.add(`${ds}|${t}`));
    } else {
      // Random-ish slots based on date math
      ALL_TIMES.forEach((t, idx) => {
        const seed = (d.getDate() * 7 + idx * 3) % 10;
        if (seed < 3) slots.add(`${ds}|${t}`); // ~30% taken
      });
    }
  }
  return { slots, fullyBookedDays };
}

const ALL_TIMES = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM",
  "3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM",
];

const MORNING_TIMES   = ALL_TIMES.filter((t) => t.includes("AM") && !t.startsWith("11"));
const LATE_MORNING    = ALL_TIMES.filter((t) => t.startsWith("11"));
const AFTERNOON_TIMES = ALL_TIMES.filter((t) => {
  const [h] = t.split(":");
  const hr = parseInt(h);
  return t.includes("PM") && (hr === 12 || hr <= 4);
});
const EVENING_TIMES   = ALL_TIMES.filter((t) => {
  const [h] = t.split(":");
  const hr = parseInt(h);
  return t.includes("PM") && hr >= 5;
});

const TIME_SECTIONS = {
  Morning:   [...MORNING_TIMES, ...LATE_MORNING],
  Afternoon: AFTERNOON_TIMES,
  Evening:   EVENING_TIMES,
};

const { slots: BOOKED_SLOTS, fullyBookedDays: FULLY_BOOKED } = buildBookedSlots();

export function isSlotTaken(dateStr, time) {
  return BOOKED_SLOTS.has(`${dateStr}|${time}`);
}

export function isDayFullyBooked(dateStr) {
  return FULLY_BOOKED.has(dateStr);
}

// ─── Utils ───────────────────────────────────────────────────────────────────
export function toDateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES_SHORT = ["SU","MO","TU","WE","TH","FR","SA"];

function buildCalendarDays(year, month) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const date    = new Date(dateStr + "T12:00:00");
    const isPast  = date < today;
    const dow     = date.getDay();
    const isClosed = HOURS[dow].hours === null;
    const isFull   = !isPast && !isClosed && isDayFullyBooked(dateStr);
    cells.push({ d, dateStr, isPast, isClosed, isFull });
  }
  return cells;
}

// ─── Single Month Grid ────────────────────────────────────────────────────────
function MonthGrid({ year, month, selectedDate, onSelect, minDate }) {
  const cells = useMemo(() => buildCalendarDays(year, month), [year, month]);
  const todayStr = toDateStr(new Date());

  return (
    <div className="flex-1 min-w-0">
      {/* Month title */}
      <div className="text-center font-semibold text-gray-700 mb-4 text-sm tracking-wide">
        {MONTH_NAMES[month]} {year}
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES_SHORT.map((d) => (
          <div
            key={d}
            className="text-center text-[0.65rem] font-semibold tracking-widest py-1"
            style={{ color: d === "SU" ? "#dc2626" : "#9ca3af" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((cell, i) => {
          if (!cell) return <div key={`blank-${i}`} />;

          const isSelected   = selectedDate === cell.dateStr;
          const isToday      = cell.dateStr === todayStr;
          const isSelectable = !cell.isPast && !cell.isClosed && !cell.isFull;

          let bg = "transparent";
          let textColor = "#374151";
          let border = "transparent";
          let cursor = "default";
          let opacity = "1";
          let fontWeight = "400";

          if (isSelected) {
            bg = "#dc2626"; textColor = "#fff"; fontWeight = "700";
          } else if (cell.isPast) {
            textColor = "#d1d5db"; opacity = "0.5";
          } else if (cell.isClosed) {
            textColor = "#d1d5db"; opacity = "0.4";
          } else if (cell.isFull) {
            textColor = "#9ca3af"; opacity = "0.5";
          } else {
            cursor = "pointer"; textColor = "#111827"; fontWeight = "500";
          }

          if (isToday && !isSelected) border = "#dc2626";

          return (
            <div
              key={cell.dateStr}
              onClick={() => isSelectable && onSelect(cell.dateStr)}
              className="flex items-center justify-center aspect-square text-sm relative transition-all duration-100 rounded-full mx-auto"
              style={{
                width: "36px", height: "36px",
                background: bg,
                color: textColor,
                border: `2px solid ${border}`,
                cursor,
                opacity,
                fontWeight,
              }}
              onMouseEnter={(e) => {
                if (isSelectable && !isSelected)
                  e.currentTarget.style.background = "#fee2e2";
              }}
              onMouseLeave={(e) => {
                if (!isSelected)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              {cell.d}
              {cell.isFull && !cell.isPast && !cell.isClosed && (
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-300"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Week Strip ───────────────────────────────────────────────────────────────
export function WeekStrip({ selectedDate, onSelect }) {
  const today = new Date();
  today.setHours(0,0,0,0);

  // Build 7-day strip starting from Monday of the week containing selectedDate
  const anchor = selectedDate ? new Date(selectedDate + "T12:00:00") : new Date();
  const dow    = anchor.getDay(); // 0=Sun
  const monday = new Date(anchor);
  monday.setDate(anchor.getDate() - ((dow + 6) % 7)); // go back to Monday

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const ds   = toDateStr(d);
    const isPast   = d < today;
    const isClosed = HOURS[d.getDay()].hours === null;
    const isFull   = !isPast && !isClosed && isDayFullyBooked(ds);
    days.push({
      dateStr: ds,
      dayName: ["MON","TUE","WED","THU","FRI","SAT","SUN"][i],
      monthAbbr: MONTH_NAMES[d.getMonth()].slice(0,3),
      date: d.getDate(),
      isPast, isClosed, isFull,
    });
  }

  return (
    <div className="flex gap-1 mb-6">
      {days.map((day) => {
        const isSelected   = selectedDate === day.dateStr;
        const isSelectable = !day.isPast && !day.isClosed && !day.isFull;

        return (
          <div
            key={day.dateStr}
            onClick={() => isSelectable && onSelect(day.dateStr)}
            className="flex-1 flex flex-col items-center py-3 rounded transition-all duration-150"
            style={{
              cursor: isSelectable ? "pointer" : "default",
              background: isSelected ? "#dc2626" : day.isPast || day.isClosed || day.isFull ? "#f3f4f6" : "#fff",
              border: isSelected ? "2px solid #dc2626" : "2px solid #e5e7eb",
              opacity: day.isPast || day.isClosed ? 0.45 : 1,
            }}
            onMouseEnter={(e) => {
              if (isSelectable && !isSelected)
                e.currentTarget.style.background = "#fee2e2";
            }}
            onMouseLeave={(e) => {
              if (!isSelected)
                e.currentTarget.style.background = day.isPast || day.isClosed || day.isFull ? "#f3f4f6" : "#fff";
            }}
          >
            <span
              className="text-[0.6rem] font-bold tracking-widest uppercase"
              style={{ color: isSelected ? "rgba(255,255,255,0.8)" : "#9ca3af" }}
            >
              {day.dayName}
            </span>
            <span
              className="text-[0.7rem] mt-0.5"
              style={{ color: isSelected ? "rgba(255,255,255,0.75)" : "#9ca3af" }}
            >
              {day.monthAbbr}
            </span>
            <span
              className="text-base font-bold mt-0.5"
              style={{ color: isSelected ? "#fff" : day.isClosed || day.isPast || day.isFull ? "#d1d5db" : "#111827" }}
            >
              {day.date}
            </span>
          </div>
        );
      })}

      {/* Next week arrow */}
      <button
        onClick={() => {
          const next = new Date(monday);
          next.setDate(monday.getDate() + 7);
          onSelect(toDateStr(next));
        }}
        className="w-10 flex items-center justify-center text-red-500 hover:text-red-700 border-0 bg-transparent cursor-pointer text-xl font-bold transition-colors"
      >
        →
      </button>
    </div>
  );
}

// ─── Time Slot Grid ───────────────────────────────────────────────────────────
export function TimeSlotGrid({ dateStr, selectedTime, onSelect }) {
  const [tab, setTab] = useState("Morning");
  const [showAll, setShowAll] = useState(false);

  const times = TIME_SECTIONS[tab] || [];
  const visible = showAll ? times : times.slice(0, 15);

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-5 p-3 rounded-lg" style={{ background: "#fef2f2" }}>
        {["Morning", "Afternoon", "Evening"].map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setShowAll(false); }}
            className="flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-150 border-0 cursor-pointer"
            style={{
              background: tab === t ? "#fff" : "transparent",
              color: tab === t ? "#111827" : "#6b7280",
              boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Slots */}
      {times.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No slots in this period.</p>
      ) : (
        <>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {visible.map((t) => {
              const taken    = isSlotTaken(dateStr, t);
              const selected = selectedTime === t;

              return (
                <button
                  key={t}
                  disabled={taken}
                  onClick={() => !taken && onSelect(t)}
                  className="py-3 px-2 text-sm font-medium rounded transition-all duration-150 border cursor-pointer"
                  style={{
                    background: selected ? "#dc2626" : taken ? "#f9fafb" : "#fff",
                    color: selected ? "#fff" : taken ? "#d1d5db" : "#374151",
                    borderColor: selected ? "#dc2626" : taken ? "#f3f4f6" : "#e5e7eb",
                    cursor: taken ? "not-allowed" : "pointer",
                    textDecoration: taken ? "line-through" : "none",
                    opacity: taken ? 0.55 : 1,
                    fontWeight: selected ? 700 : 500,
                    boxShadow: selected ? "0 0 0 3px rgba(220,38,38,0.2)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!taken && !selected) {
                      e.currentTarget.style.borderColor = "#dc2626";
                      e.currentTarget.style.color = "#dc2626";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!taken && !selected) {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.color = "#374151";
                    }
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {times.length > 15 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="mt-4 w-full text-sm font-semibold text-red-500 hover:text-red-700 bg-transparent border-0 cursor-pointer py-2 transition-colors"
            >
              SHOW MORE
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ─── Main Dual-Month Calendar ─────────────────────────────────────────────────
export default function BookingCalendar({ selectedDate, onSelect }) {
  const today = new Date();
  const [startMonth, setStartMonth] = useState({ y: today.getFullYear(), m: today.getMonth() });

  const nextMonth = startMonth.m === 11
    ? { y: startMonth.y + 1, m: 0 }
    : { y: startMonth.y, m: startMonth.m + 1 };

  const goNext = () => setStartMonth(nextMonth);
  const goPrev = () => {
    const isCurrentMonth = startMonth.y === today.getFullYear() && startMonth.m === today.getMonth();
    if (isCurrentMonth) return;
    setStartMonth(
      startMonth.m === 0
        ? { y: startMonth.y - 1, m: 11 }
        : { y: startMonth.y, m: startMonth.m - 1 }
    );
  };

  const isCurrentMonth = startMonth.y === today.getFullYear() && startMonth.m === today.getMonth();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* TODAY button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => onSelect(toDateStr(today))}
          className="font-semibold text-sm px-5 py-1.5 rounded border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-150 bg-transparent cursor-pointer"
        >
          TODAY
        </button>
      </div>

      {/* Dual month grid */}
      <div className="flex gap-8 mb-2">
        <MonthGrid year={startMonth.y} month={startMonth.m} selectedDate={selectedDate} onSelect={onSelect} />
        <MonthGrid year={nextMonth.y}  month={nextMonth.m}  selectedDate={selectedDate} onSelect={onSelect} />
      </div>

      {/* Navigation */}
      <div className="flex justify-end mt-4 gap-2">
        <button
          onClick={goPrev}
          disabled={isCurrentMonth}
          className="w-9 h-9 rounded-full flex items-center justify-center border text-lg font-bold transition-all"
          style={{
            borderColor: isCurrentMonth ? "#e5e7eb" : "#e5e7eb",
            color: isCurrentMonth ? "#d1d5db" : "#374151",
            cursor: isCurrentMonth ? "not-allowed" : "pointer",
            background: "transparent",
          }}
          onMouseEnter={(e) => { if (!isCurrentMonth) e.currentTarget.style.borderColor = "#dc2626"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
        >
          ‹
        </button>
        <button
          onClick={goNext}
          className="w-9 h-9 rounded-full flex items-center justify-center border text-lg font-bold transition-all cursor-pointer"
          style={{ borderColor: "#e5e7eb", color: "#374151", background: "transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#dc2626"; e.currentTarget.style.color = "#dc2626"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151"; }}
        >
          ›
        </button>
      </div>
    </div>
  );
}
