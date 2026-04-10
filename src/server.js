// src/server.js
require("dotenv").config();

const express = require("express");
const cors    = require("cors");
const helmet  = require("helmet");
const morgan  = require("morgan");

const routes        = require("./routes");
const { initSheets } = require("./services/sheetsService");

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Security & parsing middleware ────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  // Accept requests from any localhost port (CRA=3000, Vite=5173, etc.)
  origin: function(origin, callback) {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    // Allow any localhost or 127.0.0.1 origin
    if (origin.match(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/)) {
      return callback(null, true);
    }
    // Allow configured FRONTEND_URL
    if (origin === process.env.FRONTEND_URL) return callback(null, true);
    callback(new Error("CORS: origin " + origin + " not allowed"));
  },
  methods:     ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ─── Simple rate limiter ──────────────────────────────────────────────────────
const requestCounts = new Map();
app.use((req, res, next) => {
  const key = req.ip;
  const now = Date.now();
  const rec = requestCounts.get(key) || { count: 0, resetAt: now + 60_000 };
  if (now > rec.resetAt) { rec.count = 0; rec.resetAt = now + 60_000; }
  rec.count++;
  requestCounts.set(key, rec);
  if (rec.count > 120) {
    return res.status(429).json({ success: false, message: "Too many requests — slow down" });
  }
  next();
});

// ─── API routes ───────────────────────────────────────────────────────────────
app.use("/api", routes);

// ─── Root ─────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    name:    "Chop Shop Barbershop API",
    version: "1.0.0",
    docs:    "/api/health",
    endpoints: {
      health:       "GET  /api/health",
      services:     "GET  /api/services",
      barbers:      "GET  /api/barbers",
      availability: "GET  /api/availability?date=YYYY-MM-DD&barber=&duration=",
      monthView:    "GET  /api/availability/month?year=&month=",
      createBooking:"POST /api/bookings",
      listBookings: "GET  /api/bookings",
      bookingStats: "GET  /api/bookings/stats",
      byDate:       "GET  /api/bookings/date/:date",
      byRef:        "GET  /api/bookings/reference/:ref",
      cancel:       "DELETE /api/bookings/:ref",
      staffNotes:   "PATCH /api/bookings/:ref/notes",
    },
  });
});

// ─── 404 ─────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────
async function start() {
  // Initialize Google Sheets tabs (creates headers if they don't exist)
  // Non-fatal — server still starts if Google is temporarily unreachable
  console.log("🔌  Initialising Google Sheets connection...");
  await initSheets().catch((err) => {
    console.warn("⚠️  Sheets init warning:", err.message);
  });

  app.listen(PORT, () => {
    console.log(`\n🚀  Chop Shop API running on http://localhost:${PORT}`);
    console.log(`📊  Spreadsheet: https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SPREADSHEET_ID}`);
    console.log(`🌍  CORS origin: ${process.env.FRONTEND_URL || "http://localhost:3000"}`);
    console.log(`📋  Bookings sheet: ${process.env.SHEET_BOOKINGS || "Bookings"}\n`);
  });
}

start();
