const { body } = require("express-validator");

const healthProfileValidation = [
  body("age")
    .optional()
    .isInt({ min: 1, max: 120 })
    .withMessage("Age must be between 1 and 120"),

  body("gender")
    .optional()
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be Male, Female, or Other"),

  body("height")
    .optional()
    .isFloat({ min: 30, max: 300 })
    .withMessage("Height must be between 30 cm and 300 cm"),

  body("weight")
    .optional()
    .isFloat({ min: 1, max: 500 })
    .withMessage("Weight must be between 1 kg and 500 kg"),

  body("bloodGroup")
    .optional()
    .isIn([
      "A+",
      "A-",
      "B+",
      "B-",
      "AB+",
      "AB-",
      "O+",
      "O-",
    ])
    .withMessage("Invalid blood group"),

  body("lifestyle.activityLevel")
    .optional()
    .isIn(["Low", "Moderate", "High"])
    .withMessage("Invalid activity level"),

  body("lifestyle.smoking")
    .optional()
    .isBoolean()
    .withMessage("Smoking must be true or false"),

  body("lifestyle.alcoholConsumption")
    .optional()
    .isBoolean()
    .withMessage("Alcohol consumption must be true or false"),

  body("lifestyle.sleepHours")
    .optional()
    .isFloat({ min: 0, max: 24 })
    .withMessage("Sleep hours must be between 0 and 24"),

  body("lifestyle.dietType")
    .optional()
    .isIn([
      "Balanced",
      "Vegetarian",
      "Vegan",
      "High Protein",
      "Other",
    ])
    .withMessage("Invalid diet type"),

  body("vitals.heartRate")
    .optional()
    .isFloat({ min: 20, max: 250 })
    .withMessage("Heart rate is invalid"),

  body("vitals.bloodSugar")
    .optional()
    .isFloat({ min: 20, max: 700 })
    .withMessage("Blood sugar is invalid"),

  body("vitals.oxygenLevel")
    .optional()
    .isFloat({ min: 50, max: 100 })
    .withMessage("Oxygen level must be between 50 and 100"),

  body("healthScore")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Health score must be between 0 and 100"),
];

module.exports = {
  healthProfileValidation,
};