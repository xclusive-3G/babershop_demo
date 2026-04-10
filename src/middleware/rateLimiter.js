// src/middleware/rateLimiter.js
// In-memory rate limiter — replace with Redis in production for multi-instance setups

const windows = new Map();

function rateLimiter({ windowMs = 60_000, max = 100, message = "Too many requests, please slow down." } = {}) {
  return (req, res, next) => {
    const key = `${req.ip}:${req.path}`;
    const now = Date.now();
    const rec = windows.get(key) || { count: 0, resetAt: now + windowMs };

    if (now > rec.resetAt) {
      rec.count = 0;
      rec.resetAt = now + windowMs;
    }

    rec.count++;
    windows.set(key, rec);

    if (rec.count > max) {
      const retryAfter = Math.ceil((rec.resetAt - now) / 1000);
      res.setHeader("Retry-After", retryAfter);
      return res.status(429).json({ success: false, message, retryAfter });
    }

    next();
  };
}

// Clean up expired keys every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, rec] of windows) {
    if (now > rec.resetAt) windows.delete(key);
  }
}, 10 * 60_000);

module.exports = {
  general: rateLimiter({ windowMs: 60_000, max: 120 }),
  booking: rateLimiter({ windowMs: 60 * 60_000, max: 20, message: "Booking limit reached. Try again in an hour." }),
  strict:  rateLimiter({ windowMs: 15 * 60_000, max: 10, message: "Too many attempts. Try again in 15 minutes." }),
};
