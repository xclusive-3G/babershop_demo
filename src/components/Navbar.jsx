// src/components/Navbar.jsx
import { useState, useEffect } from "react";

const LINKS = [
  { page: "home",     label: "Home" },
  { page: "services", label: "Services" },
  { page: "hours",    label: "Hours" },
  { page: "about",    label: "About" },
];

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[200] transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(17,16,16,0.97)"
            : "rgba(17,16,16,0.85)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="flex justify-between items-center px-6 md:px-12 h-[72px]">
          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            className="font-anton text-xl md:text-2xl tracking-widest text-cream bg-transparent border-0 cursor-pointer p-0"
          >
            CHOP{" "}
            <span className="text-red-500">SHOP</span>
            <sup className="font-barlow-cond text-[0.45rem] text-red-400 font-bold tracking-widest align-super ml-0.5">
              ®
            </sup>
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-2 list-none items-center m-0 p-0">
            {LINKS.map(({ page: p, label }) => (
              <li key={p}>
                <button
                  onClick={() => navigate(p)}
                  className={`font-barlow-cond font-bold text-[0.8rem] tracking-[2px] uppercase border-0 cursor-pointer transition-all duration-200 px-4 py-2 relative
                    ${page === p
                      ? "text-cream after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-red-500"
                      : "text-cream/50 hover:text-cream"
                    }`}
                  style={{ background: "transparent" }}
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => navigate("book")}
                className={`font-barlow-cond font-bold text-[0.8rem] tracking-[2px] uppercase border-0 cursor-pointer transition-all duration-200 px-6 py-2.5 ml-2
                  ${page === "book"
                    ? "bg-red-700 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
              >
                Book Now
              </button>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-0 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[400px]" : "max-h-0"}`}
          style={{ background: "rgba(17,16,16,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {LINKS.map(({ page: p, label }) => (
              <button
                key={p}
                onClick={() => navigate(p)}
                className={`font-barlow-cond font-bold text-sm tracking-[2px] uppercase text-left py-3 border-0 cursor-pointer bg-transparent transition-colors duration-200
                  ${page === p ? "text-red-400" : "text-cream/60 hover:text-cream"}`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => navigate("book")}
              className="font-barlow-cond font-bold text-sm tracking-[2px] uppercase bg-red-500 hover:bg-red-600 text-white py-3 mt-2 border-0 cursor-pointer transition-colors duration-200"
            >
              Book Now →
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
