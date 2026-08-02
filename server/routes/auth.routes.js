const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const { syncUser, getCurrentUser } = require("../controllers/auth.controller");

// All routes require a valid Firebase ID token in the Authorization header.
router.post("/sync", protect, syncUser);
router.get("/me", protect, getCurrentUser);

module.exports = router;