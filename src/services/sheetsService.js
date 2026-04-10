// src/services/sheetsService.js
// Handles all Google Sheets read/write for the Chop Shop booking system.
// Each booking = one row. Sheets act as a simple database.

const { google } = require("googleapis");

// ─── Auth singleton ────────────────────────────────────────────────────────────
let _auth = null;
function getAuth() {
  if (_auth) return _auth;

  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "")
    .replace(/\\n/g, "\n"); // handle escaped newlines from .env

  _auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key:  privateKey,
    },
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });
  return _auth;
}

function getSheets() {
  return google.sheets({ version: "v4", auth: getAuth() });
}

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;

// ─── Sheet names ───────────────────────────────────────────────────────────────
const TABS = {
  bookings:  process.env.SHEET_BOOKINGS  || "Bookings",
  customers: process.env.SHEET_CUSTOMERS || "Customers",
  cancelled: process.env.SHEET_CANCELLED || "Cancelled",
};

// ─── Column headers for each sheet ────────────────────────────────────────────
const BOOKING_HEADERS = [
  "Reference",
  "Submitted At",
  "Status",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Service",
  "Duration (min)",
  "Price",
  "Barber",
  "Booking Date",
  "Booking Time",
  "Customer Notes",
  "Staff Notes",
];

const CUSTOMER_HEADERS = [
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Total Bookings",
  "First Seen",
  "Last Seen",
];

// ─── Ensure a tab exists and has headers ──────────────────────────────────────
async function ensureSheet(tabName, headers) {
  const sheets = getSheets();

  // Get sheet metadata
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const exists = meta.data.sheets.some(
    (s) => s.properties.title === tabName
  );

  if (!exists) {
    // Add the sheet tab
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [
          { addSheet: { properties: { title: tabName } } },
        ],
      },
    });

    // Write headers in bold
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range:         `${tabName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [headers] },
    });

    // Bold the header row
    const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const sheetId = sheetMeta.data.sheets.find(
      (s) => s.properties.title === tabName
    )?.properties?.sheetId;

    if (sheetId !== undefined) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              repeatCell: {
                range: { sheetId, startRowIndex: 0, endRowIndex: 1 },
                cell: {
                  userEnteredFormat: {
                    textFormat: { bold: true },
                    backgroundColor: { red: 0.93, green: 0.26, blue: 0.26 },
                    horizontalAlignment: "CENTER",
                  },
                },
                fields: "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment)",
              },
            },
            {
              updateSheetProperties: {
                properties: { sheetId, gridProperties: { frozenRowCount: 1 } },
                fields: "gridProperties.frozenRowCount",
              },
            },
          ],
        },
      });
    }

    console.log(`[Sheets] Created tab: ${tabName}`);
  }
}

// ─── Initialize all sheets ────────────────────────────────────────────────────
async function initSheets() {
  try {
    await ensureSheet(TABS.bookings,  BOOKING_HEADERS);
    await ensureSheet(TABS.customers, CUSTOMER_HEADERS);
    await ensureSheet(TABS.cancelled, BOOKING_HEADERS);
    console.log("[Sheets] ✅  All sheets ready");
  } catch (err) {
    // If Google is temporarily unreachable, warn but don't crash the server.
    // The API will retry on first actual request.
    if (err.code === "EAI_AGAIN" || err.code === "ENOTFOUND" || err.code === "ETIMEDOUT") {
      console.warn("[Sheets] ⚠️  Could not reach Google on startup — will retry on first request.");
      return;
    }
    console.error("[Sheets] ❌  Init failed:", err.message);
    throw err;
  }
}

// ─── Generate booking reference ───────────────────────────────────────────────
function generateReference() {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `CS-${year}-${rand}`;
}

// ─── Append a new booking row ─────────────────────────────────────────────────
async function appendBooking(data) {
  const sheets  = getSheets();
  const ref     = generateReference();
  const now     = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });

  const row = [
    ref,                                          // Reference
    now,                                          // Submitted At
    "Confirmed",                                  // Status
    data.firstName,                               // First Name
    data.lastName,                                // Last Name
    data.email,                                   // Email
    data.phone || "",                             // Phone
    data.service,                                 // Service
    data.duration || "",                          // Duration (min)
    data.price || "",                             // Price
    data.barber || "No Preference",               // Barber
    data.date,                                    // Booking Date
    data.time,                                    // Booking Time
    data.notes || "",                             // Customer Notes
    "",                                           // Staff Notes (empty at creation)
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId:    SPREADSHEET_ID,
    range:            `${TABS.bookings}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody:      { values: [row] },
  });

  // Also upsert customer record
  await upsertCustomer(data);

  return { reference: ref, submittedAt: now };
}

// ─── Get all bookings ─────────────────────────────────────────────────────────
async function getAllBookings() {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range:         `${TABS.bookings}!A2:O`,   // skip header row
  });

  const rows = res.data.values || [];
  return rows.map((r) => rowToBooking(r)).filter(Boolean);
}

// ─── Get bookings for a specific date ─────────────────────────────────────────
async function getBookingsByDate(date) {
  const all = await getAllBookings();
  return all.filter((b) => b.bookingDate === date && b.status !== "Cancelled");
}

// ─── Get bookings for a specific barber on a date ─────────────────────────────
async function getBookingsByBarberAndDate(barber, date) {
  const all = await getAllBookings();
  return all.filter(
    (b) =>
      b.bookingDate === date &&
      b.status !== "Cancelled" &&
      (b.barber === barber || b.barber === "No Preference")
  );
}

