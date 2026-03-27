// src/pages/HoursPage.jsx
import { HOURS, CONTACT } from "../data";
import SectionLabel from "../components/SectionLabel";
import PageHero from "../components/PageHero";

function isOpenNow() {
  const now = new Date();
  const dayIdx = now.getDay();
  const h = HOURS[dayIdx];
  if (!h.hours) return false;

  const parse = (str) => {
    const [time, period] = str.split(" ");
    let [hrs, mins] = time.split(":").map(Number);
    if (period === "PM" && hrs !== 12) hrs += 12;
    if (period === "AM" && hrs === 12) hrs = 0;
    return hrs * 60 + mins;
  };

  const nowMins = now.getHours() * 60 + now.getMinutes();
  return nowMins >= parse(h.hours[0]) && nowMins < parse(h.hours[1]);
}

export default function HoursPage({ setPage }) {
  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const todayIdx = new Date().getDay();
  const open = isOpenNow();
  const timeStr = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="bg-ink text-cream">
      <PageHero label="When We're Open" title="HOURS OF" titleAccent="OPERATION">
        {/* live status badge */}
        <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 font-barlow-cond font-bold text-sm tracking-[3px] uppercase"
          style={{
            background: open ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
            border: `1px solid ${open ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"}`,
            color: open ? "#86efac" : "#fca5a5",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse-red flex-shrink-0"
            style={{ background: open ? "#22c55e" : "#ef4444" }}
          />
          {open ? "We're Open Now" : "Currently Closed"} &nbsp;·&nbsp; {timeStr}
        </div>
      </PageHero>

      {/* ── Weekly Card Grid ── */}
      <section className="px-6 md:px-16 py-16">
        <SectionLabel>This Week</SectionLabel>
        <h2
          className="font-anton leading-none mb-10"
          style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)" }}
        >
          WEEKLY{" "}
          <em className="font-barlow-cond font-bold" style={{ fontStyle: "italic", color: "#d4c4a8" }}>
            SCHEDULE
          </em>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-[3px]">
          {HOURS.map((h, i) => {
            const isToday = i === todayIdx;
            return (
              <div
                key={h.day}
                className="p-6 text-center transition-colors duration-200"
                style={{
                  background: isToday ? "#ef4444" : "#1e1e1e",
                }}
                onMouseEnter={(e) => { if (!isToday) e.currentTarget.style.background = "#242424"; }}
                onMouseLeave={(e) => { if (!isToday) e.currentTarget.style.background = "#1e1e1e"; }}
              >
                <div
                  className="font-barlow-cond font-bold text-xs tracking-[3px] uppercase mb-1"
                  style={{ color: isToday ? "rgba(255,255,255,0.8)" : "rgba(249,245,240,0.4)" }}
                >
                  {h.short}
                </div>

                {isToday && (
                  <div
                    className="font-barlow-cond text-[0.6rem] tracking-[2px] uppercase mb-2 font-bold"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    TODAY
                  </div>
                )}

                {h.hours ? (
                  <div
                    className="text-[0.75rem] leading-5 mt-2 font-barlow-cond font-semibold"
                    style={{ color: isToday ? "rgba(255,255,255,0.9)" : "rgba(249,245,240,0.65)" }}
                  >
                    {h.hours[0]}
                    <br />
                    <span style={{ color: isToday ? "rgba(255,255,255,0.5)" : "rgba(249,245,240,0.3)" }}>—</span>
                    <br />
                    {h.hours[1]}
                  </div>
                ) : (
                  <div
                    className="text-[0.75rem] mt-2 font-barlow-cond tracking-wide uppercase font-bold"
                    style={{ color: isToday ? "rgba(255,255,255,0.5)" : "rgba(249,245,240,0.2)" }}
                  >
                    Closed
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Full Schedule List ── */}
      <section
        className="px-6 md:px-16 py-16"
        style={{ background: "#0d0d0d" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* list */}
          <div>
            <SectionLabel>Full Schedule</SectionLabel>
            <h2
              className="font-anton leading-none mb-8"
              style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)" }}
            >
              OPENING{" "}
              <em className="font-barlow-cond font-bold" style={{ fontStyle: "italic", color: "#d4c4a8" }}>
                HOURS
              </em>
            </h2>

            <div>
              {HOURS.map((h, i) => {
                const isToday = i === todayIdx;
                return (
                  <div
                    key={h.day}
                    className="flex justify-between items-center py-4 border-b"
                    style={{
                      borderColor: isToday ? "#ef4444" : "rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {isToday && (
                        <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 animate-pulse-red" />
                      )}
                      <span
                        className="font-barlow-cond font-bold text-[0.82rem] tracking-[2px] uppercase"
                        style={{ color: isToday ? "#fca5a5" : "rgba(249,245,240,0.5)" }}
                      >
                        {h.day}
                        {isToday && (
                          <span
                            className="ml-2 text-[0.6rem] tracking-[2px]"
                            style={{ color: "#fca5a5" }}
                          >
                            (TODAY)
                          </span>
                        )}
                      </span>
                    </div>
                    <span
                      className="font-barlow-cond font-bold text-[0.95rem]"
                      style={{
                        color: isToday
                          ? "#fca5a5"
                          : h.hours
                          ? "#f9f5f0"
                          : "rgba(249,245,240,0.22)",
                      }}
                    >
                      {h.hours ? `${h.hours[0]} – ${h.hours[1]}` : "Closed"}
                    </span>
                  </div>
                );
              })}
            </div>

            <p
              className="mt-6 text-[0.82rem] leading-6"
              style={{ color: "rgba(249,245,240,0.35)" }}
            >
              Holiday hours may vary. Check our social media or call ahead on public holidays.
            </p>
          </div>

          {/* notes */}
          <div>
            <SectionLabel>Good to Know</SectionLabel>
            <h2
              className="font-anton leading-none mb-8"
              style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)" }}
            >
              VISIT{" "}
              <em className="font-barlow-cond font-bold" style={{ fontStyle: "italic", color: "#d4c4a8" }}>
                INFO
              </em>
            </h2>

            <div className="space-y-3 mb-10">
              {[
                { icon: "📍", label: "Address",  val: CONTACT.address },
                { icon: "📞", label: "Phone",    val: CONTACT.phone,   href: CONTACT.phoneHref },
                { icon: "✉️", label: "Email",    val: CONTACT.email,   href: CONTACT.emailHref },
                { icon: "🅿️", label: "Parking",  val: CONTACT.parking },
                { icon: "🚇", label: "Transit",  val: CONTACT.transit },
              ].map((c) => (
                <div key={c.label} className="contact-item">
                  <span className="text-xl flex-shrink-0">{c.icon}</span>
                  <div>
                    <div
                      className="font-barlow-cond text-[0.65rem] tracking-[3px] uppercase mb-0.5"
                      style={{ color: "rgba(249,245,240,0.4)" }}
                    >
                      {c.label}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="text-cream text-[0.92rem] font-medium no-underline hover:text-tan transition-colors"
                      >
                        {c.val}
                      </a>
                    ) : (
                      <span className="text-cream text-[0.92rem] font-medium">{c.val}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("book")}
              className="font-barlow-cond font-bold text-sm tracking-[2px] uppercase bg-red-500 hover:bg-red-600 text-white border-0 cursor-pointer px-8 py-4 w-full transition-colors duration-200"
            >
              BOOK AN APPOINTMENT →
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="px-6 md:px-16 py-20 bg-ink">
        <SectionLabel>Common Questions</SectionLabel>
        <h2
          className="font-anton leading-none mb-12"
          style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)" }}
        >
          QUICK{" "}
          <em className="font-barlow-cond font-bold" style={{ fontStyle: "italic", color: "#d4c4a8" }}>
            FAQS
          </em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px]">
          {[
            {
              q: "Do I need an appointment?",
              a: "Walk-ins are always welcome, but booking online guarantees your slot and preferred barber. During busy periods, wait times for walk-ins can be 30–60 minutes.",
            },
            {
              q: "How early should I arrive?",
              a: "We recommend arriving 5 minutes before your appointment. If you're more than 15 minutes late, we may need to reschedule to avoid affecting other clients.",
            },
            {
              q: "What's your cancellation policy?",
              a: "Cancel or reschedule at least 2 hours in advance and there's no charge. Late cancellations or no-shows may incur a small fee.",
            },
            {
              q: "Do you offer gift cards?",
              a: "Yes! Physical and digital gift cards are available for any amount. Ask at the front desk or call us to arrange one.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept cash, all major credit and debit cards, Apple Pay, Google Pay, and contactless payments.",
            },
            {
              q: "Is there parking available?",
              a: "Yes — there's a free parking lot directly behind our building. Street parking is also available on King Street.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="p-8"
              style={{ background: "#1e1e1e" }}
            >
              <div className="font-barlow-cond font-bold text-[1rem] tracking-wide uppercase text-cream mb-3">
                {faq.q}
              </div>
              <p className="text-[0.88rem] leading-7" style={{ color: "rgba(249,245,240,0.55)" }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
