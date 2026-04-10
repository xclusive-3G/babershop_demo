// src/controllers/bookingsController.js
const { body, param, query, validationResult } = require("express-validator");
const {
  appendBooking,
  getAllBookings,
  getBookingsByDate,
  cancelBooking,
  updateStaffNotes,
  getStats,
} = require("../services/sheetsService");
const { sendConfirmation, sendAdminNotification, sendCancellation } = require("../services/emailService");

// ─── Helpers ──────────────────────────────────────────────────────────────────
function validationErrors(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
    return true;
  }
  return false;
}

// ─── Validation rules for new booking ─────────────────────────────────────────
const bookingRules = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),
  body("service").trim().notEmpty().withMessage("Service is required"),
  body("barber").trim().notEmpty().withMessage("Barber selection is required"),
  body("date")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Date must be YYYY-MM-DD")
    .custom((val) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(val + "T12:00:00") >= today;
    })
    .withMessage("Booking date cannot be in the past"),
  body("time").trim().notEmpty().withMessage("Time is required"),
  body("price").optional().trim(),
  body("duration").optional().isInt({ min: 1, max: 480 }).withMessage("Duration must be between 1-480 minutes"),
  body("notes").optional().trim().isLength({ max: 500 }).withMessage("Notes max 500 characters"),
];

// ─── POST /api/bookings — Submit booking from React form ──────────────────────
async function createBooking(req, res) {
  if (validationErrors(req, res)) return;

  try {
    const bookingData = {
      firstName: req.body.firstName,
      lastName:  req.body.lastName,
      email:     req.body.email,
      phone:     req.body.phone     || "",
      service:   req.body.service,
      duration:  req.body.duration  || "",
      price:     req.body.price     || "",
      barber:    req.body.barber    || "No Preference",
      date:      req.body.date,
      time:      req.body.time,
      notes:     req.body.notes     || "",
    };

    // Write to Google Sheets
    const { reference, submittedAt } = await appendBooking(bookingData);

    const fullBooking = { ...bookingData, reference, submittedAt, bookingDate: bookingData.date, bookingTime: bookingData.time };

    // Send emails (non-blocking — errors logged but don't fail the request)
    sendConfirmation(fullBooking).catch(console.error);
    sendAdminNotification(fullBooking).catch(console.error);

    return res.status(201).json({
      success:   true,
      message:   "Booking confirmed!",
      reference,
      submittedAt,
      booking:   fullBooking,
    });
  } catch (err) {
    console.error("[createBooking]", err.message);
    return res.status(500).json({ success: false, message: "Failed to create booking. Please try again." });
  }
}

// ─── GET /api/bookings — List all bookings (admin) ────────────────────────────
async function listBookings(req, res) {
  try {
    const { date, status, barber } = req.query;
    let bookings = await getAllBookings();

    if (date)   bookings = bookings.filter((b) => b.bookingDate === date);
    if (status) bookings = bookings.filter((b) => b.status?.toLowerCase() === status.toLowerCase());
    if (barber) bookings = bookings.filter((b) => b.barber?.toLowerCase() === barber.toLowerCase());

    return res.json({
      success: true,
      count:   bookings.length,
      bookings,
    });
  } catch (err) {
    console.error("[listBookings]", err.message);
    return res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
}

// ─── GET /api/bookings/date/:date ─────────────────────────────────────────────
async function listByDate(req, res) {
  try {
    const { date } = req.params;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ success: false, message: "Invalid date format" });
    }

    const bookings = await getBookingsByDate(date);
    return res.json({ success: true, date, count: bookings.length, bookings });
  } catch (err) {
    console.error("[listByDate]", err.message);
    return res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
}

// ─── GET /api/bookings/reference/:ref — lookup by reference ───────────────────
async function getByReference(req, res) {
  try {
    const ref      = req.params.ref?.toUpperCase();
    const bookings = await getAllBookings();
    const booking  = bookings.find((b) => b.reference === ref);

    if (!booking) {
      return res.status(404).json({ success: false, message: `Booking ${ref} not found` });
    }

    return res.json({ success: true, booking });
  } catch (err) {
    console.error("[getByReference]", err.message);
    return res.status(500).json({ success: false, message: "Failed to fetch booking" });
  }
}

// ─── DELETE /api/bookings/:ref — cancel booking ───────────────────────────────
async function cancelBookingHandler(req, res) {
  try {
    const ref    = req.params.ref?.toUpperCase();
    const reason = req.body.reason || "";

    const cancelled = await cancelBooking(ref, reason);

    if (!cancelled) {
      return res.status(404).json({ success: false, message: `Booking ${ref} not found` });
    }

    // Send cancellation email
    sendCancellation(cancelled).catch(console.error);

    return res.json({ success: true, message: "Booking cancelled", booking: cancelled });
  } catch (err) {
    console.error("[cancelBooking]", err.message);
    return res.status(500).json({ success: false, message: "Failed to cancel booking" });
  }
}

// ─── PATCH /api/bookings/:ref/notes — update staff notes ─────────────────────
async function patchNotes(req, res) {
  try {
    const ref   = req.params.ref?.toUpperCase();
    const notes = req.body.notes || "";

    const updated = await updateStaffNotes(ref, notes);
    if (!updated) {
      return res.status(404).json({ success: false, message: `Booking ${ref} not found` });
    }

    return res.json({ success: true, message: "Notes updated" });
  } catch (err) {
    console.error("[patchNotes]", err.message);
    return res.status(500).json({ success: false, message: "Failed to update notes" });
  }
}

// ─── GET /api/bookings/stats ──────────────────────────────────────────────────
async function getStatsHandler(req, res) {
  try {
    const stats = await getStats();
    return res.json({ success: true, stats });
  } catch (err) {
    console.error("[getStats]", err.message);
    return res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
}

module.exports = {
  createBooking,
  listBookings,
  listByDate,
  getByReference,
  cancelBookingHandler,
  patchNotes,
  getStatsHandler,
  bookingRules,
};
