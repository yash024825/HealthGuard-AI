const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createHealthProfile,
  getHealthProfile,
  updateHealthProfile,
} = require("../controllers/health.controller");

router.post("/", protect, createHealthProfile);

router.get("/", protect, getHealthProfile);

router.put("/", protect, updateHealthProfile);

module.exports = router;