const User = require("../models/User");

/**
 * Called right after the frontend signs in with Firebase (email/password
 * or Google). Creates the Mongo profile on first sign-in, or returns the
 * existing one on subsequent sign-ins.
 */
const syncUser = async (req, res, next) => {
  try {
    const { uid, email, name, picture } = req.firebaseUser;
    const { fullName, phone, gender, dateOfBirth } = req.body;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        email,
        fullName: fullName || name || email.split("@")[0],
        phone: phone || "",
        gender: gender || "Other",
        dateOfBirth: dateOfBirth || null,
        profileImage: picture || "",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ firebaseUid: req.firebaseUser.uid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  syncUser,
  getCurrentUser,
};