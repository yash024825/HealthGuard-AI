const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createPrediction,
  getPredictionHistory,
  getPredictionById,
} = require("../controllers/prediction.controller");

// Generate new prediction
router.post("/", protect, createPrediction);

// Prediction history
router.get("/", protect, getPredictionHistory);

// Single prediction
router.get("/:id", protect, getPredictionById);

module.exports = router;