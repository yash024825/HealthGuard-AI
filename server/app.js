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

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
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