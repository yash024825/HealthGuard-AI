const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
  register,
  login,
  getCurrentUser,
  googleAuth,
} = require("../controllers/auth.controller");

const {
  registerValidation,
  loginValidation,
} = require("../validators/auth.validator");

// Public Routes
router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post("/google", googleAuth);


// Protected Routes
router.get("/me", protect, getCurrentUser);

module.exports = router;