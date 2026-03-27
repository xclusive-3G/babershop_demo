/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        anton: ["'Anton'", "sans-serif"],
        barlow: ["'Barlow'", "sans-serif"],
        "barlow-cond": ["'Barlow Condensed'", "sans-serif"],
      },
      colors: {
        ink: "#111010",
        cream: "#f9f5f0",
        tan: "#d4c4a8",
        "grey-1": "#1e1e1e",
        "grey-2": "#2d2d2d",
        "grey-3": "#3a3a3a",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollCards: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseRed: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(224,32,32,0.5)" },
          "50%": { boxShadow: "0 0 0 8px rgba(224,32,32,0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee 24s linear infinite",
        "scroll-cards": "scrollCards 38s linear infinite",
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "fade-up-1": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both",
        "fade-up-2": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both",
        "fade-up-3": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s both",
        "fade-in": "fadeIn 0.5s ease both",
        "pulse-red": "pulseRed 2s infinite",
        "slide-left": "slideInLeft 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "slide-right": "slideInRight 0.6s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};
