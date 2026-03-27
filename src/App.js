// src/App.js
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import HoursPage from "./pages/HoursPage";
import AboutPage from "./pages/AboutPage";
import BookPage from "./pages/BookPage";

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    const titles = {
      home:     "Chop Shop — Men's Haircuts & Grooming",
      services: "Services — Chop Shop Barbershop",
      hours:    "Hours & Location — Chop Shop Barbershop",
      about:    "About Us — Chop Shop Barbershop",
      book:     "Book Appointment — Chop Shop Barbershop",
    };
    document.title = titles[page] || titles.home;
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home":     return <HomePage     setPage={setPage} />;
      case "services": return <ServicesPage setPage={setPage} />;
      case "hours":    return <HoursPage    setPage={setPage} />;
      case "about":    return <AboutPage    setPage={setPage} />;
      case "book":     return <BookPage     setPage={setPage} />;
      default:         return <HomePage     setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <Navbar page={page} setPage={setPage} />
      <main className="flex-1 pt-[72px]">{renderPage()}</main>
      <Footer setPage={setPage} />
    </div>
  );
}
