// src/pages/BookPage.jsx
import { useState } from "react";
import { SERVICES, HOURS } from "../data";
import PageHero from "../components/PageHero";
import BookingStepIndicator from "../components/BookingStepIndicator";
import ServiceCard from "../components/ServiceCard";
import BookingCalendar, { WeekStrip, TimeSlotGrid } from "../components/BookingCalendar";
import { FormInput, FormTextarea } from "../components/FormFields";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";
import SectionLabel from "../components/SectionLabel";
<<<<<<< HEAD
// import { submitBooking } from "../services/api";
import supabase from "../config/supaClient";

const submitBooking = async (bookingData) => {
  if(!bookingData.fn || !bookingData.ln || !bookingData.phone || !bookingData.email || !bookingData.service || !bookingData.date || !bookingData.time || !bookingData.barber  || !bookingData.notes) {
    // showToast("Please fill in all required fields.", "error");
    console.error("Validation failed: Missing required fields");
    return;
  } else {
    const { data, error } = await supabase
      .from('BarberShop')
      .insert([{first_name: bookingData.fn, last_name: bookingData.ln, phone: bookingData.phone, email: bookingData.email, service: bookingData.service, date: bookingData.date, time: bookingData.time, barber: bookingData.barber, notes: bookingData.notes }]);

      if (error) {
        console.error("Error submitting booking:", error);
        // showToast("Failed to submit booking. Please try again.", "error");
      } else {
        console.log("Booking submitted successfully:", data);
        // showToast("Booking submitted successfully!", "success");
      }
  }

};
=======

>>>>>>> 32b318d13d3d33367c1ff801e72061b14b65e7e5

const fmtDate = (d) => {
  if (!d) return "";
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });
};

