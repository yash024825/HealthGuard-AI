const HealthProfile = require("../models/HealthProfile");

const createHealthProfile = async (req, res, next) => {
  try {
    const existing = await HealthProfile.findOne({
      userId: req.user.id,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Health profile already exists.",
      });
    }

    const profile = await HealthProfile.create({
      userId: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Health profile created.",
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

const getHealthProfile = async (req, res, next) => {
  try {
    const profile = await HealthProfile.findOne({
      userId: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

const updateHealthProfile = async (req, res, next) => {
  try {
    const profile = await HealthProfile.findOneAndUpdate(
      {
        userId: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    res.json({
      success: true,
      message: "Profile updated.",
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createHealthProfile,
  getHealthProfile,
  updateHealthProfile,
};