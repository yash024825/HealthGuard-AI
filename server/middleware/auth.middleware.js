const admin = require("../config/firebaseAdmin");

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

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = protect;