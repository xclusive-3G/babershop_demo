// src/controllers/servicesController.js

// ─── Static service catalog (mirrors frontend data) ────────────────────────────
const SERVICES = [
  {
    id:              1,
    slug:            "classic-haircut",
    title:           "Classic Haircut",
    description:     "A clean cut tailored to your head shape — includes wash, cut, and blowout style finish.",
    icon:            "✂️",
    price:           "$35",
    priceCents:      3500,
    priceTag:        "starting at",
    durationMinutes: 45,
  },
  {
    id:              2,
    slug:            "straight-razor-shave",
    title:           "Straight Razor Shave",
    description:     "Hot towel, premium lather, straight razor precision.",
    icon:            "🪒",
    price:           "$45",
    priceCents:      4500,
    priceTag:        "per session",
    durationMinutes: 30,
  },
  {
    id:              3,
    slug:            "cut-shave-combo",
    title:           "Cut & Shave Combo",
    description:     "The full package — get both done in one chair.",
    icon:            "💈",
    price:           "$70",
    priceCents:      7000,
    priceTag:        "combo deal",
    durationMinutes: 75,
  },
  {
    id:              4,
    slug:            "beard-trim-shape",
    title:           "Beard Trim & Shape",
    description:     "Shape, define, and sculpt with warm beard oil treatment included.",
    icon:            "🧔",
    price:           "$30",
    priceCents:      3000,
    priceTag:        "per trim",
    durationMinutes: 30,
  },
  {
    id:              5,
    slug:            "kids-cut",
    title:           "Kids Cut",
    description:     "Ages 12 and under. Patient barbers, zero pressure.",
    icon:            "👶",
    price:           "$22",
    priceCents:      2200,
    priceTag:        "under 12",
    durationMinutes: 30,
  },
  {
    id:              6,
    slug:            "vip-treatment",
    title:           "VIP Treatment",
    description:     "Cut, shave, scalp massage, beard oil, and a cold drink.",
    icon:            "👑",
    price:           "$120",
    priceCents:      12000,
    priceTag:        "full vip",
    durationMinutes: 90,
  },
];

const BARBERS = [
  {
    id:          1,
    name:        "Marcus",
    role:        "Head Barber",
    specialty:   "Fades & Tapers",
    emoji:       "✂️",
    rating:      4.9,
    reviewCount: 312,
    experience:  "12 years",
    bio:         "Marcus is the shop's most requested barber. His fades are surgical, his tapers flawless.",
    tags:        ["Fades", "Skin Fades", "Tapers", "Textured Hair"],
    isAvailable: true,
  },
  {
    id:          2,
    name:        "Diego",
    role:        "Senior Barber",
    specialty:   "Classic Cuts",
    emoji:       "💈",
    rating:      4.8,
    reviewCount: 218,
    experience:  "8 years",
    bio:         "Diego is the master of classics — pompadours, side parts, slick backs.",
    tags:        ["Classic Cuts", "Pompadour", "Side Part", "Grey Coverage"],
    isAvailable: true,
  },
  {
    id:          3,
    name:        "Tyrell",
    role:        "Grooming Specialist",
    specialty:   "Beard & Razor Work",
    emoji:       "🪒",
    rating:      4.9,
    reviewCount: 194,
    experience:  "6 years",
    bio:         "Tyrell's hot towel shaves have a cult following. His beard sculpting is architecture-level precision.",
    tags:        ["Straight Razor", "Beard Shaping", "Hot Towel", "Line Ups"],
    isAvailable: true,
  },
  {
    id:          4,
    name:        "Kai",
    role:        "Barber",
    specialty:   "Modern Styles",
    emoji:       "🧔",
    rating:      4.7,
    reviewCount: 143,
    experience:  "4 years",
    bio:         "Kai brings the freshest modern techniques. Drop fades, disconnected cuts, textured crops.",
    tags:        ["Modern Cuts", "Drop Fade", "Textured Crop", "Undercuts"],
    isAvailable: false,
  },
];

// ─── GET /api/services ─────────────────────────────────────────────────────────
function listServices(req, res) {
  res.json({ success: true, count: SERVICES.length, services: SERVICES });
}

// ─── GET /api/services/:slug ───────────────────────────────────────────────────
function getService(req, res) {
  const service = SERVICES.find((s) => s.slug === req.params.slug);
  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found" });
  }
  res.json({ success: true, service });
}

// ─── GET /api/barbers ──────────────────────────────────────────────────────────
function listBarbers(req, res) {
  const { available } = req.query;
  let barbers = BARBERS;
  if (available === "true") barbers = barbers.filter((b) => b.isAvailable);
  res.json({ success: true, count: barbers.length, barbers });
}

// ─── GET /api/barbers/:id ──────────────────────────────────────────────────────
function getBarber(req, res) {
  const barber = BARBERS.find((b) => b.id === parseInt(req.params.id));
  if (!barber) {
    return res.status(404).json({ success: false, message: "Barber not found" });
  }
  res.json({ success: true, barber });
}

module.exports = { listServices, getService, listBarbers, getBarber };
