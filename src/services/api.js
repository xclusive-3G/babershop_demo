// src/services/api.js
// Works with both create-react-app (process.env.REACT_APP_*)
// and Vite (import.meta.env.VITE_*)

const BASE_URL = "http://localhost:5000/api";

// ─── Core request helper ──────────────────────────────────────────────────────
async function request(method, path, body = null) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);

  let res;
  try {
    res = await fetch(BASE_URL + path, opts);
  } catch (networkErr) {
    throw new Error(
      "Cannot reach the booking server. Make sure chopshop-api is running:\n  cd chopshop-api && npm start"
    );
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg =
      (data.errors && data.errors[0] && data.errors[0].message) ||
      data.message ||
      ("Request failed (" + res.status + ")");
    throw new Error(msg);
  }
  return data;
}

// ─── Bookings ─────────────────────────────────────────────────────────────────
export async function submitBooking(formData) {
  return request("POST", "/bookings", {
    firstName: formData.fn,
    lastName:  formData.ln,
    email:     formData.email,
    phone:     formData.phone     || "",
    service:   formData.service,
    barber:    formData.barber    || "No Preference",
    date:      formData.date,
    time:      formData.time,
    notes:     formData.notes     || "",
    price:     formData.price     || "",
    duration:  formData.duration  || 30,
  });
}

export async function getBookingByRef(ref) {
  return request("GET", "/bookings/reference/" + encodeURIComponent(ref));
}

export async function cancelBooking(ref, reason) {
  return request("DELETE", "/bookings/" + encodeURIComponent(ref), { reason: reason || "" });
}

// ─── Availability ─────────────────────────────────────────────────────────────
export async function fetchSlots(opts) {
  var params = new URLSearchParams({ date: opts.date });
  if (opts.barber && opts.barber !== "No Preference") params.set("barber", opts.barber);
  if (opts.duration) params.set("duration", String(opts.duration));
  return request("GET", "/availability?" + params);
}

export async function fetchMonthAvailability(year, month) {
  return request("GET", "/availability/month?year=" + year + "&month=" + month);
}

// ─── Services & Barbers ───────────────────────────────────────────────────────
export async function fetchServices() {
  return request("GET", "/services");
}

export async function fetchBarbers(availableOnly) {
  return request("GET", availableOnly ? "/barbers?available=true" : "/barbers");
}
