// src/components/Footer.jsx
import { CONTACT } from "../data";

const LINKS = [
  { page: "home",     label: "Home" },
  { page: "services", label: "Services" },
  { page: "hours",    label: "Hours" },
  { page: "about",    label: "About" },
  { page: "book",     label: "Book Now" },
];

export default function Footer({ setPage }) {
  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="bg-ink border-t px-6 md:px-16 pt-16 pb-8"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand */}
        <div>
          <div className="font-anton text-2xl tracking-widest mb-1">
            CHOP <span className="text-red-500">SHOP</span>
            <sup className="font-barlow-cond text-[0.45rem] text-red-400 font-bold tracking-widest align-super ml-0.5">®</sup>
          </div>
          <div
            className="font-barlow-cond text-[0.68rem] tracking-[3px] uppercase mb-6"
            style={{ color: "rgba(249,245,240,0.25)" }}
          >
            Men's Haircuts & Grooming · Est. 2009
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(249,245,240,0.4)" }}>
            Where great cuts meet cold drinks and good vibes. Walk in looking average, walk out looking sharp.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <div className="font-barlow-cond font-bold text-[0.68rem] tracking-[4px] uppercase text-red-500 mb-5">
            Quick Links
          </div>
          <ul className="list-none p-0 m-0 space-y-2">
            {LINKS.map(({ page, label }) => (
              <li key={page}>
                <button
                  onClick={() => navigate(page)}
                  className="font-barlow-cond font-semibold text-[0.8rem] tracking-[2px] uppercase bg-transparent border-0 cursor-pointer transition-colors duration-200 p-0"
                  style={{ color: "rgba(249,245,240,0.4)" }}
                  onMouseEnter={(e) => (e.target.style.color = "#f9f5f0")}
                  onMouseLeave={(e) => (e.target.style.color = "rgba(249,245,240,0.4)")}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="font-barlow-cond font-bold text-[0.68rem] tracking-[4px] uppercase text-red-500 mb-5">
            Contact
          </div>
          <div className="space-y-3">
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-3 text-sm no-underline transition-colors duration-200 group"
              style={{ color: "rgba(249,245,240,0.6)" }}
            >
              <span className="text-base">📞</span>
              <span className="group-hover:text-red-400 transition-colors">{CONTACT.phone}</span>
            </a>
            <a
              href={CONTACT.emailHref}
              className="flex items-center gap-3 text-sm no-underline transition-colors duration-200 group"
              style={{ color: "rgba(249,245,240,0.6)" }}
            >
              <span className="text-base">✉️</span>
              <span className="group-hover:text-red-400 transition-colors">{CONTACT.email}</span>
            </a>
            <div
              className="flex items-center gap-3 text-sm"
              style={{ color: "rgba(249,245,240,0.6)" }}
            >
              <span className="text-base">📍</span>
              <span>{CONTACT.address}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("book")}
            className="font-barlow-cond font-bold text-xs tracking-[2px] uppercase bg-red-500 hover:bg-red-600 text-white border-0 cursor-pointer px-6 py-3 mt-6 w-full transition-colors duration-200"
          >
            BOOK APPOINTMENT →
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <p
          className="font-barlow-cond text-[0.7rem] tracking-wide text-center"
          style={{ color: "rgba(249,245,240,0.2)" }}
        >
          Our services are available to all people regardless of race, gender, or sexual orientation.
        </p>
        <p
          className="font-barlow-cond text-[0.7rem] tracking-wide whitespace-nowrap"
          style={{ color: "rgba(249,245,240,0.2)" }}
        >
          © {new Date().getFullYear()} Chop Shop Barbershop
        </p>
      </div>
    </footer>
  );
}
