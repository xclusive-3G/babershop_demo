// src/components/ContactPanel.jsx
import { CONTACT } from "../data";
import SectionLabel from "./SectionLabel";

export default function ContactPanel({ setPage }) {
  const items = [
    { icon: "📞", label: "Phone",   val: CONTACT.phone,   href: CONTACT.phoneHref },
    { icon: "✉️", label: "Email",   val: CONTACT.email,   href: CONTACT.emailHref },
    { icon: "📍", label: "Address", val: CONTACT.address, href: null },
    { icon: "🅿️", label: "Parking", val: CONTACT.parking, href: null },
  ];

  return (
    <div
      className="px-8 md:px-14 py-20 flex flex-col justify-center"
      style={{ background: "#1e1e1e" }}
    >
      <SectionLabel>Get In Touch</SectionLabel>
      <h2 className="font-anton text-[clamp(1.8rem,3.5vw,3rem)] leading-none mb-8">
        COME SEE US
      </h2>

      <div>
        {items.map((c) => (
          <div key={c.label} className="contact-item">
            <span className="text-xl flex-shrink-0">{c.icon}</span>
            <div>
              <div
                className="font-barlow-cond text-[0.67rem] tracking-[3px] uppercase mb-0.5"
                style={{ color: "rgba(249,245,240,0.4)" }}
              >
                {c.label}
              </div>
              {c.href ? (
                <a
                  href={c.href}
                  className="text-cream text-[0.95rem] font-medium no-underline transition-colors duration-200 hover:text-tan"
                >
                  {c.val}
                </a>
              ) : (
                <span className="text-cream text-[0.95rem] font-medium">{c.val}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {setPage && (
        <button
          onClick={() => { setPage("book"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-barlow-cond font-bold text-xs tracking-[2px] uppercase bg-red-500 hover:bg-red-600 text-white border-0 cursor-pointer px-8 py-3.5 mt-6 transition-colors duration-200 self-start"
        >
          BOOK APPOINTMENT →
        </button>
      )}
    </div>
  );
}
