// src/controllers/availabilityController.js
const { getTakenSlots } = require("../services/sheetsService");

// ─── Shop hours per day-of-week (0 = Sunday) ──────────────────────────────────
const SHOP_HOURS = {
  0: null,                              // Sunday — closed
  1: { open: "9:00 AM",  close: "6:00 PM" },
  2: { open: "9:00 AM",  close: "6:00 PM" },
  3: { open: "9:00 AM",  close: "7:00 PM" },
  4: { open: "9:00 AM",  close: "7:00 PM" },
  5: { open: "9:00 AM",  close: "8:00 PM" },
  6: { open: "8:00 AM",  close: "6:00 PM" },
};

const SLOT_INTERVAL = 30; // minutes

// ─── Parse "9:00 AM" → total minutes ─────────────────────────────────────────
function parseMins(str) {
  const [time, period] = str.trim().split(" ");
  let [h, m] = time.split(":").map(Number);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

// ─── Total minutes → "9:00 AM" ───────────────────────────────────────────────
function fmtMins(total) {
  let h = Math.floor(total / 60);
  const m = total % 60;
  const period = h >= 12 ? "PM" : "AM";
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${h}:${String(m).padStart(2, "0")} ${period}`;
}

// ─── Generate all slots for a date ────────────────────────────────────────────
function generateSlots(dateStr) {
  const date = new Date(dateStr + "T12:00:00");
  const dow  = date.getDay();
  const hrs  = SHOP_HOURS[dow];
  if (!hrs) return []; // closed

  const open  = parseMins(hrs.open);
  const close = parseMins(hrs.close);
  const slots = [];
  for (let t = open; t < close; t += SLOT_INTERVAL) {
    slots.push(fmtMins(t));
  }
  return slots;
}

// ─── GET /api/availability?date=YYYY-MM-DD&barber=Marcus&duration=45 ──────────
async function getSlots(req, res) {
  try {
    const { date, barber, duration } = req.query;

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ success: false, message: "Invalid date format. Use YYYY-MM-DD" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const requested = new Date(date + "T12:00:00");

    if (requested < today) {
      return res.status(400).json({ success: false, message: "Cannot check availability for past dates" });
    }

    const dow = requested.getDay();
    if (!SHOP_HOURS[dow]) {
      return res.json({ success: true, date, isOpen: false, slots: [], message: "Shop is closed on this day" });
    }

    const allSlots   = generateSlots(date);
    const takenSlots = await getTakenSlots(date, barber);
    const takenSet   = new Set(takenSlots);

    const durationMins = parseInt(duration || "30");
    const slotsNeeded  = Math.ceil(durationMins / SLOT_INTERVAL);

    const slots = allSlots.map((slot, idx) => {
      // Check if this slot AND the following slots (for longer services) are all free
      let canBook = true;
      for (let i = 0; i < slotsNeeded; i++) {
        const checkSlot = allSlots[idx + i];
        if (!checkSlot || takenSet.has(checkSlot)) {
          canBook = false;
          break;
        }
      }
      return {
        time:      slot,
        available: canBook,
        status:    canBook ? "available" : "booked",
      };
    });

    const availableCount = slots.filter((s) => s.available).length;

    return res.json({
      success: true,
      date,
      barber:    barber || "Any",
      isOpen:    true,
      hours:     SHOP_HOURS[dow],
      slots,
      available: availableCount,
      booked:    slots.length - availableCount,
    });
  } catch (err) {
    console.error("[Availability]", err.message);
    return res.status(500).json({ success: false, message: "Failed to fetch availability" });
  }
}

// ─── GET /api/availability/month?year=2025&month=6 ────────────────────────────
async function getMonthStatus(req, res) {
  try {
    const year  = parseInt(req.query.year)  || new Date().getFullYear();
    const month = parseInt(req.query.month) || new Date().getMonth() + 1;

    const daysInMonth = new Date(year, month, 0).getDate();
    const today       = new Date();
    today.setHours(0, 0, 0, 0);

    const results = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr   = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const dateObj   = new Date(dateStr + "T12:00:00");
      const dow       = dateObj.getDay();

      if (dateObj < today) {
        results.push({ date: dateStr, status: "past" });
        continue;
      }

      if (!SHOP_HOURS[dow]) {
        results.push({ date: dateStr, status: "closed" });
        continue;
      }

      const allSlots   = generateSlots(dateStr);
      const takenSlots = await getTakenSlots(dateStr, null);
      const takenSet   = new Set(takenSlots);
      const available  = allSlots.filter((s) => !takenSet.has(s)).length;

      let status = "available";
      if (available === 0) status = "fully_booked";
      else if (available <= 3) status = "limited";

      results.push({ date: dateStr, status, available, total: allSlots.length });
    }

    return res.json({ success: true, year, month, days: results });
  } catch (err) {
    console.error("[Availability/Month]", err.message);
    return res.status(500).json({ success: false, message: "Failed to fetch month availability" });
  }
}

module.exports = { getSlots, getMonthStatus };
