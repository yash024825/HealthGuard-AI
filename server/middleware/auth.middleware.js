const admin = require("../config/firebaseAdmin");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const idToken = authHeader.split(" ")[1];

    const decoded = await admin.auth().verifyIdToken(idToken);

    // decoded contains uid, email, name, picture, etc. from the
    // verified Firebase ID token.
    req.firebaseUser = decoded;

    // Controllers (health.controller.js, prediction.controller.js, etc.)
    // read `req.user.id`, so we resolve and attach the Mongo user here
    // instead of leaving them to look it up individually. Without this,
    // `req.user` was always undefined and every protected route below
    // threw "Cannot read properties of undefined (reading 'id')".
    //
    // Note: we do NOT hard-fail when no Mongo user is found. The very
    // first call to POST /auth/sync (right after Firebase signup) goes
    // through this same middleware before that Mongo doc exists yet —
    // req.user is simply left undefined in that case, and syncUser()
    // only relies on req.firebaseUser anyway. Routes that genuinely
    // require an existing profile (health, predictions) guard on
    // req.user themselves and return a clear error instead of crashing.
    const user = await User.findOne({ firebaseUid: decoded.uid });

    if (user) {
      req.user = { id: user._id.toString(), _id: user._id, ...user.toObject() };
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = protect;