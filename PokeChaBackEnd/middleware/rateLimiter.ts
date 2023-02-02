const rateLimiter = require("express-rate-limit");

const limiter = rateLimiter({
max: 3,
windowMS: 86000000, //24 Hours
message: { error: "You're out of pokeballs, come back tomorrow" },
});

module.exports = limiter