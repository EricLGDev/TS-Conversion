import rateLimiter from 'express-rate-limit'

let limiter = rateLimiter({
max: 3,
windowMs: 86000000, //24 Hours
message: { error: "You're out of pokeballs, come back tomorrow" },
});

module.exports = limiter