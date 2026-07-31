const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/auth.controller");

const {
  registerValidation,
  loginValidation,
} = require("../validators/auth.validator");

const validate = require("../middleware/validate.middleware");

// Register User
router.post(
  "/register",
  registerValidation,
  validate,
  register
);

// Login User
router.post(
  "/login",
  loginValidation,
  validate,
  login
);

// Get Current Logged-in User (Protected Route)
router.get(
  "/me",
  protect,
  getCurrentUser
);

module.exports = router;