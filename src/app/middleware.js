const express = require("express");
const morgan = require("morgan"); // Middleware for logging HTTP requests
const compression = require("compression"); // Middleware for compressing HTTP responses
const cookieParser = require("cookie-parser"); // Middleware for parsing cookies
const helmet = require("helmet"); // Middleware for setting security-related HTTP headers
const cors = require("cors"); // Middleware for providing a Connect/Express middleware that can be used to enable CORS with various options
const passport = require("passport");
const expressSession = require("express-session");

const host = require("../middleware/getHost");
const config = require("../config/config");
// const rateLimit = require("../utils/rateLimit.utils/rateLimit.utils");
// const userAgent = require("../middleware/userAgent.middleware");

const middleware = [
  express.json({ limit: "16kb" }), // Middleware for parsing JSON request bodies with a size limit of 16kb
  express.urlencoded({ extended: true, limit: "16kb" }), // Middleware for parsing URL-encoded request bodies with a size limit of 16kb
  compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  }), // Middleware for compressing HTTP responses
  cookieParser(), // Middleware for parsing cookies
  expressSession({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
  morgan("dev"), // Morgan middleware for logging HTTP requests in the 'dev' format
  helmet(), // Helmet middleware for setting security-related HTTP headers
  cors({
    origin: ["http://localhost:5173"], // Replace with your frontend origin
    credentials: true, // Must be true for cookies
  }),
  host,
  passport.initialize(),
  passport.session(),

  // userAgent, // Custom middleware for parsing and handling user agents (commented out)
  // rateLimit, // Custom middleware for rate limiting requests (commented out)
];

module.exports = middleware;
