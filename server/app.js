const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const healthRoutes = require("./routes/health.routes");
const predictionRoutes = require("./routes/prediction.routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

/* ----------------------------- Middleware ----------------------------- */

/* ------------------------------- CORS ------------------------------- */
// CLIENT_URL is the production frontend origin (single, stable value from
// Render's env vars). Vercel also spins up a new preview URL on every
// push/commit though, so a single hardcoded origin blocks those. We allow:
//   1. CLIENT_URL (production)
//   2. localhost (local dev)
//   3. any *.vercel.app subdomain (covers every preview deployment)

const staticAllowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5173",
];

const isAllowedOrigin = (origin) => {
  if (staticAllowedOrigins.includes(origin)) return true;
  try {
    return new URL(origin).hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
};

app.use(
  cors({
    origin: (origin, callback) => {
      // No origin header = same-origin request, curl, server-to-server, etc.
      if (!origin || isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ----------------------------- Health Check ----------------------------- */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HealthGuard AI API is running",
    version: "1.0.0",
  });
});

/* ------------------------------- Routes ------------------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/predictions", predictionRoutes);

/* -------------------------- 404 Handler -------------------------- */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  });
});

/* ------------------------- Global Error Handler ------------------------- */

app.use(errorHandler);

module.exports = app;