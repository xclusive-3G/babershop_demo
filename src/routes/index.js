// src/routes/index.js
const router = require("express").Router();

// ─── Controllers ──────────────────────────────────────────────────────────────
const {
  createBooking, listBookings, listByDate, getByReference,
  cancelBookingHandler, patchNotes, getStatsHandler, bookingRules,
} = require("../controllers/bookingsController");

const { getSlots, getMonthStatus } = require("../controllers/availabilityController");

const { listServices, getService, listBarbers, getBarber } = require("../controllers/servicesController");

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────────────────────────────────────
router.get("/health", (req, res) => {
  res.json({
    success: true,
    status:  "ok",
    service: "Chop Shop API",
    time:    new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES  /api/services
// ─────────────────────────────────────────────────────────────────────────────
router.get("/services",       listServices);
router.get("/services/:slug", getService);

// ─────────────────────────────────────────────────────────────────────────────
// BARBERS  /api/barbers
// ─────────────────────────────────────────────────────────────────────────────
router.get("/barbers",    listBarbers);
router.get("/barbers/:id", getBarber);

// ─────────────────────────────────────────────────────────────────────────────
// AVAILABILITY  /api/availability
// ─────────────────────────────────────────────────────────────────────────────
// GET /api/availability?date=2025-07-15&barber=Marcus&duration=45
router.get("/availability",       getSlots);
// GET /api/availability/month?year=2025&month=7
router.get("/availability/month", getMonthStatus);

// ─────────────────────────────────────────────────────────────────────────────
// BOOKINGS  /api/bookings
// ─────────────────────────────────────────────────────────────────────────────
// Submit a new booking (from the React form)
router.post("/bookings", bookingRules, createBooking);

// Stats dashboard summary
router.get("/bookings/stats", getStatsHandler);

// List bookings for a specific date
router.get("/bookings/date/:date", listByDate);

// Look up a booking by reference number
router.get("/bookings/reference/:ref", getByReference);

// List all bookings (with optional filters: ?date=&status=&barber=)
router.get("/bookings", listBookings);

// Cancel a booking
router.delete("/bookings/:ref", cancelBookingHandler);

// Update staff notes on a booking
router.patch("/bookings/:ref/notes", patchNotes);

module.exports = router;