/* ─ Step 1: Contact Details ─ */
function Step1({ form, set, onNext }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
      <div className="lg:col-span-3">
        <SectionLabel>Step 1 of 4</SectionLabel>
        <h2 className="font-anton leading-none mb-2" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>
          YOUR{" "}
          <em className="font-barlow-cond font-bold" style={{ fontStyle: "italic", color: "#d4c4a8" }}>
            DETAILS
          </em>
        </h2>
        <p className="text-sm leading-7 mb-8" style={{ color: "rgba(249,245,240,0.5)" }}>
          Enter your contact info so we can confirm and reach you about your booking.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="First Name" id="fn" value={form.fn} onChange={(v) => set("fn", v)} placeholder="James" required />
            <FormInput label="Last Name"  id="ln" value={form.ln} onChange={(v) => set("ln", v)} placeholder="Smith"  required />
          </div>
          <FormInput label="Phone Number"  id="phone" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+1 (555) 000-0000" type="tel"   required />
          <FormInput label="Email Address" id="email" value={form.email} onChange={(v) => set("email", v)} placeholder="you@email.com"        type="email" required />
          <FormTextarea label="Notes (optional)" id="notes" value={form.notes} onChange={(v) => set("notes", v)} placeholder="Any requests, preferences, or things we should know..." rows={3} />
        </div>

        <button
          onClick={onNext}
          className="w-full mt-6 font-barlow-cond font-bold text-sm tracking-[2px] uppercase bg-red-500 hover:bg-red-600 text-white border-0 cursor-pointer py-4 transition-colors duration-200"
        >
          CONTINUE → CHOOSE A SERVICE
        </button>
      </div>

      {/* sidebar */}
      <div className="lg:col-span-2 space-y-4">
        <div className="p-7" style={{ background: "#1e1e1e" }}>
          <div className="font-barlow-cond font-bold text-[0.65rem] tracking-[4px] uppercase text-red-500 mb-5">
            Why Book Online?
          </div>
          {[
            { icon: "⚡", text: "Takes less than 2 minutes" },
            { icon: "🔒", text: "No payment required to book" },
            { icon: "📲", text: "Easy to reschedule or cancel" },
            { icon: "✂️", text: "Choose your preferred barber" },
          ].map((i) => (
            <div key={i.text} className="flex items-center gap-3 mb-3">
              <span className="text-lg">{i.icon}</span>
              <span className="text-[0.88rem]" style={{ color: "rgba(249,245,240,0.65)" }}>{i.text}</span>
            </div>
          ))}
        </div>
        <div className="p-7 border-l-[3px] border-red-500" style={{ background: "#1e1e1e" }}>
          <div className="font-barlow-cond font-bold text-[0.65rem] tracking-[4px] uppercase text-red-500 mb-3">
            Need Help?
          </div>
          <a href="tel:+15551234567" className="flex items-center gap-3 text-[0.9rem] text-cream no-underline hover:text-tan transition-colors mb-2">
            📞 +1 (555) 123-4567
          </a>
          <a href="mailto:cuts@chopshopbarbershop.com" className="flex items-center gap-3 text-[0.88rem] text-cream no-underline hover:text-tan transition-colors break-all">
            ✉️ cuts@chopshopbarbershop.com
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─ Step 2: Service Selection ─ */
function Step2({ form, set, onNext, onBack }) {
  return (
    <div>
      <SectionLabel>Step 2 of 5</SectionLabel>
      <h2 className="font-anton leading-none mb-2" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>
        PICK YOUR{" "}
        <em className="font-barlow-cond font-bold" style={{ fontStyle: "italic", color: "#d4c4a8" }}>
          SERVICE
        </em>
      </h2>
      <p className="text-sm leading-7 mb-8" style={{ color: "rgba(249,245,240,0.5)" }}>
        Select the service you'd like. Prices shown are starting rates.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3px] mb-8">
        {SERVICES.map((s) => (
          <ServiceCard
            key={s.num}
            service={s}
            selected={form.service === s.title}
<<<<<<< HEAD
            onClick={() => set("service", s.title ) }
=======
            onClick={() => set("service", s.title)}
>>>>>>> 32b318d13d3d33367c1ff801e72061b14b65e7e5
          />
        ))}
      </div>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="font-barlow-cond font-bold text-sm tracking-[2px] uppercase text-cream border cursor-pointer px-8 py-4 bg-transparent transition-colors duration-200 hover:border-white"
          style={{ borderColor: "rgba(249,245,240,0.2)" }}
        >
          ← BACK
        </button>
        <button
          onClick={onNext}
          className="flex-1 font-barlow-cond font-bold text-sm tracking-[2px] uppercase bg-red-500 hover:bg-red-600 text-white border-0 cursor-pointer py-4 transition-colors duration-200"
        >
          CONTINUE → CHOOSE BARBER
        </button>
      </div>
    </div>
  );
}

/* ─ Step 3: Choose Staff ─ */
function Step3Staff({ form, set, onNext, onBack }) {
  const selectedSvc = SERVICES.find((s) => s.title === form.service);

  // Barbers have per-service expertise ratings for richer UI
  const STAFF = [
    {
      name: "No Preference",
      role: "Any Available Barber",
      specialty: "",
      emoji: "🎲",
      rating: null,
      experience: "",
      bio: "Let us assign you the first available barber for your chosen time.",
      tags: [],
      available: true,
    },
    {
      name: "Marcus",
      role: "Head Barber",
      specialty: "Fades & Tapers",
      emoji: "✂️",
      rating: 4.9,
      reviews: 312,
      experience: "12 years",
      bio: "Marcus is the shop's most requested barber. His fades are surgical, his tapers flawless. Known for listening first, cutting second.",
      tags: ["Fades", "Skin Fades", "Tapers", "Textured Hair"],
      available: true,
    },
    {
      name: "Diego",
      role: "Senior Barber",
      specialty: "Classic Cuts",
      emoji: "💈",
      rating: 4.8,
      reviews: 218,
      experience: "8 years",
      bio: "Diego is the master of classics — pompadours, side parts, slick backs. If it's timeless, Diego owns it.",
      tags: ["Classic Cuts", "Pompadour", "Side Part", "Grey Coverage"],
      available: true,
    },
    {
      name: "Tyrell",
      role: "Grooming Specialist",
      specialty: "Beard & Razor Work",
      emoji: "🪒",
      rating: 4.9,
      reviews: 194,
      experience: "6 years",
      bio: "Tyrell's hot towel shaves have a cult following. His beard sculpting is architecture-level precision. Book weeks ahead.",
      tags: ["Straight Razor", "Beard Shaping", "Hot Towel", "Line Ups"],
      available: true,
    },
    {
      name: "Kai",
      role: "Barber",
      specialty: "Modern Styles",
      emoji: "🧔",
      rating: 4.7,
      reviews: 143,
      experience: "4 years",
      bio: "Kai stays ahead of every trend. Drop fades, disconnected cuts, textured crops — Kai brings the freshest techniques to every chair.",
      tags: ["Modern Cuts", "Drop Fade", "Textured Crop", "Undercuts"],
      available: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

      {/* ── Staff list ── */}
      <div className="xl:col-span-2">
        <SectionLabel>Step 4 of 5</SectionLabel>
        <h2
          className="font-anton leading-none mb-2"
          style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}
        >
          CHOOSE YOUR{" "}
          <em
            className="font-barlow-cond font-bold"
            style={{ fontStyle: "italic", color: "#d4c4a8" }}
          >
            BARBER
          </em>
        </h2>
        <p
          className="text-sm leading-7 mb-8"
          style={{ color: "rgba(249,245,240,0.5)" }}
        >
          Pick your preferred barber. All our staff are certified professionals —
          choose by specialty or let us assign the next available.
        </p>

        <div className="space-y-3">
          {STAFF.map((s) => {
            const isSelected = form.barber === s.name;
            const isUnavailable = !s.available;

            return (
              <div
                key={s.name}
                onClick={() => !isUnavailable && set("barber", s.name)}
                className="rounded-xl border-2 transition-all duration-200 overflow-hidden"
                style={{
                  borderColor: isSelected ? "#ef4444" : "rgba(255,255,255,0.08)",
                  background: isSelected
                    ? "rgba(239,68,68,0.08)"
                    : isUnavailable
                    ? "rgba(255,255,255,0.02)"
                    : "#1e1e1e",
                  cursor: isUnavailable ? "not-allowed" : "pointer",
                  opacity: isUnavailable ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isUnavailable && !isSelected)
                    e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected)
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <div className="flex items-start gap-4 p-5">
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    style={{
                      background: isSelected ? "rgba(239,68,68,0.2)" : "#2d2d2d",
                    }}
                  >
                    {s.emoji}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="font-barlow-cond font-bold text-lg tracking-wide uppercase text-cream leading-none">
                          {s.name}
                        </div>
                        <div
                          className="font-barlow-cond text-[0.72rem] tracking-[2px] uppercase mt-0.5"
                          style={{ color: isSelected ? "#fca5a5" : "rgba(249,245,240,0.45)" }}
                        >
                          {s.role}
                          {s.experience && ` · ${s.experience}`}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        {isUnavailable && (
                          <span
                            className="font-barlow-cond font-bold text-[0.62rem] tracking-[2px] uppercase px-2.5 py-1 rounded"
                            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(249,245,240,0.4)" }}
                          >
                            Unavailable today
                          </span>
                        )}
                        {s.rating && (
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400 text-sm">★</span>
                            <span className="font-barlow-cond font-bold text-sm text-cream">{s.rating}</span>
                            <span
                              className="font-barlow-cond text-[0.7rem]"
                              style={{ color: "rgba(249,245,240,0.4)" }}
                            >
                              ({s.reviews})
                            </span>
                          </div>
                        )}
                        {isSelected && (
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "#ef4444" }}
                          >
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <p
                      className="text-[0.84rem] leading-6 mt-2"
                      style={{ color: "rgba(249,245,240,0.55)" }}
                    >
                      {s.bio}
                    </p>

                    {/* Specialty tags */}
                    {s.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {s.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-barlow-cond text-[0.62rem] tracking-[2px] uppercase px-2.5 py-1 rounded-sm"
                            style={{
                              background: isSelected ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.06)",
                              color: isSelected ? "#fca5a5" : "rgba(249,245,240,0.5)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nav buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={onBack}
            className="font-barlow-cond font-bold text-sm tracking-[2px] uppercase text-cream border cursor-pointer px-8 py-4 bg-transparent transition-colors duration-200 hover:border-white"
            style={{ borderColor: "rgba(249,245,240,0.2)" }}
          >
            ← BACK
          </button>
          <button
            onClick={onNext}
            className="flex-1 font-barlow-cond font-bold text-sm tracking-[2px] uppercase bg-red-500 hover:bg-red-600 text-white border-0 cursor-pointer py-4 transition-colors duration-200"
          >
            CONTINUE → DATE & TIME
          </button>
        </div>
      </div>

      {/* ── Sidebar ── */}
      <div className="space-y-4">
        {/* Selected barber card */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="p-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="font-barlow-cond font-bold text-[0.62rem] tracking-[4px] uppercase text-red-500 mb-3">
              Your Selection So Far
            </div>

            {/* Service row */}
            {selectedSvc && (
              <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <span className="text-xl">{selectedSvc.icon}</span>
                <div>
                  <div className="font-barlow-cond font-bold text-[0.82rem] tracking-wide uppercase text-cream">
                    {selectedSvc.title}
                  </div>
                  <div className="font-barlow-cond text-[0.68rem] tracking-[2px] text-red-400">
                    {selectedSvc.duration} · {selectedSvc.price}
                  </div>
                </div>
              </div>
            )}

            {/* Barber row */}
            <div className="pt-3">
              <div className="font-barlow-cond text-[0.65rem] tracking-[3px] uppercase mb-1" style={{ color: "rgba(249,245,240,0.4)" }}>
                Barber
              </div>
              {form.barber ? (
                <div className="flex items-center gap-2">
                  <span className="text-base">
                    {STAFF_EMOJI[form.barber] || "🎲"}
                  </span>
                  <span className="font-barlow-cond font-bold text-[0.9rem] text-cream">
                    {form.barber}
                  </span>
                </div>
              ) : (
                <span className="text-[0.85rem]" style={{ color: "rgba(249,245,240,0.3)" }}>
                  Not selected yet
                </span>
              )}
            </div>
          </div>

          {selectedSvc && (
            <div className="px-5 py-3 flex justify-between items-center" style={{ background: "rgba(239,68,68,0.08)" }}>
              <span className="font-barlow-cond font-bold text-xs tracking-[3px] uppercase" style={{ color: "rgba(249,245,240,0.5)" }}>
                Subtotal
              </span>
              <span className="font-anton text-xl text-red-400">{selectedSvc.price}</span>
            </div>
          )}
        </div>

        {/* Tip card */}
        <div className="p-5 rounded-xl" style={{ background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="font-barlow-cond font-bold text-[0.62rem] tracking-[4px] uppercase text-red-500 mb-3">
            Pro Tip
          </div>
          <p className="text-[0.84rem] leading-6" style={{ color: "rgba(249,245,240,0.5)" }}>
            Picking a specific barber guarantees their style and technique. If your preferred barber is unavailable, choose "No Preference" for the earliest slot.
          </p>
        </div>
      </div>
    </div>
  );
}

// emoji lookup for sidebar
const STAFF_EMOJI = {
  "No Preference": "🎲",
  "Marcus":        "✂️",
  "Diego":         "💈",
  "Tyrell":        "🪒",
  "Kai":           "🧔",
};

/* ─ Step 3: Date, Time, Barber — Knockouts-style ─ */
function Step3({ form, set, onNext, onBack }) {
  const todayIdx = new Date().getDay();
  const selectedSvc = SERVICES.find((s) => s.title === form.service);

  const handleDateSelect = (ds) => { set("date", ds); set("time", ""); };

  const fmtDisplayDate = (d) =>
    d ? new Date(d + "T12:00:00").toLocaleDateString("en-US", {
          weekday: "long", month: "long", day: "numeric"
        })
      : null;

  const displayDate = fmtDisplayDate(form.date);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

      {/* ── Main booking area ── */}
      <div className="xl:col-span-2 space-y-6">

        {/* Heading */}
        <div>
          <div
            className="flex items-center gap-4 mb-4 cursor-pointer select-none"
            onClick={onBack}
          >
            <span className="text-gray-400 hover:text-gray-600 text-lg transition-colors">←</span>
            <span
              className="font-semibold text-lg"
              style={{ color: "#111827", fontFamily: "'Barlow', sans-serif" }}
            >
              {form.date && form.time ? "Please select your time" : "When would you like to come in?"}
            </span>
          </div>
        </div>

        {/* ── Stage 1: Calendar (shown until date picked) ── */}
        {!form.date && (
          <BookingCalendar selectedDate={form.date} onSelect={handleDateSelect} />
        )}

        {/* ── Stage 2: Week strip + time slots (shown after date picked) ── */}
        {form.date && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Week strip */}
            <div className="p-5 border-b border-gray-100">
              <WeekStrip selectedDate={form.date} onSelect={handleDateSelect} />
            </div>

            {/* Time slots */}
            <div className="p-5">
              <TimeSlotGrid
                dateStr={form.date}
                selectedTime={form.time}
                onSelect={(t) => set("time", t)}
<<<<<<< HEAD
                barber={form.barber !== "No Preference" ? form.barber : undefined}
                duration={SERVICES.find((s) => s.title === form.service)?.durationMinutes || 30}
=======
>>>>>>> 32b318d13d3d33367c1ff801e72061b14b65e7e5
              />
            </div>

            {/* Back to calendar */}
            <div className="px-5 pb-4">
              <button
                onClick={() => { set("date", ""); set("time", ""); }}
                className="text-sm text-red-500 hover:text-red-700 font-semibold bg-transparent border-0 cursor-pointer p-0 transition-colors"
              >
                ← Change date
              </button>
            </div>
          </div>
        )}


        {/* Nav */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="font-barlow-cond font-bold text-sm tracking-[2px] uppercase text-cream border cursor-pointer px-8 py-4 bg-transparent transition-colors duration-200 hover:border-white"
            style={{ borderColor: "rgba(249,245,240,0.2)" }}
          >
            ← BACK
          </button>
          <button
            onClick={onNext}
            className="flex-1 font-barlow-cond font-bold text-sm tracking-[2px] uppercase bg-red-500 hover:bg-red-600 text-white border-0 cursor-pointer py-4 transition-colors duration-200"
          >
            REVIEW BOOKING →
          </button>
        </div>
      </div>

      {/* ── Sidebar: booking summary ── */}
      <div className="space-y-4">
        {/* Service summary card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="font-barlow-cond font-bold text-[0.62rem] tracking-[4px] uppercase text-red-500 mb-3">
              My Service
            </div>
            {selectedSvc ? (
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "#fee2e2" }}
                >
                  {selectedSvc.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 text-sm">{selectedSvc.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                    <span>⏱ {selectedSvc.duration}</span>
                    <span className="text-red-400 font-semibold">{selectedSvc.price}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400">No service selected</p>
            )}
          </div>

          {/* Booking details */}
          <div className="p-5 space-y-3">
            {[
              { label: "Date",   val: displayDate || "Not selected" },
              { label: "Time",   val: form.time   || "Not selected" },
              { label: "Barber", val: form.barber || "No preference" },
            ].map(({ label, val }) => {
              const isEmpty = val.includes("Not") || val.includes("No pref");
              return (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
                  <span
                    className="text-sm font-medium text-right max-w-[60%] leading-5"
                    style={{ color: isEmpty ? "#d1d5db" : "#111827" }}
                  >
                    {val}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Total */}
          {selectedSvc && (
            <div
              className="px-5 py-4 flex justify-between items-center"
              style={{ background: "#fef2f2", borderTop: "1px solid #fee2e2" }}
            >
              <span className="font-bold text-sm text-gray-700">Total</span>
              <span className="font-bold text-red-500 text-lg">{selectedSvc.price}</span>
            </div>
          )}
        </div>

        {/* Shop hours */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="font-barlow-cond font-bold text-[0.62rem] tracking-[4px] uppercase text-red-500 mb-4">
            Shop Hours
          </div>
          {HOURS.map((h, i) => {
            const isToday = i === todayIdx;
            return (
              <div
                key={h.day}
                className="flex justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <span
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: isToday ? "#dc2626" : "#9ca3af" }}
                >
                  {h.day}
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: isToday ? "#dc2626" : h.hours ? "#374151" : "#d1d5db" }}
                >
                  {h.hours ? `${h.hours[0]} – ${h.hours[1]}` : "Closed"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─ Step 4: Review & Confirm ─ */
function Step4({ form, onConfirm, onBack }) {
  const svc = SERVICES.find((s) => s.title === form.service);

  const rows = [
    ["Name",    `${form.fn} ${form.ln}`],
    ["Phone",   form.phone],
    ["Email",   form.email],
    ["Service", form.service],
    ["Date",    fmtDate(form.date)],
    ["Time",    form.time],
    ["Barber",  form.barber || "No Preference"],
  ];

  return (
    <div className="max-w-2xl">
      <SectionLabel>Step 5 of 5</SectionLabel>
      <h2 className="font-anton leading-none mb-2" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>
        REVIEW &{" "}
        <em className="font-barlow-cond font-bold" style={{ fontStyle: "italic", color: "#d4c4a8" }}>
          CONFIRM
        </em>
      </h2>
      <p className="text-sm leading-7 mb-8" style={{ color: "rgba(249,245,240,0.5)" }}>
        Double-check everything before we lock it in.
      </p>

      <div className="p-8 mb-4" style={{ background: "#1e1e1e" }}>
        {rows.map(([label, val]) => (
          <div
            key={label}
            className="flex justify-between items-start py-3.5 border-b"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <span
              className="font-barlow-cond font-bold text-[0.72rem] tracking-[3px] uppercase"
              style={{ color: "rgba(249,245,240,0.4)" }}
            >
              {label}
            </span>
            <span className="font-barlow-cond font-semibold text-[0.9rem] text-cream text-right max-w-[60%]">
              {val}
            </span>
          </div>
        ))}

        {/* price row */}
        <div className="flex justify-between items-center pt-4">
          <span className="font-barlow-cond font-bold text-[0.72rem] tracking-[3px] uppercase" style={{ color: "rgba(249,245,240,0.4)" }}>
            Price
          </span>
          <span className="font-anton text-2xl text-red-400">{svc?.price}</span>
        </div>
      </div>

      {form.notes && (
        <div className="p-6 mb-4" style={{ background: "#1e1e1e" }}>
          <div className="font-barlow-cond font-bold text-[0.65rem] tracking-[3px] uppercase text-red-500 mb-2">
            Your Notes
          </div>
          <p className="text-[0.88rem] leading-6" style={{ color: "rgba(249,245,240,0.6)" }}>
            {form.notes}
          </p>
        </div>
      )}

      <div className="flex gap-4 mt-2">
        <button
          onClick={onBack}
          className="font-barlow-cond font-bold text-sm tracking-[2px] uppercase text-cream border cursor-pointer px-8 py-4 bg-transparent transition-colors duration-200 hover:border-white"
          style={{ borderColor: "rgba(249,245,240,0.2)" }}
        >
          ← EDIT
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 font-barlow-cond font-bold text-sm tracking-[2px] uppercase bg-red-500 hover:bg-red-600 text-white border-0 cursor-pointer py-4 transition-colors duration-200"
        >
          ✓ CONFIRM APPOINTMENT
        </button>
      </div>
    </div>
  );
}

/* ─ Confirmation Screen ─ */
function Confirmed({ form, onReset, setPage }) {
  const svc = SERVICES.find((s) => s.title === form.service);

  return (
    <div className="max-w-xl mx-auto text-center py-8">
      <div className="text-6xl mb-6">🎉</div>
      <h2 className="font-anton text-[3rem] leading-none mb-4">YOU'RE BOOKED</h2>
      <p className="text-[0.95rem] leading-7 mb-2" style={{ color: "rgba(249,245,240,0.7)" }}>
        <strong className="text-cream">{form.fn}</strong>, your{" "}
        <strong className="text-cream">{form.service}</strong> is confirmed for{" "}
        <strong className="text-cream">{fmtDate(form.date)}</strong> at{" "}
        <strong className="text-cream">{form.time}</strong>.
      </p>
      <p className="text-[0.88rem] mb-10" style={{ color: "rgba(249,245,240,0.4)" }}>
        Confirmation sent to <span className="text-cream">{form.email}</span>. See you soon.
      </p>

      {/* summary card */}
      <div className="p-7 mb-8 text-left" style={{ background: "#1e1e1e" }}>
        <div className="font-barlow-cond font-bold text-[0.65rem] tracking-[4px] uppercase text-red-500 mb-5">
          Booking Summary
        </div>
        {[
          ["Service", form.service],
          ["Date",    fmtDate(form.date)],
          ["Time",    form.time],
          ["Barber",  form.barber || "No Preference"],
          ["Price",   svc?.price],
        ].map(([label, val]) => (
          <div
            key={label}
            className="flex justify-between py-3 border-b"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <span
              className="font-barlow-cond font-bold text-[0.7rem] tracking-[3px] uppercase"
              style={{ color: "rgba(249,245,240,0.4)" }}
            >
              {label}
            </span>
            <span
              className={`font-barlow-cond font-bold text-[0.9rem] ${label === "Price" ? "text-red-400" : "text-cream"}`}
            >
              {val}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={onReset}
          className="font-barlow-cond font-bold text-sm tracking-[2px] uppercase text-cream border cursor-pointer px-8 py-4 bg-transparent transition-colors duration-200 hover:border-white"
          style={{ borderColor: "rgba(249,245,240,0.25)" }}
        >
          BOOK ANOTHER
        </button>
        <button
          onClick={() => { setPage("home"); window.scrollTo({ top: 0 }); }}
          className="font-barlow-cond font-bold text-sm tracking-[2px] uppercase bg-red-500 hover:bg-red-600 text-white border-0 cursor-pointer px-8 py-4 transition-colors duration-200"
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
}

/* ─ Main BookPage ─ */
export default function BookPage({ setPage }) {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({
    fn: "", ln: "", phone: "", email: "", notes: "",
<<<<<<< HEAD
    service: "", date: "",price: "", time: "", barber: "No Preference",
=======
    service: "", date: "", time: "", barber: "No Preference",
>>>>>>> 32b318d13d3d33367c1ff801e72061b14b65e7e5
  });
  const { toast, showToast } = useToast();

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const goNext = () => { setStep((s) => s + 1); window.scrollTo({ top: 0 }); };
  const goBack = () => { setStep((s) => s - 1); window.scrollTo({ top: 0 }); };

  const handleStep1 = () => {
    if (!form.fn || !form.ln) return showToast("⚠️  Please enter your name.");
    if (!form.phone) return showToast("⚠️  Please enter your phone number.");
    if (!form.email || !form.email.includes("@")) return showToast("⚠️  Please enter a valid email.");
    goNext();
  };

  const handleStep2 = () => {
    if (!form.service) return showToast("⚠️  Please select a service.");
    goNext();
  };

  const handleStep3Staff = () => {
    // barber defaults to "No Preference" so always valid
    goNext();
  };

  const handleStep4 = () => {
    if (!form.date) return showToast("⚠️  Please select a date.");
    if (!form.time) return showToast("⚠️  Please select a time.");
    goNext();
  };

  const handleConfirm = () => {
    setConfirmed(true);
    showToast("✅  Appointment confirmed!", "success");
    window.scrollTo({ top: 0 });
<<<<<<< HEAD
    // console log would be replaced by actual API call in production
    console.log("Booking details:", form);
    submitBooking(form);
=======
>>>>>>> 32b318d13d3d33367c1ff801e72061b14b65e7e5
  };

  const handleReset = () => {
    setConfirmed(false);
    setStep(1);
    setForm({
      fn: "", ln: "", phone: "", email: "", notes: "",
      service: "", date: "", time: "", barber: "No Preference",
    });
  };

  return (
    <div className="bg-ink text-cream">
      <PageHero
        label="Reserve Your Chair"
        title="BOOK AN"
        titleAccent="APPOINTMENT"
        subtitle="Walk-ins are always welcome — but book ahead and your barber will be ready the moment you walk in."
      />

      {!confirmed && <BookingStepIndicator step={step} />}

      <div className="px-6 md:px-16 py-16">
        {!confirmed ? (
          <>
            {step === 1 && <Step1       form={form} set={set} onNext={handleStep1}     />}
            {step === 2 && <Step2       form={form} set={set} onNext={handleStep2}     onBack={goBack} />}
            {step === 3 && <Step3Staff  form={form} set={set} onNext={handleStep3Staff} onBack={goBack} />}
            {step === 4 && <Step3       form={form} set={set} onNext={handleStep4}     onBack={goBack} />}
            {step === 5 && <Step4       form={form} onConfirm={handleConfirm}           onBack={goBack} />}
          </>
        ) : (
          <Confirmed form={form} onReset={handleReset} setPage={setPage} />
        )}
      </div>

      <Toast msg={toast.msg} show={toast.show} type={toast.type} />
    </div>
  );
}
