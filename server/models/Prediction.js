const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    // User who requested the prediction
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Health profile used for prediction
    healthProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthProfile",
      required: true,
    },

    // ML model information
    modelName: {
      type: String,
      required: true,
      trim: true,
    },

    modelVersion: {
      type: String,
      default: "1.0.0",
    },

    // Type of prediction
    predictionType: {
      type: String,
      required: true,
      enum: [
        "heart_disease",
        "diabetes",
        "stroke",
        "hypertension",
        "obesity",
        "general_health",
        "custom",
      ],
    },

    // Input features sent to the ML service
    inputData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    // Prediction returned by the ML model
    prediction: {
      label: {
        type: String,
        required: true,
      },

      probability: {
        type: Number,
        min: 0,
        max: 1,
      },

      confidence: {
        type: Number,
        min: 0,
        max: 100,
      },

      riskLevel: {
        type: String,
        enum: ["Low", "Medium", "High", "Critical"],
      },

      recommendations: [
        {
          type: String,
        },
      ],
    },

    // Optional explanation from the ML model
    explanation: {
      type: String,
      default: "",
    },

    // Raw ML response (useful for debugging)
    rawResponse: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Prediction status
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

// Useful indexes
predictionSchema.index({ userId: 1, createdAt: -1 });
predictionSchema.index({ predictionType: 1 });
predictionSchema.index({ modelName: 1 });

module.exports = mongoose.model("Prediction", predictionSchema);