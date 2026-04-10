// src/data/index.js

export const SERVICES = [
  {
    num: "01",
    icon: "✂️",
    title: "Classic Haircut",
    desc: "A clean cut tailored to your head shape — includes wash, cut, and blowout style finish by a barber who actually listens.",
    price: "$35",
    tag: "starting at",
    duration: "45 min",
  },
  {
    num: "02",
    icon: "🪒",
    title: "Straight Razor Shave",
    desc: "Hot towel, premium lather, straight razor precision. The kind of shave your grandfather had — minus the outdated magazines.",
    price: "$45",
    tag: "per session",
    duration: "30 min",
  },
  {
    num: "03",
    icon: "💈",
    title: "Cut & Shave Combo",
    desc: "The full package. Get both done in one chair — walk out completely dialed in, no second trip required.",
    price: "$70",
    tag: "combo deal",
    duration: "75 min",
  },
  {
    num: "04",
    icon: "🧔",
    title: "Beard Trim & Shape",
    desc: "We shape, define, and sculpt your beard with precision tools and warm beard oil treatment included.",
    price: "$30",
    tag: "per trim",
    duration: "30 min",
  },
  {
    num: "05",
    icon: "👶",
    title: "Kids Cut",
    desc: "Ages 12 and under. Patient barbers, zero pressure. Drop-in friendly but booking is always recommended.",
    price: "$22",
    tag: "under 12",
    duration: "30 min",
  },
  {
    num: "06",
    icon: "👑",
    title: "VIP Treatment",
    desc: "Cut, shave, scalp massage, beard oil, and a cold drink. You'll leave a completely different man — we stand by that.",
    price: "$120",
    tag: "full vip",
    duration: "90 min",
  },
];

export const HOURS = [
  { day: "Sunday",    short: "SUN", hours: null },
  { day: "Monday",    short: "MON", hours: ["9:00 AM", "6:00 PM"] },
  { day: "Tuesday",   short: "TUE", hours: ["9:00 AM", "6:00 PM"] },
  { day: "Wednesday", short: "WED", hours: ["9:00 AM", "7:00 PM"] },
  { day: "Thursday",  short: "THU", hours: ["9:00 AM", "7:00 PM"] },
  { day: "Friday",    short: "FRI", hours: ["9:00 AM", "8:00 PM"] },
  { day: "Saturday",  short: "SAT", hours: ["8:00 AM", "6:00 PM"] },
];

export const TIMES = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM",
  "11:00 AM","11:30 AM","12:00 PM","12:30 PM",
  "1:00 PM","1:30 PM","2:00 PM","2:30 PM",
  "3:00 PM","3:30 PM","4:00 PM","4:30 PM",
  "5:00 PM","5:30 PM",
];

export const BARBERS = [
  { name: "No Preference", specialty: "" },
  { name: "Marcus",  specialty: "Fades & Tapers" },
  { name: "Diego",   specialty: "Classic Cuts" },
  { name: "Tyrell",  specialty: "Beard & Razor" },
  { name: "Kai",     specialty: "Modern Styles" },
];

export const TESTIMONIALS = [
  {
    text: "I started going to Chop Shop for the cut, but I stayed for the neck massage and the cold beer. I'd give six stars if I could.",
    author: "Alex E.",
    service: "VIP Treatment",
  },
  {
    text: "Marcus always knows what I need before I even sit down. I leave feeling like a completely different person every single time.",
    author: "Ben N.",
    service: "Classic Haircut",
  },
  {
    text: "12 years in the military and this is the FIRST time I've come home from a haircut without making any edits myself. Absolutely elite.",
    author: "Levi H.",
    service: "Cut & Shave Combo",
  },
  {
    text: "Booked online in two minutes, got the best fade of my life, and watched the game while I waited. This is what a barbershop should feel like.",
    author: "Darius M.",
    service: "Classic Haircut",
  },
  {
    text: "Brought my son in and he actually WANTED to sit still. The barbers are incredible with kids. We're regulars for life.",
    author: "Niesa V.",
    service: "Kids Cut",
  },
  {
    text: "Got the VIP before a big interview. Walked in nervous, walked out unstoppable. I got the job. Coincidence? I don't think so.",
    author: "Zack L.",
    service: "VIP Treatment",
  },
  {
    text: "Tyrell shaped my beard better than I've ever seen it. I've tried 6 barbershops in this city — Chop Shop has no competition.",
    author: "Omar R.",
    service: "Beard Trim & Shape",
  },
  {
    text: "The straight razor shave with the hot towel is a religious experience. I come every two weeks just for that.",
    author: "James T.",
    service: "Straight Razor Shave",
  },
];

export const STATS = [
  { num: "15+", label: "Years Cutting" },
  { num: "4.9★", label: "Avg. Rating" },
  { num: "6K+", label: "Happy Clients" },
  { num: "4", label: "Expert Barbers" },
];

export const CONTACT = {
  phone: "+1 (555) 123-4567",
  phoneHref: "tel:+15551234567",
  email: "cuts@chopshopbarbershop.com",
  emailHref: "mailto:cuts@chopshopbarbershop.com",
  address: "142 King Street, Downtown",
  parking: "Free lot behind the building",
  transit: "2 min walk from King St. Station",
};