// ─── Get taken time slots for a date (for availability check) ─────────────────
async function getTakenSlots(date, barber) {
  const all = await getAllBookings();
  return all
    .filter(
      (b) =>
        b.bookingDate === date &&
        b.status !== "Cancelled" &&
        (!barber || barber === "No Preference" || b.barber === barber || b.barber === "No Preference")
    )
    .map((b) => b.bookingTime);
}

// ─── Cancel a booking by reference ────────────────────────────────────────────
async function cancelBooking(reference, reason = "") {
  const sheets = getSheets();

  // Find the row
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range:         `${TABS.bookings}!A:O`,
  });

  const rows = res.data.values || [];
  const rowIndex = rows.findIndex((r) => r[0] === reference);

  if (rowIndex === -1) return null;

  const booking = rowToBooking(rows[rowIndex]);

  // Update Status column (column C = index 3, 1-based row = rowIndex + 1)
  await sheets.spreadsheets.values.update({
    spreadsheetId:    SPREADSHEET_ID,
    range:            `${TABS.bookings}!C${rowIndex + 1}`,
    valueInputOption: "RAW",
    requestBody:      { values: [["Cancelled"]] },
  });

  // Append to Cancelled sheet for audit trail
  const cancelledRow = [...rows[rowIndex]];
  cancelledRow[2] = "Cancelled";
  cancelledRow[14] = reason || "Cancelled by customer";

  await sheets.spreadsheets.values.append({
    spreadsheetId:    SPREADSHEET_ID,
    range:            `${TABS.cancelled}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody:      { values: [cancelledRow] },
  });

  return booking;
}

// ─── Update staff notes on a booking ─────────────────────────────────────────
async function updateStaffNotes(reference, notes) {
  const sheets = getSheets();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range:         `${TABS.bookings}!A:A`,
  });

  const col = res.data.values || [];
  const rowIndex = col.findIndex((r) => r[0] === reference);
  if (rowIndex === -1) return false;

  await sheets.spreadsheets.values.update({
    spreadsheetId:    SPREADSHEET_ID,
    range:            `${TABS.bookings}!O${rowIndex + 1}`,
    valueInputOption: "RAW",
    requestBody:      { values: [[notes]] },
  });

  return true;
}

// ─── Upsert customer in Customers sheet ───────────────────────────────────────
async function upsertCustomer(data) {
  const sheets  = getSheets();
  const now     = new Date().toLocaleDateString("en-US");

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range:         `${TABS.customers}!A:G`,
  });

  const rows = res.data.values || [];
  // col C (index 2) = Email
  const rowIndex = rows.findIndex((r) => r[2] === data.email);

  if (rowIndex === -1) {
    // New customer
    await sheets.spreadsheets.values.append({
      spreadsheetId:    SPREADSHEET_ID,
      range:            `${TABS.customers}!A1`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[
          data.firstName,
          data.lastName,
          data.email,
          data.phone || "",
          1,           // Total Bookings
          now,         // First Seen
          now,         // Last Seen
        ]],
      },
    });
  } else {
    // Existing customer — increment booking count + update last seen
    const existing    = rows[rowIndex];
    const totalVisits = (parseInt(existing[4], 10) || 0) + 1;

    await sheets.spreadsheets.values.update({
      spreadsheetId:    SPREADSHEET_ID,
      range:            `${TABS.customers}!E${rowIndex + 1}:G${rowIndex + 1}`,
      valueInputOption: "RAW",
      requestBody:      { values: [[totalVisits, existing[5], now]] },
    });
  }
}

// ─── Get summary stats from sheet ─────────────────────────────────────────────
async function getStats() {
  const all      = await getAllBookings();
  const today    = new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
  const todayISO = new Date().toISOString().split("T")[0];

  const confirmed  = all.filter((b) => b.status === "Confirmed");
  const todayAppts = confirmed.filter((b) => b.bookingDate === todayISO);
  const upcoming   = confirmed.filter((b) => b.bookingDate >= todayISO);
  const completed  = all.filter((b) => b.status === "Completed");

  // Revenue from confirmed/completed bookings
  const revenue = [...confirmed, ...completed].reduce((sum, b) => {
    const val = parseFloat((b.price || "0").replace(/[^0-9.]/g, "")) || 0;
    return sum + val;
  }, 0);

  return {
    totalBookings:    all.length,
    confirmedToday:   todayAppts.length,
    upcomingThisWeek: upcoming.length,
    totalRevenue:     revenue.toFixed(2),
  };
}

// ─── Row array → booking object ───────────────────────────────────────────────
function rowToBooking(r) {
  if (!r || !r[0]) return null;
  return {
    reference:    r[0]  || "",
    submittedAt:  r[1]  || "",
    status:       r[2]  || "Confirmed",
    firstName:    r[3]  || "",
    lastName:     r[4]  || "",
    email:        r[5]  || "",
    phone:        r[6]  || "",
    service:      r[7]  || "",
    duration:     r[8]  || "",
    price:        r[9]  || "",
    barber:       r[10] || "No Preference",
    bookingDate:  r[11] || "",
    bookingTime:  r[12] || "",
    notes:        r[13] || "",
    staffNotes:   r[14] || "",
    fullName:     `${r[3] || ""} ${r[4] || ""}`.trim(),
  };
}

module.exports = {
  initSheets,
  appendBooking,
  getAllBookings,
  getBookingsByDate,
  getBookingsByBarberAndDate,
  getTakenSlots,
  cancelBooking,
  updateStaffNotes,
  getStats,
  TABS,
};
